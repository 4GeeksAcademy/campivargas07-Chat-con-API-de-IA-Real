# Especificación Técnica: Interfaz de Chat con Métricas Groq (Llama 3)

## 1. Arquitectura de Componentes
Se propone una estructura modular y jerárquica para facilitar el mantenimiento y la escalabilidad.

- **`ChatLayout`**: Componente contenedor principal. Gestiona el grid general (Chat vs. Panel de Métricas).
- **`ChatContainer`**: Columna central de la interacción.
    - **`MessageList`**: Renderiza el array de mensajes. Implementa scroll automático al final.
        - **`MessageItem`**: Representa un mensaje individual (User/Assistant). Incluye metadatos locales (ej: timestamp).
    - **`MessageInput`**: Formulario controlado con validación. Bloqueado durante estados de `loading`.
- **`MetricsSidebar`**: Panel lateral persistente para transparencia de recursos.
    - **`SessionSummary`**: Muestra acumulados totales (Total Tokens, Costo estimado).
    - **`LastResponseDetails`**: Desglose del objeto `usage` de la última petición (Prompt/Completion tokens).
    - **`ModelStatus`**: Información del modelo activo (Llama 3) y latencia.
- **`Common/LoadingIndicator`**: Feedback visual de "pensando".

---

## 2. Gestión de Estado (Zustand)
Se ha seleccionado **Zustand** por su mínima carga cognitiva, excelente performance en React y facilidad para integrar middleware de persistencia.

**Estructura del Store (`useChatStore`):**
- `messages`: `Array<{ role: 'user' | 'assistant', content: string, metrics?: UsageObject }>`
- `sessionMetrics`: `{ totalPromptTokens: number, totalCompletionTokens: number, totalCalls: number }`
- `isLoading`: `boolean`
- `error`: `string | null`
- **Acciones**:
    - `sendMessage(text)`: Orquestador del flujo (UI -> API -> UI).
    - `clearHistory()`: Resetea estado y almacenamiento local.

---

## 3. Integración con Groq API
La comunicación se realizará mediante una **Route Handler de Next.js (App Router)** para proteger la API Key.

- **Frontend -> Backend (Next.js)**: `POST /api/chat`
- **Backend -> Groq**:
    - **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
    - **Payload**:
      ```json
      {
        "model": "llama3-8b-8192",
        "messages": [...historial_filtrado],
        "temperature": 0.7,
        "stream": false
      }
      ```
- **Procesamiento de `usage`**: Se extraerá el objeto `response.usage` que contiene `prompt_tokens`, `completion_tokens` y `total_tokens`.

---

## 4. Métricas Visibles
El prototipo prioriza la observabilidad del modelo:

1.  **Por Mensaje (Debajo de cada respuesta):** `Prompt Tokens` | `Completion Tokens`.
2.  **Panel Lateral (Acumulados):**
    - **Total Tokens**: Suma de toda la sesión.
    - **Tokens por Segundo (T/s)**: Calculado como `completion_tokens / (response_time_ms / 1000)`.
    - **Latencia**: Tiempo total de ida y vuelta de la API en milisegundos.
3.  **Identificador de Modelo**: Confirmación visual de que se está usando Llama 3.

---

## 5. Persistencia de Sesión
Se utilizará el middleware `persist` de Zustand vinculado a **`localStorage`**.

- **Datos persistidos**: Array de mensajes y objeto de métricas acumuladas.
- **Estrategia de Hidratación**: Al cargar la página, Zustand recupera el estado. Si hay mensajes previos, la `MessageList` se inicializa con el historial completo para mantener el contexto.

---

## 6. Flujo de Usuario y Lógica
1.  **Input**: Usuario envía mensaje. Se valida que no esté vacío.
2.  **Optimistic UI**: El mensaje del usuario se añade al estado inmediatamente con `isLoading: true`.
3.  **Prevención de Colisiones**: El botón de envío se deshabilita mientras `isLoading` sea `true`.
4.  **Respuesta**: Al recibir el JSON de la API de Groq:
    - Se añade el mensaje del asistente.
    - Se actualizan las métricas de la sesión sumando los nuevos tokens.
    - Se guarda el tiempo de respuesta.
5.  **Error**: Si la API falla (429 Rate Limit, 500), se muestra un mensaje de error en rojo y se permite reintentar el último envío.

---

## 7. Consideraciones Técnicas
- **Seguridad**: La API Key de Groq se almacena en `.env.local` y nunca se expone al cliente.
- **Performance**: Uso de `React.memo` en `MessageItem` para evitar re-renders innecesarios en conversaciones largas.
- **Validación**: Limite de caracteres en el input (ej. 2000) para evitar prompts excesivamente costosos en el plan gratuito.
- **UX**: Scroll automático usando un `ref` en el final de la lista de mensajes con el comportamiento `scrollIntoView({ behavior: 'smooth' })`.