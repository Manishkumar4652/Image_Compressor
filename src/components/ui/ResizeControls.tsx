'use client';

import React, { useState } from 'react';
import { ImageDimensions } from '@/types/processing';

interface ResizeControlsProps {
  originalDimensions: ImageDimensions;
  currentWidth: number;
  currentHeight: number;
  onChange: (width: number, height: number) => void;
  disabled?: boolean;
}

interface AspectRatioPreset {
  id: string;
  label: string;
  subtitle: string;
  ratio: number | 'original' | 'custom';
}

const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  { id: 'original', label: 'Original', subtitle: 'Auto Ratio', ratio: 'original' },
  { id: '1:1', label: '1:1', subtitle: 'Square', ratio: 1 / 1 },
  { id: '16:9', label: '16:9', subtitle: 'Widescreen', ratio: 16 / 9 },
  { id: '9:16', label: '9:16', subtitle: 'Story / Reel', ratio: 9 / 16 },
  { id: '4:3', label: '4:3', subtitle: 'Standard', ratio: 4 / 3 },
  { id: '3:2', label: '3:2', subtitle: 'Classic', ratio: 3 / 2 },
  { id: '4:5', label: '4:5', subtitle: 'Portrait', ratio: 4 / 5 },
  { id: '21:9', label: '21:9', subtitle: 'Ultrawide', ratio: 21 / 9 },
  { id: 'custom', label: 'Custom', subtitle: 'Ratio / px', ratio: 'custom' },
];

const SCALE_PRESETS = [
  { label: '100%', factor: 1.0, desc: 'Full Size' },
  { label: '75%', factor: 0.75, desc: '3/4 Size' },
  { label: '50%', factor: 0.5, desc: 'Half Size' },
  { label: '25%', factor: 0.25, desc: 'Quarter Size' },
];

