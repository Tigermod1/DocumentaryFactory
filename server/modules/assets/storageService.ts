import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface StoredFile {
  absolutePath: string;
  relativePath: string;
  sizeBytes: number;
  mimeType: string;
}

const storageRoot = path.resolve(process.env.ASSET_STORAGE_DIR ?? path.join(process.cwd(), 'data', 'assets'));
const originalsRoot = path.join(storageRoot, 'originals');
const thumbnailsRoot = path.join(storageRoot, 'thumbnails');

const mimeTypesByExtension: Record<string, string> = {
  '.aac': 'audio/aac',
  '.avi': 'video/x-msvideo',
  '.csv': 'text/csv',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.m4a': 'audio/mp4',
  '.mkv': 'video/x-matroska',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.txt': 'text/plain',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
};

export function getStorageRoot(): string {
  return storageRoot;
}

export function resolveStoredPath(relativePath: string): string {
  const absolutePath = path.resolve(storageRoot, relativePath);

  if (!absolutePath.startsWith(storageRoot)) {
    throw new Error('Stored path is outside the asset storage root.');
  }

  return absolutePath;
}

export async function ensureStorage(): Promise<void> {
  await fs.mkdir(originalsRoot, { recursive: true });
  await fs.mkdir(thumbnailsRoot, { recursive: true });
}

export async function copyIntoStorage(sourcePath: string, bucket: 'originals' | 'thumbnails'): Promise<StoredFile> {
  await ensureStorage();

  const source = path.resolve(sourcePath);
  const stat = await fs.stat(source);

  if (!stat.isFile()) {
    throw new Error('Source path must point to a file.');
  }

  const extension = path.extname(source);
  const hash = createHash('sha256')
    .update(`${source}:${stat.size}:${stat.mtimeMs}:${Date.now()}`)
    .digest('hex')
    .slice(0, 24);
  const fileName = `${hash}${extension.toLowerCase()}`;
  const destinationRoot = bucket === 'originals' ? originalsRoot : thumbnailsRoot;
  const destination = path.join(destinationRoot, fileName);

  await fs.copyFile(source, destination);

  return {
    absolutePath: destination,
    relativePath: path.relative(storageRoot, destination),
    sizeBytes: stat.size,
    mimeType: mimeTypesByExtension[extension.toLowerCase()] ?? 'application/octet-stream',
  };
}

export async function deleteStoredFile(relativePath: string | null): Promise<void> {
  if (!relativePath) {
    return;
  }

  const target = resolveStoredPath(relativePath);
  await fs.rm(target, { force: true });
}

export async function getStorageUsage(): Promise<{ rootPath: string; totalBytes: number; fileCount: number }> {
  await ensureStorage();

  let totalBytes = 0;
  let fileCount = 0;

  async function walk(directory: string): Promise<void> {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    await Promise.all(entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(entryPath);
        return;
      }

      if (entry.isFile()) {
        const stat = await fs.stat(entryPath);
        totalBytes += stat.size;
        fileCount += 1;
      }
    }));
  }

  await walk(storageRoot);

  return {
    rootPath: storageRoot,
    totalBytes,
    fileCount,
  };
}
