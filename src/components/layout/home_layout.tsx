import React from 'react';
import { Home, FileText, Building, Settings, Shield } from 'lucide-react';
import clsx from 'clsx';

interface HomeLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  selectedBottomNavIndex: number;
  onBottomNavTapped: (index: number) => void;
}

const navItems = [
  { icon: Home, label: 'Home', route: '/owner/home' },
  { icon: FileText, label: 'Contracts', route: '/owner/contracts' },
  { icon: Building, label: 'Properties', route: '/owner/properties' },
  { icon: Shield, label: 'Services', route: '/owner/services' },
  { icon: Settings, label: 'Settings', route: '/owner/settings' },
];

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  selectedBottomNavIndex,
  onBottomNavTapped,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container-custom py-6 md:py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center px-4 py-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedBottomNavIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => onBottomNavTapped(index)}
                className={clsx(
                  'flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200',
                  isSelected
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <Icon
                  size={24}
                  className={clsx(
                    'transition-transform',
                    isSelected && 'scale-110'
                  )}
                />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Navigation - Desktop (optional) */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:bottom-0 md:w-64 md:bg-white md:border-r md:border-gray-200 md:flex md:flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary">Al Toque</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedBottomNavIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => onBottomNavTapped(index)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isSelected
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};