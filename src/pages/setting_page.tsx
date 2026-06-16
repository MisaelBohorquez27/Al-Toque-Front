import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeLayout } from '../components/layout/home_layout';

export const SettingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <HomeLayout currentRoute="/owner/settings" onNavigate={(route) => handleNavigate(route)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-2">
          Aquí puedes ajustar tus preferencias y configuraciones de cuenta.
        </p>
      </div>
    </HomeLayout>
  );
};