"use client";

import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { IntelCard } from "@/components/IntelCard";
import { RightPanel } from "@/components/RightPanel";

export default function Home() {
  const intelData = [
    {
      id: "sig-001",
      priority: "CRITICAL" as const,
      time: "T-MINUS 02:14:00",
      title: "Anomalous Data Surge Detected in Sector 7 Grid",
      whyItMatters:
        "Traffic patterns indicate a coordinated extraction protocol originating from unknown sub-nodes. Projected system degradation if unmitigated within current cycle.",
      confidenceScore: 98.4,
    },
    {
      id: "sig-002",
      priority: "ELEVATED" as const,
      time: "T-MINUS 05:42:11",
      title: "Predictive Failure: Primary Cooling Array",
      whyItMatters:
        "Thermal thresholds nearing critical operational limits across secondary databanks.",
      confidenceScore: 87.1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKLwfqGU-7iiltpJKwbpmH8zZwNV4rpOtRj2D-RzW56u1WFerfD6MhA-eFvwFnA4kBQmvNtk_PPpX-dXCtbA62z_rx0Goh5Zs0aMF2Mqwv_rG0fHFkHSRXVWOu_Pk-yLBegxUyohbUbC1ZE6aN8O91bMqky637Z2jajenaU3WnSNBOyrJ_FBi_PMW14rOr3GevOIJ4a47mrNwBmpSoi7t1Wz4dMlotqXAMvovjJffYNWSaE1GDyjvA5LHeG_jDWhbIlcvLlVKPI14",
    },
    {
      id: "sig-003",
      priority: "STANDARD" as const,
      time: "T-MINUS 12:00:00",
      title: "Routine Security Protocol Update Available",
      whyItMatters: "",
      confidenceScore: 99.9,
      opacity: "opacity-75",
    },
  ];

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
                <span className="material-symbols-outlined text-sm">sync</span>
                SYNCING...
              </div>
            </div>

            <div className="space-y-6 pb-20">
              {intelData.map((intel) => (
                <IntelCard key={intel.id} {...intel} />
              ))}
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
