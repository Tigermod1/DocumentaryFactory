export interface ImageRequest {
  prompt: string;
  width?: number;
  height?: number;
  output: string;
}

export interface ImageResult {
  success: boolean;
  output: string;
}

export interface ImageProvider {
  generate(
    request: ImageRequest
  ): Promise<ImageResult>;
}