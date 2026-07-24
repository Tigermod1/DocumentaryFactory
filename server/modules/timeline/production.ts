import { buildScenes } from "./scene-builder.js";

export interface ProductionTimeline {
  sceneCount: number;
  scenes: ReturnType<typeof buildScenes>;
}

export async function generateTimelineFromScript(
  script: string
): Promise<ProductionTimeline> {
  const blocks = [
    {
      id: "script",
      startTime: 0,
      endTime: Math.max(
        5000,
        script.split(/\s+/).filter(Boolean).length * 400
      ),
      text: script,
      narration: true,
    },
  ];

  const scenes = buildScenes(blocks);

  return {
    sceneCount: scenes.length,
    scenes,
  };
}