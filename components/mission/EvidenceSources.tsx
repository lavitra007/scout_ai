"use client";

import React from "react";
import { KnowledgeItem } from "@/types/knowledge";

interface EvidenceSourcesProps {
  sources: KnowledgeItem[];
}

export function EvidenceSources({ sources }: EvidenceSourcesProps) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-border-muted bg-surface-container-lowest p-4">
      <h4 className="font-label-caps text-label-caps text-text-muted mb-4 uppercase">
        Raw Evidence Sources ({sources.length})
      </h4>
      
      {sources.length === 0 ? (
        <div className="font-code-sm text-text-muted p-4 border border-border-muted bg-surface-slate text-center">
          NO DIRECT SOURCES ATTACHED.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source) => (
            <div key={source.id} className="border border-border-muted bg-surface-slate p-3 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-code-sm text-[10px] text-text-muted bg-surface-variant px-1 border border-border-muted">
                  {source.type}
                </span>
                <span className="font-code-sm text-[10px] text-terminal-lime">
                  CONF: {Math.round(source.confidence * 100)}%
                </span>
              </div>
              
              <div className="font-body-base text-body-base text-on-surface line-clamp-2">
                {source.content}
              </div>
              
              {source.sourceUrl && (
                <div className="font-code-sm text-[10px] text-text-muted truncate">
                  SRC: {source.sourceUrl}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
