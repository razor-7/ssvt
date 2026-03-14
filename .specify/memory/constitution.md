<!--
## Sync Impact Report

**Version change**: (none) → 1.0.0 (initial adoption)

### Added sections
- Core Principles: I. Simplicity & YAGNI, II. Static-First, III. Accessibility,
  IV. Responsive Design, V. Lightweight & Performance
- Technology Standards
- Quality Gates
- Governance

### Modified principles
- N/A (initial creation)

### Removed sections
- N/A (initial creation)

### Template alignment
- `.specify/templates/plan-template.md`   ✅ Constitution Check section is generic — no updates needed
- `.specify/templates/spec-template.md`   ✅ Scope/requirements sections align with principles
- `.specify/templates/tasks-template.md`  ✅ Task phases align with new principle-driven quality gates
- `.specify/templates/agent-file-template.md` ✅ Generic — no updates needed
- `.specify/templates/checklist-template.md`  ✅ Generic — no updates needed

### Deferred TODOs
- None. All fields resolved.
-->

# SSVT Logistics Constitution

## Core Principles

### I. Simplicity & YAGNI (NON-NEGOTIABLE)

Every implementation decision MUST default to the simplest solution that satisfies the current
requirement. Abstractions, utilities, and patterns are ONLY introduced when they solve an
immediate, concrete problem present in the codebase today.

- New dependencies MUST be justified against an existing alternative or the native platform.
- Premature generalization is treated as a defect, not a feature.
- Components, hooks, and utilities MUST NOT be created speculatively for future use.
- Refactoring toward abstraction MUST wait until the pattern appears at least three times.

**Rationale**: A static logistics front-end has a bounded, well-understood scope. Complexity
added "just in case" increases maintenance cost without delivering user value.

### II. Static-First

SSVT Logistics MUST operate without a backend, API server, or runtime data-fetching layer.
All application data is sourced exclusively from JSON files committed to the repository.

- No `fetch()`, `axios`, or HTTP client calls to external endpoints are permitted.
- JSON data files are the single source of truth; changes to data require a code commit.
- Build output MUST be a set of static files deployable to any static host (e.g., GitHub Pages,
  Netlify, S3) without a server process.
- Dynamic data features (user auth, form submissions, persistence) are out of scope unless
  the constitution is amended to include a backend tier.

**Rationale**: Static delivery eliminates operational complexity, reduces infrastructure cost,
and aligns with the project's lightweight mandate.

### III. Accessibility

Every user-facing component MUST meet WCAG 2.1 Level AA conformance as a baseline.

- All interactive elements MUST be keyboard-navigable and focusable in a logical tab order.
- All images and icon-only controls MUST carry meaningful `alt` text or `aria-label`.
- Color MUST NOT be the sole means of conveying information; contrast ratios MUST meet AA
  thresholds (4.5:1 for normal text, 3:1 for large text).
- Screen-reader compatibility MUST be verified using at least one assistive technology
  (e.g., NVDA, VoiceOver) before a feature is considered complete.

**Rationale**: Logistics platforms serve a diverse workforce including users with disabilities.
Accessibility is a legal and ethical requirement, not an enhancement.

### IV. Responsive Design

All views and components MUST render correctly and usably across mobile, tablet, and desktop
breakpoints without horizontal scrolling or layout overflow.

- Design MUST follow a mobile-first approach: base styles target small screens, larger
  breakpoints progressively enhance.
- Breakpoints MUST be defined as project-wide tokens/variables — magic pixel values in
  component styles are prohibited.
- Touch targets MUST be at least 44×44 CSS pixels on mobile viewports.
- Layouts MUST be validated at a minimum of three widths: ≤480px, 768px, and ≥1280px.

**Rationale**: Field staff and drivers access logistics tooling primarily on mobile devices.
Desktop-only layouts would exclude a large portion of the primary user base.

### V. Lightweight & Performance

The production build MUST remain lean. Adding a dependency or asset that materially increases
bundle size requires explicit justification.

- Total initial JavaScript bundle (uncompressed) MUST NOT exceed 300 KB without a documented
  exception in the relevant feature plan.
- Images MUST be optimized and served in modern formats (WebP, AVIF) where the target browsers
  support them.
- Third-party scripts (analytics, maps, chat widgets) MUST be loaded asynchronously and MUST
  NOT block first contentful paint.
- Lighthouse Performance score MUST remain ≥ 80 on mobile simulation after each release.

**Rationale**: Logistics sites are often accessed on constrained mobile networks. Bloated
bundles directly harm usability for the primary audience.

## Technology Standards

These constraints apply to all features and MUST NOT be overridden without amending this
constitution.

- **Framework**: React or Vue (choose one at project start; do not mix frameworks).
- **Styling**: A single CSS approach MUST be chosen (e.g., CSS Modules, Tailwind CSS, or
  plain CSS custom properties). Multiple competing styling systems are prohibited.
- **Data layer**: Local JSON files under a dedicated `data/` directory at the repository root.
  File naming MUST be kebab-case and descriptive (e.g., `shipments.json`, `routes.json`).
- **Build tooling**: Vite is the preferred bundler for its speed and zero-config static output.
- **No SSR/SSG frameworks** (Next.js, Nuxt, Remix) unless the constitution is amended to
  permit a server tier.

## Quality Gates

Every feature MUST pass all applicable gates before merging to `main`.

| Gate | Requirement | Tool / Method |
|------|-------------|---------------|
| Accessibility | Zero WCAG AA violations in automated scan | axe-core / Lighthouse |
| Performance | Lighthouse Performance ≥ 80 (mobile) | Lighthouse CI |
| Responsive | No layout overflow at 480px, 768px, 1280px | Manual / browser DevTools |
| Bundle size | Initial JS ≤ 300 KB uncompressed | Bundlesize / Vite build output |
| Static build | `npm run build` produces deployable static files with zero errors | CI pipeline |

Violations block merge. Exceptions MUST be logged in the feature plan's Complexity Tracking
table with explicit rationale.

## Governance

This constitution supersedes all other development guidelines, conventions, and preferences
documented elsewhere in the repository. In the event of a conflict, the constitution governs.

**Amendment procedure**:
1. Open a pull request with the proposed change to this file.
2. Describe the motivation and impact in the PR description.
3. Obtain approval from at least one other project contributor (or self-review with documented
   rationale if solo project).
4. Increment the version according to the versioning policy below.
5. Update `LAST_AMENDED_DATE` to the merge date.

**Versioning policy**:
- MAJOR: Removal or backward-incompatible redefinition of a principle or governance rule.
- MINOR: Addition of a new principle, section, or materially expanded guidance.
- PATCH: Clarifications, wording improvements, typo fixes, non-semantic refinements.

**Compliance reviews**:
- Every feature plan MUST include a Constitution Check section that explicitly verifies
  compliance with all five core principles and the applicable quality gates.
- Pull requests that introduce new dependencies MUST cite the Lightweight & Performance
  principle and document the bundle-size impact.

**Version**: 1.0.0 | **Ratified**: 2026-03-14 | **Last Amended**: 2026-03-14
