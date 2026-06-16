import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import { mockUsers } from '../data/mock_users';
import { HomeLayout } from '../components/layout/home_layout';
import { StatsCards } from '../components/users/stats_cards';
import { SearchAndFilters } from '../components/users/search_filters';
import { UsersTable } from '../components/users/users_table';
import { VerificationConfirmDialog } from '../components/users/verification_confirm_dialog';
import type { UserVerification } from '../types/user_verification';

export const UserVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<UserVerification | null>(null);
  const { isMobile } = useResponsive();

  const parentRoute = (location.state as { parentRoute?: string } | null)?.parentRoute;

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesFilter =
        selectedFilter === 'All' ||
        user.status === selectedFilter.toLowerCase();
      
      const matchesSearch =
        searchQuery === '' ||
        user.cedula.includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleUserClick = (user: UserVerification) => {
    setSelectedUser(user);
  };

  const handleConfirmVerification = () => {
    setSelectedUser(null);
    navigate('/payment-checkout', { state: { paymentFlow: 'identityVerification', parentRoute } });
  };

  const handleCancelVerification = () => {
    alert('Verification cancelled');
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <HomeLayout
        currentRoute="/owner/user-verification"
        onNavigate={handleNavigate}
        parentRoute={parentRoute}
      >
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              User Verification
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Verify user identities and manage verification requests
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards users={mockUsers} />

          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            users={mockUsers}
          />

          {/* Users Table */}
          <UsersTable
            users={filteredUsers}
            isMobile={isMobile}
            onUserClick={handleUserClick}
          />
        </div>
      </HomeLayout>

      {/* Verification Dialog */}
      {selectedUser && (
        <VerificationConfirmDialog
          user={selectedUser}
          onConfirm={handleConfirmVerification}
          onCancel={handleCancelVerification}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};
