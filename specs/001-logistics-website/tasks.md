# Tasks: SSVT Logistics Corporate Website

**Input**: Design documents from `/specs/001-logistics-website/`
**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US9)

## Path Conventions

Single-project MPA. All source at repository root: `src/`, `data/`, `scripts/`, `public/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, tooling configuration, npm wiring.

- [X] T001 Initialize package.json with name "ssvt", type "module", Node 20+ engine requirement in package.json
- [X] T002 Install runtime dependencies: react@18, react-dom@18, react/jsx-runtime in package.json (npm install)
- [X] T003 Install dev dependencies: vite@5, @vitejs/plugin-react, tailwindcss@3, postcss, autoprefixer, pagefind in package.json (npm install --save-dev)
- [X] T004 [P] Configure Vite multipage with react plugin and all page entry points in vite.config.js
- [X] T005 [P] Configure Tailwind CSS with content paths, theme tokens (breakpoints as variables), and custom colour palette in tailwind.config.js
- [X] T006 [P] Configure PostCSS with tailwindcss and autoprefixer plugins in postcss.config.js
- [X] T007 Add all npm scripts (dev, build, build:preview, preview, test, test:e2e, test:a11y, lighthouse, bundle:check, seed, deploy:gh) to package.json — `build:preview` runs `node scripts/build-static.mjs && vite build && vite preview` for full-site local preview without Pagefind

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared config data, layout components, style tokens, utility modules, and the build script skeleton — MUST complete before any user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T008 Create src/styles/base.css with CSS custom properties for brand colours (navy, orange-accent), spacing scale, typography scale, and animation tokens
- [X] T009 [P] Create src/styles/tailwind.css with @tailwind base/components/utilities directives
- [X] T010 Create data/config/site.json with SiteConfig seed data (companyName "SSVT Logistics", tagline, 3 heroMessages, heroCTALabel, heroCarouselIntervalMs 4000, seoDefaults, contactEmail, formspreeId null, socialLinks, analyticsId null, brochurePdfPath null) — **Note**: `formspreeId: null` activates the mailto-only fallback in ContactForm; to validate US5 form submission end-to-end, replace null with a real or sandbox Formspree ID before running the US5 checkpoint
- [X] T011 [P] Create data/config/navigation.json with full NavItem array: Home, Who We Are (About/Leadership/Compliance/Q&EHS), Our Solutions (Services/Industries/Training Academy), Insights, Sustainability, Careers, Contact
- [X] T012 [P] Create data/config/ui.json with all UIStrings keys defined in data-model.md (NAV_*, HERO_*, SERVICES_*, INDUSTRIES_*, CASE_STUDIES_*, STATS_*, PARTNERS_*, AWARDS_*, CONTACT_FORM_*, COOKIE_*, SEARCH_*, BACK_TO_TOP, CAREERS_*, INSIGHTS_*, NOT_FOUND_*, BROCHURE_*, FOOTER_*)
- [X] T013 Create src/templates/PageShell.jsx — HTML document wrapper rendering <!DOCTYPE html>, <html lang="en">, <head> (charset, viewport, title, meta description, canonical, og:title/og:description/og:image, JSON-LD slot), <body> with Header (add `data-pagefind-ignore`), slot for page content wrapped in `<main data-pagefind-body>`, Footer (add `data-pagefind-ignore`), CookieBanner (add `data-pagefind-ignore`), BackToTop, and <script id="__PAGE_DATA__" type="application/json"> island hydration tag — `data-pagefind-*` attributes are required by the search-contract for correct Pagefind indexing scope
- [X] T014 Create src/components/layout/Header.jsx — responsive nav bar reading navigation and ui props; desktop: horizontal link list with dropdown menus; search icon button; brochure download link from siteConfig; active link highlighting via currentPath
- [X] T015 [P] Create src/components/layout/MobileNav.jsx — slide-in drawer triggered by hamburger button; renders same nav tree as Header; close on overlay click or Escape key; focus-trapped while open; all labels from ui prop
- [X] T016 [P] Create src/components/layout/Footer.jsx — company name, tagline, social links, privacy policy link, brochure download link, copyright — all from siteConfig and ui props; no hardcoded strings
- [X] T017 [P] Create src/components/layout/CookieBanner.jsx — renders when analyticsId is set and consent is not yet stored; Accept/Decline buttons write to localStorage; on Accept injects analytics script; all copy from ui prop
- [X] T018 Create src/utils/animations.js — exports initScrollReveal() using IntersectionObserver to add animate-in class to elements with data-reveal attribute; reads window.matchMedia('(prefers-reduced-motion: reduce)') and skips animation setup if true
- [X] T019 [P] Create src/utils/analytics.js — exports injectAnalytics(analyticsId) that appends async analytics script tag to <head> only when analyticsId is a non-empty string; no-op otherwise; no console errors
- [X] T020 [P] Create src/utils/consent.js — exports getConsent(), setConsent(value), clearConsent() reading/writing the `ssvt_consent` key in localStorage (key name matches analytics-contract.md and CookieBanner consent state table)
- [X] T021 Create src/components/ui/BackToTop.jsx — sticky button appearing after 400px scroll using scroll event listener; smooth-scrolls to top on click; label from ui prop; hidden on initial load
- [X] T022 Create scripts/build-static.mjs skeleton — Node.js ESM script: imports fs/path, sets up renderPage(templateComponent, pageData, outputPath) helper using react-dom/server renderToStaticMarkup, writes DOCTYPE + rendered HTML to dist/{outputPath}/index.html; includes slug cross-reference validator; includes SEO title/description length warnings

---

## Phase 3: User Story 1 — First Impression Homepage (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor lands on the homepage and within one viewport identifies SSVT's name, value proposition, and at least three service areas. Animated hero cycles three messages. CTA scrolls to services.

**Independent Test**: Run `npm run build` and open `dist/index.html`; without scrolling, the hero carousel is visible with animated messages and a CTA button; below the fold, service cards, industry filter, stats, case study tiles, partners strip, and awards section are all populated from JSON.

- [X] T023 [US1] Create data/services/index.json with 9 ServiceSummary entries: renewable-logistics, project-heavy-lift, port-terminal-handling, freight-forwarding, customs-clearance, warehousing-distribution, oversized-cargo, supply-chain-consulting, last-mile-delivery — each with id, slug, name, shortDescription ≤120 chars, icon path
- [X] T024 [P] [US1] Create data/industries/index.json with 10 IndustrySummary entries: renewable-energy, oil-and-gas, mining-metals, construction, power-generation, manufacturing, government-defence, pharmaceutical, automotive, infrastructure — each with id, slug, name, icon, summary ≤100 chars
- [X] T025 [P] [US1] Create data/case-studies/index.json with 4 CaseStudySummary entries covering at least 2 different industries and services; each with id, slug, title, industryTag, serviceTag, distanceKm, summaryText ≤160 chars, thumbnailPath null, thumbnailAlt
- [X] T026 [P] [US1] Create data/statistics.json with 4–6 Statistic entries (e.g. "Years in Operation" 15, "Projects Completed" 1200, "Fleet Vehicles" 250, "Countries Served" 12) each with label, value string, numericValue number, unit
- [X] T027 [P] [US1] Create data/partners.json with 4–6 Partner entries (placeholder names) each with name, logoPath "/images/partners/placeholder.svg", logoAlt, websiteUrl null
- [X] T028 [P] [US1] Create data/awards.json with 3–4 Award entries (placeholder awards) each with name, issuingBody, year, badgePath null, badgeAlt
- [X] T029 [US1] Create src/components/ui/HeroCarousel.jsx — client-side island: cycles heroMessages array with configurable interval; CSS transition between messages; primary CTA button anchor-scrolling to #services; carousel pauses on hover; respects prefers-reduced-motion (no cycling when true); all text from props
- [X] T030 [P] [US1] Create src/components/ui/ServiceCard.jsx — renders service name, shortDescription, icon img (with alt), and "Learn more" link to /services/{slug}/; all text from props; keyboard-navigable
- [X] T031 [P] [US1] Create src/components/ui/IndustryCard.jsx — renders industry name, icon, summary, link to /industries/{slug}/; keyboard-navigable; all text from props
- [X] T032 [P] [US1] Create src/components/ui/CaseStudyCard.jsx — renders title, industryTag badge, serviceTag badge, summaryText, distanceKm metric, thumbnail img (with alt or empty alt if decorative); links to /case-studies/{slug}/; all text from props
- [X] T033 [P] [US1] Create src/components/ui/StatCounter.jsx — animates numeric value from 0 to numericValue using requestAnimationFrame when scrolled into view (IntersectionObserver); displays value string and label; respects prefers-reduced-motion (shows final value immediately)
- [X] T034 [US1] Create src/components/sections/HeroSection.jsx — static shell rendering HeroCarousel island placeholder for SSR; scroll-reveal wrapper; full-viewport hero background; scroll hint from ui prop
- [X] T035 [P] [US1] Create src/components/sections/ServicesSection.jsx — id="services" anchor; renders grid of ServiceCard components from services prop; section heading from ui prop; data-reveal for scroll animation
- [X] T036 [P] [US1] Create src/components/sections/IndustriesSection.jsx — renders IndustryCard grid; accepts `activeIndustry` and `onIndustryChange` props so the filter state is lifted to the shared React root in home/main.jsx (see T045); section heading from ui prop; data-reveal — **Architecture note**: IndustriesSection and ServicesSection must share filter state via a single co-hydrated React root, not separate roots; do NOT make this component manage its own isolated filter state
- [X] T037 [P] [US1] Create src/components/sections/StatsSection.jsx — renders StatCounter for each statistic; section heading from ui prop; data-reveal
- [X] T038 [P] [US1] Create src/components/sections/CaseStudiesSection.jsx — renders up to 4 CaseStudyCard components; section heading from ui prop; data-reveal
- [X] T039 [P] [US1] Create src/components/sections/PartnersStrip.jsx — horizontal strip with partner logos (img with alt); auto-scrolling or fade-in animation respecting prefers-reduced-motion; section heading from ui prop
- [X] T040 [P] [US1] Create src/components/sections/AwardsSection.jsx — renders award cards (name, issuingBody, year, badge img with alt or placeholder); section heading from ui prop; data-reveal
- [X] T041 [P] [US1] Create src/components/sections/SustainabilityTeaser.jsx — renders sustainability heading and body teaser with CTA link to /sustainability/; data-reveal
- [X] T042 [P] [US1] Create src/components/sections/ContactSection.jsx — static placeholder rendering form field structure (name, email, phone, service dropdown, message, honeypot, submit); form markup only — ContactForm.jsx wires interactivity in US5
- [X] T043 [US1] Create src/templates/HomePage.jsx — assembles HeroSection, ServicesSection, IndustriesSection, StatsSection, CaseStudiesSection, PartnersStrip, AwardsSection, SustainabilityTeaser, ContactSection in order per FR-P01; passes all required props from pageData
- [X] T044 [US1] Add homepage generation to scripts/build-static.mjs: load all required JSON files, assemble HomePageData per page-data-contract.md (caseStudies first 4 only, sustainability teaser only), render HomePage in PageShell, write to dist/index.html; embed __PAGE_DATA__ JSON with HeroCarousel, FilterBar, StatCounter island data
- [X] T045 [US1] Create src/pages/home/main.jsx — island entry: reads __PAGE_DATA__; renders a **single React root** (`ReactDOM.createRoot`) that wraps both IndustriesSection and ServicesSection together so they share `activeIndustry` state (satisfies FR-004 cross-section filter); also hydrates HeroCarousel, StatCounter, CookieBanner, BackToTop; calls initScrollReveal() on DOMContentLoaded

**Checkpoint**: `npm run build && npm run preview` — homepage renders with animated hero, 9 service cards, industry filter, stats, 4 case study tiles, partners, awards, sustainability teaser.

---

## Phase 4: User Story 2 — Service Exploration (Priority: P2)

**Goal**: A user can navigate from the homepage service card to a dedicated service page at `/services/{slug}/` and see full description, related industry tags, linked case studies, and related services — all from JSON.

**Independent Test**: Open `dist/services/renewable-logistics/index.html`; verify full description, industry tags, at least one case study link, and related services block are all present without JS.

- [X] T046 [US2] Create all 9 service detail JSON files: data/services/renewable-logistics.json, project-heavy-lift.json, port-terminal-handling.json, freight-forwarding.json, customs-clearance.json, warehousing-distribution.json, oversized-cargo.json, supply-chain-consulting.json, last-mile-delivery.json — each with id, slug, name, fullDescription (multi-paragraph), icon, heroImagePath null, heroImageAlt, industryTags[], caseStudySlugs[], relatedServiceSlugs[], seo{title ≤60, description ≤160}
- [X] T047 [P] [US2] Create src/templates/ServicesPage.jsx — renders services overview grid using ServiceCard components; section heading from ui; SEO metadata from pageData.seo; data-reveal on cards
- [X] T048 [P] [US2] Create src/templates/ServiceDetailPage.jsx — renders service hero image (or coloured header fallback), fullDescription (markdown-rendered), industry tag pills linking to /industries/{slug}/, related case study tiles (CaseStudyCard), related services grid; all cross-links per FR-E05; seo metadata from pageData.seo
- [X] T049 [US2] Add services page generation to scripts/build-static.mjs: generate dist/services/index.html from ServicesPage; for each service slug generate dist/services/{slug}/index.html from ServiceDetailPage with hydrated relatedIndustries, relatedCaseStudies, relatedServices per page-data-contract.md; validate all slug cross-references exist
- [X] T050 [P] [US2] Create src/pages/services/main.jsx — island entry: reads __PAGE_DATA__, hydrates BackToTop, CookieBanner, initScrollReveal
- [X] T051 [P] [US2] Create src/pages/service-detail/main.jsx — island entry: reads __PAGE_DATA__, hydrates BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: All 9 `/services/{slug}/` pages render with correct data; each links to its related industries and case studies.

---

## Phase 5: User Story 6 — Company Trust Pages (Priority: P2)

**Goal**: A prospective partner can visit /about/, /leadership/, /compliance/, /qehs/ and answer "when was the company founded, who leads it, and what standards does it meet" from those pages alone.

**Independent Test**: Open dist/about/index.html — company story paragraphs, visual milestones timeline, and certifications block are all present with no hardcoded text.

- [X] T052 [US6] Create data/about.json with heroImagePath null, heroImageAlt, storyParagraphs[] (3 paragraphs), milestones[] (6 entries with year and event), certifications[] (3 entries with name, body, year, badgePath null, badgeAlt), seo{title, description}
- [X] T053 [P] [US6] Create data/team.json with 4–6 TeamMember entries each with name, title, bio, photoPath null, photoAlt
- [X] T054 [P] [US6] Create data/compliance.json with heading, body, certifications[] (ISO 9001, ISO 14001, OHSAS 18001 placeholders with name, description, badgePath null, badgeAlt), seo{title, description}
- [X] T055 [P] [US6] Create data/qehs.json with heading, body, metrics[] (4 safety/quality metrics), policies[] (3 policy entries), seo{title, description}
- [X] T056 [US6] Create src/components/ui/Timeline.jsx — vertical or horizontal timeline rendering milestone entries; each entry animates in on scroll via IntersectionObserver (data-reveal); respects prefers-reduced-motion; all text from props
- [X] T057 [P] [US6] Create src/components/ui/TeamMemberCard.jsx — renders photo img (with alt) or SVG placeholder illustration when photoPath is null; name, title, bio; all from props
- [X] T058 [US6] Create src/templates/AboutPage.jsx — renders hero image (or header fallback), storyParagraphs, Timeline component with milestones, certifications/awards block; all from pageData.about; seo metadata
- [X] T059 [P] [US6] Create src/templates/LeadershipPage.jsx — renders grid of TeamMemberCard components from pageData.team; section heading from ui; seo metadata
- [X] T060 [P] [US6] Create src/templates/CompliancePage.jsx — renders policy heading, body, certifications grid (badge img with alt or placeholder, name, description); seo metadata; all from pageData.policy
- [X] T061 [P] [US6] Create src/templates/QEHSPage.jsx — renders heading, body, metrics list, policies accordion-style list; seo metadata; all from pageData.policy (uses same PolicyPageData interface as Compliance)
- [X] T062 [US6] Add about/leadership/compliance/qehs page generation to scripts/build-static.mjs: generate dist/about/index.html, dist/leadership/index.html, dist/compliance/index.html, dist/qehs/index.html; assemble correct pageData per page-data-contract.md for each
- [X] T063 [P] [US6] Create src/pages/about/main.jsx — island: reads __PAGE_DATA__, hydrates Timeline scroll-reveal, BackToTop, CookieBanner, initScrollReveal
- [X] T064 [P] [US6] Create src/pages/leadership/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal
- [X] T065 [P] [US6] Create src/pages/compliance/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal
- [X] T066 [P] [US6] Create src/pages/qehs/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: /about/, /leadership/, /compliance/, /qehs/ all render with seed data; timeline animates on scroll.

---

## Phase 6: User Story 7 — Industry Solutions (Priority: P3)

**Goal**: A procurement manager navigating to /industries/oil-and-gas/ can read industry-specific challenges, SSVT's response, relevant service cards, and linked case studies — from JSON, without visiting any other page.

**Independent Test**: Open dist/industries/oil-and-gas/index.html — challenges, how-we-help body, relevant service cards, and at least one case study tile are present.

- [X] T067 [US7] Create all 10 industry detail JSON files: data/industries/renewable-energy.json, oil-and-gas.json, mining-metals.json, construction.json, power-generation.json, manufacturing.json, government-defence.json, pharmaceutical.json, automotive.json, infrastructure.json — each with id, slug, name, heroImagePath null, heroImageAlt, challengesDescription, howWeHelpBody, relatedServiceSlugs[], caseStudySlugs[], seo{title, description}
- [X] T068 [P] [US7] Create src/templates/IndustriesPage.jsx — renders grid of IndustryCard components from pageData.industries; section heading from ui; seo metadata; data-reveal
- [X] T069 [P] [US7] Create src/templates/IndustryDetailPage.jsx — renders hero image (or header fallback), challengesDescription, howWeHelpBody, related services grid (ServiceCard), related case study tiles (CaseStudyCard); all cross-links per FR-E05; seo metadata
- [X] T070 [US7] Add industries page generation to scripts/build-static.mjs: generate dist/industries/index.html from IndustriesPage; for each industry slug generate dist/industries/{slug}/index.html from IndustryDetailPage with hydrated relatedServices and relatedCaseStudies; validate slug cross-references
- [X] T071 [P] [US7] Create src/pages/industries/main.jsx — island: reads __PAGE_DATA__, hydrates BackToTop, CookieBanner, initScrollReveal
- [X] T072 [P] [US7] Create src/pages/industry-detail/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: All 10 /industries/{slug}/ pages render; each links back to related services and case studies.

---

## Phase 7: User Story 3 — Mobile Responsiveness (Priority: P3)

**Goal**: All pages are usable on a 375px viewport with no horizontal overflow, touch targets ≥44px, and the nav collapses to a mobile drawer.

**Independent Test**: Open any page at 375px viewport width; no horizontal scrollbar; hamburger menu opens the drawer; all CTAs are tappable.

- [X] T073 [US3] Audit Header.jsx and MobileNav.jsx: add md:hidden/hidden md:flex Tailwind classes so hamburger shows on ≤768px and desktop nav hides; verify drawer opens/closes with keyboard (Enter, Escape) and overlay tap; test at 375px, 480px, and 768px
- [X] T074 [P] [US3] Audit all section components (HeroSection, ServicesSection, IndustriesSection, StatsSection, CaseStudiesSection, PartnersStrip, AwardsSection) for mobile grid layout at **480px, 768px, 1280px** (constitution-mandated breakpoints) plus 320px/375px: change any fixed-column grids to responsive grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 patterns; remove any px values using magic pixel widths
- [X] T075 [P] [US3] Audit all interactive elements (ServiceCard, IndustryCard, CaseStudyCard, BackToTop, nav links) for minimum touch target size: add min-h-[44px] min-w-[44px] or py-3 px-4 padding where targets are smaller; verify at 480px viewport per constitution Principle IV
- [X] T076 [P] [US3] Audit PageShell.jsx and all template files for viewport meta tag presence; verify no element uses overflow-x causing horizontal scroll at **320px, 480px** (both must pass — 480px is the constitution's minimum breakpoint); fix any w-full children that overflow with padding using box-border or overflow-x-hidden on layout wrapper

**Checkpoint**: Resize any built page to 375px; zero horizontal scrollbar; nav drawer functions.

---

## Phase 8: User Story 8 — Insights Articles (Priority: P4)

**Goal**: A visitor can browse /insights/, use the category filter, and read a full article at /insights/{slug}/ with published date and related articles.

**Independent Test**: Open dist/insights/index.html — article cards sorted newest-first; open one article detail page — full body, date, and related links present.

- [X] T077 [US8] Create data/insights/index.json with 3 ArticleSummary entries sorted newest-first (different categories); create corresponding detail files data/insights/{slug}.json for each with bodyMarkdown (2–3 paragraphs), publishedDate, author null, relatedSlugs[], seo{title, description}
- [X] T078 [P] [US8] Create src/components/ui/InsightCard.jsx — renders article title, publishedDate (formatted), category badge, summary text, thumbnail img with alt (or empty alt); links to /insights/{slug}/; all text from props
- [X] T079 [P] [US8] Create src/components/ui/FilterBar.jsx — reusable client-side filter island: receives items[] and filterKey; renders category/tag buttons; on click filters visible cards using data attributes; "All" button resets filter; accessible with keyboard nav; all labels from props
- [X] T080 [US8] Create src/templates/InsightsPage.jsx — renders InsightCard grid sorted newest-first; FilterBar island placeholder for category filter; empty-state message from ui.INSIGHTS_NO_ARTICLES when articles array is empty; seo metadata; data-reveal on cards
- [X] T081 [P] [US8] Create src/templates/InsightDetailPage.jsx — renders article title, publishedDate, category badge, optional author, bodyMarkdown rendered to HTML (using a simple marked/micromark call in build-static.mjs), thumbnail img with alt; related articles section (up to 3 InsightCard links); seo metadata; cross-links per FR-E05
- [X] T082 [US8] Add insights page generation to scripts/build-static.mjs: sort articles newest-first, extract distinct categories array, generate dist/insights/index.html from InsightsPage; for each insight slug generate dist/insights/{slug}/index.html with hydrated relatedArticles; parse bodyMarkdown to HTML at build time; validate relatedSlugs references
- [X] T083 [P] [US8] Create src/pages/insights/main.jsx — island: reads __PAGE_DATA__, hydrates FilterBar (category filter), BackToTop, CookieBanner, initScrollReveal
- [X] T084 [P] [US8] Create src/pages/insight-detail/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: /insights/ shows 3 articles; category filter hides/shows cards; each article detail page has full content.

---

## Phase 9: User Story 4 — SEO Completeness (Priority: P4)

**Goal**: Every static page has a unique title ≤60 chars, meta description ≤160 chars, canonical URL, OG tags, and all images carry descriptive alt text. Homepage and service pages include JSON-LD structured data.

**Independent Test**: Inspect HTML source of dist/index.html, dist/services/renewable-logistics/index.html, and dist/about/index.html — each has unique title, meta description, canonical, og:title, og:image, and valid JSON-LD.

- [X] T085 [US4] Add JSON-LD Organization schema to PageShell.jsx homepage rendering — include @type Organization, name, url, logo, sameAs (social links) — data sourced from siteConfig prop; only injected when currentPath is "/"
- [X] T086 [P] [US4] Add JSON-LD Service schema injection to scripts/build-static.mjs for each service detail page — @type Service, name, description, provider {Organization} — sourced from ServiceDetail data
- [X] T087 [P] [US4] Audit PageShell.jsx: verify <title> renders as "{page.seo.title} | {siteConfig.companyName}", <meta name="description"> uses page seo.description, <link rel="canonical"> uses absolute canonicalUrl, <meta property="og:title/og:description/og:image/og:url"> all present — fix any missing tags
- [X] T088 [P] [US4] Audit all template components (HomePage, ServiceDetailPage, IndustryDetailPage, CaseStudyDetailPage, InsightDetailPage, AboutPage, LeadershipPage) — confirm every <img> has a non-empty alt attribute unless purely decorative (empty alt=""); fix any missing alts
- [X] T089 [P] [US4] Add SEO validation to scripts/build-static.mjs: after each page render, check seo.title length ≤60 and seo.description length ≤160, print warning to stderr for violations; add check that all caseStudySlugs, relatedServiceSlugs, industryTags references resolve to existing files — throw with descriptive error if missing

**Checkpoint**: Run `node scripts/build-static.mjs` with no validation errors; inspect 3 pages — each has unique, well-formed head section.

---

## Phase 10: User Story 5 — Contact Form (Priority: P5)

**Goal**: A prospect can submit the contact form (name, email, phone, service, message) via Formspree POST; a success/error state appears within 2 seconds; form resets on success; invalid email shows inline error on blur.

**Independent Test**: Open dist/contact/index.html; submit with missing fields — required field errors appear inline; submit with valid data — success message appears (mock Formspree endpoint in test env).

- [X] T090 [US5] Create data/offices.json with locations[] (Head Office, Corporate Office, 1 Regional Office — placeholder addresses and phone numbers) and mapConfig{staticMapImagePath "/images/map-static.svg", mapImageAlt "SSVT Logistics office locations map", viewOnMapsUrl "https://maps.google.com"}
- [X] T091 [P] [US5] Create src/components/ui/ContactForm.jsx — controlled React form with fields: name, email, phone, service (select populated from services prop), message, hidden honeypot (_gotcha), submit button; client-side validation per form-submission-contract.md (required + email RFC 5322 pattern); POST to Formspree on submit; shows CONTACT_FORM_SUBMITTING during POST; shows CONTACT_FORM_SUCCESS and resets fields on 200; shows CONTACT_FORM_ERROR + mailto fallback link on error; all labels/messages from ui prop; submit disabled during POST
- [X] T092 [US5] Update src/components/sections/ContactSection.jsx to import and render ContactForm.jsx island placeholder (for SSR markup) and wire the interactive ContactForm island in the page entry
- [X] T093 [P] [US5] Create src/templates/ContactPage.jsx — renders ContactSection (with ContactForm), office location cards (type, label, address, phone — from pageData.offices.locations), static map image with mapImageAlt and "View on Maps" external link; no iframe or external JS; seo metadata
- [X] T094 [US5] Add contact page generation to scripts/build-static.mjs: load offices.json and services index, generate dist/contact/index.html from ContactPage per ContactPageData interface; embed __PAGE_DATA__ with formspreeId, services names, contactEmail for ContactForm island — **Note**: with formspreeId null (seed default) the form renders as a mailto link; set a real Formspree ID in data/config/site.json to test actual POST submission for the US5 checkpoint
- [X] T095 [P] [US5] Create src/pages/contact/main.jsx — island: reads __PAGE_DATA__, hydrates ContactForm, BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: /contact/ renders office cards and static map; form shows inline validation; (with a real formspreeId) submits successfully.

---

## Phase 11: User Story 9 — Careers (Priority: P5)

**Goal**: A job seeker visiting /careers/ sees culture/values, open roles from JSON, and a speculative application pathway. When openRoles is empty the empty-state message from ui.json renders without broken layout.

**Independent Test**: Open dist/careers/index.html with openRoles populated — roles list visible; update data/careers.json openRoles to [] and rebuild — empty-state message from ui.json renders correctly.

- [X] T096 [US9] Create data/careers.json with cultureHeading, cultureBody, values[] (3 entries with title, description, iconPath null), openRoles[] (2 sample roles with title, location, type, description, applyUrl null) — and one build with empty openRoles[] to verify empty state
- [X] T097 [US9] Create src/templates/CareersPage.jsx — renders culture/values section (value cards with icon or placeholder, title, description), open roles list (role title, location, type badge, description, Apply link to applyUrl or /contact/); when openRoles is empty renders ui.CAREERS_NO_ROLES empty-state and ui.CAREERS_SPECULATIVE_LABEL contact link; seo metadata; all text from pageData.careers and pageData.ui
- [X] T098 [US9] Add careers page generation to scripts/build-static.mjs: load careers.json, generate dist/careers/index.html from CareersPage; pass CareersPageData per contract
- [X] T099 [P] [US9] Create src/pages/careers/main.jsx — island: reads __PAGE_DATA__, hydrates BackToTop, CookieBanner, initScrollReveal

**Checkpoint**: /careers/ renders with 2 roles; set openRoles to [] and rebuild — empty-state message shown, no JS errors.

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Remaining pages (Sustainability, Training Academy, Privacy Policy, 404), static search, full scroll-reveal wiring, case study detail pages, build finalization.

- [X] T100 Create data/sustainability.json with heading, body, esgSections[] (3 entries), csrInitiatives[] (2 entries), reports[] (1 placeholder with fileUrl "#"), heroImagePath null, heroImageAlt, seo{title, description}
- [X] T101 [P] Create src/templates/SustainabilityPage.jsx — renders hero, heading/body, ESG commitment sections (icon img with alt or placeholder), CSR initiative cards, downloadable reports list (PDF links from reports[].fileUrl); zero-injury metric highlight; seo metadata; data-reveal; all text from pageData.sustainability
- [X] T102 [P] Create build step for /sustainability/ in scripts/build-static.mjs: load sustainability.json, generate dist/sustainability/index.html
- [X] T103 [P] Create src/pages/sustainability/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

- [X] T104 Create data/training-academy.json with heading, overview, courses[] (3 entries), enrolmentCtaLabel, heroImagePath null, heroImageAlt, seo{title, description}
- [X] T105 [P] Create src/templates/TrainingAcademyPage.jsx — renders hero, programme overview, course/module cards (title, description, duration), enrolment CTA linking to /contact/; seo metadata; all text from pageData.academy
- [X] T106 [P] Create build step for /training-academy/ in scripts/build-static.mjs: load training-academy.json, generate dist/training-academy/index.html
- [X] T107 [P] Create src/pages/training-academy/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

- [X] T108 Create data/privacy-policy.md with Markdown body covering data collected (form PII, analytics), purpose, retention, and contact details for data queries
- [X] T109 [P] Create src/templates/PrivacyPolicyPage.jsx — renders parsed bodyHtml inside a prose-styled container; seo metadata from siteConfig.seoDefaults (no dedicated seo field for privacy policy)
- [X] T110 [P] Create build step for /privacy-policy/ in scripts/build-static.mjs: read privacy-policy.md, parse Markdown to HTML using micromark or similar, generate dist/privacy-policy/index.html from PrivacyPolicyPage
- [X] T111 [P] Create src/pages/privacy-policy/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

- [X] T112 Create data/case-studies/ detail files for each of the 4 slugs in case-studies/index.json: each with originLocation, destinationLocation, distanceKm, fullBody (Markdown), outcome, imagePath null, imageAlt, relatedServiceSlugs[], seo{title, description}
- [X] T113 [P] Create src/templates/CaseStudiesPage.jsx — renders all case study summary cards with industry and service FilterBar for client-side filtering; seo metadata; data-reveal
- [X] T114 [P] Create src/templates/CaseStudyDetailPage.jsx — renders project title, origin→destination, distanceKm metric, fullBody (Markdown rendered to HTML at build time), outcome, image (with alt), related services grid; seo metadata; cross-links per FR-E05
- [X] T115 Add case-studies page generation to scripts/build-static.mjs: generate dist/case-studies/index.html from CaseStudiesPage with industries and services for filter options; embed `__PAGE_DATA__` containing `industries[]` (id, slug, name) and `services[]` (id, slug, name) arrays so the FilterBar island (T116) can filter at runtime; for each slug generate dist/case-studies/{slug}/index.html from CaseStudyDetailPage; parse fullBody Markdown; validate relatedServiceSlugs
- [X] T116 [P] Create src/pages/case-studies/main.jsx — island: reads __PAGE_DATA__, hydrates FilterBar (industry + service filter), BackToTop, CookieBanner, initScrollReveal
- [X] T117 [P] Create src/pages/case-study-detail/main.jsx — island: hydrates BackToTop, CookieBanner, initScrollReveal

- [X] T118 Create src/templates/NotFoundPage.jsx — renders ui.NOT_FOUND_HEADING, ui.NOT_FOUND_BODY, SearchBar component, prominent link back to homepage (ui.NOT_FOUND_HOME_LINK); full nav and footer via PageShell
- [X] T119 [P] Create build step for 404.html in scripts/build-static.mjs: generate dist/404.html (not dist/404/index.html) from NotFoundPage using NotFoundPageData (ui strings only); embed __PAGE_DATA__ for SearchBar island
- [X] T120 [P] Create src/pages/404/main.jsx — island: reads __PAGE_DATA__, hydrates SearchBar (lazy-loads Pagefind), BackToTop, CookieBanner

- [X] T121 Create src/components/ui/SearchBar.jsx — search icon button in header that opens a modal/overlay on click; modal lazy-loads Pagefind UI script and CSS from /pagefind/pagefind-ui.js on first open; renders pagefind-ui div; closes on Escape or outside click; all labels from ui prop; accessible focus trap while open
- [X] T122 Update src/components/layout/Header.jsx to import and render SearchBar placeholder (icon button) wired to SearchBar island for client-side modal behaviour

- [X] T123 Wire scroll-reveal animations across all templates: add `data-reveal` attribute to all major section wrappers in the following template files — HomePage.jsx, AboutPage.jsx, LeadershipPage.jsx, CompliancePage.jsx, QEHSPage.jsx, ServicesPage.jsx, ServiceDetailPage.jsx, IndustriesPage.jsx, IndustryDetailPage.jsx, CaseStudiesPage.jsx, CaseStudyDetailPage.jsx, InsightsPage.jsx, InsightDetailPage.jsx, SustainabilityPage.jsx, TrainingAcademyPage.jsx, CareersPage.jsx, ContactPage.jsx — and confirm `initScrollReveal()` is called in every corresponding main.jsx island (home, about, leadership, compliance, qehs, services, service-detail, industries, industry-detail, case-studies, case-study-detail, insights, insight-detail, sustainability, training-academy, careers, contact, privacy-policy, 404)

- [X] T124 Create scripts/seed/ directory containing placeholder template files mirroring the full data/ structure (all JSON files with minimal valid seed content + privacy-policy.md placeholder); create scripts/seed.mjs that copies each file from scripts/seed/ to data/ only when the destination file does not already exist (idempotent — never overwrites real data); referenced by `npm run seed` per quickstart.md

- [X] T125 Install markdown parsing dependency (micromark or marked) for bodyMarkdown/fullBody Markdown→HTML conversion in build-static.mjs; update package.json

- [X] T126 Run full build validation: execute `npm run build`; fix any renderToStaticMarkup errors, missing data file references, or SEO warning threshold violations reported by build-static.mjs

- [X] T127 [P] Verify initial JS bundle size is ≤300 KB uncompressed: run `npm run bundle:check`; if over budget, alias react/react-dom to preact/compat in vite.config.js

- [X] T128 [P] Add public/ placeholder assets: create public/images/ subdirectories (hero/, services/, industries/, case-studies/, team/, partners/); add a 1×1 transparent placeholder.webp and placeholder.svg to each; add a placeholder brochure.pdf and map-static.svg

- [X] T129 Run Lighthouse CI audit against production build and verify thresholds pass: execute `npm run lighthouse`; confirm Performance ≥ 80 and SEO ≥ 95 on mobile simulation (SC-002); fix any failing components before marking complete — constitution Principle V quality gate

- [X] T130 Run automated accessibility audit: execute `npm run test:a11y` (axe-core via Playwright) against at least homepage, a service detail page, the contact page, and the 404 page; confirm zero WCAG 2.1 AA violations (SC-005); fix any reported violations before marking complete — constitution Principle III quality gate

- [X] T131 Run screen-reader smoke test on the production build (served via `npm run preview`): using NVDA (Windows) or VoiceOver (macOS), verify keyboard navigation through the header nav, hero CTA, a service card, the contact form fields and submit button, and the 404 search box; confirm all interactive elements have announced labels and logical tab order — constitution Principle III MUST requirement

- [X] T132 [P] Audit src/ for hardcoded user-visible strings: run `grep -rn --include="*.jsx" --include="*.js" ">[A-Z][a-z]" src/components src/templates src/pages` and review matches; confirm every user-visible text node and attribute is a prop reference traced to data/config/ui.json or a content JSON file — zero hardcoded strings per SC-008

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — **BLOCKS all user stories**
- **US1 (Phase 3)**: Depends on Foundational (Phase 2)
- **US2 (Phase 4)**: Depends on Foundational; shares data infrastructure with US1
- **US6 (Phase 5)**: Depends on Foundational; independent of US1/US2
- **US7 (Phase 6)**: Depends on Foundational; best after US2 (services data reused)
- **US3 (Phase 7)**: Depends on US1 components existing (audits them); can run alongside US6/US7
- **US8 (Phase 8)**: Depends on Foundational; independent of other stories
- **US4 (Phase 9)**: Audits pages from all prior stories — best after US1/US2/US6 complete
- **US5 (Phase 10)**: Depends on US1 (ContactSection stub exists)
- **US9 (Phase 11)**: Depends on Foundational; independent
- **Polish (Phase 12)**: Depends on all desired user stories being complete
- **Post-Implementation Fixes (Phase 13)**: Applied after initial build integration testing
- **Competitive Enhancements (Phase 14)**: Applied post-Phase 13; competitive gap analysis vs NTC Logistics
- **Visual Enhancements (Phase 15)**: Applied post-Phase 14; photorealistic SVG backgrounds, animated scroll indicator, bundle-check fix

### User Story Dependencies

- **US1 (P1)**: Foundational complete → start immediately (MVP)
- **US2 (P2)**: Foundational complete → can run parallel with US1 (shares services data)
- **US6 (P2)**: Foundational complete → runs parallel with US1/US2
- **US7 (P3)**: Foundational + US2 data (services JSON) complete → parallel with US3
- **US3 (P3)**: US1 components exist → audit/fix pass
- **US8 (P4)**: Foundational complete → independent
- **US4 (P4)**: US1 + US2 + US6 complete → SEO audit pass
- **US5 (P5)**: US1 ContactSection stub exists → wire ContactForm
- **US9 (P5)**: Foundational complete → independent

### Within Each User Story

- Data JSON files before templates (templates need data shape)
- Templates before build-static.mjs generation step (generation imports templates)
- Build step before island entry (island reads __PAGE_DATA__ from built HTML)
- All [P] tasks within a story can run in parallel

---

## Parallel Execution Examples

### Phase 2 (Foundational) — run together
```
T008 base.css  ‖  T009 tailwind.css  ‖  T010 site.json  ‖  T011 navigation.json  ‖  T012 ui.json
T013 PageShell  ‖  T014 Header  ‖  T015 MobileNav  ‖  T016 Footer  ‖  T017 CookieBanner
T018 animations.js  ‖  T019 analytics.js  ‖  T020 consent.js  ‖  T021 BackToTop
```

### Phase 3 (US1) — run together after T023 data files exist
```
T029 HeroCarousel  ‖  T030 ServiceCard  ‖  T031 IndustryCard  ‖  T032 CaseStudyCard  ‖  T033 StatCounter
T034 HeroSection  ‖  T035 ServicesSection  ‖  T036 IndustriesSection  ‖  T037 StatsSection
T038 CaseStudiesSection  ‖  T039 PartnersStrip  ‖  T040 AwardsSection  ‖  T041 SustainabilityTeaser  ‖  T042 ContactSection
```

### Phase 4 (US2) + Phase 5 (US6) — run in parallel after Foundational
```
Team A: T046 → T047 → T048 → T049 → T050 → T051  (US2 service pages)
Team B: T052 → T053 → T054 → T055 → T056 → T057 → T058 → T059 → T060 → T061 → T062  (US6 company pages)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (homepage)
4. **STOP and VALIDATE**: `npm run build && npm run preview` — homepage fully functional
5. Demo/review before continuing

