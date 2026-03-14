# Feature Specification: SSVT Logistics Corporate Website

**Feature Branch**: `001-logistics-website`
**Created**: 2026-03-14
**Last Updated**: 2026-03-15
**Status**: Implemented + Enhanced
**Input**: User description: "Build a static, animated, SEO-optimized corporate logistics website — intuitive, eye-catching, driven by local JSON data"

## Change Log

| Date | Change | Motivation |
|------|--------|------------|
| 2026-03-15 | Added `/tracking/` shipment tracking page | Competitive gap vs NTC Logistics — highest-impact missing feature |
| 2026-03-15 | Added "Request a Quote" sticky CTA to header (desktop + mobile nav) | Conversion driver; present on NTC, missing from SSVT |
| 2026-03-15 | Enabled brochure download (`brochurePdfPath` wired to `/brochure.pdf`) | Feature parity with competitor |
| 2026-03-15 | Added international offices (Singapore, Dubai, London) to `offices.json` | Signals global reach (NTC shows 4 international offices) |
| 2026-03-15 | Added two-tier header: utility top bar (phone, Track Shipment, brochure) | Professional logistics industry standard; improved UX |
| 2026-03-15 | Enhanced hero: gradient bg, animated shapes, dual CTA, inline stats, trust strip | Visual gap: NTC hero scored higher; SSVT hero needed more depth |
| 2026-03-15 | Added `TrustBanner` section below hero (6 certifications/rankings) | Missing differentiator — ISO, OHSAS, IC T50, global office count, 24/7 ops |
| 2026-03-15 | Expanded `statistics.json` to 8 stats (added "6 Global Offices", "24/7 Operations") | Content depth improvement |
| 2026-03-15 | Added 4th hero message; sharpened hero copy with ISO/stats callouts | Brand credibility signals in first viewport |
| 2026-03-15 | Implemented favicon: `favicon.svg`, `favicon.ico` (16/32/48px), `site.webmanifest` | Missing entirely from original build |
| 2026-03-15 | Fixed: mobile nav had no "Request a Quote" CTA — added to MobileNav drawer bottom | Bug: desktop CTA was `hidden md:flex`, invisible on mobile |
| 2026-03-15 | Fixed: tracking page rendered without header/footer | Bug: `Header`/`Footer` not imported in `TrackingPage.jsx` |

## Site Map

Every route below is a statically generated HTML file. All content is sourced from `data/`.

| URL | Page | Purpose |
|-----|------|---------|
| `/` | Homepage | Hero, services overview, industries, stats, case studies preview, sustainability teaser, contact form |
| `/about/` | About | Company story, founding history, mission & vision, milestones timeline, awards & certifications |
| `/leadership/` | Leadership | Team member profiles, roles, and bios |
| `/compliance/` | Compliance | Regulatory certifications, audit standards, policy statements |
| `/qehs/` | Q&EHS | Quality, Environment, Health & Safety commitments and metrics |
| `/services/` | Services Overview | All 9 service lines as detailed cards with links to individual service pages |
| `/services/{slug}/` | Service Detail | Full service description, industries served, linked case studies, related services |
| `/industries/` | Industries Overview | All 10 industries with summary cards linking to individual industry pages |
| `/industries/{slug}/` | Industry Detail | Industry-specific challenges, how SSVT addresses them, relevant services and case studies |
| `/case-studies/` | Case Studies | Filterable listing of all case studies with industry/service filters |
| `/case-studies/{slug}/` | Case Study Detail | Full project narrative, origin → destination, scale, outcome, related services |
| `/insights/` | Insights | Listing of all insights articles and company updates |
| `/insights/{slug}/` | Article Detail | Full article body, published date, related insights |
| `/sustainability/` | Sustainability | ESG commitments, CSR initiatives, sustainability reports, zero-injury goals |
| `/training-academy/` | Training Academy | Overview of SSVT's logistics training programmes and enrolment pathway |
| `/careers/` | Careers | Company culture, open roles sourced from JSON, application pathway |
| `/contact/` | Contact | Dedicated contact page with form, all office addresses (incl. international), social links, static map |
| `/tracking/` | Shipment Tracking | Tracking enquiry form (ref + email → Formspree/mailto), 3-step how-it-works, 24/7 contact block |
| `/privacy-policy/` | Privacy Policy | Data handling, PII policy, cookie usage (content from Markdown) |
| `/404.html` | 404 Error | Branded not-found page with error message, search box, and nav back to homepage |

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Prospective Client Discovers SSVT at a Glance (Priority: P1)

A supply chain manager visits the SSVT Logistics website for the first time on desktop.
Within 10 seconds they understand who SSVT is, what they do, and why they are a credible
partner. Animated hero messaging and a clear services overview immediately communicate value
without requiring scrolling through walls of text.

