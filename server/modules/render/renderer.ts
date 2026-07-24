import type {
  RenderProject,
  RenderResult,
} from "./types.js";

import { renderWithFFmpeg } from "./ffmpeg.js";

export async function renderProject(
  project: RenderProject
): Promise<RenderResult> {
  await renderWithFFmpeg(project);

  const duration =
    project.clips.length === 0
      ? 0
      : Math.max(
          ...project.clips.map(
            (clip) => clip.end
          )
        );

  return {
    success: true,
    output: project.output,
    duration,
  };
}