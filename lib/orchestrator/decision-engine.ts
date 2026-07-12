import { MissionIntent, AnakinTool } from "@/types/orchestrator";

/**
 * Decides the optimal Anakin MCP tool based on the classified Mission Intent.
 */
export class DecisionEngine {
  public selectTool(intent: MissionIntent): AnakinTool {
    switch (intent) {
      case "LATEST_INFORMATION":
        return "search";
      case "SITE_WIDE_DISCOVERY":
        return "crawl";
      case "DEEP_COMPARATIVE_RESEARCH":
        return "agentic_search";
      case "STRUCTURED_DATA_EXTRACTION":
        // Usually involves mapping a domain and then using Wire API,
        // but for a single tool selection we prioritize Wire if structured data is needed.
        return "wire_discover";
      case "PRODUCT_LOOKUP":
        return "wire_discover";
      case "PROFILE_LOOKUP":
        return "search"; // Can fall back to scrape
      default:
        return "search";
    }
  }
}
