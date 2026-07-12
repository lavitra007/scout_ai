import { ExecutionEvent, ExecutionStage, ExecutionStatus } from "@/types/execution";

export class ExecutionEventFactory {
  public static create(
    stage: ExecutionStage,
    status: ExecutionStatus,
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ): ExecutionEvent {
    return {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      stage,
      status,
      message,
      metadata,
      duration
    };
  }
}
