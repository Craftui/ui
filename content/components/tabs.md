---
{
  "slug": "tabs",
  "name": "Tabs",
  "status": "Available",
  "isNew": true,
  "order": 45,
  "category": "Foundations",
  "summary": "Segment related content into one focused surface.",
  "description": "Tabs keep related views in context and reduce route churn. CraftUI Tabs ships with a compound API, keyboard navigation, and controlled or uncontrolled state support.",
  "installation": {
    "base": "bunx shadcn@latest add tabs --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add tabs --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "value",
      "type": "string",
      "defaultValue": "uncontrolled",
      "description": "Controlled selected tab value."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "defaultValue": "undefined",
      "description": "Initial selected tab value for uncontrolled usage."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "defaultValue": "undefined",
      "description": "Called whenever the active tab changes."
    },
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "defaultValue": "\"horizontal\"",
      "description": "Changes keyboard navigation direction and tablist semantics."
    },
    {
      "name": "activationMode",
      "type": "\"automatic\" | \"manual\"",
      "defaultValue": "\"automatic\"",
      "description": "Automatic selects on arrow navigation; manual selects on Enter or Space."
    }
  ],
  "a11y": [
    "Use short, descriptive trigger labels that map clearly to panel content.",
    "Keep one tab selected at all times so keyboard users do not lose context.",
    "Do not hide important content behind tabs on small screens without an alternate path."
  ]
}
---
## Examples
Explore implementation patterns for common Tabs workflows.

## Feature: Controlled state with external sync
- Wire `value` and `onValueChange` to external state.
- Keep related UI (status text, analytics hooks) in sync with active tab.

## Feature: Animated tab panels with Match Case
- Use `MatchCase` to animate panel handoffs while keeping Tabs triggers accessible.
- Apply one animation primitive across multiple tab states for consistent motion.

## Feature: Vertical orientation for dense layouts
- Use `orientation="vertical"` when navigation labels are longer.
- Pair with a two-column layout to keep controls and content readable.
