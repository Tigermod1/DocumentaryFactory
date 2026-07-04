import type { Asset, AssetCategory, AssetTreeNode, StorageStats } from './types';

const apiBaseUrl = 'http://127.0.0.1:3001/api/assets';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function listAssets(params: {
  search?: string;
  parentId?: string | null;
  category?: AssetCategory | '';
}): Promise<Asset[]> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.parentId !== undefined) {
    searchParams.set('parentId', params.parentId ?? '');
  }

  if (params.category) {
    searchParams.set('category', params.category);
  }

  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return request<Asset[]>(suffix);
}

export function getAssetTree(): Promise<AssetTreeNode[]> {
  return request<AssetTreeNode[]>('/tree');
}

export function getStorageStats(): Promise<StorageStats> {
  return request<StorageStats>('/storage');
}

export function createFolder(input: {
  name: string;
  parentId: string | null;
  category: AssetCategory;
}): Promise<Asset> {
  return request<Asset>('/folders', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function importAsset(input: {
  sourcePath: string;
  name?: string;
  parentId: string | null;
  category: AssetCategory;
  metadata?: Record<string, unknown>;
  thumbnailSourcePath?: string;
}): Promise<Asset> {
  return request<Asset>('/import', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateAsset(id: string, input: {
  name?: string;
  parentId?: string | null;
  category?: AssetCategory;
  metadata?: Record<string, unknown>;
  thumbnailSourcePath?: string | null;
}): Promise<Asset> {
  return request<Asset>(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteAsset(id: string): Promise<void> {
  return request<void>(`/${id}`, { method: 'DELETE' });
}

export function thumbnailUrl(asset: Asset): string | null {
  return asset.thumbnailPath ? `${apiBaseUrl}/${asset.id}/thumbnail` : null;
}
