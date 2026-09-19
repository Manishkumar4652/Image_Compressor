import { ResizeSettings, ProcessingResult } from '@/types/processing';
import { ResizeEngine } from './types';
import { resizeImageInBrowser } from './resizeImage';

export class RealBrowserResizeEngine implements ResizeEngine {
  async resize(file: File, settings: ResizeSettings): Promise<ProcessingResult> {
    return resizeImageInBrowser(file, {
      width: settings.width || 800,
      height: settings.height || 600,
    });
  }
}

export const defaultResizeEngine = new RealBrowserResizeEngine();
export * from './resizeImage';
