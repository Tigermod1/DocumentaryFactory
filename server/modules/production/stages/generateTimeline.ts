import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { BaseProductionStage } from "../stage.js";
import type { ProductionContext } from "../types.js";

import { generateTimelineFromScript } from "../../timeline/production.js";

export class GenerateTimelineStage extends BaseProductionStage {
  readonly name = "generateTimeline";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    const timeline =
      await generateTimelineFromScript(
        context.request.script
      );

    await mkdir(
      path.join(
        context.projectPath,
        "02_TIMELINE"
      ),
      {
        recursive: true,
      }
    );

    await writeFile(
      context.timelinePath,
      JSON.stringify(
        timeline,
        null,
        2
      ),
      "utf8"
    );

    context.data.timeline = timeline;

    context.logs.push(
      `Timeline generated (${timeline.sceneCount} scenes).`
    );
  }
}

export const generateTimelineStage =
  new GenerateTimelineStage();