### Incremental Delivery

1. Setup + Foundational → skeleton ready
2. US1 → homepage MVP ✅
3. US2 + US6 (parallel) → service & company pages ✅
4. US7 + US3 (parallel) → industry pages + mobile audit ✅
5. US8 + US4 (parallel) → insights + SEO gate ✅
6. US5 + US9 (parallel) → contact form + careers ✅
7. Polish → remaining pages + search + build finalization ✅

### Task Counts

| Phase | Story | Tasks |
|-------|-------|-------|
| Setup | — | 7 |
| Foundational | — | 15 |
| Phase 3 | US1 (P1) | 23 |
| Phase 4 | US2 (P2) | 6 |
| Phase 5 | US6 (P2) | 15 |
| Phase 6 | US7 (P3) | 6 |
| Phase 7 | US3 (P3) | 4 |
| Phase 8 | US8 (P4) | 8 |
| Phase 9 | US4 (P4) | 5 |
| Phase 10 | US5 (P5) | 6 |
| Phase 11 | US9 (P5) | 4 |
| Phase 12 | Polish (remaining pages + search + quality gates) | 33 |
| Phase 13 | Post-Implementation Fixes (FIX001–FIX006) | 6 |
| Phase 14 | Competitive Enhancement & Polish (ENH001–ENH019, BUG001–BUG002) | 21 |
| Phase 15 | Visual Enhancement — Photorealistic Backgrounds & Scroll (VIS001–VIS012) | 12 |
| **Total** | | **171** |

