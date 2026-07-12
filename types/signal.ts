import { Entity } from "./entity";
import { KnowledgeItem } from "./knowledge";

export type SignalCategory =
  | "PRODUCT_LAUNCH"
  | "FUNDING"
  | "RESEARCH"
  | "REGULATION"
  | "SECURITY"
  | "HIRING"
  | "COMPETITOR_MOVE"
  | "ACQUISITION"
  | "POLICY"
  | "TREND"
  | "BREAKING"
  | "OTHER";

export interface Signal {
  id: string;
  type: "OPPORTUNITY" | "THREAT" | "NEUTRAL";
  title: string;
  summary: string;
  category: SignalCategory;
  confidence: number;
  importance: number; // 0.0 to 1.0 (1.0 = Critical)
  sourceEntities: Entity[];
  relatedKnowledge: KnowledgeItem[];
  timestamp: string;
  metadata: Record<string, unknown>;
}
