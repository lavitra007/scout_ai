"use client";

import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { IntelCard } from "@/components/IntelCard";
import { RightPanel } from "@/components/RightPanel";
import { useMissions } from "@/lib/pipeline/mission-provider";
import { PipelineStateFormatter } from "@/lib/pipeline/pipeline-state";

export default function Home() {
  const { missions, loading, pipelineState } = useMissions();

  return (
    <div className="bg-background text-on-background font-body-base antialiased h-screen overflow-hidden flex">
      <Sidebar />
      <main className="ml-[280px] w-[calc(100%-280px)] h-full flex flex-col relative z-10">
        <TopNav />

        {/* Dashboard Layout */}
        <div className="flex-1 overflow-hidden flex">
          {/* Center: Feed Column */}
          <section className="flex-1 overflow-y-auto p-container-padding border-r border-border-muted bg-surface-dim">
            <div className="flex justify-between items-end mb-8 border-b border-border-muted pb-4">
              <div>
                <h2 className="font-title-sm text-title-sm text-primary mb-1">
                  LIVE_INTELLIGENCE_STREAM
                </h2>
                <p className="font-code-sm text-code-sm text-text-muted">
                  POLLING INTERVAL: 1.5s | FILTER: ALL
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-terminal-lime flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    {PipelineStateFormatter.getLoadingMessage(pipelineState)}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    SYNC_COMPLETE
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6 pb-20">
              {loading && missions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border border-border-muted border-dashed">
                  <span className="material-symbols-outlined text-4xl text-terminal-lime mb-4 animate-spin">sync</span>
                  <p className="font-code-sm text-text-muted">{PipelineStateFormatter.getLoadingMessage(pipelineState)}</p>
                </div>
              ) : missions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border border-border-muted border-dashed">
                  <p className="font-code-sm text-text-muted">NO MISSIONS DETECTED FOR CURRENT PROFILE.</p>
                </div>
              ) : (
                missions.map((mission) => (
                  <IntelCard 
                    key={mission.id}
                    id={mission.id}
                    priority={mission.priority}
                    time={new Date(mission.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    title={mission.title}
                    whyItMatters={mission.whyRelevant}
                    confidenceScore={Math.round(mission.confidence * 100)}
                    opacity={mission.priority === "LOW" ? "opacity-75" : ""}
                  />
                ))
              )}
            </div>
          </section>

          {/* Right: Status & Analytics Column */}
          <RightPanel />
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center py-4 px-container-padding bg-surface-container-lowest border-t border-border-muted shrink-0">
          <div className="font-code-sm text-code-sm text-text-muted">
            © 2024 SCOUT INTELLIGENCE UNIT. KERNEL v4.1.9-LTS
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-all"
            >
              Documentation
            </a>
            <a
              href="#"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-all"
            >
              System Logs
            </a>
            <a
              href="#"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-all"
            >
              Privacy Protocol
            </a>
            <a
              href="#"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-all"
            >
              Terms of Service
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
