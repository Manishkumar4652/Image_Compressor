import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-xs text-indigo-300">
      <div className="flex items-center justify-between font-semibold">
        <span>{label || `Compressing ${current} of ${total}`}</span>
        <span className="font-mono text-indigo-400 font-bold">{percentage}%</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
