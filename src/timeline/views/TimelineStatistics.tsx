import { averageSceneDuration, formatDuration, formatWordCount } from '../format';
import type { Timeline } from '../types';

interface TimelineStatisticsProps {
  timeline: Timeline | null;
}

export function TimelineStatistics({ timeline }: TimelineStatisticsProps) {
  if (!timeline) {
    return (
      <section className="timeline-stats panel">
        <h3>Statistics</h3>
        <p className="muted">Select or create a timeline to view metrics.</p>
      </section>
    );
  }

  return (
    <section className="timeline-stats panel">
      <h3>Statistics</h3>
      <div className="metric-grid">
        <article className="metric">
          <span>Duration</span>
          <strong>{formatDuration(timeline.totalDuration)}</strong>
        </article>
        <article className="metric">
          <span>Scenes</span>
          <strong>{formatWordCount(timeline.sceneCount)}</strong>
        </article>
        <article className="metric">
          <span>Words</span>
          <strong>{formatWordCount(timeline.wordCount)}</strong>
        </article>
        <article className="metric">
          <span>Avg scene</span>
          <strong>{averageSceneDuration(timeline.totalDuration, timeline.sceneCount)}</strong>
        </article>
      </div>
    </section>
  );
}
