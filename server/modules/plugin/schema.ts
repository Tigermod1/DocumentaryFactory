import { z } from "zod";

export const loadPluginSchema = z.object({
  path: z.string().min(1),
});

export const pluginIdSchema = z.object({
  id: z.string().min(1),
});

export const pluginCategorySchema = z.object({
  category: z.enum([
    "image",
    "video",
    "audio",
    "render",
    "export",
  ]),
});

export type LoadPluginInput =
  z.infer<typeof loadPluginSchema>;

export type PluginIdInput =
  z.infer<typeof pluginIdSchema>;

export type PluginCategoryInput =
  z.infer<typeof pluginCategorySchema>;