import { siteConfig } from '@/config/site';
import { ProcessingError } from '@/types/processing';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

export function validateImageFile(file: File): void {
  if (!file) {
    throw new ProcessingError('CORRUPTED_IMAGE', 'No image file was provided.');
  }

  if (file.size === 0) {
    throw new ProcessingError('CORRUPTED_IMAGE', 'The selected file is empty. Please choose a valid image.');
  }

  if (file.size > siteConfig.maxFileSizeBytes) {
    const maxMb = Math.round(siteConfig.maxFileSizeBytes / (1024 * 1024));
    throw new ProcessingError(
      'OVERSIZED_FILE',
      `File size exceeds the ${maxMb}MB limit. Please select a smaller photo.`
    );
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const mimeType = file.type.toLowerCase();

  const isMimeValid = ALLOWED_MIME_TYPES.has(mimeType);
  const isExtValid = ALLOWED_EXTENSIONS.has(ext);

  if (!isMimeValid && !isExtValid) {
    throw new ProcessingError(
      'UNSUPPORTED_FORMAT',
      'Unsupported file format. Please upload a JPG, JPEG, PNG, or WebP image.'
    );
  }
}
