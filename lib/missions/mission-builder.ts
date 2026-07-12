import { Mission } from "@/types/mission";
import { RankedSignal } from "@/types/ranked-signal";
import { MISSION_ACTIONS } from "./mission-actions";

export class MissionBuilder {
  /**
   * Assembles the final Mission object.
   */
  public build(rankedSignal: RankedSignal, whyRelevant: string): Mission {
    
    // Resolve the deterministic action mapping
    const recommendedAction = MISSION_ACTIONS[rankedSignal.signal.category] || MISSION_ACTIONS["OTHER"];

    return {
      id: `mission_${rankedSignal.id}`,
      title: `Action Required: ${rankedSignal.signal.title}`,
      summary: rankedSignal.signal.summary,
      category: rankedSignal.signal.category,
      priority: rankedSignal.priority,
      opportunityScore: rankedSignal.opportunityScore,
      confidence: rankedSignal.confidence,
      importance: rankedSignal.signal.importance,
      whyRelevant,
      recommendedAction,
      relatedSignals: [rankedSignal.id],
      relatedEntities: rankedSignal.signal.sourceEntities,
      sources: rankedSignal.signal.relatedKnowledge,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
