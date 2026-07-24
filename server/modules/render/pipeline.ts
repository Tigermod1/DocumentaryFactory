import type { RenderProject } from "./types.js";

import { renderService } from "./service.js";

export async function runRenderPipeline(
  project: RenderProject
) {
  return renderService.render(project);
}