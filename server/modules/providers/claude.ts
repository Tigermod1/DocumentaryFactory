import { BaseAIProvider } from "./provider.js";
import type {
  AIRequest,
  AIResponse,
} from "./types.js";

export class ClaudeProvider extends BaseAIProvider {
  readonly name = "claude" as const;

  async generate(
    request: AIRequest
  ): Promise<AIResponse> {
    const prompt = request.messages
      .map((m) => `[${m.role}]\n${m.content}`)
      .join("\n\n");

    // TODO:
    // Tích hợp Anthropic Claude Messages API.
    // Hiện tại dùng mock để pipeline hoạt động.

    return this.buildResponse(
      request.model,
      [
        "Claude Provider (Mock)",
        "",
        prompt,
      ].join("\n")
    );
  }
}

export const claudeProvider =
  new ClaudeProvider();