import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconType?: 'design' | 'performance' | 'connectivity' | 'security' | 'privacy';
}

export function FeatureCard({ title, description, iconType = 'performance' }: FeatureCardProps) {
  const renderIcon = () => {
    switch (iconType) {
      case 'design':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        );
      case 'connectivity':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.757 8.586a15 15 0 0120.486 0" />
        );
      case 'security':
      case 'privacy':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'performance':
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
    }
  };

  return (
    <div className="flowe-card group rounded-2xl sm:rounded-3xl p-3.5 sm:p-8">
      <div className="mb-3 sm:mb-5 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-50 border border-purple-200/60 text-purple-700 shadow-xs group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
        <svg className="h-4.5 w-4.5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {renderIcon()}
        </svg>
      </div>
      <h3 className="text-xs sm:text-lg font-extrabold tracking-tight text-slate-900 transition-colors leading-snug">
        {title}
      </h3>
      <p className="mt-1 sm:mt-2.5 text-[11px] sm:text-xs leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}
