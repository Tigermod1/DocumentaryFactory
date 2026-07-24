import path from "node:path";

export function normalizeOutputPath(
  output: string
): string {
  return path.resolve(output);
}

export function secondsToTimestamp(
  seconds: number
): string {
  const total = Math.floor(seconds);

  const h = Math.floor(total / 3600)
    .toString()
    .padStart(2, "0");

  const m = Math.floor((total % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const s = (total % 60)
    .toString()
    .padStart(2, "0");

  return `${h}:${m}:${s}`;
}