---
{
  "slug": "match-case",
  "name": "Match Case",
  "status": "Available",
  "isNew": true,
  "order": 30,
  "category": "Utility",
  "summary": "Render-prop utility for animated UI state switching.",
  "description": "Match Case helps you map state values to views and animate the switch without context-heavy compound APIs. It keeps previous content mounted briefly for smooth exit transitions.",
  "installation": {
    "base": "bunx shadcn@latest add match-case --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add match-case --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "value",
      "type": "string | number",
      "defaultValue": "-",
      "description": "Current active case key to match against in render calls."
    },
    {
      "name": "duration",
      "type": "number",
      "defaultValue": "220",
      "description": "Default transition duration in milliseconds."
    },
    {
      "name": "animation",
      "type": "\"none\" | \"fade\" | \"fade-up\" | \"fade-down\" | \"scale\" | \"blur\" | \"blur-up\"",
      "defaultValue": "\"fade-up\"",
      "description": "Global switch animation applied unless overridden per render call."
    },
    {
      "name": "easing",
      "type": "string",
      "defaultValue": "\"cubic-bezier(0.2, 0.8, 0.2, 1)\"",
      "description": "Default timing function applied to switch animations."
    },
    {
      "name": "children",
      "type": "(api) => ReactNode",
      "defaultValue": "-",
      "description": "Render-prop callback that receives is, render, and containerProps helpers."
    },
    {
      "name": "api.render(match, node, options?)",
      "type": "function",
      "defaultValue": "-",
      "description": "Renders a case and animates active and exiting states for that match key."
    },
    {
      "name": "api.containerProps",
      "type": "HTMLAttributes<HTMLDivElement>",
      "defaultValue": "{ className: 'relative' }",
      "description": "Props for the wrapper so exiting content can overlay cleanly during transitions."
    }
  ],
  "a11y": [
    "Respect reduced motion by keeping interactions usable without animation.",
    "Do not hide essential context only inside animated transitions.",
    "Keep focusable controls stable across cases when possible."
  ]
}
---
## Loading to content handoff
Showcases smooth handoff between loading and loaded branches using `value` plus transition timing.

## Step flow transitions in one container
Showcases step-based flows where each step is a matched branch rendered in a shared container.

## Nested panel navigation states
Showcases using path-like keys to render nested command panels with animated state changes.

## Write preview diff pane switching
Showcases toggling editor panes with minimal visual disruption using matched branch rendering.
