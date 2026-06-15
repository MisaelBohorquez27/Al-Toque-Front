import React from 'react';
import { Search, X } from 'lucide-react';
import type { UserVerification } from '../../types/user_verification';
import { FilterChip } from '../ui/filter_chip';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  users: UserVerification[];
}

const filters = ['All', 'Pending', 'Verified', 'Rejected'];

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  users,
}) => {
  const getFilterCount = (filter: string) => {
    if (filter === 'All') return users.length;
    return users.filter((u) => u.status === filter.toLowerCase()).length;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by ID number (Cédula)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            isSelected={selectedFilter === filter}
            count={getFilterCount(filter)}
            onTap={() => onFilterChange(filter)}
          />
        ))}
      </div>
    </div>
  );
};