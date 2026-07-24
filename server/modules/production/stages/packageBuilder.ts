import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { BaseProductionStage } from "../stage.js";
import type { ProductionContext } from "../types.js";

export class PackageBuilderStage extends BaseProductionStage {
  readonly name = "packageBuilder";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    const output = {
      version: "2.0",

      createdAt: new Date().toISOString(),

      project: {
        id: context.request.projectId,
        name: context.request.projectName,
        topic: context.request.topic,
        market: context.request.market,
        style: context.request.style,
        language: context.request.language,
        provider: context.request.provider,
      },

      outputs: {
        script: context.data.script ?? null,
        timeline: context.data.timeline ?? null,
        brain: context.data.brain ?? null,
        prompts: context.data.prompts ?? null,
      },
    };

    const folder = path.join(
      context.projectPath,
      "12_PACKAGE"
    );

    await mkdir(folder, {
      recursive: true,
    });

    await writeFile(
      path.join(folder, "production-package.json"),
      JSON.stringify(output, null, 2),
      "utf8"
    );

    context.logs.push(
      "Production package created."
    );
  }
}

export const packageBuilderStage =
  new PackageBuilderStage();