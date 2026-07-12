"use client";

import React from "react";
import { motion } from "framer-motion";

export function ExecutiveLoading() {
  return (
    <div className="border border-terminal-lime border-dashed bg-[#0e0e0e] p-8 flex flex-col items-center justify-center my-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-4"
      >
        <span className="material-symbols-outlined text-4xl text-terminal-lime">
          radar
        </span>
      </motion.div>
      <h3 className="font-title-sm text-title-sm text-terminal-lime uppercase mb-2">
        Compiling Executive Brief
      </h3>
      <p className="font-code-sm text-code-sm text-text-muted animate-pulse text-center">
        INITIATING AGENTIC_SEARCH PROTOCOL...<br/>
        SYNTHESIZING STRATEGIC VECTORS...
      </p>
    </div>
  );
}
