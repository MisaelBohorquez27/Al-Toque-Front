import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import { mockUsers } from '../data/mock_users';
import { HomeLayout } from '../components/layout/home_layout';
import { StatsCards } from '../components/users/stats_cards';
import { SearchAndFilters } from '../components/users/search_filters';
import { UsersTable } from '../components/users/users_table';
import { VerificationConfirmDialog } from '../components/users/verification_confirm_dialog';
import type { UserVerification } from '../types/user_verification';

export const UserVerificationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<UserVerification | null>(null);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

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
    navigate('/payment-checkout');
  };

  const handleCancelVerification = () => {
    alert('Verification cancelled');
  };

  const selectedBottomNavIndex = () => {
    return 3; // Services tab (ajusta según tu navegación)
  };

  const navigateByIndex = (index: number) => {
    console.log(`Navigate to tab ${index}`);
    switch (index) {
      case 0:
        alert('Navigate to Home');
        break;
      case 1:
        alert('Navigate to Contracts');
        break;
      case 2:
        alert('Navigate to Properties');
        break;
      case 3:
        // Already on Services
        break;
      case 4:
        alert('Navigate to Settings');
        break;
    }
  };

  return (
    <>
      <HomeLayout
        currentRoute="/owner/user-verification"
        selectedBottomNavIndex={selectedBottomNavIndex()}
        onBottomNavTapped={navigateByIndex}
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