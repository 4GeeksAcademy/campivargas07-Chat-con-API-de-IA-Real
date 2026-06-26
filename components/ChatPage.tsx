"use client";

import { useCallback, useEffect, useState } from "react";
import ChatLayout from "./ChatLayout";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  GroqChatResponse,
  INITIAL_SESSION_METRICS,
  Message,
  SessionMetrics,
} from "@/lib/types";
import { clearSession, loadSession, saveSession } from "@/lib/storage";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionMetrics, setSessionMetrics] = useState<SessionMetrics>(
    INITIAL_SESSION_METRICS
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setMessages(session.messages);
      setSessionMetrics(session.sessionMetrics);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSession(messages, sessionMetrics);
  }, [messages, sessionMetrics, hydrated]);

  const handleClear = useCallback(() => {
    setMessages([]);
    setInput("");
    setError(null);
    setSessionMetrics(INITIAL_SESSION_METRICS);
    clearSession();
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const apiMessages = nextMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Ocurrió un error al procesar tu mensaje.");
        return;
      }

      const result = data as GroqChatResponse;
      const tokensPerSecond =
        result.latencyMs > 0
          ? result.usage.completion_tokens / (result.latencyMs / 1000)
          : 0;

      const assistantMessage: Message = {
        id: createId(),
        role: "assistant",
        content: result.content,
        usage: result.usage,
        latencyMs: result.latencyMs,
        tokensPerSecond,
        model: result.model,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSessionMetrics((prev) => ({
        totalPromptTokens: prev.totalPromptTokens + result.usage.prompt_tokens,
        totalCompletionTokens:
          prev.totalCompletionTokens + result.usage.completion_tokens,
        totalTokens: prev.totalTokens + result.usage.total_tokens,
        lastModel: result.model,
        lastLatencyMs: result.latencyMs,
        lastTokensPerSecond: tokensPerSecond,
      }));
    } catch {
      setError(
        "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  if (!hydrated) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-on-surface-variant">
        Cargando sesión...
      </div>
    );
  }

  return (
    <ChatLayout
      metrics={sessionMetrics}
      onClear={handleClear}
      error={error}
    >
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </ChatLayout>
  );
}
