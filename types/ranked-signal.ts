import { Signal } from "./signal";

export type PriorityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface RankedSignal {
  id: string; // The original signal ID
  signal: Signal;
  opportunityScore: number; // 0 to 100
  priority: PriorityLevel;
  
  // Scoring Breakdown (all 0.0 to 1.0)
  businessImpact: number;
  personalRelevance: number;
  freshness: number;
  sourceReliability: number;
  confidence: number;
  
  urgency: number; // 0.0 to 1.0, derived from time sensitivity
  ranking: number; // 1-based index in the final sorted list
}
