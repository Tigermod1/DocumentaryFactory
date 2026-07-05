import type { Scene, Timeline, TimelineDraft, TimelineFormat } from './types';

const apiBaseUrl = 'http://127.0.0.1:3001/api/timelines';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function listTimelines(): Promise<Timeline[]> {
  return request<Timeline[]>('');
}

export function getTimeline(timelineId: string): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}`);
}

export function createTimelineFromContent(input: {
  name?: string;
  format: TimelineFormat;
  content: string;
  metadata?: Record<string, unknown>;
}): Promise<Timeline> {
  return request<Timeline>('', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function createEmptyTimeline(input: {
  name: string;
  metadata?: Record<string, unknown>;
}): Promise<Timeline> {
  return request<Timeline>('/empty', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function parseTimeline(input: {
  format: TimelineFormat;
  content: string;
  sourceName?: string;
}): Promise<TimelineDraft> {
  return request<TimelineDraft>('/parse', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateTimeline(timelineId: string, input: {
  name?: string;
  metadata?: Record<string, unknown>;
}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteTimeline(timelineId: string): Promise<void> {
  return request<void>(`/${timelineId}`, { method: 'DELETE' });
}

export function insertScene(timelineId: string, input: {
  afterSceneId?: string | null;
  beforeSceneId?: string | null;
  scene: {
    startTime: number;
    endTime: number;
    narration: string;
    summary?: string;
    emotion?: Scene['emotion'];
    importance?: number;
    keywords?: string[];
    metadata?: Record<string, unknown>;
  };
}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function reorderScene(timelineId: string, input: {
  sceneId: string;
  targetIndex: number;
}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes/reorder`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateScene(timelineId: string, sceneId: string, input: {
  startTime?: number;
  endTime?: number;
  narration?: string;
  summary?: string;
  emotion?: Scene['emotion'];
  importance?: number;
  keywords?: string[];
  metadata?: Record<string, unknown>;
}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes/${sceneId}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function mergeScene(timelineId: string, sceneId: string, input: {
  withSceneId?: string;
} = {}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes/${sceneId}/merge`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function splitScene(timelineId: string, sceneId: string, input: {
  splitWordIndex?: number;
} = {}): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes/${sceneId}/split`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function deleteScene(timelineId: string, sceneId: string): Promise<Timeline> {
  return request<Timeline>(`/${timelineId}/scenes/${sceneId}`, { method: 'DELETE' });
}
