import { ProcessingResult, ProcessingError } from '@/types/processing';
import { ImageFormat } from '@/types/tool';
import { validateImageFile } from './validation';
import { loadImageElement } from './loader';
import { getMimeTypeForFormat, getExtensionForFormat } from './engine';

export interface TargetSizeOptions {
  targetSizeBytes: number;
  format?: 'original' | ImageFormat;
  qualityFloor?: number; // default 10%
  maxAttempts?: number; // default 7
}

export interface TargetSizeResult extends ProcessingResult {
  qualityUsed: number;
  targetReached: boolean;
  attempts: number;
  message: string;
}

export function generateTargetFilename(
  originalName: string,
  targetFormat: ImageFormat,
  targetSizeBytes: number
): string {
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const ext = getExtensionForFormat(targetFormat);
  const targetKb = Math.round(targetSizeBytes / 1024);
  return `${baseName}-target-${targetKb}kb.${ext}`;
}

export async function compressToTargetSize(
  file: File,
  options: TargetSizeOptions
): Promise<TargetSizeResult> {
  // Step 1: Validate input file
  validateImageFile(file);

  const { targetSizeBytes, format = 'original', qualityFloor = 10, maxAttempts = 7 } = options;

  if (targetSizeBytes <= 0) {
    throw new ProcessingError('CORRUPTED_IMAGE', 'Target size must be greater than 0 KB.');
  }

  // Determine output format
  const inputFormat = (file.type.split('/')[1] || 'jpeg') as ImageFormat;
  const targetFormat: ImageFormat = format === 'original' ? inputFormat : format;
  const targetMime = getMimeTypeForFormat(targetFormat);

  // If input file is already below target size and format is unchanged, return original
  if (file.size <= targetSizeBytes && format === 'original') {
    const downloadUrl = URL.createObjectURL(file);
    return {
      blob: new Blob([await file.arrayBuffer()], { type: file.type }),
      name: generateTargetFilename(file.name, targetFormat, targetSizeBytes),
      size: file.size,
      format: targetFormat,
      compressionRatio: 0,
      savedBytes: 0,
      downloadUrl,
      qualityUsed: 100,
      targetReached: true,
      attempts: 0,
      message: 'Image is already smaller than the requested target size.',
    };
  }

  // Step 2: Decode image ONCE into offscreen canvas
  const { image, width, height, objectUrl } = await loadImageElement(file);

  try {
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

    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(image, 0, 0, width, height);

    // Helper to encode canvas at a specific quality factor
    const encodeAtQuality = (q: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new ProcessingError('COMPRESSION_FAILED', 'Canvas blob encoding failed.'));
          },
          targetMime,
          q / 100
        );
      });
    };

    // Step 3: Bounded Binary Search Algorithm
    let low = qualityFloor;
    let high = 100;
    let bestBlob: Blob | null = null;
    let bestQuality = low;
    let attempts = 0;
    let targetReached = false;

    while (low <= high && attempts < maxAttempts) {
      attempts++;
      const mid = Math.floor((low + high) / 2);
      const currentBlob = await encodeAtQuality(mid);

      if (currentBlob.size <= targetSizeBytes) {
        // Candidate reached target! Record as current best candidate
        bestBlob = currentBlob;
        bestQuality = mid;
        targetReached = true;

        // Try higher quality to get closer to upper limit
        low = mid + 1;
      } else {
        // File size exceeds target, need lower quality
        high = mid - 1;
      }
    }

    // Fallback if target was not reached above quality floor
    if (!bestBlob) {
      bestBlob = await encodeAtQuality(qualityFloor);
      bestQuality = qualityFloor;
      targetReached = false;
    }

    const compressedSize = bestBlob.size;
    const savedBytes = Math.max(0, file.size - compressedSize);
    const compressionRatio =
      file.size > 0 ? Math.round(((file.size - compressedSize) / file.size) * 100) : 0;
    const outputFilename = generateTargetFilename(file.name, targetFormat, targetSizeBytes);
    const downloadUrl = URL.createObjectURL(bestBlob);

    const message = targetReached
      ? 'Target size reached successfully ✓'
      : `Target size could not be reached without excessive quality loss. Showing closest practical result.`;

    return {
      blob: bestBlob,
      name: outputFilename,
      size: compressedSize,
      format: targetFormat,
      dimensions: { width, height },
      compressionRatio,
      savedBytes,
      downloadUrl,
      qualityUsed: bestQuality,
      targetReached,
      attempts,
      message,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
