# ssvt Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-14

## Active Technologies

- JavaScript ES2022+ / Node.js 20+ (build-time); browser-target ES2019+ (001-logistics-website)

## Stack

- **Framework**: React 18 + Vite 5 (MPA, static generation via custom build script)
- **Styling**: Tailwind CSS 3 (single CSS approach — no other CSS systems)
- **Search**: Pagefind (post-build, lazy-loaded — NOT in initial bundle)
- **Forms**: Formspree (raw fetch POST — no SDK)
- **Animations**: CSS + Intersection Observer API (no AOS/GSAP)
- **Build script**: `scripts/build-static.mjs` (Node.js, generates HTML from JSON + React templates)
- **No backend. No SSR/SSG framework. No runtime data fetching.**

## Project Structure

```text
data/           # ALL content JSON files (source of truth)
public/         # static assets (images, brochure PDF)
src/
  components/   # shared React components (layout/, ui/, sections/)
  pages/        # island entry points per page type (main.jsx)
  templates/    # React components for static HTML rendering at build time
  utils/        # animations.js, analytics.js, consent.js
  styles/       # base.css (design tokens), tailwind.css
scripts/
  build-static.mjs   # page generation script
dist/           # production build output (deploy this folder)
specs/          # feature specs and plans (do not edit during implementation)
```

## Commands

```bash
npm run dev          # development server
npm run build        # full production build (generate + vite + pagefind)
npm run preview      # serve dist/ locally
npm test             # unit tests (Vitest)
npm run test:e2e     # E2E + a11y tests (Playwright)
npm run lighthouse   # Lighthouse CI audit
npm run bundle:check # verify JS bundle ≤ 300 KB
```

## Code Style

- All user-visible text strings MUST come from `data/config/ui.json` — zero hardcoded strings in JSX
- All page content MUST come from `data/*.json` files
- Breakpoints MUST use Tailwind config tokens — no magic pixel values in component styles
- Every interactive element MUST be keyboard-navigable (WCAG 2.1 AA)
- Animations MUST check `prefers-reduced-motion` before running

## Recent Changes

- 001-logistics-website: Added JavaScript ES2022+ / Node.js 20+ (build-time); browser-target ES2019+

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
