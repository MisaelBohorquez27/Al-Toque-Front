import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceCardProps } from '../types';

export const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const IconComponent = item.icon as React.ElementType;

  return (
    <div
      onClick={item.onTap}
      className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer animate-slide-up"
    >
      <div className="p-4 md:p-5 h-full flex flex-col">
        {/* Icon with gradient background */}
        <div
          className="inline-flex p-2.5 rounded-xl w-fit transition-transform group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
          }}
        >
          <IconComponent size={20} className="text-white" />
        </div>

        <div className="mt-3 md:mt-4 flex-1">
          {/* Title */}
          <h3 className="text-sm md:text-base font-bold text-text-primary tracking-tight mb-1.5 line-clamp-1">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="mt-3 flex justify-end">
          <div
            className="p-1.5 rounded-lg transition-all group-hover:scale-110"
            style={{ backgroundColor: `${item.color}1a` }}
          >
            <ArrowRight size={14} style={{ color: item.color }} />
          </div>
        </div>
      </div>
    </div>
  );
};