'use client';

import React from 'react';
import { trackFileDownload } from '@/lib/analytics';

interface CompressionResultCardProps {
  originalSizeStr: string;
  compressedSizeStr: string;
  savedPercentage: number;
  format: string;
  downloadUrl: string;
  filename: string;
  onReset: () => void;
  toolName?: string;
}

export function CompressionResultCard({
  originalSizeStr,
  compressedSizeStr,
  savedPercentage,
  format,
  downloadUrl,
  filename,
  onReset,
  toolName = 'image-tool',
}: CompressionResultCardProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/90 p-4 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto">
          <div className="rounded-2xl bg-slate-50 p-2 sm:p-3 text-center border border-slate-200">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase text-slate-500">Original</span>
            <span className="mt-0.5 sm:mt-1 block text-xs sm:text-sm font-extrabold text-slate-900 truncate">{originalSizeStr}</span>
          </div>

          <div className="rounded-2xl bg-purple-50 p-2 sm:p-3 text-center border border-purple-200">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase text-purple-700">Compressed</span>
            <span className="mt-0.5 sm:mt-1 block text-xs sm:text-sm font-extrabold text-purple-900 truncate">{compressedSizeStr}</span>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-2 sm:p-3 text-center border border-emerald-200">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase text-emerald-700">Saved</span>
            <span className="mt-0.5 sm:mt-1 block text-xs sm:text-sm font-extrabold text-emerald-800">
              {savedPercentage > 0 ? `${savedPercentage}%` : '0%'}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <a
            href={downloadUrl}
            download={filename}
            onClick={() =>
              trackFileDownload({
                tool_name: toolName,
                output_format: format,
                download_type: 'single',
              })
            }
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-indigo-500/25 transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 min-h-[44px] order-1 sm:order-2"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download ({format.toUpperCase()})</span>
          </a>

          <button
            onClick={onReset}
            className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 min-h-[44px] flex items-center justify-center order-2 sm:order-1"
          >
            Compress Another
          </button>
        </div>
      </div>
    </div>
  );
}
