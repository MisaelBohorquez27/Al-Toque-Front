import React, { useState, useEffect } from 'react';
import { Check, Mail, X } from 'lucide-react';

interface PaymentEmailSentDialogProps {
  onContinue: () => void;
  onClose: () => void;
}

export const PaymentEmailSentDialog: React.FC<PaymentEmailSentDialogProps> = ({
  onContinue,
  onClose,
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailSent(true);
      setIsPulsing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevenir scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!emailSent) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-gray-500" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div
              className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 transition-transform ${
                isPulsing ? 'animate-pulse' : ''
              }`}
            >
              <Mail size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">
              Sending email...
            </h3>
            <p className="text-sm text-gray-500">
              Please wait while we notify the added users.
            </p>
            <div className="mt-6">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-gray-500" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <Check size={40} className="text-green-600" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">
            Email sent successfully
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Added users should check their email inboxes.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onContinue();
                onClose();
              }}
              className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};