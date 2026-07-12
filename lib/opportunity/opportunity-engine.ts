import { Signal } from "@/types/signal";
import { RankedSignal } from "@/types/ranked-signal";
import { MissionContext, ScoutProfile } from "@/types/profile";
import { ImpactEngine } from "./impact-engine";
import { RelevanceEngine } from "./relevance-engine";
import { OpportunityScore } from "./opportunity-score";
import { PriorityEngine } from "./priority-engine";
import { RankingEngine } from "./ranking-engine";

/**
 * The Scout Opportunity Engine Entry Point.
 * 
 * Pipeline:
 * Signal[] -> Impact & Relevance Evaluation -> Opportunity Scoring -> Priority Assignment -> Ranking -> RankedSignal[]
 */
export class OpportunityEngine {
  private impactEngine: ImpactEngine;
  private relevanceEngine: RelevanceEngine;
  private opportunityScore: OpportunityScore;
  private priorityEngine: PriorityEngine;
  private rankingEngine: RankingEngine;

  constructor() {
    this.impactEngine = new ImpactEngine();
    this.relevanceEngine = new RelevanceEngine();
    this.opportunityScore = new OpportunityScore();
    this.priorityEngine = new PriorityEngine();
    this.rankingEngine = new RankingEngine();
  }

  /**
   * Transforms raw Signals into a prioritized, ranked feed tailored to the user.
   */
  public rankSignals(signals: Signal[], context: MissionContext, profile: ScoutProfile): RankedSignal[] {
    const scoredSignals: RankedSignal[] = signals.map(signal => {
      // 1. Calculate base metrics
      const businessImpact = this.impactEngine.evaluate(signal);
      const personalRelevance = this.relevanceEngine.evaluate(signal, context, profile);
      
      // Calculate freshness (1.0 = today, decaying older)
      const ageMs = Date.now() - new Date(signal.timestamp).getTime();
      const ageDays = Math.max(0, ageMs / (1000 * 60 * 60 * 24));
      const freshness = Math.max(0, 1.0 - (ageDays * 0.05)); // Decays to 0 after 20 days

      // Calculate source reliability (derived from the supporting knowledge items)
      // Since Signal already has a confidence score spanning both, we split it for the formula
      const sourceReliability = signal.confidence; // High correlation in MVP
      const knowledgeConfidence = signal.confidence;
      
      // Calculate Urgency (Impact * Freshness)
      const urgency = Math.min(1.0, businessImpact * (freshness + 0.2));

      // 2. Aggregate into final Opportunity Score (0-100)
      const score = this.opportunityScore.calculate(
        businessImpact,
        personalRelevance,
        freshness,
        sourceReliability,
        knowledgeConfidence
      );

      // 3. Assign Priority Tier
      const priority = this.priorityEngine.assign(score);

      return {
        id: signal.id,
        signal,
        opportunityScore: score,
        priority,
        businessImpact,
        personalRelevance,
        freshness,
        sourceReliability,
        confidence: knowledgeConfidence,
        urgency,
        ranking: 0 // Will be assigned by RankingEngine
      };
    });

    // 4. Rank and sort the entire feed
    return this.rankingEngine.rank(scoredSignals);
  }
}
