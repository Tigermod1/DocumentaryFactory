import path from 'node:path';
import type { Prisma } from '@prisma/client';
import {
  createAsset,
  deleteAsset,
  getAsset,
  getDescendants,
  listAssets,
  updateAsset,
} from './assetRepository.js';
import {
  assetCategories,
  type AssetCategory,
  type AssetDto,
  type AssetTreeNode,
  type CreateFolderInput,
  type ImportAssetInput,
  type UpdateAssetInput,
} from './assetTypes.js';
import { copyIntoStorage, deleteStoredFile, getStorageUsage } from './storageService.js';

const defaultCategory: AssetCategory = 'other';

function parseMetadata(metadata: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(metadata);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function serializeMetadata(metadata: Record<string, unknown> | undefined): string {
  return JSON.stringify(metadata ?? {});
}

function normalizeName(name: string): string {
  const trimmed = name.trim();

  if (!trimmed) {
    throw new Error('Asset name is required.');
  }

  return trimmed;
}

function normalizeCategory(category: string | undefined): AssetCategory {
  if (!category) {
    return defaultCategory;
  }

  if (!assetCategories.includes(category as AssetCategory)) {
    throw new Error(`Unsupported asset category: ${category}`);
  }

  return category as AssetCategory;
}

function toDto(asset: {
  id: string;
  name: string;
  type: string;
  category: string;
  originalPath: string | null;
  storagePath: string | null;
  thumbnailPath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  metadata: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): AssetDto {
  return {
    id: asset.id,
    name: asset.name,
    type: asset.type === 'folder' ? 'folder' : 'file',
    category: normalizeCategory(asset.category),
    originalPath: asset.originalPath,
    storagePath: asset.storagePath,
    thumbnailPath: asset.thumbnailPath,
    mimeType: asset.mimeType,
    sizeBytes: asset.sizeBytes,
    metadata: parseMetadata(asset.metadata),
    parentId: asset.parentId,
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
}

async function assertParentFolder(parentId: string | null | undefined): Promise<void> {
  if (!parentId) {
    return;
  }

  const parent = await getAsset(parentId);

  if (!parent || parent.type !== 'folder') {
    throw new Error('Parent folder does not exist.');
  }
}

export async function searchAssets(input: {
  search?: string;
  parentId?: string | null;
  category?: string;
}): Promise<AssetDto[]> {
  const where: Prisma.AssetWhereInput = {};

  if (input.search?.trim()) {
    where.OR = [
      { name: { contains: input.search.trim() } },
      { metadata: { contains: input.search.trim() } },
    ];
  }

  if (input.parentId !== undefined) {
    where.parentId = input.parentId;
  }

  if (input.category) {
    where.category = normalizeCategory(input.category);
  }

  const assets = await listAssets(where);
  return assets.map(toDto);
}

export async function buildAssetTree(): Promise<AssetTreeNode[]> {
  const assets = (await listAssets({})).map(toDto);
  const byParent = new Map<string | null, AssetDto[]>();

  for (const asset of assets) {
    const siblings = byParent.get(asset.parentId) ?? [];
    siblings.push(asset);
    byParent.set(asset.parentId, siblings);
  }

  function makeNodes(parentId: string | null): AssetTreeNode[] {
    return (byParent.get(parentId) ?? []).map((asset) => ({
      ...asset,
      children: makeNodes(asset.id),
    }));
  }

  return makeNodes(null);
}

export async function importAsset(input: ImportAssetInput): Promise<AssetDto> {
  await assertParentFolder(input.parentId);

  const storedFile = await copyIntoStorage(input.sourcePath, 'originals');
  const thumbnail = input.thumbnailSourcePath
    ? await copyIntoStorage(input.thumbnailSourcePath, 'thumbnails')
    : null;
  const name = normalizeName(input.name ?? path.basename(input.sourcePath));

  const asset = await createAsset({
    name,
    type: 'file',
    category: normalizeCategory(input.category),
    originalPath: path.resolve(input.sourcePath),
    storagePath: storedFile.relativePath,
    thumbnailPath: thumbnail?.relativePath,
    mimeType: storedFile.mimeType,
    sizeBytes: storedFile.sizeBytes,
    metadata: serializeMetadata(input.metadata),
    parent: input.parentId ? { connect: { id: input.parentId } } : undefined,
  });

  return toDto(asset);
}

export async function createFolder(input: CreateFolderInput): Promise<AssetDto> {
  await assertParentFolder(input.parentId);

  const folder = await createAsset({
    name: normalizeName(input.name),
    type: 'folder',
    category: normalizeCategory(input.category),
    metadata: serializeMetadata(input.metadata),
    parent: input.parentId ? { connect: { id: input.parentId } } : undefined,
  });

  return toDto(folder);
}

export async function renameMoveOrUpdateAsset(id: string, input: UpdateAssetInput): Promise<AssetDto> {
  const existing = await getAsset(id);

  if (!existing) {
    throw new Error('Asset not found.');
  }

  if (input.parentId !== undefined) {
    await assertParentFolder(input.parentId);

    if (input.parentId === id) {
      throw new Error('An asset cannot be moved into itself.');
    }

    const descendants = await getDescendants(id);
    if (descendants.some((asset) => asset.id === input.parentId)) {
      throw new Error('A folder cannot be moved into one of its descendants.');
    }
  }

  let thumbnailPath: string | null | undefined;

  if (input.thumbnailSourcePath !== undefined) {
    await deleteStoredFile(existing.thumbnailPath);
    thumbnailPath = input.thumbnailSourcePath
      ? (await copyIntoStorage(input.thumbnailSourcePath, 'thumbnails')).relativePath
      : null;
  }

  const data: Prisma.AssetUpdateInput = {
    name: input.name !== undefined ? normalizeName(input.name) : undefined,
    parent: input.parentId !== undefined
      ? input.parentId
        ? { connect: { id: input.parentId } }
        : { disconnect: true }
      : undefined,
    category: input.category !== undefined ? normalizeCategory(input.category) : undefined,
    metadata: input.metadata !== undefined ? serializeMetadata(input.metadata) : undefined,
    thumbnailPath,
  };

  return toDto(await updateAsset(id, data));
}

export async function removeAsset(id: string): Promise<void> {
  const existing = await getAsset(id);

  if (!existing) {
    throw new Error('Asset not found.');
  }

  const descendants = await getDescendants(id);
  await Promise.all(descendants.map((asset) => Promise.all([
    deleteStoredFile(asset.storagePath),
    deleteStoredFile(asset.thumbnailPath),
  ])));
  await deleteStoredFile(existing.storagePath);
  await deleteStoredFile(existing.thumbnailPath);
  await deleteAsset(id);
}

export { getAsset, getStorageUsage, toDto };
