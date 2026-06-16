import React from 'react';
import { FileText, Eye } from 'lucide-react';

interface ContractReviewStepProps {
  accepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
  onViewContract: () => void;
  onContinue: () => void;
}

export const ContractReviewStep: React.FC<ContractReviewStepProps> = ({
  accepted,
  onAcceptChange,
  onViewContract,
  onContinue,
}) => {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <FileText size={22} className="text-primary" />
          <h2 className="text-base font-extrabold text-gray-900">
            Review Contract
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Please review the lease contract carefully before signing
        </p>

        {/* Contract Preview */}
        <button
          onClick={onViewContract}
          className="w-full h-64 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <FileText size={56} className="text-red-500 mb-3" />
          <p className="font-semibold text-gray-900">Lease Contract.pdf</p>
          <p className="text-xs text-primary mt-1 flex items-center gap-1">
            <Eye size={12} />
            Tap to view full contract
          </p>
        </button>

        {/* Accept Checkbox */}
        <label className="flex items-start gap-3 mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => onAcceptChange(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the terms and conditions of this lease contract
          </span>
        </label>
      </div>

      <button
        onClick={onContinue}
        disabled={!accepted}
        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Sign
      </button>
    </div>
  );
};