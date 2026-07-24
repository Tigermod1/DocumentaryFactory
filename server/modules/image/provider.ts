import type {
  ImageProvider,
  ImageRequest,
  ImageResult,
} from "./types.js";

export abstract class BaseImageProvider
  implements ImageProvider
{
  abstract generate(
    request: ImageRequest
  ): Promise<ImageResult>;
}