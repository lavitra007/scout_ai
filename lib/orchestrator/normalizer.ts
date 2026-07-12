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

    let rawData = response.data as any; // Deliberate cast to handle unknown raw formats

    // Robust array extraction: Many live APIs wrap results in an object.
    if (!Array.isArray(rawData) && typeof rawData === "object" && rawData !== null) {
      // Look for the first array in the object values
      const potentialArray = Object.values(rawData).find(val => Array.isArray(val));
      if (potentialArray) {
        rawData = potentialArray;
      }
    }

    const items: KnowledgeItem[] = [];

    if (Array.isArray(rawData)) {
      rawData.forEach((item, idx) => {
        items.push(this.mapSingleItem(item, response.tool, idx));
      });
    } else if (typeof rawData === "object" && rawData !== null) {
       items.push(this.mapSingleItem(rawData, response.tool, 0));
    }

    return items;
  }

  private mapSingleItem(item: any, tool: string, idx: number): KnowledgeItem {
    return {
      id: `ki-${tool}-${Date.now()}-${idx}`,
      title: item.title || item.name || item.heading || `Result from ${tool}`,
      summary: item.snippet || item.description || item.content || item.text || "No summary provided.",
      source: item.source || item.domain || item.url || "Unknown Source",
      sourceType: this.mapToolToSourceType(tool),
      url: item.url || item.link || item.href || "",
      publishedAt: item.date || item.publishedAt || item.timestamp || new Date().toISOString(),
      entities: Array.isArray(item.entities) ? item.entities : [],
      category: "Discovered Intel",
      confidence: typeof item.confidence === "number" ? item.confidence : 0.85,
      rawReference: item,
    };
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
