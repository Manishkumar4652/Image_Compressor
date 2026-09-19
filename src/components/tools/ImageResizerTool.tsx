'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolDefinition, ImageFormat } from '@/types/tool';
import { ProcessingResult, ProcessingError, ImageDimensions } from '@/types/processing';
import { validateImageFile } from '@/lib/compression/validation';
import { loadImageElement } from '@/lib/compression/loader';
import { resizeImageInBrowser } from '@/lib/resize/resizeImage';
import { ResizeControls } from '@/components/ui/ResizeControls';
import { ImagePreviewComparison } from '@/components/ui/ImagePreviewComparison';
import { CompressionResultCard } from '@/components/ui/CompressionResultCard';
import {
  trackImageProcessed,
  trackImageResize,
  trackToolError,
  categorizeError,
} from '@/lib/analytics';

interface ImageResizerToolProps {
  tool: ToolDefinition;
}

export function ImageResizerTool({ tool }: ImageResizerToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);

  const [format, setFormat] = useState<ImageFormat>(
    (tool.supportedOutputFormats[0] || 'jpg') as ImageFormat
  );
  const [quality, setQuality] = useState<number>(tool.defaultQuality || 85);

  const [status, setStatus] = useState<'idle' | 'resizing' | 'success' | 'error'>('idle');
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

  // Main Resize Execution
  const processResize = useCallback(
    async (
      targetFile: File,
      w: number,
      h: number,
      targetFormat: ImageFormat,
      targetQuality: number
    ) => {
      setStatus('resizing');
      setErrorMessage(null);
      const inFmt = targetFile.type.split('/')[1] || 'image';

      try {
        validateImageFile(targetFile);

        const res = await resizeImageInBrowser(targetFile, {
          width: w,
          height: h,
          format: targetFormat,
          quality: targetQuality,
        });

        setResult(res);
        setStatus('success');
        trackImageProcessed({
          tool_name: tool.slug,
          operation: 'resize',
          input_format: inFmt,
          output_format: res.format,
          processing_mode: 'resize',
        });
        trackImageResize({
          tool_name: tool.slug,
          input_format: inFmt,
          output_format: res.format,
        });
      } catch (err: unknown) {
        setStatus('error');
        const msg = err instanceof Error ? err.message : undefined;
        trackToolError({
          tool_name: tool.slug,
          error_type: categorizeError(msg),
          operation: 'resize',
        });
        if (err instanceof ProcessingError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('Unable to resize this image. Please try another file or dimension.');
        }
      }
    },
    [tool.slug]
  );

  const handleSelectFile = async (selectedFile: File) => {
    cleanupUrls();
    setErrorMessage(null);

    try {
      validateImageFile(selectedFile);
      setFile(selectedFile);

      // Load original image to obtain dimensions
      const { width, height, objectUrl } = await loadImageElement(selectedFile);
      setOriginalPreviewUrl(objectUrl);
      setOriginalDimensions({ width, height });

      setTargetWidth(width);
      setTargetHeight(height);

      const initialFmt = (selectedFile.type.split('/')[1] || 'jpg') as ImageFormat;
      setFormat(initialFmt);

      processResize(selectedFile, width, height, initialFmt, quality);
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof ProcessingError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unsupported file. Please select a valid JPG, PNG, or WebP image.');
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

  const handleDimensionChange = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    if (file) {
      processResize(file, w, h, format, quality);
    }
  };

  const handleFormatChange = (newFormat: ImageFormat) => {
    setFormat(newFormat);
    if (file) {
      processResize(file, targetWidth, targetHeight, newFormat, quality);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (file) {
      processResize(file, targetWidth, targetHeight, format, newQuality);
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
            aria-label="Upload an image to resize dimensions"
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Tap photo to resize dimensions, or drop file here
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              Supports {tool.supportedInputFormats.map((f) => f.toUpperCase()).join(', ')} up to 50MB (High quality canvas resampling)
            </p>
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
          <div className="rounded-2xl border border-white/60 bg-white/90 p-4 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl space-y-6">
            {/* File Info Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 text-xs gap-2">
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

            <ResizeControls
              originalDimensions={originalDimensions}
              currentWidth={targetWidth}
              currentHeight={targetHeight}
              onChange={handleDimensionChange}
              disabled={status === 'resizing'}
            />

            {/* Quality & Format Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4 border-t border-slate-200/80">
              <div>
                <label htmlFor="resizer-format-select" className="block text-xs font-semibold text-slate-700 mb-1">
                  Output Format
                </label>
                <div className="relative">
                  <select
                    id="resizer-format-select"
                    value={format}
                    disabled={status === 'resizing'}
                    onChange={(e) => handleFormatChange(e.target.value as ImageFormat)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[44px] cursor-pointer"
                  >
                    <option value="jpg">JPG (JPEG)</option>
                    <option value="webp">WebP (Modern Format)</option>
                    <option value="png">PNG (Lossless Format)</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {format !== 'png' && (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <label htmlFor="resizer-quality-slider">Quality</label>
                    <span className="font-mono text-purple-600 font-bold text-sm">{quality}%</span>
                  </div>
                  <input
                    id="resizer-quality-slider"
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    disabled={status === 'resizing'}
                    onChange={(e) => handleQualityChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-purple-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label="Quality slider for lossy format"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Resizing Spinner for initial load */}
          {status === 'resizing' && !result && (
            <div className="flex items-center justify-center space-x-3 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-purple-700">
              <svg className="h-5 w-5 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold">Resampling image dimensions in browser canvas...</span>
            </div>
          )}

          {/* Results & Previews */}
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
                toolName={tool.slug}
              />

              <ImagePreviewComparison
                originalUrl={originalPreviewUrl}
                compressedUrl={result.downloadUrl || originalPreviewUrl}
                originalSize={formatBytes(file.size)}
                compressedSize={formatBytes(result.size)}
                originalDimensions={originalDimensions}
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
