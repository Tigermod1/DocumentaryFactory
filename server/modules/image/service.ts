import { imagenProvider } from "./imagen.js";

import type {
  ImageRequest,
  ImageResult,
} from "./types.js";

export class ImageService {
  async generate(
    request: ImageRequest
  ): Promise<ImageResult> {
    return imagenProvider.generate(request);
  }
}

export const imageService =
  new ImageService();