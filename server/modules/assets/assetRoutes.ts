import express from 'express';
import {
  buildAssetTree,
  createFolder,
  getAsset,
  getStorageUsage,
  importAsset,
  removeAsset,
  renameMoveOrUpdateAsset,
  searchAssets,
  toDto,
} from './assetService.js';
import { resolveStoredPath } from './storageService.js';

export const assetRouter = express.Router();

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected server error.';
}

assetRouter.get('/', async (request, response) => {
  try {
    const parentId = typeof request.query.parentId === 'string'
      ? request.query.parentId || null
      : undefined;

    response.json(await searchAssets({
      search: typeof request.query.search === 'string' ? request.query.search : undefined,
      parentId,
      category: typeof request.query.category === 'string' ? request.query.category : undefined,
    }));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.get('/tree', async (_request, response) => {
  response.json(await buildAssetTree());
});

assetRouter.get('/storage', async (_request, response) => {
  response.json(await getStorageUsage());
});

assetRouter.post('/import', async (request, response) => {
  try {
    response.status(201).json(await importAsset(request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.post('/folders', async (request, response) => {
  try {
    response.status(201).json(await createFolder(request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.get('/:id/thumbnail', async (request, response) => {
  try {
    const asset = await getAsset(request.params.id);

    if (!asset?.thumbnailPath) {
      response.sendStatus(404);
      return;
    }

    response.sendFile(resolveStoredPath(asset.thumbnailPath));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.get('/:id/file', async (request, response) => {
  try {
    const asset = await getAsset(request.params.id);

    if (!asset?.storagePath) {
      response.sendStatus(404);
      return;
    }

    response.sendFile(resolveStoredPath(asset.storagePath));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.get('/:id', async (request, response) => {
  const asset = await getAsset(request.params.id);

  if (!asset) {
    response.sendStatus(404);
    return;
  }

  response.json(toDto(asset));
});

assetRouter.patch('/:id', async (request, response) => {
  try {
    response.json(await renameMoveOrUpdateAsset(request.params.id, request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

assetRouter.delete('/:id', async (request, response) => {
  try {
    await removeAsset(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});
