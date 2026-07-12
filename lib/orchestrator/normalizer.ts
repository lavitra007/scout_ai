import { KnowledgeItem } from "@/types/knowledge";
import { McpResponse } from "./types";

/**
 * Normalizes raw MCP responses into the strict KnowledgeItem unified structure.
 */
export class Normalizer {
  public normalize(response: McpResponse): KnowledgeItem[] {
    if (response.status === "error" || !response.data) {
      return [];
    }

    const items: KnowledgeItem[] = [];
    const rawData = response.data as any; // Deliberate cast to handle unknown raw formats

    // Note: The structure of rawData depends on the specific MCP tool.
    // This is a naive normalization mapping. In production, this would use Zod schemas per tool type.
    
    if (Array.isArray(rawData)) {
      rawData.forEach((item, idx) => {
        items.push({
          id: `ki-${response.tool}-${Date.now()}-${idx}`,
          title: item.title || item.name || `Result from ${response.tool}`,
          summary: item.snippet || item.description || item.content || "No summary provided.",
          source: item.source || item.domain || "Unknown Source",
          sourceType: this.mapToolToSourceType(response.tool),
          url: item.url || item.link || "",
          publishedAt: item.date || item.publishedAt || new Date().toISOString(),
          entities: item.entities || [],
          category: "Discovered Intel",
          confidence: item.confidence || 0.85,
          rawReference: item,
        });
      });
    } else if (typeof rawData === "object") {
       items.push({
          id: `ki-${response.tool}-${Date.now()}`,
          title: rawData.title || `Result from ${response.tool}`,
          summary: rawData.summary || rawData.content || "No summary provided.",
          source: rawData.source || "Unknown Source",
          sourceType: this.mapToolToSourceType(response.tool),
          url: rawData.url || "",
          publishedAt: rawData.publishedAt || new Date().toISOString(),
          entities: rawData.entities || [],
          category: "Discovered Intel",
          confidence: rawData.confidence || 0.85,
          rawReference: rawData,
        });
    }

    return items;
  }

  private mapToolToSourceType(tool: string): KnowledgeItem["sourceType"] {
    switch (tool) {
      case "search": return "search";
      case "scrape": return "scrape";
      case "crawl": return "crawl";
      case "wire_discover":
      case "wire_read_action": return "wire";
      case "agentic_search": return "agentic_search";
      default: return "search";
    }
  }
}
