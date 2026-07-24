import { z } from "zod";

export const createCharacterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Character name is required")
    .max(100),

  description: z.string().optional(),

  gender: z.string().optional(),

  age: z.string().optional(),

  ethnicity: z.string().optional(),

  hair: z.string().optional(),

  eyes: z.string().optional(),

  skin: z.string().optional(),

  clothes: z.string().optional(),

  notes: z.string().optional(),
});

export type CreateCharacterInput = z.infer<
  typeof createCharacterSchema
>;