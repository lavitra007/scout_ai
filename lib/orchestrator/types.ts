import { AnakinTool } from "@/types/orchestrator";

// These are mock interfaces for the Anakin MCP integration
// In a real scenario, these would interact directly with the MCP client.

export interface McpRequestParams {
  query?: string;
  url?: string;
  domain?: string;
  maxDepth?: number;
  targetSchema?: Record<string, unknown>;
}

export interface McpResponse {
  tool: AnakinTool;
  data: unknown;
  status: "success" | "error";
  error?: string;
}
