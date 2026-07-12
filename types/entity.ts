export type EntityType = 
  | "Company"
  | "Organization"
  | "Product"
  | "Technology"
  | "Person"
  | "Country"
  | "ResearchPaper"
  | "GovernmentAgency"
  | "MedicalTerm"
  | "Regulation"
  | "Other";

export interface Entity {
  id: string; // Globally unique identifier for the entity (e.g. hash of normalized name)
  name: string;
  type: EntityType;
  aliases: string[];
  metadata: Record<string, unknown>;
  confidence: number;
  firstSeenAt: string;
  lastSeenAt: string;
  mentionCount: number;
}