---

## Phase 13: Post-Implementation Fixes

**Purpose**: Bugs and gaps discovered during integration testing after initial task completion.
All tasks in this phase are `[X]` — they have been applied to the codebase.

- [X] FIX001 Fix CSS design tokens not rendering (blank/white pages): move `@import './base.css'` to line 1 of `src/styles/tailwind.css` — PostCSS silently drops `@import` statements that appear after any `@tailwind` directive, causing all CSS custom properties (`--color-navy`, `--color-orange-accent`, etc.) to be undefined at runtime

- [X] FIX002 Fix navigation dropdowns non-functional after static generation: `renderToStaticMarkup` strips all React event handlers, so `useState`-driven dropdown logic in `Header.jsx` produced inert HTML. Fix: always render dropdown `<div>` with `hidden` class and `data-dropdown` / `data-dropdown-trigger` / `data-dropdown-menu` attributes; create `public/nav.js` (self-contained IIFE) to handle all toggle logic via DOM `data-*` selectors; replace inline `dangerouslySetInnerHTML` nav script with `<script src="/nav.js" />` in `PageShell.jsx`

- [X] FIX003 Fix mobile nav drawer not opening: `MobileNav.jsx` returned `null` when `isOpen=false` (not in DOM), and the hamburger's React `onClick` was stripped in static HTML. Fix: always render drawer div with `hidden` class and `data-mobile-nav` attribute; add `data-mobile-open-btn` to hamburger, `data-mobile-close-btn` to close button, `data-mobile-overlay` to backdrop; all toggling handled by `public/nav.js`

