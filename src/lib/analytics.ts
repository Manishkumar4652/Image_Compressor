declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Safe client-side wrapper for GA4 gtag events.
 * Guarantees SSR safety, GA4 availability, and strict privacy sanitization.
 * NEVER transmits image binary data, pixels, file contents, filenames, or personal information.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Fail silently to avoid breaking UI or image processing workflow
  }
}

/** 1. Tool Page Usage Event */
export function trackToolOpen(toolName: string, toolCategory: string, pagePath: string) {
  trackEvent('tool_open', {
    tool_name: toolName,
    tool_category: toolCategory,
    page_path: pagePath,
  });
}

/** 2. Successful Image Processing Event */
export function trackImageProcessed(params: {
  tool_name: string;
  operation: 'compress' | 'resize' | 'convert' | 'target_size' | 'batch_compress';
  input_format: string;
  output_format: string;
  processing_mode: 'quality' | 'target_size' | 'batch' | 'resize' | 'conversion';
}) {
  trackEvent('image_processed', {
    tool_name: params.tool_name,
    operation: params.operation,
    input_format: params.input_format.toLowerCase(),
    output_format: params.output_format.toLowerCase(),
    processing_mode: params.processing_mode,
  });
}

/** 3. Successful File Download Action Event */
export function trackFileDownload(params: {
  tool_name: string;
  output_format: string;
  download_type: 'single' | 'batch_zip';
}) {
  trackEvent('file_download', {
    tool_name: params.tool_name,
    output_format: params.output_format.toLowerCase(),
    download_type: params.download_type,
  });
}

/** 4. Target-Size Analytics Event */
export function trackTargetSizeCompleted(params: {
  target_size: number;
  target_unit: 'KB' | 'MB';
  input_format: string;
  output_format: string;
}) {
  trackEvent('target_size_completed', {
    target_size: params.target_size,
    target_unit: params.target_unit,
    input_format: params.input_format.toLowerCase(),
    output_format: params.output_format.toLowerCase(),
  });
}

/** 5. Batch Compression Analytics Event */
export function trackBatchCompleted(params: {
  tool_name: string;
  total_files: number;
  successful_files: number;
  failed_files: number;
  zip_download_available: boolean;
}) {
  trackEvent('batch_completed', {
    tool_name: params.tool_name,
    total_files: Math.min(params.total_files, 50),
    successful_files: Math.min(params.successful_files, 50),
    failed_files: Math.min(params.failed_files, 50),
    zip_download_available: params.zip_download_available,
  });
}

/** 6. Image Conversion Analytics Event */
export function trackImageConversion(params: {
  input_format: string;
  output_format: string;
  tool_name: string;
}) {
  trackEvent('image_conversion', {
    input_format: params.input_format.toLowerCase(),
    output_format: params.output_format.toLowerCase(),
    tool_name: params.tool_name,
  });
}

/** 7. Image Resize Analytics Event */
export function trackImageResize(params: {
  tool_name: string;
  input_format: string;
  output_format: string;
}) {
  trackEvent('image_resize', {
    tool_name: params.tool_name,
    input_format: params.input_format.toLowerCase(),
    output_format: params.output_format.toLowerCase(),
  });
}

/** 8. Standard Compression Analytics Event */
export function trackImageCompression(params: {
  tool_name: string;
  input_format: string;
  output_format: string;
  compression_mode: 'quality' | 'target_size' | 'batch';
}) {
  trackEvent('image_compression', {
    tool_name: params.tool_name,
    input_format: params.input_format.toLowerCase(),
    output_format: params.output_format.toLowerCase(),
    compression_mode: params.compression_mode,
  });
}

export type AnalyticsErrorType =
  | 'unsupported_format'
  | 'oversized_file'
  | 'corrupted_image'
  | 'processing_failed'
  | 'target_size_unreachable';

/** 9. Lightweight Operational Error Event */
export function trackToolError(params: {
  tool_name: string;
  error_type: AnalyticsErrorType;
  operation: string;
}) {
  trackEvent('tool_error', {
    tool_name: params.tool_name,
    error_type: params.error_type,
    operation: params.operation,
  });
}

/** Helper to categorize raw errors into privacy-safe allowed categories */
export function categorizeError(message?: string): AnalyticsErrorType {
  if (!message) return 'processing_failed';
  const lower = message.toLowerCase();
  if (lower.includes('unsupported') || lower.includes('format')) return 'unsupported_format';
  if (lower.includes('exceed') || lower.includes('50mb') || lower.includes('size')) return 'oversized_file';
  if (lower.includes('target') || lower.includes('reach')) return 'target_size_unreachable';
  if (lower.includes('corrupt') || lower.includes('load')) return 'corrupted_image';
  return 'processing_failed';
}
