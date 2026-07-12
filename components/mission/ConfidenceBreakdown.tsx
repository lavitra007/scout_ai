"use client";

import React from "react";
import { RankedSignal } from "@/types/ranked-signal";

interface ConfidenceBreakdownProps {
  rankedSignal: RankedSignal;
}

export function ConfidenceBreakdown({ rankedSignal }: ConfidenceBreakdownProps) {
  return (
    <div className="border border-border-muted bg-surface-container-lowest p-4">
      <h4 className="font-label-caps text-label-caps text-text-muted mb-4 uppercase">
        Confidence Metrics
      </h4>
      <div className="flex flex-col gap-4">
        
        {/* Knowledge Confidence */}
        <div className="border-l-2 border-border-muted pl-3">
          <div className="font-code-sm text-code-sm text-text-muted mb-1">
            KNOWLEDGE_CONFIDENCE
          </div>
          <div className="font-title-sm text-title-sm text-on-surface">
            {(rankedSignal.confidence * 100).toFixed(1)}%
          </div>
          <p className="font-code-sm text-[10px] text-text-muted mt-1">
            Derived from Knowledge Graph structural integrity and edge weights.
          </p>
        </div>

        {/* Overall Confidence */}
        <div className="border-l-2 border-terminal-lime pl-3">
          <div className="font-code-sm text-code-sm text-terminal-lime mb-1">
            OVERALL_CONFIDENCE
          </div>
          <div className="font-title-sm text-title-sm text-primary">
            {(rankedSignal.confidence * 100).toFixed(1)}%
          </div>
          <p className="font-code-sm text-[10px] text-text-muted mt-1">
            Final deterministic confidence accounting for source reliability.
          </p>
        </div>

      </div>
    </div>
  );
}
