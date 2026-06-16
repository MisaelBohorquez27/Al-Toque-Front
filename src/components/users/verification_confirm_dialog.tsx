import React, { useRef, useEffect } from 'react';
import { X, ShieldCheck, User as UserIcon, Mail, IdCard, Phone, FileText, Calendar } from 'lucide-react';
import type { UserVerification } from '../../types/user_verification';

interface VerificationConfirmDialogProps {
  user: UserVerification;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
      <Icon size={16} className="text-blue-600" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-900 wrap-break-word">{value}</p>
    </div>
  </div>
);

export const VerificationConfirmDialog: React.FC<VerificationConfirmDialogProps> = ({
  user,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const initial = user.name.charAt(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevenir scroll del body cuando el diálogo está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cerrar al hacer click fuera del diálogo
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-xl animate-slide-up">
        {/* Header - Fijo */}
        <div className="bg-linear-to-br from-yellow-50 to-transparent p-5 border-b border-slate-200 rounded-t-2xl shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Verify Identity</h2>
                <p className="text-xs text-slate-500">Confirm user identity verification</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={16} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 p-5 space-y-5"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">{initial}</span>
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500 mt-2">¿Confirmas la verificación de este usuario?</p>
          </div>

          {/* User Information Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-100 border-b border-slate-200">
              <h4 className="text-sm font-bold text-slate-700">Información del usuario</h4>
            </div>
            <div className="p-4">
              <InfoRow icon={UserIcon} label="Nombre completo" value={user.name} />
              <InfoRow icon={Mail} label="Correo electrónico" value={user.email} />
              <InfoRow icon={IdCard} label="Número de identificación" value={user.cedula} />
              <InfoRow icon={Phone} label="Teléfono" value={user.phone} />
              <InfoRow icon={FileText} label="Tipo de documento" value={user.documentType} />
              <InfoRow icon={FileText} label="Número de documento" value={user.documentNumber} />
              <InfoRow icon={Calendar} label="Fecha de envío" value={user.submittedDate} />
            </div>
          </div>

          {/* Espacio adicional para mejor scroll */}
          <div className="h-1" />
        </div>

        {/* Buttons - Fijo */}
        <div className="p-5 border-t border-slate-200 flex gap-3 bg-white rounded-b-2xl shrink-0">
          <button
            onClick={() => {
              onClose();
              onCancel();
            }}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="flex-1 px-4 py-2.5 bg-emerald-500 rounded-xl text-white font-semibold hover:bg-emerald-600 transition-colors active:scale-95"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};