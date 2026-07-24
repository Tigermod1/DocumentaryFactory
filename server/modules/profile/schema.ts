import { z } from "zod";

export const profileSchema = z.object({
  general: z.object({
    id: z.string(),

    name: z.string().min(1),

    description: z.string(),

    version: z.string(),

    author: z.string(),

    createdAt: z.string(),

    updatedAt: z.string(),
  }),

  workspace: z.object({
    language: z.enum([
      "vi",
      "en",
    ]),

    theme: z.enum([
      "light",
      "dark",
      "system",
    ]),

    autosave: z.boolean(),

    backup: z.boolean(),
  }),

  market: z.object({
    market: z.enum([
      "us",
      "uk",
      "ca",
      "au",
      "jp",
      "kr",
      "de",
      "fr",
      "es",
      "it",
      "br",
      "vn",
    ]),

    language: z.string(),

    region: z.string(),

    platform: z.enum([
      "youtube",
      "shorts",
      "tiktok",
      "instagram",
    ]),
  }),

  audience: z.object({
    type: z.enum([
      "kids",
      "teen",
      "young_adults",
      "adults",
      "seniors",
    ]),

    ageRange: z.string(),

    interests: z.array(z.string()),
  }),

  content: z.object({
    category: z.enum([
      "history",
      "psychology",
      "philosophy",
      "science",
      "technology",
      "finance",
      "business",
      "education",
      "health",
      "custom",
    ]),

    topic: z.string(),

    narrativeStyle: z.string(),
  }),

  ai: z.object({
    provider: z.enum([
      "openai",
      "anthropic",
      "google",
    ]),

    model: z.string(),

    temperature: z.number(),

    creativity: z.number(),
  }),

  image: z.object({
    provider: z.enum([
      "flow",
      "veo",
      "comfyui",
      "flux",
      "sdxl",
    ]),

    style: z.string(),

    aspectRatio: z.string(),

    consistency: z.boolean(),
  }),

  voice: z.object({
    provider: z.enum([
      "elevenlabs",
      "azure",
      "openai",
    ]),

    voice: z.string(),

    speed: z.number(),

    emotion: z.string(),
  }),

  render: z.object({
    resolution: z.string(),

    fps: z.number(),

    codec: z.string(),

    hardSubtitle: z.boolean(),
  }),
});

export const updateProfileSchema =
  profileSchema.partial();

export type ProfileInput =
  z.infer<typeof profileSchema>;

export type UpdateProfileInput =
  z.infer<
    typeof updateProfileSchema
  >;