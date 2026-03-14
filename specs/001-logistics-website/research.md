# Research: SSVT Logistics Corporate Website

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

## Decision Log

---

### 1. Page Generation Strategy (MPA without SSG framework)

**Decision**: Custom Node.js build script (`scripts/build-static.mjs`) using
`ReactDOM.renderToStaticMarkup` to pre-render all pages to HTML at build time.

**Rationale**:
- Constitution prohibits Next.js, Nuxt, Remix (SSG/SSR frameworks)
- Pure Vite MPA mode requires one hand-maintained HTML file per route — unworkable for 40+ pages
- `ReactDOM.renderToStaticMarkup` is part of `react-dom/server` (already a dependency); zero extra cost
- Build script reads JSON data files, passes data as props to React page templates, writes HTML output
- Vite then processes the generated HTML as entry points (handles CSS/JS bundling + asset hashing)

**How it works**:
```
scripts/build-static.mjs
  ├── reads data/*.json
  ├── for each page route (static + dynamic from JSON slugs):
  │     renders PageTemplate with data props → HTML string via renderToStaticMarkup
  │     injects <script type="module"> pointing to island entry (src/pages/{type}/main.jsx)
  │     writes to dist/{route}/index.html
  └── passes generated entry point map to vite.build({ rollupOptions.input })
```

**Alternatives considered**:
- **Astro**: Excellent fit but not explicitly permitted by constitution (spirit of "no SSG frameworks")
- **11ty**: Lightweight but adds a non-JavaScript-component templating system (YAGNI)
- **Vite manual MPA**: Requires 40+ manually maintained HTML files — rejected for maintainability
- **Pure client-side React SPA**: Search engines cannot index client-rendered content — rejected for SEO (SC-002)

---

### 2. React vs Preact

**Decision**: **React 18** for primary development; **Preact** configured as a `vite.config.js`
alias fallback if the initial bundle exceeds 250 KB during implementation.

**Bundle figures** (uncompressed):
- `react` 18: ~7 KB
- `react-dom` 18 (client): ~130 KB
- `react-dom/server` (build-time only, NOT in browser bundle): ~0 KB runtime cost
- Tailwind CSS (purged, ~30 components): ~35 KB
- Custom utils (animations, consent, analytics): ~8 KB
- **Total initial browser bundle: ~180 KB** ✅ well under 300 KB limit

**Preact compat** (~10 KB total) is a drop-in swap via `vite.config.js`:
```js
resolve: { alias: { 'react': 'preact/compat', 'react-dom': 'preact/compat' } }
```
No component code changes required. Activate only if React bundle measurement exceeds 250 KB.

---

### 3. Scroll Animations

**Decision**: **CSS transitions + Intersection Observer API** (zero external library).

**Implementation**:
```js
// src/utils/animations.js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function observeReveal(selector = '[data-reveal]') {
  if (prefersReduced) return; // honour user preference — no animation
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}
```
```css
/* base.css */
[data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; }
[data-reveal].revealed { opacity: 1; transform: none; }
```
All animated elements carry `data-reveal` attribute in their static HTML output.

**Alternatives considered**:
- **AOS (Animate On Scroll)**: 13 KB — rejected (YAGNI; Intersection Observer achieves identical result)
- **GSAP Free**: ~30 KB — rejected (overkill for fade-in/slide-up; no constitution justification)
- **Framer Motion**: ~90 KB — rejected (React-only, large, would push bundle toward limit)

---

### 4. Hero Text Cycling

**Decision**: Vanilla JS `setInterval` + CSS `opacity` transitions (zero library).

**Implementation**:
```js
// HeroCarousel.jsx island
const INTERVAL = 4000; // configurable from site.json heroCarouselIntervalMs
let current = 0;
const slides = document.querySelectorAll('[data-hero-slide]');
setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, INTERVAL);
```
`prefers-reduced-motion` check stops the interval; first slide remains visible.

---

### 5. Stat Counter Animation

**Decision**: `requestAnimationFrame` loop + Intersection Observer trigger (vanilla JS, ~1 KB).

Counter starts when the stats section enters the viewport. Easing: `easeOutCubic`.
`prefers-reduced-motion`: skip animation, display final value immediately.

---

### 6. Static Search (Pagefind)

**Decision**: **Pagefind** — runs as a post-build CLI step, generates a static search index in `dist/_pagefind/`.

