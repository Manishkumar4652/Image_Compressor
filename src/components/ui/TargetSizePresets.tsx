'use client';

import React, { useState } from 'react';

interface TargetSizePresetsProps {
  currentTargetBytes: number;
  onTargetChange: (bytes: number) => void;
  disabled?: boolean;
}

const PRESETS = [
  { label: '50 KB', bytes: 50 * 1024 },
  { label: '100 KB', bytes: 100 * 1024 },
  { label: '200 KB', bytes: 200 * 1024 },
  { label: '500 KB', bytes: 500 * 1024 },
  { label: '1 MB', bytes: 1024 * 1024 },
];

export function TargetSizePresets({
  currentTargetBytes,
  onTargetChange,
  disabled = false,
}: TargetSizePresetsProps) {
  const matchedPreset = PRESETS.find((p) => p.bytes === currentTargetBytes);
  const [isCustomInputActive, setIsCustomInputActive] = useState(!matchedPreset);

  const initialUnit = currentTargetBytes >= 1024 * 1024 ? 'MB' : 'KB';
  const initialValue =
    currentTargetBytes >= 1024 * 1024
      ? (currentTargetBytes / (1024 * 1024)).toString()
      : Math.round(currentTargetBytes / 1024).toString();

  const [customValue, setCustomValue] = useState<string>(initialValue);
  const [customUnit, setCustomUnit] = useState<'KB' | 'MB'>(initialUnit);

  const isCustom = isCustomInputActive || !matchedPreset;

  const handleCustomSubmit = (valStr: string, unit: 'KB' | 'MB') => {
    const num = parseFloat(valStr);
    if (!isNaN(num) && num > 0) {
      const multiplier = unit === 'MB' ? 1024 * 1024 : 1024;
      onTargetChange(Math.round(num * multiplier));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="font-extrabold">Target File Size</span>
        <span className="font-mono text-purple-600 font-extrabold text-xs sm:text-sm">
          {currentTargetBytes < 1024 * 1024
            ? `${Math.round(currentTargetBytes / 1024)} KB`
            : `${(currentTargetBytes / (1024 * 1024)).toFixed(1)} MB`}
        </span>
      </div>

      {/* Preset Buttons Grid on Mobile */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isSelected = !isCustom && currentTargetBytes === preset.bytes;
          return (
            <button
              key={preset.label}
              type="button"
              disabled={disabled}
              onClick={() => {
                setIsCustomInputActive(false);
                onTargetChange(preset.bytes);
              }}
              className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-bold transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center flex items-center justify-center ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              {preset.label}
            </button>
          );
        })}

        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsCustomInputActive(true)}
          className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-bold transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-center flex items-center justify-center ${
            isCustom
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
              : 'bg-white border border-slate-300 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom Input Field */}
      {isCustom && (
        <div className="flex items-center gap-2 pt-1 w-full">
          <input
            type="number"
            min="1"
            max="50000"
            disabled={disabled}
            value={customValue}
            onChange={(e) => {
              setCustomValue(e.target.value);
              handleCustomSubmit(e.target.value, customUnit);
            }}
            placeholder="Target size"
            className="flex-1 min-w-[120px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[42px] shadow-xs"
            aria-label="Custom target size value"
          />

          <div className="relative w-24 shrink-0">
            <select
              value={customUnit}
              disabled={disabled}
              onChange={(e) => {
                const u = e.target.value as 'KB' | 'MB';
                setCustomUnit(u);
                handleCustomSubmit(customValue, u);
              }}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3 pr-8 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 min-h-[42px] shadow-xs cursor-pointer"
              aria-label="Target size unit"
            >
              <option value="KB">KB</option>
              <option value="MB">MB</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
