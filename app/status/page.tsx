"use client";

import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";

export default function StatusPage() {
  return (
    <div className="bg-background text-on-background font-body-base antialiased h-screen overflow-hidden flex">
      <Sidebar />
      <main className="ml-[280px] w-[calc(100%-280px)] h-full flex flex-col relative z-10">
        <TopNav />
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-surface-dim">
           <div className="text-center border border-border-muted border-dashed p-12">
             <span className="material-symbols-outlined text-6xl text-terminal-lime mb-4 block">construction</span>
             <h2 className="font-headline-md text-primary mb-2 crt-glow">MODULE_OFFLINE</h2>
             <p className="font-code-sm text-text-muted">System Status dashboard is currently under construction.</p>
           </div>
        </div>
      </main>
    </div>
  );
}
