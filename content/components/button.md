---
{
  "slug": "button",
  "name": "Button",
  "status": "Available",
  "isNew": true,
  "order": 10,
  "category": "Foundations",
  "summary": "A tactile action trigger with clear visual priority.",
  "description": "Buttons communicate intent and hierarchy. CraftUI ships a quiet default style with consistent sizing and semantic variants for primary and supporting actions.",
  "installation": {
    "base": "bunx shadcn@latest add button --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add button --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "variant",
      "type": "\"default\" | \"secondary\" | \"destructive\" | \"outline\" | \"ghost\" | \"link\"",
      "defaultValue": "\"default\"",
      "description": "Controls visual emphasis."
    },
    {
      "name": "size",
      "type": "\"default\" | \"sm\" | \"lg\" | \"icon\"",
      "defaultValue": "\"default\"",
      "description": "Adjusts height and horizontal spacing."
    },
    {
      "name": "asChild",
      "type": "boolean",
      "defaultValue": "false",
      "description": "Renders through a child element when composition is needed."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "defaultValue": "false",
      "description": "Disables interaction and applies disabled visuals."
    }
  ],
  "a11y": [
    "Use visible text labels for icon-only actions via aria-label.",
    "Do not use color alone to signal destructive intent.",
    "Keep focus ring visible for keyboard users."
  ]
}
---
## Usage notes
- Prefer concise button labels that start with verbs.
- Use destructive variants only when the action cannot be undone.
