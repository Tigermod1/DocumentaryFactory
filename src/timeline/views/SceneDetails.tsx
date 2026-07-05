import { useEffect, useMemo, useState } from 'react';
import type { Scene, SceneEmotion } from '../types';

interface SceneDetailsProps {
  scene: Scene | null;
  onSave: (sceneId: string, input: {
    startTime?: number;
    endTime?: number;
    narration?: string;
    summary?: string;
    emotion?: SceneEmotion;
    importance?: number;
    keywords?: string[];
    metadata?: Record<string, unknown>;
  }) => Promise<void>;
}

export function SceneDetails({ scene, onSave }: SceneDetailsProps) {
  const [narration, setNarration] = useState('');
  const [summary, setSummary] = useState('');
  const [emotion, setEmotion] = useState<SceneEmotion>('neutral');
  const [importance, setImportance] = useState(3);
  const [keywords, setKeywords] = useState('');
  const [metadata, setMetadata] = useState('{}');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNarration(scene?.narration ?? '');
    setSummary(scene?.summary ?? '');
    setEmotion(scene?.emotion ?? 'neutral');
    setImportance(scene?.importance ?? 3);
    setKeywords(scene?.keywords.join(', ') ?? '');
    setMetadata(JSON.stringify(scene?.metadata ?? {}, null, 2));
    setError(null);
  }, [scene]);

  const parsedKeywords = useMemo(
    () => keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean),
    [keywords],
  );

  if (!scene) {
    return (
      <section className="scene-details panel">
        <h3>Scene Details</h3>
        <p className="muted">Select a scene to edit it.</p>
      </section>
    );
  }

  const currentScene = scene;

  async function handleSave() {
    try {
      const parsedMetadata = JSON.parse(metadata) as unknown;

      if (typeof parsedMetadata !== 'object' || parsedMetadata === null || Array.isArray(parsedMetadata)) {
        throw new Error('Metadata must be a JSON object.');
      }

      await onSave(currentScene.id, {
        narration,
        summary,
        emotion,
        importance,
        keywords: parsedKeywords,
        metadata: parsedMetadata as Record<string, unknown>,
      });
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to save scene.');
    }
  }

  return (
    <section className="scene-details panel">
      <h3>Scene Details</h3>
      <div className="scene-headline">
        <strong>Scene {currentScene.sceneNumber}</strong>
        <span>{currentScene.duration.toFixed(1)}s - {currentScene.wordCount} words</span>
      </div>
      <label>
        Narration
        <textarea value={narration} onChange={(event) => setNarration(event.target.value)} rows={6} />
      </label>
      <label>
        Summary
        <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} />
      </label>
      <label>
        Emotion
        <select value={emotion} onChange={(event) => setEmotion(event.target.value as SceneEmotion)}>
          <option value="neutral">neutral</option>
          <option value="reflective">reflective</option>
          <option value="calm">calm</option>
          <option value="urgent">urgent</option>
          <option value="hopeful">hopeful</option>
          <option value="tense">tense</option>
          <option value="somber">somber</option>
        </select>
      </label>
      <label>
        Importance
        <input
          type="number"
          min={1}
          max={5}
          value={importance}
          onChange={(event) => setImportance(Number(event.target.value))}
        />
      </label>
      <label>
        Keywords
        <input value={keywords} onChange={(event) => setKeywords(event.target.value)} />
      </label>
      <label>
        Metadata
        <textarea value={metadata} onChange={(event) => setMetadata(event.target.value)} rows={4} />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="button" onClick={handleSave}>Save scene</button>
    </section>
  );
}
