---
{
  "slug": "preview",
  "name": "Preview",
  "status": "Available",
  "isNew": true,
  "order": 40,
  "category": "Utility",
  "summary": "Tabbed utility to show a live component and its source side by side.",
  "description": "Preview wraps component demos in a single, consistent frame with two tabs: live preview and code. It is designed for docs pages where examples should stay centered, readable, and easy to copy.",
  "installation": {
    "base": "bunx shadcn@latest add preview --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add preview --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "preview",
      "type": "ReactNode",
      "defaultValue": "-",
      "description": "Live component preview rendered in the preview tab."
    },
    {
      "name": "code",
      "type": "string",
      "defaultValue": "undefined",
      "description": "Single source snippet for the code tab."
    },
    {
      "name": "codeTabs",
      "type": "Array<{ id: string; label: string; code: string; language?: string; filename?: string }>",
      "defaultValue": "undefined",
      "description": "Optional nested tabs inside the code panel for multiple snippet variants."
    },
    {
      "name": "defaultTab",
      "type": "\"preview\" | \"code\"",
      "defaultValue": "\"preview\"",
      "description": "Controls which panel is shown first on mount."
    },
    {
      "name": "previewClassName",
      "type": "string",
      "defaultValue": "undefined",
      "description": "Optional className override for the preview surface."
    }
  ],
  "a11y": [
    "Keep preview content keyboard reachable when interactive controls are shown.",
    "Use clear tab labels and ARIA roles for preview and code switching.",
    "Do not rely only on animation to communicate active tab state."
  ]
}
---
## Documentation pattern
Use Preview to keep demos and source aligned in one place.
- Keep the preview area centered and stable across tab switches.
- Prefer short snippets that map directly to the rendered output.
