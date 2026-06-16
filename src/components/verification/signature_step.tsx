import React, {useEffect } from 'react';
import { Pen, Eraser, Info } from 'lucide-react';
import { useSignaturePad } from '../../hooks/use_signature_pad';


interface SignatureStepProps {
  onSign: () => void;
  isSigning?: boolean;
}

export const SignatureStep: React.FC<SignatureStepProps> = ({ onSign, isSigning }) => {
  const {
    canvasRef,
    isEmpty,
    initCanvas,
    startDrawing,
    draw,
    stopDrawing,
    clearSignature,
  } = useSignaturePad();

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <Pen size={22} className="text-primary" />
          <h2 className="text-base font-extrabold text-gray-900">
            Electronic Signature
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Draw your signature using your finger or mouse
        </p>

        {/* Signature Area */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-44 bg-gray-50 rounded-xl border border-gray-200 cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Clear Button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={clearSignature}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Eraser size={14} />
            Clear Signature
          </button>
        </div>

        {/* Info note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-2">
          <Info size={16} className="text-blue-600 mt-0.5" />
          <p className="text-xs text-blue-700">
            By signing, you agree that this is your legal electronic signature
          </p>
        </div>
      </div>

      <button
        onClick={onSign}
        disabled={isEmpty || isSigning}
        className="w-full bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSigning ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Signing...
          </>
        ) : (
          'Sign Contract'
        )}
      </button>
    </div>
  );
};