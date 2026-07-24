import {
  storyIntentEngine,
} from "./StoryIntentEngine";

import {
  emotionEngine,
} from "./EmotionEngine";

import {
  cameraEngine,
} from "./CameraEngine";

import {
  compositionEngine,
} from "./CompositionEngine";

import {
  visualEngine,
} from "./VisualEngine";

import {
  promptIntentEngine,
} from "./PromptIntentEngine";

import type {
  DocumentaryAnalysis,
  DocumentaryScene,
} from "./types";

export class DocumentaryBrain {
  analyze(
    scene: DocumentaryScene
  ): DocumentaryAnalysis {
    const story =
      storyIntentEngine.analyze(scene);

    const emotion =
      emotionEngine.analyze(
        scene,
        story
      );

    const camera =
      cameraEngine.analyze(
        scene,
        story,
        emotion
      );

    const composition =
      compositionEngine.analyze(
        scene,
        story,
        emotion,
        camera
      );

    const visual =
      visualEngine.analyze(
        scene,
        story,
        emotion,
        camera,
        composition
      );

    const prompt =
      promptIntentEngine.analyze(
        scene,
        story,
        emotion,
        camera,
        composition,
        visual
      );

    return {
      story,
      emotion,
      camera,
      composition,
      visual,
      prompt,
    };
  }

  analyzeMany(
    scenes: DocumentaryScene[]
  ): DocumentaryAnalysis[] {
    return scenes.map((scene) =>
      this.analyze(scene)
    );
  }
}

export const documentaryBrain =
  new DocumentaryBrain();