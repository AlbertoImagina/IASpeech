import { useRef } from 'react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useWaveform } from '../hooks/useWaveform';
import { useAudioVisualizer } from '../hooks/useAudioVisualizer';
import { RecordButton } from './RecordButton';
import { AudioControls } from './AudioControls';
import { Flex, Text } from '@chakra-ui/react'

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    setupRecorder,
    beginRecording,
  } = useAudioRecorder();

  const { loadAudio, playAudio } = useWaveform(waveformRef);
  const { setupAudioContext, drawWaveform, cleanup } = useAudioVisualizer();

  const handleStartRecording = async () => {
    try {
      const stream = await startRecording();
      setupRecorder((audioBlob) => {
        if (waveformRef.current) {
          waveformRef.current.style.display = 'block';
        }
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
        loadAudio(URL.createObjectURL(audioBlob));
        onRecordingComplete(audioBlob);
        cleanup();
      });

      setupAudioContext(stream);

      if (waveformRef.current) {
        waveformRef.current.style.display = 'none';
      }
      if (canvasRef.current) {
        canvasRef.current.style.display = 'block';
      }

      drawWaveform(canvasRef);
      beginRecording();
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  return (
    <Flex
      w='full'
      direction='column'
      my={6}>
      <Flex
        textAlign='center'
        direction='column'
      >
        <Text
          fontSize="20px"
          marginBottom={6}
          color="text"
        >Graba tu discurso:
        </Text>
        <Text
          fontSize="14px"
          color="text"
          mb={6}
        >
          Practica las claves con tus propias palabras
        </Text>
      </Flex>

      <Flex
        justify='center'
        mb={6}>
        <RecordButton
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={stopRecording}
          
        />

        {audioUrl && (
          <AudioControls
            audioUrl={audioUrl}
            onPlay={playAudio}
          />
        )}
      </Flex>

      <div className="relative h-[120px] rounded-xl overflow-hidden shadow-inner" style={{ backgroundColor: 'transparent', borderColor: "disabled", border: "1px solid" }}>
        <div ref={waveformRef} className="absolute inset-0" />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'none' }}
        />
        {isRecording && (
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className="animate-pulse w-2.5 h-2.5 bg-red-500 rounded-full" />
            <span className="text-sm text-red-500 font-medium">Recording</span>
          </div>
        )}
      </div>
    </Flex>
  );
}