import { GoogleGenAI } from "@google/genai";

import { BaseAIProvider } from "./provider.js";
import type { AIRequest, AIResponse } from "./types.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const client = new GoogleGenAI({
  apiKey,
});

function normalizeModel(model?: string): string {
  const value = (model ?? "gemini-3.5-flash").trim();

  if (value.startsWith("models/")) {
    return value.substring("models/".length);
  }

  return value;
}

export class GeminiProvider extends BaseAIProvider {
  readonly name = "gemini" as const;

  async generate(
    request: AIRequest
  ): Promise<AIResponse> {
    const model = normalizeModel(request.model);
	
    const prompt = request.messages
      .map((m) => `${m.role.toUpperCase()}\n${m.content}`)
      .join("\n\n");

    const started = Date.now();

    const response = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: request.temperature ?? 0.7,
        maxOutputTokens: request.maxTokens,
      },
    });

    console.log(
      `[Gemini] ${model} ${Date.now() - started}ms`
    );

    return {
      provider: this.name,
      model,
      content: response.text ?? "",
      usage: {
        promptTokens:
          response.usageMetadata?.promptTokenCount ?? 0,
        completionTokens:
          response.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens:
          response.usageMetadata?.totalTokenCount ?? 0,
      },
    };
  }
}

export const geminiProvider = new GeminiProvider();