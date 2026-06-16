import type { CategoryOption } from "../types/signature";

export const categories: CategoryOption[] = [
  { value: 'owner', label: 'Owner', icon: 'home', color: '#3B82F6' },
  { value: 'renter', label: 'Renter', icon: 'user', color: '#8B5CF6' },
  { value: 'spouse', label: 'Spouse', icon: 'heart', color: '#F59E0B' },
  { value: 'guarantor', label: 'Guarantor', icon: 'shield', color: '#10B981' },
];

export const getCategoryLabel = (value: string): string => {
  return categories.find(c => c.value === value)?.label || categories[0].label;
};

export const getCategoryColor = (value: string): string => {
  return categories.find(c => c.value === value)?.color || categories[0].color;
};