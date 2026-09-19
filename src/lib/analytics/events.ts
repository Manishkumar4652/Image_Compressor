declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Send a custom GA4 event safely on the client side.
 * NEVER pass image binary data, pixels, file contents, filenames, or personal information.
 */
export function trackGAEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackToolUsage(toolSlug: string) {
  trackGAEvent('tool_usage', 'tools', toolSlug);
}

export function trackCompressionStart(format: string, fileCount: number = 1) {
  trackGAEvent('compression_start', 'compression', format, fileCount);
}

export function trackCompressionComplete(format: string, savedPercent: number) {
  trackGAEvent('compression_complete', 'compression', format, Math.round(savedPercent));
}

export function trackTargetSizeUsage(targetKB: string) {
  trackGAEvent('target_size_compression', 'compression', targetKB);
}

export function trackBatchCompression(count: number) {
  trackGAEvent('batch_compression', 'compression', 'batch_zip', count);
}

export function trackResizeUsage(dimensionsOrRatio: string) {
  trackGAEvent('image_resize', 'resize', dimensionsOrRatio);
}

export function trackFormatConversion(fromFmt: string, toFmt: string) {
  trackGAEvent('format_conversion', 'conversion', `${fromFmt}_to_${toFmt}`);
}

export function trackDownload(fileType: string) {
  trackGAEvent('download_action', 'engagement', fileType);
}
