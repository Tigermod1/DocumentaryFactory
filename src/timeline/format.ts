export function formatDuration(milliseconds: number): string {
  const safe = Math.max(0, Math.round(milliseconds));
  const totalSeconds = Math.floor(safe / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatWordCount(count: number): string {
  return new Intl.NumberFormat().format(count);
}

export function averageSceneDuration(totalDuration: number, sceneCount: number): string {
  if (sceneCount <= 0) {
    return '0:00';
  }

  return formatDuration(totalDuration / sceneCount);
}
