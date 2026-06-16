import { Check, FileText, X } from 'lucide-react';
import React from 'react';

interface UploadCardProps {
  title: string;
  description: string;
  fileName?: string;
  file?: File;
  icon?: React.ElementType;
  onUpload: () => void;
  onRemove: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  title,
  description,
  fileName,
  file,
  icon: Icon = FileText,
  onUpload,
  onRemove,
}) => {
  const hasFile = !!file;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-3.5">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl ${
            hasFile ? 'bg-green-100' : 'bg-primary/10'
          }`}
        >
          {hasFile ? (
            <Check size={22} className="text-green-600" />
          ) : (
            <Icon size={22} className="text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 truncate">
            {hasFile ? fileName : description}
          </p>
        </div>
        {!hasFile ? (
          <button
            onClick={onUpload}
            className="px-3 py-1.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors"
          >
            Upload
          </button>
        ) : (
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};