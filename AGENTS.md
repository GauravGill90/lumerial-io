<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: lumerial.io

Landing page for Lumerial — a product signal intelligence tool that aggregates app reviews, support tickets, forum threads, and telemetry into engineering-level fix suggestions.

## Stack

- **Next.js 16** (App Router, Turbopack) — `src/app/`
- **TypeScript** — strict, no `any`
- **Tailwind CSS** — utility classes + inline styles for one-off values
- **Phosphor Icons** (`@phosphor-icons/react`) — ESM-only, every file importing it **must** have `"use client"` at the top
- **Resend** — waitlist email capture via `/api/waitlist`
- **Vercel** — auto-deploys on push to `main`

## Design system

- **Background:** `#ffffff`
- **Foreground:** `#0a0a0a`
- **Accent:** `#eab308` (yellow) — used for icons, highlights, CTAs
- **Muted text:** `#555` body, `#666` secondary, `#999` tertiary
- **Border:** `#e8e8e8` standard, `#d0d0d0` strong
- **Border radius:** `4px` everywhere — no large rounded corners
- **Font:** Space Grotesk (variable `--font-heading`), weights 400–700 only (no 800/900)
- **No dark mode** — white bg only

## Component rules

- All components in `src/components/` use `"use client"` — the page is fully client-rendered
- No fake social proof, testimonials, or made-up numbers
- Hover states use `onMouseEnter`/`onMouseLeave` inline (not Tailwind `hover:`) for fine-grained color control
- Section headers follow the pattern: yellow uppercase label → large bold heading

## Key files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Page composition — section order lives here |
| `src/components/Navbar.tsx` | Fixed nav, scrolled border, logo mark + wordmark |
| `src/components/LogoMark.tsx` | SVG logo mark (corner offset, concept C) |
| `src/components/Hero.tsx` | Two-column hero: copy left, dark dashboard right |
| `src/components/EngineeringSignals.tsx` | Signal cards with telemetry-backed / pattern-only badges |
| `src/components/CTA.tsx` | Waitlist form → POST `/api/waitlist` |
| `src/app/api/waitlist/route.ts` | Resend integration — requires `RESEND_API_KEY` env var |

## Environment variables

| Var | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes (for waitlist) | Resend API key |
| `WAITLIST_NOTIFY_EMAIL` | No | Override notification recipient (default: ggill@armstrongfluidtechnology.com) |

## Dev

```bash
npm run dev    # starts on :3000 (or next available port)
npm run build  # must pass before deploying
```

Push to `main` → Vercel auto-deploys to `lumerial.io`.
