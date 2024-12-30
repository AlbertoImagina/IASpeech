import { useRef, useState } from 'react';

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      return stream;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      throw err;
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const setupRecorder = (onComplete: (blob: Blob) => void) => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      onComplete(audioBlob);
    };
  };

  const beginRecording = () => {
    mediaRecorderRef.current?.start();
    setIsRecording(true);
  };

  return {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    setupRecorder,
    beginRecording,
  };
}