import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import type { Participant } from '../types/signature';
import { HomeLayout } from '../components/layout/home_layout';
import { CurrentSignerCard } from '../components/signature/current_signer_card';
import { SignaturePad } from '../components/signature/signature_pad';
import { SignerProgress } from '../components/signature/signer_progress';

// Datos mock - en producción vendrían de la navegación
const mockParticipants: Participant[] = [
  {
    id: '1',
    category: 'owner',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
  },
  {
    id: '2',
    category: 'renter',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
  },
  {
    id: '3',
    category: 'guarantor',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
  },
];

export const ElectronicSignatureSign: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentSignerIndex, setCurrentSignerIndex] = useState(0);
  const [isSignatureValid, setIsSignatureValid] = useState(false);
  const [participants] = useState<Participant[]>(mockParticipants);

  const currentParticipant = participants[currentSignerIndex];

  const handleSignatureChange = (isEmpty: boolean) => {
    setIsSignatureValid(!isEmpty);
  };

  const handleSubmitSignature = async () => {
    if (!isSignatureValid) {
      alert('Please draw your signature');
      return;
    }

    setIsLoading(true);

    // Simular guardado de firma
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (currentSignerIndex + 1 < participants.length) {
      // Mover al siguiente firmante
      setCurrentSignerIndex(prev => prev + 1);
      setIsSignatureValid(false);
      setIsLoading(false);
    } else {
      // Todas las firmas completadas
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  const handleFinish = () => {
    alert('Contract signed successfully by all parties');
    // Navegar al home
  };

  const selectedBottomNavIndex = () => 3;
  const navigateByIndex = (index: number) => {
    console.log(`Navigate to tab ${index}`);
  };

  if (isSuccess) {
    return (
      <HomeLayout
        currentRoute="/electronic-signature-sign"
        selectedBottomNavIndex={selectedBottomNavIndex()}
        onBottomNavTapped={navigateByIndex}
      >
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check size={44} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3 text-center">
            All Signatures Complete!
          </h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            The contract has been signed by all parties
          </p>
          <button
            onClick={handleFinish}
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
          >
            Finish
          </button>
        </div>
      </HomeLayout>
    );
  }

  if (isLoading) {
    return (
      <HomeLayout
        currentRoute="/electronic-signature-sign"
        selectedBottomNavIndex={selectedBottomNavIndex()}
        onBottomNavTapped={navigateByIndex}
      >
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <Loader2 size={48} className="text-primary animate-spin mb-6" />
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">
            Processing Signature...
          </h2>
          <p className="text-sm text-gray-500">
            Please wait while we save your signature
          </p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout
      currentRoute="/electronic-signature-sign"
      selectedBottomNavIndex={selectedBottomNavIndex()}
      onBottomNavTapped={navigateByIndex}
    >
      <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Electronic Signature
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Draw your signature to sign the contract electronically
          </p>
        </div>

        {/* Progress */}
        <SignerProgress
          current={currentSignerIndex + 1}
          total={participants.length}
          signerName={currentParticipant.name}
        />

        {/* Current Signer */}
        <CurrentSignerCard participant={currentParticipant} />

        {/* Signature Pad */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <SignaturePad onSignatureChange={handleSignatureChange} />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitSignature}
          disabled={!isSignatureValid}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Check size={18} />
          {currentSignerIndex + 1 === participants.length
            ? 'Submit & Complete'
            : 'Sign & Continue'}
        </button>
      </div>
    </HomeLayout>
  );
};