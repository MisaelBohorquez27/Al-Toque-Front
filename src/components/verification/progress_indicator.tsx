import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepNames,
}) => {
  const currentStepName = stepNames[currentStep - 1];

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
          {currentStepName}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;
          return (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-500'
                  : isActive
                  ? 'bg-primary'
                  : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};