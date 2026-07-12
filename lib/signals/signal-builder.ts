import { Signal } from "@/types/signal";
import { RawEvent } from "./types";

export class SignalBuilder {
  /**
   * Produces strictly typed Signal objects from the filtered RawEvents.
   */
  public build(events: RawEvent[]): Signal[] {
    return events.map((event, index) => {
      
      // Determine overall confidence based on supporting items
      const confidence = event.supportingItems.length > 0
        ? event.supportingItems.reduce((sum, item) => sum + item.confidence, 0) / event.supportingItems.length
        : 0.5;

      return {
        id: `sig_${Date.now()}_${index}`,
        type: this.determineType(event),
        title: this.generateTitle(event),
        summary: this.generateSummary(event),
        category: event.inferredCategory || "OTHER",
        confidence: Math.min(0.99, confidence),
        importance: Math.min(0.99, event.inferredImportance),
        sourceEntities: event.involvedEntities,
        relatedKnowledge: event.supportingItems,
        timestamp: event.detectedAt,
        metadata: {
          edgeId: event.primaryEdge?.id,
          sourceCount: event.supportingItems.length
        }
      };
    });
  }

  private determineType(event: RawEvent): Signal["type"] {
    const cat = event.inferredCategory;
    if (cat === "PRODUCT_LAUNCH" || cat === "FUNDING" || cat === "ACQUISITION") return "OPPORTUNITY";
    if (cat === "SECURITY" || cat === "REGULATION" || cat === "COMPETITOR_MOVE") return "THREAT";
    return "NEUTRAL";
  }

  private generateTitle(event: RawEvent): string {
    // In a real system, an LLM would synthesize a beautiful title here.
    // For this deterministic MVP, we concatenate entities and predicates.
    if (event.primaryEdge) {
      const source = event.involvedEntities.find(e => e.id === event.primaryEdge?.sourceEntityId);
      const target = event.involvedEntities.find(e => e.id === event.primaryEdge?.targetEntityId);
      
      if (source && target) {
        return `${source.name} ${event.primaryEdge.predicate.replace(/_/g, " ")} ${target.name}`;
      }
    }

    // Fallback: Use the title of the highest confidence supporting item
    if (event.supportingItems.length > 0) {
      const bestItem = event.supportingItems.reduce((a, b) => a.confidence > b.confidence ? a : b);
      return bestItem.title;
    }

    return `Significant ${event.inferredCategory} Event Detected`;
  }

  private generateSummary(event: RawEvent): string {
    // Similarly, use the summary of the best supporting item for the MVP
    if (event.supportingItems.length > 0) {
      const bestItem = event.supportingItems.reduce((a, b) => a.confidence > b.confidence ? a : b);
      return bestItem.summary;
    }
    
    return "Multiple cross-references detected indicating a significant shift in this domain.";
  }
}
