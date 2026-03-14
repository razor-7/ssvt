# Contract: Static Search (Pagefind)

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

---

## Build Integration

Pagefind runs as a post-build CLI step after `vite build` completes:

```jsonc
// package.json
{
  "scripts": {
    "build": "node --import tsx/esm scripts/build-static.mjs && vite build && npx pagefind --site dist"
  }
}
```

Pagefind crawls all HTML files in `dist/`, indexes visible text content, and writes
the search index and UI assets to `dist/pagefind/`.

---

## Indexed Content

Pagefind indexes the text content of every HTML page. Content weighted by heading level.
The following `data-pagefind-*` attributes are used to control indexing:

| Attribute | Usage |
|-----------|-------|
| `data-pagefind-body` | Placed on the `<main>` element of each page — marks the primary indexable region |
| `data-pagefind-ignore` | Placed on nav, footer, cookie banner, and search UI — excludes repeated chrome from index |
| `data-pagefind-meta="title"` | Explicit title for search result display (matches `<title>` tag) |
| `data-pagefind-meta="image"` | OG image path — shown in search result card if Pagefind UI supports it |

---

## Search UI Integration

`SearchBar.jsx` lazily imports the Pagefind UI bundle only when the user opens the
search panel (click on search icon in nav):

```js
// SearchBar.jsx — actual implementation (lazy loads via <script> tag, not dynamic import)
const script = document.createElement('script');
script.src = '/pagefind/pagefind-ui.js';
script.onload = () => {
  if (window.PagefindUI) {
    new window.PagefindUI({ element: '#pagefind-search', showImages: false });
  }
  setLoaded(true);
};
document.head.appendChild(script);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/pagefind/pagefind-ui.css';
document.head.appendChild(link);
```

The Pagefind UI JS (~50 KB) is **not** included in the initial bundle — it is loaded
via a dynamically appended `<script>` tag, triggered only on first user interaction.

> **Path note**: Pagefind v1.x writes its index to `dist/pagefind/` (no leading
> underscore). At runtime this serves as `/pagefind/`. The script src MUST be
> `/pagefind/pagefind-ui.js` — not `/_pagefind/pagefind-ui.js`.

---

## Search Index Scope

| Content type | Indexed | Notes |
|-------------|---------|-------|
| Service pages (`/services/{slug}/`) | ✅ | Full description, name |
| Industry pages (`/industries/{slug}/`) | ✅ | Challenges, how we help |
| Case study pages (`/case-studies/{slug}/`) | ✅ | Title, narrative, outcome |
| Insights articles (`/insights/{slug}/`) | ✅ | Full article body |
| Homepage | ✅ | Hero, section headings |
| About, Leadership, etc. | ✅ | All static text |
| Nav, footer, cookie banner | ❌ | Excluded via `data-pagefind-ignore` |

---

## Success Criteria (from spec SC-012)

The search index MUST return at least one result for each of:
- A query matching a service name (e.g. "renewable logistics")
- A query matching a case study title
- A query matching an insights article title

Verified manually after each production build.
