import "dotenv/config";

import { createAIClient } from "./client.js";

async function main() {
  const ai = createAIClient("gemini");

  const response = await ai.generate({
    model: "gemini-3.5-flash",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content:
          "Reply with exactly this sentence: Documentary Factory AI is working.",
      },
    ],
  });

  console.log("\n==============================");
  console.log("Provider :", response.provider);
  console.log("Model    :", response.model);
  console.log("==============================\n");

  console.log(response.content);

  console.log("\nUsage:");
  console.log(response.usage);
}

main().catch(console.error);