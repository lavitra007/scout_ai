"use client";

import React, { useState } from "react";
import { RankedSignal } from "@/types/ranked-signal";
import { Mission } from "@/types/mission";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { ConfidenceBreakdown } from "./ConfidenceBreakdown";
import { SignalBreakdown } from "./SignalBreakdown";
import { EvidenceSources } from "./EvidenceSources";

interface DecisionTraceProps {
  mission: Mission;
  rankedSignal?: RankedSignal;
}

export function DecisionTrace({ mission, rankedSignal }: DecisionTraceProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!rankedSignal) {
    return null; // Silent degrade if intercept failed
  }

  return (
    <section className="mt-8 border border-border-muted bg-background">
      {/* Header / Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-surface-container-high hover:bg-surface-slate transition-colors border-b border-border-muted"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-muted">
            account_tree
          </span>
          <h3 className="font-label-caps text-label-caps text-primary uppercase">
            Explainability Trace
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-code-sm text-[10px] text-text-muted">
            VIEW_DETERMINISTIC_VECTORS
          </span>
          <span className="material-symbols-outlined text-text-muted">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </div>
      </button>

      {/* Content Body */}
      {isOpen && (
        <div className="p-6 bg-surface-slate animate-in slide-in-from-top-2 duration-200">
          <div className="mb-6 pb-4 border-b border-border-muted">
            <h4 className="font-title-sm text-title-sm text-on-surface mb-2">
              Why was this Mission generated?
            </h4>
            <p className="font-body-base text-body-base text-text-muted">
              Scout AI is strictly deterministic. This mission exists because the underlying signal 
              achieved an Opportunity Score of <strong>{rankedSignal.opportunityScore.toFixed(1)}</strong>, 
              surpassing the dynamic priority threshold. No LLMs were used to generate this score.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Scores */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <ScoreBreakdown rankedSignal={rankedSignal} />
              <ConfidenceBreakdown rankedSignal={rankedSignal} />
            </div>

            {/* Middle Column: Signal & Profile Context */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <SignalBreakdown rankedSignal={rankedSignal} />
              <EvidenceSources sources={mission.sources} />
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
