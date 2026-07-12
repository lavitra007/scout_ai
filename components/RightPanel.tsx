"use client";

import { motion } from "framer-motion";

export function RightPanel() {
  return (
    <aside className="w-[360px] overflow-y-auto p-container-padding bg-background border-l border-border-muted">
      {/* Summary Box */}
      <div className="border border-border-muted mb-8 bg-surface-container-lowest">
        <div className="bg-surface-container-high p-3 border-b border-border-muted">
          <h3 className="font-label-caps text-label-caps text-primary">
            {">"} TODAY'S_SUMMARY
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-end border-b border-border-muted pb-2">
            <span className="font-code-sm text-code-sm text-text-muted">
              THREATS_NEUTRALIZED
            </span>
            <span className="font-title-sm text-title-sm text-primary">
              1,402
            </span>
          </div>
          <div className="flex justify-between items-end border-b border-border-muted pb-2">
            <span className="font-code-sm text-code-sm text-text-muted">
              DATA_PROCESSED (TB)
            </span>
            <span className="font-title-sm text-title-sm text-primary">
              847.3
            </span>
          </div>
          <div className="flex justify-between items-end pb-2">
            <span className="font-code-sm text-code-sm text-text-muted">
              SYSTEM_INTEGRITY
            </span>
            <span className="font-title-sm text-title-sm text-terminal-lime">
              OPTIMAL
            </span>
          </div>
        </div>
      </div>

      {/* Latency Graph */}
      <div className="border border-border-muted mb-8 bg-surface-container-lowest">
        <div className="bg-surface-container-high p-3 border-b border-border-muted flex justify-between items-center">
          <h3 className="font-label-caps text-label-caps text-primary">
            {">"} NODE_LATENCY
          </h3>
          <span className="w-2 h-2 bg-terminal-lime pulse-node"></span>
        </div>
        <div className="p-4">
          <div className="h-32 border border-border-muted bg-surface-slate relative flex items-end px-2 pt-2 gap-1 overflow-hidden">
            {/* Simulated Graph Bars */}
            <div className="w-full bg-terminal-lime/20 h-[40%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[60%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[30%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[80%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[50%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[90%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-error/20 h-[95%] border-t border-error transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[45%] border-t border-terminal-lime transition-all"></div>
            <div className="w-full bg-terminal-lime/20 h-[20%] border-t border-terminal-lime transition-all"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-code-sm text-code-sm text-text-muted">
              AVG: 12ms
            </span>
            <span className="font-code-sm text-code-sm text-error">
              PEAK: 142ms
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-border-muted bg-surface-container-lowest">
        <div className="bg-surface-container-high p-3 border-b border-border-muted">
          <h3 className="font-label-caps text-label-caps text-primary">
            {">"} AI_RECOMMENDATIONS
          </h3>
        </div>
        <ul className="p-0 m-0 divide-y divide-border-muted">
          <li className="p-4 hover:bg-surface-slate cursor-pointer group">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime text-base mt-0.5">
                memory
              </span>
              <div>
                <p className="font-code-sm text-code-sm text-primary mb-1">
                  Re-route processing power to Cluster Alpha.
                </p>
                <span className="font-code-sm text-code-sm text-text-muted text-[10px]">
                  IMPACT: +14% EFFICIENCY
                </span>
              </div>
            </div>
          </li>
          <li className="p-4 hover:bg-surface-slate cursor-pointer group">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime text-base mt-0.5">
                security
              </span>
              <div>
                <p className="font-code-sm text-code-sm text-primary mb-1">
                  Initiate deep scan on external subroutines.
                </p>
                <span className="font-code-sm text-code-sm text-text-muted text-[10px]">
                  IMPACT: RISK MITIGATION
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
