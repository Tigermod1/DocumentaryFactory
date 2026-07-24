import { mkdir, writeFile } from "node:fs/promises";

import type { ProductionContext } from "../types.js";
import { BaseProductionStage } from "../stage.js";

export class CreateProjectStage extends BaseProductionStage {
  readonly name = "createProject";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    await mkdir(context.projectPath, {
      recursive: true,
    });

    const folders = [
      "01_SCRIPT",
      "02_TIMELINE",
      "03_STORYBOARD",
      "04_PROMPTS",
      "05_IMAGES",
      "06_VIDEO",
      "07_AUDIO",
      "08_SUBTITLE",
      "09_RENDER",
      "10_THUMBNAILS",
      "11_YOUTUBE",
      "12_LOG",
    ];

    for (const folder of folders) {
      await mkdir(
        `${context.projectPath}/${folder}`,
        {
          recursive: true,
        }
      );
    }

    await writeFile(
      `${context.projectPath}/manifest.json`,
      JSON.stringify(
        {
          id: context.request.projectId,
          projectName:
            context.request.projectName,
          topic: context.request.topic,
          market: context.request.market,
          style: context.request.style,
          language:
            context.request.language,
          provider:
            context.request.provider,
          createdAt:
            new Date().toISOString(),
        },
        null,
        2
      ),
      "utf8"
    );

    await writeFile(
      `${context.projectPath}/project.dfp`,
      JSON.stringify(
        {
          version: "2.0",
          projectId:
            context.request.projectId,
        },
        null,
        2
      ),
      "utf8"
    );

    context.logs.push(
      "Project created."
    );
  }
}

export const createProjectStage =
  new CreateProjectStage();