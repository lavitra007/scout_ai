import { Mission } from "@/types/mission";

export class ExecutiveFilter {
  /**
   * Only allows CRITICAL or HIGH priority missions to proceed to enrichment.
   * Lower-priority missions must bypass the expensive agentic search.
   */
  public isEligible(mission: Mission): boolean {
    return mission.priority === "CRITICAL" || mission.priority === "HIGH";
  }
}
