# Chat con API de Groq (Llama 3)

Aplicación de chat con IA usando la API de Groq, diseñada con [Google Stitch](.stitch/). Incluye panel de métricas de tokens, persistencia en `localStorage` y UI dark mode.

## Requisitos

- Node.js 18+
- Cuenta gratuita en [console.groq.com](https://console.groq.com)

## Configuración

1. Instala dependencias:

```bash
npm install
```

2. Copia el archivo de entorno y añade tu API key:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```
GROQ_API_KEY=gsk_tu_clave_aqui
```

3. Verifica que la clave funciona:

```bash
GROQ_API_KEY=gsk_tu_clave node scripts/test-groq.mjs
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Características

- Chat con historial completo enviado a Groq en cada turno
- Modelo `llama-3.1-8b-instant` (Llama 3)
- `fetch` nativo (sin SDK de Groq)
- Métricas: tokens prompt/completion/total, latencia, tokens/segundo, modelo
- Persistencia de sesión en `localStorage`
- Botón "Borrar conversación"
- UI basada en el diseño Stitch (`.stitch/`)

## Estructura

```
app/api/chat/route.ts   # Proxy seguro a Groq
components/ChatPage.tsx # Estado con useState + useEffect
lib/storage.ts          # Persistencia localStorage
.stitch/                # Diseño y assets de Stitch
```

## Diseño

Ver [.stitch/SITE.md](.stitch/SITE.md) y [.stitch/DESIGN.md](.stitch/DESIGN.md) para el sistema de diseño y especificaciones.
