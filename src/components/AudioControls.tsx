import React from 'react';
import { Play, Download } from 'lucide-react';

interface AudioControlsProps {
  audioUrl: string;
  onPlay: () => void;
}

export function AudioControls({ audioUrl, onPlay }: AudioControlsProps) {
  return (
    <>
      <button
        onClick={onPlay}
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
      >
        <Play size={24} />
      </button>
      <a
        href={audioUrl}
        download="recording.wav"
        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
      >
        <Download size={24} />
      </a>
    </>
  );
}