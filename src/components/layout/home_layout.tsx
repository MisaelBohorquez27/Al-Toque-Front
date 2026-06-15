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
    <div className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[76rem] flex-col lg:flex-row">
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-white/60 lg:bg-white/70 lg:backdrop-blur-xl">
          <div className="px-6 py-8">
            <div className="rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-[0_20px_70px_rgba(15,23,42,0.28)]">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200/80">Al Toque</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Gestión clara, rápida y segura</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Navega entre tus servicios, contratos y propiedades desde una experiencia más limpia.
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 pb-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedBottomNavIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => onBottomNavTapped(index)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200',
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 pb-24 lg:pb-8">
          <div className="container-custom py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/70 bg-white/85 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedBottomNavIndex === index;

            return (
              <button
                key={index}
                onClick={() => onBottomNavTapped(index)}
                className={clsx(
                  'flex flex-col items-center rounded-2xl px-3 py-2 transition-all duration-200',
                  isSelected ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                <Icon size={23} className={clsx('transition-transform', isSelected && 'scale-110')} />
                <span className="mt-1 text-[11px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};