- [X] FIX004 Fix SearchBar never mounted on any page: `SearchBar` component existed but was not hydrated on any page. Fix: add `<div id="search-root" data-pagefind-ignore />` mount point to `PageShell.jsx`; add SearchBar import and `ReactDOM.createRoot(searchRoot).render(...)` to all 19 `src/pages/*/main.jsx` island entry points; SearchBar wires click from static header `#search-open-btn` button via `addEventListener` on mount

- [X] FIX005 Fix search stuck on "Loading search…": `SearchBar.jsx` requested `/\_pagefind/pagefind-ui.js` but Pagefind v1.x outputs to `dist/pagefind/` (no leading underscore). Fix: changed both script `src` and CSS `href` to `/pagefind/pagefind-ui.js` and `/pagefind/pagefind-ui.css`

- [X] FIX006 Fix constitution violations — hardcoded strings and missing assets: (a) "Search", "Menu", and "Loading search…" were hardcoded in `SearchBar.jsx` and `MobileNav.jsx` — moved to `data/config/ui.json` as `SEARCH_MODAL_TITLE`, `NAV_MOBILE_MENU_TITLE`, `SEARCH_LOADING`; (b) `og-default.webp` referenced in `site.json` but missing — created branded `public/images/og-default.svg` and updated `site.json`; (c) industry SVG icons in `public/images/industries/` contained placeholder "Partner" content — replaced with distinct branded SVG icons per industry; (d) `map-static.webp` referenced in `offices.json` but missing — created `public/images/map-static.svg` India map with office pins and updated `offices.json`

