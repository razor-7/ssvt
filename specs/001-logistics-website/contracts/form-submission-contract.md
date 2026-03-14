# Contract: Contact Form Submission

**Branch**: `001-logistics-website` | **Date**: 2026-03-14

---

## Request

**Endpoint**: `https://formspree.io/f/{formspreeId}`
**Method**: `POST`
**Headers**:
```
Content-Type: application/json
Accept: application/json
```

**Body**:
```jsonc
{
  "name": "string",           // required; full name
  "email": "string",          // required; valid email format
  "phone": "string",          // required; no format enforced server-side
  "service": "string",        // required; value from services index (name, not slug)
  "message": "string"         // required; free text
}
```

---

## Responses

| HTTP Status | Meaning | UI Behaviour |
|-------------|---------|-------------|
| 200 | Submission accepted | Show `ui.CONTACT_FORM_SUCCESS`; reset form fields |
| 422 | Validation error (Formspree) | Show `ui.CONTACT_FORM_ERROR` + mailto fallback link |
| 429 | Rate limited | Show `ui.CONTACT_FORM_ERROR` + mailto fallback link |
| Any other non-200 | Unexpected error | Show `ui.CONTACT_FORM_ERROR` + mailto fallback link |
| Network error (fetch throws) | Offline / endpoint unreachable | Show `ui.CONTACT_FORM_ERROR` + mailto fallback link |

---

## Fallback (no `formspreeId` configured)

When `site.json.formspreeId` is `null` or absent, the `ContactForm` component renders
a `mailto:` link instead of a form:

```html
<a href="mailto:{contactEmail}?subject=Enquiry">Email us directly</a>
```

No JavaScript form handling is loaded in this case.

---

## Spam Prevention

A hidden honeypot field MUST be included in the form markup. Bots fill it; humans don't.
Formspree discards submissions where this field is non-empty.

```html
<input type="text" name="_gotcha"
       style="display:none" aria-hidden="true"
       tabindex="-1" autocomplete="off" />
```

This field MUST NOT be included in the JSON POST body — it is an HTML-only mechanism
handled by the browser form submission fallback and caught by Formspree server-side.

---

## Client-Side Validation (before POST)

All validation runs in `ContactForm.jsx` before the fetch call:

| Field | Rule | Error key |
|-------|------|-----------|
| `name` | Non-empty after trim | `CONTACT_FORM_VALIDATION_REQUIRED` |
| `email` | Non-empty + RFC 5322 pattern | `CONTACT_FORM_VALIDATION_EMAIL` |
| `phone` | Non-empty after trim | `CONTACT_FORM_VALIDATION_REQUIRED` |
| `service` | Not equal to default option value | `CONTACT_FORM_VALIDATION_REQUIRED` |
| `message` | Non-empty after trim | `CONTACT_FORM_VALIDATION_REQUIRED` |

Error messages are displayed inline beneath each field. The Submit button is
disabled while submission is in progress (`isSubmitting` state).
