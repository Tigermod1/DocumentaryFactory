export interface RenderClip {
  id: string;

  start: number;

  end: number;

  image?: string;

  video?: string;

  audio?: string;

  subtitle?: string;
}

export interface RenderProject {
  id: string;

  output: string;

  fps: number;

  width: number;

  height: number;

  clips: RenderClip[];
}

export interface RenderResult {
  success: boolean;

  output: string;

  duration: number;
}