import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import type { UserCreditData } from '../../types/payment';
import { generateCreditReportPDF } from '../../utils/pdf_generator.tsx';

interface PDFDownloadButtonProps {
  userData: UserCreditData;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  userData, 
  variant = 'primary',
  children 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await generateCreditReportPDF(userData);
    } catch (err) {
      setError('Error generating PDF. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const baseStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${baseStyles[variant]} cursor-pointer `}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download size={18} />
            <span>{children || 'Download PDF'}</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
};