import { z } from "zod";

export const createCharacterSchema = z.object({
  name: z.string().trim().min(1).max(100),

  description: z.string().optional(),

  tags: z.array(z.string()).default([]),

  images: z.array(z.string()).default([]),

  referenceImage: z.string().optional(),
});

export const createEnvironmentSchema = z.object({
  name: z.string().trim().min(1).max(100),

  description: z.string().optional(),

  tags: z.array(z.string()).default([]),

  images: z.array(z.string()).default([]),

  referenceImage: z.string().optional(),
});

export const deleteAssetSchema = z.object({
  id: z.string().min(1),
});

export type CreateCharacterInput = z.infer<
  typeof createCharacterSchema
>;

export type CreateEnvironmentInput = z.infer<
  typeof createEnvironmentSchema
>;

export type DeleteAssetInput = z.infer<
  typeof deleteAssetSchema
>;