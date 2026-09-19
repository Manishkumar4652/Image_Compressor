'use client';

import React from 'react';
import { BatchSummary } from '@/types/batch';

interface BatchSummaryCardProps {
  summary: BatchSummary;
  onDownloadZip: () => void;
  onClearAll: () => void;
  isGeneratingZip: boolean;
}

export function BatchSummaryCard({
  summary,
  onDownloadZip,
  onClearAll,
  isGeneratingZip,
}: BatchSummaryCardProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Batch Summary
        </h3>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
          Total Saved: {summary.totalSavedPercentage}%
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-950 p-2.5 sm:p-3 text-center border border-slate-800">
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Completed</span>
          <span className="mt-1 block text-xs sm:text-sm font-bold text-slate-200">
            {summary.completedCount} / {summary.totalFiles}
          </span>
        </div>

        {summary.failedCount > 0 && (
          <div className="rounded-xl bg-slate-950 p-2.5 sm:p-3 text-center border border-red-500/30">
            <span className="block text-[10px] font-semibold uppercase text-red-400">Failed</span>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-red-400">{summary.failedCount}</span>
          </div>
        )}

        <div className="rounded-xl bg-slate-950 p-2.5 sm:p-3 text-center border border-slate-800">
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Original Total</span>
          <span className="mt-1 block text-xs sm:text-sm font-bold text-slate-300 truncate">
            {formatBytes(summary.originalTotalBytes)}
          </span>
        </div>

        <div className="rounded-xl bg-slate-950 p-2.5 sm:p-3 text-center border border-indigo-500/30">
          <span className="block text-[10px] font-semibold uppercase text-indigo-400">Compressed Total</span>
          <span className="mt-1 block text-xs sm:text-sm font-bold text-indigo-300 truncate">
            {formatBytes(summary.compressedTotalBytes)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={onClearAll}
          className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px] flex items-center justify-center"
        >
          Start Over / Clear All
        </button>

        {summary.completedCount > 0 && (
          <button
            onClick={onDownloadZip}
            disabled={isGeneratingZip}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px]"
          >
            {isGeneratingZip ? (
              <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
            <span>Download All as ZIP ({summary.completedCount} Files)</span>
          </button>
        )}
      </div>
    </div>
  );
}
