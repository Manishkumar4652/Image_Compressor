import { BatchQueueItem, BatchSettings, BatchSummary } from '@/types/batch';
import { compressImageInBrowser } from './engine';
import { validateImageFile } from './validation';
import { ImageFormat } from '@/types/tool';

export async function processBatchItem(
  item: BatchQueueItem,
  settings: BatchSettings
): Promise<BatchQueueItem> {
  try {
    validateImageFile(item.file);

    const targetFormat: ImageFormat =
      settings.format === 'original'
        ? item.inputFormat
        : (settings.format as ImageFormat);

    const result = await compressImageInBrowser(item.file, {
      quality: settings.quality,
      format: targetFormat,
    });

    return {
      ...item,
      status: 'completed',
      compressedResult: result,
      compressedSize: result.size,
      savedPercentage: result.compressionRatio || 0,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : 'Failed to compress image in browser.';

    return {
      ...item,
      status: 'failed',
      error: errorMsg,
    };
  }
}

export function computeBatchSummary(items: BatchQueueItem[]): BatchSummary {
  const totalFiles = items.length;
  let completedCount = 0;
  let failedCount = 0;
  let originalTotalBytes = 0;
  let compressedTotalBytes = 0;

  for (const item of items) {
    if (item.status === 'completed' && item.compressedSize !== undefined) {
      completedCount++;
      originalTotalBytes += item.originalSize;
      compressedTotalBytes += item.compressedSize;
    } else if (item.status === 'failed') {
      failedCount++;
    }
  }

  const savedBytes = Math.max(0, originalTotalBytes - compressedTotalBytes);
  const totalSavedPercentage =
    originalTotalBytes > 0
      ? Math.round((savedBytes / originalTotalBytes) * 100)
      : 0;

  return {
    totalFiles,
    completedCount,
    failedCount,
    originalTotalBytes,
    compressedTotalBytes,
    totalSavedPercentage,
  };
}
