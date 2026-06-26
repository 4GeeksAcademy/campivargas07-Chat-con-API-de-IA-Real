---
name: Technical Intelligence Interface
project: Chat con API
projectId: "2799299996149974702"
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-label:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
This design system is engineered for developers and technical operators managing high-performance AI systems. The brand personality is **precise, analytical, and authoritative**, prioritizing utility over decoration. 

The aesthetic follows a **Modern Corporate** style with a focus on dark-mode ergonomics. It utilizes high-contrast data visualization against deep charcoal surfaces to reduce eye strain during long monitoring sessions. The visual language conveys stability and speed, utilizing subtle motion for system status and rigid structural alignment to evoke a sense of "engineered" reliability.

## Colors
The palette is rooted in a professional **Dark/Charcoal** foundation to provide a high-contrast environment for technical data.

- **Primary (Cobalt Blue):** Used for brand identity, primary actions, and active states. It signals focus and intentionality.
- **Success/Metrics (Emerald Green):** Dedicated to positive performance metrics, system uptime, and successful API calls.
- **Backgrounds:** The core background uses #111827 (Night), while containers and cards use #1F2937 to create a hierarchical "stacking" effect without relying on heavy shadows.
- **Borders:** A low-contrast border color (#374151) is used to define boundaries in a subtle, non-distracting manner.

## Typography
The design system employs **Inter** as its primary typeface due to its exceptional legibility in UI contexts and its neutral, modern character. 

For technical data, code snippets, and specific metadata (like timestamps or token counts), **JetBrains Mono** is introduced. This monospaced font reinforces the developer-focused nature of the panel, ensuring that characters are distinct and metrics are easy to scan vertically. Line heights are kept generous for body text to maintain readability in dense documentation or log views.

## Layout & Spacing
The layout follows a **8px grid system** to ensure mathematical consistency across all components.

- **Desktop:** A 12-column fluid grid with fixed sidebars. The main content area uses a maximum width of 1440px for dashboard views to prevent data-stretching.
- **Density:** The design system prioritizes high-density information. Margins within cards are kept at 16px (md) to allow for more data visualization per screen.
- **Reflow:** On mobile, the grid collapses to a single column, with margins reduced to 16px. Sidebars transform into bottom-sheet navigation or hidden drawers to prioritize the data display area.

## Elevation & Depth
In this design system, depth is conveyed through **Tonal Layering** rather than traditional shadows. This approach aligns with a minimalist, functional aesthetic.

1.  **Floor (Level 0):** The main background (#111827).
2.  **Surface (Level 1):** Primary cards and containers (#1F2937).
3.  **Overlay (Level 2):** Modals and dropdowns, which use a slightly lighter surface (#374151) and a very subtle, 10% opacity black shadow to create a separation from the content below.

To indicate interactivity, hovered elements use a "Border Highlight" technique, where the border color transitions from muted gray to the Primary Cobalt or Emerald, depending on the context.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a subtle modern touch while maintaining the structural rigidity expected of a technical tool. 

- **Small elements (Buttons, Inputs):** 4px (0.25rem) corner radius.
- **Large elements (Cards, Sidebars):** 8px (0.5rem) corner radius.
- **Data Tags/Chips:** Full pill-shaped (100px) to distinguish them clearly from interactive buttons.

## Components
- **Buttons:** Primary buttons use a solid Cobalt Blue background with white text. Secondary buttons use a "Ghost" style with a #374151 border.
- **Input Fields:** Darker than the surface color to provide an "inset" feel. Focus states must have a 2px Emerald or Cobalt border glow.
- **Metrics Cards:** Large displays of numbers should use JetBrains Mono. Include a "Trend Indicator" (a small emerald arrow/sparkline) for positive delta metrics.
- **Status Indicators:** Use a pulsing 8px dot (Emerald for 'Online', Amber for 'Processing', Red for 'Error').
- **Loading States:** Utilize refined skeleton screens with a subtle shimmer effect (#1F2937 to #374151) rather than spinning icons to minimize visual noise during data fetching.
- **Code Blocks:** Syntax highlighting should follow a theme compatible with the charcoal background, using high-vibrancy pastels for code tokens.
