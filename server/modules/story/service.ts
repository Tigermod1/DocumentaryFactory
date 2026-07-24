import { parseStories } from "./parser.js";

import type {
  AnalyzeStoryInput,
  StoryAnalysis,
  StoryReport,
} from "./types.js";

const storyStore: StoryAnalysis[] = [];

export function analyzeStories(
  inputs: AnalyzeStoryInput[]
): StoryReport {
  return parseStories(inputs);
}

export function createStories(
  inputs: AnalyzeStoryInput[]
): StoryAnalysis[] {
  const report = parseStories(inputs);

  storyStore.push(...report.analyses);

  return report.analyses;
}

export function getStories(): StoryAnalysis[] {
  return storyStore;
}

export function getStory(
  id: string
): StoryAnalysis | undefined {
  return storyStore.find(
    (story) => story.id === id
  );
}

export function updateStory(
  id: string,
  data: Partial<StoryAnalysis>
): StoryAnalysis | null {
  const story = storyStore.find(
    (item) => item.id === id
  );

  if (!story) {
    return null;
  }

  Object.assign(story, data);

  return story;
}

export function deleteStory(
  id: string
): boolean {
  const index = storyStore.findIndex(
    (story) => story.id === id
  );

  if (index === -1) {
    return false;
  }

  storyStore.splice(index, 1);

  return true;
}

export function clearStories(): void {
  storyStore.length = 0;
}