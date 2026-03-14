# Contract: Static Search (Pagefind)

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

---

## Build Integration

Pagefind runs as a post-build CLI step after `vite build` completes:

```jsonc
// package.json
{
  "scripts": {
    "build": "node scripts/build-static.mjs && vite build && pagefind --site dist --output-path dist/_pagefind"
  }
}
```

Pagefind crawls all HTML files in `dist/`, indexes visible text content, and writes
the search index and UI assets to `dist/_pagefind/`.

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
// SearchBar.jsx
const [loaded, setLoaded] = useState(false);

async function openSearch() {
  if (!loaded) {
    const { PagefindUI } = await import('/_pagefind/pagefind-ui.js');
    new PagefindUI({ element: '#search-container', showImages: false });
    setLoaded(true);
  }
  // show search panel
}
```

The Pagefind UI JS (~50 KB) is **not** included in the initial bundle — it is a
dynamic import triggered only on user interaction.

> **Path note**: The build command writes the Pagefind index to `dist/_pagefind/`
> (either via `--output-path dist/_pagefind` or Pagefind's default). At runtime this
> serves as `/_pagefind/`. The import path MUST use the leading underscore:
> `/_pagefind/pagefind-ui.js` — not `/pagefind/pagefind-ui.js`.

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
