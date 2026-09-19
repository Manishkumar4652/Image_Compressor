import JSZip from 'jszip';
import { BatchQueueItem } from '@/types/batch';
import { ZipEngine } from './types';

/**
 * In-browser ZIP archive generator using JSZip.
 * Deduplicates filenames (e.g. photo.jpg, photo (1).jpg) and creates a downloadable Object URL.
 */
export async function createBatchZip(items: BatchQueueItem[]): Promise<{ blob: Blob; url: string }> {
  const zip = new JSZip();
  const nameCounts = new Map<string, number>();

  const completedItems = items.filter(
    (item) => item.status === 'completed' && item.compressedResult?.blob
  );

  if (completedItems.length === 0) {
    throw new Error('No successfully compressed images available to generate ZIP archive.');
  }

  for (const item of completedItems) {
    if (!item.compressedResult) continue;

    const originalName = item.compressedResult.name;
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const ext = originalName.split('.').pop() || 'jpg';

    // Deduplicate filename inside the zip
    const count = nameCounts.get(originalName) || 0;
    nameCounts.set(originalName, count + 1);

    const finalName = count === 0 ? originalName : `${baseName} (${count}).${ext}`;
    zip.file(finalName, item.compressedResult.blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(zipBlob);

  return {
    blob: zipBlob,
    url: zipUrl,
  };
}

export class RealBrowserZipEngine implements ZipEngine {
  async createZip(files: { name: string; blob: Blob }[]): Promise<Blob> {
    const zip = new JSZip();
    for (const file of files) {
      zip.file(file.name, file.blob);
    }
    return zip.generateAsync({ type: 'blob' });
  }
}

export const defaultZipEngine = new RealBrowserZipEngine();
