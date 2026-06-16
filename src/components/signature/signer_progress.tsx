import React from 'react';

interface SignerProgressProps {
  current: number;
  total: number;
  signerName: string;
}

export const SignerProgress: React.FC<SignerProgressProps> = ({ current, total, signerName }) => {
  const progress = (current / total) * 100;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-700">Signing Progress</span>
        <span className="text-sm font-extrabold text-primary">
          {current}/{total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Waiting for {signerName} to sign
      </p>
    </div>
  );
};