import React from 'react';
import clsx from 'clsx';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  count: number;
  onTap: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected,
  count,
  onTap,
}) => {
  return (
    <button
      onClick={onTap}
      className={clsx(
        'px-3.5 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5',
        isSelected
          ? 'bg-primary text-white border-primary'
          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
      )}
    >
      <span className="text-sm font-semibold">{label}</span>
      <span
        className={clsx(
          'px-1.5 py-0.5 rounded-full text-xs font-semibold',
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-gray-200 text-gray-600'
        )}
      >
        {count}
      </span>
    </button>
  );
};