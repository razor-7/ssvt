# Implementation Plan: SSVT Logistics Corporate Website

**Branch**: `001-logistics-website` | **Date**: 2026-03-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-logistics-website/spec.md`

## Summary

Build a 19-page (40+ HTML files when dynamic routes are expanded) static corporate website
for SSVT Logistics. All content is driven exclusively by JSON files under `data/`. Pages are
pre-rendered to static HTML at build time using a custom Node.js script + React
`renderToStaticMarkup`; interactive elements (filters, contact form, search, cookie consent,
hero carousel, stat counters) are hydrated as React islands on the static pages. Vite handles
bundling, asset optimisation, and the dev server. Tailwind CSS provides the styling layer.
Pagefind generates a static full-text search index post-build. The finished artefact is a
folder of static files deployable to any static host with zero server process.

## Technical Context

**Language/Version**: JavaScript ES2022+ / Node.js 20+ (build-time); browser-target ES2019+
**Framework**: React 18 + Vite 5 (MPA — multipage static generation, React islands for interactivity)
**Styling**: Tailwind CSS 3 (single CSS approach; utility-first; purged at build)
**Storage**: Local JSON files under `data/` at repository root (no database, no runtime fetch)
**Testing**: Vitest (component unit tests), Playwright (E2E: accessibility, responsive, SEO audit)
**Target Platform**: Any static host — GitHub Pages, Netlify, or S3+CloudFront; no server process
**Project Type**: Static multi-page website (MPA)
**Performance Goals**: Lighthouse Performance ≥ 80 (mobile), FCP ≤ 3 s on 4G, Lighthouse SEO ≥ 95
**Constraints**: Initial JS bundle ≤ 300 KB uncompressed; no backend; no SSR/SSG framework; IE excluded
**Scale/Scope**: 19 page types → ~40 pre-rendered HTML files; 20+ JSON data files; 9 services; 10 industries; 4+ case studies

### Dependency Bundle Budget

| Package | Uncompressed | Notes |
|---------|-------------|-------|
| react + react-dom 18 | ~140 KB | Core runtime |
| Tailwind CSS 3 (purged) | ~30–50 KB | Varies by class usage |
| Intersection Observer utils (custom) | ~3 KB | Scroll animations, no library |
| Cookie consent (custom) | ~2 KB | Vanilla JS |
| Contact form (custom fetch) | ~3 KB | No Formspree SDK |
| Pagefind search UI | ~50 KB | **Lazy-loaded** — excluded from initial bundle |
| **Total initial bundle** | **~198 KB** | ✅ Under 300 KB |

> **Fallback**: If initial bundle exceeds 300 KB, swap React 18 for **Preact + compat** (~10 KB)
> with identical component API. No code changes required beyond `vite.config.js` alias.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked below after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|---------|
| **I. Simplicity & YAGNI** | ✅ Pass | No speculative abstractions. Custom scroll utils instead of AOS/GSAP library. Custom cookie consent instead of a library. No Redux, no router — islands only. Pagefind for search avoids a backend search service. |
| **II. Static-First** | ✅ Pass | All data from `data/*.json`. Build output is static files. No `fetch()` to external APIs at runtime (form POST to Formspree is a user action, not a data-layer call). Analytics script is asynchronous and optional. Map is a static image, not an iframe. |
| **III. Accessibility** | ✅ Pass | WCAG 2.1 AA required (SC-005). All images carry alt text (FR-013). `prefers-reduced-motion` respected by all animations (FR-009). Playwright + axe-core gate enforced before merge. |
| **IV. Responsive Design** | ✅ Pass | Mobile-first Tailwind. Validated at 320 px / 480 px / 768 px / 1280 px+. Breakpoints as Tailwind config tokens, not magic values. Touch targets ≥ 44×44 CSS px. |
| **V. Lightweight & Performance** | ✅ Pass | Initial JS ≈ 198 KB uncompressed (< 300 KB limit). Pagefind lazy-loaded. Images served as WebP/AVIF. Analytics async, non-blocking. Lighthouse ≥ 80 gate enforced. |

**Constitution Check: ALL GATES PASS — proceed to Phase 0.**

### Post-Design Re-Check (after Phase 1)

*Re-evaluated after data-model and contracts are complete — no violations found.*

| Gate | Result |
|------|--------|
| No dependency added without justification | ✅ Every package in budget table is directly required by a spec FR |
| Single CSS approach | ✅ Tailwind CSS only; no CSS-in-JS, no SCSS alongside |
| No SSR/SSG framework | ✅ Custom Node.js build script; not Next.js/Nuxt/Remix |
| Static output only | ✅ `dist/` contains HTML/CSS/JS/assets — no server process |

## Project Structure

### Documentation (this feature)

```text
specs/001-logistics-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── page-data-contract.md
│   ├── form-submission-contract.md
│   ├── search-contract.md
│   └── analytics-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
/                                   # repository root
├── data/                           # ALL content (per FR-020 — see data-model.md)
│   ├── config/
│   │   ├── site.json
│   │   ├── navigation.json
│   │   └── ui.json
│   ├── services/
│   │   ├── index.json
│   │   └── {slug}.json             # ×9 files
│   ├── industries/
│   │   ├── index.json
│   │   └── {slug}.json             # ×10 files
│   ├── case-studies/
│   │   ├── index.json
│   │   └── {slug}.json             # ×4+ files
│   ├── insights/
│   │   ├── index.json
│   │   └── {slug}.json             # ×n files
│   ├── about.json
│   ├── team.json
│   ├── compliance.json
│   ├── qehs.json
│   ├── sustainability.json
│   ├── training-academy.json
│   ├── careers.json
│   ├── statistics.json
│   ├── offices.json
│   ├── partners.json
│   ├── awards.json
│   └── privacy-policy.md
│
├── public/                         # static assets (copied as-is to dist/)
│   ├── images/
│   │   ├── hero/                   # hero background images (WebP)
│   │   ├── services/               # service icons/images (SVG + WebP)
│   │   ├── industries/             # industry images (WebP)
│   │   ├── case-studies/           # case study images (WebP)
│   │   ├── team/                   # team member photos (WebP, optional)
│   │   ├── partners/               # partner logos (SVG preferred)
│   │   └── map-static.webp         # static office map image
│   └── brochure.pdf                # downloadable company brochure
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # nav bar + mobile menu toggle
│   │   │   ├── Footer.jsx          # footer with links, social, brochure
│   │   │   ├── MobileNav.jsx       # mobile drawer menu
│   │   │   └── CookieBanner.jsx    # consent banner (analytics gate)
│   │   ├── ui/
│   │   │   ├── HeroCarousel.jsx    # hero text cycling + CTA
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── IndustryCard.jsx
│   │   │   ├── CaseStudyCard.jsx
│   │   │   ├── InsightCard.jsx
│   │   │   ├── TeamMemberCard.jsx
│   │   │   ├── StatCounter.jsx     # count-up animation on scroll
│   │   │   ├── FilterBar.jsx       # generic client-side filter (services, case studies, insights)
│   │   │   ├── ContactForm.jsx     # Formspree POST, validation, success/error state
│   │   │   ├── SearchBar.jsx       # lazy-loads Pagefind UI
│   │   │   ├── BackToTop.jsx       # sticky scroll-to-top button
│   │   │   └── Timeline.jsx        # animated milestones timeline (About page)
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── ServicesSection.jsx
│   │       ├── IndustriesSection.jsx
│   │       ├── StatsSection.jsx
│   │       ├── CaseStudiesSection.jsx
│   │       ├── PartnersStrip.jsx
│   │       ├── AwardsSection.jsx
│   │       ├── SustainabilityTeaser.jsx
│   │       └── ContactSection.jsx
│   │
│   ├── pages/                      # one subdirectory per page type
│   │   ├── home/main.jsx           # island entry — hydrates homepage interactives
│   │   ├── about/main.jsx
│   │   ├── leadership/main.jsx
│   │   ├── compliance/main.jsx
│   │   ├── qehs/main.jsx
│   │   ├── services/main.jsx
│   │   ├── service-detail/main.jsx # used for all /services/{slug}/ pages
│   │   ├── industries/main.jsx
│   │   ├── industry-detail/main.jsx
│   │   ├── case-studies/main.jsx
│   │   ├── case-study-detail/main.jsx
│   │   ├── insights/main.jsx
│   │   ├── insight-detail/main.jsx
│   │   ├── sustainability/main.jsx
│   │   ├── training-academy/main.jsx
│   │   ├── careers/main.jsx
│   │   ├── contact/main.jsx
│   │   ├── privacy-policy/main.jsx
│   │   └── 404/main.jsx
│   │
│   ├── templates/                  # React components for static rendering (renderToStaticMarkup)
│   │   ├── PageShell.jsx           # HTML document wrapper (<html>, <head>, <body>)
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── LeadershipPage.jsx
│   │   ├── CompliancePage.jsx
│   │   ├── QEHSPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── ServiceDetailPage.jsx
│   │   ├── IndustriesPage.jsx
│   │   ├── IndustryDetailPage.jsx
│   │   ├── CaseStudiesPage.jsx
│   │   ├── CaseStudyDetailPage.jsx
│   │   ├── InsightsPage.jsx
│   │   ├── InsightDetailPage.jsx
│   │   ├── SustainabilityPage.jsx
│   │   ├── TrainingAcademyPage.jsx
│   │   ├── CareersPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── PrivacyPolicyPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── utils/
│   │   ├── animations.js           # Intersection Observer scroll reveal + reduced-motion check
│   │   ├── analytics.js            # conditional analytics injection from site.json
│   │   └── consent.js              # cookie consent read/write (localStorage)
│   │
│   └── styles/
│       ├── base.css                # CSS custom properties (design tokens: colours, spacing, type)
│       └── tailwind.css            # @tailwind directives
│
├── scripts/
│   └── build-static.mjs            # Node.js: reads JSON → renders templates → writes HTML to dist/
│
├── vite.config.js                  # Vite multipage input + PostCSS + React plugin
├── tailwind.config.js              # content paths, theme tokens (breakpoints as variables)
├── postcss.config.js
└── package.json
```

**Structure Decision**: Single-project MPA. No `backend/` or `frontend/` split — there is no
backend. The `src/templates/` tree handles static rendering; `src/pages/` handles island
hydration; `src/components/` is shared between both. `data/` is the content layer,
completely separate from `src/`.

## Complexity Tracking

| Decision | Justification | Simpler Alternative Rejected Because |
|----------|--------------|-------------------------------------|
| Custom build script (`build-static.mjs`) | 40+ HTML pages must be pre-rendered for SEO; spec requires MPA with unique `<head>` per page | Pure Vite MPA with manual HTML files would require maintaining 40+ HTML files; using a prohibited SSG framework (Next.js/Nuxt) is constitutionally blocked |
| React islands on static pages | 6 interactive features (filter, form, search, consent, hero carousel, stat counter) require JS interactivity | Pure HTML + vanilla JS could work for simple cases but becomes unmaintainable across 19 page types; React provides the component model the constitution already sanctions |
| Pagefind (post-build) | Static full-text search across 40+ pages with zero runtime server (FR-E04) | No simpler static search solution exists; Pagefind is the standard tool for this use case; it is lazy-loaded so it does not affect the initial bundle |
| **Constitution II Exception — Formspree `fetch()` POST** | FR-007 and FR-P20 require a working contact form. The spec mandates Formspree as the static-compatible form service. The `ContactForm` component issues a single `fetch()` POST to `https://formspree.io/f/{id}` only on explicit user submission — this is a user-initiated action, not a background data-fetching call or a runtime dependency. All page content and data remain exclusively from local JSON. Constitution Principle II prohibits runtime `fetch()` to external APIs for *data*; this POST carries no data into the page — it only sends user-entered form data outbound. | A pure `mailto:` fallback is provided when `formspreeId` is null (zero external dependency). The alternative of a serverless function would require amending the Static-First principle more significantly. This exception is the minimum departure from Principle II needed to satisfy FR-007. |
| **micromark (build-time Markdown parser)** | `data/insights/{slug}.json` (`bodyMarkdown`), `data/case-studies/{slug}.json` (`fullBody`), and `data/privacy-policy.md` store content in Markdown. Converting at build time in `build-static.mjs` requires a Markdown→HTML parser. **Browser bundle impact: zero** — micromark runs only in Node.js during the build; it is never bundled into any client JS file. | Node.js stdlib has no Markdown parser. A regex-based hand-rolled converter is insufficient for spec content (headings, lists, links). micromark is the lightest compliant CommonMark parser (~20 KB installed, 0 KB browser impact). |
