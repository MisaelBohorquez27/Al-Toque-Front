import React from 'react';
import type { UserVerification } from '../../types/user_verification';

interface StatsCardsProps {
  users: UserVerification[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ users }) => {
  const total = users.length;
  const pending = users.filter((u) => u.status === 'pending').length;
  const verified = users.filter((u) => u.status === 'verified').length;
  const rejected = users.filter((u) => u.status === 'rejected').length;

  const stats = [
    { label: 'Total Users', value: total, color: '#3B82F6' },
    { label: 'Pending', value: pending, color: '#F59E0B' },
    { label: 'Verified', value: verified, color: '#10B981' },
    { label: 'Rejected', value: rejected, color: '#EF4444' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-50 rounded-xl border border-gray-200 p-3 md:p-4 text-center"
        >
          <p className="text-2xl md:text-3xl font-extrabold" style={{ color: stat.color }}>
            {stat.value}
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};