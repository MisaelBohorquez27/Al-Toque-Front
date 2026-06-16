import React from 'react';
import { Home, Settings, Shield } from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  icon: React.ElementType;
  label: string;
  route: string;
  index: number;
}

interface HomeLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string, index: number) => void;
  parentRoute?: string;
}

// Configuración de navegación centralizada
const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: 'Home', route: '/owner/home', index: 0 },
  { icon: Shield, label: 'Services', route: '/owner/services', index: 3 },
  { icon: Settings, label: 'Settings', route: '/owner/settings', index: 5 },
];

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  parentRoute,
}) => {
  // Encontrar el índice seleccionado basado en la ruta actual o ruta padre
  const getSelectedIndex = (): number => {
    const routeToCheck = parentRoute || currentRoute;
    const foundItem = NAV_ITEMS.find(item => routeToCheck.includes(item.route));
    return foundItem?.index ?? 0;
  };

  const selectedIndex = getSelectedIndex();

  // Manejar navegación
  const handleNavigate = (item: NavItem) => {
    onNavigate(item.route, item.index);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-xl">
          {/* Header del Sidebar */}
          <div className="px-6 py-8 bg-linear-to-br from-sky-900 to-sky-800">
            <div className="rounded-2xl p-5 text-white">
              <h3 className="text-md uppercase tracking-[0.3em] font-bold text-sky-200">
                Al Toque
              </h3>
              <p className="mt-2 text-xs leading-5 text-sky-100">
                Administra tus servicios de verificación y firma electrónica de
              </p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === item.index;

              return (
                <button
                  key={item.route}
                  onClick={() => handleNavigate(item)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-all duration-200 cursor-pointer group',
                    isSelected
                      ? 'bg-sky-950 text-white shadow-lg shadow-sky-900/20'
                      : 'text-gray-600 hover:bg-sky-50 hover:text-sky-900'
                  )}
                >
                  <Icon 
                    size={20} 
                    className={clsx(
                      'transition-all duration-200',
                      isSelected ? 'text-white' : 'text-gray-500 group-hover:text-sky-600'
                    )}
                  />
                  <span className={clsx(
                    'text-sm font-medium transition-all duration-200',
                    isSelected ? 'text-white' : 'group-hover:text-sky-900'
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Indicador activo */}
                  {isSelected && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer del Sidebar */}
          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Al Toque User</p>
                <p className="text-xs text-gray-500 truncate">user@altoque.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 pb-24 lg:pb-8">
          <div className="container-custom py-6 md:py-8 px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-xl shadow-lg lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedIndex === item.index;

            return (
              <button
                key={item.route}
                onClick={() => handleNavigate(item)}
                className={clsx(
                  'flex flex-col items-center rounded-xl px-3 py-2 transition-all duration-200 min-w-16',
                  isSelected 
                    ? 'text-sky-600 bg-sky-50' 
                    : 'text-gray-500 hover:text-sky-600 hover:bg-sky-50'
                )}
              >
                <Icon 
                  size={22} 
                  className={clsx(
                    'transition-all duration-200',
                    isSelected && 'scale-110'
                  )} 
                />
                <span className={clsx(
                  'mt-1 text-[11px] font-medium transition-all duration-200',
                  isSelected ? 'text-sky-600' : 'text-gray-500'
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};