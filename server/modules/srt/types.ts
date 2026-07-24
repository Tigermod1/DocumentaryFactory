export interface SubtitleItem {
    index: number;
    start: number;
    end: number;
    duration: number;
    text: string;
}

export interface SubtitleFile {
    items: SubtitleItem[];
    totalSubtitles: number;
    totalDuration: number;
}

export interface ParseResult {
    success: boolean;
    data?: SubtitleFile;
    error?: string;
}