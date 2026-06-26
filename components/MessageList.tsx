"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/types";
import MessageItem from "./MessageItem";
import LoadingIndicator from "./LoadingIndicator";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-gutter md:p-container-margin space-y-xl z-10 scroll-smooth">
      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-on-surface-variant text-body-md text-center max-w-md">
            Envía un mensaje para iniciar la conversación con Llama 3 vía Groq.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && <LoadingIndicator />}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
