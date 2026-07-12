"use client";

import React from "react";
import { RankedSignal } from "@/types/ranked-signal";

interface ScoreBreakdownProps {
  rankedSignal: RankedSignal;
}

export function ScoreBreakdown({ rankedSignal }: ScoreBreakdownProps) {
  const scores = [
    { label: "BUSINESS_IMPACT", value: rankedSignal.businessImpact },
    { label: "PERSONAL_RELEVANCE", value: rankedSignal.personalRelevance },
    { label: "FRESHNESS", value: rankedSignal.freshness },
    { label: "RELIABILITY", value: rankedSignal.sourceReliability },
  ];

  return (
    <div className="border border-border-muted bg-surface-container-lowest p-4">
      <h4 className="font-label-caps text-label-caps text-text-muted mb-4 uppercase">
        Opportunity Score Vectors
      </h4>
      <div className="space-y-4">
        {scores.map((score, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex justify-between font-code-sm text-code-sm">
              <span className="text-on-surface">{score.label}</span>
              <span className="text-terminal-lime">
                {(score.value * 100).toFixed(1)}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-surface-slate overflow-hidden">
              <div 
                className="h-full bg-terminal-lime" 
                style={{ width: `${score.value * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border-muted flex justify-between items-center font-code-sm text-code-sm">
        <span className="text-text-muted">FINAL_OPPORTUNITY_SCORE</span>
        <span className="text-primary text-base">
          {rankedSignal.opportunityScore.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
