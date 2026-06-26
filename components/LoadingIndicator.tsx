export default function LoadingIndicator() {
  return (
    <div className="flex justify-start max-w-4xl mx-auto w-full">
      <div className="flex gap-md">
        <div className="w-8 h-8 rounded-full bg-surface-container shrink-0 border border-outline-variant flex items-center justify-center text-on-surface-variant opacity-50">
          <span className="text-sm">AI</span>
        </div>
        <div className="bg-surface-container rounded-xl rounded-tl-sm px-md py-sm border border-outline-variant flex items-center gap-sm">
          <span className="text-body-sm text-on-surface-variant italic">
            Pensando...
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary thinking-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary thinking-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary thinking-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