export function ResizeControls({
  originalDimensions,
  currentWidth,
  currentHeight,
  onChange,
  disabled = false,
}: ResizeControlsProps) {
  const [selectedRatioId, setSelectedRatioId] = useState<string>('original');
  const [selectedScaleFactor, setSelectedScaleFactor] = useState<number>(1.0);

  // Custom Ratio state
  const [customType, setCustomType] = useState<'ratio' | 'pixels'>('ratio');
  const [customRatioW, setCustomRatioW] = useState<string>('21');
  const [customRatioH, setCustomRatioH] = useState<string>('9');
  const [customPixelW, setCustomPixelW] = useState<string>(originalDimensions.width ? originalDimensions.width.toString() : '800');
  const [customPixelH, setCustomPixelH] = useState<string>(originalDimensions.height ? originalDimensions.height.toString() : '600');
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

  const [prevOrigW, setPrevOrigW] = useState<number>(originalDimensions.width);
  const [prevOrigH, setPrevOrigH] = useState<number>(originalDimensions.height);

  if (originalDimensions.width !== prevOrigW || originalDimensions.height !== prevOrigH) {
    setPrevOrigW(originalDimensions.width);
    setPrevOrigH(originalDimensions.height);
    if (originalDimensions.width && originalDimensions.height) {
      setCustomPixelW(originalDimensions.width.toString());
      setCustomPixelH(originalDimensions.height.toString());
    }
  }

  const applyRatioAndScale = (
    ratioId: string,
    scaleFactor: number,
    cType: 'ratio' | 'pixels' = customType,
    cWStr: string = customRatioW,
    cHStr: string = customRatioH,
    pWStr: string = customPixelW,
    pHStr: string = customPixelH
  ) => {
    setSelectedRatioId(ratioId);
    setSelectedScaleFactor(scaleFactor);

    const origW = originalDimensions.width;
    const origH = originalDimensions.height;
    if (!origW || !origH) return;

    if (ratioId === 'custom') {
      if (cType === 'pixels') {
        const pW = parseInt(pWStr, 10);
        const pH = parseInt(pHStr, 10);
        if (!isNaN(pW) && !isNaN(pH) && pW > 0 && pH > 0) {
          const finalW = Math.max(1, Math.round(pW * scaleFactor));
          const finalH = Math.max(1, Math.round(pH * scaleFactor));
          onChange(finalW, finalH);
          return;
        }
      } else {
        const cW = parseFloat(cWStr);
        const cH = parseFloat(cHStr);
        if (!isNaN(cW) && !isNaN(cH) && cW > 0 && cH > 0) {
          const targetRatio = cW / cH;
          const origRatio = origW / origH;
          let baseW = origW;
          let baseH = origH;
          if (targetRatio > origRatio) {
            baseW = origW;
            baseH = Math.round(origW / targetRatio);
          } else {
            baseH = origH;
            baseW = Math.round(origH * targetRatio);
          }
          const finalW = Math.max(1, Math.round(baseW * scaleFactor));
          const finalH = Math.max(1, Math.round(baseH * scaleFactor));
          onChange(finalW, finalH);
          return;
        }
      }
    }

    let baseW = origW;
    let baseH = origH;

    const preset = ASPECT_RATIO_PRESETS.find((p) => p.id === ratioId);
    if (preset && preset.ratio !== 'original' && typeof preset.ratio === 'number') {
      const targetRatio = preset.ratio;
      const origRatio = origW / origH;
      if (targetRatio > origRatio) {
        baseW = origW;
        baseH = Math.round(origW / targetRatio);
      } else {
        baseH = origH;
        baseW = Math.round(origH * targetRatio);
      }
    }

    const finalW = Math.max(1, Math.round(baseW * scaleFactor));
    const finalH = Math.max(1, Math.round(baseH * scaleFactor));

    onChange(finalW, finalH);
  };

  const handleCustomWidthRatioChange = (val: string) => {
    setCustomRatioW(val);
    if (selectedRatioId === 'custom' && customType === 'ratio') {
      applyRatioAndScale('custom', selectedScaleFactor, 'ratio', val, customRatioH, customPixelW, customPixelH);
    }
  };

  const handleCustomHeightRatioChange = (val: string) => {
    setCustomRatioH(val);
    if (selectedRatioId === 'custom' && customType === 'ratio') {
      applyRatioAndScale('custom', selectedScaleFactor, 'ratio', customRatioW, val, customPixelW, customPixelH);
    }
  };

  const handleCustomPixelWidthChange = (val: string) => {
    setCustomPixelW(val);
    let newH = customPixelH;
    const numW = parseInt(val, 10);
    if (lockAspectRatio && !isNaN(numW) && numW > 0 && originalDimensions.width && originalDimensions.height) {
      newH = Math.round((numW * originalDimensions.height) / originalDimensions.width).toString();
      setCustomPixelH(newH);
    }
    if (selectedRatioId === 'custom' && customType === 'pixels') {
      applyRatioAndScale('custom', selectedScaleFactor, 'pixels', customRatioW, customRatioH, val, newH);
    }
  };

  const handleCustomPixelHeightChange = (val: string) => {
    setCustomPixelH(val);
    let newW = customPixelW;
    const numH = parseInt(val, 10);
    if (lockAspectRatio && !isNaN(numH) && numH > 0 && originalDimensions.width && originalDimensions.height) {
      newW = Math.round((numH * originalDimensions.width) / originalDimensions.height).toString();
      setCustomPixelW(newW);
    }
    if (selectedRatioId === 'custom' && customType === 'pixels') {
      applyRatioAndScale('custom', selectedScaleFactor, 'pixels', customRatioW, customRatioH, newW, val);
    }
  };

  return (
    <div className="space-y-6">
      {/* Aspect Ratio Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Select Aspect Ratio
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {ASPECT_RATIO_PRESETS.map((preset) => {
            const isSelected = selectedRatioId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                disabled={disabled}
                onClick={() => applyRatioAndScale(preset.id, selectedScaleFactor)}
                className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl border transition-all text-center min-h-[52px] sm:min-h-[60px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30 text-slate-700'
                }`}
              >
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-900">{preset.label}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-full">{preset.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Option Panel */}
      {selectedRatioId === 'custom' && (
        <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-3.5 sm:p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-purple-200/60 pb-3">
            <span className="text-xs font-extrabold text-slate-900">Custom Dimension Input:</span>
            <div className="flex w-full sm:w-auto rounded-xl bg-white p-1 border border-purple-200 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setCustomType('ratio');
                  applyRatioAndScale('custom', selectedScaleFactor, 'ratio');
                }}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                  customType === 'ratio'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aspect Ratio (W:H)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomType('pixels');
                  applyRatioAndScale('custom', selectedScaleFactor, 'pixels');
                }}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                  customType === 'pixels'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exact Pixels (px)
              </button>
            </div>
          </div>

          {customType === 'ratio' ? (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="text-xs font-bold text-slate-700">Ratio (W : H):</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  step="any"
                  disabled={disabled}
                  value={customRatioW}
                  onChange={(e) => handleCustomWidthRatioChange(e.target.value)}
                  className="w-16 sm:w-20 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[38px]"
                  placeholder="21"
                  aria-label="Custom width ratio"
                />
                <span className="text-sm font-extrabold text-purple-700">:</span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  disabled={disabled}
                  value={customRatioH}
                  onChange={(e) => handleCustomHeightRatioChange(e.target.value)}
                  className="w-16 sm:w-20 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[38px]"
                  placeholder="9"
                  aria-label="Custom height ratio"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">e.g. 21:9, 4:5, 3:4</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="text-xs font-bold text-slate-700">Dimensions:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  disabled={disabled}
                  value={customPixelW}
                  onChange={(e) => handleCustomPixelWidthChange(e.target.value)}
                  className="w-20 sm:w-24 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[38px]"
                  placeholder="Width"
                  aria-label="Custom width pixels"
                />
                <span className="text-xs font-bold text-purple-700">×</span>
                <input
                  type="number"
                  min="1"
                  disabled={disabled}
                  value={customPixelH}
                  onChange={(e) => handleCustomPixelHeightChange(e.target.value)}
                  className="w-20 sm:w-24 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[38px]"
                  placeholder="Height"
                  aria-label="Custom height pixels"
                />
                <span className="text-xs font-semibold text-slate-600">px</span>
              </div>
              <label className="flex items-center space-x-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={lockAspectRatio}
                  onChange={(e) => setLockAspectRatio(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Lock ratio</span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Scale Factor Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Scale Factor
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {SCALE_PRESETS.map((scale) => {
            const isSelected = selectedScaleFactor === scale.factor;
            return (
              <button
                key={scale.label}
                type="button"
                disabled={disabled}
                onClick={() => applyRatioAndScale(selectedRatioId, scale.factor)}
                className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border transition-all min-h-[44px] sm:min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                <span className="text-xs font-extrabold">{scale.label}</span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                  {scale.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Dimensions Summary Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-purple-200/80 bg-purple-50/60 p-3 sm:px-4 sm:py-3 text-xs text-purple-950 backdrop-blur-sm gap-1.5 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700">Target Output:</span>
          <span className="font-mono font-extrabold text-purple-700 text-xs sm:text-sm">
            {currentWidth} × {currentHeight} px
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
          Original: {originalDimensions.width} × {originalDimensions.height} px
        </span>
      </div>
    </div>
  );
}

