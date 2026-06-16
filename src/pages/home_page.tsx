import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeLayout } from '../components/layout/home_layout';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <HomeLayout currentRoute="/owner/home" onNavigate={(route) => handleNavigate(route)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido a tu panel de control</h1>
        <p className="text-gray-600 mt-2">
          Aquí puedes gestionar tus servicios, contratos y propiedades.
        </p>
      </div>
    </HomeLayout>
  );
};