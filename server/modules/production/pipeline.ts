import type { ProductionStage } from "./stage.js";

import { createProjectStage } from "./stages/createProject.js";
import { saveScriptStage } from "./stages/saveScript.js";
import { generateTimelineStage } from "./stages/generateTimeline.js";
import { documentaryBrainStage } from "./stages/documentaryBrain.js";
import { promptComposerStage } from "./stages/promptComposer.js";
import { packageBuilderStage } from "./stages/packageBuilder.js";

export function createProductionPipeline(): ProductionStage[] {
  return [
    createProjectStage,
    saveScriptStage,
    generateTimelineStage,
    documentaryBrainStage,
    promptComposerStage,
    packageBuilderStage,
  ];
}