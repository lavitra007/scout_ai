import { AnakinTool } from "@/types/orchestrator";
import { executeSearch } from "@/services/anakin/search";
import { executeScrape } from "@/services/anakin/scrape";
import { executeCrawl } from "@/services/anakin/crawl";
import { executeWireDiscover } from "@/services/anakin/wire";
import { executeAgenticSearch } from "@/services/anakin/research";
import { McpRequestParams, McpResponse } from "./types";

/**
 * Adapter that maps a selected AnakinTool to the actual service execution.
 */
export class AnakinAdapter {
  public async executeTool(
    tool: AnakinTool,
    params: McpRequestParams
  ): Promise<McpResponse> {
    try {
      let rawData: unknown;

      switch (tool) {
        case "search":
          rawData = await executeSearch(params.query || "");
          break;
        case "scrape":
          rawData = await executeScrape(params.url || "");
          break;
        case "crawl":
          rawData = await executeCrawl(params.domain || "", params.maxDepth || 1);
          break;
        case "agentic_search":
          rawData = await executeAgenticSearch(params.query || "");
          break;
        case "wire_discover":
          rawData = await executeWireDiscover(params.url || "", params.targetSchema || {});
          break;
        case "wire_read_action":
          // Fallback if needed
          rawData = await executeWireDiscover(params.url || "", params.targetSchema || {});
          break;
        case "map":
          // Fallback to crawl logic for MVP mapping
          rawData = await executeCrawl(params.domain || "", 1);
          break;
        default:
          throw new Error(`Unsupported tool: ${tool}`);
      }

      return {
        tool,
        data: rawData,
        status: "success",
      };
    } catch (error) {
      return {
        tool,
        data: null,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown MCP execution error",
      };
    }
  }
}
