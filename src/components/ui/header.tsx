import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="animate-fade-in mb-6 md:mb-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm backdrop-blur">
        Owner Services
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
        Centraliza tus servicios sin perder claridad
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
        Revisa identidad y firma electrónica con una interfaz más limpia, con jerarquía visual y mejor soporte para Tailwind.
      </p>
    </div>
  );
};