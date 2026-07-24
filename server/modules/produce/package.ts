import { readdir } from "node:fs/promises";
import path from "node:path";

export interface ProducePackage {
  projectId: string;
  root: string;
  files: string[];
}

export async function buildProducePackage(
  projectId: string,
  output: string
): Promise<ProducePackage> {
  const root = path.resolve(output);

  const entries = await readdir(root, {
    withFileTypes: true,
  });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  return {
    projectId,
    root,
    files,
  };
}