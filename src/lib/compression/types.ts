import { CompressionSettings, ProcessingResult } from '@/types/processing';

export interface CompressionEngine {
  compress(file: File, settings: CompressionSettings): Promise<ProcessingResult>;
}
