'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolDefinition, ImageFormat } from '@/types/tool';
import { validateImageFile } from '@/lib/compression/validation';
import { compressToTargetSize, TargetSizeResult } from '@/lib/compression/targetSizeEngine';
import { ProcessingError } from '@/types/processing';
import { TargetSizePresets } from '@/components/ui/TargetSizePresets';
import { TargetSizeResultCard } from '@/components/ui/TargetSizeResultCard';
import { ImagePreviewComparison } from '@/components/ui/ImagePreviewComparison';
import {
  trackImageProcessed,
  trackImageCompression,
  trackTargetSizeCompleted,
  trackToolError,
  categorizeError,
} from '@/lib/analytics';

interface TargetSizeCompressorProps {
  tool: ToolDefinition;
  initialTargetBytes?: number;
}

export function TargetSizeCompressor({ tool, initialTargetBytes }: TargetSizeCompressorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);

  const defaultTarget = initialTargetBytes || tool.targetSizeBytes || 50 * 1024;
  const [targetBytes, setTargetBytes] = useState<number>(defaultTarget);
  const [format, setFormat] = useState<'original' | ImageFormat>('original');

  const [status, setStatus] = useState<'idle' | 'searching' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<TargetSizeResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const cleanupUrls = useCallback(() => {
    if (originalPreviewUrl) {
      URL.revokeObjectURL(originalPreviewUrl);
      setOriginalPreviewUrl(null);
    }
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
      setResult(null);
    }
  }, [originalPreviewUrl, result]);

  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (result?.downloadUrl) URL.revokeObjectURL(result.downloadUrl);
    };
  }, [originalPreviewUrl, result]);

  // Main Target Size Compression Trigger
  const processTargetCompression = useCallback(
    async (targetFile: File, targetSize: number, targetFormat: 'original' | ImageFormat) => {
      setStatus('searching');
      setErrorMessage(null);
      const inFmt = targetFile.type.split('/')[1] || 'image';

      try {
        validateImageFile(targetFile);

        const res = await compressToTargetSize(targetFile, {
          targetSizeBytes: targetSize,
          format: targetFormat,
        });

        setResult(res);
        setStatus('success');
        const kbValue = Math.round(targetSize / 1024);
        trackImageProcessed({
          tool_name: tool.slug,
          operation: 'target_size',
          input_format: inFmt,
          output_format: res.format,
          processing_mode: 'target_size',
        });
        trackImageCompression({
          tool_name: tool.slug,
          input_format: inFmt,
          output_format: res.format,
          compression_mode: 'target_size',
        });
        trackTargetSizeCompleted({
          target_size: kbValue,
          target_unit: 'KB',
          input_format: inFmt,
          output_format: res.format,
        });
      } catch (err: unknown) {
        setStatus('error');
        const msg = err instanceof Error ? err.message : undefined;
        trackToolError({
          tool_name: tool.slug,
          error_type: categorizeError(msg),
          operation: 'target_size',
        });
        if (err instanceof ProcessingError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('Unable to reach target size for this image. Please try another image or preset.');
        }
      }
    },
    [tool.slug]
  );

  const handleSelectFile = (selectedFile: File) => {
    cleanupUrls();
    setErrorMessage(null);

    try {
      validateImageFile(selectedFile);
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setOriginalPreviewUrl(url);

      processTargetCompression(selectedFile, targetBytes, format);
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof ProcessingError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unsupported file. Please select a valid JPG, PNG, or WebP photo.');
      }
    }
  };

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
      handleSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSelectFile(e.target.files[0]);
    }
  };

  const handleTargetChange = (newBytes: number) => {
    setTargetBytes(newBytes);
    if (file) {
      processTargetCompression(file, newBytes, format);
    }
  };

  const handleFormatChange = (newFormat: 'original' | ImageFormat) => {
    setFormat(newFormat);
    if (file) {
      processTargetCompression(file, targetBytes, newFormat);
    }
  };

  const handleReset = () => {
    cleanupUrls();
    setFile(null);
    setStatus('idle');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
      {!file && (
        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
          <div className="mb-4">
            <TargetSizePresets
              currentTargetBytes={targetBytes}
              onTargetChange={setTargetBytes}
            />
          </div>

          <div
            suppressHydrationWarning
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload an image to compress to target file size"
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
              Tap to select photo under <span className="text-purple-600 font-extrabold">{formatBytes(targetBytes)}</span>
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              Supports JPG, PNG, and WebP up to 50MB (Smart target quality search)
            </p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-600 hover:text-red-800 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Active Processing Dashboard */}
      {file && originalPreviewUrl && (
        <div className="space-y-4 sm:space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-white/60 bg-white/90 p-4 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
            {/* File Info Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4 text-xs gap-2">
              <div className="flex items-center space-x-2 truncate min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-purple-700 font-extrabold text-[10px] uppercase shrink-0 border border-purple-200">
                  {file.name.split('.').pop() || 'IMG'}
                </span>
                <span className="font-bold text-slate-800 truncate text-xs">{file.name}</span>
                <span className="text-slate-400 text-[10px] sm:text-xs shrink-0 font-medium">({formatBytes(file.size)})</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded px-2 py-1 min-h-[36px]"
              >
                Change Photo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 items-center">
              {/* Target Size Presets */}
              <TargetSizePresets
                currentTargetBytes={targetBytes}
                onTargetChange={handleTargetChange}
                disabled={status === 'searching'}
              />

              {/* Format Selector */}
              <div className="space-y-1">
                <label htmlFor="target-format-select" className="block text-xs font-semibold text-slate-700">
                  Output Format
                </label>
                <div className="relative">
                  <select
                    id="target-format-select"
                    value={format}
                    disabled={status === 'searching'}
                    onChange={(e) => handleFormatChange(e.target.value as 'original' | ImageFormat)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[44px] cursor-pointer"
                  >
                    <option value="original">Original Format</option>
                    <option value="jpg">Convert to JPG (Best for Target Sizes)</option>
                    <option value="webp">Convert to WebP (Next-Gen High Ratio)</option>
                    <option value="png">PNG (Lossless Format)</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {format !== 'original' && (
                  <p className="text-[10px] text-purple-600 font-semibold">
                    Notice: Output format will change to {format.toUpperCase()}.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Searching Spinner for initial search */}
          {status === 'searching' && !result && (
            <div className="flex items-center justify-center space-x-3 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-purple-700">
              <svg className="h-5 w-5 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold">
                Searching for optimal quality factor under {formatBytes(targetBytes)}...
              </span>
            </div>
          )}

          {/* Results Card & Preview Comparison */}
          {result && (
            <>
              <TargetSizeResultCard
                originalSizeStr={formatBytes(file.size)}
                targetSizeBytes={targetBytes}
                result={result}
                onReset={handleReset}
              />

              <ImagePreviewComparison
                originalUrl={originalPreviewUrl}
                compressedUrl={result.downloadUrl || originalPreviewUrl}
                originalSize={formatBytes(file.size)}
                compressedSize={formatBytes(result.size)}
                originalDimensions={result.dimensions}
                compressedDimensions={result.dimensions}
                savedPercentage={result.compressionRatio || 0}
                format={result.format}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
