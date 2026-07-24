import {
  promptBuilder,
} from "./PromptBuilder";

import type {
  PromptOutput,
  PromptProject,
  PromptScene,
} from "./PromptTypes";

export class PromptService {
  buildProject(
    project: PromptProject
  ): PromptProject {
    return promptBuilder.buildProject(
      project
    );
  }

  buildScene(
    project: PromptProject,
    scene: PromptScene
  ): PromptScene {
    return promptBuilder.buildScene(
      project,
      scene
    );
  }

  buildFlow(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "flow"
    );
  }

  buildVeo(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "veo"
    );
  }

  buildFlux(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "flux"
    );
  }

  buildComfyUI(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "comfyui"
    );
  }

  buildRunway(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "runway"
    );
  }

  buildPika(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "pika"
    );
  }

  buildLuma(
    project: PromptProject,
    scene: PromptScene
  ): PromptOutput {
    return promptBuilder.buildSingleProvider(
      project,
      scene,
      "luma"
    );
  }

  exportPrompt(
    output: PromptOutput
  ): string {
    return `
========================

Provider

${output.provider}

========================

POSITIVE PROMPT

${output.positive}

========================

NEGATIVE PROMPT

${output.negative}
`.trim();
  }

  exportScene(
    scene: PromptScene
  ): string {
    return scene.outputs
      .map((output) =>
        this.exportPrompt(output)
      )
      .join("\n\n");
  }

  exportProject(
    project: PromptProject
  ): string {
    return project.scenes
      .map((scene) =>
        this.exportScene(scene)
      )
      .join(
        "\n\n=============================================\n\n"
      );
  }
}

export const promptService =
  new PromptService();