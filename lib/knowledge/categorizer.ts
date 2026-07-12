import { KnowledgeItem } from "@/types/knowledge";
import { KnowledgeCategory } from "@/types/knowledge-graph";

export class Categorizer {
  /**
   * Assigns a strict category to each KnowledgeItem based on content signatures.
   */
  public categorize(items: KnowledgeItem[]): void {
    for (const item of items) {
      item.category = this.determineCategory(item);
    }
  }

  private determineCategory(item: KnowledgeItem): KnowledgeCategory {
    // If the MCP orchestration layer already applied a known category, respect it
    const validCategories = [
      "Funding", "Research", "Competition", "Hiring", "Government",
      "Regulation", "Product Launch", "Acquisition", "Security", "Healthcare", "Policy", "Other"
    ];
    
    if (validCategories.includes(item.category)) {
      return item.category as KnowledgeCategory;
    }

    const content = `${item.title} ${item.summary}`.toLowerCase();

    if (content.includes("fund") || content.includes("raise") || content.includes("series a") || content.includes("capital")) {
      return "Funding";
    }
    if (content.includes("acquire") || content.includes("buyout") || content.includes("merger")) {
      return "Acquisition";
    }
    if (content.includes("launch") || content.includes("release") || content.includes("announce")) {
      return "Product Launch";
    }
    if (content.includes("research") || content.includes("paper") || content.includes("study")) {
      return "Research";
    }
    if (content.includes("hack") || content.includes("breach") || content.includes("vulnerabilit")) {
      return "Security";
    }
    if (content.includes("fda") || content.includes("health") || content.includes("medical")) {
      return "Healthcare";
    }
    if (content.includes("act ") || content.includes("law") || content.includes("gdpr") || content.includes("regulat")) {
      return "Regulation";
    }
    if (content.includes("compete") || content.includes("rival") || content.includes("vs")) {
      return "Competition";
    }
    if (content.includes("hire") || content.includes("join") || content.includes("appoint")) {
      return "Hiring";
    }
    if (content.includes("gov") || content.includes("senate") || content.includes("policy")) {
      return "Government"; // Or Policy depending on nuance
    }

    return "Other";
  }
}
