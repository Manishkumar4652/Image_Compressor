'use client';

import React from 'react';
import { TargetSizeResult } from '@/lib/compression/targetSizeEngine';
import { trackFileDownload } from '@/lib/analytics';

interface TargetSizeResultCardProps {
  originalSizeStr: string;
  targetSizeBytes: number;
  result: TargetSizeResult;
  onReset: () => void;
}

export function TargetSizeResultCard({
  originalSizeStr,
  targetSizeBytes,
  result,
  onReset,
}: TargetSizeResultCardProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const targetStr = formatBytes(targetSizeBytes);
  const resultStr = formatBytes(result.size);

  return (
    <div className="rounded-3xl border border-white/60 bg-white/90 p-5 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl space-y-6">
      {/* Header & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {result.targetReached ? (
            <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
              <span>Target Reached ✓</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
              <span>Closest Practical Result</span>
            </span>
          )}
          <span className="text-xs text-slate-500 font-medium">({result.attempts} search attempts)</span>
        </div>

        <span className="text-xs text-slate-600 font-semibold">Quality Used: <strong className="text-purple-700 font-bold">{result.qualityUsed}%</strong></span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed bg-purple-50/50 p-3 rounded-2xl border border-purple-100 font-medium">
        {result.message}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-2.5 sm:p-3 text-center border border-slate-200">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Original</span>
          <span className="mt-1 block text-xs sm:text-sm font-extrabold text-slate-900 truncate">{originalSizeStr}</span>
        </div>

        <div className="rounded-2xl bg-slate-50 p-2.5 sm:p-3 text-center border border-slate-200">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Target Cap</span>
          <span className="mt-1 block text-xs sm:text-sm font-extrabold text-purple-700 truncate">{targetStr}</span>
        </div>

        <div className="rounded-2xl bg-purple-50 p-2.5 sm:p-3 text-center border border-purple-200">
          <span className="block text-[10px] font-bold uppercase text-purple-700">Achieved Size</span>
          <span className="mt-1 block text-xs sm:text-sm font-extrabold text-purple-900 truncate">{resultStr}</span>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-2.5 sm:p-3 text-center border border-emerald-200">
          <span className="block text-[10px] font-bold uppercase text-emerald-700">Saved</span>
          <span className="mt-1 block text-xs sm:text-sm font-extrabold text-emerald-800">
            {result.compressionRatio ? `${result.compressionRatio}%` : '0%'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={onReset}
          className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 min-h-[44px] flex items-center justify-center"
        >
          Start Over / Remove Image
        </button>

        <a
          href={result.downloadUrl || '#'}
          download={result.name}
          onClick={() =>
            trackFileDownload({
              tool_name: 'target-size-tool',
              output_format: result.format,
              download_type: 'single',
            })
          }
          className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-indigo-500/25 transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 min-h-[44px]"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Target ({result.format.toUpperCase()})</span>
        </a>
      </div>
    </div>
  );
}
