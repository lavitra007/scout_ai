import { Entity } from "./entity";
import { Relationship } from "./relationship";
import { KnowledgeItem } from "./knowledge";

export type KnowledgeCategory = 
  | "Funding"
  | "Research"
  | "Competition"
  | "Hiring"
  | "Government"
  | "Regulation"
  | "Product Launch"
  | "Acquisition"
  | "Security"
  | "Healthcare"
  | "Policy"
  | "Other";

export interface GraphMetadata {
  lastUpdated: string;
  totalProcessedItems: number;
  categoryCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  entityCounts: Record<string, number>;
  overallConfidence: number;
}

export interface KnowledgeGraph {
  nodes: Entity[];
  edges: Relationship[];
  events: KnowledgeItem[]; // The deduplicated base knowledge items
  metadata: GraphMetadata;
}
