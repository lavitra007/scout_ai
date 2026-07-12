import { RankedSignal } from "@/types/ranked-signal";

export class RankingEngine {
  /**
   * Sorts all Signals by Opportunity Score descending.
   * Resolves ties using urgency or freshness.
   * Injects the final 1-based ranking index.
   */
  public rank(signals: RankedSignal[]): RankedSignal[] {
    const sorted = [...signals].sort((a, b) => {
      // Primary sort: Opportunity Score
      if (b.opportunityScore !== a.opportunityScore) {
        return b.opportunityScore - a.opportunityScore;
      }
      
      // Secondary sort: Urgency
      if (b.urgency !== a.urgency) {
        return b.urgency - a.urgency;
      }

      // Tertiary sort: Freshness
      return b.freshness - a.freshness;
    });

    // Inject 1-based ranking index
    return sorted.map((signal, index) => ({
      ...signal,
      ranking: index + 1
    }));
  }
}
