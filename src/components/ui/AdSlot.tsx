import React from 'react';

interface AdSlotProps {
  slotId?: string;
  className?: string;
}

/**
 * AdSlot provides a clean architecture placeholder for future non-intrusive monetization.
 * Returns null by default when ads are disabled, leaving the tool experience clean.
 */
export function AdSlot({ className = '' }: AdSlotProps) {
  // Set to true when ad provider script is configured in production
  const adsEnabled = false;

  if (!adsEnabled) {
    return null;
  }

  return (
    <div
      className={`my-8 flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-xs text-slate-400 ${className}`}
      aria-hidden="true"
    >
      <span>Advertisement Placeholder</span>
    </div>
  );
}
