import { MissionContext } from "./profile";
import { KnowledgeItem } from "./knowledge";

export type MissionIntent =
  | "LATEST_INFORMATION"
  | "SITE_WIDE_DISCOVERY"
  | "DEEP_COMPARATIVE_RESEARCH"
  | "STRUCTURED_DATA_EXTRACTION"
  | "PRODUCT_LOOKUP"
  | "PROFILE_LOOKUP"
  | "UNKNOWN_INTENT";

export type AnakinTool =
  | "search"
  | "scrape"
  | "crawl"
  | "map"
  | "agentic_search"
  | "wire_discover"
  | "wire_read_action";

export interface DecisionLog {
  timestamp: string;
  stage: "INTENT_CLASSIFICATION" | "DECISION_ENGINE" | "TOOL_EXECUTION" | "NORMALIZATION" | "COMPLETED" | "ERROR";
  message: string;
  details?: Record<string, unknown>;
}

export interface OrchestrationResult {
  knowledge: KnowledgeItem[];
  logs: DecisionLog[];
}
