import { Mission } from "@/types/mission";
import { MissionContext as ProfileMissionContext, ScoutProfile } from "@/types/profile";

export class ExecutiveContextBuilder {
  /**
   * Synthesizes the Mission, MissionContext, and ScoutProfile into a unified payload string
   * optimized for injection into the research prompt.
   */
  public buildContextString(mission: Mission, context: ProfileMissionContext, profile: ScoutProfile): string {
    const entityNames = mission.relatedEntities.map(e => e.name).join(", ");
    
    return `
=== MISSION DETAILS ===
ID: ${mission.id}
Title: ${mission.title}
Summary: ${mission.summary}
Category: ${mission.category}
Priority: ${mission.priority}
Related Entities: ${entityNames || "None specified"}
Current Rationale: ${mission.whyRelevant}

=== USER PROFILE ===
Role: ${profile.role}
Industry: ${profile.industry}
Organization: ${profile.organization}

=== MISSION CONTEXT ===
Focus Areas: ${context.focus.join(", ")}
Goals: ${context.goals.join(", ")}
Risk Tolerance: ${context.riskTolerance}
`.trim();
  }
}
