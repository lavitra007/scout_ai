export type Priority = "High" | "Medium" | "Low";

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  importance: Priority;
  confidenceScore: number; // 0-100
  whyItMatters: string;
  suggestedAction: string;
  sources: { title: string; url: string }[];
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  industry: string;
  topics: string[];
  competitors: string[];
  goals: string[];
  ignoreList: string[];
}
