import React, { useState, useEffect } from "react";
import { X, Check, Hourglass } from "lucide-react";
import { mockCreditData } from "../../data/mock_credit_data";
import { PDFDownloadButton } from "../pdf/pdf_download_button";
import type { UserCreditData } from "../../types/payment";

interface PaymentSuccessDialogProps {
  onClose: () => void;
  userData?: UserCreditData;
  onDownloadPdf?: () => Promise<void>;
}

export const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({
  onClose,
  userData = mockCreditData,
}) => {
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentProcessed(true);
      setIsPulsing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!paymentProcessed) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 ${isPulsing ? "animate-pulse" : ""}`}
            >
              <Hourglass size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">
              Processing payment
            </h3>
            <p className="text-sm text-gray-500">
              Please wait while we confirm your payment.
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <Check size={40} className="text-green-600" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">
            Payment successful
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Download your credit report PDF
          </p>
          <div className="max-w-xs">
            <button className="w-full">
              <PDFDownloadButton userData={userData} variant="primary">
                Download Credit Report
              </PDFDownloadButton>
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
