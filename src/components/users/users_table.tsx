import React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import type { UserVerification } from '../../types/user_verification';
import { UserCard } from './user_card';
import { UserRow } from './user_row';

interface UsersTableProps {
  users: UserVerification[];
  isMobile: boolean;
  onUserClick: (user: UserVerification) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  isMobile,
  onUserClick,
}) => {
  if (users.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
        <UsersIcon size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No users found</h3>
        <p className="text-sm text-gray-500">Try a different ID number or filter</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onTap={() => onUserClick(user)} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex-2 min-w-37.5">
          <span className="text-xs font-bold text-gray-700 uppercase">Name</span>
        </div>
        <div className="flex-2 min-w-45">
          <span className="text-xs font-bold text-gray-700 uppercase">Email</span>
        </div>
        <div className="flex-1 min-w-25">
          <span className="text-xs font-bold text-gray-700 uppercase">ID Number</span>
        </div>
        <div className="flex-1 min-w-25">
          <span className="text-xs font-bold text-gray-700 uppercase">Status</span>
        </div>
        <div className="flex-1 min-w-20 text-right">
          <span className="text-xs font-bold text-gray-700 uppercase">Action</span>
        </div>
      </div>

      {/* Table Body */}
      {users.map((user) => (
        <UserRow key={user.id} user={user} onTap={() => onUserClick(user)} />
      ))}
    </div>
  );
};