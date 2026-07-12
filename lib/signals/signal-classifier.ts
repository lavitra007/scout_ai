import { RawEvent } from "./types";
import { SignalCategory } from "@/types/signal";

export class SignalClassifier {
  /**
   * Assigns a strict category to each RawEvent based on relationship predicates
   * or the categories of the supporting knowledge items.
   */
  public classify(events: RawEvent[]): void {
    for (const event of events) {
      event.inferredCategory = this.determineCategory(event);
    }
  }

  private determineCategory(event: RawEvent): SignalCategory {
    // 1. If there's a strong primary edge, infer from the predicate
    if (event.primaryEdge) {
      switch (event.primaryEdge.predicate) {
        case "ACQUIRED": return "ACQUISITION";
        case "RELEASED": return "PRODUCT_LAUNCH";
        case "FUNDED": return "FUNDING";
        case "PUBLISHED": return "RESEARCH";
        case "ISSUED": return "REGULATION";
        case "HIRED": return "HIRING";
        case "COMPETES_WITH": return "COMPETITOR_MOVE";
        case "PARTNERED_WITH": return "TREND";
      }
    }

    // 2. Fallback to the dominant category of the supporting knowledge items
    if (event.supportingItems.length > 0) {
      const categoryCounts: Record<string, number> = {};
      for (const item of event.supportingItems) {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      }
      
      const dominant = Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
      );

      // Map KnowledgeCategory to SignalCategory
      switch (dominant) {
        case "Funding": return "FUNDING";
        case "Research": return "RESEARCH";
        case "Competition": return "COMPETITOR_MOVE";
        case "Hiring": return "HIRING";
        case "Government": return "POLICY";
        case "Regulation": return "REGULATION";
        case "Product Launch": return "PRODUCT_LAUNCH";
        case "Acquisition": return "ACQUISITION";
        case "Security": return "SECURITY";
        case "Healthcare": return "TREND"; // Contextual mapping
        case "Policy": return "POLICY";
      }
    }

    // 3. Absolute fallback
    return "OTHER";
  }
}
