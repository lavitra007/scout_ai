import { PipelineRunner, PipelineCallback } from "./pipeline-runner";
import { Mission } from "@/types/mission";

/**
 * Clean facade for executing the pipeline from the frontend.
 */
export class ScoutPipeline {
  private runner: PipelineRunner;

  constructor() {
    this.runner = new PipelineRunner();
  }

  public async run(onStateChange?: PipelineCallback): Promise<Mission[]> {
    return this.runner.execute(onStateChange);
  }
}

// Singleton instance for the application
export const scoutPipeline = new ScoutPipeline();