---

## Phase 14: Competitive Enhancement & Polish (2026-03-15)

**Purpose**: Improvements identified via head-to-head comparison with NTC Logistics to score
SSVT higher across visual design, functionality, content depth, and trust signals.
All tasks are `[X]` — applied to the codebase.

### Comparison-Driven Enhancements

- [X] ENH001 Add `NAV_REQUEST_QUOTE`, `NAV_TRACKING_LABEL`, `HERO_SECONDARY_CTA`, `HERO_TRUST_*`,
  `TRUST_BANNER_*`, and `TRACKING_*` string keys to `data/config/ui.json` — all new UI copy
  sourced from JSON per FR-002 zero-hardcoded-strings rule

- [X] ENH002 Enable brochure download: set `brochurePdfPath: "/brochure.pdf"` in
  `data/config/site.json` — was `null`; brochure PDF already existed in `public/`

- [X] ENH003 Add 4th hero message to `data/config/site.json`; sharpen all hero copy to
  include ISO certification, stats callouts, and 24/7 operations signals in first viewport

- [X] ENH004 Add three international office entries to `data/offices.json`:
  Singapore, Dubai (UAE), and London (UK) — total 6 offices vs original 3 India-only

- [X] ENH005 Expand `data/statistics.json` from 6 to 8 stats: add "6 Global Offices"
  and "24/7 Operations (365 days/yr)" entries

