export interface AnakinScrapeResponse {
  markdown?: string;
  json?: Record<string, unknown>;
  status: number;
}

export interface AnakinSearchResponse {
  results: {
    url: string;
    title: string;
    snippet: string;
    date?: string;
  }[];
}

export interface WireAction {
  action_id: string;
  type: "read" | "write";
  auth_mode: "none" | "optional" | "required";
}
