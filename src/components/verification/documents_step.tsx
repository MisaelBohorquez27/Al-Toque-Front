import React from 'react';
import { FileText, Image } from 'lucide-react';
import type { UploadedFile } from '../../types/verification';
import { UploadCard } from './upload_card';

interface DocumentsStepProps {
  cedulaFile: UploadedFile | null;
  photoFile: UploadedFile | null;
  onUploadCedula: () => void;
  onUploadPhoto: () => void;
  onRemoveCedula: () => void;
  onRemovePhoto: () => void;
  onContinue: () => void;
}

export const DocumentsStep: React.FC<DocumentsStepProps> = ({
  cedulaFile,
  photoFile,
  onUploadCedula,
  onUploadPhoto,
  onRemoveCedula,
  onRemovePhoto,
  onContinue,
}) => {
  const isValid = cedulaFile && photoFile;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <FileText size={22} className="text-primary" />
          <h2 className="text-base font-extrabold text-gray-900">
            Identity Verification
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Please upload your identification documents to verify your identity
        </p>

        <div className="space-y-4">
          <UploadCard
            title="National ID (Cédula)"
            description="Upload front and back of your ID"
            fileName={cedulaFile?.name}
            file={cedulaFile?.file}
            icon={Image}
            onUpload={onUploadCedula}
            onRemove={onRemoveCedula}
          />

          <UploadCard
            title="Recent Photo"
            description="Upload a recent passport-style photo"
            fileName={photoFile?.name}
            file={photoFile?.file}
            icon={Image}
            onUpload={onUploadPhoto}
            onRemove={onRemovePhoto}
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValid}
        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};