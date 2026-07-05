import type { SceneDto, SceneEmotion, SubtitleBlock } from './types.js';

const STOP_WORDS = new Set([
  'a',
  'about',
  'after',
  'again',
  'all',
  'and',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'could',
  'did',
  'do',
  'for',
  'from',
  'had',
  'has',
  'have',
  'he',
  'her',
  'his',
  'how',
  'i',
  'in',
  'is',
  'it',
  'its',
  'just',
  'like',
  'may',
  'more',
  'not',
  'of',
  'on',
  'or',
  'our',
  'out',
  'she',
  'so',
  'that',
  'the',
  'their',
  'them',
  'there',
  'these',
  'they',
  'this',
  'to',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'who',
  'with',
  'you',
  'your',
]);

const EMOTION_KEYWORDS: Array<{ emotion: SceneEmotion; terms: string[] }> = [
  { emotion: 'urgent', terms: ['urgent', 'warning', 'crisis', 'alarm', 'immediately', 'critical'] },
  { emotion: 'tense', terms: ['conflict', 'fear', 'threat', 'pressure', 'battle', 'risk'] },
  { emotion: 'hopeful', terms: ['hope', 'future', 'possibility', 'chance', 'rebuild', 'promise'] },
  { emotion: 'somber', terms: ['loss', 'death', 'grief', 'mourning', 'tragedy', 'silence'] },
  { emotion: 'calm', terms: ['quiet', 'gentle', 'steady', 'soft', 'peaceful', 'still'] },
  { emotion: 'reflective', terms: ['remember', 'reflect', 'consider', 'look back', 'think', 'meaning'] },
];

const HARD_BREAK_GAP_MS = 2_750;
const MAX_SCENE_DURATION_MS = 28_000;
const MAX_SCENE_WORDS = 72;
const SPLIT_WORDS = 48;

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function countWords(text: string): number {
  return words(text).length;
}

function summarize(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);

  if (sentences.length > 0) {
    return sentences[0].slice(0, 160);
  }

  return text.split(/\s+/).slice(0, 20).join(' ');
}

function detectEmotion(text: string): SceneEmotion {
  const normalized = text.toLowerCase();

  for (const group of EMOTION_KEYWORDS) {
    if (group.terms.some((term) => normalized.includes(term))) {
      return group.emotion;
    }
  }

  if (/[!?]{2,}/.test(text) || /\bmust\b|\bnow\b|\bnever\b/.test(normalized)) {
    return 'urgent';
  }

  return text.includes('?') ? 'reflective' : 'neutral';
}

function scoreImportance(text: string, narration: boolean): number {
  const wordCount = countWords(text);
  const upperBoost = /[A-Z]{4,}/.test(text) ? 1 : 0;
  const emphaticBoost = /[!?]/.test(text) ? 1 : 0;
  const narrativeBoost = narration ? 1 : 0;
  const base = wordCount >= 40 ? 4 : wordCount >= 18 ? 3 : wordCount >= 8 ? 2 : 1;
  return Math.min(5, base + upperBoost + emphaticBoost + narrativeBoost);
}

function extractKeywords(text: string): string[] {
  const frequencies = new Map<string, number>();

  for (const word of words(text)) {
    if (word.length < 4 || STOP_WORDS.has(word)) {
      continue;
    }

    frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
  }

  return [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([word]) => word);
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function splitLongNarration(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).map(cleanText).filter(Boolean);

  if (sentences.length <= 1) {
    return [text];
  }

  const segments: string[] = [];
  let current = '';
  let currentWords = 0;

  for (const sentence of sentences) {
    const sentenceWords = countWords(sentence);
    if (current && (currentWords + sentenceWords > SPLIT_WORDS || currentWords >= SPLIT_WORDS)) {
      segments.push(current.trim());
      current = sentence;
      currentWords = sentenceWords;
      continue;
    }

    current = current ? `${current} ${sentence}` : sentence;
    currentWords += sentenceWords;
  }

  if (current.trim()) {
    segments.push(current.trim());
  }

  return segments.length > 0 ? segments : [text];
}

