import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="mb-6 md:mb-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
        Legal Services
      </h1>
      <p className="text-sm md:text-base text-text-secondary mt-2">
        Manage your identity verification and electronic signature
      </p>
    </div>
  );
};