**Why this priority**: First impressions determine whether a visitor stays or bounces.
This is the primary conversion point of the entire site.

**Independent Test**: Open the homepage cold; within one viewport a visitor can identify
the company name, primary value proposition, and at least three service areas without scrolling.

**Acceptance Scenarios**:

1. **Given** a first-time visitor lands on the homepage, **When** the page loads, **Then**
   an animated hero section cycles through at least three key messages with smooth transitions,
   a prominent headline, and a primary CTA button visible without scrolling; clicking the CTA
   smoothly scrolls the page to the services section.
2. **Given** the hero is visible, **When** the user reads the hero section, **Then** they
   can identify the company's positioning (specialized logistics for renewable energy and
   heavy industry) within 10 seconds.
3. **Given** the visitor scrolls past the hero, **When** they reach the services section,
   **Then** all 9 service lines are presented as visual cards with titles and brief
   descriptions — no additional navigation required.

---

### User Story 2 — User Explores a Specific Service (Priority: P2)

A potential client interested in a particular logistics service (e.g., Project & Heavy Lift)
wants to understand what SSVT offers, see relevant case studies, and know which industries
are served — all from a focused content area without a page reload.

**Why this priority**: Service exploration is the second most critical conversion step.
Visitors who find relevant service detail are more likely to make contact.

**Independent Test**: Navigate to any service card; from that card alone a user can read the
full service description, view related industry tags, and see at least one linked case study.

**Acceptance Scenarios**:

1. **Given** a user clicks a service card, **When** the dedicated service page loads at
   `/services/{slug}/`, **Then** they see the full service description, related industries,
   and linked case studies — all sourced from local JSON, with a unique URL and `<head>`.
2. **Given** a user views the industries section, **When** they click an industry tag,
   **Then** the services section filters to show only services relevant to that industry.
3. **Given** a case study tile is visible, **When** a user clicks it, **Then** they see the
   project headline, scale/distance metric, and outcome — rendered from local JSON.

---

### User Story 3 — Mobile User Browses the Site (Priority: P3)

A field operations manager opens the SSVT site on a smartphone. All content is readable
without horizontal scrolling, touch targets are comfortably tappable, and the navigation
collapses into a mobile menu. Animations adapt gracefully to smaller screens.

**Why this priority**: Field logistics staff primarily use mobile devices; a poor mobile
experience directly excludes the core audience.

**Independent Test**: Load the site on a 375px-wide viewport; every section, nav item,
and CTA MUST be usable without zooming or horizontal scroll.

**Acceptance Scenarios**:

1. **Given** the site loads on a mobile viewport (≤480px), **When** the page renders,
   **Then** the navigation collapses to a mobile menu with no layout overflow.
2. **Given** a mobile user taps a service card, **When** the interaction triggers,
   **Then** the card expands or navigates with no layout shift or clipping.
3. **Given** a user is on a slow mobile connection, **When** the page loads, **Then**
   above-the-fold content (hero + nav) renders in under 3 seconds and the rest loads
   progressively without blocking interaction.

---

### User Story 4 — Search Engine Indexes SSVT Pages (Priority: P4)

A search engine crawler visits the SSVT site. Every page exposes meaningful SEO metadata,
content is in semantic HTML, and all images carry descriptive alt text — enabling the site
to rank for relevant logistics keywords.

**Why this priority**: Organic search is a primary discovery channel for B2B logistics;
without SEO the site is invisible to decision-makers searching for providers.

**Independent Test**: Run an automated SEO audit against the static build;
zero critical SEO errors MUST be reported.

**Acceptance Scenarios**:

1. **Given** the static build is generated, **When** an SEO audit runs, **Then** every page
   has a unique title (≤60 chars), meta description (≤160 chars), and canonical URL.
2. **Given** a page with a service or case study, **When** the page source is inspected,
   **Then** JSON-LD structured data for the relevant schema (Organization, Service) is
   present and valid.
3. **Given** any image on the site, **When** the HTML is inspected, **Then** the image
   element carries a non-empty, descriptive alt attribute.

---

### User Story 5 — Contact Inquiry Submission (Priority: P5)

A prospective client fills out the contact form, selects the service they are interested
in, and submits an inquiry via a static-compatible form service. They receive immediate
visual confirmation that their submission was received.

**Why this priority**: Lead capture is the site's primary business objective; without a
working contact mechanism the entire site delivers no tangible business value.

**Independent Test**: Submit the contact form with valid data; a success message appears
and form fields reset — verifiable without a backend.

**Acceptance Scenarios**:

1. **Given** the contact form is visible, **When** a user fills in name, email, phone,
   service interest (dropdown), and message, **Then** the Submit button is enabled and
   validation highlights any missing required fields inline.
