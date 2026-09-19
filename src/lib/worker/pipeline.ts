import { CompressionSettings, ResizeSettings, ConversionSettings, ProcessingResult } from '@/types/processing';
import { defaultCompressionEngine } from '../compression';

export interface ProcessingRequest {
  id: string;
  file: File;
  type: 'compress' | 'resize' | 'convert';
  settings: CompressionSettings | ResizeSettings | ConversionSettings;
}

/**
 * WorkerPipeline provides a unified entry point for offloading image processing tasks.
 * In Phase 1, this will dispatch processing requests to Web Worker threads to keep
 * the UI main thread 100% smooth and responsive.
 */
export class WorkerPipeline {
  async process(request: ProcessingRequest): Promise<ProcessingResult> {
    // Phase 0 fallback direct invocation (will be Web Worker message bridge in Phase 1)
    if (request.type === 'compress') {
      return defaultCompressionEngine.compress(request.file, request.settings as CompressionSettings);
    }
    
    return defaultCompressionEngine.compress(request.file, request.settings as CompressionSettings);
  }
}

export const globalPipeline = new WorkerPipeline();
