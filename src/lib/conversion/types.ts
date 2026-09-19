import { ConversionSettings, ProcessingResult } from '@/types/processing';

export interface ConversionEngine {
  convert(file: File, settings: ConversionSettings): Promise<ProcessingResult>;
}
