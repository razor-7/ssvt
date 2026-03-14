# Data Model: SSVT Logistics Corporate Website

**Branch**: `001-logistics-website` | **Date**: 2026-03-14
**Source**: All files live under `data/` at the repository root (FR-020).
File names are kebab-case. All slugs are kebab-case strings used as URL path segments.

---

## `data/config/site.json`

```jsonc
{
  "companyName": "string",              // displayed in nav, footer, page titles
  "tagline": "string",                  // hero sub-headline
  "heroMessages": [                     // min 3 items (FR-001)
    { "headline": "string", "subtext": "string" }
  ],
  "heroCTALabel": "string",             // CTA button text (scrolls to services)
  "heroCarouselIntervalMs": 4000,       // number — cycling speed (ms)
  "seoDefaults": {
    "titleSuffix": "string",            // appended to every page title: "Page | SSVT Logistics"
    "description": "string",            // fallback meta description
    "ogImage": "string"                 // absolute URL or root-relative path to OG image
  },
  "contactEmail": "string",             // mailto fallback address
  "formspreeId": "string | null",       // Formspree form ID; null → mailto-only fallback
  "socialLinks": {
    "linkedin": "string | null",
    "facebook": "string | null",
    "instagram": "string | null",
    "twitter": "string | null"
  },
  "analyticsId": "string | null",       // analytics provider token; null → no script injected
  "brochurePdfPath": "string | null"    // root-relative path, e.g. "/brochure.pdf"; null → no link
}
```

---

## `data/config/navigation.json`

```jsonc
[
  {
    "label": "string",
    "href": "string",
    "children": [                       // optional; omit for top-level links
      { "label": "string", "href": "string" }
    ]
  }
]
```

Expected top-level items (from spec site map):
`Home`, `Who We Are` (children: About, Leadership, Compliance, Q&EHS),
`Our Solutions` (children: Services, Industries, Training Academy),
`Insights`, `Sustainability`, `Careers`, `Contact`

---

## `data/config/ui.json`

Flat key-value map. Every user-visible UI string lives here (FR-002). Keys are
`SCREAMING_SNAKE_CASE` by convention.

```jsonc
{
  // Navigation
  "NAV_SEARCH_PLACEHOLDER": "Search...",
  "NAV_MOBILE_OPEN_LABEL": "Open menu",
  "NAV_MOBILE_CLOSE_LABEL": "Close menu",

  // Hero
  "HERO_SCROLL_HINT": "Scroll to explore",

  // Services
  "SERVICES_SECTION_HEADING": "Our Services",
  "SERVICES_LEARN_MORE": "Learn more",

  // Industries
  "INDUSTRIES_SECTION_HEADING": "Industries We Serve",
  "INDUSTRIES_FILTER_ALL": "All Industries",

  // Case Studies
  "CASE_STUDIES_SECTION_HEADING": "Project Case Studies",
  "CASE_STUDIES_FILTER_ALL": "All",
  "CASE_STUDIES_ORIGIN_LABEL": "Origin",
  "CASE_STUDIES_DESTINATION_LABEL": "Destination",
  "CASE_STUDIES_DISTANCE_LABEL": "Distance",

  // Stats
  "STATS_SECTION_HEADING": "SSVT by the Numbers",

  // Partners
  "PARTNERS_SECTION_HEADING": "Our Partners",

  // Awards
  "AWARDS_SECTION_HEADING": "Awards & Recognition",

  // Contact form
  "CONTACT_FORM_HEADING": "Get in Touch",
  "CONTACT_FORM_NAME_LABEL": "Full Name",
  "CONTACT_FORM_NAME_PLACEHOLDER": "Your name",
  "CONTACT_FORM_EMAIL_LABEL": "Email Address",
  "CONTACT_FORM_EMAIL_PLACEHOLDER": "you@example.com",
  "CONTACT_FORM_PHONE_LABEL": "Phone Number",
  "CONTACT_FORM_PHONE_PLACEHOLDER": "+91 ...",
  "CONTACT_FORM_SERVICE_LABEL": "Service of Interest",
  "CONTACT_FORM_SERVICE_DEFAULT": "Select a service",
  "CONTACT_FORM_MESSAGE_LABEL": "Message",
  "CONTACT_FORM_MESSAGE_PLACEHOLDER": "Tell us about your requirement",
  "CONTACT_FORM_SUBMIT": "Send Enquiry",
  "CONTACT_FORM_SUBMITTING": "Sending...",
  "CONTACT_FORM_SUCCESS": "Thank you! We'll be in touch shortly.",
  "CONTACT_FORM_ERROR": "Something went wrong. Please try again or",
  "CONTACT_FORM_ERROR_MAILTO_LABEL": "email us directly",
  "CONTACT_FORM_VALIDATION_REQUIRED": "This field is required.",
  "CONTACT_FORM_VALIDATION_EMAIL": "Please enter a valid email address.",

  // Cookie consent
  "COOKIE_BANNER_HEADING": "We use cookies",
  "COOKIE_BANNER_BODY": "We use analytics cookies to understand how you use our site and improve your experience.",
  "COOKIE_ACCEPT": "Accept",
  "COOKIE_DECLINE": "Decline",
  "COOKIE_PRIVACY_LINK": "Privacy Policy",

  // Search
  "SEARCH_NO_RESULTS": "No results found for",
  "SEARCH_OPEN_LABEL": "Open search",
  "SEARCH_CLOSE_LABEL": "Close search",

  // Back to top
  "BACK_TO_TOP": "Back to top",

  // Careers empty state
  "CAREERS_NO_ROLES": "No open roles at this time.",
  "CAREERS_SPECULATIVE_LABEL": "Send a speculative application",

  // Insights empty state
  "INSIGHTS_NO_ARTICLES": "No insights published yet.",

  // 404 page
  "NOT_FOUND_HEADING": "Page Not Found",
  "NOT_FOUND_BODY": "The page you're looking for doesn't exist or has been moved.",
  "NOT_FOUND_HOME_LINK": "Back to Homepage",
  "NOT_FOUND_SEARCH_HINT": "Try searching for what you need:",

  // Brochure
  "BROCHURE_DOWNLOAD_LABEL": "Download Brochure",

  // Footer
  "FOOTER_COPYRIGHT": "© 2026 SSVT Logistics. All rights reserved.",
  "FOOTER_PRIVACY_LINK": "Privacy Policy",
  "FOOTER_TERMS_LABEL": "Terms & Conditions",
  "FOOTER_TAGLINE": "string"
}
```

