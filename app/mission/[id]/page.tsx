"use client";

import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { useMissions } from "@/lib/pipeline/mission-provider";
import { useEffect } from "react";
import { ExecutiveLoading } from "@/components/mission/ExecutiveLoading";
import { ExecutiveBrief } from "@/components/mission/ExecutiveBrief";

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const { missions, loadExecutiveBrief, executiveLoading, executiveBriefs, executiveError } = useMissions();
  
  const mission = missions.find(m => m.id === params.id);
  
  useEffect(() => {
    if (mission && (mission.priority === "CRITICAL" || mission.priority === "HIGH")) {
      loadExecutiveBrief(mission.id);
    }
  }, [mission]);

  if (!mission) {
    return (
      <div className="bg-background text-on-background font-body-base antialiased h-screen flex items-center justify-center">
        <span className="font-code-sm text-text-muted">MISSION_NOT_FOUND</span>
      </div>
    );
  }

  const isExecutiveTarget = mission.priority === "CRITICAL" || mission.priority === "HIGH";
  const isLoading = executiveLoading[mission.id];
  const brief = executiveBriefs[mission.id];
  const error = executiveError[mission.id];
  return (
    <div className="bg-background text-on-background font-body-base antialiased h-screen overflow-hidden flex">
      <Sidebar />
      <main className="ml-[280px] w-[calc(100%-280px)] h-full flex flex-col relative z-10 overflow-y-auto">
        <TopNav />

        {/* Header Area */}
        <header className="px-container-padding py-6 border-b border-border-muted bg-surface-dim">
          <nav className="flex items-center gap-2 text-text-muted font-code-sm text-code-sm uppercase mb-6">
            <Link
              href="/"
              className="hover:text-terminal-lime transition-colors hover:bg-surface-slate px-2 py-1 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                arrow_back
              </span>
              Back to Feed
            </Link>
            <span>/</span>
            <span className="text-on-surface">Signal Deep Dive</span>
          </nav>

          {/* Title & Meta */}
          <div className="flex flex-col gap-4">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary uppercase break-words">
              {mission.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 font-code-sm text-code-sm text-terminal-lime uppercase">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-border-muted">
                <span className="material-symbols-outlined text-[16px]">
                  schedule
                </span>
                Synthesized {new Date(mission.createdAt).toLocaleDateString()} {new Date(mission.createdAt).toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-terminal-lime text-terminal-lime">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                Confidence: {Math.round(mission.confidence * 100)}%
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-border-muted text-text-muted">
                <span className="material-symbols-outlined text-[16px]">
                  dns
                </span>
                Source: {mission.sources.length > 0 ? `${mission.sources.length} Data Nodes` : "Internal Aggregation"}
              </div>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 p-container-padding max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 pb-section-gap pt-6 mx-auto">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Dynamic Executive Intelligence Block */}
            {isExecutiveTarget ? (
              <>
                {isLoading && <ExecutiveLoading />}
                {error && (
                  <div className="border border-error/50 bg-error-container/10 p-4 font-code-sm text-error">
                    [ERROR] {error}
                  </div>
                )}
                {brief && !isLoading && <ExecutiveBrief brief={brief} />}
              </>
            ) : (
              /* Standard Mission Detail (For Medium/Low priority) */
              <section className="border border-border-muted bg-surface-slate p-6">
                <h2 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-terminal-lime">
                    notes
                  </span>
                  Mission Summary
                </h2>
                <p className="font-body-base text-body-base text-text-body mb-4">
                  {mission.summary}
                </p>
                <div className="mt-6">
                  <h4 className="font-label-caps text-label-caps text-text-muted mb-2">WHY THIS MATTERS</h4>
                  <p className="font-body-base text-body-base text-text-body border-l-2 border-border-muted pl-4">
                    {mission.whyRelevant}
                  </p>
                </div>
              </section>
            )}

            {/* Signal Evolution (Timeline) */}
            <section className="border border-border-muted bg-surface-slate p-6">
              <h2 className="font-title-sm text-title-sm text-primary uppercase mb-6 border-b border-border-muted pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-terminal-lime">
                  timeline
                </span>
                Signal Evolution
              </h2>
              <div className="relative border-l border-border-muted ml-3 space-y-6">
                {/* Timeline Item 1 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-surface-slate border border-terminal-lime -left-[6.5px] top-1"></div>
                  <div className="font-code-sm text-code-sm text-text-muted mb-1">
                    T-48 HOURS
                  </div>
                  <div className="font-title-sm text-title-sm text-on-surface mb-2">
                    Initial Anomaly Detected
                  </div>
                  <p className="text-text-muted font-body-base text-body-base">
                    Unusual traffic patterns observed across distributed ledger nodes in sector 4. Latency dropped below physical limits of legacy routing.
                  </p>
                </div>
                {/* Timeline Item 2 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-surface-slate border border-terminal-lime -left-[6.5px] top-1"></div>
                  <div className="font-code-sm text-code-sm text-text-muted mb-1">
                    T-24 HOURS
                  </div>
                  <div className="font-title-sm text-title-sm text-on-surface mb-2">
                    Pattern Correlation
                  </div>
                  <p className="text-text-muted font-body-base text-body-base">
                    Pattern matched against historical hardware rollout signatures. 89% correlation with covert infrastructure upgrades.
                  </p>
                </div>
                {/* Timeline Item 3 (Active) */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-terminal-lime crt-glow -left-[6.5px] top-1"></div>
                  <div className="font-code-sm text-code-sm text-terminal-lime mb-1">
                    CURRENT
                  </div>
                  <div className="font-title-sm text-title-sm text-primary mb-2">
                    Mass Deployment Verified
                  </div>
                  <p className="text-on-surface font-body-base text-body-base">
                    Multiple corroborating sources confirm large-scale activation of new edge-processing protocols.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar Metadata & Actions) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Action Card */}
            <section className="border border-terminal-lime bg-surface-container-high p-6 crt-glow-box">
              <h3 className="font-title-sm text-title-sm text-primary uppercase mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-terminal-lime">
                  warning
                </span>
                Suggested Strategic Action
              </h3>
              <p className="font-body-base text-body-base text-on-surface mb-6">
                {mission.recommendedAction}
              </p>
              {!isExecutiveTarget && (
                <button className="w-full bg-terminal-lime text-background font-label-caps text-label-caps uppercase py-3 px-4 hover:bg-background hover:text-terminal-lime hover:border hover:border-terminal-lime transition-all duration-150 ease-in-out border border-transparent">
                  {">"} EXECUTE STANDARD RESPONSE
                </button>
              )}
              <button className="w-full mt-3 bg-background text-on-surface font-label-caps text-label-caps uppercase py-3 px-4 border border-border-muted hover:border-on-surface transition-all duration-150 ease-in-out">
                {">"} ARCHIVE SIGNAL
              </button>
            </section>

            {/* Related Entities */}
            <section className="border border-border-muted bg-surface-slate flex flex-col">
              <div className="p-4 border-b border-border-muted font-label-caps text-label-caps text-text-muted uppercase">
                Detected Entities ({mission.relatedEntities.length})
              </div>
              <div className="flex flex-col">
                {mission.relatedEntities.map((entity, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-b border-border-muted hover:bg-surface-container-high transition-colors group flex items-start gap-3"
                  >
                    <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime transition-colors">
                      category
                    </span>
                    <div>
                      <div className="font-code-sm text-code-sm text-text-muted mb-1">
                        TYPE: {entity.type}
                      </div>
                      <div className="font-body-base text-body-base text-on-surface group-hover:text-terminal-lime transition-colors">
                        {entity.name}
                      </div>
                    </div>
                  </div>
                ))}
                {mission.relatedEntities.length === 0 && (
                  <div className="p-4 font-code-sm text-text-muted">NO ENTITIES DETECTED.</div>
                )}
              </div>
            </section>

            {/* Raw Data Dump */}
            <section className="border border-border-muted bg-[#0e0e0e] p-4">
              <div className="font-label-caps text-label-caps text-text-muted uppercase mb-2">
                Raw Data Dump (Snippet)
              </div>
              <pre className="font-code-sm text-code-sm text-text-muted overflow-x-auto p-2 bg-background border border-border-muted text-[10px]">
                0x8F9A2B: INIT EDGE_ROUTINE{"\n"}
                0x8F9A2C: LOAD_BALANCER OVERRIDE{"\n"}
                0x8F9A2D: LATENCY_THRESHOLD {"<"} 0.5ms{"\n"}
                0x8F9A2E: CONFIRM NODE_HANDSHAKE{"\n"}
                0x8F9A2F: STATUS = ACTIVE_MESH
              </pre>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
