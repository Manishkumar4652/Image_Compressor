export interface ImageMetadata {
  format?: string;
  width?: number;
  height?: number;
  exifData?: Record<string, unknown>;
  hasExif?: boolean;
}

export interface MetadataEngine {
  extractMetadata(file: File): Promise<ImageMetadata>;
  stripMetadata(file: File): Promise<Blob>;
}
