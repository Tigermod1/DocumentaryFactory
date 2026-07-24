export type BibleType =
  | "character"
  | "environment"
  | "style"
  | "sound"
  | "project";

export interface BibleReference {
  id: string;

  path: string;

  tags: string[];
}

export interface CharacterBible {
  age?: string;

  gender?: string;

  ethnicity?: string;

  faceShape?: string;

  eyes?: string;

  hair?: string;

  facialHair?: string;

  bodyType?: string;

  height?: string;

  clothing?: string;

  accessories?: string[];

  expressions?: string[];

  poses?: string[];

  voiceStyle?: string;

  negativePrompt?: string;

  consistencyLock: boolean;
}

export interface EnvironmentBible {
  architecture?: string;

  location?: string;

  weather?: string;

  season?: string;

  timeOfDay?: string;

  lighting?: string;

  atmosphere?: string;

  colorPalette?: string[];

  textures?: string[];

  ambience?: string[];

  props?: string[];

  negativePrompt?: string;

  consistencyLock: boolean;
}

export interface StyleBible {
  visualStyle: string;

  rendering: string;

  cameraLanguage: string;

  colorGrading: string;

  contrast: string;

  saturation: string;

  grain: string;

  aspectRatio: string;
}

export interface SoundBible {
  musicStyle: string;

  ambienceStyle: string;

  sfxStyle: string;

  voiceMix: number;

  musicMix: number;

  ambienceMix: number;

  sfxMix: number;
}

export interface ProjectBible {
  targetAudience: string;

  language: string;

  platform: string;

  duration: number;

  narrationStyle: string;

  subtitleStyle: string;

  outputQuality: string;
}

export interface Bible {
  id: string;

  name: string;

  type: BibleType;

  description: string;

  references: BibleReference[];

  character?: CharacterBible;

  environment?: EnvironmentBible;

  style?: StyleBible;

  sound?: SoundBible;

  project?: ProjectBible;

  createdAt: string;

  updatedAt: string;
}

export interface CreateBibleInput {
  name: string;

  type: BibleType;

  description?: string;
}