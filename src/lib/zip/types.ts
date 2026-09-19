export interface ZipEngine {
  createZip(files: { name: string; blob: Blob }[]): Promise<Blob>;
}
