import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export function useWaveform(containerRef: React.RefObject<HTMLDivElement>) {
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorWidth: 0,
        height: 80,
        normalize: true,
        hideScrollbar: true,
        barWidth: 2,
        barGap: 1,
        barRadius: 3,
      });
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  const loadAudio = (url: string) => {
    wavesurferRef.current?.load(url);
  };

  const playAudio = () => {
    wavesurferRef.current?.play();
  };

  return { loadAudio, playAudio };
}