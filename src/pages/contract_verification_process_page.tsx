import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UploadedFile, VerificationStep } from '../types/verification';
import { HomeLayout } from '../components/layout/home_layout';
import { SuccessContent } from '../components/verification/sucess_content';
import { ProgressIndicator } from '../components/verification/progress_indicator';
import { DocumentsStep } from '../components/verification/documents_step';
import { SelfieStep } from '../components/verification/selfie_step';
import { ContractReviewStep } from '../components/verification/contract_review_step';
import { SignatureStep } from '../components/verification/signature_step';

interface ContractVerificationProcessProps {
  signerRole?: string;
  signerName?: string;
  signerEmail?: string;
  onComplete?: () => void;
}

export const ContractVerificationProcess: React.FC<ContractVerificationProcessProps> = ({
  signerRole = 'renter',
  signerName = 'John Doe',
  signerEmail = 'john.doe@example.com',
  onComplete,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parentRoute = (location.state as { parentRoute?: string } | null)?.parentRoute;
  const [currentStep, setCurrentStep] = useState<VerificationStep>(1);
  const [cedulaFile, setCedulaFile] = useState<UploadedFile | null>(null);
  const [photoFile, setPhotoFile] = useState<UploadedFile | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [, setSelfieBytes] = useState<Uint8Array | null>(null);
  const [acceptContract, setAcceptContract] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const stepNames = ['Documents', 'Selfie', 'Review', 'Sign'];

  // Handle file uploads
  const handleUploadCedula = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setCedulaFile({
          file,
          name: file.name,
          url,
        });
      }
    };
    input.click();
  };

  const handleUploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPhotoFile({
          file,
          name: file.name,
          url,
        });
      }
    };
    input.click();
  };

  const handleRemoveCedula = () => {
    if (cedulaFile?.url) URL.revokeObjectURL(cedulaFile.url);
    setCedulaFile(null);
  };

  const handleRemovePhoto = () => {
    if (photoFile?.url) URL.revokeObjectURL(photoFile.url);
    setPhotoFile(null);
  };

  const handleSelfieTaken = (imageData: string, bytes: Uint8Array) => {
    setSelfieImage(imageData);
    setSelfieBytes(bytes);
  };

  const handleViewContract = () => {
    // Modal para ver el contrato
    alert('Viewing full contract PDF');
  };

  const handleSign = async () => {
    setIsSigning(true);
    
    // Simular envío de firma a la API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSigning(false);
    setIsComplete(true);
    
    alert('Contract signed successfully!');
    
    if (onComplete) {
      onComplete();
    }
  };

  const handleDownloadContract = () => {
    alert('Downloading signed contract...');
  };

  const handleGoHome = () => {
    navigate('/owner/services');
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  if (isComplete) {
    return (
      <HomeLayout
        currentRoute="/owner/contract-verification"
        onNavigate={handleNavigate}
        parentRoute={parentRoute}
      >
        <div className="max-w-2xl mx-auto">
          <SuccessContent
            onDownload={handleDownloadContract}
            onGoHome={handleGoHome}
          />
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout
      currentRoute="/owner/contract-verification"
      onNavigate={handleNavigate}
      parentRoute={parentRoute}
    >
      <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Contract Verification
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Please complete the verification process to sign the contract
          </p>
          <div className="mt-2 p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              Signing as: <span className="font-semibold">{signerRole}</span> • {signerName} • {signerEmail}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={4}
          stepNames={stepNames}
        />

        {/* Step Content */}
        {currentStep === 1 && (
          <DocumentsStep
            cedulaFile={cedulaFile}
            photoFile={photoFile}
            onUploadCedula={handleUploadCedula}
            onUploadPhoto={handleUploadPhoto}
            onRemoveCedula={handleRemoveCedula}
            onRemovePhoto={handleRemovePhoto}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <SelfieStep
            onSelfieTaken={handleSelfieTaken}
            onContinue={() => setCurrentStep(3)}
            initialImage={selfieImage}
          />
        )}

        {currentStep === 3 && (
          <ContractReviewStep
            accepted={acceptContract}
            onAcceptChange={setAcceptContract}
            onViewContract={handleViewContract}
            onContinue={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <SignatureStep
            onSign={handleSign}
            isSigning={isSigning}
          />
        )}
      </div>
    </HomeLayout>
  );
};