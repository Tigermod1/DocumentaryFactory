import path from "node:path";

import type {
  ProduceRequest,
  ProductionContext,
  ProductionJob,
} from "./types.js";

export function createProductionContext(
  request: ProduceRequest,
  job: ProductionJob
): ProductionContext {
  const workspace = path.resolve("Workspace");

  const projectPath = path.join(
    workspace,
    request.projectId
  );

  return {
    request,

    job,

    workspace,

    projectPath,

    scriptPath: path.join(
      projectPath,
      "01_SCRIPT",
      "script.txt"
    ),

    timelinePath: path.join(
      projectPath,
      "02_TIMELINE",
      "timeline.json"
    ),

    storyboardPath: path.join(
      projectPath,
      "03_STORYBOARD"
    ),

    promptsPath: path.join(
      projectPath,
      "04_PROMPTS"
    ),

    assetsPath: path.join(
      projectPath,
      "05_IMAGES"
    ),

    renderPath: path.join(
      projectPath,
      "09_RENDER"
    ),

    logs: [],

    data: {},
  };
}