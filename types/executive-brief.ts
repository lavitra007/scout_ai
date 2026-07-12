export interface ExecutiveBrief {
  missionId: string;
  executiveSummary: string;
  strategicImpact: string;
  opportunities: string[];
  risks: string[];
  recommendedNextSteps: string[];
  supportingEvidence: string[];
  confidence: number; // 0.0 to 1.0
  generatedAt: string;
}
