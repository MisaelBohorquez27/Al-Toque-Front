import React from "react";
import { Bell, User } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between mb-6 md:mb-8 lg:mb-12">
      <div className="animate-fade-in">
        <h1 className="text-md font-semibold tracking-tight text-slate-950 md:text-xl lg:text-2xl">
          Bienvenido, <span className="text-sky-600">Moises</span>
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-green-600 md:text-base">
          Online
        </p>
      </div>

      {/* Aqui ira notificaciones */}
      <div className="flex items-center gap-3">
        <div className="animate-fade-in rounded-full p-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
          <User size={20} />
        </div>
        <div className="animate-fade-in rounded-full p-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
          <Bell size={20} />
        </div>
      </div>
    </div>
  );
};
