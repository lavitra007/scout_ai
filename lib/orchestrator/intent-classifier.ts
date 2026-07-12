import { MissionContext } from "@/types/profile";
import { MissionIntent } from "@/types/orchestrator";

/**
 * Infers the actual intent of the mission from the MissionContext.
 */
export class IntentClassifier {
  public classify(context: MissionContext): MissionIntent {
    // This is a naive heuristic-based classification for MVP.
    // Future iterations will use an LLM for classification.

    const joinedFocus = context.focus.join(" ").toLowerCase();
    const joinedGoals = context.goals.join(" ").toLowerCase();
    const fullText = joinedFocus + " " + joinedGoals;

    if (
      fullText.includes("compare") ||
      fullText.includes("vs") ||
      fullText.includes("research") ||
      fullText.includes("deep dive")
    ) {
      return "DEEP_COMPARATIVE_RESEARCH";
    }

    if (
      fullText.includes("price") ||
      fullText.includes("product") ||
      fullText.includes("sku") ||
      fullText.includes("amazon")
    ) {
      return "PRODUCT_LOOKUP";
    }

    if (
      fullText.includes("person") ||
      fullText.includes("linkedin") ||
      fullText.includes("profile") ||
      fullText.includes("executive")
    ) {
      return "PROFILE_LOOKUP";
    }

    if (
      fullText.includes("extract") ||
      fullText.includes("structure") ||
      fullText.includes("json") ||
      fullText.includes("data from")
    ) {
      return "STRUCTURED_DATA_EXTRACTION";
    }

    if (
      fullText.includes("entire site") ||
      fullText.includes("crawl") ||
      fullText.includes("discover all pages")
    ) {
      return "SITE_WIDE_DISCOVERY";
    }

    if (
      fullText.includes("latest") ||
      fullText.includes("news") ||
      fullText.includes("recent") ||
      fullText.includes("announcement")
    ) {
      return "LATEST_INFORMATION";
    }

    // Default to LATEST_INFORMATION if intent is ambiguous
    return "LATEST_INFORMATION";
  }
}
