import { PriorityLevel } from "@/types/ranked-signal";

export class PriorityEngine {
  /**
   * Maps the normalized 0-100 Opportunity Score to strict priority tiers.
   */
  public assign(opportunityScore: number): PriorityLevel {
    if (opportunityScore >= 95) return "CRITICAL";
    if (opportunityScore >= 80) return "HIGH";
    if (opportunityScore >= 60) return "MEDIUM";
    return "LOW";
  }
}
