import { memoryService } from "./service.js";

import type {
  ProductionContext,
  ProductionBrain,
  ProductionTimeline,
} from "../production/types.js";

export async function syncFactoryMemory(
  context: ProductionContext
): Promise<void> {
  await memoryService.update(
    context.request.projectId,
    (memory) => {
      syncTimeline(
        memory,
        context.data.timeline
      );

      syncBrain(
        memory,
        context.data.brain
      );

      syncAssets(
        memory,
        context.data.assets
      );

      syncRender(
        memory,
        context.data.render
      );

      memory.analytics.exports++;
    }
  );
}

function syncTimeline(
  memory: any,
  timeline?: ProductionTimeline
) {
  if (!timeline) return;

  memory.timeline.sceneCount =
    timeline.sceneCount;

  if (timeline.sceneCount > 0) {
    memory.timeline.averageSceneDuration =
      Number(
        (
          600 /
          timeline.sceneCount
        ).toFixed(2)
      );
  }
}

function syncBrain(
  memory: any,
  brain?: ProductionBrain
) {
  if (!brain) return;

  memory.brain.provider =
    brain.provider;

  memory.brain.model =
    "gemini-3.5-flash";

  memory.brain.promptCount =
    brain.timeline?.sceneCount ?? 0;
}

function syncAssets(
  memory: any,
  assets: any
) {
  if (!assets) return;

  if (typeof assets.images === "number") {
    memory.assets.images =
      assets.images;
  }

  if (typeof assets.videos === "number") {
    memory.assets.videos =
      assets.videos;
  }

  if (typeof assets.audio === "number") {
    memory.assets.audio =
      assets.audio;
  }
}

function syncRender(
  memory: any,
  render: any
) {
  if (!render) return;

  memory.render.completed = true;

  memory.render.renderCount++;

  memory.render.lastRender =
    new Date().toISOString();
}