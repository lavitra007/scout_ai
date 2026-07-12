export class ExecutivePrompts {
  /**
   * Generates the strict instruction prompt for the agentic search tool.
   * Forces the LLM to return a perfectly formatted JSON structure.
   */
  public static buildResearchPrompt(contextString: string): string {
    return `
You are an elite Executive Intelligence Analyst.
Your objective is to deeply research the provided Mission Context and return an ExecutiveBrief.
You MUST rely on live web data and verified sources.

${contextString}

=== INSTRUCTIONS ===
1. Analyze the strategic impact of this mission on the user's Organization and Role.
2. Identify 2-3 concrete Opportunities.
3. Identify 2-3 concrete Risks.
4. Recommend 3 distinct Next Steps.
5. Provide 2-3 bullet points of Supporting Evidence based on your research.

=== OUTPUT FORMAT ===
You MUST return ONLY valid JSON matching this exact structure, with no markdown formatting or backticks:
{
  "executiveSummary": "A concise 2-3 sentence summary.",
  "strategicImpact": "Detailed analysis of why this matters to the user.",
  "opportunities": ["Opp 1", "Opp 2"],
  "risks": ["Risk 1", "Risk 2"],
  "recommendedNextSteps": ["Step 1", "Step 2", "Step 3"],
  "supportingEvidence": ["Evidence 1", "Evidence 2"]
}
`.trim();
  }
}
