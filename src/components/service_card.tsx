import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceCardProps } from '../types';

export const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const IconComponent = item.icon as React.ElementType;

  return (
    <div
      onClick={item.onTap}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)] animate-slide-up backdrop-blur-xl"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)` }}
      />

      <div className="flex h-full flex-col p-5 md:p-6">
        <div
          className="inline-flex w-fit rounded-2xl p-3 transition-transform group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
          }}
        >
          <IconComponent size={22} className="text-white" />
        </div>

        <div className="mt-4 flex-1">
          <h3 className="mb-2 line-clamp-1 text-base font-semibold tracking-tight text-slate-950 md:text-lg">
            {item.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Ver detalle
          </span>
          <div
            className="rounded-xl p-2 transition-all group-hover:scale-110"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <ArrowRight size={16} style={{ color: item.color }} />
          </div>
        </div>
      </div>
    </div>
  );
};