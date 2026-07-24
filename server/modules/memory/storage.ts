import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { FactoryMemory } from "./types.js";

function memoryFile(projectId: string) {
  return path.join(
    process.cwd(),
    "projects",
    projectId,
    "memory.json"
  );
}

export async function loadMemory(
  projectId: string
): Promise<FactoryMemory> {
  const file = memoryFile(projectId);

  try {
    const json = await readFile(file, "utf8");

    return JSON.parse(json) as FactoryMemory;
  } catch {
    return {
      version: 1,
      projectId,
      updatedAt: new Date().toISOString(),

      timeline: {
        sceneCount: 0,
        averageSceneDuration: 0,
      },

      brain: {
        provider: "",
        model: "",
        promptCount: 0,
      },

      assets: {
        images: 0,
        videos: 0,
        audio: 0,
      },

      render: {
        completed: false,
        renderCount: 0,
      },

      analytics: {
        exports: 0,
      },
    };
  }
}

export async function saveMemory(
  memory: FactoryMemory
): Promise<void> {
  const file = memoryFile(memory.projectId);

  await mkdir(path.dirname(file), {
    recursive: true,
  });

  memory.updatedAt = new Date().toISOString();

  await writeFile(
    file,
    JSON.stringify(memory, null, 2),
    "utf8"
  );
}