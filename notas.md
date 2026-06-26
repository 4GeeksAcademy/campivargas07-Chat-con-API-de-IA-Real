# Notas del proyecto — Chat con API de Groq

Documento con el paso a paso de lo que hicimos para que la aplicación funcione, desde el diseño en Stitch hasta el chat en producción local.

---

## 1. Diseño con Google Stitch

1. Creamos un proyecto en [stitch.withgoogle.com](https://stitch.withgoogle.com) llamado **Chat con API** (ID: `2799299996149974702`).
2. Generamos tres pantallas:
   - **Especificación Técnica Chat Groq** — documento con arquitectura, componentes y flujo de datos.
   - **Design System** — paleta, tipografía y reglas visuales.
   - **Chat Groq - Métricas Llama 3** — mockup visual de la interfaz.
3. Conectamos el MCP de Stitch en Cursor (`Settings → MCP`) para que el agente pudiera leer el proyecto.
4. Exportamos los assets a la carpeta [`.stitch/`](.stitch/):
   - `DESIGN.md` — sistema de diseño.
   - `SITE.md` — visión del producto y checklist.
   - `designs/` — HTML, PNG y markdown descargados con `curl`.

---

## 2. Cuenta y API Key de Groq

1. Registro gratuito en [console.groq.com](https://console.groq.com).
2. Generación de una API Key en el panel de Groq.
3. Creación del archivo `.env.local` en la raíz del proyecto:

```
GROQ_API_KEY=gsk_tu_clave_aqui
```

> **Importante:** usamos `GROQ_API_KEY` (sin `NEXT_PUBLIC_`) para que la clave **nunca** llegue al navegador. El archivo `.env.local` está en `.gitignore` y no se sube a Git.

4. Verificación de la clave con el script de prueba:

```bash
GROQ_API_KEY=gsk_tu_clave node scripts/test-groq.mjs
```

Si responde `OK - API key válida`, la conexión con Groq está correcta.

---

## 3. Scaffold del proyecto Next.js

Como el nombre del repositorio tiene mayúsculas, creamos el proyecto manualmente con:

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Sin SDK de Groq (solo `fetch` nativo)

Estructura principal:

```
app/
  layout.tsx          → Fuentes Inter + JetBrains Mono, tema dark
  page.tsx            → Renderiza el chat
  globals.css         → Estilos base y animación "pensando..."
  api/chat/route.ts   → Llama a Groq desde el servidor

components/
  ChatPage.tsx        → Lógica principal (useState + useEffect)
  ChatLayout.tsx      → Header, layout y sidebar
  MessageList.tsx     → Lista de mensajes con scroll
  MessageItem.tsx     → Burbujas user / assistant
  MessageInput.tsx    → Textarea + botón enviar
  MetricsSidebar.tsx  → Panel de telemetría
  LoadingIndicator.tsx

lib/
  types.ts            → Tipos TypeScript
  storage.ts          → Persistencia en localStorage

scripts/
  test-groq.mjs       → Prueba de API key
```

---

## 4. Cómo se llama a la API de Groq

La llamada **no** se hace desde el navegador directamente. El flujo es:

```
Usuario → ChatPage (cliente) → POST /api/chat → fetch a Groq (servidor)
```

En [`app/api/chat/route.ts`](app/api/chat/route.ts) usamos `fetch` con las cabeceras requeridas:

```ts
headers: {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
}
```

Endpoint: `https://api.groq.com/openai/v1/chat/completions`

Modelo: `llama-3.1-8b-instant` (Llama 3 en Groq)

Payload: historial completo de mensajes `{ role, content }[]` en cada petición (comunicación **stateless** — Groq no guarda contexto; nosotros enviamos todo el historial cada vez).

---

## 5. Estado en el cliente (React)

Todo vive en [`components/ChatPage.tsx`](components/ChatPage.tsx) con **`useState`**:

| Estado | Para qué |
|--------|----------|
| `messages` | Historial de la conversación |
| `input` | Texto del campo de entrada |
| `isLoading` | Muestra "Pensando..." y deshabilita el botón |
| `error` | Mensajes de error legibles |
| `sessionMetrics` | Tokens acumulados, latencia, modelo, T/s |

### Envío de mensaje (`async/await`)

1. El usuario escribe y pulsa **Enviar**.
2. Se agrega el mensaje del usuario al estado.
3. `isLoading = true`.
4. `fetch` a `/api/chat` con **todo** el historial.
5. Si hay error → se muestra en un banner rojo (sin romper la app).
6. Si hay éxito → se agrega la respuesta del asistente y se actualizan las métricas.
7. `isLoading = false`.

---

## 6. Persistencia con `useEffect` y `localStorage`

En [`lib/storage.ts`](lib/storage.ts) usamos la clave `groq-chat-session`.

- **Al montar** (`useEffect` con `[]`): se lee `localStorage` y se restauran mensajes y métricas.
- **Tras cada cambio** (`useEffect` con `[messages, sessionMetrics]`): se guarda la sesión.
- **Borrar conversación**: botón en el header que limpia el estado y `localStorage.removeItem`.

Así la conversación sobrevive a F5 (recarga de página).

---

## 7. Métricas de tokens y telemetría

Tras cada respuesta, Groq devuelve un objeto `usage`:

```json
{
  "prompt_tokens": 45,
  "completion_tokens": 120,
  "total_tokens": 165
}
```

Acumulamos esos valores en `sessionMetrics` y los mostramos en:

- **Sidebar** (pantallas grandes): totales de sesión, modelo, latencia (ms), tokens/segundo.
- **Bajo cada mensaje del asistente**: desglose de tokens de esa respuesta.

Métricas adicionales calculadas en el servidor/cliente:

- **Latencia**: tiempo entre inicio y fin del `fetch` a Groq.
- **Tokens/segundo**: `completion_tokens / (latencia_en_segundos)`.
- **Modelo**: nombre devuelto por Groq (ej. `llama-3.1-8b-instant`).

---

## 8. Interfaz visual (Stitch → Next.js)

Adaptamos el mockup HTML de [`.stitch/designs/chat-groq-metricas-llama-3.html`](.stitch/designs/chat-groq-metricas-llama-3.html):

- Tema oscuro con colores de [`.stitch/DESIGN.md`](.stitch/DESIGN.md).
- Layout: header + chat central + panel de métricas a la derecha.
- Burbujas diferenciadas: usuario a la derecha, IA a la izquierda.
- Indicador de carga con animación de puntos ("Pensando...").

Los tokens de diseño están en [`tailwind.config.ts`](tailwind.config.ts) (`primary`, `secondary`, `surface`, etc.).

---

## 9. Manejo de errores

| Situación | Qué ve el usuario |
|-----------|-------------------|
| API key inválida (401) | "API key inválida. Verifica GROQ_API_KEY en .env.local." |
| Rate limit (429) | "Límite de peticiones alcanzado..." |
| Servidor caído (5xx) | "El servicio de Groq no está disponible temporalmente..." |
| Sin conexión | "No se pudo conectar con el servidor..." |

Los errores técnicos (JSON crudo, stack traces) **no** se muestran en pantalla.

---

## 10. Cómo ejecutar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API key
cp .env.example .env.local
# Editar .env.local con tu GROQ_API_KEY

# 3. (Opcional) Verificar clave
GROQ_API_KEY=gsk_... node scripts/test-groq.mjs

# 4. Arrancar
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## 11. Checklist de evaluación (cumplimiento)

| Requisito | Dónde está |
|-----------|------------|
| `fetch` con `Authorization: Bearer` y `Content-Type` | `app/api/chat/route.ts` |
| Historial completo en cada llamada | `ChatPage.tsx` → `apiMessages` |
| `async/await` + estado de carga | `sendMessage()` + `LoadingIndicator` |
| Errores comprensibles | `formatGroqError()` + banner en `ChatLayout` |
| `useState` (mensajes, loading, métricas) | `ChatPage.tsx` |
| `useEffect` + `localStorage` | `ChatPage.tsx` + `lib/storage.ts` |
| Tokens acumulados de `usage` | `sessionMetrics` en `ChatPage.tsx` |
| Persistencia + borrar conversación | `saveSession` / `clearSession` |
| Métrica extra (latencia, modelo, T/s) | `MetricsSidebar.tsx` |

---

## 12. Decisiones técnicas importantes

1. **API key en el servidor**, no en el cliente — más seguro que `NEXT_PUBLIC_GROQ_API_KEY`.
2. **Sin SDK de Groq** — solo `fetch` nativo, como pide el assignment.
3. **`useState` + `useEffect`** en lugar de Zustand — requisito explícito del ejercicio.
4. **Historial stateless** — cada petición lleva todos los mensajes; Groq no mantiene sesión.
5. **Diseño desde Stitch** — `.stitch/` como fuente de verdad visual y técnica.

---

## Referencias útiles

- [Groq Console](https://console.groq.com)
- [Documentación API Groq](https://console.groq.com/docs/quickstart)
- [Google Stitch](https://stitch.withgoogle.com)
- Diseño local: [`.stitch/SITE.md`](.stitch/SITE.md) y [`.stitch/DESIGN.md`](.stitch/DESIGN.md)
