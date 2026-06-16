import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import type { PaymentFlow } from '../types/payment';
import type { Participant } from '../types/signature';
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
  contractFile?: File;
  contractFileName?: string;
  onPaymentComplete?: () => void;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({ 
  paymentFlow = 'electronicSignature',
  participants = [],
  contractFile,
  contractFileName,
  onPaymentComplete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  const { formData, errors, saveCard, setSaveCard, handleChange, validateForm } = usePaymentForm();

  const processPayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    
    if (paymentFlow === 'electronicSignature') {
      // Para firma electrónica, mostrar diálogo de email
      setShowEmailDialog(true);
    } else {
      // Para verificación de identidad, mostrar diálogo de éxito con PDF
      setShowSuccessDialog(true);
    }
  };

  const handleDownloadPDF = async () => {
    await generateCreditReportPDF(mockCreditData);
  };

  const handleContinueToSignatures = () => {
    // Navegar a la pantalla de firmas
    console.log('Continue to signatures with:', { participants, contractFile, contractFileName });
    // Aquí iría la navegación real a ElectronicSignatureSign
    alert('Navigate to Electronic Signature Sign Screen');
    onPaymentComplete?.();
  };

  const selectedBottomNavIndex = () => 3;
  const navigateByIndex = (index: number) => {
    console.log(`Navigate to tab ${index}`);
  };

  return (
    <>
      <HomeLayout
        currentRoute="/payment-checkout"
        selectedBottomNavIndex={selectedBottomNavIndex()}
        onBottomNavTapped={navigateByIndex}
      >
        <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Payment Checkout
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Complete your payment to {paymentFlow === 'electronicSignature' ? 'enable electronic signatures' : 'generate the credit report'}
            </p>
          </div>

          {/* Payment Summary */}
          <PaymentSummary />

          {/* Payment Form */}
          <PaymentForm
            formData={formData}
            errors={errors}
            saveCard={saveCard}
            onSaveCardChange={setSaveCard}
            onChange={handleChange}
          />

          {/* Pay Button */}
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

      {/* Dialogs */}
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