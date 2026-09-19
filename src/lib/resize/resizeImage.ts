import { ProcessingResult, ProcessingError } from '@/types/processing';
import { ImageFormat } from '@/types/tool';
import { validateImageFile } from '../compression/validation';
import { loadImageElement } from '../compression/loader';
import { getMimeTypeForFormat, getExtensionForFormat } from '../compression/engine';

export interface ResizeImageOptions {
  width: number;
  height: number;
  format?: ImageFormat;
  quality?: number;
}

export function generateResizedFilename(originalName: string, targetFormat: ImageFormat): string {
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const ext = getExtensionForFormat(targetFormat);
  return `${baseName}-resized.${ext}`;
}

export async function resizeImageInBrowser(
  file: File,
  options: ResizeImageOptions
): Promise<ProcessingResult> {
  validateImageFile(file);

  const { width: targetWidth, height: targetHeight, format, quality = 80 } = options;

  if (targetWidth <= 0 || targetHeight <= 0) {
    throw new ProcessingError('CORRUPTED_IMAGE', 'Width and height must be positive numbers.');
  }

  // Load and decode image
  const { image, objectUrl } = await loadImageElement(file);

  try {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new ProcessingError('BROWSER_PROCESSING_FAILURE', 'Canvas context initialization failed.');
    }

    // Enable high-quality image resampling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const inputFormat = (file.type.split('/')[1] || 'jpeg') as ImageFormat;
    const targetFormat = format || inputFormat;
    const targetMime = getMimeTypeForFormat(targetFormat);

    // If target is JPEG, fill background with white for transparency safety
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    // Draw resampled image
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    // Encode to Blob
    const qualityFactor = Math.max(0.01, Math.min(1.0, quality / 100));
    const resizedBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new ProcessingError('COMPRESSION_FAILED', 'Canvas resize encoding failed.'));
        },
        targetMime,
        qualityFactor
      );
    });

    const outputFilename = generateResizedFilename(file.name, targetFormat);
    const downloadUrl = URL.createObjectURL(resizedBlob);
    const savedBytes = Math.max(0, file.size - resizedBlob.size);
    const compressionRatio =
      file.size > 0 ? Math.round(((file.size - resizedBlob.size) / file.size) * 100) : 0;

    return {
      blob: resizedBlob,
      name: outputFilename,
      size: resizedBlob.size,
      format: targetFormat,
      dimensions: { width: targetWidth, height: targetHeight },
      compressionRatio,
      savedBytes,
      downloadUrl,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
