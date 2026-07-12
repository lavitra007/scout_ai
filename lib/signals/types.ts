import { Entity } from "@/types/entity";
import { Relationship } from "@/types/relationship";
import { KnowledgeItem } from "@/types/knowledge";
import { SignalCategory } from "@/types/signal";

export interface RawEvent {
  id: string;
  primaryEdge?: Relationship;
  involvedEntities: Entity[];
  supportingItems: KnowledgeItem[];
  detectedAt: string;
  inferredCategory?: SignalCategory;
  inferredImportance: number;
}
