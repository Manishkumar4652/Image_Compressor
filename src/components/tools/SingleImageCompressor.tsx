'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolDefinition, ImageFormat } from '@/types/tool';
import { ProcessingResult, ProcessingError } from '@/types/processing';
import { compressImageInBrowser } from '@/lib/compression/engine';
import { validateImageFile } from '@/lib/compression/validation';
import { ImagePreviewComparison } from '@/components/ui/ImagePreviewComparison';
import { CompressionResultCard } from '@/components/ui/CompressionResultCard';
import { TargetSizeCompressor } from '@/components/tools/TargetSizeCompressor';

interface SingleImageCompressorProps {
  tool: ToolDefinition;
  initialTargetBytes?: number;
}

export function SingleImageCompressor({ tool, initialTargetBytes }: SingleImageCompressorProps) {
  const [mode, setMode] = useState<'quality' | 'target'>(initialTargetBytes ? 'target' : 'quality');

  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(tool.defaultQuality || 80);
  const [format, setFormat] = useState<ImageFormat>(
    (tool.supportedOutputFormats[0] || 'jpg') as ImageFormat
  );

  const [status, setStatus] = useState<'idle' | 'loading' | 'compressing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

  const processFile = useCallback(
    async (targetFile: File, targetQuality: number, targetFormat: ImageFormat) => {
      setStatus('compressing');
      setErrorMessage(null);

      try {
        validateImageFile(targetFile);

        const res = await compressImageInBrowser(targetFile, {
          quality: targetQuality,
          format: targetFormat,
        });

        setResult(res);
        setStatus('success');
      } catch (err: unknown) {
        setStatus('error');
        if (err instanceof ProcessingError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('Unable to process this image. Please try another JPG, PNG, or WebP file.');
        }
      }
    },
    []
  );

  const handleSelectFile = (selectedFile: File) => {
    cleanupUrls();
    setErrorMessage(null);
    setStatus('loading');

    try {
      validateImageFile(selectedFile);
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setOriginalPreviewUrl(url);

      const initialFormat = (selectedFile.type.split('/')[1] || 'jpg') as ImageFormat;
      const validFormat = tool.supportedOutputFormats.includes(initialFormat)
        ? initialFormat
        : tool.supportedOutputFormats[0] || 'jpg';

      setFormat(validFormat);
      processFile(selectedFile, quality, validFormat);
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

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (file) {
      processFile(file, newQuality, format);
    }
  };

  const handleFormatChange = (newFormat: ImageFormat) => {
    setFormat(newFormat);
    if (file) {
      processFile(file, quality, newFormat);
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
    <div className="space-y-6">
      {/* Mode Selector Tab (Quality Mode vs Target Size Mode) */}
      <div className="flex flex-col items-center space-y-1.5 w-full">
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-700">
          Optimization Goal
        </span>
        <div className="inline-flex w-full max-w-xs sm:max-w-sm rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300/70 backdrop-blur-md shadow-inner">
          <button
            suppressHydrationWarning
            onClick={() => setMode('quality')}
            aria-pressed={mode === 'quality'}
            className={`flex-1 min-h-[44px] rounded-xl px-3 sm:px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center truncate ${
              mode === 'quality'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quality Mode
          </button>
          <button
            suppressHydrationWarning
            onClick={() => setMode('target')}
            aria-pressed={mode === 'target'}
            className={`flex-1 min-h-[44px] rounded-xl px-3 sm:px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center truncate ${
              mode === 'target'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Target Size Mode
          </button>
        </div>
      </div>

      {mode === 'target' ? (
        <TargetSizeCompressor tool={tool} initialTargetBytes={initialTargetBytes} />
      ) : (
        <div className="space-y-8">
          {/* Upload Dropzone Area */}
          {!file && (
            <div className="rounded-3xl border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
              <div
                suppressHydrationWarning
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload an image to compress"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
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

                <h2 className="text-base font-extrabold text-slate-900">
                  Tap to select photo or drop image here
                </h2>
                <p className="mt-1 text-xs text-slate-500 max-w-sm">
                  Supports JPG, PNG, and WebP images up to 50MB (Single Image Processing)
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['JPG', 'PNG', 'WEBP'].map((fmt) => (
                    <span key={fmt} className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 shadow-xs">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Alert Banner */}
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

                <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                  {/* Quality Slider */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <label htmlFor="quality-slider" className="flex items-center space-x-1">
                        <span>Compression Quality</span>
                      </label>
                      <span className="font-mono text-purple-600 font-bold text-sm">{quality}%</span>
                    </div>
                    <input
                      id="quality-slider"
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      disabled={status === 'compressing'}
                      onChange={(e) => handleQualityChange(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-purple-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      aria-label="Compression quality slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>Smallest Size</span>
                      <span>Highest Quality</span>
                    </div>
                  </div>

                  {/* Format Selector */}
                  <div className="w-full md:w-56 space-y-1">
                    <label htmlFor="format-select" className="block text-xs font-semibold text-slate-700">
                      Output Format
                    </label>
                    <div className="relative">
                      <select
                        id="format-select"
                        value={format}
                        disabled={status === 'compressing'}
                        onChange={(e) => handleFormatChange(e.target.value as ImageFormat)}
                        className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[44px] cursor-pointer"
                      >
                        <option value="jpg">JPG (Lossy, Smallest File)</option>
                        <option value="webp">WebP (Modern, High Savings)</option>
                        <option value="png">PNG (Lossless / Transparent)</option>
                      </select>
                      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {format === 'png' ? 'PNG uses lossless optimization.' : 'JPEG/WebP quality controls payload size.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Loading Indicator for initial load */}
              {status === 'compressing' && !result && (
                <div className="flex items-center justify-center space-x-3 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-purple-700">
                  <svg className="h-5 w-5 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xs font-semibold">Compressing image locally in browser memory...</span>
                </div>
              )}

              {/* Result Card & Downloads */}
              {result && (
                <>
                  <CompressionResultCard
                    originalSizeStr={formatBytes(file.size)}
                    compressedSizeStr={formatBytes(result.size)}
                    savedPercentage={result.compressionRatio || 0}
                    format={result.format}
                    downloadUrl={result.downloadUrl || '#'}
                    filename={result.name}
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
      )}
    </div>
  );
}
