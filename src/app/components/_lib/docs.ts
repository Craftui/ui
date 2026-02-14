export type ApiProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}

export type DocMode = "base" | "radix"

export type InstallationSpec = Record<DocMode, string>

export type ComponentDocModeContent = {
  summary?: string
  description?: string
  api?: ApiProp[]
  a11y?: string[]
}

export type MatchCaseExampleDoc = {
  id: string
  title: string
  context: string
  points: string[]
}

export type ComponentDoc = {
  slug: string
  name: string
  status: "Available" | "In progress" | "Planned"
  isNew?: boolean
  category: "Foundations" | "Overlays" | "Utility"
  summary: string
  description: string
  installation: InstallationSpec
  api: ApiProp[]
  a11y: string[]
  modeContent?: Partial<Record<DocMode, ComponentDocModeContent>>
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
    installation: {
      base: "bunx shadcn@latest add button --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add button --registry https://craftui.dev/r/radix",
    },
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
    slug: "code-block",
    name: "Code Block",
    status: "Available",
    isNew: true,
    category: "Foundations",
    summary: "Interactive snippet container for documentation and guides.",
    description:
      "Code Block is a read-focused surface with utility controls. It supports copy-to-clipboard, line number visibility, wrap toggling, and progressive reveal for long snippets.",
    installation: {
      base: "bunx shadcn@latest add code-block --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add code-block --registry https://craftui.dev/r/radix",
    },
    api: [
      {
        name: "code",
        type: "string",
        defaultValue: "-",
        description: "Raw source text rendered inside the block.",
      },
      {
        name: "tabs",
        type: "Array<{ id: string; label: string; code: string; language?: string; filename?: string }>",
        defaultValue: "undefined",
        description: "Optional header tabs rendered in place of the language label.",
      },
      {
        name: "filename",
        type: "string",
        defaultValue: "undefined",
        description: "Optional file label rendered in the header.",
      },
      {
        name: "showLineNumbers",
        type: "boolean",
        defaultValue: "true",
        description: "Initial line-number visibility state.",
      },
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: "true",
        description: "Enables show more/show less behavior.",
      },
      {
        name: "maxCollapsedLines",
        type: "number",
        defaultValue: "6",
        description: "Visible line count before collapse is applied.",
      },
    ],
    a11y: [
      "Keep control labels explicit: Copy, Wrap, Lines, Show more.",
      "Use keyboard-focusable buttons for all toolbar actions.",
      "Provide sufficient contrast between code text and background surface.",
    ],
  },
  {
    slug: "match-case",
    name: "Match Case",
    status: "Available",
    isNew: true,
    category: "Utility",
    summary: "Render-prop utility for animated UI state switching.",
    description:
      "Match Case helps you map state values to views and animate the switch without context-heavy compound APIs. It keeps previous content mounted briefly for smooth exit transitions.",
    installation: {
      base: "bunx shadcn@latest add match-case --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add match-case --registry https://craftui.dev/r/radix",
    },
    api: [
      {
        name: "value",
        type: "string | number",
        defaultValue: "-",
        description: "Current active case key to match against in render calls.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "220",
        description: "Default transition duration in milliseconds.",
      },
      {
        name: "animation",
        type: '"\"none\" | \"fade\" | \"fade-up\" | \"fade-down\" | \"scale\" | \"blur\" | \"blur-up\""',
        defaultValue: '"fade-up"',
        description: "Global switch animation applied unless overridden per render call.",
      },
      {
        name: "easing",
        type: "string",
        defaultValue: '"cubic-bezier(0.2, 0.8, 0.2, 1)"',
        description: "Default timing function applied to switch animations.",
      },
      {
        name: "children",
        type: "(api) => ReactNode",
        defaultValue: "-",
        description: "Render-prop callback that receives is, render, and containerProps helpers.",
      },
      {
        name: "api.render(match, node, options?)",
        type: "function",
        defaultValue: "-",
        description: "Renders a case and animates active/exiting states for that match key.",
      },
      {
        name: "api.containerProps",
        type: "HTMLAttributes<HTMLDivElement>",
        defaultValue: "{ className: 'relative' }",
        description: "Props for the wrapper so exiting content can overlay cleanly during transitions.",
      },
    ],
    a11y: [
      "Respect reduced motion by keeping interactions usable without animation.",
      "Do not hide essential context only inside animated transitions.",
      "Keep focusable controls stable across cases when possible.",
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
    installation: {
      base: "bunx shadcn@latest add tooltip --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add tooltip --registry https://craftui.dev/r/radix",
    },
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
    installation: {
      base: "bunx shadcn@latest add popover --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add popover --registry https://craftui.dev/r/radix",
    },
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
    installation: {
      base: "bunx shadcn@latest add switch --registry https://craftui.dev/r/base",
      radix: "bunx shadcn@latest add switch --registry https://craftui.dev/r/radix",
    },
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

export function resolveComponentDocContent(doc: ComponentDoc, mode: DocMode) {
  const modeContent = doc.modeContent?.[mode]
  return {
    summary: modeContent?.summary ?? doc.summary,
    description: modeContent?.description ?? doc.description,
    api: modeContent?.api ?? doc.api,
    a11y: modeContent?.a11y ?? doc.a11y,
  }
}

export type TocLinkItem = {
  type: "link"
  id: string
  label: string
}

export type TocGroupItem = {
  type: "group"
  label: string
  items: TocLinkItem[]
}

export type TocItem = TocLinkItem | TocGroupItem

export const matchCaseExampleDocs: MatchCaseExampleDoc[] = [
  {
    id: "example-icon-switch",
    title: "Icon Switch",
    context: "Swap semantic icon states in compact controls and status badges.",
    points: [
      "Use a shared container size so transitions do not affect layout.",
      "Apply blur + fade for soft state changes in tight UI surfaces.",
      "Keep per-icon labels in surrounding UI for accessibility clarity.",
    ],
  },
  {
    id: "example-status-modes",
    title: "Status Modes",
    context: "Transition between idle, syncing, warning, and offline states.",
    points: [
      "Map server states to stable keys and let Match Case switch views.",
      "Use short transitions for frequent state polling updates.",
      "Pair with color tokens only as reinforcement, not the sole signal.",
    ],
  },
  {
    id: "example-loading-flow",
    title: "Loading Flow",
    context: "Move from skeleton to content without abrupt replacement.",
    points: [
      "Render loading and loaded branches as separate matched cases.",
      "Fade out placeholders while fading in content to hide data pop-in.",
      "Use equal min-height for both cases to avoid jumpiness.",
    ],
  },
  {
    id: "example-empty-success-error",
    title: "Empty, Success, Error",
    context: "Drive common async outcomes from one state source.",
    points: [
      "Assign one case key per response state.",
      "Keep message copy and action buttons isolated per case.",
      "Preserve container rhythm so changing outcomes feels stable.",
    ],
  },
  {
    id: "example-auth-step",
    title: "Auth Steps",
    context: "Switch login, OTP, and confirmation stages in one panel.",
    points: [
      "Use explicit step keys from your auth flow controller.",
      "Animate case handoffs while keeping outer card and heading fixed.",
      "Keep focus management separate from visual transitions.",
    ],
  },
  {
    id: "example-dashboard-density",
    title: "Dashboard Density",
    context: "Change card density presets without rerendering whole dashboards.",
    points: [
      "Match by density mode: compact, comfortable, spacious.",
      "Animate only inner view clusters to limit layout churn.",
      "Use subtle transitions to preserve analytical readability.",
    ],
  },
  {
    id: "example-command-palette",
    title: "Command Palette Panels",
    context: "Switch between root results and nested command groups.",
    points: [
      "Map active panel path to case keys.",
      "Blur/fade between panels for a calm navigation feel.",
      "Keep input and keyboard handlers outside case body.",
    ],
  },
  {
    id: "example-preview-device",
    title: "Device Preview Modes",
    context: "Toggle desktop, tablet, and mobile previews in a single viewport.",
    points: [
      "Use matched cases for each frame chrome mode.",
      "Retain viewport wrapper dimensions across switches.",
      "Combine with mode tabs to teach responsive behavior visually.",
    ],
  },
  {
    id: "example-editor-panels",
    title: "Editor Panels",
    context: "Swap editor panes such as write, preview, and diff.",
    points: [
      "Render each pane branch as a dedicated case with stable key.",
      "Apply minimal animation during rapid keyboard-driven switching.",
      "Keep scroll positions in external state where needed.",
    ],
  },
  {
    id: "example-settings-scope",
    title: "Settings Scope",
    context: "Switch account, team, and project settings content in one shell.",
    points: [
      "Use case keys from sidebar selection state.",
      "Animate content area only; keep navigation static.",
      "Pair with URL params for deep-linkable settings screens.",
    ],
  },
  {
    id: "example-toast-priority",
    title: "Toast Priority Presentation",
    context: "Present info, success, warning, and critical variants in-place.",
    points: [
      "Use matching keys for semantic severity.",
      "Adapt icon + copy + tone per case while preserving frame.",
      "Avoid long transitions for urgent states.",
    ],
  },
  {
    id: "example-inspector-tabs",
    title: "Inspector Side Panel",
    context: "Switch properties, tokens, and events panels in design tooling.",
    points: [
      "Keep panel width fixed to avoid reflow during mode switch.",
      "Use transition overlap to reduce visual tearing in dense forms.",
      "Group keyboard shortcuts by case for predictable behavior.",
    ],
  },
]

export const tocItems: TocItem[] = [
  { type: "link", id: "overview", label: "Overview" },
  { type: "link", id: "demo", label: "Interactive demo" },
  { type: "link", id: "installation", label: "Installation" },
  { type: "link", id: "api", label: "API reference" },
  { type: "link", id: "accessibility", label: "Accessibility" },
]

export function getTocItemsForSlug(slug?: string): TocItem[] {
  if (slug === "match-case") {
    return [
      { type: "link", id: "overview", label: "Overview" },
      { type: "link", id: "demo", label: "Interactive demo" },
      { type: "link", id: "installation", label: "Installation" },
      {
        type: "group",
        label: "Examples",
        items: matchCaseExampleDocs.map((item) => ({
          type: "link",
          id: item.id,
          label: item.title,
        })),
      },
      { type: "link", id: "api", label: "API reference" },
      { type: "link", id: "accessibility", label: "Accessibility" },
    ]
  }
  return tocItems
}
