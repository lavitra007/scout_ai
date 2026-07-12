"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProfile } from "@/lib/profile/profile-context";

export default function LandingPage() {
  const { profile } = useProfile();
  
  const targetRoute = profile ? "/dashboard" : "/onboarding";
  return (
    <div className="bg-background text-on-background min-h-screen font-body-base antialiased flex flex-col selection:bg-terminal-lime selection:text-black">
      {/* Navbar Layout */}
      <header className="border-b border-border-muted bg-background/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-container-padding max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-terminal-lime">
              terminal
            </span>
            <span className="font-title-sm text-title-sm text-primary">
              SCOUT_SYSTEM
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a
              href="#features"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime transition-colors"
            >
              Features
            </a>
            <a
              href="#specs"
              className="font-code-sm text-code-sm text-text-muted hover:text-terminal-lime transition-colors"
            >
              Specs
            </a>
          </nav>
          <div>
            {profile ? (
              <Link href="/dashboard">
                <button className="bg-surface-slate border border-border-muted text-primary px-4 py-2 font-code-sm text-code-sm hover:border-white transition-colors">
                  {">"} ENTER DASHBOARD
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="min-h-[819px] flex flex-col justify-center px-container-padding py-section-gap relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-variant/20 via-background/80 to-background"></div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl border-l-2 border-terminal-lime pl-6 md:pl-10 relative"
          >
            <div className="absolute -left-[9px] top-0 w-3.5 h-3.5 bg-terminal-lime animate-pulse"></div>
            <h2 className="font-label-caps text-label-caps text-terminal-lime mb-6">
              SYS.INIT // SCOUT.AI.V2
            </h2>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary uppercase leading-tight mb-8">
              Discover the Unseen.<br />
              <span className="text-surface-variant line-through decoration-terminal-lime decoration-4">
                IGNORE NOISE.
              </span>
              <br />
              Unleash Raw Data Power.
            </h1>
            <p className="font-code-sm text-code-sm text-text-muted max-w-2xl mb-12">
              High-performance data intelligence platform. Hardware-accelerated
              efficiency for power users demanding raw signal over decorative
              fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href={targetRoute}>
                <button className="bg-terminal-lime text-black border border-terminal-lime px-8 py-4 font-title-sm text-title-sm crt-glow-box hover:bg-black hover:text-terminal-lime transition-all flex items-center gap-3">
                  {">"} INITIATE NODE
                  <span className="material-symbols-outlined">bolt</span>
                </button>
              </Link>
              <button className="bg-black text-primary border border-border-muted px-8 py-4 font-title-sm text-title-sm hover:border-white transition-all flex items-center gap-3 group">
                {">"} READ DOCS
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">
                  description
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border-muted pt-8"
            id="specs"
          >
            <div>
              <div className="font-label-caps text-label-caps text-text-muted mb-1">
                LATENCY
              </div>
              <div className="font-code-sm text-code-sm text-terminal-lime">
                {"<"} 12ms
              </div>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-text-muted mb-1">
                UPTIME
              </div>
              <div className="font-code-sm text-code-sm text-primary">
                99.999%
              </div>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-text-muted mb-1">
                NODES
              </div>
              <div className="font-code-sm text-code-sm text-primary">
                14,204 Active
              </div>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-text-muted mb-1">
                THROUGHPUT
              </div>
              <div className="font-code-sm text-code-sm text-primary">
                4.2 TB/s
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Bento Grid */}
        <section className="px-container-padding py-section-gap" id="features">
          <div className="flex items-center gap-4 mb-12 border-b border-border-muted pb-4">
            <span className="material-symbols-outlined text-terminal-lime">
              memory
            </span>
            <h3 className="font-headline-md text-headline-md text-primary">
              CORE CAPABILITIES
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 auto-rows-[300px] bg-border-muted border border-border-muted">
            {/* GLOBAL INGESTION */}
            <div className="bg-surface-slate p-8 flex flex-col justify-between group hover:bg-surface-container-high transition-colors lg:col-span-2">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-terminal-lime transition-colors">
                  public
                </span>
                <div className="w-2 h-2 bg-terminal-lime rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-primary mb-2">
                  {">"} GLOBAL INGESTION
                </h4>
                <p className="font-code-sm text-code-sm text-text-muted mb-6">
                  Massive scale data collection across fragmented networks.
                  Real-time stream processing with zero packet loss.
                </p>
                <div className="flex gap-4 font-label-caps text-label-caps text-text-muted">
                  <span className="border border-border-muted px-2 py-1">
                    TCP/UDP
                  </span>
                  <span className="border border-border-muted px-2 py-1">
                    WSS
                  </span>
                  <span className="border border-border-muted px-2 py-1">
                    gRPC
                  </span>
                </div>
              </div>
            </div>

            {/* NEURAL PROCESSING */}
            <div className="bg-surface-slate p-8 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-terminal-lime transition-colors">
                  psychology
                </span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-primary mb-2">
                  {">"} NEURAL PROCESSING
                </h4>
                <p className="font-code-sm text-code-sm text-text-muted mb-6">
                  On-the-fly semantic analysis using edge-deployed LLM clusters.
                </p>
                <div className="h-1 bg-surface w-full mb-1">
                  <div className="h-full bg-terminal-lime w-[85%]"></div>
                </div>
                <div className="font-code-sm text-code-sm text-text-muted text-right">
                  CPU LOAD 85%
                </div>
              </div>
            </div>

            {/* TARGET LOCK */}
            <div className="bg-surface-slate p-8 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-terminal-lime transition-colors">
                  track_changes
                </span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-primary mb-2">
                  {">"} TARGET LOCK
                </h4>
                <p className="font-code-sm text-code-sm text-text-muted">
                  Precision entity tracking across distinct datasets. Immutable
                  correlation IDs.
                </p>
              </div>
            </div>

            {/* ANOMALY DETECTION */}
            <div className="bg-surface-slate p-8 flex flex-col justify-between group hover:bg-surface-container-high transition-colors lg:col-span-2 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHT-XG2CuF2MpvPy83XN_fmN6YvqAnlCBAqoCATV72pr3gYDWXtG_ghdX9Ed2Pghm5AJr0UYZayQL_xyDwuV3Vb3QARkTz8VbcdGioZtvXgW4ow7--BTa5aQtRVHZkuzZYpabCmjCjqIbF1SpHDHBobvOTrvlIUoE360DilVnUVm0mlbBB9XJRLbvuPA3EZN4xDZC65NCcpZ8d7iA3Va2CA66pMGQdX4Kfxcs-tO978VCFxdmWFptO2P_tQHrdfc2urPd2bBuRf5I')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-error transition-colors">
                  troubleshoot
                </span>
                <div className="px-2 py-1 bg-error-container text-on-error-container font-label-caps text-label-caps border border-error">
                  ALERT: ACTIVE
                </div>
              </div>
              <div className="relative z-10">
                <h4 className="font-title-sm text-title-sm text-primary mb-2">
                  {">"} ANOMALY DETECTION
                </h4>
                <p className="font-code-sm text-code-sm text-text-muted">
                  Identify deviations in petabyte-scale streams before they
                  propagate. Thresholds automatically adjust based on historical
                  entropy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-muted bg-surface-container-lowest mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-container-padding max-w-7xl mx-auto gap-4">
          <div className="font-code-sm text-code-sm text-text-muted">
            © 2024 SCOUT INTELLIGENCE UNIT. KERNEL v4.1.9-LTS
          </div>
          <div className="flex gap-6 font-code-sm text-code-sm">
            <a
              href="#"
              className="text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-colors"
            >
              System Logs
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-colors"
            >
              Privacy Protocol
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-terminal-lime underline-offset-4 hover:underline transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
