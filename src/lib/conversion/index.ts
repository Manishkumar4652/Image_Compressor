import { ConversionSettings, ProcessingResult } from '@/types/processing';
import { ConversionEngine } from './types';
import { convertFormatInBrowser } from './convertImage';

export class RealBrowserConversionEngine implements ConversionEngine {
  async convert(file: File, settings: ConversionSettings): Promise<ProcessingResult> {
    return convertFormatInBrowser(file, settings);
  }
}

export const defaultConversionEngine = new RealBrowserConversionEngine();
export * from './convertImage';
