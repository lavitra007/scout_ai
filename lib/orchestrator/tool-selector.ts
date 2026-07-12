import { McpResponse } from "./types";
import { AnakinTool } from "@/types/orchestrator";
import { MissionContext } from "@/types/profile";
import { AnakinAdapter } from "./anakin-adapter";

/**
 * The ToolSelector determines the exact parameters needed for the chosen tool
 * and orchestrates calling the AnakinAdapter.
 */
export class ToolSelector {
  private adapter: AnakinAdapter;

  constructor() {
    this.adapter = new AnakinAdapter();
  }

  public async runTool(tool: AnakinTool, context: MissionContext): Promise<McpResponse> {
    // Determine parameters dynamically based on Mission Context
    const query = context.focus.join(" OR ");
    const domain = "example.com"; // In a real scenario, this is derived from watchTargets
    
    // In a multi-step scenario (e.g. wire_discover -> wire_read_action), this class
    // would handle the chain. For now, it delegates the primary tool.
    return this.adapter.executeTool(tool, {
      query,
      domain,
      url: `https://${domain}`,
      maxDepth: 2,
    });
  }
}
