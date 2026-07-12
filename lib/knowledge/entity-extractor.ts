import { KnowledgeItem } from "@/types/knowledge";
import { Entity, EntityType } from "@/types/entity";

export class EntityExtractor {
  /**
   * Extracts distinct entities from an array of KnowledgeItems.
   * This is a deterministic heuristic-based implementation.
   */
  public extract(items: KnowledgeItem[]): Entity[] {
    const entityMap = new Map<string, Entity>();

    for (const item of items) {
      // 1. Process explicit entities provided by the MCP Normalizer
      for (const entityName of item.entities) {
        this.addOrUpdateEntity(entityMap, entityName, item);
      }

      // 2. Perform naive heuristic extraction on title and summary
      const titleEntities = this.heuristicallyExtract(item.title);
      for (const name of titleEntities) {
        this.addOrUpdateEntity(entityMap, name, item);
      }
    }

    return Array.from(entityMap.values());
  }

  private addOrUpdateEntity(map: Map<string, Entity>, rawName: string, sourceItem: KnowledgeItem): void {
    const normalizedName = rawName.trim();
    if (!normalizedName) return;
    
    // Naive ID generation (lowercased)
    const id = `ent_${normalizedName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    
    if (map.has(id)) {
      const existing = map.get(id)!;
      existing.mentionCount += 1;
      // Update lastSeenAt if the new item is newer
      if (sourceItem.publishedAt && new Date(sourceItem.publishedAt) > new Date(existing.lastSeenAt)) {
        existing.lastSeenAt = sourceItem.publishedAt;
      }
    } else {
      map.set(id, {
        id,
        name: normalizedName,
        type: this.guessEntityType(normalizedName),
        aliases: [],
        metadata: {},
        confidence: 0.7, // Base confidence for heuristic extraction
        firstSeenAt: sourceItem.publishedAt || new Date().toISOString(),
        lastSeenAt: sourceItem.publishedAt || new Date().toISOString(),
        mentionCount: 1,
      });
    }
  }

  private heuristicallyExtract(text: string): string[] {
    // A highly simplified regex-based capital word extractor for MVP
    // e.g. "Apple released the new iPhone" -> ["Apple", "iPhone"]
    const regex = /([A-Z][a-z0-9]+(?:\s[A-Z][a-z0-9]+)*)/g;
    const matches = text.match(regex);
    if (!matches) return [];

    // Filter out common stop words at start of sentences
    const stopWords = new Set(["The", "A", "An", "In", "On", "At", "To", "This", "That"]);
    return Array.from(new Set(matches.filter(m => !stopWords.has(m) && m.length > 2)));
  }

  private guessEntityType(name: string): EntityType {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("inc") || lowerName.includes("corp") || lowerName.includes("llc")) return "Company";
    if (lowerName.includes("agency") || lowerName.includes("department")) return "GovernmentAgency";
    if (lowerName.includes("act") || lowerName.includes("regulation") || lowerName.includes("gdpr")) return "Regulation";
    if (lowerName.includes("algorithm") || lowerName.includes("api") || lowerName.includes("ai")) return "Technology";
    return "Other";
  }
}
