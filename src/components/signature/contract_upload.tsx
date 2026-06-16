import React, { useRef, useState } from 'react';
import { CloudUpload, File, X, Check } from 'lucide-react';
import type { ContractFile } from '../../types/signature';

interface ContractUploadProps {
  onFileUpload: (file: ContractFile | null) => void;
}

export const ContractUpload: React.FC<ContractUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<ContractFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setIsUploading(true);

    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 1000));

    const contractFile: ContractFile = {
      file: selectedFile,
      name: selectedFile.name,
      size: selectedFile.size,
    };

    setFile(contractFile);
    onFileUpload(contractFile);
    setIsUploading(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (file) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100">
            <File size={24} className="text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
              <Check size={12} />
              Ready for signing
            </p>
          </div>
          <button
            onClick={handleRemoveFile}
            className="p-2 rounded-lg hover:bg-green-200 transition-colors"
          >
            <X size={18} className="text-green-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
      {isUploading ? (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-600">Uploading...</p>
        </div>
      ) : (
        <>
          <CloudUpload size={48} className="mx-auto text-primary mb-3" />
          <p className="text-sm font-semibold text-primary mb-1">Click to upload PDF contract</p>
          <p className="text-xs text-gray-500">Supported format: PDF</p>
        </>
      )}
    </div>
  );
};