---

## `data/services/index.json`

Array of service summary cards (homepage + `/services/` listing):

```jsonc
[
  {
    "id": "string",                     // unique identifier, e.g. "renewable-logistics"
    "slug": "string",                   // URL segment, e.g. "renewable-logistics"
    "name": "string",
    "shortDescription": "string",       // ≤ 120 chars for card display
    "icon": "string"                    // root-relative path to SVG icon, e.g. "/images/services/renewable.svg"
  }
]
```

---

## `data/services/{slug}.json`

One file per service (×9). File name matches `slug` field:

```jsonc
{
  "id": "string",
  "slug": "string",
  "name": "string",
  "fullDescription": "string",          // multi-paragraph Markdown or plain text
  "icon": "string",
  "heroImagePath": "string | null",     // WebP hero for service page
  "heroImageAlt": "string",
  "industryTags": ["string"],           // array of industry slugs
  "caseStudySlugs": ["string"],         // array of case study slugs
  "relatedServiceSlugs": ["string"],    // cross-link to other services
  "seo": {
    "title": "string",                  // ≤ 60 chars
    "description": "string"             // ≤ 160 chars
  }
}
```

---

## `data/industries/index.json`

Array of industry summary cards (homepage filter + `/industries/` listing):

```jsonc
[
  {
    "id": "string",
    "slug": "string",
    "name": "string",
    "icon": "string",                   // root-relative SVG/WebP path
    "summary": "string"                 // ≤ 100 chars
  }
]
```

---

## `data/industries/{slug}.json`

One file per industry (×10):

```jsonc
{
  "id": "string",
  "slug": "string",
  "name": "string",
  "heroImagePath": "string | null",
  "heroImageAlt": "string",
  "challengesDescription": "string",    // industry pain points paragraph
  "howWeHelpBody": "string",            // how SSVT addresses them
  "relatedServiceSlugs": ["string"],
  "caseStudySlugs": ["string"],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/case-studies/index.json`

```jsonc
[
  {
    "id": "string",
    "slug": "string",
    "title": "string",
    "industryTag": "string",            // industry slug for filtering
    "serviceTag": "string",             // service slug for filtering
    "distanceKm": "number | null",
    "summaryText": "string",            // ≤ 160 chars
    "thumbnailPath": "string | null",   // WebP
    "thumbnailAlt": "string"
  }
]
```

---

## `data/case-studies/{slug}.json`

```jsonc
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "industryTag": "string",
  "serviceTag": "string",
  "originLocation": "string",
  "destinationLocation": "string",
  "distanceKm": "number | null",
  "fullBody": "string",                 // Markdown narrative
  "outcome": "string",
  "imagePath": "string | null",         // WebP
  "imageAlt": "string",
  "relatedServiceSlugs": ["string"],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/insights/index.json`

```jsonc
[
  {
    "id": "string",
    "slug": "string",
    "title": "string",
    "publishedDate": "string",          // ISO 8601: "YYYY-MM-DD"
    "category": "string",               // e.g. "Industry News", "Case Study", "Company Update"
    "summary": "string",                // ≤ 160 chars
    "thumbnailPath": "string | null",
    "thumbnailAlt": "string"
  }
]
```

Sorted newest-first by `publishedDate` at render time in `build-static.mjs`.

---

## `data/insights/{slug}.json`

