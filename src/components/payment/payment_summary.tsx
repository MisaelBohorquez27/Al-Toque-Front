import React from 'react';
import { Receipt } from 'lucide-react';

export const PaymentSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Receipt size={28} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">Credit Report Fee</h3>
          <p className="text-sm text-gray-500 mt-1">
            One-time payment for credit report generation
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-primary tracking-tight">$49.99</p>
          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
            Including taxes
          </span>
        </div>
      </div>
    </div>
  );
};