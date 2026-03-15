# SSVT Logistics — Corporate Website

Static corporate website for **SSVT Logistics**, a specialist in heavy-lift transport, project logistics, port terminal handling, and supply chain solutions for complex industries worldwide.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 (islands architecture) |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 (single CSS approach) |
| Static Generation | Custom Node.js build script (`scripts/build-static.mjs`) |
| Search | Pagefind (post-build, lazy-loaded) |
| Forms | Formspree (fetch POST, optional — falls back to mailto) |
| Animations | CSS + Intersection Observer API |
| Runtime | **None** — fully static, no server required |

## Project Structure

```
data/                        # All content (source of truth — JSON files)
  config/
    site.json                # Company info, hero messages, SEO defaults
    navigation.json          # Nav items and dropdown children
    ui.json                  # All user-visible UI strings
  services/                  # 9 service detail JSON files + index.json
  industries/                # 10 industry detail JSON files + index.json
  case-studies/              # 4 case study detail JSON files + index.json
  insights/                  # 3 article detail JSON files + index.json
  tracking.json              # Shipment tracking page content
  about.json, team.json, careers.json, offices.json, statistics.json, ...

public/                      # Static assets (images, nav.js, brochure PDF)
  images/
    services/                # 9 SVG service icons
    industries/              # 10 SVG industry icons
    case-studies/            # 4 photorealistic SVG scene thumbnails (wind farm, refinery, mining, power plant)
    hero/                    # hero-bg.svg — 1440×800 container-port golden-hour scene (swap for WebP photo via site.json)
    team/, partners/
  nav.js                     # Vanilla JS for header dropdowns & mobile nav
  favicon.svg                # Branded SVG favicon
  favicon.ico                # Multi-size ICO (16/32/48px)
  site.webmanifest           # PWA manifest
  brochure.pdf               # Downloadable company brochure

src/
  components/
    layout/                  # Header, Footer, MobileNav, CookieBanner
    ui/                      # HeroCarousel, ServiceCard, SearchBar, ContactForm, ...
    sections/                # HeroSection, TrustBanner, ServicesSection, StatsSection, ...
  pages/                     # 20 island entry points (one per page type)
  templates/                 # React components for static HTML generation
  styles/
    base.css                 # CSS custom properties (brand tokens)
    tailwind.css             # Tailwind directives + base.css import
  utils/
    animations.js            # Scroll-reveal (IntersectionObserver)
    analytics.js             # Google Analytics injection (optional)
    consent.js               # Cookie consent (localStorage)

scripts/
  build-static.mjs           # Generates all 42 HTML files from JSON + React templates
  generate-favicon.mjs       # Rasterises favicon.svg → favicon.ico + site.webmanifest

dist/                        # Production build output — deploy this folder
specs/                       # Feature specifications and implementation plans
```

## Pages (42 HTML files)

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero carousel, trust banner, services, industries, stats, case studies, partners |
| Services | `/services/` | All 9 services grid |
| Service Detail | `/services/[slug]/` | 9 individual service pages |
| About | `/about/` | Company story and values |
| Leadership | `/leadership/` | Team members |
| Compliance | `/compliance/` | Certifications and standards |
| QEHS | `/qehs/` | Quality, Environment, Health & Safety |
| Industries | `/industries/` | All 10 industries grid |
| Industry Detail | `/industries/[slug]/` | 10 individual industry pages |
| Insights | `/insights/` | Blog/articles listing |
| Insight Detail | `/insights/[slug]/` | 3 individual article pages |
| Case Studies | `/case-studies/` | Project case studies listing |
| Case Study Detail | `/case-studies/[slug]/` | 4 individual case study pages |
| Contact | `/contact/` | Contact form and office locations (6 global offices) |
| Tracking | `/tracking/` | Shipment tracking enquiry form and how-it-works |
| Careers | `/careers/` | Open positions |
| Sustainability | `/sustainability/` | ESG commitments |
| Training Academy | `/training-academy/` | Training programmes |
| Privacy Policy | `/privacy-policy/` | Legal |
| 404 | `/404.html` | Not found page |

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Generates static HTML then starts the Vite dev server. Navigate to `http://localhost:5173/`.

> **Note:** Content changes require re-running `npm run dev` since HTML is generated at build time from JSON files. Use `npm run preview` to serve the full production build including Vite-bundled assets.

### Production Build

```bash
npm run build
```

Runs in three steps:
1. `node --import tsx/esm scripts/build-static.mjs` — generates 42 HTML files
2. `vite build` — bundles JS/CSS assets into `dist/assets/`
3. `npx pagefind --site dist` — indexes all pages for search

Output is in `dist/`. Deploy the entire `dist/` folder to any static host.

### Preview Production Build

```bash
npm run preview
```

Serves `dist/` locally at `http://localhost:4173/`.

## Configuration

All site content and configuration lives in `data/`. No code changes are needed for content updates.

### Key config files

| File | Purpose |
|------|---------|
| `data/config/site.json` | Company name, hero messages, contact email, analytics ID, Formspree ID |
| `data/config/navigation.json` | Nav items and dropdown children |
| `data/config/ui.json` | Every user-visible string in the UI |

### Enable Contact Form (Formspree)

Set `formspreeId` in `data/config/site.json`:

```json
"formspreeId": "your-formspree-form-id"
```

