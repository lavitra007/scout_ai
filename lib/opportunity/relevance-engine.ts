import { Signal } from "@/types/signal";
import { MissionContext, ScoutProfile } from "@/types/profile";

export class RelevanceEngine {
  /**
   * Calculates Personal Relevance by comparing the Signal against
   * the user's MissionContext and ScoutProfile.
   * Returns a normalized score between 0.0 and 1.0.
   */
  public evaluate(signal: Signal, context: MissionContext, profile: ScoutProfile): number {
    let score = 0.0;
    const signalText = `${signal.title} ${signal.summary}`.toLowerCase();

    // 1. Evaluate against Mission Focus Areas (Highest Weight)
    for (const focus of context.focus) {
      if (signalText.includes(focus.toLowerCase())) {
        score += 0.4;
      }
    }

    // 2. Evaluate against Mission Goals
    for (const goal of context.goals) {
      if (signalText.includes(goal.toLowerCase())) {
        score += 0.2;
      }
    }

    // 3. Evaluate against Profile Industry/Role
    if (signalText.includes(profile.industry.toLowerCase())) {
      score += 0.15;
    }
    
    // 4. Evaluate against Profile Interests/Keywords
    const allKeywords = [...(profile.interests || []), ...(profile.keywords || [])];
    for (const keyword of allKeywords) {
      if (signalText.includes(keyword.toLowerCase())) {
        score += 0.1;
      }
    }

    // 5. Evaluate against explicit Watch Companies or Competitors
    const watchTargets = [...(profile.watchCompanies || []), ...(profile.competitors || [])];
    const involvesWatchTarget = signal.sourceEntities.some(entity => 
      watchTargets.some(wt => wt.toLowerCase() === entity.name.toLowerCase())
    );

    if (involvesWatchTarget) {
      score += 0.3;
    }

    // Normalize to max 1.0
    return Math.min(1.0, score);
  }
}
