import { Message } from "@/lib/types";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end max-w-4xl mx-auto w-full">
        <div className="flex gap-md max-w-[85%]">
          <div className="bg-surface-container-highest rounded-xl rounded-tr-sm p-md border border-outline-variant shadow-sm">
            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container shrink-0 border border-outline-variant flex items-center justify-center text-on-surface-variant text-xs font-medium">
            Tú
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start max-w-4xl mx-auto w-full">
      <div className="flex gap-md max-w-[90%]">
        <div className="w-8 h-8 rounded-full bg-primary-container shrink-0 border border-primary flex items-center justify-center text-on-primary-container text-xs font-bold">
          AI
        </div>
        <div className="flex flex-col gap-sm">
          <div className="bg-[#1e2538] rounded-xl rounded-tl-sm p-md border border-[#2d3752] shadow-sm">
            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          {message.usage && (
            <div className="flex flex-wrap items-center gap-md pl-sm">
              <span className="font-mono text-code-label text-on-surface-variant text-[11px]">
                Prompt: {message.usage.prompt_tokens} | Comp:{" "}
                {message.usage.completion_tokens} | Total:{" "}
                {message.usage.total_tokens} tokens
              </span>
              {message.tokensPerSecond != null && (
                <>
                  <span className="w-1 h-1 rounded-full bg-surface-container-highest" />
                  <span className="font-mono text-code-label text-secondary text-[11px]">
                    {message.tokensPerSecond.toFixed(1)} T/s
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
