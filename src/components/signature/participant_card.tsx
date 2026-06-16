import React from 'react';
import { Trash2, Mail } from 'lucide-react';
import type { Participant } from '../../types/signature';
import { getCategoryColor, getCategoryLabel } from '../../data/mock_categories';

interface ParticipantCardProps {
  participant: Participant;
  onRemove: () => void;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, onRemove }) => {
  const initial = participant.name.charAt(0).toUpperCase();
  const categoryColor = getCategoryColor(participant.category);
  const categoryLabel = getCategoryLabel(participant.category);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)` }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900">{participant.name}</h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
            >
              {categoryLabel}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Mail size={12} className="text-gray-400" />
            <p className="text-xs text-gray-500 truncate">{participant.email}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};