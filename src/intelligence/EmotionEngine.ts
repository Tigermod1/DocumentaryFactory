import type {
  DocumentaryScene,
  EmotionAnalysis,
  EmotionType,
  StoryAnalysis,
} from "./types";

export class EmotionEngine {
  analyze(
    scene: DocumentaryScene,
    story: StoryAnalysis
  ): EmotionAnalysis {
    const text =
      scene.narration.toLowerCase();

    const emotion =
      this.detectEmotion(
        text,
        story.intent
      );

    return {
      emotion,

      intensity:
        this.calculateIntensity(
          text,
          emotion
        ),

      confidence: 0.92,
    };
  }

  private detectEmotion(
    text: string,
    intent: StoryAnalysis["intent"]
  ): EmotionType {
    if (
      this.has(text, [
        "death",
        "died",
        "dead",
        "grave",
        "funeral",
        "loss",
      ])
    ) {
      return "sadness";
    }

    if (
      this.has(text, [
        "alone",
        "isolated",
        "solitary",
        "abandoned",
      ])
    ) {
      return "loneliness";
    }

    if (
      this.has(text, [
        "battle",
        "war",
        "attack",
        "enemy",
        "fight",
      ])
    ) {
      return "tension";
    }

    if (
      this.has(text, [
        "fear",
        "terrified",
        "panic",
        "danger",
      ])
    ) {
      return "fear";
    }

    if (
      this.has(text, [
        "victory",
        "won",
        "success",
        "triumph",
      ])
    ) {
      return "victory";
    }

    if (
      this.has(text, [
        "dream",
        "future",
        "hope",
      ])
    ) {
      return "hope";
    }

    if (
      this.has(text, [
        "discover",
        "mystery",
        "unknown",
        "hidden",
        "secret",
        "why",
      ])
    ) {
      return "curiosity";
    }

    if (
      this.has(text, [
        "beautiful",
        "magnificent",
        "astonishing",
      ])
    ) {
      return "wonder";
    }

    if (
      this.has(text, [
        "never give up",
        "continue",
        "persist",
      ])
    ) {
      return "determination";
    }

    if (
      intent === "ending" ||
      intent === "resolution"
    ) {
      return "inspiration";
    }

    return "neutral";
  }

  private calculateIntensity(
    text: string,
    emotion: EmotionType
  ): number {
    let score = 0.5;

    if (text.includes("!")) score += 0.1;

    if (text.length > 180)
      score += 0.1;

    switch (emotion) {
      case "fear":
      case "tension":
      case "victory":
        score += 0.2;
        break;

      case "curiosity":
      case "wonder":
        score += 0.15;
        break;

      case "sadness":
      case "loneliness":
        score += 0.1;
        break;
    }

    return Math.min(score, 1);
  }

  private has(
    text: string,
    words: string[]
  ) {
    return words.some((word) =>
      text.includes(word)
    );
  }
}

export const emotionEngine =
  new EmotionEngine();