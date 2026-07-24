import type {
  CameraAnalysis,
  CompositionAnalysis,
  DocumentaryScene,
  EmotionAnalysis,
  StoryAnalysis,
} from "./types";

export class CompositionEngine {
  analyze(
    scene: DocumentaryScene,
    story: StoryAnalysis,
    emotion: EmotionAnalysis,
    camera: CameraAnalysis
  ): CompositionAnalysis {
    return {
      intent: this.intent(
        story,
        emotion
      ),

      framing: this.framing(
        story,
        emotion,
        camera
      ),

      focus: this.focus(
        story,
        emotion
      ),
    };
  }

  private intent(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): CompositionAnalysis["intent"] {
    switch (story.intent) {
      case "introduce":
        return "depth";

      case "build_context":
        return "leading_lines";

      case "raise_question":
        return "negative_space";

      case "conflict":
        return "rule_of_thirds";

      case "reflection":
        return "negative_space";

      case "reveal":
        return "center";

      case "resolution":
        return "symmetry";

      default:
        break;
    }

    switch (emotion.emotion) {
      case "loneliness":
        return "negative_space";

      case "victory":
        return "center";

      case "wonder":
        return "depth";

      default:
        return "rule_of_thirds";
    }
  }

  private framing(
    story: StoryAnalysis,
    emotion: EmotionAnalysis,
    camera: CameraAnalysis
  ): string {
    switch (story.intent) {
      case "introduce":
        return "Foreground → Midground → Background";

      case "build_context":
        return "Wide environmental framing";

      case "raise_question":
        return "Large empty space around subject";

      case "conflict":
        return "Dynamic diagonal composition";

      case "reflection":
        return "Subject isolated in frame";

      case "reveal":
        return "Centered reveal framing";

      case "resolution":
        return "Balanced symmetrical framing";
    }

    switch (emotion.emotion) {
      case "loneliness":
        return "Subject occupies less than 20% of frame";

      case "fear":
        return "Compressed frame";

      case "victory":
        return "Hero framing";

      case "wonder":
        return "Large scale composition";

      default:
        return `${camera.shot} composition`;
    }
  }

  private focus(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    switch (story.intent) {
      case "introduce":
        return "Environment";

      case "build_context":
        return "Relationship between subject and world";

      case "raise_question":
        return "Visual mystery";

      case "conflict":
        return "Action";

      case "reflection":
        return "Facial expression";

      case "reveal":
        return "Key object";

      case "resolution":
        return "Overall scene";
    }

    switch (emotion.emotion) {
      case "loneliness":
        return "Eyes";

      case "fear":
        return "Face";

      case "curiosity":
        return "Unknown object";

      case "wonder":
        return "Landscape";

      case "victory":
        return "Character posture";

      default:
        return "Main subject";
    }
  }
}

export const compositionEngine =
  new CompositionEngine();