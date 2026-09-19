import { CompressionSettings, ProcessingResult, ProcessingError } from '@/types/processing';
import { ImageFormat } from '@/types/tool';
import { validateImageFile } from './validation';
import { loadImageElement } from './loader';

export function getMimeTypeForFormat(format: ImageFormat): string {
  switch (format) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'jpeg':
    case 'jpg':
    default:
      return 'image/jpeg';
  }
}

export function getExtensionForFormat(format: ImageFormat): string {
  switch (format) {
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'jpeg':
    case 'jpg':
    default:
      return 'jpg';
  }
}

export function generateCompressedFilename(originalName: string, targetFormat: ImageFormat): string {
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const ext = getExtensionForFormat(targetFormat);
  return `${baseName}-compressed.${ext}`;
}

export async function compressImageInBrowser(
  file: File,
  settings: CompressionSettings
): Promise<ProcessingResult> {
  // Step 1: Validate file
  validateImageFile(file);

  // Step 2: Load & Decode Image
  const { image, width, height, objectUrl } = await loadImageElement(file);

  try {
    // Step 3: Offscreen Canvas Setup
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new ProcessingError(
        'BROWSER_PROCESSING_FAILURE',
        'Browser canvas context initialization failed.'
      );
    }

    // Determine target MIME and format
    const targetFormat = settings.format || ((file.type.split('/')[1] || 'jpeg') as ImageFormat);
    const targetMime = getMimeTypeForFormat(targetFormat);
    const qualityFactor = Math.max(0.01, Math.min(1.0, (settings.quality || 80) / 100));

    // Handle white background fill if converting transparent PNG to JPEG
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw image onto canvas
    ctx.drawImage(image, 0, 0, width, height);

    // Step 4: Encode to Blob via canvas.toBlob
    const compressedBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(
              new ProcessingError(
                'COMPRESSION_FAILED',
                'Failed to encode compressed image blob in browser.'
              )
            );
          }
        },
        targetMime,
        qualityFactor
      );
    });

    // Step 5: Compute size savings & download metadata
    const compressedSize = compressedBlob.size;
    const savedBytes = Math.max(0, file.size - compressedSize);
    const compressionRatio =
      file.size > 0 ? Math.round(((file.size - compressedSize) / file.size) * 100) : 0;
    const outputFilename = generateCompressedFilename(file.name, targetFormat);
    const downloadUrl = URL.createObjectURL(compressedBlob);

    return {
      blob: compressedBlob,
      name: outputFilename,
      size: compressedSize,
      format: targetFormat,
      dimensions: { width, height },
      compressionRatio,
      savedBytes,
      downloadUrl,
    };
  } finally {
    // Clean up temporary decoding object URL
    URL.revokeObjectURL(objectUrl);
  }
}
