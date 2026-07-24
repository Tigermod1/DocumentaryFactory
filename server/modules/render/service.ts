import type {
  RenderProject,
  RenderResult,
} from "./types.js";

import { renderProject } from "./renderer.js";

export class RenderService {
  async render(
    project: RenderProject
  ): Promise<RenderResult> {
    return renderProject(project);
  }
}

export const renderService =
  new RenderService();