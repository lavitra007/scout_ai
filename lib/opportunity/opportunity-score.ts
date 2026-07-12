export class OpportunityScore {
  /**
   * Aggregates the 5 metrics using strict mathematical weightings.
   * Returns a normalized 0-100 integer score.
   */
  public calculate(
    businessImpact: number,
    personalRelevance: number,
    freshness: number,
    sourceReliability: number,
    knowledgeConfidence: number
  ): number {
    // Weightings as defined by the requirement
    const WEIGHT_IMPACT = 0.30;
    const WEIGHT_RELEVANCE = 0.30;
    const WEIGHT_FRESHNESS = 0.15;
    const WEIGHT_RELIABILITY = 0.15;
    const WEIGHT_CONFIDENCE = 0.10;

    const rawScore = 
      (businessImpact * WEIGHT_IMPACT) +
      (personalRelevance * WEIGHT_RELEVANCE) +
      (freshness * WEIGHT_FRESHNESS) +
      (sourceReliability * WEIGHT_RELIABILITY) +
      (knowledgeConfidence * WEIGHT_CONFIDENCE);

    // rawScore is 0.0 to 1.0. Convert to 0-100 integer.
    return Math.round(rawScore * 100);
  }
}
