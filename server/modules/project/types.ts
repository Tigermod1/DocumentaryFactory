export interface ProjectUpload {
  name: string;
  scriptName?: string;
  subtitleName?: string;
  audioName?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;

  hasScript: boolean;
  hasSubtitle: boolean;
  hasAudio: boolean;

  scriptLines: number;
  subtitleCount: number;

  duration: number;
}

export interface ProjectMetadata {
  id: string;
  name: string;

  createdAt: string;
  updatedAt: string;

  script?: string;
  subtitle?: string;
  audio?: string;

  status:
    | "imported"
    | "timeline"
    | "prompt"
    | "completed";
}