**Integration**:
```jsonc
// package.json scripts
"build": "node scripts/build-static.mjs && vite build && pagefind --site dist"
```
The `SearchBar.jsx` island lazily imports the Pagefind UI bundle:
```js
// Only loads when user opens the search UI (~50 KB, not in initial bundle)
const { PagefindUI } = await import('/pagefind/pagefind-ui.js');
```

**Search index size estimate**: ~15–30 KB for 40 pages of text content (Pagefind compresses well).
**Search UI**: ~50 KB uncompressed — lazy-loaded, excluded from initial bundle.

**Alternatives considered**:
- **Lunr.js**: Client-side, requires full content JSON in browser — ~200 KB+ for this content volume; rejected
- **Fuse.js**: Same issue — all content must be in browser memory; rejected
- **Algolia/ElasticSearch**: External API call — violates Static-First principle; rejected

---

### 7. Contact Form

**Decision**: **Formspree** — POST to `https://formspree.io/f/{formId}`, form ID stored in `site.json`.

**Implementation** (no SDK — raw `fetch`):
```js
const response = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({ name, email, phone, service, message })
});
```
Success: HTTP 200 → show success message from `ui.json`.
Error: non-200 → show error message + mailto fallback link (both from `ui.json`).

**Fallback**: If `formspreeId` is absent from `site.json`, the form renders a `mailto:` link only.

---

### 8. Cookie Consent

**Decision**: Custom vanilla JS (~2 KB), localStorage-based.

**Logic**:
1. On page load: read `ssvt_consent` from localStorage.
2. If absent: show banner (copy from `ui.json`); block analytics script injection.
3. If `"accepted"`: inject analytics script (if `analyticsId` set in `site.json`).
4. If `"declined"`: do not inject; no banner shown on subsequent visits.

No external consent library needed — the only use of localStorage is this single key.

---

### 9. Styling Approach

**Decision**: **Tailwind CSS 3** with custom design tokens defined in `tailwind.config.js`.

Breakpoints defined as Tailwind theme extensions (not magic values in component styles):
```js
// tailwind.config.js
theme: {
  extend: {
    screens: { xs: '320px', sm: '480px', md: '768px', lg: '1280px', xl: '1440px' }
  }
}
```
CSS custom properties in `src/styles/base.css` for brand colours, spacing, and typography scale —
accessible from both Tailwind utilities and any non-Tailwind CSS.

---

### 10. Image Format Strategy

**Decision**: Provide WebP primary + PNG/JPG fallback using HTML `<picture>` element.

```html
<picture>
  <source srcset="/images/hero/banner.webp" type="image/webp">
  <img src="/images/hero/banner.jpg" alt="..." loading="lazy">
</picture>
```
AVIF skipped for v1 (limited tooling support; constitutionally allowed but YAGNI at this stage).
All images under `public/images/` are pre-optimised before commit (target: ≤150 KB per image).
Hero image above-the-fold: `loading="eager"` + `fetchpriority="high"`. All others: `loading="lazy"`.

---

### 11. 404 Page Deployment

**Decision**: `dist/404.html` at repository root — compatible with GitHub Pages, Netlify, and S3+CloudFront (all support custom 404 via a root `404.html` file).

---

### 12. Accessibility Testing

**Decision**: **Playwright + @axe-core/playwright** for automated WCAG 2.1 AA audits.

Run against the served `dist/` build (not the dev server) to catch any build-time regressions.
Manual VoiceOver/NVDA check required before merge (per constitution Principle III).

---

## Resolved NEEDS CLARIFICATION Items

| Item | Resolution |
|------|-----------|
| Framework choice (React vs Vue) | React 18 — first-listed in constitution; larger ecosystem; same bundle size as Vue 3 |
| Static page generation without SSG framework | Custom `build-static.mjs` script using `react-dom/server` |
| Scroll animation library | None — CSS + Intersection Observer API |
| Hero animation | CSS + vanilla JS `setInterval` |
| Static search tool | Pagefind (post-build, lazy-loaded) |
| Contact form backend | Formspree (raw fetch, no SDK) |
| Cookie consent implementation | Custom ~2 KB vanilla JS + localStorage |
| Image format | WebP + fallback `<picture>` element |
| Tailwind breakpoints | Defined as theme tokens in `tailwind.config.js` |
