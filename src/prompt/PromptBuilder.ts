import type {
  PromptProject,
  PromptScene,
  PromptOutput,
} from "./PromptTypes";

import {
  buildFlowPrompt,
  buildVeoPrompt,
  buildFluxPrompt,
  buildComfyPrompt,
  buildRunwayPrompt,
  buildPikaPrompt,
  buildLumaPrompt,
} from "./PromptTemplates";

export class PromptBuilder {
  buildScene(
    project: PromptProject,
    scene: PromptScene
  ): PromptScene {
    const outputs: PromptOutput[] = [
      buildFlowPrompt(project, scene),

      buildVeoPrompt(project, scene),

      buildFluxPrompt(project, scene),

      buildComfyPrompt(project, scene),

      buildRunwayPrompt(project, scene),

      buildPikaPrompt(project, scene),

      buildLumaPrompt(project, scene),
    ];

    return {
      ...scene,

      outputs,
    };
  }

  buildProject(
    project: PromptProject
  ): PromptProject {
    return {
      ...project,

      scenes: project.scenes.map((scene) =>
        this.buildScene(project, scene)
      ),
    };
  }

  buildSingleProvider(
    project: PromptProject,
    scene: PromptScene,
    provider: PromptOutput["provider"]
  ): PromptOutput {
    switch (provider) {
      case "flow":
        return buildFlowPrompt(
          project,
          scene
        );

      case "veo":
        return buildVeoPrompt(
          project,
          scene
        );

      case "flux":
        return buildFluxPrompt(
          project,
          scene
        );

      case "comfyui":
        return buildComfyPrompt(
          project,
          scene
        );

      case "runway":
        return buildRunwayPrompt(
          project,
          scene
        );

      case "pika":
        return buildPikaPrompt(
          project,
          scene
        );

      case "luma":
        return buildLumaPrompt(
          project,
          scene
        );

      default:
        throw new Error(
          `Unsupported provider: ${provider}`
        );
    }
  }
}

export const promptBuilder =
  new PromptBuilder();