function makeScene(
  startTime: number,
  endTime: number,
  text: string,
  narration: boolean,
): Omit<SceneDto, 'id' | 'sceneNumber' | 'orderIndex' | 'createdAt' | 'updatedAt'> {
  const narrationText = cleanText(text);
  const duration = Math.max(0, endTime - startTime);
  return {
    startTime,
    endTime,
    duration,
    narration: narrationText,
    summary: summarize(narrationText),
    emotion: detectEmotion(narrationText),
    importance: scoreImportance(narrationText, narration),
    keywords: extractKeywords(narrationText),
    metadata: {
      narration,
      excerptLength: narrationText.length,
    },
    wordCount: countWords(narrationText),
  };
}

function sceneBoundary(prev: SubtitleBlock, next: SubtitleBlock, bufferText: string, bufferStart: number, bufferEnd: number): boolean {
  const gap = next.startTime - prev.endTime;
  if (gap > HARD_BREAK_GAP_MS) {
    return true;
  }

  const combined = countWords(bufferText);
  if (bufferEnd - bufferStart > MAX_SCENE_DURATION_MS && combined >= 16) {
    return true;
  }

  if (combined >= MAX_SCENE_WORDS) {
    return true;
  }

  return prev.narration !== next.narration && combined >= 8;
}

function appendBlockToSceneText(text: string, block: SubtitleBlock): string {
  return text ? `${text} ${block.text}` : block.text;
}

function pushScene(
  scenes: Array<Omit<SceneDto, 'id' | 'sceneNumber' | 'orderIndex' | 'createdAt' | 'updatedAt'>>,
  startTime: number,
  endTime: number,
  text: string,
  narration: boolean,
): void {
  const value = cleanText(text);
  if (!value) {
    return;
  }

  if (narration && countWords(value) > SPLIT_WORDS) {
    let cursor = startTime;
    const splitSegments = splitLongNarration(value);
    const totalWords = Math.max(1, countWords(value));

    splitSegments.forEach((segment) => {
      const segmentWords = Math.max(1, countWords(segment));
      const segmentDuration = Math.max(4_000, Math.round((segmentWords / totalWords) * (endTime - startTime)));
      const segmentEnd = cursor + segmentDuration;
      scenes.push(makeScene(cursor, segmentEnd, segment, narration));
      cursor = segmentEnd;
    });
    return;
  }

  scenes.push(makeScene(startTime, endTime, value, narration));
}

export function buildScenes(subtitles: SubtitleBlock[]): Array<Omit<SceneDto, 'id' | 'sceneNumber' | 'orderIndex' | 'createdAt' | 'updatedAt'>> {
  const sorted = [...subtitles].sort((a, b) => a.startTime - b.startTime);
  const scenes: Array<Omit<SceneDto, 'id' | 'sceneNumber' | 'orderIndex' | 'createdAt' | 'updatedAt'>> = [];

  let buffer = '';
  let bufferStart = 0;
  let bufferEnd = 0;
  let previous: SubtitleBlock | null = null;

  for (const block of sorted) {
    if (!previous) {
      buffer = block.text;
      bufferStart = block.startTime;
      bufferEnd = block.endTime;
      previous = block;
      continue;
    }

    const shouldSplit = sceneBoundary(previous, block, appendBlockToSceneText(buffer, block), bufferStart, block.endTime);

    if (shouldSplit) {
      pushScene(scenes, bufferStart, bufferEnd, buffer, previous.narration);
      buffer = block.text;
      bufferStart = block.startTime;
      bufferEnd = block.endTime;
      previous = block;
      continue;
    }

    buffer = appendBlockToSceneText(buffer, block);
    bufferEnd = Math.max(bufferEnd, block.endTime);
    previous = block;
  }

  if (buffer.trim()) {
    pushScene(scenes, bufferStart, bufferEnd, buffer, previous?.narration ?? false);
  }

  return scenes.map((scene, index) => ({
    ...scene,
    keywords: [...new Set(scene.keywords)],
    importance: Math.min(5, Math.max(1, scene.importance)),
  }));
}

export function sceneTextToSegments(text: string, splitWordIndex: number): [string, string] {
  const allWords = text.split(/\s+/).filter(Boolean);
  const pivot = Math.min(Math.max(splitWordIndex, 1), allWords.length - 1);
  const left = allWords.slice(0, pivot).join(' ');
  const right = allWords.slice(pivot).join(' ');
  return [left, right];
}
