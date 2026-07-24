import type { ProjectSummary } from "./types.js";

export function buildProjectSummary(
  projectName: string,
  script?: string,
  subtitle?: string,
  audio?: string
): ProjectSummary {
  const scriptLines = script
    ? script.split(/\r?\n/).filter(Boolean).length
    : 0;

  const subtitleCount = subtitle
    ? (subtitle.match(/\n\d+\n/g) || []).length
    : 0;

  return {
    id: crypto.randomUUID(),
    name: projectName,

    hasScript: !!script,
    hasSubtitle: !!subtitle,
    hasAudio: !!audio,

    scriptLines,
    subtitleCount,

    duration: 0,
  };
}