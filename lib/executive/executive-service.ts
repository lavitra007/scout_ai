import { ExecutiveBrief } from "@/types/executive-brief";
import { executeAgenticSearch } from "@/services/anakin/research";
import { ExecutivePrompts } from "./executive-prompts";
import { Mission } from "@/types/mission";

export class ExecutiveService {
  /**
   * Executes the agentic search and normalizes the response into an ExecutiveBrief.
   */
  public async researchMission(mission: Mission, contextString: string): Promise<ExecutiveBrief> {
    const prompt = ExecutivePrompts.buildResearchPrompt(contextString);
    
    // Call the Anakin MCP tool wrapper
    const rawResponse = await executeAgenticSearch(prompt);

    return this.parseAndNormalize(mission.id, rawResponse);
  }

  /**
   * Safely parses the LLM output into the strict ExecutiveBrief type.
   */
  private parseAndNormalize(missionId: string, rawResponse: any): ExecutiveBrief {
    // Attempt to parse if string
    let parsed: any = rawResponse;
    if (typeof rawResponse === "string") {
      try {
        parsed = JSON.parse(rawResponse);
      } catch (e) {
        console.warn("Failed to parse agentic_search JSON. Attempting fallback extraction...", e);
        // Fallback for LLM hallucinated markdown ticks
        const match = rawResponse.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (match && match[1]) {
          try {
            parsed = JSON.parse(match[1]);
          } catch (e2) {
             throw new Error("Critical Failure: Agentic Search did not return valid JSON.");
          }
        }
      }
    }

    return {
      missionId,
      executiveSummary: parsed?.executiveSummary || "Summary unavailable.",
      strategicImpact: parsed?.strategicImpact || "Strategic impact analysis unavailable.",
      opportunities: Array.isArray(parsed?.opportunities) ? parsed.opportunities : [],
      risks: Array.isArray(parsed?.risks) ? parsed.risks : [],
      recommendedNextSteps: Array.isArray(parsed?.recommendedNextSteps) ? parsed.recommendedNextSteps : [],
      supportingEvidence: Array.isArray(parsed?.supportingEvidence) ? parsed.supportingEvidence : [],
      confidence: typeof parsed?.confidence === "number" ? parsed.confidence : 0.8,
      generatedAt: new Date().toISOString()
    };
  }
}
