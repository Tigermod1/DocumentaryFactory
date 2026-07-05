import express from 'express';
import {
  createEmptyTimeline,
  createTimelineFromContent,
  deleteScene,
  deleteTimeline,
  getTimelineById,
  insertScene,
  listTimelines,
  mergeScene,
  parseTimelineContent,
  reorderScene,
  splitScene,
  updateScene,
  updateTimeline,
} from './service.js';
import {
  sceneInsertSchema,
  sceneMergeSchema,
  sceneReorderSchema,
  sceneSplitSchema,
  sceneUpdateSchema,
  timelineCreateSchema,
  timelineDraftSchema,
  timelineUpdateSchema,
} from './types.js';

export const timelineRouter = express.Router();

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected server error.';
}

timelineRouter.get('/', async (_request, response) => {
  response.json(await listTimelines());
});

timelineRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await createTimelineFromContent(request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/empty', async (request, response) => {
  try {
    const payload = timelineUpdateSchema.parse(request.body);
    response.status(201).json(await createEmptyTimeline({ name: payload.name ?? 'Untitled timeline', metadata: payload.metadata }));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/parse', async (request, response) => {
  try {
    const payload = timelineDraftSchema.parse(request.body);
    response.json(await parseTimelineContent(payload));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.get('/:timelineId', async (request, response) => {
  const timeline = await getTimelineById(request.params.timelineId);

  if (!timeline) {
    response.sendStatus(404);
    return;
  }

  response.json(timeline);
});

timelineRouter.patch('/:timelineId', async (request, response) => {
  try {
    response.json(await updateTimeline(request.params.timelineId, request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.delete('/:timelineId', async (request, response) => {
  try {
    await deleteTimeline(request.params.timelineId);
    response.sendStatus(204);
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/:timelineId/scenes', async (request, response) => {
  try {
    response.json(await insertScene(request.params.timelineId, request.body));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/:timelineId/scenes/reorder', async (request, response) => {
  try {
    response.json(await reorderScene(request.params.timelineId, sceneReorderSchema.parse(request.body)));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.patch('/:timelineId/scenes/:sceneId', async (request, response) => {
  try {
    response.json(await updateScene(request.params.timelineId, request.params.sceneId, sceneUpdateSchema.parse(request.body)));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/:timelineId/scenes/:sceneId/merge', async (request, response) => {
  try {
    response.json(await mergeScene(request.params.timelineId, request.params.sceneId, sceneMergeSchema.parse(request.body)));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.post('/:timelineId/scenes/:sceneId/split', async (request, response) => {
  try {
    response.json(await splitScene(request.params.timelineId, request.params.sceneId, sceneSplitSchema.parse(request.body)));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});

timelineRouter.delete('/:timelineId/scenes/:sceneId', async (request, response) => {
  try {
    response.json(await deleteScene(request.params.timelineId, request.params.sceneId));
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) });
  }
});
