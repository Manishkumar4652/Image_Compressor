import { ImageMetadata, MetadataEngine } from './types';

export class PlaceholderMetadataEngine implements MetadataEngine {
  async extractMetadata(file: File): Promise<ImageMetadata> {
    return {
      format: file.type,
      width: 0,
      height: 0,
      hasExif: false,
    };
  }

  async stripMetadata(file: File): Promise<Blob> {
    return new Blob([await file.arrayBuffer()], { type: file.type });
  }
}

export const defaultMetadataEngine = new PlaceholderMetadataEngine();
