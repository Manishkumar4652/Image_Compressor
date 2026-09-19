'use client';

import React from 'react';
import { BatchQueueItem } from '@/types/batch';

interface BatchQueueListProps {
  items: BatchQueueItem[];
  onRemoveItem: (id: string) => void;
  isProcessing: boolean;
}

export function BatchQueueList({ items, onRemoveItem, isProcessing }: BatchQueueListProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getStatusBadge = (item: BatchQueueItem) => {
    switch (item.status) {
      case 'processing':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400">
            <svg className="h-3 w-3 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
            <span>Completed ✓</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center space-x-1 rounded-full bg-red-500/10 border border-red-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-red-400">
            <span>Failed ✕</span>
          </span>
        );
      case 'waiting':
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
            Waiting
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span>Batch Queue ({items.length} Files)</span>
      </div>

      {/* Desktop & Mobile Responsive List */}
      <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs gap-3 min-w-0"
          >
            {/* File Info */}
            <div className="flex items-center space-x-3 overflow-hidden min-w-0 flex-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase text-[10px]">
                {item.inputFormat}
              </div>
              <div className="truncate min-w-0 flex-1">
                <p className="font-semibold text-slate-200 truncate">{item.filename}</p>
                <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                  <span>{formatBytes(item.originalSize)}</span>
                  {item.compressedSize !== undefined && (
                    <>
                      <span>→</span>
                      <span className="font-semibold text-indigo-300">
                        {formatBytes(item.compressedSize)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0">
              {/* Status Badge */}
              {getStatusBadge(item)}

              {/* Saved % Badge */}
              {item.savedPercentage !== undefined && item.status === 'completed' && (
                <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  -{item.savedPercentage}%
                </span>
              )}

              {/* Error Message */}
              {item.error && (
                <span className="text-[10px] text-red-400 truncate max-w-[120px]" title={item.error}>
                  {item.error}
                </span>
              )}

              {/* Actions: Download Individual or Remove */}
              <div className="flex items-center space-x-1">
                {item.status === 'completed' && item.compressedResult?.downloadUrl && (
                  <a
                    href={item.compressedResult.downloadUrl}
                    download={item.compressedResult.name}
                    className="rounded-lg bg-indigo-600/20 border border-indigo-500/30 p-2 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title="Download individual compressed file"
                    aria-label={`Download ${item.compressedResult.name}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                )}

                <button
                  onClick={() => onRemoveItem(item.id)}
                  disabled={isProcessing}
                  className="rounded-lg p-2 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center"
                  aria-label={`Remove ${item.filename}`}
                  title="Remove from queue"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
