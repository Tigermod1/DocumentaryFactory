import { ProductionEvents } from "./ProductionEvents";
import { StageExecutor } from "./StageExecutor";
import {
  createRuntimeState,
  type RuntimeState,
} from "./RuntimeState";

export class PipelineExecutor {
  readonly state: RuntimeState;

  readonly events: ProductionEvents;

  private readonly stages: StageExecutor;

  constructor() {
    this.state = createRuntimeState();

    this.events = new ProductionEvents();

    this.stages = new StageExecutor();
  }

  async execute(): Promise<void> {
    try {
      this.state.running = true;

      this.state.paused = false;

      this.state.currentScene = 1;

      this.state.totalScenes = 1;

      this.events.emit(
        "state",
        this.state
      );

      await this.stages.executeTimeline({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeScene({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeStory({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeDirector({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeBible({
        state: this.state,
        events: this.events,
      });

      await this.stages.executePrompt({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeImage({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeAnimation({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeSound({
        state: this.state,
        events: this.events,
      });

      await this.stages.executeRender({
        state: this.state,
        events: this.events,
      });
    } catch (error) {
      this.state.running = false;

      this.state.stage = "failed";

      this.events.emit(
        "failed",
        this.state
      );

      throw error;
    }
  }

  stop(): void {
    this.state.running = false;

    this.state.stage = "failed";

    this.events.emit(
      "failed",
      this.state
    );
  }

  pause(): void {
    this.state.paused = true;

    this.events.emit(
      "state",
      this.state
    );
  }

  resume(): void {
    this.state.paused = false;

    this.events.emit(
      "state",
      this.state
    );
  }
}