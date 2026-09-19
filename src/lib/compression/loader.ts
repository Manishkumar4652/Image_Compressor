import { ProcessingError } from '@/types/processing';

export interface LoadedImageData {
  image: HTMLImageElement;
  width: number;
  height: number;
  objectUrl: string;
}

export function loadImageElement(file: File): Promise<LoadedImageData> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        image: img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        objectUrl,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        new ProcessingError(
          'BROWSER_PROCESSING_FAILURE',
          'Unable to decode image. The file may be damaged or corrupted.'
        )
      );
    };

    img.src = objectUrl;
  });
}
