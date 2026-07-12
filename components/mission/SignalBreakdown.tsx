"use client";

import React from "react";
import { RankedSignal } from "@/types/ranked-signal";
import { useProfile } from "@/lib/profile/profile-context";

interface SignalBreakdownProps {
  rankedSignal: RankedSignal;
}

export function SignalBreakdown({ rankedSignal }: SignalBreakdownProps) {
  const { profile } = useProfile();
  const signal = rankedSignal.signal;

  // Intersect profile interests with signal category/tags conceptually
  // Since we don't have explicit match mapping from the engine output, 
  // we display the inputs that led to this decision.
  return (
    <div className="border border-border-muted bg-surface-container-lowest p-4">
      <h4 className="font-label-caps text-label-caps text-text-muted mb-4 uppercase">
        Signal & Context Mapping
      </h4>
      
      <div className="space-y-4">
        {/* Signal Attributes */}
        <div>
          <div className="font-code-sm text-code-sm text-text-muted mb-1">
            SIGNAL_CATEGORY
          </div>
          <div className="font-body-base text-body-base text-on-surface">
            {signal.category}
          </div>
        </div>
        
        <div>
          <div className="font-code-sm text-code-sm text-text-muted mb-1">
            SIGNAL_IMPORTANCE
          </div>
          <div className="font-body-base text-body-base text-on-surface">
            {(signal.importance * 100).toFixed(0)} / 100
          </div>
        </div>

        {/* Profile Context */}
        <div className="pt-4 border-t border-border-muted">
          <div className="font-code-sm text-code-sm text-text-muted mb-2">
            MATCHED_PROFILE_INTERESTS
          </div>
          <div className="flex flex-wrap gap-2">
            {profile?.interests.map((interest, idx) => (
              <span key={idx} className="px-2 py-1 bg-surface-slate border border-border-muted font-code-sm text-[10px] text-text-muted uppercase">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-code-sm text-code-sm text-text-muted mb-2">
            MATCHED_FOCUS_GOALS
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {profile?.goals.map((goal, idx) => (
              <li key={idx} className="font-code-sm text-[10px] text-text-muted">
                {goal}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
