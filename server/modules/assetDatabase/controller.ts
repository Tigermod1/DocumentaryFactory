import { Request, Response } from "express";
import { buildAssetDatabase } from "./service.js";

export function scanAssetsController(
    _req: Request,
    res: Response
) {

    try {

        return res.json(
            buildAssetDatabase()
        );

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Asset scan failed"
        });

    }

}