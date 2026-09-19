import { ImageFormat } from './tool';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  dimensions?: ImageDimensions;
  status: 'idle' | 'processing' | 'done' | 'error';
  progress?: number;
  result?: ProcessingResult;
  error?: string;
}

export interface CompressionSettings {
  quality: number; // 1 to 100
  format?: ImageFormat;
  targetSizeBytes?: number;
  preserveMetadata?: boolean;
}

export interface ResizeSettings {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  scalePercentage?: number;
  mode: 'exact' | 'fit' | 'percentage';
}

export interface ConversionSettings {
  targetFormat: ImageFormat;
  quality: number;
}

export interface ProcessingResult {
  blob: Blob;
  name: string;
  size: number;
  format: ImageFormat;
  dimensions?: ImageDimensions;
  compressionRatio?: number; // percentage saved
  savedBytes?: number;
  downloadUrl?: string;
}

export type ProcessingErrorCode =
  | 'UNSUPPORTED_FORMAT'
  | 'CORRUPTED_IMAGE'
  | 'OVERSIZED_FILE'
  | 'BROWSER_PROCESSING_FAILURE'
  | 'MEMORY_LIMIT'
  | 'CONVERSION_FAILED'
  | 'COMPRESSION_FAILED';

export class ProcessingError extends Error {
  code: ProcessingErrorCode;
  details?: string;

  constructor(code: ProcessingErrorCode, message: string, details?: string) {
    super(message);
    this.name = 'ProcessingError';
    this.code = code;
    this.details = details;
  }
}
