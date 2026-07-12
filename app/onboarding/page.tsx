"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "FND-01",
      name: "> FOUNDER",
      icon: "rocket_launch",
      description: "Strategic oversight. Focus on market synthesis, competitor telemetry, and runway optimization.",
    },
    {
      id: "INV-02",
      name: "> INVESTOR",
      icon: "monitoring",
      description: "Capital deployment. Focus on deal flow velocity, macro trends, and portfolio health metrics.",
    },
    {
      id: "RSH-03",
      name: "> RESEARCHER",
      icon: "science",
      description: "Deep analysis. Unfiltered access to raw data streams, academic publications, and edge-case modeling.",
    },
    {
      id: "ENG-04",
      name: "> ENGINEER",
      icon: "terminal",
      description: "Technical execution. API architecture, system diagnostics, and integration topography.",
    },
    {
      id: "ANL-05",
      name: "> ANALYST",
      icon: "troubleshoot",
      description: "Pattern recognition. Focus on anomaly detection, historical backtesting, and predictive scoring.",
    },
    {
      id: "OPR-06",
      name: "> OPERATIVE",
      icon: "blur_on",
      description: "Custom parameters. Standard intelligence feed with manual heuristic overrides enabled.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-body-base text-body-base">
      {/* Ambient scanning line */}
      <motion.div
        className="absolute left-0 w-full h-1 bg-terminal-lime opacity-20 z-0 shadow-[0_0_15px_#ccff00]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />

      {/* Main Container */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-background border border-border-muted relative z-10 flex flex-col shadow-2xl"
      >
        {/* Header / Progress */}
        <header className="border-b border-border-muted p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-slate">
          <div>
            <h1 className="font-title-sm text-title-sm text-primary tracking-widest uppercase">
              SCOUT_SYSTEM // INIT
            </h1>
            <p className="font-code-sm text-code-sm text-text-muted mt-1">
              MODULE_01: IDENTITY_CLASSIFICATION
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="font-label-caps text-label-caps text-text-muted">
              STEP 01/08
            </span>
            <div className="flex-grow md:w-48 h-2 bg-surface-container border border-border-muted overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-terminal-lime w-[12.5%] transition-all duration-500 shadow-[0_0_10px_rgba(204,255,0,0.5)]"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow">
            WHO ARE YOU?
          </h2>
          <p className="font-code-sm text-code-sm text-text-muted mb-12 max-w-lg">
            Select primary operational profile. This designation determines default
            heuristic analysis models and data density presentation.
          </p>

          {/* Grid of Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`border p-6 flex flex-col items-start text-left cursor-pointer group focus:outline-none transition-all duration-200 ${
                    isSelected
                      ? "border-terminal-lime bg-surface-container-high crt-glow-box"
                      : "border-border-muted bg-surface-container-lowest hover:bg-surface-slate hover:border-text-muted"
                  }`}
                >
                  <div
                    className={`icon-container mb-4 transition-colors ${
                      isSelected ? "text-terminal-lime" : "text-text-muted"
                    }`}
                  >
                    <span className="material-symbols-outlined text-4xl">
                      {role.icon}
                    </span>
                  </div>
                  <h3
                    className={`font-title-sm text-title-sm mb-2 transition-colors ${
                      isSelected ? "text-terminal-lime" : "text-primary"
                    }`}
                  >
                    {role.name}
                  </h3>
                  <p className="font-code-sm text-code-sm text-text-muted group-hover:text-inverse-surface transition-colors">
                    {role.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border-muted w-full font-code-sm text-code-sm text-text-muted opacity-50 flex justify-between">
                    <span>SYS.ID: {role.id}</span>
                    <span>{isSelected ? "[ACTIVE]" : "[SELECT]"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Footer */}
        <footer className="border-t border-border-muted p-6 bg-surface-container-lowest flex justify-between items-center mt-auto">
          <button className="px-6 py-3 border border-border-muted bg-background text-primary font-label-caps text-label-caps hover:bg-surface-bright hover:border-text-muted transition-all duration-200">
            [ BACK ]
          </button>
          <button
            disabled={!selectedRole}
            className={`px-6 py-3 font-label-caps text-label-caps transition-all duration-200 border ${
              selectedRole
                ? "bg-terminal-lime text-background border-transparent hover:bg-background hover:text-terminal-lime hover:border-terminal-lime crt-glow-box cursor-pointer"
                : "bg-terminal-lime text-background border-transparent opacity-50 cursor-not-allowed"
            }`}
          >
            {">"} CONTINUE_SEQUENCE
          </button>
        </footer>
      </motion.main>
    </div>
  );
}
