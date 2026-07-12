export type ExecutionStage = 
  | "PROFILE"
  | "MISSION_CONTEXT"
  | "ORCHESTRATOR"
  | "SEARCH"
  | "SCRAPE"
  | "CRAWL"
  | "WIRE"
  | "KNOWLEDGE"
  | "SIGNALS"
  | "OPPORTUNITY"
  | "MISSIONS"
  | "EXECUTIVE"
  | "COMPLETE"
  | "ERROR";

export type ExecutionStatus = "RUNNING" | "SUCCESS" | "ERROR";

export interface ExecutionEvent {
  id: string;
  timestamp: string;
  stage: ExecutionStage;
  status: ExecutionStatus;
  message: string;
  metadata?: Record<string, any>;
  duration?: number; // Duration in ms, usually set on SUCCESS/ERROR events
}
