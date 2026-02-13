export type ApiProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}

export type ComponentDoc = {
  slug: string
  name: string
  status: "Available" | "In progress" | "Planned"
  isNew?: boolean
  category: "Foundations" | "Overlays"
  summary: string
  description: string
  installation: string
  api: ApiProp[]
  a11y: string[]
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    status: "Available",
    isNew: true,
    category: "Foundations",
    summary: "A tactile action trigger with clear visual priority.",
    description:
      "Buttons communicate intent and hierarchy. CraftUI ships a quiet default style with consistent sizing and semantic variants for primary and supporting actions.",
    installation:
      "bunx shadcn@latest add button --registry https://craftui.dev/r/base",
    api: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
        defaultValue: '"default"',
        description: "Controls visual emphasis.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        defaultValue: '"default"',
        description: "Adjusts height and horizontal spacing.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders through a child element when composition is needed.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction and applies disabled visuals.",
      },
    ],
    a11y: [
      "Use visible text labels for icon-only actions via aria-label.",
      "Do not use color alone to signal destructive intent.",
      "Keep focus ring visible for keyboard users.",
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    status: "In progress",
    category: "Overlays",
    summary: "Short contextual helper text on focus or hover.",
    description:
      "Tooltips should clarify controls without blocking workflows. The upcoming component is tuned for delayed first-open, then instant follow-up hovers.",
    installation:
      "bunx shadcn@latest add tooltip --registry https://craftui.dev/r/radix",
    api: [
      {
        name: "content",
        type: "ReactNode",
        defaultValue: "-",
        description: "Message rendered in the floating layer.",
      },
      {
        name: "delayDuration",
        type: "number",
        defaultValue: "200",
        description: "Delay before showing on pointer hover.",
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"top"',
        description: "Preferred placement relative to trigger.",
      },
    ],
    a11y: [
      "Tooltip content must not replace visible labels.",
      "Support keyboard focus, not only hover.",
      "Keep messages concise and non-essential.",
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    status: "Planned",
    category: "Overlays",
    summary: "Anchored floating content for compact workflows.",
    description:
      "Popovers provide richer inline interactions than tooltips. CraftUI popovers will focus on stable positioning and predictable dismissal behavior.",
    installation:
      "bunx shadcn@latest add popover --registry https://craftui.dev/r/radix",
    api: [
      {
        name: "open",
        type: "boolean",
        defaultValue: "uncontrolled",
        description: "Controlled open state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        defaultValue: "-",
        description: "Callback for state updates.",
      },
      {
        name: "sideOffset",
        type: "number",
        defaultValue: "8",
        description: "Distance between trigger and content.",
      },
    ],
    a11y: [
      "Move focus into popover content when opened by keyboard.",
      "Support escape key and outside click dismissal.",
      "Return focus to trigger when popover closes.",
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    status: "Planned",
    category: "Foundations",
    summary: "Binary control for immediate on/off settings.",
    description:
      "Switches are best for instantly applied preferences. CraftUI switch behavior is designed to be predictable in forms and settings panels.",
    installation:
      "bunx shadcn@latest add switch --registry https://craftui.dev/r/radix",
    api: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "uncontrolled",
        description: "Controlled selected state.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        defaultValue: "-",
        description: "Callback when state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents interaction.",
      },
    ],
    a11y: [
      "Associate each switch with a visible label.",
      "Expose state via ARIA checked semantics.",
      "Use checkbox alternatives when submission semantics are required.",
    ],
  },
]

export const publishedComponentDocs = componentDocs.filter(
  (item) => item.status === "Available"
)

export function getComponentDoc(slug: string) {
  return publishedComponentDocs.find((item) => item.slug === slug)
}

export const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "demo", label: "Interactive demo" },
  { id: "installation", label: "Installation" },
  { id: "api", label: "API reference" },
  { id: "accessibility", label: "Accessibility" },
] as const
