import { useEffect, useMemo, useState } from 'react';
import {
  createEmptyTimeline,
  createTimelineFromContent,
  deleteScene,
  deleteTimeline,
  getTimeline,
  insertScene,
  listTimelines,
  mergeScene,
  parseTimeline,
  reorderScene,
  splitScene,
  updateScene,
} from './api';
import { SceneDetails } from './views/SceneDetails';
import { TimelineEditor } from './views/TimelineEditor';
import { TimelineList } from './views/TimelineList';
import { TimelineStatistics } from './views/TimelineStatistics';
import type { Scene, Timeline, TimelineDraft, TimelineFormat } from './types';

export function TimelineWorkspace() {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [selectedTimelineId, setSelectedTimelineId] = useState<string | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | null>(null);
  const [draftPreview, setDraftPreview] = useState<TimelineDraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedScene = useMemo(
    () => selectedTimeline?.scenes.find((scene) => scene.id === selectedSceneId) ?? null,
    [selectedSceneId, selectedTimeline],
  );

  async function refreshTimelines(nextSelectedId?: string | null) {
    setIsLoading(true);
    try {
      const nextTimelines = await listTimelines();
      setTimelines(nextTimelines);

      const timelineId = nextSelectedId !== undefined
        ? nextSelectedId
        : selectedTimelineId ?? nextTimelines[0]?.id ?? null;
      setSelectedTimelineId(timelineId);

      if (timelineId) {
        const nextTimeline = await getTimeline(timelineId);
        setSelectedTimeline(nextTimeline);
        setSelectedSceneId(nextTimeline.scenes[0]?.id ?? null);
      } else {
        setSelectedTimeline(null);
        setSelectedSceneId(null);
      }
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to load timelines.');
    } finally {
      setIsLoading(false);
    }
  }

  async function runTimelineAction(action: () => Promise<void>) {
    try {
      await action();
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Timeline action failed.');
    }
  }

  useEffect(() => {
    void refreshTimelines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedTimelineId) {
      return;
    }

    void (async () => {
      try {
        const timeline = await getTimeline(selectedTimelineId);
        setSelectedTimeline(timeline);
        if (!timeline.scenes.some((scene) => scene.id === selectedSceneId)) {
          setSelectedSceneId(timeline.scenes[0]?.id ?? null);
        }
      } catch {
        setSelectedTimeline(null);
      }
    })();
  }, [selectedSceneId, selectedTimelineId]);

  async function syncTimeline(nextTimeline: Timeline) {
    setSelectedTimeline(nextTimeline);
    setSelectedTimelineId(nextTimeline.id);
    setSelectedSceneId(nextTimeline.scenes[0]?.id ?? null);
    setTimelines((current) => current.map((timeline) => (timeline.id === nextTimeline.id ? nextTimeline : timeline)));
  }

  async function handleCreateTimeline(input: { name?: string; format: TimelineFormat; content: string }) {
    await runTimelineAction(async () => {
      const nextTimeline = await createTimelineFromContent(input);
      await refreshTimelines(nextTimeline.id);
    });
  }

  async function handleCreateEmptyTimeline(name: string) {
    await runTimelineAction(async () => {
      const nextTimeline = await createEmptyTimeline({ name });
      await refreshTimelines(nextTimeline.id);
    });
  }

  async function handleParseTimeline(input: { format: TimelineFormat; content: string; sourceName?: string }) {
    const draft = await parseTimeline(input);
    setDraftPreview(draft);
  }

  async function handleDeleteTimeline(timelineId: string) {
    await runTimelineAction(async () => {
      await deleteTimeline(timelineId);
      await refreshTimelines(null);
    });
  }

  async function handleUpdateScene(sceneId: string, input: Parameters<typeof updateScene>[2]) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await updateScene(selectedTimeline.id, sceneId, input);
      await syncTimeline(nextTimeline);
    });
  }

  async function handleInsertScene(input: Parameters<typeof insertScene>[1]) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await insertScene(selectedTimeline.id, input);
      await syncTimeline(nextTimeline);
    });
  }

  async function handleMoveScene(sceneId: string, targetIndex: number) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await reorderScene(selectedTimeline.id, { sceneId, targetIndex });
      await syncTimeline(nextTimeline);
    });
  }

  async function handleMergeScene(sceneId: string, withSceneId?: string) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await mergeScene(selectedTimeline.id, sceneId, withSceneId ? { withSceneId } : {});
      await syncTimeline(nextTimeline);
    });
  }

  async function handleSplitScene(sceneId: string) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await splitScene(selectedTimeline.id, sceneId, {});
      await syncTimeline(nextTimeline);
    });
  }

  async function handleDeleteScene(sceneId: string) {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const nextTimeline = await deleteScene(selectedTimeline.id, sceneId);
      await syncTimeline(nextTimeline);
    });
  }

  async function handleAddManualScene() {
    if (!selectedTimeline) {
      return;
    }

    await runTimelineAction(async () => {
      const lastScene = selectedTimeline.scenes[selectedTimeline.scenes.length - 1];
      const startTime = lastScene?.endTime ?? 0;
      const nextTimeline = await insertScene(selectedTimeline.id, {
        afterSceneId: lastScene?.id ?? null,
        scene: {
          startTime,
          endTime: startTime + 10_000,
          narration: 'New scene narration',
          summary: 'New scene narration',
          emotion: 'neutral',
          importance: 3,
          keywords: [],
          metadata: {},
        },
      });
      await syncTimeline(nextTimeline);
    });
  }

  const statisticsTimeline = selectedTimeline ?? timelines[0] ?? null;

  return (
    <main className="timeline-shell">
      <header className="top-bar timeline-top-bar">
        <div>
          <h1>Timeline Engine</h1>
          <p>Convert subtitles into structured documentary scenes with ordering and scene operations.</p>
        </div>
        <div className="timeline-top-actions">
          <button type="button" onClick={() => void handleAddManualScene()} disabled={!selectedTimeline}>Insert scene</button>
          <button type="button" onClick={() => void refreshTimelines(selectedTimelineId)}>Refresh</button>
        </div>
      </header>

      <TimelineEditor
        onCreateTimeline={handleCreateTimeline}
        onCreateEmptyTimeline={handleCreateEmptyTimeline}
        onParseTimeline={handleParseTimeline}
        draftPreview={draftPreview}
      />

      <section className="timeline-workspace">
        <TimelineList
          timeline={selectedTimeline}
          timelines={timelines}
          selectedTimelineId={selectedTimelineId}
          selectedSceneId={selectedSceneId}
          onSelectTimeline={(timelineId) => {
            setSelectedSceneId(null);
            void refreshTimelines(timelineId);
          }}
          onSelectScene={(sceneId) => setSelectedSceneId(sceneId)}
          onDeleteScene={(sceneId) => handleDeleteScene(sceneId)}
          onMoveScene={(sceneId, targetIndex) => handleMoveScene(sceneId, targetIndex)}
          onMergeScene={(sceneId, withSceneId) => handleMergeScene(sceneId, withSceneId)}
          onSplitScene={(sceneId) => handleSplitScene(sceneId)}
        />

        <div className="timeline-center">
          {isLoading ? <div className="empty-state"><strong>Loading timelines</strong></div> : null}
          {error ? <p className="form-error">{error}</p> : null}
          <section className="panel timeline-summary">
            <h3>Timeline Editor</h3>
            {selectedTimeline ? (
              <>
                <div className="summary-grid">
                  <div>
                    <span>Name</span>
                    <strong>{selectedTimeline.name}</strong>
                  </div>
                  <div>
                    <span>Scenes</span>
                    <strong>{selectedTimeline.sceneCount}</strong>
                  </div>
                  <div>
                    <span>Words</span>
                    <strong>{selectedTimeline.wordCount}</strong>
                  </div>
                  <div>
                    <span>Duration</span>
                    <strong>{Math.round(selectedTimeline.totalDuration / 1000)}s</strong>
                  </div>
                </div>
                <div className="summary-actions">
                  <button type="button" onClick={() => void handleAddManualScene()}>Add scene</button>
                  <button type="button" onClick={() => void handleDeleteTimeline(selectedTimeline.id)} className="danger">Delete timeline</button>
                </div>
              </>
            ) : (
              <p className="muted">Create or select a timeline to begin arranging scenes.</p>
            )}
          </section>
        </div>

        <div className="timeline-right">
          <SceneDetails
            scene={selectedScene}
            onSave={handleUpdateScene}
          />
          <TimelineStatistics timeline={statisticsTimeline} />
        </div>
      </section>
    </main>
  );
}
