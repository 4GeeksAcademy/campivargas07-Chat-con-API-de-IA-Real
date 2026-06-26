export type MessageRole = "user" | "assistant";

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  usage?: TokenUsage;
  latencyMs?: number;
  tokensPerSecond?: number;
  model?: string;
}

export interface SessionMetrics {
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  lastModel: string | null;
  lastLatencyMs: number | null;
  lastTokensPerSecond: number | null;
}

export interface ChatSession {
  messages: Message[];
  sessionMetrics: SessionMetrics;
}

export interface GroqChatResponse {
  content: string;
  usage: TokenUsage;
  model: string;
  latencyMs: number;
}

export const INITIAL_SESSION_METRICS: SessionMetrics = {
  totalPromptTokens: 0,
  totalCompletionTokens: 0,
  totalTokens: 0,
  lastModel: null,
  lastLatencyMs: null,
  lastTokensPerSecond: null,
};

export const GROQ_MODEL = "llama-3.1-8b-instant";
