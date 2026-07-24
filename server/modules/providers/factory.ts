import type {
  AIProvider,
  AIProviderName,
} from "./types.js";

import { geminiProvider } from "./gemini.js";
import { openAIProvider } from "./openai.js";
import { claudeProvider } from "./claude.js";

const providers = new Map<
  AIProviderName,
  AIProvider
>([
  ["gemini", geminiProvider],
  ["openai", openAIProvider],
  ["claude", claudeProvider],
]);

export function getProvider(
  name: AIProviderName
): AIProvider {
  const provider = providers.get(name);

  if (!provider) {
    throw new Error(
      `Unknown AI provider: ${name}`
    );
  }

  return provider;
}

export function getProviders(): AIProvider[] {
  return [...providers.values()];
}