'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolDefinition, ImageFormat } from '@/types/tool';
import { BatchQueueItem, BatchSettings, BatchSummary } from '@/types/batch';
import { validateImageFile } from '@/lib/compression/validation';
import { processBatchItem, computeBatchSummary } from '@/lib/compression/batchController';
import { createBatchZip } from '@/lib/zip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BatchQueueList } from '@/components/ui/BatchQueueList';
import { BatchSummaryCard } from '@/components/ui/BatchSummaryCard';

interface BatchImageCompressorProps {
  tool: ToolDefinition;
}

export function BatchImageCompressor({ tool }: BatchImageCompressorProps) {
  const [queue, setQueue] = useState<BatchQueueItem[]>([]);
  const [quality, setQuality] = useState<number>(tool.defaultQuality || 80);
  const [format, setFormat] = useState<'original' | ImageFormat>('original');

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up Object URLs
  const cleanupAllObjectUrls = useCallback((items: BatchQueueItem[]) => {
    for (const item of items) {
      if (item.compressedResult?.downloadUrl) {
        URL.revokeObjectURL(item.compressedResult.downloadUrl);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupAllObjectUrls(queue);
    };
  }, [queue, cleanupAllObjectUrls]);

  // Add Files to Queue
  const handleAddFiles = (fileList: FileList | File[]) => {
    const newItems: BatchQueueItem[] = [];
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      try {
        validateImageFile(file);
        const inputFmt = (file.type.split('/')[1] || 'jpg') as ImageFormat;
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          filename: file.name,
          inputFormat: inputFmt,
          originalSize: file.size,
          status: 'waiting',
        });
      } catch (err: unknown) {
        const inputFmt = (file.type.split('/')[1] || 'jpg') as ImageFormat;
        const msg = err instanceof Error ? err.message : 'Invalid file format.';
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          filename: file.name,
          inputFormat: inputFmt,
          originalSize: file.size,
          status: 'failed',
          error: msg,
        });
      }
    }

    setQueue((prev) => [...prev, ...newItems]);
    setIsFinished(false);
  };

  // Drag and Drop Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddFiles(e.target.files);
    }
  };

  // Remove Single Item from Queue
  const handleRemoveItem = (id: string) => {
    setQueue((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.compressedResult?.downloadUrl) {
        URL.revokeObjectURL(target.compressedResult.downloadUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Clear All Queue State
  const handleClearAll = () => {
    cleanupAllObjectUrls(queue);
    setQueue([]);
    setIsFinished(false);
    setIsProcessing(false);
    setCurrentIndex(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Main Sequential Batch Compression Execution
  const handleCompressAll = async () => {
    if (queue.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setIsFinished(false);
    setCurrentIndex(0);

    const settings: BatchSettings = { quality, format };
    const updatedQueue = [...queue];

    for (let i = 0; i < updatedQueue.length; i++) {
      const currentItem = updatedQueue[i];

      // Skip already processed items
      if (currentItem.status === 'completed') continue;

      // Update current item to processing state
      setCurrentIndex(i + 1);
      updatedQueue[i] = { ...currentItem, status: 'processing' };
      setQueue([...updatedQueue]);

      // Execute browser-side compression
      const processedItem = await processBatchItem(currentItem, settings);
      updatedQueue[i] = processedItem;
      setQueue([...updatedQueue]);
    }

    setIsProcessing(false);
    setIsFinished(true);
  };

  // Download All as ZIP
  const handleDownloadZip = async () => {
    if (isGeneratingZip) return;
    setIsGeneratingZip(true);

    try {
      const { url } = await createBatchZip(queue);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixoptimize-compressed-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to generate ZIP archive.');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const batchSummary: BatchSummary = computeBatchSummary(queue);

  return (
    <div className="space-y-8">
      {/* Drag & Drop Upload Zone */}
      <div className="rounded-3xl border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
        <div
          suppressHydrationWarning
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Upload multiple images for batch compression"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isDragging
              ? 'border-purple-500 bg-purple-100/50 scale-[1.01]'
              : 'border-purple-200/80 bg-purple-50/40 hover:border-purple-400 hover:bg-purple-50/80'
          }`}
        >
          <input
            suppressHydrationWarning
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <h3 className="text-base font-extrabold text-slate-900">
            Tap to select multiple photos or drop here
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            Compress JPG, PNG, and WebP images simultaneously in your browser
          </p>
        </div>
      </div>

      {/* Active Queue & Controls */}
      {queue.length > 0 && (
        <div className="space-y-6">
          {/* Batch Settings Bar */}
          <div className="rounded-2xl border border-white/60 bg-white/90 p-5 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Quality Slider */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <label htmlFor="batch-quality-slider">Batch Compression Quality</label>
                  <span className="font-mono text-purple-600 font-bold text-sm">{quality}%</span>
                </div>
                <input
                  id="batch-quality-slider"
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  disabled={isProcessing}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-purple-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  aria-label="Batch quality slider"
                />
              </div>

              {/* Format Selector */}
              <div className="w-full md:w-56 space-y-1">
                <label htmlFor="batch-format-select" className="block text-xs font-semibold text-slate-700">
                  Output Format
                </label>
                <div className="relative">
                  <select
                    id="batch-format-select"
                    value={format}
                    disabled={isProcessing}
                    onChange={(e) => setFormat(e.target.value as 'original' | ImageFormat)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[44px] cursor-pointer"
                  >
                    <option value="original">Preserve Original Formats</option>
                    <option value="jpg">Convert All to JPG</option>
                    <option value="webp">Convert All to WebP</option>
                    <option value="png">Convert All to PNG</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
              <button
                onClick={handleClearAll}
                disabled={isProcessing}
                className="w-full sm:w-auto text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-2 py-1.5 min-h-[40px] flex items-center justify-center"
              >
                Clear All Files
              </button>

              <button
                onClick={handleCompressAll}
                disabled={isProcessing || queue.every((item) => item.status === 'completed')}
                className="w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px]"
              >
                {isProcessing ? 'Compressing Batch...' : 'Compress All Images'}
              </button>
            </div>
          </div>

          {/* Real Batch Progress Indicator */}
          {isProcessing && (
            <ProgressBar
              current={currentIndex}
              total={queue.length}
              label={`Compressing batch (${currentIndex} of ${queue.length})`}
            />
          )}

          {/* Queue List */}
          <BatchQueueList
            items={queue}
            onRemoveItem={handleRemoveItem}
            isProcessing={isProcessing}
          />

          {/* Completion Summary & ZIP Downloader */}
          {isFinished && batchSummary.completedCount > 0 && (
            <BatchSummaryCard
              summary={batchSummary}
              onDownloadZip={handleDownloadZip}
              onClearAll={handleClearAll}
              isGeneratingZip={isGeneratingZip}
            />
          )}
        </div>
      )}
    </div>
  );
}
