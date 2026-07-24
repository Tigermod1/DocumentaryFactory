import "dotenv/config";

import { mkdir } from "node:fs/promises";
import path from "node:path";

import { imageService } from "./service.js";

async function main() {
  const outputDir = path.join(process.cwd(), "output");

  await mkdir(outputDir, {
    recursive: true,
  });

  const output = path.join(
    outputDir,
    "test.png"
  );

  const result = await imageService.generate({
    prompt: `
A cinematic documentary frame of an ancient lost civilization,
golden sunrise,
ultra realistic,
8k,
National Geographic,
highly detailed.
`,
    output,
  });

  console.log("\n==============================");
  console.log(result);
  console.log("==============================");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});