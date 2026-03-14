# Quickstart: SSVT Logistics Corporate Website

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime for build scripts and Vite |
| npm | 10+ | Package management |
| Git | 2.40+ | Version control |

---

## Setup

```bash
# 1. Clone and enter the repo
git clone <repo-url>
cd ssvt

# 2. Install dependencies
npm install
```

---

## Development

```bash
# Start development server (hot reload, serves from memory)
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Note**: The dev server serves the homepage. To preview other pages during
> development, run `npm run build:preview` (generates all HTML then serves `dist/`).

---

## Build

```bash
# Full production build (generates all HTML pages + bundles + search index)
npm run build
```

This runs three steps in sequence:
1. `node --import tsx/esm scripts/build-static.mjs` — reads all JSON data, renders React templates
   to HTML, writes page files, validates slug cross-references. The `--import tsx/esm` flag is
   required to enable JSX imports in the Node.js build script without a separate transpile step.
2. `vite build` — bundles JS islands, processes Tailwind CSS, hashes assets
3. `npx pagefind --site dist` — crawls all HTML, generates search index in `dist/pagefind/`

---

## Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder at `http://localhost:4173`. Use this to verify the full
site including search, form, and animations before deploying.

---

## Quality Checks

```bash
# Run unit tests (Vitest)
npm test

# Run E2E tests — accessibility + responsive + SEO audit (Playwright)
# Requires a running preview server; starts one automatically
npm run test:e2e

# Accessibility audit only (axe-core via Playwright)
npm run test:a11y

# Lighthouse CI audit (Performance ≥ 80, SEO ≥ 95)
npm run lighthouse

# Check initial JS bundle size (must be ≤ 300 KB uncompressed)
npm run bundle:check
```

---

## Deploy

The `dist/` folder is a self-contained set of static files. Deploy to any static host:

```bash
# GitHub Pages (via gh-pages package)
npm run deploy:gh

# Netlify (drag-and-drop dist/ or configure build command in netlify.toml)
# Build command: npm run build
# Publish directory: dist

# AWS S3 + CloudFront
aws s3 sync dist/ s3://<bucket-name>/ --delete
```

**Custom 404**: `dist/404.html` is automatically served for unmatched routes on
GitHub Pages and Netlify. For S3, configure a custom error document in the bucket settings.

---

## Content Updates

All content is in `data/`. No code changes are needed for content-only updates:

```bash
# Edit a service
nano data/services/renewable-logistics.json

# Add a new insight article
cp data/insights/index.json   # add entry to array
nano data/insights/new-article.json   # create detail file

# Rebuild after any data change
npm run build
```

---

## Adding a New Service

1. Add a summary entry to `data/services/index.json`
2. Create `data/services/{slug}.json` with full detail
3. Add service icon to `public/images/services/{slug}.svg`
4. Run `npm run build` — the build script auto-generates `/services/{slug}/index.html`

---

## Seed Data

During development, placeholder seed data is acceptable. Run:

```bash
npm run seed
```

This copies `scripts/seed/` placeholder JSON files into `data/` for local development
(does not overwrite existing files).

---

## Environment Variables

No environment variables are required. All configuration is in `data/config/site.json`.

| Config key | Purpose | Required |
|-----------|---------|---------|
| `formspreeId` | Contact form endpoint | No — falls back to mailto |
| `analyticsId` | Analytics tracking | No — analytics disabled if absent |
| `brochurePdfPath` | Brochure download link | No — link hidden if absent |

---

## npm Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Dev server with HMR |
| `build` | `node --import tsx/esm scripts/build-static.mjs && vite build && npx pagefind --site dist` | Full production build |
| `preview` | `vite preview` | Serve `dist/` locally |
| `test` | `vitest run` | Unit tests |
| `test:e2e` | `playwright test` | E2E + a11y + responsive tests |
| `test:a11y` | `playwright test --grep @a11y` | Accessibility tests only |
| `lighthouse` | `lhci autorun` | Lighthouse CI audit |
| `bundle:check` | `bundlesize` | Verify initial JS ≤ 300 KB |
| `deploy:gh` | `gh-pages -d dist` | Deploy to GitHub Pages |
| `seed` | `node scripts/seed.mjs` | Copy placeholder data files |
