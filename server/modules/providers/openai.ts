import { BaseAIProvider } from "./provider.js";
import type {
  AIRequest,
  AIResponse,
} from "./types.js";

export class OpenAIProvider extends BaseAIProvider {
  readonly name = "openai" as const;

  async generate(
    request: AIRequest
  ): Promise<AIResponse> {
    const prompt = request.messages
      .map((m) => `[${m.role}]\n${m.content}`)
      .join("\n\n");

    // TODO:
    // Tích hợp OpenAI Responses API.
    // Hiện tại dùng mock để pipeline hoạt động.

    return this.buildResponse(
      request.model,
      [
        "OpenAI Provider (Mock)",
        "",
        prompt,
      ].join("\n")
    );
  }
}

export const openAIProvider =
  new OpenAIProvider();