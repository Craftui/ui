---
{
  "slug": "switch",
  "name": "Switch",
  "status": "Planned",
  "isNew": false,
  "order": 70,
  "category": "Foundations",
  "summary": "Binary control for immediate on and off settings.",
  "description": "Switches are best for instantly applied preferences. CraftUI switch behavior is designed to be predictable in forms and settings panels.",
  "installation": {
    "base": "bunx shadcn@latest add switch --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add switch --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "checked",
      "type": "boolean",
      "defaultValue": "uncontrolled",
      "description": "Controlled selected state."
    },
    {
      "name": "onCheckedChange",
      "type": "(checked: boolean) => void",
      "defaultValue": "-",
      "description": "Callback when state changes."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "defaultValue": "false",
      "description": "Prevents interaction."
    }
  ],
  "a11y": [
    "Associate each switch with a visible label.",
    "Expose state via ARIA checked semantics.",
    "Use checkbox alternatives when submission semantics are required."
  ]
}
---
## Status
This component is planned and not released yet.
