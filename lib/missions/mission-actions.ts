import { SignalCategory } from "@/types/signal";

/**
 * Configurable mappings for Recommended Actions.
 * Separates recommendation copy from business logic.
 */
export const MISSION_ACTIONS: Record<SignalCategory, string> = {
  FUNDING: "Review competitive positioning and capital allocation.",
  REGULATION: "Review compliance impact and consult legal team.",
  RESEARCH: "Evaluate technical feasibility and integration potential.",
  HIRING: "Monitor talent movement and assess retention risk.",
  ACQUISITION: "Assess strategic implications and market consolidation.",
  PRODUCT_LAUNCH: "Analyze feature parity and update marketing strategy.",
  SECURITY: "Audit internal systems and review vendor vulnerabilities.",
  COMPETITOR_MOVE: "Evaluate threat level and prepare counter-messaging.",
  POLICY: "Review internal policy alignment and lobbying strategy.",
  TREND: "Monitor adoption metrics and assess market timing.",
  BREAKING: "Immediate review required by executive team.",
  OTHER: "Review and categorize for future tracking."
};
