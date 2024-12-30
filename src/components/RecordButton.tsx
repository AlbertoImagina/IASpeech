import React from 'react';
import { Mic, Square } from 'lucide-react';

interface RecordButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function RecordButton({ isRecording, onStartRecording, onStopRecording }: RecordButtonProps) {
  return isRecording ? (
    <button
      onClick={onStopRecording}
      className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
    >
      <Square size={24} />
    </button>
  ) : (
    <button
      onClick={onStartRecording}
      className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
    >
      <Mic size={24} />
    </button>
  );
}