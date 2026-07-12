import { PipelineState } from "@/types/pipeline";

export class PipelineStateFormatter {
  /**
   * Maps an internal PipelineState to a user-facing loading message.
   */
  public static getLoadingMessage(state: PipelineState): string {
    switch (state) {
      case "IDLE": return "Initializing Scout AI...";
      case "PROFILE_READY": return "Loading Scout Profile...";
      case "MISSION_CONTEXT_READY": return "Building Mission Context...";
      case "INTELLIGENCE_RUNNING": return "Searching Live Sources via Anakin MCP...";
      case "KNOWLEDGE_READY": return "Extracting and Deduplicating Knowledge...";
      case "SIGNALS_READY": return "Detecting and Ranking Opportunity Signals...";
      case "MISSIONS_READY": return "Generating Actionable Missions...";
      case "FAILED": return "Pipeline Execution Failed.";
      default: return "Processing...";
    }
  }
}
