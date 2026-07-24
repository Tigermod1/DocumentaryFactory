import { z } from "zod";

export const ParseSRTSchema = z.object({
    content: z.string().min(1),
});

export type ParseSRTInput = z.infer<typeof ParseSRTSchema>;