---
name: SSVT Logistics Project Context
description: Core project facts for SSVT Logistics — type, goals, and constraints
type: project
---

SSVT Logistics is a static corporate website for a specialized logistics and transportation
company serving renewable energy, heavy industry, and related sectors in India.

**Why:** Build a more intuitive, eye-catching alternative to a competitor reference site
with animations to grab user attention and SEO optimization.

**How to apply:** All features are frontend-only (React or Vue), data-driven by local JSON
files, no backend/API. Lightweight, accessible, responsive. Constitution v1.0.0 governs.

## Stack constraints
- No backend or API calls
- JSON files in repo are the sole data source
- Vite as build tool
- WCAG 2.1 AA accessibility required
- Lighthouse Performance ≥ 80 (mobile)
- Initial JS bundle ≤ 300 KB

## Key content areas (from reference)
- 9 service lines (renewable logistics, project/heavy lift, general transport, freight
  forwarding, customs, 3PL/warehousing, chartering, port agency, cranes)
- 10 industries served
- Case studies (4 flagship)
- Hero with animated rotating taglines
- Contact form + office details
- Sustainability/ESG section

## Spec branch
Feature 001: `001-logistics-website` (spec at specs/001-logistics-website/spec.md)
