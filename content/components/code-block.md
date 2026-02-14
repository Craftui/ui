---
{
  "slug": "code-block",
  "name": "Code Block",
  "status": "Available",
  "isNew": true,
  "order": 20,
  "category": "Foundations",
  "summary": "Interactive snippet container for documentation and guides.",
  "description": "Code Block is a read-focused surface with utility controls. It supports copy-to-clipboard, line number visibility, wrap toggling, and progressive reveal for long snippets.",
  "installation": {
    "base": "bunx shadcn@latest add code-block --registry https://craftui.dev/r/base",
    "radix": "bunx shadcn@latest add code-block --registry https://craftui.dev/r/radix"
  },
  "api": [
    {
      "name": "code",
      "type": "string",
      "defaultValue": "-",
      "description": "Raw source text rendered inside the block."
    },
    {
      "name": "tabs",
      "type": "Array<{ id: string; label: string; code: string; language?: string; filename?: string }>",
      "defaultValue": "undefined",
      "description": "Optional header tabs rendered in place of the language label."
    },
    {
      "name": "filename",
      "type": "string",
      "defaultValue": "undefined",
      "description": "Optional file label rendered in the header."
    },
    {
      "name": "showLineNumbers",
      "type": "boolean",
      "defaultValue": "true",
      "description": "Initial line-number visibility state."
    },
    {
      "name": "collapsible",
      "type": "boolean",
      "defaultValue": "true",
      "description": "Enables show more/show less behavior."
    },
    {
      "name": "maxCollapsedLines",
      "type": "number",
      "defaultValue": "6",
      "description": "Visible line count before collapse is applied."
    }
  ],
  "a11y": [
    "Keep control labels explicit: Copy, Wrap, Lines, Show more.",
    "Use keyboard-focusable buttons for all toolbar actions.",
    "Provide sufficient contrast between code text and background surface."
  ]
}
---
## Content guidance
- Keep snippets focused on one concept per block.
- Use tabs only when showing the same idea across environments.
