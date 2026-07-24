import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  ProduceRequest,
  ProduceResult,
} from "./types.js";

export async function exportProducePackage(
  request: ProduceRequest
): Promise<ProduceResult> {
  const outputDir = path.resolve(request.output);

  await mkdir(outputDir, {
    recursive: true,
  });

  const metadata = {
    projectId: request.projectId,
    exportedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  const metadataFile = path.join(
    outputDir,
    "metadata.json"
  );

  await writeFile(
    metadataFile,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  return {
    success: true,
    output: outputDir,
    files: [metadataFile],
  };
}