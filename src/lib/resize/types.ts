import { ResizeSettings, ProcessingResult } from '@/types/processing';

export interface ResizeEngine {
  resize(file: File, settings: ResizeSettings): Promise<ProcessingResult>;
}
