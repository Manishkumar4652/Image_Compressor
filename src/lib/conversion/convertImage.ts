import { ConversionSettings, ProcessingResult, ProcessingError } from '@/types/processing';
import { ImageFormat } from '@/types/tool';
import { validateImageFile } from '../compression/validation';
import { loadImageElement } from '../compression/loader';
import { getMimeTypeForFormat, getExtensionForFormat } from '../compression/engine';

export function generateConvertedFilename(originalName: string, targetFormat: ImageFormat): string {
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const ext = getExtensionForFormat(targetFormat);
  return `${baseName}.${ext}`;
}

export async function convertFormatInBrowser(
  file: File,
  settings: ConversionSettings
): Promise<ProcessingResult> {
  validateImageFile(file);

  const { targetFormat, quality = 80 } = settings;
  const targetMime = getMimeTypeForFormat(targetFormat);

  // Load and decode image
  const { image, width, height, objectUrl } = await loadImageElement(file);

  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new ProcessingError('BROWSER_PROCESSING_FAILURE', 'Canvas context initialization failed.');
    }

    // Transparency Handling: If converting PNG/WebP to JPEG, fill with white background
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(image, 0, 0, width, height);

    const qualityFactor = Math.max(0.01, Math.min(1.0, quality / 100));
    const convertedBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new ProcessingError('CONVERSION_FAILED', 'Canvas conversion encoding failed.'));
        },
        targetMime,
        qualityFactor
      );
    });

    const outputFilename = generateConvertedFilename(file.name, targetFormat);
    const downloadUrl = URL.createObjectURL(convertedBlob);
    const savedBytes = Math.max(0, file.size - convertedBlob.size);
    const compressionRatio =
      file.size > 0 ? Math.round(((file.size - convertedBlob.size) / file.size) * 100) : 0;

    return {
      blob: convertedBlob,
      name: outputFilename,
      size: convertedBlob.size,
      format: targetFormat,
      dimensions: { width, height },
      compressionRatio,
      savedBytes,
      downloadUrl,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
