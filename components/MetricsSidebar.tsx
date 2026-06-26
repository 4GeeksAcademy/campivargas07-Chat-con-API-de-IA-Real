import { SessionMetrics } from "@/lib/types";

interface MetricsSidebarProps {
  metrics: SessionMetrics;
}

export default function MetricsSidebar({ metrics }: MetricsSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-80 bg-surface border-l border-outline-variant shrink-0 overflow-y-auto z-40">
      <div className="p-md border-b border-surface-container-highest sticky top-0 bg-surface/90 backdrop-blur-sm z-10">
        <h3 className="text-headline-sm text-on-surface font-semibold">
          Telemetría
        </h3>
        <p className="text-body-sm text-on-surface-variant mt-xs">
          Métricas de sesión
        </p>
      </div>

      <div className="p-md space-y-md">
        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">
            Tokens de prompt (sesión)
          </p>
          <p className="font-mono text-display-lg text-on-surface">
            {metrics.totalPromptTokens.toLocaleString()}
          </p>
        </div>

        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">
            Tokens de completado (sesión)
          </p>
          <p className="font-mono text-display-lg text-on-surface">
            {metrics.totalCompletionTokens.toLocaleString()}
          </p>
        </div>

        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">
            Total tokens (sesión)
          </p>
          <p className="font-mono text-display-lg text-primary">
            {metrics.totalTokens.toLocaleString()}
          </p>
        </div>

        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">Modelo</p>
          <p className="font-mono text-code-label text-secondary break-all">
            {metrics.lastModel ?? "—"}
          </p>
        </div>

        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">
            Latencia (última respuesta)
          </p>
          <p className="font-mono text-display-lg text-on-surface">
            {metrics.lastLatencyMs != null
              ? `${metrics.lastLatencyMs} ms`
              : "—"}
          </p>
        </div>

        <div className="bg-surface-container rounded-xl p-md border border-surface-container-highest shadow-sm">
          <p className="text-body-sm text-on-surface-variant mb-xs">
            Tokens por segundo
          </p>
          <p className="font-mono text-display-lg text-secondary">
            {metrics.lastTokensPerSecond != null
              ? `${metrics.lastTokensPerSecond.toFixed(1)} T/s`
              : "—"}
          </p>
        </div>
      </div>
    </aside>
  );
}
