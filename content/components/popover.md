---
{
  "slug": "popover",
  "name": "Popover",
  "status": "Planned",
  "isNew": false,
  "order": 60,
  "category": "Overlays",
  "summary": "Anchored floating content for compact workflows.",
  "description": "Popovers provide richer inline interactions than tooltips. CraftUI popovers will focus on stable positioning and predictable dismissal behavior.",
  "installation": {
    "base": "bunx shadcn@latest add popover --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add popover --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "open",
      "type": "boolean",
      "defaultValue": "uncontrolled",
      "description": "Controlled open state."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "defaultValue": "-",
      "description": "Callback for state updates."
    },
    {
      "name": "sideOffset",
      "type": "number",
      "defaultValue": "8",
      "description": "Distance between trigger and content."
    }
  ],
  "a11y": [
    "Move focus into popover content when opened by keyboard.",
    "Support escape key and outside click dismissal.",
    "Return focus to trigger when popover closes."
  ]
}
---
## Status
This component is planned and not released yet.
