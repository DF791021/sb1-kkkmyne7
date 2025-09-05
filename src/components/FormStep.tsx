import React from 'react';
import { Check } from 'lucide-react';

interface FormStepProps {
  step: number;
  currentStep: number;
  title: string;
  isCompleted: boolean;
}

export function FormStep({ step, currentStep, title, isCompleted }: FormStepProps) {
  const isActive = step === currentStep;
  
  return (
    <div className="flex items-center">
      <div className={`
        flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
        ${isCompleted 
          ? 'bg-green-500 text-white' 
          : isActive 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-500'
        }
      `}>
        {isCompleted ? (
          <Check size={20} className="animate-in fade-in duration-300" />
        ) : (
          <span className="font-semibold">{step}</span>
        )}
      </div>
      <span className={`
        ml-3 font-medium transition-colors duration-300
        ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
      `}>
        {title}
      </span>
    </div>
  );
}