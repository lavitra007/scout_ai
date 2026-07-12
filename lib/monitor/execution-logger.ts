import { ExecutionStage, ExecutionStatus } from "@/types/execution";
import { ExecutionEventFactory } from "./execution-event";
import { executionMonitor } from "./execution-monitor";

export class ExecutionLogger {
  /**
   * Dispatches a standardized execution event to the global monitor.
   */
  public static log(
    stage: ExecutionStage,
    status: ExecutionStatus,
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ) {
    const event = ExecutionEventFactory.create(stage, status, message, metadata, duration);
    executionMonitor.emit(event);
  }
}
