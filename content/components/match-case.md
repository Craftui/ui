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
## Icon Switch
Swap semantic icon states in compact controls and status badges.

## Status Modes
Transition between idle, syncing, warning, and offline states.

## Loading Flow
Move from skeleton to content without abrupt replacement.

## Empty, Success, Error
Drive common async outcomes from one state source.

## Auth Steps
Switch login, OTP, and confirmation stages in one panel.

## Dashboard Density
Change card density presets without rerendering whole dashboards.

## Command Palette Panels
Switch between root results and nested command groups.

## Device Preview Modes
Toggle desktop, tablet, and mobile previews in a single viewport.

## Editor Panels
Swap editor panes such as write, preview, and diff.

## Settings Scope
Switch account, team, and project settings content in one shell.

## Toast Priority Presentation
Present info, success, warning, and critical variants in-place.

## Inspector Side Panel
Switch properties, tokens, and events panels in design tooling.
