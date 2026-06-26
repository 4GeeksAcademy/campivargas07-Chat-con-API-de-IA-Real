import {
  ChatSession,
  INITIAL_SESSION_METRICS,
  Message,
  SessionMetrics,
} from "./types";

const STORAGE_KEY = "groq-chat-session";

export function loadSession(): ChatSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ChatSession;
    if (!Array.isArray(parsed.messages)) return null;

    return {
      messages: parsed.messages,
      sessionMetrics: parsed.sessionMetrics ?? INITIAL_SESSION_METRICS,
    };
  } catch {
    return null;
  }
}

export function saveSession(
  messages: Message[],
  sessionMetrics: SessionMetrics
): void {
  if (typeof window === "undefined") return;

  const session: ChatSession = { messages, sessionMetrics };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
