import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { UserVerification, VerificationStatus } from '../../types/user_verification';

interface UserCardProps {
  user: UserVerification;
  onTap: () => void;
}

const getStatusColor = (status: VerificationStatus): string => {
  switch (status) {
    case 'verified':
      return '#10B981';
    case 'pending':
      return '#F59E0B';
    case 'rejected':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getStatusBgColor = (status: VerificationStatus): string => {
  switch (status) {
    case 'verified':
      return 'bg-green-100';
    case 'pending':
      return 'bg-yellow-100';
    case 'rejected':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};

export const UserCard: React.FC<UserCardProps> = ({ user, onTap }) => {
  const statusColor = getStatusColor(user.status);
  const statusBgColor = getStatusBgColor(user.status);
  const initial = user.name.charAt(0);

  return (
    <div
      onClick={onTap}
      className="bg-white rounded-xl border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-primary">{initial}</span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base truncate">{user.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">ID: {user.cedula}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusBgColor}`} style={{ color: statusColor }}>
            {user.status.toUpperCase()}
          </span>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};