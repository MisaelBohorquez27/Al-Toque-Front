import React from 'react';
import { Eye } from 'lucide-react';
import type { UserVerification, VerificationStatus } from '../../types/user_verification';

interface UserRowProps {
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

export const UserRow: React.FC<UserRowProps> = ({ user, onTap }) => {
  const statusColor = getStatusColor(user.status);
  const statusBgColor = getStatusBgColor(user.status);

  return (
    <div
      onClick={onTap}
      className="flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex-2 min-w-37.5">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
      </div>
      <div className="flex-2 min-w-45">
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div className="flex-1 min-w-25">
        <p className="text-sm font-medium text-gray-900">{user.cedula}</p>
      </div>
      <div className="flex-1 min-w-25">
        <span
          className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${statusBgColor}`}
          style={{ color: statusColor }}
        >
          {user.status.toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-20 text-right">
        <Eye size={18} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
      </div>
    </div>
  );
};