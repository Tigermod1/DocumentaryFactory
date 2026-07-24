import { mkdir, writeFile } from "node:fs/promises";

import type { ProductionContext } from "../types.js";
import { BaseProductionStage } from "../stage.js";

export class SaveScriptStage extends BaseProductionStage {
  readonly name = "saveScript";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    await mkdir(
      `${context.projectPath}/01_SCRIPT`,
      {
        recursive: true,
      }
    );

    await writeFile(
      context.scriptPath,
      context.request.script,
      "utf8"
    );

    await writeFile(
      `${context.projectPath}/01_SCRIPT/script.json`,
      JSON.stringify(
        {
          projectId: context.request.projectId,
          projectName:
            context.request.projectName,
          topic: context.request.topic,
          market: context.request.market,
          style: context.request.style,
          language:
            context.request.language,
          provider:
            context.request.provider,
          savedAt:
            new Date().toISOString(),
          wordCount:
            context.request.script
              .split(/\s+/)
              .filter(Boolean).length,
          script:
            context.request.script,
        },
        null,
        2
      ),
      "utf8"
    );

    context.data.script =
      context.request.script;

    context.logs.push(
      "Script saved."
    );
  }
}

export const saveScriptStage =
  new SaveScriptStage();