import type {
  OutputFolder,
} from "./StorageTypes";

export const OUTPUT_STRUCTURE: OutputFolder = {
  root: "",

  project: "01_PROJECT",

  script: "02_SCRIPT",

  timeline: "03_TIMELINE",

  prompts: "04_PROMPTS",

  images: "05_IMAGES",

  video: "06_VIDEO",

  audio: "07_AUDIO",

  subtitle: "08_SUBTITLE",

  render: "09_RENDER",

  thumbnails: "10_THUMBNAILS",

  youtube: "11_YOUTUBE",

  logs: "12_LOG",
};

export const OUTPUT_FOLDERS = [
  OUTPUT_STRUCTURE.project,

  OUTPUT_STRUCTURE.script,

  OUTPUT_STRUCTURE.timeline,

  OUTPUT_STRUCTURE.prompts,

  OUTPUT_STRUCTURE.images,

  OUTPUT_STRUCTURE.video,

  OUTPUT_STRUCTURE.audio,

  OUTPUT_STRUCTURE.subtitle,

  OUTPUT_STRUCTURE.render,

  OUTPUT_STRUCTURE.thumbnails,

  OUTPUT_STRUCTURE.youtube,

  OUTPUT_STRUCTURE.logs,
];

export function buildProjectFolderName(
  id: string,
  title: string
): string {
  return `${id}_${sanitize(title)}`;
}

function sanitize(
  value: string
): string {
  return value
    .trim()
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "-");
}