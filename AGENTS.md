# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages and layouts (`page.tsx`, route folders like `about/`, `components/`).
- `src/components/`: shared UI and site chrome (`site-header.tsx`, `site-footer.tsx`, `ui/` primitives).
- `src/lib/`: utility helpers (for example `utils.ts`).
- `registry/` + `registry.*.json`: shadcn-style registry sources for Base and Radix variants.
- `public/r/`: generated registry output served to consumers.
- `docs/`: project plans and design notes.
- `example/`: companion sample app for deployment/config validation.

## Build, Test, and Development Commands
- `npm run dev`: start local Next.js dev server.
- `npm run build`: create production build.
- `npm run start`: run built app.
- `npm run lint`: run ESLint (required before PR).
- `npm run registry:build`: generate both Base and Radix registry artifacts.
- `npm run cf:preview` / `npm run cf:deploy`: preview or deploy via OpenNext + Cloudflare.

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js 16), Tailwind CSS utilities for component styling.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components: PascalCase filenames for reusable components (`SiteHeader`), route files follow Next.js conventions (`page.tsx`, `layout.tsx`).
- Prefer utility-first Tailwind classes in JSX; keep `src/app/globals.css` for theme tokens/base styles.
- Linting: ESLint (`eslint.config.mjs`). Fix warnings/errors before merging.

## UI Library & Styling Guidelines
- CraftUI is an editorial, motion-aware component library focused on calm, high-signal interfaces.
- Visual direction:
  - Light-first, near-neutral backgrounds with subtle atmospheric gradients.
  - Soft borders, rounded geometry, and restrained contrast (avoid heavy shadows by default).
  - Typography pairing: expressive display headings + clean body text.
- Color system:
  - Use semantic tokens from `:root` in `src/app/globals.css` (`--background`, `--foreground`, `--muted`, `--border`, etc.).
  - Do not hardcode arbitrary color palettes when a token exists.
  - Accent color should be subtle; avoid saturated gradients unless explicitly requested.
- Motion principles:
  - Motion should clarify state/focus, not decorate.
  - Keep transitions short and intentional; always include `motion-reduce` fallbacks.
  - Prefer transform/opacity transitions over layout-shifting animations.
- Component expectations:
  - Reusable primitives live in `src/components/ui/`; page composition stays in route files.
  - Build variants with `class-variance-authority` when component APIs require size/tone/state options.
  - Maintain keyboard focus visibility and accessible contrast for all interactive controls.
- Navbar/shell behavior:
  - Site chrome should integrate with page atmosphere (transparent or glass treatment) while preserving readability.
  - Background and grain effects should be subtle and consistent across routes.

## Testing Guidelines
- There is no formal test suite configured yet.
- Minimum quality gate: `npm run lint` + manual verification in `npm run dev`.
- For UI changes, validate responsive behavior (mobile + desktop) and key routes (`/`, `/components`, `/about`).

## Commit & Pull Request Guidelines
- Use concise, scoped commit messages. Preferred format: `type(scope): summary`.
- Common types in history: `feat`, `fix`, `refactor`, `style`, `chore`.
- Examples:
  - `style(navbar): add liquid-glass gradient with blur fallback`
  - `refactor(ui): move landing and card styles to Tailwind utilities`
- PRs should include:
  - clear summary of user-visible changes,
  - linked issue (if applicable),
  - screenshots/GIFs for UI edits,
  - confirmation that `npm run lint` passed.
