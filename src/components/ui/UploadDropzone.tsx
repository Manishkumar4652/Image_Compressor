'use client';

import React, { useState, useRef } from 'react';
import { ToolDefinition } from '@/types/tool';

interface UploadDropzoneProps {
  tool: ToolDefinition;
}

export function UploadDropzone({ tool }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number>(tool.defaultQuality || 80);
  const [outputFormat, setOutputFormat] = useState<string>(
    tool.supportedOutputFormats[0] || 'jpg'
  );
  const [resizeWidth, setResizeWidth] = useState<string>('');
  const [resizeHeight, setResizeHeight] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const filesArray = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl">
      {/* Target Size Cap Badge (if applicable) */}
      {tool.targetSizeBytes && (
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span>Target Cap: {formatFileSize(tool.targetSizeBytes)}</span>
          </div>
        </div>
      )}

      {/* Main Drag and Drop Area */}
      <div
        suppressHydrationWarning
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label={`Upload image to use with ${tool.name}`}
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
          accept={tool.supportedInputFormats.map((f) => `image/${f}`).join(',')}
          onChange={handleFileChange}
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
          Tap to select image or drop here
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Supports {tool.supportedInputFormats.map((f) => f.toUpperCase()).join(', ')} up to 50MB
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tool.supportedInputFormats.map((fmt) => (
            <span key={fmt} className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 shadow-xs uppercase">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6 space-y-6">
          {/* Settings Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Tool Settings
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Quality Slider */}
              {tool.category !== 'resize' && (
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Target Quality</span>
                    <span className="font-semibold text-indigo-400">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Target compression quality"
                  />
                </div>
              )}

              {/* Format Select */}
              {tool.supportedOutputFormats.length > 1 && (
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Output Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {tool.supportedOutputFormats.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Resize Inputs */}
              {tool.category === 'resize' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Width (px)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1920"
                      value={resizeWidth}
                      onChange={(e) => setResizeWidth(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Height (px)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1080"
                      value={resizeHeight}
                      onChange={(e) => setResizeHeight(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Selected File ({selectedFiles.length})
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-red-400 hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1.5 py-1 min-h-[36px]"
              >
                Clear File
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs"
                >
                  <div className="flex items-center space-x-3 overflow-hidden min-w-0 flex-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase text-[10px]">
                      {file.name.split('.').pop() || 'IMG'}
                    </div>
                    <div className="truncate min-w-0 flex-1">
                      <p className="font-medium text-slate-200 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(idx)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded min-h-[40px] min-w-[40px] flex items-center justify-center"
                    aria-label={`Remove file ${file.name}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
