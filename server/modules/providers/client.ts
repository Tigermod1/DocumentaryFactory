import { getProvider } from "./factory.js";

import type {
  AIProviderName,
  AIRequest,
  AIResponse,
} from "./types.js";

export interface AIClientOptions {
  retries?: number;
  timeout?: number;
}

export class AIClient {
  constructor(
    private readonly provider: AIProviderName,
    private readonly options: AIClientOptions = {}
  ) {}

  async generate(
    request: AIRequest
  ): Promise<AIResponse> {
    const retries = this.options.retries ?? 2;

    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const provider = getProvider(this.provider);

        const started = Date.now();

        const response = await Promise.race([
          provider.generate(request),
          this.timeout(),
        ]);

        console.log(
          `[AI] ${this.provider} ${Date.now() - started}ms`
        );

        return response;
      } catch (error) {
        lastError = error;

        console.warn(
          `[AI] ${this.provider} attempt ${attempt + 1} failed`
        );

        if (attempt < retries) {
          await this.delay(1000);
        }
      }
    }

    throw lastError;
  }

  private async timeout(): Promise<never> {
    const ms = this.options.timeout ?? 120000;

    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            "AI request timeout."
          )
        );
      }, ms);
    });
  }

  private async delay(
    ms: number
  ): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }
}

export function createAIClient(
  provider: AIProviderName,
  options?: AIClientOptions
): AIClient {
  return new AIClient(
    provider,
    options
  );
}

export const ai = {
  using(
    provider: AIProviderName,
    options?: AIClientOptions
  ) {
    return createAIClient(
      provider,
      options
    );
  },
};