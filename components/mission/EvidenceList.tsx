"use client";

import React from "react";

interface EvidenceListProps {
  evidence: string[];
}

export function EvidenceList({ evidence }: EvidenceListProps) {
  return (
    <section className="border border-border-muted bg-surface-slate p-6 mb-8">
      <h2 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-terminal-lime">
          travel_explore
        </span>
        Supporting Evidence
      </h2>
      <div className="space-y-4">
        {evidence.map((item, idx) => (
          <div key={idx} className="p-4 bg-surface-container-high border-l-2 border-border-muted hover:border-terminal-lime transition-colors">
            <p className="font-code-sm text-code-sm text-text-muted break-words">
              {item}
            </p>
          </div>
        ))}
        {evidence.length === 0 && (
          <div className="font-code-sm text-text-muted">NO EVIDENCE EXTRACTED.</div>
        )}
      </div>
    </section>
  );
}
