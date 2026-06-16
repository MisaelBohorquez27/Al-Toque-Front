import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import type { PaymentFlow } from '../types/payment';
import type { Participant, ContractFile } from '../types/signature';
import { usePaymentForm } from '../hooks/use_payment_form';
import { mockCreditData } from '../data/mock_credit_data';
import { HomeLayout } from '../components/layout/home_layout';
import { generateCreditReportPDF } from '../utils/pdf_generator.tsx';
import { PaymentSuccessDialog } from '../components/payment/payment_sucess_dialog';
import { PaymentEmailSentDialog } from '../components/payment/payment_email_sent_dialog';
import { PaymentSummary } from '../components/payment/payment_summary';
import { PaymentForm } from '../components/payment/payment_form';

interface PaymentCheckoutProps {
  paymentFlow?: PaymentFlow;
  participants?: Participant[];
  contractFile?: ContractFile;
  contractFileName?: string;
  onPaymentComplete?: () => void;
}

interface PaymentCheckoutLocationState {
  paymentFlow?: PaymentFlow;
  participants?: Participant[];
  contractFile?: ContractFile;
  contractFileName?: string;
  parentRoute?: string;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  paymentFlow = 'electronicSignature',
  participants = [],
  contractFile,
  contractFileName,
  onPaymentComplete,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationState = (location.state as PaymentCheckoutLocationState | null) ?? null;

  const effectivePaymentFlow = navigationState?.paymentFlow ?? paymentFlow;
  const effectiveParticipants = navigationState?.participants ?? participants;
  const effectiveContractFile = navigationState?.contractFile ?? contractFile;
  const effectiveContractFileName =
    navigationState?.contractFileName ??
    effectiveContractFile?.name ??
    contractFileName;
  const parentRoute = navigationState?.parentRoute;

  const primarySigner = useMemo(() => {
    if (!effectiveParticipants || effectiveParticipants.length === 0) {
      return null;
    }
    return effectiveParticipants[0];
  }, [effectiveParticipants]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const { formData, errors, saveCard, setSaveCard, handleChange, validateForm } = usePaymentForm();

  const processPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    if (effectivePaymentFlow === 'electronicSignature') {
      setShowEmailDialog(true);
    } else {
      setShowSuccessDialog(true);
    }
  };

  const handleDownloadPDF = async () => {
    await generateCreditReportPDF(mockCreditData);
  };

  const handleContinueToSignatures = () => {
    setShowEmailDialog(false);

    navigate('/owner/contract-verification', {
      state: {
        signerRole: primarySigner?.category,
        signerName: primarySigner?.name,
        signerEmail: primarySigner?.email,
        participants: effectiveParticipants,
        contractFile: effectiveContractFile,
        contractFileName: effectiveContractFileName,
        parentRoute,
      },
    });

    onPaymentComplete?.();
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <HomeLayout
        currentRoute="/payment-checkout"
        onNavigate={handleNavigate}
        parentRoute={parentRoute}
      >
        <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Payment Checkout
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Complete your payment to {effectivePaymentFlow === 'electronicSignature' ? 'enable electronic signatures' : 'generate the credit report'}
            </p>
          </div>

          <PaymentSummary />

          <PaymentForm
            formData={formData}
            errors={errors}
            saveCard={saveCard}
            onSaveCardChange={setSaveCard}
            onChange={handleChange}
          />

          <button
            onClick={processPayment}
            disabled={isProcessing}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                <span>Pay $49.99</span>
              </>
            )}
          </button>
        </div>
      </HomeLayout>

      {showSuccessDialog && (
        <PaymentSuccessDialog
          onDownloadPdf={handleDownloadPDF}
          onClose={() => setShowSuccessDialog(false)}
        />
      )}

      {showEmailDialog && (
        <PaymentEmailSentDialog
          onContinue={handleContinueToSignatures}
          onClose={() => setShowEmailDialog(false)}
        />
      )}
    </>
  );
};
