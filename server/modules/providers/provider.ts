import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types.js";

export abstract class BaseAIProvider
  implements AIProvider
{
  abstract readonly name:
    AIProvider["name"];

  abstract generate(
    request: AIRequest
  ): Promise<AIResponse>;

  protected buildResponse(
    model: string,
    content: string
  ): AIResponse {
    return {
      provider: this.name,
      model,
      content,
    };
  }
}