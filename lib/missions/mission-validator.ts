import { Mission } from "@/types/mission";

export class MissionValidator {
  /**
   * Enforces strict structural integrity.
   * Drops any missions missing mandatory fields.
   */
  public validate(missions: Mission[]): Mission[] {
    return missions.filter(mission => this.isValid(mission));
  }

  private isValid(mission: Mission): boolean {
    if (!mission.title || mission.title.trim() === "") return false;
    if (!mission.summary || mission.summary.trim() === "") return false;
    if (!mission.priority) return false;
    if (mission.opportunityScore === undefined || mission.opportunityScore < 0) return false;
    if (!mission.recommendedAction || mission.recommendedAction.trim() === "") return false;
    if (!mission.whyRelevant || mission.whyRelevant.trim() === "") return false;

    // All structural checks passed
    return true;
  }
}
