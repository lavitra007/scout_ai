import { Signal } from "@/types/signal";
import { IMPACT_CONFIG } from "./impact-config";

export class ImpactEngine {
  /**
   * Computes the objective Business Impact of a signal based on a configurable ruleset.
   * Returns a normalized score between 0.0 and 1.0.
   */
  public evaluate(signal: Signal): number {
    const baseScore = IMPACT_CONFIG[signal.category] ?? 0.3; // Default to 0.3 if category is somehow missing

    // Boost based on signal importance metadata (from the Signal Engine)
    const boostedScore = baseScore + (signal.importance * 0.1);

    // Normalize to max 1.0
    return Math.min(1.0, Math.max(0.0, boostedScore));
  }
}
