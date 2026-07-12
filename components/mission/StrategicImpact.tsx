"use client";

import React from "react";

interface StrategicImpactProps {
  executiveSummary: string;
  strategicImpact: string;
}

export function StrategicImpact({ executiveSummary, strategicImpact }: StrategicImpactProps) {
  return (
    <section className="border border-border-muted bg-surface-slate p-6 mb-8">
      <h2 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-terminal-lime">
          insights
        </span>
        Executive Summary & Strategic Impact
      </h2>
      
      <div className="mb-6">
        <h4 className="font-label-caps text-label-caps text-text-muted mb-2">
          SUMMARY
        </h4>
        <p className="font-body-base text-body-base text-text-body">
          {executiveSummary}
        </p>
      </div>

      <div>
        <h4 className="font-label-caps text-label-caps text-text-muted mb-2">
          STRATEGIC IMPACT
        </h4>
        <p className="font-body-base text-body-base text-text-body border-l-2 border-terminal-lime pl-4">
          {strategicImpact}
        </p>
      </div>
    </section>
  );
}
