import React from 'react';
import { CheckCircle, FileText, Mail, Download } from 'lucide-react';
import { HomeLayout } from '../components/layout/home_layout';

interface SignatureCompleteProps {
  onNavigateToHome: () => void;
  contractName?: string;
}

export const SignatureComplete: React.FC<SignatureCompleteProps> = ({ 
  onNavigateToHome, 
  contractName = "Lease Contract" 
}) => {
  const handleDownloadContract = () => {
    // Simular descarga del contrato firmado
    alert('Downloading signed contract...');
  };

  const selectedBottomNavIndex = () => 3;
  const navigateByIndex = (index: number) => {
    console.log(`Navigate to tab ${index}`);
  };

  return (
    <HomeLayout
      currentRoute="/signature-complete"
      selectedBottomNavIndex={selectedBottomNavIndex()}
      onBottomNavTapped={navigateByIndex}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center animate-fade-in">
          {/* Icono de éxito */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle size={56} className="text-green-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <FileText size={14} className="text-primary" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            Contract Successfully Signed!
          </h1>
          
          <p className="text-gray-500 mb-6">
            {contractName} has been signed by all parties electronically.
          </p>

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Confirmation Sent
                </p>
                <p className="text-xs text-gray-500">
                  A signed copy has been sent to all participants' email addresses.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadContract}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Signed Contract
            </button>
            
            <button
              onClick={onNavigateToHome}
              className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};