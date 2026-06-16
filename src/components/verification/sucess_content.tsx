import React, { useEffect, useState } from 'react';
import { CheckCircle, FileText, Download, Home, Check } from 'lucide-react';

interface SuccessContentProps {
  onDownload: () => void;
  onGoHome: () => void;
}

export const SuccessContent: React.FC<SuccessContentProps> = ({
  onDownload,
  onGoHome,
}) => {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    setTimeout(() => setScale(1), 100);
  }, []);

  return (
    <div className="flex flex-col items-center py-8 animate-fade-in">
      <div
        className="transition-all duration-500"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle size={56} className="text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 text-center">
        Contract Signed Successfully!
      </h2>

      <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
        Your signature has been recorded and the contract has been finalized.
      </p>

      {/* Contract Info Card */}
      <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-primary" />
            <span className="font-semibold text-gray-900">Lease Contract.pdf</span>
          </div>
          <button onClick={onDownload} className="p-1.5 rounded-lg hover:bg-gray-200">
            <Download size={18} className="text-primary" />
          </button>
        </div>
        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              Digitally Signed
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={onDownload}
          className="flex-1 border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Go Home
        </button>
      </div>
    </div>
  );
};