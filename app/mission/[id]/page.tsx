"use client";

import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";

export default function MissionDetailPage() {
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
              Anomalous Data Surge Detected in Sector 7 Grid
            </h1>
            <div className="flex flex-wrap items-center gap-4 font-code-sm text-code-sm text-terminal-lime uppercase">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-border-muted">
                <span className="material-symbols-outlined text-[16px]">
                  schedule
                </span>
                Synthesized Today 08:42 AM
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-terminal-lime text-terminal-lime">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                Confidence: 98.4%
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant border border-border-muted text-text-muted">
                <span className="material-symbols-outlined text-[16px]">
                  dns
                </span>
                Source: Multi-Node Aggregation
              </div>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 p-container-padding max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 pb-section-gap pt-6 mx-auto">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Executive Summary */}
            <section className="border border-border-muted bg-surface-slate p-6">
              <h2 className="font-title-sm text-title-sm text-primary uppercase mb-4 border-b border-border-muted pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-terminal-lime">
                  notes
                </span>
                Executive Summary
              </h2>
              <p className="font-body-base text-body-base text-text-body mb-4">
                Traffic patterns indicate a coordinated extraction protocol originating from unknown sub-nodes. Projected system degradation if unmitigated within current cycle. This development significantly outpaces current industry projections and suggests an unannounced breakthrough in localized hardware acceleration by a major player.
              </p>
              <p className="font-body-base text-body-base text-text-body">
                The implications for real-time autonomous systems, particularly in hostile or high-interference environments, are profound. The signal cluster points towards a unified deployment strategy currently rolling out across tier-2 infrastructure nodes.
              </p>
            </section>

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
                Immediate reconfiguration of local processing protocols is recommended to maintain parity. Initiate shadow-node deployment sequence.
              </p>
              <button className="w-full bg-terminal-lime text-background font-label-caps text-label-caps uppercase py-3 px-4 hover:bg-background hover:text-terminal-lime hover:border hover:border-terminal-lime transition-all duration-150 ease-in-out border border-transparent">
                {">"} INITIATE PROTOCOL OMEGA
              </button>
              <button className="w-full mt-3 bg-background text-on-surface font-label-caps text-label-caps uppercase py-3 px-4 border border-border-muted hover:border-on-surface transition-all duration-150 ease-in-out">
                {">"} ARCHIVE SIGNAL
              </button>
            </section>

            {/* Corroborating Sources */}
            <section className="border border-border-muted bg-surface-slate flex flex-col">
              <div className="p-4 border-b border-border-muted font-label-caps text-label-caps text-text-muted uppercase">
                Corroborating Sources (3)
              </div>
              <div className="flex flex-col">
                <a
                  href="#"
                  className="p-4 border-b border-border-muted hover:bg-surface-container-high transition-colors group flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime transition-colors">
                    feed
                  </span>
                  <div>
                    <div className="font-code-sm text-code-sm text-text-muted mb-1">
                      SIGINT-Alpha-99
                    </div>
                    <div className="font-body-base text-body-base text-on-surface group-hover:text-terminal-lime transition-colors">
                      Hardware Manifest Intercept
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="p-4 border-b border-border-muted hover:bg-surface-container-high transition-colors group flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime transition-colors">
                    satellite_alt
                  </span>
                  <div>
                    <div className="font-code-sm text-code-sm text-text-muted mb-1">
                      GEO-Sat-Telemetry
                    </div>
                    <div className="font-body-base text-body-base text-on-surface group-hover:text-terminal-lime transition-colors">
                      Thermal Signature Spikes - Data Centers
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="p-4 hover:bg-surface-container-high transition-colors group flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-text-muted group-hover:text-terminal-lime transition-colors">
                    code
                  </span>
                  <div>
                    <div className="font-code-sm text-code-sm text-text-muted mb-1">
                      DarkNet Forum Scrape
                    </div>
                    <div className="font-body-base text-body-base text-on-surface group-hover:text-terminal-lime transition-colors">
                      Firmware Reverse Engineering Thread
                    </div>
                  </div>
                </a>
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
