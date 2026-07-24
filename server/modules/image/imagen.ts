import { GoogleGenAI } from "@google/genai";

import { BaseImageProvider } from "./provider.js";
import type {
  ImageRequest,
  ImageResult,
} from "./types.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const client = new GoogleGenAI({
  apiKey,
});

export class ImagenProvider extends BaseImageProvider {
  async generate(
    request: ImageRequest
  ): Promise<ImageResult> {
    const response = await client.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: request.prompt,
    });

    if (
      !response.generatedImages ||
      response.generatedImages.length === 0
    ) {
      throw new Error("No image generated.");
    }

    const image =
      response.generatedImages[0].image;

    if (!image?.imageBytes) {
      throw new Error("Image data missing.");
    }

    const buffer = Buffer.from(
      image.imageBytes,
      "base64"
    );

    await import("node:fs/promises").then((fs) =>
      fs.writeFile(request.output, buffer)
    );

    return {
      success: true,
      output: request.output,
    };
  }
}

export const imagenProvider =
  new ImagenProvider();