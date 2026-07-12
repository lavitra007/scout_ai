import { MissionContext } from "@/types/profile";
import { OrchestrationResult, DecisionLog } from "@/types/orchestrator";
import { IntentClassifier } from "./intent-classifier";
import { DecisionEngine } from "./decision-engine";
import { ToolSelector } from "./tool-selector";
import { Normalizer } from "./normalizer";

/**
 * The Scout Orchestrator Entry Point.
 * 
 * Pipeline:
 * MissionContext -> IntentClassifier -> DecisionEngine -> ToolSelector -> Normalizer -> KnowledgeItem[]
 */
export class MissionRouter {
  private classifier: IntentClassifier;
  private decisionEngine: DecisionEngine;
  private toolSelector: ToolSelector;
  private normalizer: Normalizer;

  constructor() {
    this.classifier = new IntentClassifier();
    this.decisionEngine = new DecisionEngine();
    this.toolSelector = new ToolSelector();
    this.normalizer = new Normalizer();
  }

  public async executeMission(context: MissionContext): Promise<OrchestrationResult> {
    const logs: DecisionLog[] = [];

    const log = (stage: DecisionLog["stage"], message: string, details?: Record<string, unknown>) => {
      logs.push({
        timestamp: new Date().toISOString(),
        stage,
        message,
        details,
      });
    };

    try {
      // 1. Intent Classification
      const intent = this.classifier.classify(context);
      log("INTENT_CLASSIFICATION", `Mission intent classified as ${intent}`, { focus: context.focus });

      // 2. Decision Engine
      const selectedTool = this.decisionEngine.selectTool(intent);
      log("DECISION_ENGINE", `Selected MCP tool: ${selectedTool}`, { intent });

      // 3. Tool Selection & Execution
      log("TOOL_EXECUTION", `Executing ${selectedTool}...`);
      const mcpResponse = await this.toolSelector.runTool(selectedTool, context);

      if (mcpResponse.status === "error") {
        throw new Error(mcpResponse.error || "Unknown MCP execution error");
      }

      log("TOOL_EXECUTION", `Successfully executed ${selectedTool}`, { rawResponseAvailable: !!mcpResponse.data });

      // 4. Normalization
      const knowledgeItems = this.normalizer.normalize(mcpResponse);
      log("NORMALIZATION", `Normalized MCP response into ${knowledgeItems.length} KnowledgeItem(s)`);

      log("COMPLETED", "Scout Orchestration pipeline completed successfully.");

      return {
        knowledge: knowledgeItems,
        logs,
      };
    } catch (error) {
      log("ERROR", "Scout Orchestration pipeline failed", { error: error instanceof Error ? error.message : "Unknown error" });
      
      // In a robust implementation, this would throw or return a generic failure state
      // For now, we return empty knowledge with the error logs.
      return {
        knowledge: [],
        logs,
      };
    }
  }
}
