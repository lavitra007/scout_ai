"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { executionMonitor } from "@/lib/monitor/execution-monitor";
import { ExecutionEvent } from "@/types/execution";

export function RightPanel() {
  const [events, setEvents] = useState<ExecutionEvent[]>([]);

  useEffect(() => {
    const unsubscribe = executionMonitor.subscribe((latestEvents) => {
      // In a real app we might only keep the last 50 events to prevent DOM bloat
      setEvents(latestEvents.slice(-50));
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS": return "text-terminal-lime";
      case "ERROR": return "text-error";
      case "RUNNING": return "text-on-surface animate-pulse";
      default: return "text-text-muted";
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case "SUCCESS": return "border-terminal-lime";
      case "ERROR": return "border-error";
      case "RUNNING": return "border-on-surface animate-pulse";
      default: return "border-border-muted";
    }
  };

  return (
    <aside className="w-[360px] overflow-y-auto p-container-padding bg-background border-l border-border-muted flex flex-col h-full">
      
      {/* Execution Console Header */}
      <div className="border border-border-muted mb-4 bg-surface-container-lowest shrink-0">
        <div className="bg-surface-container-high p-3 border-b border-border-muted flex justify-between items-center">
          <h3 className="font-label-caps text-label-caps text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              terminal
            </span>
            LIVE_EXECUTION_CONSOLE
          </h3>
          <span className="w-2 h-2 bg-terminal-lime pulse-node"></span>
        </div>
      </div>

      {/* Live Event Stream */}
      <div className="flex-1 overflow-y-auto border border-border-muted bg-surface-slate relative">
        <div className="absolute inset-0 p-4 font-code-sm text-code-sm flex flex-col gap-3">
          {events.length === 0 ? (
            <div className="text-text-muted">WAITING FOR PIPELINE EXECUTION...</div>
          ) : (
            <AnimatePresence initial={false}>
              {events.map((evt) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-1 border-l-2 pl-3 pb-2"
                  style={{ borderColor: "var(--color-border-muted)" }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted text-[10px]">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
                    </span>
                    {evt.duration !== undefined && (
                      <span className="text-text-muted text-[10px] bg-surface-variant px-1 border border-border-muted">
                        {evt.duration}ms
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-1 text-[10px] uppercase border ${getStatusBorder(evt.status)} ${getStatusColor(evt.status)}`}>
                      [{evt.stage}]
                    </span>
                  </div>
                  
                  <div className={`break-words ${getStatusColor(evt.status)}`}>
                    {">"} {evt.message}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </aside>
  );
}