2. **Given** a user submits a valid form, **When** the submission is processed, **Then**
   a success confirmation appears within 2 seconds and the form fields reset.
3. **Given** a user enters an invalid email format, **When** focus leaves the email field,
   **Then** an inline error message appears immediately without a full-page refresh.

---

### User Story 6 — Visitor Learns About the Company (Priority: P2)

A prospective partner or client wants to understand who SSVT is before committing to an
inquiry — company history, leadership credibility, certifications, and safety culture.
The About and Leadership pages together answer these trust-building questions.

**Why this priority**: B2B decisions depend on trust. A company with a clear story,
named leadership, and visible certifications converts better than an anonymous services list.

**Independent Test**: Navigate to `/about/` and `/leadership/` with no other pages;
a visitor can answer "when was the company founded, who leads it, and what standards does
it meet" from those two pages alone.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/about/`, **When** the page loads, **Then** they see
   a company story section, a visual milestones timeline, and a certifications/awards block —
   all sourced from JSON.
2. **Given** a visitor navigates to `/leadership/`, **When** the page loads, **Then** they
   see a profile card for each team member with name, title, and bio — all from JSON.
3. **Given** a visitor navigates to `/compliance/` or `/qehs/`, **When** the page loads,
   **Then** they see policy statements and certification badges sourced from JSON, with no
   hardcoded text.

---

### User Story 7 — Visitor Browses Industry-Specific Solutions (Priority: P3)

A procurement manager in the Oil & Gas sector wants to know whether SSVT has experience
specifically in their industry — not just generic logistics. The Industries section provides
industry-level landing pages showing tailored services and relevant case studies.

**Why this priority**: Industry-specific pages dramatically improve SEO relevance and
conversion for targeted sectors. Generic "we serve everyone" messaging is less persuasive
than "here is how we serve Oil & Gas specifically".

**Independent Test**: Navigate to `/industries/oil-and-gas/`; without visiting any other
page a visitor can identify relevant services, see at least one matching case study, and
understand SSVT's specific value proposition for that sector.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/industries/`, **When** the page loads, **Then** all
   10 industry cards are displayed with title, icon, and a link to the detail page —
   sourced from JSON.
2. **Given** a user navigates to `/industries/{slug}/`, **When** the page loads, **Then**
   they see the industry's name, challenges description, related services, and linked case
   studies — all from JSON, with its own SEO metadata.
3. **Given** a user on a service detail page clicks an industry tag, **When** the link
   resolves, **Then** it navigates to the corresponding `/industries/{slug}/` page.

---

### User Story 8 — Visitor Reads Insights (Priority: P4)

A logistics professional or journalist wants to follow SSVT's latest insights, project
announcements, and industry perspectives. The Insights section provides a browsable,
filterable listing with full article pages.

**Why this priority**: Fresh insights content signals to search engines that the site is
active, improving long-tail SEO. Insights pages also give sharing-worthy content for social media.

