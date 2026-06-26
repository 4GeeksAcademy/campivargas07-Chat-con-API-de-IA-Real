"use client";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-gutter md:p-container-margin bg-surface/80 backdrop-blur-md border-t border-outline-variant z-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface-container rounded-xl border-2 border-outline-variant focus-within:border-primary transition-colors shadow-sm overflow-hidden flex flex-col">
          <textarea
            className="w-full bg-transparent border-none text-on-surface text-body-md placeholder:text-on-surface-variant focus:ring-0 resize-none p-md min-h-[60px] max-h-[200px]"
            placeholder="Escribe tu mensaje..."
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            maxLength={2000}
          />
          <div className="flex items-center justify-between px-md pb-md pt-xs">
            <span className="font-mono text-code-label text-on-surface-variant text-[10px]">
              {value.length}/2000
            </span>
            <button
              type="button"
              onClick={onSend}
              disabled={disabled || !value.trim()}
              className="bg-primary text-on-primary rounded-lg px-md py-sm flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium text-body-sm"
            >
              Enviar
            </button>
          </div>
        </div>
        <p className="text-center mt-xs font-mono text-code-label text-on-surface-variant opacity-60 text-[10px]">
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
