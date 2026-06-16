import React, { useEffect } from 'react';
import { Pen, Eraser } from 'lucide-react';
import { useSignaturePad } from '../../hooks/use_signature_pad';

interface SignaturePadProps {
  onSignatureChange?: (isEmpty: boolean) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureChange }) => {
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

  useEffect(() => {
    onSignatureChange?.(isEmpty);
  }, [isEmpty, onSignatureChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Pen size={18} className="text-primary" />
        <h3 className="text-base font-extrabold text-gray-900">Draw Your Signature</h3>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-40 bg-gray-50 rounded-xl border border-gray-200 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <button
        onClick={clearSignature}
        className="w-full py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <Eraser size={16} />
        Clear Signature
      </button>
    </div>
  );
};