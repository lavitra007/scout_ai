"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-container-padding py-3 transition-all duration-150 ease-in-out border-l-2 font-label-caps text-label-caps ${
      isActive
        ? "bg-surface-variant text-terminal-lime border-terminal-lime"
        : "text-text-muted border-transparent hover:bg-surface-container-high hover:text-terminal-lime"
    }`;
  };

  return (
    <nav className="fixed left-0 h-screen w-[280px] bg-background border-r border-border-muted flex flex-col z-50">
      {/* Header */}
      <div className="p-container-padding border-b border-border-muted">
        <div className="flex items-center gap-3 mb-4">
          <img
            alt="Root System Avatar"
            className="w-10 h-10 border border-border-muted object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDenYywqS8UdCpuzIPKiNj2LcLRM3aKbFDGWChMfW-O3IKfu452VIxGSvHUQsW4Tm6PVMTP0wcdrTmCjkOTwa4Id9DhpYglzMfaBd_vFvdvjN5HURvSVi4-99WcBLbwfXr7Z6B2Zexj8fgTGbiSLEMoEcKiBaQ1FsC9wILxhJxmK61-XxDy4AW6bl8Qjr_bmyrj81R2KD_XyYSMd6zrIGgngX-3QH13vzBArsrX9n9yzRk0WuztvowcPhQpF5Rl0Wd1tWf0E5nL6cc"
          />
          <div>
            <h1 className="font-display-lg text-title-sm text-primary">
              SCOUT TERMINAL
            </h1>
            <p className="font-code-sm text-code-sm text-text-muted">
              V2.0.4-STABLE
            </p>
          </div>
        </div>
        <button className="w-full bg-terminal-lime text-background font-label-caps text-label-caps py-3 px-4 border border-terminal-lime hover:bg-background hover:text-terminal-lime transition-all duration-150 ease-in-out crt-glow text-left flex justify-between items-center group">
          <span>{">"} INITIALIZE SEARCH</span>
          <span className="w-2 h-2 bg-background group-hover:bg-terminal-lime"></span>
        </button>
      </div>

      {/* Main Tabs */}
      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="flex flex-col space-y-1">
          <li>
            <Link href="/" className={getLinkClasses("/")}>
              <span className="material-symbols-outlined">radar</span>
              Intelligence Feed
            </Link>
          </li>
          <li>
            <Link href="/protocols" className={getLinkClasses("/protocols")}>
              <span className="material-symbols-outlined">terminal</span>
              Saved Protocols
            </Link>
          </li>
          <li>
            <Link href="/settings" className={getLinkClasses("/settings")}>
              <span className="material-symbols-outlined">settings</span>
              System Settings
            </Link>
          </li>
          <li>
            <Link href="/onboarding" className={getLinkClasses("/onboarding")}>
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Mission Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer Tabs */}
      <div className="border-t border-border-muted p-4">
        <ul className="flex flex-col space-y-1">
          <li>
            <Link
              href="/status"
              className={`flex items-center gap-3 px-4 py-2 font-code-sm text-code-sm transition-colors ${
                pathname === "/status" ? "text-terminal-lime" : "text-text-muted hover:text-terminal-lime"
              }`}
            >
              <span className="material-symbols-outlined text-sm">analytics</span>
              System Status
            </Link>
          </li>
          <li>
            <Link
              href="/latency"
              className={`flex items-center gap-3 px-4 py-2 font-code-sm text-code-sm transition-colors ${
                pathname === "/latency" ? "text-terminal-lime" : "text-text-muted hover:text-terminal-lime"
              }`}
            >
              <span className="material-symbols-outlined text-sm">speed</span>
              Node Latency
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
