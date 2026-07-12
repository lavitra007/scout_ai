export type RelationshipPredicate = 
  | "RELEASED"
  | "ACQUIRED"
  | "PUBLISHED"
  | "ISSUED"
  | "RELATED_TO"
  | "COMPETES_WITH"
  | "HIRED"
  | "FUNDED"
  | "PARTNERED_WITH";

export interface Relationship {
  id: string; // Unique ID for the relationship edge
  sourceEntityId: string;
  targetEntityId: string;
  predicate: RelationshipPredicate;
  confidence: number;
  evidence: string[]; // List of KnowledgeItem IDs that support this relationship
  discoveredAt: string;
  metadata: Record<string, unknown>;
}
