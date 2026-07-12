import { KnowledgeItem } from "@/types/knowledge";

export class Deduplicator {
  /**
   * Merges duplicate information from different sources.
   * Two articles describing the same event should become one Knowledge Event.
   */
  public deduplicate(items: KnowledgeItem[]): KnowledgeItem[] {
    const uniqueItems: KnowledgeItem[] = [];
    
    // Sort by publication date descending so we prefer the freshest content as base
    const sorted = [...items].sort((a, b) => {
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return timeB - timeA;
    });

    for (const item of sorted) {
      const duplicate = this.findDuplicate(item, uniqueItems);
      
      if (duplicate) {
        // Merge strategy: Keep the base, boost confidence, merge entities
        duplicate.confidence = Math.min(0.99, duplicate.confidence + 0.05);
        duplicate.entities = Array.from(new Set([...duplicate.entities, ...item.entities]));
        // In a real system, we might append the source URL to a 'corroboratingSources' array
      } else {
        uniqueItems.push({ ...item });
      }
    }

    return uniqueItems;
  }

  private findDuplicate(target: KnowledgeItem, existing: KnowledgeItem[]): KnowledgeItem | undefined {
    // Exact URL match (same article scraped twice)
    const exactMatch = existing.find(e => e.url === target.url && target.url !== "");
    if (exactMatch) return exactMatch;

    // Content signature match (different URL, highly similar title)
    // For MVP, we do a naive string similarity on the title
    return existing.find(e => this.calculateTitleSimilarity(e.title, target.title) > 0.85);
  }

  private calculateTitleSimilarity(title1: string, title2: string): number {
    const t1 = title1.toLowerCase().trim();
    const t2 = title2.toLowerCase().trim();
    if (t1 === t2) return 1.0;
    
    // Naive jaccard similarity on words
    const w1 = new Set(t1.split(/\s+/));
    const w2 = new Set(t2.split(/\s+/));
    
    const intersection = new Set([...w1].filter(x => w2.has(x)));
    const union = new Set([...w1, ...w2]);
    
    return intersection.size / union.size;
  }
}
