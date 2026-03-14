# Contract: Page Data Interface

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

Each page template in `src/templates/` receives a `pageData` prop assembled by
`scripts/build-static.mjs`. This document defines the shape of that prop for every
page type.

---

## Common Fields (all pages)

```ts
interface CommonPageData {
  siteConfig: SiteConfig;           // from data/config/site.json
  navigation: NavItem[];            // from data/config/navigation.json
  ui: Record<string, string>;       // from data/config/ui.json (full flat map)
  seo: {
    title: string;                  // full page title (e.g. "Renewable Logistics | SSVT Logistics")
    description: string;
    canonicalUrl: string;           // absolute URL (constructed from site base URL + path)
    ogImage: string;
  };
  currentPath: string;              // e.g. "/services/renewable-logistics/"
}
```

---

## Page-Specific Data Shapes

### Homepage (`/`)
```ts
interface HomePageData extends CommonPageData {
  services: ServiceSummary[];
  industries: IndustrySummary[];
  caseStudies: CaseStudySummary[];  // first 4 items only
  statistics: Statistic[];
  partners: Partner[];
  awards: Award[];
  about: { storyParagraphs: string[] };  // first paragraph only for teaser
  sustainability: { heading: string; body: string };  // teaser only
}
```

### About (`/about/`)
```ts
interface AboutPageData extends CommonPageData {
  about: AboutData;                 // full data/about.json
}
```

### Leadership (`/leadership/`)
```ts
interface LeadershipPageData extends CommonPageData {
  team: TeamMember[];
}
```

### Compliance (`/compliance/`) & Q&EHS (`/qehs/`)
```ts
interface PolicyPageData extends CommonPageData {
  policy: ComplianceData | QEHSData;  // respective JSON file
}
```

### Services Overview (`/services/`)
```ts
interface ServicesPageData extends CommonPageData {
  services: ServiceSummary[];
}
```

### Service Detail (`/services/{slug}/`)
```ts
interface ServiceDetailPageData extends CommonPageData {
  service: ServiceDetail;
  relatedIndustries: IndustrySummary[];   // hydrated from industryTags[]
  relatedCaseStudies: CaseStudySummary[]; // hydrated from caseStudySlugs[]
  relatedServices: ServiceSummary[];      // hydrated from relatedServiceSlugs[]
}
```

### Industries Overview (`/industries/`)
```ts
interface IndustriesPageData extends CommonPageData {
  industries: IndustrySummary[];
}
```

### Industry Detail (`/industries/{slug}/`)
```ts
interface IndustryDetailPageData extends CommonPageData {
  industry: IndustryDetail;
  relatedServices: ServiceSummary[];      // hydrated from relatedServiceSlugs[]
  relatedCaseStudies: CaseStudySummary[]; // hydrated from caseStudySlugs[]
}
```

### Case Studies Listing (`/case-studies/`)
```ts
interface CaseStudiesPageData extends CommonPageData {
  caseStudies: CaseStudySummary[];
  industries: IndustrySummary[];          // for filter options
  services: ServiceSummary[];             // for filter options
}
```

### Case Study Detail (`/case-studies/{slug}/`)
```ts
interface CaseStudyDetailPageData extends CommonPageData {
  caseStudy: CaseStudyDetail;
  relatedServices: ServiceSummary[];      // hydrated from relatedServiceSlugs[]
}
```

### Insights Listing (`/insights/`)
```ts
interface InsightsPageData extends CommonPageData {
  articles: ArticleSummary[];            // sorted newest-first
  categories: string[];                  // distinct categories for filter
}
```

### Insight Detail (`/insights/{slug}/`)
```ts
interface InsightDetailPageData extends CommonPageData {
  article: ArticleDetail;
  relatedArticles: ArticleSummary[];     // hydrated from relatedSlugs[] (max 3)
}
```

### Sustainability (`/sustainability/`)
```ts
interface SustainabilityPageData extends CommonPageData {
  sustainability: SustainabilityData;
}
```

### Training Academy (`/training-academy/`)
```ts
interface TrainingAcademyPageData extends CommonPageData {
  academy: TrainingAcademyData;
}
```

### Careers (`/careers/`)
```ts
interface CareersPageData extends CommonPageData {
  careers: CareersData;                  // openRoles may be []
}
```

### Contact (`/contact/`)
```ts
interface ContactPageData extends CommonPageData {
  offices: OfficesData;                  // locations[] + mapConfig
  services: ServiceSummary[];            // for service interest dropdown
}
```

### Privacy Policy (`/privacy-policy/`)
```ts
interface PrivacyPolicyPageData extends CommonPageData {
  bodyHtml: string;                      // privacy-policy.md parsed to HTML
}
```

### 404 (`/404.html`)
```ts
interface NotFoundPageData extends CommonPageData {
  // no page-specific data; uses ui.json strings only
}
```

---

## Island Hydration Contract

Each `src/pages/{type}/main.jsx` island receives its data via a JSON payload
embedded in a `<script id="__PAGE_DATA__" type="application/json">` tag in the
static HTML. The island reads it at hydration time:

```js
const pageData = JSON.parse(
  document.getElementById('__PAGE_DATA__').textContent
);
```

The build script is responsible for serialising the correct `pageData` subset
(only data needed for interactivity) into this tag. Static content is pre-rendered
into the HTML and does not need to be re-passed to the island.

**Island data requirements** (minimal — only what JS needs at runtime):

| Island | Data needed at runtime |
|--------|----------------------|
| `HeroCarousel` | `heroMessages[]`, `heroCTALabel`, `heroCarouselIntervalMs` |
| `FilterBar` (services) | `industries[]` (id, slug, name) |
| `FilterBar` (case studies) | `industries[]`, `services[]` (id, slug, name) |
| `FilterBar` (insights) | `categories[]` |
| `ContactForm` | `formspreeId`, `services[]` (name only), `contactEmail` |
| `CookieBanner` | `analyticsId`, UI strings |
| `SearchBar` | — (Pagefind UI self-contained) |
| `StatCounter` | `statistics[]` (numericValue, label, unit) |