- [X] ENH006 Redesign `src/components/sections/HeroSection.jsx`:
  (a) animated floating circles (CSS `animate-pulse`) as background depth elements;
  (b) diagonal orange gradient accent overlay;
  (c) SVG cargo-route decoration (dashed path + waypoint dots) at bottom;
  (d) pill badge "24/7 Operations — ISO 9001:2015 Certified" above headline;
  (e) dual CTA row: primary "Explore Our Services" + secondary "Request a Quote";
  (f) inline mini-stats row (15+/1,200+/12/98%) within the hero viewport;
  (g) trust certification strip pinned to hero bottom (ISO cert, IC T50, global, tracking link)

- [X] ENH007 Create `src/components/sections/TrustBanner.jsx` — 6-tile certification strip
  (ISO 9001, ISO 14001, OHSAS 18001, IC T50 Ranked, 6 Countries, 24/7 Operations) with
  icon + label + description per tile; hover transitions to orange background; data-reveal

- [X] ENH008 Update `src/templates/HomePage.jsx` to import and render `TrustBanner`
  immediately after `HeroSection` and before the filter root

- [X] ENH009 Redesign `src/components/layout/Header.jsx`:
  (a) two-tier layout: navy utility top bar (phone, Track Shipment link, brochure download)
      visible on `md:block` screens above the main nav;
  (b) brand logo mark (orange rounded square + white chart icon SVG) alongside company name;
  (c) "Request a Quote" orange CTA button (`hidden md:inline-flex`) in header right section;
  (d) refined dropdown menu styles (left border accent, hover highlight);
  (e) improved hover/focus states throughout

