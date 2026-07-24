import { spawn } from "node:child_process";

import type { RenderProject } from "./types.js";

export async function renderWithFFmpeg(
  _project: RenderProject
): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(
      "ffmpeg",
      ["-version"],
      {
        stdio: "ignore",
      }
    );

    process.on("error", reject);

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            "FFmpeg is not installed or not found in PATH."
          )
        );
      }
    });
  });
}