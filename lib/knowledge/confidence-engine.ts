import { KnowledgeItem } from "@/types/knowledge";
import { Entity } from "@/types/entity";
import { Relationship } from "@/types/relationship";

export class ConfidenceEngine {
  /**
   * Computes comprehensive confidence scores across the graph.
   */
  public compute(items: KnowledgeItem[], entities: Entity[], relationships: Relationship[]): number {
    
    // 1. Evaluate Item Confidence (Freshness + Source Reliability)
    for (const item of items) {
      const freshness = this.computeFreshness(item.publishedAt);
      const sourceRel = this.computeSourceReliability(item.source);
      
      // Weight: Base 40%, Freshness 30%, Source 30%
      item.confidence = (item.confidence * 0.4) + (freshness * 0.3) + (sourceRel * 0.3);
    }

    // 2. Evaluate Entity Confidence (Mention Count + Source Items Confidence)
    for (const entity of entities) {
      // Base confidence gets boosted slightly by mention counts
      const mentionBoost = Math.min(0.2, entity.mentionCount * 0.05);
      entity.confidence = Math.min(0.99, entity.confidence + mentionBoost);
    }

    // 3. Evaluate Relationship Confidence (Evidence breadth)
    for (const rel of relationships) {
      // More evidence = higher confidence
      const evidenceBoost = Math.min(0.3, rel.evidence.length * 0.1);
      rel.confidence = Math.min(0.99, rel.confidence + evidenceBoost);
    }

    // Return the Overall Graph Confidence (average of item confidences)
    if (items.length === 0) return 0;
    const totalItemConf = items.reduce((sum, item) => sum + item.confidence, 0);
    return totalItemConf / items.length;
  }

  private computeFreshness(dateStr?: string): number {
    if (!dateStr) return 0.5; // Unknown freshness
    
    const ageMs = Date.now() - new Date(dateStr).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);

    if (ageDays < 1) return 1.0;
    if (ageDays < 7) return 0.9;
    if (ageDays < 30) return 0.8;
    if (ageDays < 90) return 0.6;
    return 0.4;
  }

  private computeSourceReliability(source: string): number {
    // Hardcoded authoritative sources for MVP
    const authoritative = ["reuters.com", "bloomberg.com", "wsj.com", "ft.com", "fda.gov", "sec.gov"];
    const s = source.toLowerCase();
    
    if (authoritative.some(auth => s.includes(auth))) return 0.95;
    
    return 0.7; // Default reliability
  }
}
