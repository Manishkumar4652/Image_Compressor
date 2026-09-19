import { ImageFormat } from './tool';
import { ProcessingResult } from './processing';

export type BatchQueueStatus = 'waiting' | 'processing' | 'completed' | 'failed';

export interface BatchQueueItem {
  id: string;
  file: File;
  filename: string;
  inputFormat: ImageFormat;
  originalSize: number;
  status: BatchQueueStatus;
  compressedResult?: ProcessingResult;
  compressedSize?: number;
  savedPercentage?: number;
  error?: string;
}

export interface BatchSettings {
  quality: number; // 1 to 100
  format: 'original' | ImageFormat;
}

export interface BatchSummary {
  totalFiles: number;
  completedCount: number;
  failedCount: number;
  originalTotalBytes: number;
  compressedTotalBytes: number;
  totalSavedPercentage: number;
}
