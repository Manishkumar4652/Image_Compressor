'use client';

import React, { useState } from 'react';
import { ToolDefinition } from '@/types/tool';
import { SingleImageCompressor } from '@/components/tools/SingleImageCompressor';
import { BatchImageCompressor } from '@/components/tools/BatchImageCompressor';

interface CompressorWorkspaceProps {
  tool: ToolDefinition;
}

export function CompressorWorkspace({ tool }: CompressorWorkspaceProps) {
  const [mode, setMode] = useState<'single' | 'batch'>('single');

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-col items-center space-y-1.5 w-full">
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-700">
          Processing Mode
        </span>
        <div className="inline-flex w-full max-w-sm sm:max-w-md rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300/70 backdrop-blur-md shadow-inner">
          <button
            suppressHydrationWarning
            onClick={() => setMode('single')}
            aria-pressed={mode === 'single'}
            className={`flex-1 min-h-[44px] rounded-xl px-3 sm:px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center truncate ${
              mode === 'single'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Single Image
          </button>
          <button
            suppressHydrationWarning
            onClick={() => setMode('batch')}
            aria-pressed={mode === 'batch'}
            className={`flex-1 min-h-[44px] rounded-xl px-3 sm:px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center truncate ${
              mode === 'batch'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Batch Mode
          </button>
        </div>
      </div>

      {/* Render Selected Workspace */}
      {mode === 'single' ? (
        <SingleImageCompressor tool={tool} />
      ) : (
        <BatchImageCompressor tool={tool} />
      )}
    </div>
  );
}
