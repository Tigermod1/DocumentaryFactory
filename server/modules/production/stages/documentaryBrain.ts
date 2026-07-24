import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { BaseProductionStage } from "../stage.js";
import type { ProductionContext } from "../types.js";

import { createAIClient } from "../../providers/client.js";

export class DocumentaryBrainStage extends BaseProductionStage {
  readonly name = "documentaryBrain";

  async execute(
    context: ProductionContext
  ): Promise<void> {
    const ai = createAIClient(
      context.request.provider as
        | "gemini"
        | "openai"
        | "claude"
    );

    const response = await ai.generate({
      model: "gemini-3.5-flash",

      temperature: 0.7,

      messages: [
        {
          role: "system",
          content:
            "You are a world-class documentary researcher, historian and story architect.",
        },
        {
          role: "user",
          content: `
Analyze the following documentary project.

Project:
${context.request.projectName}

Topic:
${context.request.topic}

Target Market:
${context.request.market}

Style:
${context.request.style}

Language:
${context.request.language}

Timeline:

${JSON.stringify(
  context.data.timeline,
  null,
  2
)}

Script:

${context.request.script}

Return JSON with:

- summary
- narrative
- keyCharacters
- keyLocations
- timelineAnalysis
- emotionalBeats
- visualOpportunities
- cinematicStyle
- keywords
`,
        },
      ],
    });

    const brain = {
      projectId: context.request.projectId,

      createdAt: new Date().toISOString(),

      provider: context.request.provider,

      ai: response.content,

      timeline: context.data.timeline,
    };

    const folder = path.join(
      context.projectPath,
      "03_BRAIN"
    );

    await mkdir(folder, {
      recursive: true,
    });

    await writeFile(
      path.join(folder, "brain.json"),
      JSON.stringify(
        brain,
        null,
        2
      ),
      "utf8"
    );

    context.data.brain = brain;

    context.logs.push(
      `Documentary Brain completed using ${context.request.provider}.`
    );
  }
}

export const documentaryBrainStage =
  new DocumentaryBrainStage();