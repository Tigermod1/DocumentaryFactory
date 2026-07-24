import { SubtitleFile, SubtitleItem } from "./types.js";

function timeToSeconds(time: string): number {
    const [h, m, s] = time.split(":");
    const [sec, ms] = s.split(",");

    return (
        Number(h) * 3600 +
        Number(m) * 60 +
        Number(sec) +
        Number(ms) / 1000
    );
}

export function parseSRT(content: string): SubtitleFile {
    const blocks = content.trim().split(/\r?\n\r?\n/);

    const items: SubtitleItem[] = [];

    for (const block of blocks) {
        const lines = block.split(/\r?\n/);

        if (lines.length < 3) continue;

        const index = Number(lines[0]);

        const [startText, endText] = lines[1].split(" --> ");

        const start = timeToSeconds(startText);
        const end = timeToSeconds(endText);

        const text = lines
            .slice(2)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

        items.push({
            index,
            start,
            end,
            duration: end - start,
            text,
        });
    }

    const totalDuration =
        items.length > 0
            ? items[items.length - 1].end
            : 0;

    return {
        items,
        totalSubtitles: items.length,
        totalDuration,
    };
}