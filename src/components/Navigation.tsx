import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canProceed: boolean;
  isLoading: boolean;
}

export function Navigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit, 
  canProceed,
  isLoading 
}: NavigationProps) {
  const isFirstStep = currentStep === 0;
  const isReviewStep = currentStep === totalSteps - 1;
  
  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200/50">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`
          inline-flex items-center px-8 py-4 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm
          ${isFirstStep 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </button>
      
      <div className="text-sm font-medium text-gray-600 bg-gray-100/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-sm">
        <span className="text-blue-600 font-semibold">Step {currentStep + 1}</span> of {totalSteps}
      </div>
      
      <button
        type="button"
        onClick={isReviewStep ? onSubmit : onNext}
        disabled={!canProceed || isLoading}
        className={`
          inline-flex items-center px-8 py-4 text-sm font-medium rounded-xl transition-all duration-200 shadow-lg
          ${canProceed && !isLoading
            ? isReviewStep 
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500 hover:shadow-xl transform hover:scale-105' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 hover:shadow-xl transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : isReviewStep ? (
          <>
            Submit Application
            <Send className="ml-2 w-4 h-4" />
          </>
        ) : (
          <>
            Continue
            <ChevronRight className="ml-2 w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}