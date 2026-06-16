import React from 'react';
import { Check, FileSignature } from 'lucide-react';

interface SignatureSuccessProps {
  onFinish: () => void;
}

export const SignatureSuccess: React.FC<SignatureSuccessProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-pulse">
          <Check size={52} className="text-green-600" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <FileSignature size={14} className="text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 text-center">
        All Signatures Complete!
      </h2>
      
      <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
        The contract has been signed by all parties. A copy has been sent to everyone's email.
      </p>
      
      <button
        onClick={onFinish}
        className="px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all transform hover:scale-105"
      >
        Finish
      </button>
    </div>
  );
};