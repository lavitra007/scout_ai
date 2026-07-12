"use client";

import { motion } from "framer-motion";

export function TopNav() {
  return (
    <header className="flex justify-between items-center h-16 px-container-padding border-b border-border-muted bg-background shrink-0">
      <div className="flex items-center gap-4">
        <span className="font-title-sm text-title-sm font-bold text-primary">
          SCOUT_SYSTEM
        </span>
        <span className="w-2 h-2 bg-terminal-lime pulse-node"></span>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative border border-border-muted focus-within:border-terminal-lime transition-colors bg-surface-slate flex items-center h-10 px-3">
          <span className="material-symbols-outlined text-text-muted mr-2">
            search
          </span>
          <input
            type="text"
            className="w-full bg-transparent border-none text-primary focus:outline-none focus:ring-0 font-code-sm text-code-sm placeholder:text-text-muted"
            placeholder="> QUERY_DATABASE..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6 text-text-muted">
        <button className="hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <button className="hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined">power_settings_new</span>
        </button>
      </div>
    </header>
  );
}
