import { PriorityLevel } from "./ranked-signal";
import { SignalCategory } from "./signal";
import { Entity } from "./entity";
import { KnowledgeItem } from "./knowledge";

export type MissionStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DISCARDED";

export interface Mission {
  id: string;
  title: string;
  summary: string;
  category: SignalCategory;
  priority: PriorityLevel;
  opportunityScore: number;
  confidence: number;
  importance: number;
  whyRelevant: string;
  recommendedAction: string;
  relatedSignals: string[]; // IDs of the underlying signals
  relatedEntities: Entity[];
  sources: KnowledgeItem[];
  status: MissionStatus;
  createdAt: string;
  updatedAt: string;
}
