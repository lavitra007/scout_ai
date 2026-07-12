import { KnowledgeItem } from "@/types/knowledge";
import { Entity } from "@/types/entity";
import { Relationship } from "@/types/relationship";
import { KnowledgeGraph, GraphMetadata } from "@/types/knowledge-graph";

export class GraphBuilder {
  /**
   * Constructs the final strictly typed KnowledgeGraph structure.
   */
  public build(
    items: KnowledgeItem[], 
    entities: Entity[], 
    relationships: Relationship[], 
    overallConfidence: number
  ): KnowledgeGraph {
    
    const metadata: GraphMetadata = {
      lastUpdated: new Date().toISOString(),
      totalProcessedItems: items.length,
      categoryCounts: this.countCategories(items),
      sourceCounts: this.countSources(items),
      entityCounts: this.countEntityTypes(entities),
      overallConfidence,
    };

    return {
      nodes: entities,
      edges: relationships,
      events: items, // The deduplicated base knowledge events
      metadata,
    };
  }

  private countCategories(items: KnowledgeItem[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private countSources(items: KnowledgeItem[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private countEntityTypes(entities: Entity[]): Record<string, number> {
    return entities.reduce((acc, entity) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
