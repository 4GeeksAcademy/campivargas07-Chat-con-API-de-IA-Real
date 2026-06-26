import { NextRequest, NextResponse } from "next/server";
import { GROQ_MODEL } from "@/lib/types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

function formatGroqError(status: number, body: unknown): string {
  const errorBody = body as { error?: { message?: string } };
  const message = errorBody?.error?.message;

  switch (status) {
    case 401:
      return "API key inválida. Verifica GROQ_API_KEY en .env.local.";
    case 429:
      return "Límite de peticiones alcanzado. Espera un momento e inténtalo de nuevo.";
    case 500:
    case 502:
    case 503:
      return "El servicio de Groq no está disponible temporalmente. Inténtalo más tarde.";
    default:
      return message ?? `Error de la API de Groq (código ${status}).`;
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY no está configurada en el servidor." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 }
    );
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Se requiere un historial de mensajes no vacío." },
      { status: 400 }
    );
  }

  const start = Date.now();

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        stream: false,
      }),
    });

    const latencyMs = Date.now() - start;
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: formatGroqError(response.status, data) },
        { status: response.status }
      );
    }

    const content = data.choices?.[0]?.message?.content ?? "";
    const usage = data.usage ?? {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    };

    return NextResponse.json({
      content,
      usage: {
        prompt_tokens: usage.prompt_tokens ?? 0,
        completion_tokens: usage.completion_tokens ?? 0,
        total_tokens: usage.total_tokens ?? 0,
      },
      model: data.model ?? GROQ_MODEL,
      latencyMs,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con la API de Groq. Revisa tu conexión." },
      { status: 502 }
    );
  }
}
