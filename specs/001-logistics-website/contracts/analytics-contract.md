# Contract: Analytics Integration

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

---

## Configuration

Analytics is opt-in, driven entirely by `data/config/site.json`:

```jsonc
{
  "analyticsId": "G-XXXXXXXXXX"   // Google Analytics 4 Measurement ID example
                                   // null or omit → no script injected
}
```

---

## Injection Logic (`src/utils/analytics.js`)

```js
export function initAnalytics(analyticsId, hasConsent) {
  if (!analyticsId || !hasConsent) return; // silent no-op

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', analyticsId, { anonymize_ip: true });
}
```

Called from `CookieBanner.jsx` after user accepts consent, and on page load if
`localStorage.getItem('ssvt_consent') === 'accepted'`.

---

## Consent States

| State | `localStorage` value | Analytics behaviour |
|-------|---------------------|-------------------|
| Not yet decided | key absent | Script NOT loaded; banner shown |
| Accepted | `'accepted'` | Script loaded; banner hidden |
| Declined | `'declined'` | Script NOT loaded; banner hidden |

The consent key is `ssvt_consent` (namespaced to avoid collisions).
Consent preference persists across sessions via localStorage.

---

## Privacy Requirements (from FR-018 / FR-019)

- `anonymize_ip: true` MUST be set in the gtag config call.
- The analytics script MUST be loaded **asynchronously** (`script.async = true`) —
  it MUST NOT block first contentful paint (constitution Principle V).
- The privacy policy page MUST describe the analytics cookie and its purpose.
- When the user declines consent, calling `initAnalytics` with `hasConsent = false`
  MUST be a provable no-op (no network request, no cookie set).

---

## Provider Agnosticism

The `analyticsId` string format determines the provider; `analytics.js` treats it
as an opaque token. The implementation above targets Google Analytics 4 (GA4) as
the assumed provider. To switch providers, only `analytics.js` needs updating —
no changes to data files or other components.
