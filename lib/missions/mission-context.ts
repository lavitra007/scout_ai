import { RankedSignal } from "@/types/ranked-signal";
import { MissionContext as ProfileMissionContext, ScoutProfile } from "@/types/profile";

export class MissionContextAnalyzer {
  /**
   * Deterministically generates the `whyRelevant` string explaining 
   * the rationale behind the mission. No LLMs are used.
   */
  public generateWhyRelevant(rankedSignal: RankedSignal, context: ProfileMissionContext, profile: ScoutProfile): string {
    const reasons: string[] = [];
    const text = `${rankedSignal.signal.title} ${rankedSignal.signal.summary}`.toLowerCase();

    // 1. Check Focus Areas
    const matchedFocus = context.focus.filter(f => text.includes(f.toLowerCase()));
    if (matchedFocus.length > 0) {
      reasons.push(`Aligns with your focus on ${matchedFocus.join(" and ")}.`);
    }

    // 2. Check Watch Targets
    const watchTargets = [...(profile.watchCompanies || []), ...(profile.competitors || [])];
    const matchedTargets = rankedSignal.signal.sourceEntities.filter(e => 
      watchTargets.some(wt => wt.toLowerCase() === e.name.toLowerCase())
    );
    if (matchedTargets.length > 0) {
      reasons.push(`Directly involves watch target: ${matchedTargets.map(e => e.name).join(", ")}.`);
    }

    // 3. Fallback to Impact/Score
    if (reasons.length === 0) {
      if (rankedSignal.priority === "CRITICAL" || rankedSignal.priority === "HIGH") {
        reasons.push(`Flags a ${rankedSignal.priority.toLowerCase()} priority event in your industry.`);
      } else {
        reasons.push("Detected as a notable shift in your tracked knowledge graph.");
      }
    }

    return reasons.join(" ");
  }
}
