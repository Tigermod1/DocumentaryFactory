import type { SubtitleBlock, TimelineFormat } from './types.js';

const SRT_TIMESTAMP = /^(?<start>\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(?<end>\d{2}:\d{2}:\d{2}[,.]\d{3})/;
const GENERIC_TIMESTAMP = /^(?<start>\d{2}:\d{2}:\d{2}(?:[,.]\d{3})?)\s*[-–>]+\s*(?<end>\d{2}:\d{2}:\d{2}(?:[,.]\d{3})?)\s*[:\-]?\s*/;
const NARRATION_PREFIX = /^(?:narrator|narration|voice over|voice-over|vo)\s*[:\-]\s*/i;
const NARRATION_BRACKETS = /^\[(?:narration|voice over|voice-over|vo)\]\s*/i;

const WORDS_PER_SECOND = 2.4;

export function parseTimestamp(value: string): number {
  const [time, fraction = '0'] = value.replace(',', '.').split('.');
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000 + Number(fraction.padEnd(3, '0').slice(0, 3));
}

export function formatTimestamp(milliseconds: number): string {
  const safe = Math.max(0, Math.round(milliseconds));
  const hours = Math.floor(safe / 3_600_000);
  const minutes = Math.floor((safe % 3_600_000) / 60_000);
  const seconds = Math.floor((safe % 60_000) / 1000);
  const millis = safe % 1000;

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':').concat(',', String(millis).padStart(3, '0'));
}

export function convertTimestamp(value: string): number {
  return parseTimestamp(value);
}

export function detectNarrationBlock(text: string): boolean {
  return NARRATION_PREFIX.test(text) || NARRATION_BRACKETS.test(text);
}

function cleanNarrationText(text: string): string {
  return text
    .replace(NARRATION_PREFIX, '')
    .replace(NARRATION_BRACKETS, '')
    .trim();
}

function splitBlocks(content: string): string[] {
  return content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function estimateDuration(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(4000, Math.round((wordCount / WORDS_PER_SECOND) * 1000));
}

function parseCaptionBlock(block: string, index: number): SubtitleBlock | null {
  const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const timestampLineIndex = lines.findIndex((line) => SRT_TIMESTAMP.test(line) || GENERIC_TIMESTAMP.test(line));

  if (timestampLineIndex === -1) {
    return null;
  }

  const timestampLine = lines[timestampLineIndex];
  const match = timestampLine.match(SRT_TIMESTAMP) ?? timestampLine.match(GENERIC_TIMESTAMP);

  if (!match?.groups) {
    return null;
  }

  const text = lines
    .slice(timestampLineIndex + 1)
    .join(' ')
    .trim();

  return {
    id: `block-${index}`,
    startTime: convertTimestamp(match.groups.start),
    endTime: convertTimestamp(match.groups.end),
    text: cleanNarrationText(text),
    narration: detectNarrationBlock(text),
  };
}

export function parseSrt(content: string): SubtitleBlock[] {
  const blocks = splitBlocks(content);

  return blocks
    .map((block, index) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);

      if (lines.length === 0) {
        return null;
      }

      const timestampLineIndex = lines.findIndex((line) => SRT_TIMESTAMP.test(line));
      const timestampLine = timestampLineIndex >= 0 ? lines[timestampLineIndex] : lines[0];
      const match = timestampLine.match(SRT_TIMESTAMP) ?? timestampLine.match(GENERIC_TIMESTAMP);

      if (!match?.groups) {
        return null;
      }

      const textLines = timestampLineIndex >= 0 ? lines.slice(timestampLineIndex + 1) : lines.slice(1);
      const text = textLines.join(' ').trim();

      return {
        id: `srt-${index}`,
        startTime: convertTimestamp(match.groups.start),
        endTime: convertTimestamp(match.groups.end),
        text: cleanNarrationText(text),
        narration: detectNarrationBlock(text),
      };
    })
    .filter((block): block is SubtitleBlock => block !== null)
    .sort((a, b) => a.startTime - b.startTime);
}

export function parseTxt(content: string): SubtitleBlock[] {
  const blocks = splitBlocks(content);
  const subtitles: SubtitleBlock[] = [];
  let cursor = 0;

  blocks.forEach((block, index) => {
    const normalized = block.replace(/\r\n/g, '\n').trim();
    const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean);
    const leadingLine = lines[0] ?? '';
    const match = leadingLine.match(GENERIC_TIMESTAMP);

    if (match?.groups) {
      const text = lines.slice(1).join(' ').trim();
      const startTime = convertTimestamp(match.groups.start);
      const endTime = convertTimestamp(match.groups.end);
      cursor = Math.max(cursor, endTime);
      subtitles.push({
        id: `txt-${index}`,
        startTime,
        endTime,
        text: cleanNarrationText(text),
        narration: detectNarrationBlock(text),
      });
      return;
    }

    const text = normalized.replace(NARRATION_PREFIX, '').replace(NARRATION_BRACKETS, '').trim();
    const duration = estimateDuration(text);
    const startTime = cursor;
    const endTime = startTime + duration;
    cursor = endTime;

    subtitles.push({
      id: `txt-${index}`,
      startTime,
      endTime,
      text,
      narration: detectNarrationBlock(block),
    });
  });

  return subtitles;
}

export function parseSubtitleContent(format: TimelineFormat, content: string): SubtitleBlock[] {
  return format === 'srt' ? parseSrt(content) : parseTxt(content);
}
