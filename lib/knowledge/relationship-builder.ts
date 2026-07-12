import { KnowledgeItem } from "@/types/knowledge";
import { Entity } from "@/types/entity";
import { Relationship, RelationshipPredicate } from "@/types/relationship";

export class RelationshipBuilder {
  /**
   * Infers relationships between extracted entities based on their shared context
   * within a KnowledgeItem.
   */
  public build(entities: Entity[], items: KnowledgeItem[]): Relationship[] {
    const relationships: Relationship[] = [];
    const entityLookup = new Map(entities.map(e => [e.name.toLowerCase(), e]));

    for (const item of items) {
      const content = `${item.title} ${item.summary}`.toLowerCase();
      
      // Find all entities mentioned in this item
      const presentEntities = entities.filter(e => content.includes(e.name.toLowerCase()));
      
      if (presentEntities.length < 2) continue;

      // Naive O(N^2) pairwise relation check for entities in the same item
      for (let i = 0; i < presentEntities.length; i++) {
        for (let j = i + 1; j < presentEntities.length; j++) {
          const source = presentEntities[i];
          const target = presentEntities[j];
          
          const predicate = this.inferPredicate(content, source, target);
          
          if (predicate) {
            relationships.push({
              id: `rel_${source.id}_${predicate}_${target.id}_${item.id}`,
              sourceEntityId: source.id,
              targetEntityId: target.id,
              predicate,
              confidence: 0.6, // Base confidence for heuristic relationship inference
              evidence: [item.id],
              discoveredAt: item.publishedAt || new Date().toISOString(),
              metadata: {}
            });
          }
        }
      }
    }

    // Optional: Group and merge duplicate relationships
    return this.deduplicateRelationships(relationships);
  }

  private inferPredicate(text: string, source: Entity, target: Entity): RelationshipPredicate | null {
    // This looks for relationship keywords appearing between the two entities
    // E.g. "... Apple acquired Google ..."
    const sName = source.name.toLowerCase();
    const tName = target.name.toLowerCase();
    
    const sIdx = text.indexOf(sName);
    const tIdx = text.indexOf(tName);
    
    if (sIdx === -1 || tIdx === -1) return null;
    
    // Only check if they are somewhat close to each other in the text
    if (Math.abs(sIdx - tIdx) > 150) return null;

    const span = sIdx < tIdx 
      ? text.substring(sIdx + sName.length, tIdx) 
      : text.substring(tIdx + tName.length, sIdx);

    if (span.includes("acquire") || span.includes("buy") || span.includes("purchase")) return "ACQUIRED";
    if (span.includes("release") || span.includes("launch") || span.includes("announce")) return "RELEASED";
    if (span.includes("publish") || span.includes("paper")) return "PUBLISHED";
    if (span.includes("fund") || span.includes("invest")) return "FUNDED";
    if (span.includes("partner") || span.includes("collab")) return "PARTNERED_WITH";
    if (span.includes("hire") || span.includes("join")) return "HIRED";
    if (span.includes("issue") || span.includes("pass")) return "ISSUED";
    if (span.includes("compete") || span.includes("versus") || span.includes("vs")) return "COMPETES_WITH";

    // If they appear in the same sentence/context but no specific verb matches
    return "RELATED_TO";
  }

  private deduplicateRelationships(rels: Relationship[]): Relationship[] {
    const map = new Map<string, Relationship>();
    
    for (const rel of rels) {
      // Create a unique key for the edge regardless of direction (for symmetric predicates)
      // or strict direction for asymmetric ones. Here we just use a strict directional key.
      const key = `${rel.sourceEntityId}_${rel.predicate}_${rel.targetEntityId}`;
      
      if (map.has(key)) {
        const existing = map.get(key)!;
        existing.confidence = Math.min(0.99, existing.confidence + 0.1);
        if (!existing.evidence.includes(rel.evidence[0])) {
          existing.evidence.push(rel.evidence[0]);
        }
      } else {
        map.set(key, rel);
      }
    }
    
    return Array.from(map.values());
  }
}