- [X] ENH010 Update `src/components/layout/MobileNav.jsx`: add bottom CTA section to drawer
  with three elements: (a) full-width orange "Request a Quote" button → `/contact/`;
  (b) navy "Track Shipment" button → `/tracking/`; (c) outlined "Download Brochure" button
  → `/brochure.pdf`; all labels from `ui` prop; all touch targets `min-h-[44px]`

### Shipment Tracking Page (FR-P22)

- [X] ENH011 Create `data/tracking.json` with heading, subtext, `howItWorksSteps[]` (3 steps),
  `contactPhone`, `contactEmail`, and `seo{ title, description }`

- [X] ENH012 Create `src/templates/TrackingPage.jsx` — renders Header, navy gradient page
  header, two-column layout (tracking form card left, "how it works" + immediate-help right),
  Footer; all content from `tracking` and `ui` props; `data-reveal` on sections

- [X] ENH013 Create `src/pages/tracking/main.jsx` — island entry: mounts `TrackingForm`
  React island (controlled form with ref + email fields, inline validation, Formspree POST
  or mailto fallback, submitting/success/error states); also hydrates SearchBar, BackToTop,
  CookieBanner; calls `injectAnalytics` and `initScrollReveal`

- [X] ENH014 Add `generateTrackingPage()` to `scripts/build-static.mjs`: loads
  `data/tracking.json`, validates SEO lengths, renders `TrackingPage`, writes
  `dist/tracking/index.html`; passes `formspreeId` and `contactEmail` in `pageDataScript`

- [X] ENH015 Fix SEO description length in `data/tracking.json`: trimmed from 165 chars
  to ≤160 chars to pass `validateSeo()` gate in build script

### Favicon & PWA (FR-E06)

- [X] ENH016 Create `public/favicon.svg` — branded SVG favicon: gradient orange rounded
  square (`#f59340 → #d9601a`) with area fill, glowing white trend-line chart (same path
  as header logo), peak accent dot (white circle + inner brand-colour ring), and muted
  baseline; matches header logo exactly

- [X] ENH017 Create `scripts/generate-favicon.mjs` — pure Node.js (zero dependencies)
  multi-size ICO generator: Bresenham line rasteriser, bilinear gradient fill, rounded-corner
  mask (transparent outside rect), alpha compositing for glow and area-fill passes;
  generates `public/favicon.ico` (16×16 + 32×32 + 48×48) and `public/site.webmanifest`

- [X] ENH018 Add `"favicon": "node scripts/generate-favicon.mjs"` script to `package.json`

