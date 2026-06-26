#!/usr/bin/env node

/**
 * Verifica que GROQ_API_KEY funciona con fetch directo a Groq.
 * Uso: GROQ_API_KEY=gsk_... node scripts/test-groq.mjs
 *   o: npm run test:groq (con .env.local cargado manualmente)
 */

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("Error: define GROQ_API_KEY en el entorno.");
  console.error("Ejemplo: GROQ_API_KEY=gsk_... node scripts/test-groq.mjs");
  process.exit(1);
}

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Di hola en una palabra." }],
      temperature: 0.7,
      stream: false,
    }),
  }
);

const data = await response.json();

if (!response.ok) {
  console.error(`Error ${response.status}:`, data);
  process.exit(1);
}

console.log("OK - API key válida");
console.log("Modelo:", data.model);
console.log("Respuesta:", data.choices?.[0]?.message?.content);
console.log("Usage:", data.usage);
