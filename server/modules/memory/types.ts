export interface FactoryMemory {
  version: number;

  projectId: string;

  updatedAt: string;

  timeline: {
    sceneCount: number;
    averageSceneDuration: number;
  };

  brain: {
    provider: string;
    model: string;
    promptCount: number;
  };

  assets: {
    images: number;
    videos: number;
    audio: number;
  };

  render: {
    completed: boolean;
    renderCount: number;
    lastRender?: string;
  };

  analytics: {
    exports: number;
  };
}