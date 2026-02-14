---
{
  "slug": "tooltip",
  "name": "Tooltip",
  "status": "In progress",
  "isNew": false,
  "order": 50,
  "category": "Overlays",
  "summary": "Short contextual helper text on focus or hover.",
  "description": "Tooltips should clarify controls without blocking workflows. The upcoming component is tuned for delayed first-open, then instant follow-up hovers.",
  "installation": {
    "base": "bunx shadcn@latest add tooltip --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add tooltip --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "content",
      "type": "ReactNode",
      "defaultValue": "-",
      "description": "Message rendered in the floating layer."
    },
    {
      "name": "delayDuration",
      "type": "number",
      "defaultValue": "200",
      "description": "Delay before showing on pointer hover."
    },
    {
      "name": "side",
      "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
      "defaultValue": "\"top\"",
      "description": "Preferred placement relative to trigger."
    }
  ],
  "a11y": [
    "Tooltip content must not replace visible labels.",
    "Support keyboard focus, not only hover.",
    "Keep messages concise and non-essential."
  ]
}
---
## Status
Implementation is currently in progress.
