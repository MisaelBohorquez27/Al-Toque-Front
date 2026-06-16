import React, { useEffect } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { useCamera } from '../../hooks/use_camera';

interface SelfieStepProps {
  onSelfieTaken: (imageData: string, imageBytes: Uint8Array) => void;
  onContinue: () => void;
  initialImage?: string | null;
}

export const SelfieStep: React.FC<SelfieStepProps> = ({
  onSelfieTaken,
  onContinue,
  initialImage,
}) => {
  const {
    videoRef,
    canvasRef,
    image,
    imageBytes,
    startCamera,
    stopCamera,
    takePhoto,
    retakePhoto,
  } = useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (image && imageBytes) {
      onSelfieTaken(image, imageBytes);
    }
  }, [image, imageBytes, onSelfieTaken]);

  const hasSelfie = initialImage || image;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <Camera size={22} className="text-primary" />
          <h2 className="text-base font-extrabold text-gray-900">Take a Selfie</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Take a selfie holding your ID document for verification
        </p>

        {/* Camera Preview / Selfie Preview */}
        <div className="relative">
          {!hasSelfie ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-xl border border-gray-200 bg-gray-900"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="relative">
              <img
                src={initialImage || image || ''}
                alt="Selfie preview"
                className="w-full h-64 object-cover rounded-xl border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {!hasSelfie ? (
            <button
              onClick={takePhoto}
              className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Camera size={18} />
              Take Selfie
            </button>
          ) : (
            <>
              <button
                onClick={retakePhoto}
                className="flex-1 border border-red-500 text-red-500 font-semibold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Retake
              </button>
            </>
          )}
        </div>

        {/* Info note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700">
            📸 Hold your ID next to your face and make sure it's clearly visible
          </p>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!hasSelfie}
        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};