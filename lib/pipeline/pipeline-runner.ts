import { PipelineState } from "@/types/pipeline";
import { Mission } from "@/types/mission";
import { ScoutProfileService } from "@/lib/profile/service";
import { MissionRouter } from "@/lib/orchestrator/mission-router";
import { KnowledgeEngine } from "@/lib/knowledge/knowledge-engine";
import { SignalEngine } from "@/lib/signals/signal-engine";
import { OpportunityEngine } from "@/lib/opportunity/opportunity-engine";
import { MissionEngine } from "@/lib/missions/mission-engine";
import { MissionContext } from "@/types/profile";
import { ExecutionLogger } from "@/lib/monitor/execution-logger";
import { PipelineMessages } from "@/lib/monitor/pipeline-events";
import { executionMonitor } from "@/lib/monitor/execution-monitor";

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
      executionMonitor.clear(); // Clear logs on fresh run

      // 1. Fetch Profile
      ExecutionLogger.log("PROFILE", "RUNNING", PipelineMessages.PROFILE_LOAD);
      const profileTime = Date.now();
      const profile = this.profileService.getProfile();
      if (!profile) {
        throw new Error("No ScoutProfile found. User must complete onboarding.");
      }
      ExecutionLogger.log("PROFILE", "SUCCESS", "Profile loaded successfully.", undefined, Date.now() - profileTime);
      notify("PROFILE_READY");

      // 2. Build Mission Context
      ExecutionLogger.log("MISSION_CONTEXT", "RUNNING", PipelineMessages.MISSION_CONTEXT);
      const ctxTime = Date.now();
      const context: MissionContext = {
        id: `ctx_${Date.now()}`,
        focus: profile.interests,
        goals: profile.goals,
        priority: "HIGH",
        riskTolerance: "MEDIUM"
      };
      ExecutionLogger.log("MISSION_CONTEXT", "SUCCESS", "Context vectors computed.", undefined, Date.now() - ctxTime);
      notify("MISSION_CONTEXT_READY");

      // 3. Scout Intelligence Engine (Orchestrator -> Anakin MCP)
      ExecutionLogger.log("ORCHESTRATOR", "RUNNING", PipelineMessages.ORCHESTRATOR_START);
      notify("INTELLIGENCE_RUNNING");
      const orchTime = Date.now();
      const orchestrationResult = await this.orchestrator.executeMission(context);
      
      // We could log specific tools used if we wanted, let's just log Orchestrator complete
      ExecutionLogger.log("ORCHESTRATOR", "SUCCESS", `Retrieved ${orchestrationResult.knowledge.length} items from MCP.`, undefined, Date.now() - orchTime);
      
      if (orchestrationResult.knowledge.length === 0) {
        console.warn("Orchestrator returned zero knowledge items. Pipeline continuing with empty data.");
      }

      // 4. Knowledge Engine (Structured Graph)
      ExecutionLogger.log("KNOWLEDGE", "RUNNING", PipelineMessages.KNOWLEDGE_START);
      const knowTime = Date.now();
      const graph = this.knowledgeEngine.buildKnowledgeGraph(orchestrationResult.knowledge);
      ExecutionLogger.log("KNOWLEDGE", "SUCCESS", `Graph constructed with ${graph.entities.length} entities.`, undefined, Date.now() - knowTime);
      notify("KNOWLEDGE_READY");

      // 5. Signal Engine (Extraction)
      ExecutionLogger.log("SIGNALS", "RUNNING", PipelineMessages.SIGNALS_START);
      const sigTime = Date.now();
      const rawSignals = this.signalEngine.buildSignals(graph);
      ExecutionLogger.log("SIGNALS", "SUCCESS", `Extracted ${rawSignals.length} raw signals.`, undefined, Date.now() - sigTime);
      notify("SIGNALS_READY");

      // 6. Opportunity Engine (Scoring & Ranking)
      ExecutionLogger.log("OPPORTUNITY", "RUNNING", PipelineMessages.OPPORTUNITY_START);
      const oppTime = Date.now();
      const rankedSignals = this.opportunityEngine.rankSignals(rawSignals, context, profile);
      ExecutionLogger.log("OPPORTUNITY", "SUCCESS", `Signals prioritized and scored.`, undefined, Date.now() - oppTime);

      // 7. Mission Engine (Actionable Tasks)
      ExecutionLogger.log("MISSIONS", "RUNNING", PipelineMessages.MISSIONS_START);
      const missTime = Date.now();
      const missions = this.missionEngine.buildMissions(rankedSignals, context, profile);
      ExecutionLogger.log("MISSIONS", "SUCCESS", `Synthesized ${missions.length} active missions.`, undefined, Date.now() - missTime);
      notify("MISSIONS_READY");

      ExecutionLogger.log("COMPLETE", "SUCCESS", PipelineMessages.COMPLETE);
      return missions;

    } catch (error) {
      ExecutionLogger.log("ERROR", "ERROR", error instanceof Error ? error.message : "Fatal pipeline exception.");
      console.error("Pipeline Execution Failed:", error);
      notify("FAILED");
      throw error;
    }
  }
}