- [X] ENH019 Update `src/templates/PageShell.jsx` to include in `<head>` on every page:
  `<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">`,
  `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
  `<link rel="apple-touch-icon" href="/favicon.svg">`,
  `<link rel="manifest" href="/site.webmanifest">`,
  `<meta name="theme-color" content="#f07b2b">`

### Bug Fixes

- [X] BUG001 Fix "Request a Quote" not visible on mobile: the button in `Header.jsx` used
  `hidden md:inline-flex` making it desktop-only. Fix: added full bottom CTA section to
  `MobileNav.jsx` (ENH010) so mobile users have equivalent access to the quote and tracking CTAs

- [X] BUG002 Fix tracking page rendering without header/footer: `TrackingPage.jsx` imported
  `PageShell` but omitted `Header` and `Footer` imports and render calls. Fix: added
  `import Header` and `import Footer`, wrapped content in `<main id="main-content">`,
  and rendered `<Header>` and `<Footer>` as siblings inside `PageShell`

---

## Phase 15: Visual Enhancement — Photorealistic Backgrounds & Animated Scroll (2026-03-15)

**Purpose**: Close the visual design gap identified in competitive comparison vs NTC Logistics
(SSVT was rated 6/10 vs NTC 8.5/10 on visual appeal). All tasks are `[X]` — applied to the codebase.

### Hero Background Infrastructure

- [X] VIS001 Add `heroBackgroundPath` optional field to `data/config/site.json` (set to
  `"/images/hero/hero-bg.svg"`); add corresponding optional rendering branch in
  `src/components/sections/HeroSection.jsx`: renders `<img>` with `fetchpriority="high"`,
  `alt=""`, `aria-hidden="true"`, and `object-cover` when path is set; falls back to CSS
  gradient when null — no code changes required to switch to real photography

- [X] VIS002 Create `public/images/hero/hero-bg.svg` — 1440×800 photorealistic SVG scene:
  container port at golden hour; cerulean-to-gold sky gradient; radial sun glow; 6 cloud
  ellipses in 3 clusters; golden reflection band on water; 3 cranes (A-frame, boom, trolley,
  suspended load); steel-blue ship hull with containers and bridge; 3 oil tanker trucks at
  dock gaps proportional to crane scale (2.9 px/m derived from A-frame heights ~200 px for
  ~70 m crane); dust haze; orange accent baseline strip

- [X] VIS003 Iterative overlay lightening (3 rounds): reduced hero overlay from
  `from-navy-dark/80 via-navy/70 to-navy-dark/85` → `from-transparent via-transparent to-navy-dark/40`
  (bottom-only fade) so the photorealistic background is clearly visible in the hero viewport

### Animated Scroll Indicator

- [X] VIS004 Add `scrollChevron`, `scrollPulse`, and `routeLine` keyframe animations to
  `tailwind.config.js` under `theme.extend.keyframes`; add `scroll-chevron` and `scroll-pulse`
  shorthand animation utilities under `theme.extend.animation`

- [X] VIS005 Replace static "Scroll to explore ↓" text in `src/components/sections/HeroSection.jsx`
  with animated route waypoint scroll indicator:
  (a) horizontal rule with glowing orange centre node (two staggered `scrollPulse` rings + centre dot);
  (b) "Scroll" label (`HERO_SCROLL_HINT` from `ui.json`);
  (c) three cascading chevrons with staggered `scrollChevron` animation delays (0 s, 0.22 s, 0.44 s);
  first chevron in `orange-accent`, subsequent in white with decreasing opacity

### Case Study Thumbnail Upgrades

- [X] VIS006 Replace `public/images/case-studies/wind-farm-transport.svg` with photorealistic
  SVG scene: golden-hour sky (6-stop gradient), 3 cloud layers, radial sun glow, orange-gold
  water reflection, 6 wind turbines with depth gradient and shadow halos, jack-up installation
  vessel with crane and suspended nacelle, orange accent baseline

- [X] VIS007 Replace `public/images/case-studies/refinery-turnaround.svg` with photorealistic
  SVG scene: deep night sky, 20 scattered stars, flare atmosphere radial glow, smoke drift
  clouds, sphere tank highlight, pipe rack, control building, foreground tanker truck with
  headlight glow, orange accent baseline

- [X] VIS008 Replace `public/images/case-studies/mining-equipment-relocation.svg` with
  photorealistic SVG scene: arid midday sky with harsh sun glow, dust haze layer, open-cut
  mine terrace bench lines, dust trail behind convoy, detailed Caterpillar-style mining
  excavator on multi-axle low-loader (boom, stick, bucket with teeth), prime mover cab,
  pilot vehicle with orange beacon, safety flags, orange accent baseline

- [X] VIS009 Replace `public/images/case-studies/power-plant-commissioning.svg` with
  photorealistic SVG scene: deep night, 23 stars + Milky Way band, warm glow from turbine
  hall windows, cool glow from cooling towers, steam cloud billows, heavy lift crane with
  suspended turbine component, transformer yard with bays, transmission tower with nav light,
  orange accent baseline

### Visual Refinements

- [X] VIS010 Reduce hero SVG cloud count from ~30 ellipses to 6 ellipses in 3 clusters
  (left/centre/right) using `cloudFar`/`cloudMid`/`cloudNear` gradients — original cloud
  density cluttered the sky at all viewport widths

- [X] VIS011 Lighten hero SVG ship hull from near-black (`#0a1628`) to steel-blue (`#2a3e58`);
  containers from `#0c1e38` to `#243448–#364c6a`; bridge from `#0e2040` to `#2e4260`;
  funnel from `#0a1628` to `#2a3c55` — ship was visually indistinguishable from cranes

### Bundle Check Fix

- [X] VIS012 Fix `scripts/bundle-check.mjs` false positive: add `SearchBar` to the
  `LAZY_PATTERNS` exclusion list alongside `pagefind`; SearchBar-*.js (~147 KB) is the
  Pagefind UI wrapper loaded via dynamic import inside `SearchBar.jsx` and is never part of
  the initial per-page bundle; the corrected check now reports ~152 KB (✅ < 300 KB limit)
  instead of the misleading 1092 KB total

---

## Phase 15: Accessibility Audit + Bug Fixes (2026-03-15)

**Purpose**: Targeted fixes from a Web Content Accessibility Guidelines 2.1 AA audit, a SearchBar re-open regression, and CI/CD simplification.
All tasks are `[X]` — applied to the codebase.

- [X] A11Y001 Fix mobile nav keyboard focus trap: `MobileNav.jsx` React `useEffect` focus-trap code was dead (component never hydrated as a React island). Fix: add `getFocusable()` helper and Tab/Shift-Tab cycling logic to `public/nav.js` keydown handler; focus returns to `[data-mobile-open-btn]` on close via `openBtn.focus()`

- [X] A11Y002 Fix dropdown menu list semantics in `src/components/layout/Header.jsx`: change dropdown container from a bare `<div>` containing raw `<a>` elements to `<ul role="list">` containing `<li><a>` — screen readers now announce dropdown items as list members

- [X] A11Y003 Add `aria-live` region to `src/components/ui/HeroCarousel.jsx`: add `<div aria-live="polite" aria-atomic="true" className="sr-only">` that announces `"Slide N of M: headline"` on every slide change — keyboard and screen-reader users now receive audible slide transition cues

- [X] A11Y004 Fix `SearchBar.jsx` not visible on second open: root cause was `PagefindUI` clearing its own container div on destruction. Fix: switch script-loaded tracking from `useState` to `useRef` (avoids re-render / double-effect); call `initUI()` (which clears `#pagefind-search` innerHTML and constructs a fresh `PagefindUI` instance) on every `open === true` effect run — search input is now always present regardless of how many times the modal is opened and closed

- [X] A11Y005 Simplify CI/CD workflow `.github/workflows/azure-static-web-apps-lively-cliff-04acf7f00.yml`: remove OIDC token steps (`Install OIDC Client`, `Get Id Token`) and `permissions: id-token: write` that were not required for the `azure_static_web_apps_api_token` secret flow; upgrade `actions/checkout@v3` to `@v4`

- [X] A11Y006 Rebuild `src/components/ui/HeroCarousel.jsx` for smooth transitions: remove `key={current}` prop that caused React to fully unmount/remount the content div on each slide change (producing a visible jerk). Replace with CSS `opacity` + `translateY` transition driven by a `visible` boolean state; stagger subtext transition by 60 ms for a natural cascade effect; use `useRef` for current slide index to avoid stale closures in `setInterval`; add `rAF` (`requestAnimationFrame`) loop for the SVG progress ring so the animation is frame-accurate

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks — safe to parallelise
- [Story] label maps every task to its user story for traceability
- Commit after each checkpoint (end of each phase) at minimum
- Every page island MUST call `initScrollReveal()` for FR-E01 compliance
- Every page island MUST hydrate `CookieBanner` and `BackToTop` — these are cross-cutting (FR-E02, FR-019)
- All data JSON files use kebab-case file names; all slugs are kebab-case URL segments
- Zero hardcoded user-visible strings permitted in any JSX — trace every string to data/config/ui.json or a content JSON file
