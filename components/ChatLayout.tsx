"use client";

import { ReactNode } from "react";
import MetricsSidebar from "./MetricsSidebar";
import { SessionMetrics } from "@/lib/types";

interface ChatLayoutProps {
  children: ReactNode;
  metrics: SessionMetrics;
  onClear: () => void;
  error: string | null;
}

export default function ChatLayout({
  children,
  metrics,
  onClear,
  error,
}: ChatLayoutProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-container-margin h-16 shrink-0 z-50">
        <div className="flex items-center gap-md">
          <div className="text-headline-md font-bold text-primary flex items-center gap-sm">
            <span className="text-lg">⌘</span>
            Llama 3
          </div>
          <div className="hidden md:flex items-center gap-sm px-sm py-xs bg-surface-container rounded-lg border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-code-label text-secondary">
              SYSTEM ONLINE
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="px-md py-sm rounded-lg border border-outline-variant text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
        >
          Borrar conversación
        </button>
      </header>

      {error && (
        <div className="bg-error/10 border-b border-error/30 px-container-margin py-sm">
          <p className="text-body-sm text-error">{error}</p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col bg-surface-dim relative min-w-0">
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(#8c909f 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {children}
        </main>
        <MetricsSidebar metrics={metrics} />
      </div>
    </div>
  );
}
