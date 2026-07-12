import { PipelineState } from "@/types/pipeline";
import { Mission } from "@/types/mission";
import { ScoutProfileService } from "@/lib/profile/service";
import { MissionRouter } from "@/lib/orchestrator/mission-router";
import { KnowledgeEngine } from "@/lib/knowledge/knowledge-engine";
import { SignalEngine } from "@/lib/signals/signal-engine";
import { OpportunityEngine } from "@/lib/opportunity/opportunity-engine";
import { MissionEngine } from "@/lib/missions/mission-engine";
import { MissionContext } from "@/types/profile";

export type PipelineCallback = (state: PipelineState, progress?: number) => void;

export class PipelineRunner {
  private profileService: ScoutProfileService;
  private orchestrator: MissionRouter;
  private knowledgeEngine: KnowledgeEngine;
  private signalEngine: SignalEngine;
  private opportunityEngine: OpportunityEngine;
  private missionEngine: MissionEngine;

  constructor() {
    this.profileService = new ScoutProfileService();
    this.orchestrator = new MissionRouter();
    this.knowledgeEngine = new KnowledgeEngine();
    this.signalEngine = new SignalEngine();
    this.opportunityEngine = new OpportunityEngine();
    this.missionEngine = new MissionEngine();
  }

  /**
   * Executes the full end-to-end intelligence pipeline.
   */
  public async execute(onStateChange?: PipelineCallback): Promise<Mission[]> {
    const notify = (state: PipelineState) => {
      if (onStateChange) onStateChange(state);
    };

    try {
      notify("IDLE");

      // 1. Fetch Profile
      const profile = this.profileService.getProfile();
      if (!profile) {
        throw new Error("No ScoutProfile found. User must complete onboarding.");
      }
      notify("PROFILE_READY");

      // 2. Build Mission Context
      const context: MissionContext = {
        id: `ctx_${Date.now()}`,
        focus: profile.interests,
        goals: profile.goals,
        priority: "HIGH",
        riskTolerance: "MEDIUM"
      };
      notify("MISSION_CONTEXT_READY");

      // 3. Scout Intelligence Engine (Orchestrator -> Anakin MCP)
      notify("INTELLIGENCE_RUNNING");
      const orchestrationResult = await this.orchestrator.executeMission(context);
      if (orchestrationResult.knowledge.length === 0) {
        console.warn("Orchestrator returned zero knowledge items. Pipeline continuing with empty data.");
      }

      // 4. Knowledge Engine (Structured Graph)
      const graph = this.knowledgeEngine.buildKnowledgeGraph(orchestrationResult.knowledge);
      notify("KNOWLEDGE_READY");

      // 5. Signal Engine (Extraction)
      const rawSignals = this.signalEngine.buildSignals(graph);
      notify("SIGNALS_READY");

      // 6. Opportunity Engine (Scoring & Ranking)
      const rankedSignals = this.opportunityEngine.rankSignals(rawSignals, context, profile);

      // 7. Mission Engine (Actionable Tasks)
      const missions = this.missionEngine.buildMissions(rankedSignals, context, profile);
      notify("MISSIONS_READY");

      return missions;

    } catch (error) {
      console.error("Pipeline Execution Failed:", error);
      notify("FAILED");
      throw error;
    }
  }
}
