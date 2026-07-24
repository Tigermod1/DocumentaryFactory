import { Request, Response } from "express";
import { ParseSRTSchema } from "./schema.js";
import { srtService } from "./service.js";

export async function parseSRTController(
    req: Request,
    res: Response
) {
    try {
        const result = ParseSRTSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.flatten(),
            });
        }

        const parsed = srtService.parseText(result.data.content);

        return res.json({
            success: true,
            data: parsed,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error:
                err instanceof Error
                    ? err.message
                    : "Unknown error",
        });
    }
}