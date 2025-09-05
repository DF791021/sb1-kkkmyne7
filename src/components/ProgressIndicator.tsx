import React, { useState } from 'react';
import { Check, ChevronDown, ChevronRight, FileText } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (stepIndex: number) => void;
}

export function ProgressIndicator({ steps, currentStep, completedSteps, onStepClick }: ProgressIndicatorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentStepData = steps[currentStep];
  const completedCount = completedSteps.size;
  const progressPercentage = ((completedCount + (currentStep > completedCount ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="mb-8">
      {/* Desktop Dropdown View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header with current step info and progress */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white bg-opacity-10 transform -skew-y-2 origin-top-left"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Drive-Away Insurance Application</h2>
                    <p className="text-blue-100">Complete your application in simple steps</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{currentStep + 1}</div>
                  <div className="text-sm text-blue-100">of {steps.length}</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}% complete</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Step Info */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-md
                  ${completedSteps.has(currentStep)
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                  }
                `}>
                  {completedSteps.has(currentStep) ? (
                    <Check size={20} className="animate-in zoom-in duration-300" />
                  ) : (
                    <span className="font-semibold text-sm">{currentStep + 1}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{currentStepData?.title}</h3>
                  <p className="text-sm text-gray-600">{currentStepData?.description}</p>
                </div>
              </div>

              {/* Step Navigation Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <span className="text-sm font-medium text-gray-700">Navigate Steps</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-2 bg-gray-50 border-b border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 px-3 py-1">Application Steps</h4>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {steps.map((step, index) => {
                        const isCompleted = completedSteps.has(index);
                        const isCurrent = index === currentStep;
                        const isClickable = index <= currentStep || completedSteps.has(index);
                        
                        return (
                          <button
                            key={step.id}
                            onClick={() => {
                              if (isClickable) {
                                onStepClick(index);
                                setIsDropdownOpen(false);
                              }
                            }}
                            disabled={!isClickable}
                            className={`
                              w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 border-l-4 
                              ${isCurrent 
                                ? 'border-l-blue-500 bg-blue-50' 
                                : isCompleted 
                                  ? 'border-l-green-500 hover:bg-green-50' 
                                  : 'border-l-transparent hover:border-l-gray-300'
                              }
                              ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`
                                flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-200
                                ${isCompleted
                                  ? 'bg-green-100 text-green-700' 
                                  : isCurrent
                                    ? 'bg-blue-100 text-blue-700'
                                    : isClickable
                                      ? 'bg-gray-100 text-gray-600'
                                      : 'bg-gray-50 text-gray-400'
                                }
                              `}>
                                {isCompleted ? (
                                  <Check size={16} />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className={`font-medium text-sm truncate ${
                                  isCurrent ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                  {step.title}
                                </h5>
                                <p className={`text-xs mt-1 truncate ${
                                  isCurrent ? 'text-blue-700' : 'text-gray-500'
                                }`}>
                                  {step.description}
                                </p>
                              </div>
                              {isCurrent && (
                                <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                      <p className="text-xs text-gray-500">
                        {completedCount} of {steps.length} steps completed
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
      
      {/* Mobile Progress Bar (Enhanced) */}
      <div className="lg:hidden">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full
                ${completedSteps.has(currentStep)
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 text-white'
                }
              `}>
                {completedSteps.has(currentStep) ? (
                  <Check size={18} />
                ) : (
                  <span className="font-semibold text-sm">{currentStep + 1}</span>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{currentStepData?.title}</div>
                <div className="text-sm text-gray-600">{currentStepData?.description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{currentStep + 1}</div>
              <div className="text-xs text-gray-500">of {steps.length}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}