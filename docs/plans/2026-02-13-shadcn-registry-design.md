# Shadcn Registry Setup (Base UI + Radix UI)

Date: 2026-02-13

## Goals

- Provide two registries (Base UI and Radix UI) from a single Next.js app.
- Lock a minimal Button API that follows Emil Kowalski’s “scale on press” tip.
- Keep the registry simple, explicit, and compatible with the latest shadcn CLI.

## Non-Goals (for this phase)

- Tooltip/Popover origin-aware animations.
- Complex state props like `isLoading` or `isSuccess` on Button.
- Advanced theming or animation libraries.

## Approach Options Considered

1. Single app with two registry files and two build outputs (selected).
2. Two separate apps/deployments (rejected: doubles infra).
3. Single registry with dual item names (rejected: noisy UX).

## Selected Architecture

- One Next.js app.
- Two registry definition files at repo root:
  - `registry.base.json`
  - `registry.radix.json`
- Two build outputs:
  - `public/r/base`
  - `public/r/radix`
- Two source trees for registry items:
  - `registry/base/...`
  - `registry/radix/...`
- Shared registry lib file:
  - `registry/shared/utils.ts`

## Button API (Base + Radix)

- One minimal API for both stacks.
- Tailwind-only press feedback: `active:scale-[0.97]` with short transitions.
- Base UI button wraps `@base-ui/react` Button.
- Radix button uses `@radix-ui/react-slot` for `asChild` support.
- Both variants share the same variant + size definitions (CVA).

## Registry Items

Each registry includes:

- `utils` (type `registry:lib`) for `cn()` helper.
- `button` (type `registry:ui`) with `registryDependencies: ["utils"]`.
- Dependencies declared per item (e.g., `@base-ui/react` vs `@radix-ui/react-slot`).

## Build Scripts

Add scripts:

- `registry:build:base` → `shadcn build --output ./public/r/base ./registry.base.json`
- `registry:build:radix` → `shadcn build --output ./public/r/radix ./registry.radix.json`
- `registry:build` → runs both

Note: The shadcn CLI documentation notes that the `build` command is available in
`shadcn@latest`, but some docs mention `@canary`. We will follow latest and
adjust if needed when installing the CLI.

## Testing

- Manual check: run `registry:build` and confirm JSON files exist in both output dirs.
- Spot-check one output file for correctness (paths, dependencies, file payload).

