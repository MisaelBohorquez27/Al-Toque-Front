import React from 'react';
import type { Participant } from '../../types/signature';
import { getCategoryColor } from '../../data/mock_categories';

interface CurrentSignerCardProps {
  participant: Participant;
}

export const CurrentSignerCard: React.FC<CurrentSignerCardProps> = ({ participant }) => {
  const initial = participant.name.charAt(0).toUpperCase();
  const categoryColor = getCategoryColor(participant.category);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)` }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900">{participant.name}</h3>
          <p className="text-xs text-gray-500 truncate">{participant.email}</p>
        </div>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
          Pending
        </span>
      </div>
    </div>
  );
};