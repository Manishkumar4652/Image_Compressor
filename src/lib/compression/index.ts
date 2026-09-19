import { CompressionSettings, ProcessingResult } from '@/types/processing';
import { CompressionEngine } from './types';
import { compressImageInBrowser } from './engine';

export class RealBrowserCompressionEngine implements CompressionEngine {
  async compress(file: File, settings: CompressionSettings): Promise<ProcessingResult> {
    return compressImageInBrowser(file, settings);
  }
}

export const defaultCompressionEngine = new RealBrowserCompressionEngine();
export * from './validation';
export * from './loader';
export * from './engine';
