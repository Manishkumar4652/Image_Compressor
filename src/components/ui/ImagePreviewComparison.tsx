'use client';

import React from 'react';
import { ImageDimensions } from '@/types/processing';

interface ImagePreviewComparisonProps {
  originalUrl: string;
  compressedUrl: string;
  originalSize: string;
  compressedSize: string;
  originalDimensions?: ImageDimensions;
  compressedDimensions?: ImageDimensions;
  savedPercentage?: number;
  format: string;
}

export function ImagePreviewComparison({
  originalUrl,
  compressedUrl,
  originalSize,
  compressedSize,
  originalDimensions,
  compressedDimensions,
  savedPercentage = 0,
  format,
}: ImagePreviewComparisonProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
          Before / After Comparison
        </h3>
        {savedPercentage > 0 ? (
          <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-emerald-800">
            Saved {savedPercentage}%
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-amber-800">
            Size Increased ({Math.abs(savedPercentage)}%)
          </span>
        )}
      </div>

      {/* Desktop Side-by-Side (grid-cols-2) / Mobile Stacked (grid-cols-1) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Original Image Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/60 bg-white/80 p-3.5 sm:p-4 shadow-lg shadow-indigo-500/5 backdrop-blur-xl min-w-0">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 gap-2">
              <span className="font-extrabold text-slate-900 truncate">Original Image</span>
              <span className="rounded-lg bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-slate-700 font-bold shrink-0 text-[11px]">
                {originalSize}
              </span>
            </div>

            <div className="relative flex min-h-[140px] sm:min-h-[200px] max-h-[220px] sm:max-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/70 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original image"
                className="max-h-[190px] sm:max-h-[260px] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>
              {originalDimensions
                ? `${originalDimensions.width} × ${originalDimensions.height} px`
                : 'Original Dimensions'}
            </span>
          </div>
        </div>

        {/* Compressed Image Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-purple-200 bg-white/90 p-3.5 sm:p-4 shadow-lg shadow-purple-500/5 backdrop-blur-xl min-w-0">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 gap-2">
              <span className="font-extrabold text-purple-700 truncate">Compressed ({format.toUpperCase()})</span>
              <span className="rounded-lg bg-purple-100 border border-purple-200 px-2 py-0.5 font-mono font-extrabold text-purple-800 shrink-0 text-[11px]">
                {compressedSize}
              </span>
            </div>

            <div className="relative flex min-h-[140px] sm:min-h-[200px] max-h-[220px] sm:max-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-purple-200/60 bg-purple-50/30 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={compressedUrl}
                alt="Compressed image"
                className="max-h-[190px] sm:max-h-[260px] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>
              {compressedDimensions
                ? `${compressedDimensions.width} × ${compressedDimensions.height} px`
                : 'Compressed Dimensions'}
            </span>
            <span className="font-extrabold text-emerald-700">
              {savedPercentage > 0 ? `-${savedPercentage}%` : '0%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
