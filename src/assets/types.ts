export const assetCategories = [
  'video',
  'audio',
  'image',
  'document',
  'project',
  'other',
] as const;

export type AssetCategory = (typeof assetCategories)[number];
export type AssetType = 'file' | 'folder';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: AssetCategory;
  originalPath: string | null;
  storagePath: string | null;
  thumbnailPath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  metadata: Record<string, unknown>;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssetTreeNode extends Asset {
  children: AssetTreeNode[];
}

export interface StorageStats {
  rootPath: string;
  totalBytes: number;
  fileCount: number;
}
