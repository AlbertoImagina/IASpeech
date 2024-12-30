import React from 'react';
import { Mic, Globe, Award } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { icon: Globe, label: 'Analizar web' },
    { icon: Mic, label: 'Grabar discurso' },
    { icon: Award, label: 'Evaluación' }
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {steps.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-200 to-purple-200" />
            )}
            <div className={`flex items-center ${currentStep >= index + 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-current bg-white shadow-sm transition-all duration-300">
                <item.icon size={24} />
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}