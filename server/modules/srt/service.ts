import fs from "fs/promises";
import { parseSRT } from "./parser.js";
import { SubtitleFile } from "./types.js";

export class SRTService {
    async parseFile(filePath: string): Promise<SubtitleFile> {
        const content = await fs.readFile(filePath, "utf8");
        return parseSRT(content);
    }

    parseText(content: string): SubtitleFile {
        return parseSRT(content);
    }
}

export const srtService = new SRTService();