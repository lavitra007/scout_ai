"use client";

import React from "react";

interface RiskAnalysisProps {
  opportunities: string[];
  risks: string[];
}

export function RiskAnalysis({ opportunities, risks }: RiskAnalysisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Opportunities */}
      <section className="border border-border-muted bg-surface-slate p-6">
        <h3 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-terminal-lime">
            trending_up
          </span>
          Vulnerabilities / Opportunities
        </h3>
        <ul className="space-y-4">
          {opportunities.map((opp, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-terminal-lime font-code-sm">{"[+]"}</span>
              <p className="font-body-base text-body-base text-text-body">{opp}</p>
            </li>
          ))}
          {opportunities.length === 0 && (
            <li className="text-text-muted font-code-sm">NO OPPORTUNITIES IDENTIFIED.</li>
          )}
        </ul>
      </section>

      {/* Risks */}
      <section className="border border-border-muted bg-surface-slate p-6">
        <h3 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">
            warning
          </span>
          Strategic Risks
        </h3>
        <ul className="space-y-4">
          {risks.map((risk, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-error font-code-sm">{"[-]"}</span>
              <p className="font-body-base text-body-base text-text-body">{risk}</p>
            </li>
          ))}
          {risks.length === 0 && (
            <li className="text-text-muted font-code-sm">NO RISKS IDENTIFIED.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
