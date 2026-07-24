import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import type {
  ProjectMetadata,
  ProjectSummary,
} from "./types.js";

function generateId(): string {
  return Date.now().toString();
}

export function createProject(
  name: string,
  script?: string,
  subtitle?: string,
  audio?: string
): ProjectSummary {

  const id = generateId();

  const projectDir = join(process.cwd(), "projects", id);

  if (!existsSync(projectDir)) {
    mkdirSync(projectDir, { recursive: true });
  }

  const metadata: ProjectMetadata = {
    id,
    name,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    script,
    subtitle,
    audio,

    status: "imported",
  };

  writeFileSync(
    join(projectDir, "project.json"),
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  return {
    id,
    name,

    hasScript: !!script,
    hasSubtitle: !!subtitle,
    hasAudio: !!audio,

    scriptLines: 0,
    subtitleCount: 0,

    duration: 0,
  };
}