import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100),

  script: z.string().optional(),

  subtitle: z.string().optional(),

  audio: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;