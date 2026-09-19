'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolDefinition, ImageFormat } from '@/types/tool';
import { ProcessingResult, ProcessingError, ImageDimensions } from '@/types/processing';
import { validateImageFile } from '@/lib/compression/validation';
import { loadImageElement } from '@/lib/compression/loader';
import { convertFormatInBrowser } from '@/lib/conversion/convertImage';
import { ImagePreviewComparison } from '@/components/ui/ImagePreviewComparison';
import { CompressionResultCard } from '@/components/ui/CompressionResultCard';
import { trackFormatConversion } from '@/lib/analytics/events';

interface FormatConverterToolProps {
  tool: ToolDefinition;
}

export function FormatConverterTool({ tool }: FormatConverterToolProps) {
  const targetFormat: ImageFormat = (tool.supportedOutputFormats[0] || 'webp') as ImageFormat;

  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [quality, setQuality] = useState<number>(tool.defaultQuality || 80);

  const [status, setStatus] = useState<'idle' | 'converting' | 'success' | 'error'>('idle');
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

  const processConversion = useCallback(
    async (targetFile: File, q: number) => {
      setStatus('converting');
      setErrorMessage(null);

      try {
        validateImageFile(targetFile);

        const res = await convertFormatInBrowser(targetFile, {
          targetFormat,
          quality: q,
        });

        setResult(res);
        setStatus('success');
        const fromFormat = targetFile.type.split('/')[1] || 'image';
        trackFormatConversion(fromFormat, targetFormat);
      } catch (err: unknown) {
        setStatus('error');
        if (err instanceof ProcessingError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('Unable to convert this image. Please try another file.');
        }
      }
    },
    [targetFormat]
  );

  const handleSelectFile = async (selectedFile: File) => {
    cleanupUrls();
    setErrorMessage(null);

    try {
      validateImageFile(selectedFile);
      setFile(selectedFile);

      const { width, height, objectUrl } = await loadImageElement(selectedFile);
      setOriginalPreviewUrl(objectUrl);
      setOriginalDimensions({ width, height });

      processConversion(selectedFile, quality);
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof ProcessingError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unsupported file format.');
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
      processConversion(file, newQuality);
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

  const isJpegOutput = targetFormat === 'jpg' || targetFormat === 'jpeg';
  const acceptsMime = tool.supportedInputFormats.map((f) => `image/${f}`).join(',');

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
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
            aria-label={`Upload image to convert to ${targetFormat.toUpperCase()}`}
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
              accept={acceptsMime}
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Tap to select file to convert to <span className="text-purple-600 font-extrabold uppercase">{targetFormat}</span>
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              Accepts {tool.supportedInputFormats.map((f) => f.toUpperCase()).join(', ')} up to 50MB
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
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-white/60 bg-white/90 p-5 sm:p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-700 block">Output Format</span>
                <span className="text-sm font-bold text-purple-600 uppercase">{targetFormat}</span>
              </div>

              {/* Quality Slider for lossy output formats */}
              {(targetFormat === 'webp' || isJpegOutput) && (
                <div className="flex-1 max-w-xs space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <label htmlFor="converter-quality-slider">Target Quality</label>
                    <span className="font-mono text-purple-600 font-bold text-sm">{quality}%</span>
                  </div>
                  <input
                    id="converter-quality-slider"
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    disabled={status === 'converting'}
                    onChange={(e) => handleQualityChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-purple-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label="Target conversion quality"
                  />
                </div>
              )}
            </div>

            {/* Transparency Guidance Notice */}
            {isJpegOutput && (
              <div className="flex items-center space-x-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3 text-xs text-indigo-300">
                <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>JPEG does not support transparency. Transparent background areas are automatically filled with clean white.</span>
              </div>
            )}
          </div>

          {/* Converting Spinner for initial load */}
          {status === 'converting' && !result && (
            <div className="flex items-center justify-center space-x-3 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-purple-700">
              <svg className="h-5 w-5 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold">Converting image stream to {targetFormat.toUpperCase()}...</span>
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