**Independent Test**: Navigate to `/insights/` and open one article; the full article is
readable on its own page with a published date and related articles — no other pages needed.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/insights/`, **When** the page loads, **Then** they see
   article cards (title, date, summary, thumbnail alt text) sorted newest-first — from JSON.
2. **Given** a user clicks an article card, **When** the article detail page at
   `/insights/{slug}/` loads, **Then** they see the full article body, published date,
   author (if present), and a "Related Insights" section — all sourced from JSON.
3. **Given** the insights listing page, **When** a user uses the category filter,
   **Then** only articles matching the selected category are displayed.

---

### User Story 9 — Job Seeker Explores Career Opportunities (Priority: P5)

A logistics professional looking for a new role visits `/careers/` to understand SSVT's
culture, open positions, and how to apply — all without needing to email the company first.

**Why this priority**: A careers page helps attract talent and signals a growing, credible
organisation to prospects who research companies before contacting them.

**Independent Test**: Navigate to `/careers/`; a job seeker can read the company culture
statement, browse open roles (from JSON), and find the application pathway — standalone.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/careers/`, **When** the page loads, **Then** they see
   a culture/values section, a list of open roles sourced from JSON (or an "No open roles
   at this time" message if the array is empty), and a contact pathway for speculative
   applications.
2. **Given** no open roles exist in the JSON, **When** the careers page renders, **Then**
   an empty-state message (sourced from `ui.json`) is shown — no broken layout or error.

---

### User Story 10 — Client Tracks an Active Shipment (Priority: P2)

A logistics client with an active cargo movement wants to check the current status of their
shipment without calling the office. They visit `/tracking/`, enter their Bill of Lading or
shipment reference and email address, and receive a status update from the operations team.

**Why this priority**: Shipment tracking is the single highest-impact functional feature
missing from the original build. It is a standard expectation for logistics clients and a
key differentiator versus competitors (NTC Logistics offers tracking; SSVT did not).

**Independent Test**: Navigate to `/tracking/`; fill in a shipment reference and email;
submit — success message appears (or mailto opens if Formspree ID is not configured).
Leave fields blank and submit — inline validation errors appear.

**Acceptance Scenarios**:

1. **Given** a client navigates to `/tracking/`, **When** the page loads, **Then** they see
   the full site navigation, a tracking enquiry form, and a 3-step "how it works" explainer —
   all within the standard page layout (header + footer).
2. **Given** the tracking form is visible, **When** a user submits without filling required
   fields, **Then** inline validation errors appear immediately — no page reload.
3. **Given** a user fills in a valid shipment reference and email, **When** they submit,
   **Then** a success message appears confirming the operations team will respond within 2
   hours; if no Formspree ID is configured, the form falls back to a `mailto:` link.
4. **Given** a client needs immediate help, **When** they view the page, **Then** a 24/7
   operations contact block with a phone link and contact-page link is always visible.

---

### Edge Cases

- What happens when a local JSON data file has a missing or malformed field?
  (Expected: graceful fallback — missing fields render as empty strings; no JS crash.)
- How does the site behave when JavaScript is disabled?
  (Expected: semantic HTML ensures core content is still readable; animations degrade gracefully.)
- What if the analytics provider token is absent from the JSON config?
  (Expected: site loads normally, no script injected, no console errors — silent no-op.)
- What if the contact form third-party endpoint is unreachable?
  (Expected: user sees a clear error message and is offered a mailto fallback link.)
- What if a user accesses the site on an old browser outside the support matrix?
  (Expected: core layout and text content are accessible; animations may not play.)
- What if a user declines cookie consent?
  (Expected: analytics script is NOT loaded; all other site functionality remains fully operational.)
- What if a user navigates to a URL not in the site map?
  (Expected: the static host serves `/404.html`; the branded 404 page is shown with nav and search.)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display an animated hero section that cycles through at least
  three rotating headline messages with configurable timing sourced from JSON. The hero
  MUST include a primary CTA button labelled from JSON config that anchor-scrolls to the
  services section on the homepage.
- **FR-002**: Every piece of user-visible text on the site MUST be sourced from local JSON
  (or Markdown) files — zero hardcoded strings in component markup. This includes, but is
  not limited to: navigation labels, section headings, body copy, button labels, form field
  labels and placeholder text, inline validation/error messages, footer text, social media
  link labels, statistics, office addresses, sustainability copy, privacy policy body, and
  all hero messages. The only permitted exceptions are HTML structural attributes (e.g.,
  `lang="en"`) and accessibility-only hidden labels whose values are derived from JSON content.
- **FR-003**: The site MUST present all service lines as interactive visual cards on the
  homepage; each card MUST display at minimum: service name, short description, and an icon
  or visual, and MUST link to the service's dedicated page.
- **FR-003a**: Each service MUST have a dedicated static page at `/services/{slug}/`
  containing: full description, related industry tags, associated case study links, and
  page-specific SEO metadata — all generated from the Service JSON entity.
- **FR-004**: The site MUST include a filterable industries section; selecting an industry
  tag MUST filter the services section to show only relevant services.
- **FR-005**: The site MUST include a case studies section presenting at minimum four project
  summaries with title, scale metric, and outcome — all sourced from JSON.
- **FR-006**: Every page MUST carry unique SEO metadata (title, meta description, canonical
  URL, Open Graph tags) defined in a JSON config file.
- **FR-007**: The site MUST include a contact section with a form capturing name, email,
  phone, service interest (select), and message — submitted via a static-compatible form
  service with a visible success/error feedback state.
- **FR-008**: The site MUST be fully responsive and usable at 320px, 480px, 768px, and
  1280px+ viewport widths with no horizontal overflow.
- **FR-009**: All decorative animations MUST respect the `prefers-reduced-motion` user
  preference — animations MUST pause or simplify when that preference is active.
- **FR-010**: The site MUST include a persistent, accessible navigation bar that collapses
  to a mobile drawer/hamburger menu on viewports ≤768px.
- **FR-011**: The site MUST include a statistics/achievements banner presenting key company
  metrics (e.g., years of operation, projects completed, fleet size) sourced from JSON.
- **FR-012**: The site MUST include a sustainability/values section communicating the
  company's commitment to responsible and safe logistics operations.
- **FR-013**: All images MUST include descriptive alt text; purely decorative images MUST
  carry an empty alt attribute.
- **FR-014**: JSON-LD structured data (Organization schema at minimum) MUST be present in
  the homepage head section.
- **FR-015**: The production build MUST be a set of static files deployable to any static
  host with a single build command and zero server-side process.
---

### Page-Specific Functional Requirements

#### Homepage (`/`)

- **FR-P01**: The homepage MUST contain, in order: hero section, services overview, industries
  section, statistics banner, case studies preview (max 4 tiles), sustainability teaser,
  contact form, and footer — all sections visible via scroll, no tab switching required.
- **FR-P02**: The statistics banner MUST animate each metric value using a count-up effect
  when the section scrolls into the viewport (respects `prefers-reduced-motion`).
- **FR-P03**: A partner/client logos strip MUST be displayed on the homepage, sourced from
  `data/partners.json`; logos scroll or fade in automatically.
- **FR-P04**: An awards & recognition section MUST appear on the homepage, sourced from
  `data/awards.json`, displaying award name, issuing body, and year.

#### About (`/about/`)

- **FR-P05**: The about page MUST include: company story paragraph(s), a visual milestones
  timeline (year + event), and a certifications/awards block — all from `data/about.json`.
- **FR-P06**: Milestone timeline entries MUST animate into view on scroll.

#### Leadership (`/leadership/`)

- **FR-P07**: The leadership page MUST display a grid of team member cards, each showing
  name, title, and bio — sourced from `data/team.json`. If a photo path is provided it
  MUST be rendered with descriptive alt text; if absent a placeholder illustration is shown.

#### Compliance (`/compliance/`) & Q&EHS (`/qehs/`)

- **FR-P08**: Each page MUST render its content (policy statements, certification badges,
  key metrics) from its respective JSON file (`data/compliance.json`, `data/qehs.json`).
  Pages share the same layout template but use different data files.

#### Services Overview (`/services/`)

- **FR-P09**: The services overview page MUST display all 9 service cards in a grid with
  name, short description, icon, and a "Learn more" link to `/services/{slug}/`.

#### Industries Overview (`/industries/`) & Industry Detail (`/industries/{slug}/`)

- **FR-P10**: The industries overview MUST display all 10 industry cards (name, icon,
  summary) sourced from `data/industries/index.json`, each linking to its detail page.
- **FR-P11**: Each industry detail page MUST show: industry name, challenges description,
  "How we help" narrative, a filtered list of relevant service cards, and linked case
  study tiles — all from `data/industries/{slug}.json`.

#### Case Studies Listing (`/case-studies/`) & Detail (`/case-studies/{slug}/`)

- **FR-P12**: The case studies listing MUST display all case study summary cards with
  industry and service filter controls; filtering MUST work without a page reload.
- **FR-P13**: Each case study detail page MUST show: project title, origin → destination,
  distance/scale metric, full narrative, outcome, and a "Related Services" block —
  all from `data/case-studies/{slug}.json`.

#### Insights (`/insights/`) & Article Detail (`/insights/{slug}/`)

- **FR-P14**: The insights listing MUST display article cards (title, date, category,
  summary) sorted newest-first, with a category filter — sourced from `data/insights/index.json`.
- **FR-P15**: Each article detail page MUST render the full article body (from Markdown or
  JSON), published date, optional author, and a "Related Insights" section of up to 3 links.

#### Sustainability (`/sustainability/`)

- **FR-P16**: The sustainability page MUST include: ESG commitment sections, CSR initiative
  cards, and a downloadable reports list (PDF assets linked from `data/sustainability.json`).
  Zero-injury / safety metric highlights MUST be present.

#### Training Academy (`/training-academy/`)

- **FR-P17**: The training academy page MUST present the programme overview, list of courses
  or modules (from JSON), and an enrolment/enquiry pathway linking to the contact form.

#### Careers (`/careers/`)

- **FR-P18**: The careers page MUST include a culture/values section and a job listings
  block sourced from `data/careers.json`. If the jobs array is empty, an empty-state
  message from `ui.json` MUST be shown — no broken layout.
- **FR-P19**: Each job listing MUST show: role title, location, type (full-time/contract),
  and a brief description. Applications MUST route to the contact form or an external URL
  defined in the job JSON entry.

#### 404 Error Page (`/404.html`)

- **FR-P21**: A custom `404.html` MUST be generated at the repository root for static host
  deployment. It MUST include: a branded error headline and body message (from `ui.json`),
  the site-wide navigation bar, a search box wired to the static search index, and a
  prominent link back to the homepage — all within the standard site layout.

#### Contact (`/contact/`)

- **FR-P20**: The dedicated contact page MUST include the contact form (same as homepage
  section), all office location cards sourced from `data/offices.json`, and a static map
  image (stored as a committed asset, `mapImageAlt` from `offices.json`) with a "View on
  Maps" link whose URL is stored in `offices.json`. No live map iframe or external map
  script MUST be loaded — the map is a static image only.

---

#### Shipment Tracking (`/tracking/`)

- **FR-P22**: A dedicated shipment tracking page MUST exist at `/tracking/` within the
  standard site layout (header + footer). It MUST include: a tracking enquiry form (shipment
  reference + email inputs with inline validation), a POST submission to Formspree (or
  mailto fallback when `formspreeId` is null), a success/error feedback state, a 3-step
  "how it works" section sourced from `data/tracking.json`, and an immediate-help block
  showing the operations phone number and a link to `/contact/`.

---

### Cross-Cutting Enhancement Requirements

- **FR-E01**: All content sections on every page MUST use scroll-triggered reveal animations
  (fade-in + slide-up) as they enter the viewport. Animations MUST be disabled when
  `prefers-reduced-motion` is active.
- **FR-E02**: A sticky "Back to Top" button MUST appear after the user scrolls past the
  hero on any page; its label MUST be sourced from `ui.json`.
- **FR-E03**: Every page MUST include a downloadable company brochure link (PDF asset path
  from `site.json`) in the footer or a designated section. The brochure link MUST also appear
  in the header utility bar on desktop and in the mobile nav drawer.
- **FR-E04**: The site MUST implement static full-text search (index generated at build time)
  allowing users to search across service names, case study titles, and insights articles;
  the search UI MUST be accessible from the navigation bar on every page.
- **FR-E05**: Internal links between related content MUST be present on every detail page:
  service pages link to relevant industries and case studies; case study pages link back to
  services; industry pages link to services and case studies.
- **FR-E06**: Every page MUST include a complete favicon set: `favicon.ico` (16×16, 32×32,
  48×48 multi-size), `favicon.svg` (scalable, gradient background matching brand), and
  `site.webmanifest` (PWA/Android home-screen support). The `<head>` MUST reference all
  three plus `<meta name="theme-color">` matching the brand orange.
- **FR-E07**: The homepage MUST include a `TrustBanner` section immediately below the hero,
  displaying at least 6 certification/recognition tiles (ISO 9001, ISO 14001, OHSAS 18001,
  IC T50 Ranked, global office count, 24/7 operations) — all labels sourced from `ui.json`.
- **FR-E08**: The site navigation MUST include two tiers on desktop: a utility top bar
  (24/7 phone number, "Track Shipment" link, brochure download) and the main nav bar
  (logo, navigation links, "Request a Quote" CTA button). The mobile nav drawer MUST include
  a "Request a Quote" primary button, a "Track Shipment" secondary button, and a brochure
  download link in the drawer footer — all labels from `ui.json`.

---

### Original Requirements

- **FR-020**: All JSON data files MUST live under a single `data/` directory at the
  repository root, organised by domain as follows:

  ```
  data/
  ├── config/
  │   ├── site.json            # SiteConfig — company name, tagline, hero messages,
  │   │                        #   SEO defaults, social links, analyticsId, CTA labels,
  │   │                        #   brochure PDF path
  │   ├── navigation.json      # Nav link labels, hrefs, dropdown structure
  │   └── ui.json              # Every UI string: section headings, button labels,
  │                            #   form labels/placeholders, error/success messages,
  │                            #   footer text, cookie consent copy, empty-state messages,
  │                            #   back-to-top label, search placeholder
  ├── services/
  │   ├── index.json           # Array of service summaries (cards)
  │   └── {slug}.json          # Full detail per service (×9 files)
  ├── industries/
  │   ├── index.json           # Array of industry summaries (cards)
  │   └── {slug}.json          # Full detail per industry (×10 files)
  ├── case-studies/
  │   ├── index.json           # Array of case study summaries
  │   └── {slug}.json          # Full detail per case study (×4+ files)
  ├── insights/
  │   ├── index.json           # Array of article summaries
  │   └── {slug}.json          # Full article per insight
  ├── about.json               # Company story, milestones timeline, certifications
  ├── team.json                # Leadership team profiles
  ├── compliance.json          # Compliance policy statements, certification badges
  ├── qehs.json                # Q&EHS policy statements, safety metrics
  ├── sustainability.json      # ESG sections, CSR initiatives, report download links
  ├── training-academy.json    # Programme overview, course/module list
  ├── careers.json             # Culture copy + open roles array (may be empty)
  ├── statistics.json          # Stats banner entries
  ├── offices.json             # Office locations (type, address, phone)
  ├── partners.json            # Partner/client logo entries (name, logoAlt, url optional)
  ├── awards.json              # Awards & recognition (name, body, year)
  └── privacy-policy.md        # Privacy policy body (Markdown)
  ```

  No content file MUST reside outside `data/`. File names MUST be kebab-case.
  Adding a new content area requires adding a file to `data/` — no component changes
  for content-only additions.

- **FR-016**: The site MUST follow a multi-page static (MPA) architecture — each service
  and each case study MUST have its own dedicated HTML file with a unique URL and a fully
  populated `<head>` (title, meta description, canonical, Open Graph). No client-side
  routing or JavaScript is required to render core page content.
- **FR-017**: The site MUST support optional page-view analytics via a provider token
  defined in the JSON site config (`analyticsId` field). When `analyticsId` is absent,
  empty, or null, the site MUST load and operate normally with no analytics script injected
  and no console errors. A cookie consent banner MUST be displayed when analytics is active.
- **FR-018**: The site MUST include a static `/privacy-policy/` page whose content is
  sourced from a Markdown or JSON file in the repository; the page MUST cover at minimum:
  data collected (form PII, analytics), purpose of collection, and contact details for
  data queries.
- **FR-019**: A cookie consent banner MUST appear on a user's first visit when `analyticsId`
  is configured. The user MUST be able to accept or decline; declining MUST prevent the
  analytics script from loading. The consent choice MUST persist across page navigations
  for the session (and optionally across visits via local storage).

### Key Entities *(data layer)*

**`data/config/site.json`**
- **SiteConfig**: `companyName`, `tagline`, `heroMessages[]`, `heroCTALabel`,
  `seoDefaults{ titleSuffix, description, ogImage }`, `contactEmail`,
  `socialLinks{ linkedin, facebook, instagram, twitter }`,
  `analyticsId` (optional — omit or null to disable), `brochurePdfPath`

**`data/config/navigation.json`** — array of:
- **NavItem**: `label`, `href`, `children[]{ label, href }` (dropdown sub-links)

**`data/config/ui.json`**
- **UIStrings**: flat key-value map — section headings, button labels, form field labels
  and placeholders, inline validation/error messages, success messages, footer tagline,
  cookie consent headline and body, back-to-top label, search placeholder, empty-state
  messages (e.g., no open roles, no articles), and any other fixed UI copy

**`data/services/index.json`** — array of:
- **ServiceSummary**: `id`, `slug`, `name`, `shortDescription`, `icon`

**`data/services/{slug}.json`** (×9 files):
- **ServiceDetail**: `id`, `slug`, `name`, `fullDescription`, `icon`,
  `industryTags[]`, `caseStudySlugs[]`, `relatedServiceSlugs[]`, `seo{ title, description }`

**`data/industries/index.json`** — array of:
- **IndustrySummary**: `id`, `slug`, `name`, `icon`, `summary`

**`data/industries/{slug}.json`** (×10 files):
- **IndustryDetail**: `id`, `slug`, `name`, `challengesDescription`, `howWeHelpBody`,
  `relatedServiceSlugs[]`, `caseStudySlugs[]`, `seo{ title, description }`

**`data/case-studies/index.json`** — array of:
- **CaseStudySummary**: `id`, `slug`, `title`, `industryTag`, `serviceTag`,
  `distanceKm`, `summaryText`, `imageAlt`

**`data/case-studies/{slug}.json`** (×4+ files):
- **CaseStudyDetail**: `id`, `slug`, `title`, `industryTag`, `originLocation`,
  `destinationLocation`, `distanceKm`, `fullBody`, `outcome`, `imageAlt`,
  `relatedServiceSlugs[]`, `seo{ title, description }`

**`data/insights/index.json`** — array of:
- **ArticleSummary**: `id`, `slug`, `title`, `publishedDate`, `category`,
  `summary`, `thumbnailAlt`

**`data/insights/{slug}.json`** (one per article):
- **ArticleDetail**: `id`, `slug`, `title`, `publishedDate`, `category`,
  `author` (optional), `bodyMarkdown`, `relatedSlugs[]`, `seo{ title, description }`

**`data/about.json`**
- **About**: `storyParagraphs[]`, `milestones[]{ year, event }`,
  `certifications[]{ name, body, year, badgeAlt }`

**`data/team.json`** — array of:
- **TeamMember**: `name`, `title`, `bio`, `photoAlt` (optional)

**`data/compliance.json`**
- **Compliance**: `heading`, `body`, `certifications[]{ name, description, badgeAlt }`

**`data/qehs.json`**
- **QEHS**: `heading`, `body`, `metrics[]{ label, value }`, `policies[]{ title, body }`

**`data/sustainability.json`**
- **Sustainability**: `heading`, `body`, `esgSections[]{ title, body }`,
  `csrInitiatives[]{ title, body }`, `reports[]{ title, year, fileUrl }`

**`data/training-academy.json`**
- **TrainingAcademy**: `heading`, `overview`, `courses[]{ title, description, duration }`

**`data/careers.json`**
- **Careers**: `cultureHeading`, `cultureBody`, `values[]{ icon, title, description }`,
  `openRoles[]{ title, location, type, description, applyUrl }`
  (openRoles may be an empty array — empty-state handled via `ui.json`)

**`data/statistics.json`** — array of:
- **Statistic**: `label`, `value`, `unit`

**`data/offices.json`** — array of:
- **OfficeLocation**: `type` (Head / Corporate / Regional / International), `label`, `address`, `phone`
  — includes 3 India offices + 3 international offices (Singapore, Dubai, London)

**`data/offices.json`** also includes a top-level map config object:
- **MapConfig**: `staticMapImagePath`, `mapImageAlt`, `viewOnMapsUrl`

**`data/tracking.json`**
- **Tracking**: `heading`, `subtext`, `howItWorksSteps[]{ step, label, description }`,
  `contactPhone`, `contactEmail`, `seo{ title, description }`

**`data/partners.json`** — array of:
- **Partner**: `name`, `logoAlt`, `websiteUrl` (optional)

**`data/awards.json`** — array of:
- **Award**: `name`, `issuingBody`, `year`, `badgeAlt` (optional)

**`data/privacy-policy.md`**
- Markdown document; full privacy policy body text (rendered to `/privacy-policy/`)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the company's primary service offering within
  10 seconds of page load, without scrolling.
- **SC-002**: The site achieves a Lighthouse Performance score ≥ 80 and SEO score ≥ 95 on
  mobile simulation.
- **SC-003**: Above-the-fold content (hero + nav) renders within 3 seconds on a simulated
  4G mobile connection.
- **SC-004**: Every contact form submission with valid data produces a visible success or
  error state — zero silent failures.
- **SC-005**: Zero WCAG 2.1 AA violations are reported by an automated accessibility audit
  against the production build.
- **SC-006**: All 9 service lines and all case studies are browsable and readable without a
  page reload on both desktop and mobile.
- **SC-007**: The static production build completes with zero errors and deploys successfully
  to a static host with a single command.
- **SC-008**: A code review MUST find zero hardcoded user-visible strings in component
  markup — every text node and attribute value is traceable to a file under `data/`.
- **SC-009**: All 19 page routes defined in the Site Map (including `/tracking/`) MUST exist
  as static HTML files in the production build and return a valid, content-populated response.
- **SC-010**: Every detail page (service, industry, case study, insight) MUST contain at
  least one cross-link to a related page — verified by a link-integrity check on the build.
- **SC-011**: The careers page MUST render without errors when `openRoles` is an empty
  array, displaying the configured empty-state message from `ui.json`.
- **SC-012**: Static search MUST return relevant results for at least one query matching
  a service name, one matching a case study title, and one matching an insights article title.

## Clarifications

### Session 2026-03-14 (continued)

- Q: What routing architecture should the site use — SPA, MPA, or single-scroll? → A: Multi-page static (MPA) — separate HTML files; each service and case study has its own URL and `<head>` metadata.
- Q: Should the site include analytics/tracking? → A: Basic page-view analytics via a configurable provider defined in JSON config; if the provider key is absent or empty the site MUST load and function silently without errors — no analytics script is injected.
- Q: How should service detail be displayed — dedicated page, modal, or inline expand? → A: Dedicated page per service (`/services/{slug}/`) — fully indexable, linkable URL with its own `<head>` metadata.
- Q: Is a privacy policy page and cookie consent banner required? → A: Yes — a static `/privacy-policy/` page (content from JSON/Markdown) MUST be built; a cookie consent banner MUST appear on first visit when analytics is active.
- Q: Where does the hero primary CTA button lead? → A: Scrolls/links to the services section — discovery before contact.
- Q: Is a custom 404 page in scope? → A: Yes — branded `/404.html` with error message from `ui.json`, a search box, and navigation links back to homepage and services.
- Q: How should the office map be implemented on `/contact/`? → A: Static map image asset (alt text from JSON) with a "View on Maps" external link URL stored in `offices.json` — no embedded iframe, no external JS, no API key.
- Q: What is the canonical term for the news/articles section — "Insights", "News", or "News & Insights"? → A: "Insights" — canonical across nav label, URL (`/insights/`), JSON filenames, and all UI strings.

## Assumptions

- The contact form will use a static-compatible third-party form service (e.g., Formspree or
  Netlify Forms). The specific provider is not constrained by this spec.
- Seed JSON data (office details, statistics, case study copy) will be provided before
  implementation; placeholder data is acceptable during development.
- The site will be English-only for v1.
- Social media profiles exist for LinkedIn, Facebook, Instagram, and X (Twitter); exact URLs
  will be populated in the JSON config.
- Target browser support: latest two versions of Chrome, Firefox, Safari, and Edge.
  Internet Explorer is explicitly out of scope.
- SSVT Logistics operates primarily in India; no i18n or multi-currency support is required
  for v1.
