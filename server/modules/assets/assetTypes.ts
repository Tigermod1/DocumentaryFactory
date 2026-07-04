export const assetCategories = [
  'video',
  'audio',
  'image',
  'document',
  'project',
  'other',
] as const;

export const assetTypes = ['file', 'folder'] as const;

export type AssetCategory = (typeof assetCategories)[number];
export type AssetType = (typeof assetTypes)[number];

export interface AssetDto {
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

export interface AssetTreeNode extends AssetDto {
  children: AssetTreeNode[];
}

export interface ImportAssetInput {
  sourcePath: string;
  name?: string;
  parentId?: string | null;
  category?: AssetCategory;
  metadata?: Record<string, unknown>;
  thumbnailSourcePath?: string | null;
}

export interface CreateFolderInput {
  name: string;
  parentId?: string | null;
  category?: AssetCategory;
  metadata?: Record<string, unknown>;
}

export interface UpdateAssetInput {
  name?: string;
  parentId?: string | null;
  category?: AssetCategory;
  metadata?: Record<string, unknown>;
  thumbnailSourcePath?: string | null;
}
