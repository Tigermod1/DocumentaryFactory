import type { Request, Response } from "express";

import {
  analyzeStoriesSchema,
  updateStorySchema,
} from "./schema.js";

import {
  analyzeStories,
  createStories,
  getStories,
  getStory,
  updateStory,
  deleteStory,
  clearStories,
} from "./service.js";

export function analyzeStoriesController(
  req: Request,
  res: Response
): void {
  const input = analyzeStoriesSchema.parse(req.body);

  const report = analyzeStories(input.stories);

  res.json(report);
}

export function createStoriesController(
  req: Request,
  res: Response
): void {
  const input = analyzeStoriesSchema.parse(req.body);

  const stories = createStories(input.stories);

  res.status(201).json(stories);
}

export function getStoriesController(
  _req: Request,
  res: Response
): void {
  res.json(getStories());
}

export function getStoryController(
  req: Request,
  res: Response
): void {
  const story = getStory(req.params.id);

  if (!story) {
    res.status(404).json({
      message: "Story not found",
    });

    return;
  }

  res.json(story);
}

export function updateStoryController(
  req: Request,
  res: Response
): void {
  const input = updateStorySchema.parse(req.body);

  const story = updateStory(req.params.id, input);

  if (!story) {
    res.status(404).json({
      message: "Story not found",
    });

    return;
  }

  res.json(story);
}

export function deleteStoryController(
  req: Request,
  res: Response
): void {
  const ok = deleteStory(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Story not found",
    });

    return;
  }

  res.status(204).send();
}

export function clearStoriesController(
  _req: Request,
  res: Response
): void {
  clearStories();

  res.status(204).send();
}