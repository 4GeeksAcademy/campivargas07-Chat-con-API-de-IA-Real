# Chat con API — Site Vision

## Proyecto Stitch

| Campo | Valor |
|-------|-------|
| **Título** | Chat con API |
| **ID** | `2799299996149974702` |
| **Tipo** | TEXT_TO_UI_PRO |
| **Tema** | Dark mode — Technical Intelligence Interface |
| **Modelo IA** | Groq — Llama 3 (`llama3-8b-8192`) |

## Visión del producto

Aplicación de chat con IA en tiempo real que consume la API de Groq (Llama 3), con panel lateral de métricas de uso (tokens, latencia, costo estimado) y persistencia de sesión en el navegador.

El diseño prioriza **observabilidad** y **ergonomía para desarrolladores**: interfaz oscura, tipografía Inter + JetBrains Mono, y visualización clara de métricas por mensaje y por sesión.

## Pantallas

### 1. Especificación Técnica Chat Groq

| Campo | Valor |
|-------|-------|
| **ID** | `e824081b103e4f5b9c6fe4281cd40ef3` |
| **Tipo** | Documento técnico (Markdown) |
| **Archivo local** | `designs/especificacion-tecnica-chat-groq.md` |

**Propósito:** Define la arquitectura de implementación.

- **Componentes:** `ChatLayout`, `ChatContainer`, `MessageList`, `MessageInput`, `MetricsSidebar`, `SessionSummary`, `LastResponseDetails`, `ModelStatus`
- **Estado:** Zustand (`useChatStore`) con persistencia en `localStorage`
- **API:** `POST /api/chat` → Groq `https://api.groq.com/openai/v1/chat/completions`
- **Métricas:** prompt/completion tokens, T/s, latencia, total acumulado
- **Seguridad:** API key en `.env.local`, nunca expuesta al cliente

### 2. Design System

| Campo | Valor |
|-------|-------|
| **ID** | `asset-stub-assets_6104d20175b0444388c75a6b89d31c9a` |
| **Tipo** | Asset de tema (no es una pantalla renderizable) |
| **Archivo local** | `DESIGN.md` (fuente: `designTheme.designMd` del proyecto) |

**Propósito:** Sistema de diseño "Technical Intelligence Interface".

- Paleta oscura con primary cobalto (`#adc6ff`) y secondary esmeralda (`#4edea3`)
- Fuentes: Inter (UI) + JetBrains Mono (código/métricas)
- Grid de 8px, bordes suaves (4–8px), elevación por capas tonales
- Componentes: botones, inputs, metric cards, status dots, skeleton loaders

> **Nota:** El ID `asset-stub-assets_*` es un stub de assets del tema en Stitch, no una pantalla descargable. El contenido proviene del `designMd` del proyecto.

### 3. Chat Groq — Métricas Llama 3

| Campo | Valor |
|-------|-------|
| **ID** | `18c52f34377e421aac90ca6ad57a9478` |
| **Tipo** | UI (HTML + screenshot) |
| **Resolución** | 2560 × 2048 (desktop) |
| **Archivos locales** | `designs/chat-groq-metricas-llama-3.html`, `designs/chat-groq-metricas-llama-3.png` |

**Propósito:** Mockup visual de la interfaz de chat implementable.

- Layout de dos columnas: chat central + sidebar de métricas
- Header con branding "AI Console - Groq Chat"
- Área de mensajes con burbujas user/assistant
- Panel lateral con métricas de sesión (tokens, latencia, modelo activo)
- Input de mensaje con botón de envío
- Estilos Tailwind con tokens del design system

## Checklist de implementación

- [ ] Crear proyecto Next.js (App Router)
- [ ] Implementar `POST /api/chat` con Groq API
- [ ] Configurar Zustand store con persistencia
- [ ] Construir `ChatLayout` según mockup HTML
- [ ] Aplicar tokens de `DESIGN.md` (colores, tipografía, spacing)
- [ ] Mostrar métricas por mensaje y acumuladas en sidebar
- [ ] Manejar estados: loading, error (429/500), empty state
- [ ] Proteger `GROQ_API_KEY` en variables de entorno

## Referencias de diseño

```
.stitch/
├── DESIGN.md                              ← Sistema de diseño
├── SITE.md                                  ← Este archivo
├── metadata.json                            ← Mapa de pantallas
└── designs/
    ├── especificacion-tecnica-chat-groq.md  ← Spec técnica
    ├── chat-groq-metricas-llama-3.html      ← Código UI
    ├── chat-groq-metricas-llama-3.png       ← Screenshot
    └── design-system-source.md              ← Copia cruda del designMd
```
