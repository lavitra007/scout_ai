"use client";

import React from "react";
import { ExecutiveBrief as ExecutiveBriefType } from "@/types/executive-brief";
import { StrategicImpact } from "./StrategicImpact";
import { RiskAnalysis } from "./RiskAnalysis";
import { EvidenceList } from "./EvidenceList";

interface ExecutiveBriefProps {
  brief: ExecutiveBriefType;
}

export function ExecutiveBrief({ brief }: ExecutiveBriefProps) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      
      {/* Generated At Tag */}
      <div className="flex justify-end">
        <span className="font-code-sm text-[10px] text-text-muted uppercase border border-border-muted px-2 py-1">
          EXEC_GEN: {new Date(brief.generatedAt).toLocaleString()} | CONF: {Math.round(brief.confidence * 100)}%
        </span>
      </div>

      <StrategicImpact 
        executiveSummary={brief.executiveSummary}
        strategicImpact={brief.strategicImpact}
      />
      
      <RiskAnalysis 
        opportunities={brief.opportunities}
        risks={brief.risks}
      />

      <EvidenceList 
        evidence={brief.supportingEvidence}
      />
      
      {/* Next Steps (Action Block) */}
      <section className="border border-terminal-lime bg-surface-container-high p-6 crt-glow-box">
        <h3 className="font-title-sm text-title-sm text-primary uppercase mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-terminal-lime">
            add_task
          </span>
          Recommended Executive Actions
        </h3>
        <ul className="space-y-4 mb-6">
          {brief.recommendedNextSteps.map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-terminal-lime font-code-sm">{">"}</span>
              <p className="font-body-base text-body-base text-on-surface">{step}</p>
            </li>
          ))}
        </ul>
        <button className="w-full bg-terminal-lime text-background font-label-caps text-label-caps uppercase py-3 px-4 hover:bg-background hover:text-terminal-lime hover:border hover:border-terminal-lime transition-all duration-150 ease-in-out border border-transparent">
          {">"} INITIATE PRIMARY PROTOCOL
        </button>
      </section>

    </div>
  );
}
