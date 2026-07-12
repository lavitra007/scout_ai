export interface KnowledgeItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceType: "search" | "crawl" | "scrape" | "wire" | "agentic_search";
  url: string;
  publishedAt?: string;
  entities: string[];
  category: string;
  confidence: number;
  metadata?: Record<string, unknown>;
  rawReference: unknown; // The raw MCP output stored for auditing/debugging
}
