import type { Asset, Prisma } from '@prisma/client';
import { prisma } from '../../prisma.js';

export type AssetRecord = Asset;

export async function listAssets(where: Prisma.AssetWhereInput): Promise<AssetRecord[]> {
  return prisma.asset.findMany({
    where,
    orderBy: [{ type: 'desc' }, { name: 'asc' }],
  });
}

export async function getAsset(id: string): Promise<AssetRecord | null> {
  return prisma.asset.findUnique({ where: { id } });
}

export async function createAsset(data: Prisma.AssetCreateInput): Promise<AssetRecord> {
  return prisma.asset.create({ data });
}

export async function updateAsset(id: string, data: Prisma.AssetUpdateInput): Promise<AssetRecord> {
  return prisma.asset.update({ where: { id }, data });
}

export async function deleteAsset(id: string): Promise<AssetRecord> {
  return prisma.asset.delete({ where: { id } });
}

export async function getDescendants(parentId: string): Promise<AssetRecord[]> {
  const children = await prisma.asset.findMany({ where: { parentId } });
  const nested = await Promise.all(children.map((child) => getDescendants(child.id)));

  return children.concat(nested.flat());
}
