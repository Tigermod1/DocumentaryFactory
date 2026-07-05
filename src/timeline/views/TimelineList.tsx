import { formatDuration } from '../format';
import type { Scene, Timeline } from '../types';

interface TimelineListProps {
  timeline: Timeline | null;
  timelines: Timeline[];
  selectedTimelineId: string | null;
  selectedSceneId: string | null;
  onSelectTimeline: (timelineId: string) => void;
  onSelectScene: (sceneId: string) => void;
  onDeleteScene: (sceneId: string) => Promise<void>;
  onMoveScene: (sceneId: string, targetIndex: number) => Promise<void>;
  onMergeScene: (sceneId: string, withSceneId?: string) => Promise<void>;
  onSplitScene: (sceneId: string) => Promise<void>;
}

function SceneRow({
  scene,
  isSelected,
  onSelect,
  onDelete,
  onMove,
  onMerge,
  onSplit,
}: {
  scene: Scene;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMove: (targetIndex: number) => void;
  onMerge: () => void;
  onSplit: () => void;
}) {
  return (
    <li className={isSelected ? 'scene-row selected' : 'scene-row'}>
      <button type="button" className="scene-row-main" onClick={onSelect}>
        <strong>{scene.sceneNumber}. {scene.summary}</strong>
        <span>
          {formatDuration(scene.startTime)} - {formatDuration(scene.endTime)} · {scene.wordCount} words
        </span>
      </button>
      <div className="scene-row-actions">
        <button type="button" onClick={() => onMove(scene.orderIndex - 1)} disabled={scene.orderIndex === 0}>Up</button>
        <button type="button" onClick={() => onMove(scene.orderIndex + 1)}>Down</button>
        <button type="button" onClick={onSplit}>Split</button>
        <button type="button" onClick={onMerge}>Merge</button>
        <button type="button" className="danger" onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}

export function TimelineList({
  timeline,
  timelines,
  selectedTimelineId,
  selectedSceneId,
  onSelectTimeline,
  onSelectScene,
  onDeleteScene,
  onMoveScene,
  onMergeScene,
  onSplitScene,
}: TimelineListProps) {
  return (
    <aside className="timeline-sidebar panel">
      <section className="timeline-nav">
        <h3>Timeline Navigation</h3>
        <div className="timeline-nav-list">
          {timelines.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selectedTimelineId ? 'timeline-chip selected' : 'timeline-chip'}
              onClick={() => onSelectTimeline(item.id)}
            >
              <strong>{item.name}</strong>
              <span>{item.sceneCount} scenes · {formatDuration(item.totalDuration)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="timeline-scene-list">
        <h3>Timeline List</h3>
        {timeline ? (
          <ul className="scene-list">
            {timeline.scenes.map((scene) => (
              <SceneRow
                key={scene.id}
                scene={scene}
                isSelected={scene.id === selectedSceneId}
                onSelect={() => onSelectScene(scene.id)}
                onDelete={() => { void onDeleteScene(scene.id); }}
                onMove={(targetIndex) => { void onMoveScene(scene.id, targetIndex); }}
                onMerge={() => { void onMergeScene(scene.id); }}
                onSplit={() => { void onSplitScene(scene.id); }}
              />
            ))}
          </ul>
        ) : (
          <p className="muted">No timeline selected.</p>
        )}
      </section>
    </aside>
  );
}