When `null`, the form falls back to a `mailto:` link.

### Enable Analytics (Google Analytics)

Set `analyticsId` in `data/config/site.json`:

```json
"analyticsId": "G-XXXXXXXXXX"
```

When `null`, no analytics script is injected.

### Hero Background Image

Set `heroBackgroundPath` in `data/config/site.json`:

```json
"heroBackgroundPath": "/images/hero/hero-bg.svg"
```

The value can be any image path served from `public/` — SVG, WebP, or JPEG. When `null` or omitted, the hero falls back to a CSS gradient. The current default is a 1440×800 photorealistic SVG scene of a container port at golden hour (`public/images/hero/hero-bg.svg`). Replace with real photography by dropping a WebP file into `public/images/hero/` and updating this field — no code changes required.

### Brochure PDF

Set `brochurePdfPath` in `data/config/site.json`:

```json
"brochurePdfPath": "/brochure.pdf"
```

Place the file at `public/brochure.pdf`. When `null`, the download button is hidden.

## Adding Content

### Add a new Insight article

1. Create `data/insights/your-slug.json` (copy an existing file as template)
2. Add a summary entry to `data/insights/index.json`
3. Run `npm run build`

### Add a new Service or Industry

Follow the same pattern as above using `data/services/` or `data/industries/`.

Add a matching SVG icon to `public/images/services/` or `public/images/industries/`.

## Deployment

The `dist/` folder is a fully self-contained static site. Deploy to any static host:

| Platform | Notes |
|----------|-------|
| Azure Static Web Apps | CI/CD via `.github/workflows/`; config in `staticwebapp.config.json` |
| GitHub Pages | `npm run deploy:gh` (requires `gh-pages` package) |
| Netlify | Drag and drop `dist/`, or set build command `npm run build` and publish dir `dist` |
| Vercel | Set framework to "Other", build command `npm run build`, output dir `dist` |
| AWS S3 | `aws s3 sync dist/ s3://your-bucket --delete` |

## Scripts

```bash
npm run dev           # Development server
npm run build         # Full production build
npm run preview       # Serve dist/ locally
npm run favicon       # Regenerate favicon.ico + site.webmanifest from favicon.svg
npm test              # Unit tests (Vitest)
npm run test:e2e      # End-to-end + accessibility tests (Playwright)
npm run lighthouse    # Lighthouse CI audit
npm run bundle:check  # Verify JS bundle ≤ 300 KB
```

## Architecture Notes

### Islands Architecture

The site is statically pre-rendered HTML. JavaScript is only loaded for interactive components ("islands"):

- Each page type has an entry point in `src/pages/[page]/main.jsx`
- Islands hydrate specific DOM nodes using `ReactDOM.createRoot()`
- Page data is embedded as JSON in `<script id="__PAGE_DATA__" type="application/json">`
- The shared React chunk (~145 KB) is loaded once and cached across pages

### Filter Islands

The homepage Services and Industries sections are wrapped in a `#filter-root` mount point. On hydration, `FilterRoot` in `src/pages/home/main.jsx` replaces the static fallback with an interactive React tree that shares `activeIndustry` state between the two sections, enabling cross-section filtering without a page reload.

### CSS Custom Properties

Brand colours and design tokens are defined as CSS variables in `src/styles/base.css` and referenced via Tailwind's config (`tailwind.config.js`). The `@import './base.css'` line must be first in `tailwind.css` — PostCSS silently drops imports that appear after `@tailwind` directives.

### Navigation Interactivity

Desktop dropdown menus and the mobile nav drawer are powered by `public/nav.js` — a small vanilla JS IIFE that runs on every page using `data-*` attribute selectors, without requiring React hydration. The mobile nav includes a keyboard focus trap (Tab/Shift-Tab cycling) and returns focus to the hamburger button on close.

### Search (Pagefind)

Full-text search is powered by Pagefind, indexed post-build. The `SearchBar` component lazy-loads `/pagefind/pagefind-ui.js` on first open and re-initializes `PagefindUI` on every subsequent open — ensuring the search input is always visible regardless of how many times the modal is opened and closed.

### Hero Carousel

`HeroCarousel.jsx` cycles hero messages with a smooth fade + slide transition (`opacity` + `translateY`, no `key`-driven remount). A `requestAnimationFrame` progress ring shows time until the next slide. The carousel pauses on hover, respects `prefers-reduced-motion`, and announces slide changes via `aria-live="polite"`.

### CI/CD (Azure Static Web Apps)

Deployment is handled by `.github/workflows/azure-static-web-apps-lively-cliff-04acf7f00.yml`. The workflow uses `Azure/static-web-apps-deploy@v1` with the deployment token stored as `AZURE_STATIC_WEB_APPS_API_TOKEN_LIVELY_CLIFF_04ACF7F00` in GitHub Secrets. OIDC token flow is not used.

## Constitution

This project follows a formal [constitution](.specify/memory/constitution.md) that governs all development decisions:

- **Simplicity & YAGNI** — no speculative abstractions
- **Static-First** — no backend, no runtime API calls
- **Accessibility** — WCAG 2.1 AA on every component
- **Responsive Design** — mobile-first, 44px touch targets
- **Lightweight** — initial JS ≤ 300 KB per page

Quality gates (accessibility, performance, bundle size, responsive layout) must pass before merging to `main`.