```jsonc
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "publishedDate": "string",
  "category": "string",
  "author": "string | null",
  "bodyMarkdown": "string",             // full article in Markdown
  "thumbnailPath": "string | null",
  "thumbnailAlt": "string",
  "relatedSlugs": ["string"],           // up to 3 insight slugs
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/about.json`

```jsonc
{
  "heroImagePath": "string | null",
  "heroImageAlt": "string",
  "storyParagraphs": ["string"],        // array of paragraphs
  "milestones": [
    { "year": "number", "event": "string" }
  ],
  "certifications": [
    { "name": "string", "body": "string", "year": "number | null", "badgePath": "string | null", "badgeAlt": "string" }
  ],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/team.json`

```jsonc
[
  {
    "name": "string",
    "title": "string",
    "bio": "string",
    "photoPath": "string | null",       // WebP; null → placeholder illustration shown
    "photoAlt": "string"
  }
]
```

---

## `data/compliance.json`

```jsonc
{
  "heading": "string",
  "body": "string",
  "certifications": [
    { "name": "string", "description": "string", "badgePath": "string | null", "badgeAlt": "string" }
  ],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/qehs.json`

```jsonc
{
  "heading": "string",
  "body": "string",
  "metrics": [
    { "label": "string", "value": "string" }
  ],
  "policies": [
    { "title": "string", "body": "string" }
  ],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/sustainability.json`

```jsonc
{
  "heroImagePath": "string | null",
  "heroImageAlt": "string",
  "heading": "string",
  "body": "string",
  "esgSections": [
    { "title": "string", "body": "string", "iconPath": "string | null" }
  ],
  "csrInitiatives": [
    { "title": "string", "body": "string" }
  ],
  "reports": [
    { "title": "string", "year": "number", "fileUrl": "string" }
  ],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/training-academy.json`

```jsonc
{
  "heading": "string",
  "overview": "string",
  "heroImagePath": "string | null",
  "heroImageAlt": "string",
  "courses": [
    { "title": "string", "description": "string", "duration": "string | null" }
  ],
  "enrolmentCtaLabel": "string",        // links to contact form
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/careers.json`

```jsonc
{
  "heroImagePath": "string | null",
  "heroImageAlt": "string",
  "cultureHeading": "string",
  "cultureBody": "string",
  "values": [
    { "iconPath": "string | null", "title": "string", "description": "string" }
  ],
  "openRoles": [                        // may be empty array — empty-state from ui.json
    {
      "title": "string",
      "location": "string",
      "type": "Full-time | Contract | Internship",
      "description": "string",
      "applyUrl": "string | null"       // null → routes to contact form
    }
  ],
  "seo": { "title": "string", "description": "string" }
}
```

---

## `data/statistics.json`

```jsonc
[
  {
    "label": "string",                  // e.g. "Projects Completed"
    "value": "string",                  // e.g. "1200+" (string to allow suffix chars)
    "numericValue": "number",           // numeric value for count-up animation start
    "unit": "string | null"             // e.g. "km", "years"; null if not applicable
  }
]
```

---

## `data/offices.json`

```jsonc
{
  "locations": [
    {
      "type": "Head | Corporate | Regional",
      "label": "string",               // e.g. "Head Office"
      "address": "string",
      "phone": "string"
    }
  ],
  "mapConfig": {
    "staticMapImagePath": "string",    // e.g. "/images/map-static.webp"
    "mapImageAlt": "string",
    "viewOnMapsUrl": "string"          // external URL (Google Maps / OpenStreetMap)
  }
}
```

---

## `data/partners.json`

```jsonc
[
  {
    "name": "string",
    "logoPath": "string",              // SVG preferred for quality at all sizes
    "logoAlt": "string",
    "websiteUrl": "string | null"      // null → logo not clickable
  }
]
```

---

## `data/awards.json`

```jsonc
[
  {
    "name": "string",
    "issuingBody": "string",
    "year": "number",
    "badgePath": "string | null",
    "badgeAlt": "string"
  }
]
```

---

## `data/privacy-policy.md`

Markdown document rendered to `/privacy-policy/index.html` at build time.
No front-matter required; the build script injects `seo.title` and `seo.description` from
a fixed config in `site.json` (`seoDefaults`).

---

## Validation Rules (enforced by `build-static.mjs`)

| Rule | Enforcement |
|------|-------------|
| All slugs referenced in `caseStudySlugs[]`, `relatedServiceSlugs[]`, `industryTags[]`, `relatedSlugs[]` MUST have a corresponding JSON file | Build fails with descriptive error if file missing |
| `publishedDate` MUST be valid ISO 8601 | Build throws on `new Date(date)` parse failure |
| `seo.title` MUST be ≤ 60 chars | Build warns; does not fail |
| `seo.description` MUST be ≤ 160 chars | Build warns; does not fail |
| `openRoles` array may be empty | Renders empty-state message from `ui.json` — no error |
| Missing optional fields (`photoPath`, `heroImagePath`, etc.) treated as `null` | Render graceful fallback (placeholder or omit element) |
