import {
  promptBuilder,
} from "../../prompt/PromptBuilder";

import type {
  PromptProject,
  PromptScene,
} from "../../prompt/PromptTypes";

import type {
  RuntimeState,
} from "../runtime/RuntimeState";

export interface ProductionScene {
  id: string;

  sceneNumber: number;

  narration: string;

  duration: number;

  character?: string;

  environment?: string;

  props?: string[];
}

export class ProductionComposer {
  buildProject(
    runtime: RuntimeState,
    scenes: ProductionScene[]
  ): PromptProject {
    const project: PromptProject = {
      projectName: "Documentary Factory",

      targetMarket: "US",

      outputLanguage: "English",

      imageProvider: "flow",

      videoProvider: "veo",

      scenes: scenes.map((scene) =>
        this.buildScene(scene)
      ),
    };

    return promptBuilder.buildProject(
      project
    );
  }

  buildScene(
    scene: ProductionScene
  ): PromptScene {
    return {
      id: scene.id,

      sceneNumber: scene.sceneNumber,

      narration: scene.narration,

      duration: scene.duration,

      subject: {
        character:
          scene.character ?? "",

        environment:
          scene.environment ?? "",

        props:
          scene.props ?? [],
      },

      camera: {
        shot: "medium",

        angle: "eye-level",

        movement: "static",

        lens: "35mm",
      },

      visual: {
        lighting: "cinematic",

        style:
          "bbc-documentary",

        colorPalette:
          "natural",

        mood: "dramatic",

        weather: "clear",

        timeOfDay: "day",
      },

      outputs: [],
    };
  }
}

export const productionComposer =
  new ProductionComposer();