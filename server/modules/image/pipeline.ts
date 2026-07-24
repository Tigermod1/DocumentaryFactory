import { imageService } from "./service.js";

import type {
  ImageRequest,
  ImageResult,
} from "./types.js";

export async function runImagePipeline(
  request: ImageRequest
): Promise<ImageResult> {
  return imageService.generate(request);
}