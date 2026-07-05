import { useState } from 'react';
import { timelineFormats, type TimelineFormat } from '../types';

interface TimelineEditorProps {
  onCreateTimeline: (input: { name?: string; format: TimelineFormat; content: string }) => Promise<void>;
  onCreateEmptyTimeline: (name: string) => Promise<void>;
  onParseTimeline: (input: { format: TimelineFormat; content: string; sourceName?: string }) => Promise<void>;
  draftPreview: { sceneCount: number; wordCount: number; totalDuration: number } | null;
}

export function TimelineEditor({
  onCreateTimeline,
  onCreateEmptyTimeline,
  onParseTimeline,
  draftPreview,
}: TimelineEditorProps) {
  const [format, setFormat] = useState<TimelineFormat>('srt');
  const [name, setName] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [content, setContent] = useState('');
  const [emptyTimelineName, setEmptyTimelineName] = useState('Untitled timeline');
  const [error, setError] = useState<string | null>(null);

  async function loadFile(file: File | null) {
    if (!file) {
      return;
    }

    const text = await file.text();
    setContent(text);
    setSourceName(file.name);
  }

  async function handleParse() {
    try {
      await onParseTimeline({ format, content, sourceName: sourceName || undefined });
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to parse timeline content.');
    }
  }

  async function handleCreate() {
    try {
      await onCreateTimeline({ name: name || undefined, format, content });
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to create timeline.');
    }
  }

  async function handleCreateEmpty() {
    try {
      await onCreateEmptyTimeline(emptyTimelineName.trim() || 'Untitled timeline');
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to create empty timeline.');
    }
  }

  return (
    <section className="timeline-editor panel">
      <div className="editor-header">
        <div>
          <h3>Timeline Editor</h3>
          <p className="muted">Paste SRT or TXT script content, or load a local file.</p>
        </div>
        <div className="editor-actions">
          <button type="button" onClick={handleParse}>Parse preview</button>
          <button type="button" onClick={handleCreate}>Create timeline</button>
        </div>
      </div>

      <div className="editor-grid">
        <label>
          Format
          <select value={format} onChange={(event) => setFormat(event.target.value as TimelineFormat)}>
            {timelineFormats.map((item) => (
              <option key={item} value={item}>{item.toUpperCase()}</option>
            ))}
          </select>
        </label>
        <label>
          Timeline name
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Optional" />
        </label>
        <label>
          Source file
          <input type="file" accept=".srt,.txt,text/plain" onChange={(event) => void loadFile(event.target.files?.[0] ?? null)} />
        </label>
        <label>
          Source label
          <input value={sourceName} onChange={(event) => setSourceName(event.target.value)} placeholder="Optional" />
        </label>
      </div>

      <label>
        Script content
        <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={10} />
      </label>

      <div className="editor-footer">
        <label>
          Empty timeline name
          <input value={emptyTimelineName} onChange={(event) => setEmptyTimelineName(event.target.value)} />
        </label>
        <button type="button" onClick={handleCreateEmpty}>Create empty timeline</button>
      </div>

      {draftPreview ? (
        <div className="draft-preview">
          <strong>Preview</strong>
          <span>{draftPreview.sceneCount} scenes</span>
          <span>{draftPreview.wordCount} words</span>
          <span>{Math.round(draftPreview.totalDuration / 1000)}s</span>
        </div>
      ) : null}

      {error ? <p className="form-error">{error}</p> : null}
    </section>
  );
}
