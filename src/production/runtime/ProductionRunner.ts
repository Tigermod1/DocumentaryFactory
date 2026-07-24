import { PipelineExecutor } from "./PipelineExecutor";

export class ProductionRunner {
  private executor: PipelineExecutor;

  constructor() {
    this.executor = new PipelineExecutor();
  }

  get state() {
    return this.executor.state;
  }

  get events() {
    return this.executor.events;
  }

  async start() {
    if (this.executor.state.running) {
      return;
    }

    await this.executor.execute();
  }

  pause() {
    this.executor.pause();
  }

  resume() {
    this.executor.resume();
  }

  stop() {
    this.executor.stop();
  }

  restart() {
    this.executor = new PipelineExecutor();

    return this.start();
  }
}

export const productionRunner =
  new ProductionRunner();