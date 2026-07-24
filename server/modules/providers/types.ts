export type AIProviderName =
  | "gemini"
  | "openai"
  | "claude";

export interface AIMessage {
  role: "system" | "user" | "assistant";

  content: string;
}

export interface AIRequest {
  model: string;

  messages: AIMessage[];

  temperature?: number;

  maxTokens?: number;
}

export interface AIResponse {
  provider: AIProviderName;

  model: string;

  content: string;

  usage?: {
    promptTokens: number;

    completionTokens: number;

    totalTokens: number;
  };
}

export interface AIProvider {
  readonly name: AIProviderName;

  generate(
    request: AIRequest
  ): Promise<AIResponse>;
}