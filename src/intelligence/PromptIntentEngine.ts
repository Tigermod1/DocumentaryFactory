import type {
  CameraAnalysis,
  CompositionAnalysis,
  DocumentaryScene,
  EmotionAnalysis,
  PromptIntent,
  StoryAnalysis,
  VisualAnalysis,
} from "./types";

export class PromptIntentEngine {
  analyze(
    scene: DocumentaryScene,
    story: StoryAnalysis,
    emotion: EmotionAnalysis,
    camera: CameraAnalysis,
    composition: CompositionAnalysis,
    visual: VisualAnalysis
  ): PromptIntent {
    return {
      goal: this.buildGoal(story),

      subject: this.buildSubject(scene),

      visualStory: this.buildVisualStory(
        scene,
        emotion,
        visual
      ),

      cameraDirection:
        this.buildCameraDirection(
          camera,
          composition
        ),

      atmosphere:
        this.buildAtmosphere(
          emotion,
          visual
        ),
    };
  }

  private buildGoal(
    story: StoryAnalysis
  ): string {
    switch (story.intent) {
      case "introduce":
        return "Introduce the world and establish context.";

      case "build_context":
        return "Expand the historical context.";

      case "raise_question":
        return "Create curiosity and encourage the viewer to keep watching.";

      case "increase_tension":
        return "Increase dramatic tension.";

      case "conflict":
        return "Show conflict and its consequences.";

      case "discovery":
        return "Reveal a new discovery.";

      case "reveal":
        return "Deliver the key revelation.";

      case "reflection":
        return "Encourage reflection.";

      case "resolution":
        return "Provide emotional closure.";

      case "ending":
        return "Leave a memorable final impression.";

      default:
        return "Tell the story clearly.";
    }
  }

  private buildSubject(
    scene: DocumentaryScene
  ): string {
    return [
      scene.character || "Main subject",
      scene.environment || "Environment",
    ].join(" in ");
  }

  private buildVisualStory(
    scene: DocumentaryScene,
    emotion: EmotionAnalysis,
    visual: VisualAnalysis
  ): string {
    return `
Narration:
${scene.narration}

Emotion:
${emotion.emotion}

Lighting:
${visual.lighting}

Weather:
${visual.weather}

Time:
${visual.timeOfDay}
`.trim();
  }

  private buildCameraDirection(
    camera: CameraAnalysis,
    composition: CompositionAnalysis
  ): string {
    return `
Shot:
${camera.shot}

Angle:
${camera.angle}

Movement:
${camera.movement}

Lens:
${camera.lens}

Composition:
${composition.intent}

Framing:
${composition.framing}

Focus:
${composition.focus}
`.trim();
  }

  private buildAtmosphere(
    emotion: EmotionAnalysis,
    visual: VisualAnalysis
  ): string {
    return `
Mood:
${visual.mood}

Emotion:
${emotion.emotion}

Intensity:
${emotion.intensity}

Lighting:
${visual.lighting}

Color:
${visual.color}
`.trim();
  }
}

export const promptIntentEngine =
  new PromptIntentEngine();