import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { BaseProductionStage } from "../stage.js";
import type { ProductionContext } from "../types.js";

import { getProvider } from "../../providers/index.js";

export class PromptComposerStage extends BaseProductionStage {
  readonly name = "promptComposer";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    const provider = getProvider(
      context.request.provider as
        | "gemini"
        | "openai"
        | "claude"
    );

    const ai = await provider.generate({
      model: "gemini-3.5-flash",

      temperature: 0.8,

      messages: [
        {
          role: "system",
          content:
            "You are an expert cinematic prompt engineer for AI documentary production.",
        },
        {
          role: "user",
          content: `
Generate a production prompt package.

Topic:
${context.request.topic}

Market:
${context.request.market}

Style:
${context.request.style}

Language:
${context.request.language}

Brain:

${JSON.stringify(
  context.data.brain,
  null,
  2
)}

Timeline:

${JSON.stringify(
  context.data.timeline,
  null,
  2
)}

Return:

- Character Bible

- Environment Bible

- Art Direction

- Color Palette

- Camera Style

- Lighting Style

- Image Prompts

- Video Prompts
`,
        },
      ],
    });

    const prompts = {
      projectId: context.request.projectId,

      createdAt: new Date().toISOString(),

      provider: provider.name,

      ai: ai.content,
    };

    const folder = path.join(
      context.projectPath,
      "04_PROMPTS"
    );

    await mkdir(folder, {
      recursive: true,
    });

    await writeFile(
      path.join(folder, "prompts.json"),
      JSON.stringify(
        prompts,
        null,
        2
      ),
      "utf8"
    );

    context.data.prompts = prompts;

    context.logs.push(
      `Prompt Composer completed using ${provider.name}.`
    );
  }
}

export const promptComposerStage =
  new PromptComposerStage();