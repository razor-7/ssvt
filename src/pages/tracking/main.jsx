import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { initScrollReveal } from '../../utils/animations.js';
import { injectAnalytics } from '../../utils/analytics.js';
import SearchBar from '../../components/ui/SearchBar.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import CookieBanner from '../../components/layout/CookieBanner.jsx';

// ── Tracking Form Island ─────────────────────────────────────────────────────

function TrackingForm({ formspreeId, contactEmail, ui }) {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [refError, setRefError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function validate() {
    let valid = true;
    if (!ref.trim()) { setRefError(ui.TRACKING_VALIDATION_REQUIRED); valid = false; } else setRefError('');
    if (!email.trim()) { setEmailError(ui.TRACKING_VALIDATION_REQUIRED); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError(ui.TRACKING_VALIDATION_EMAIL); valid = false; }
    else setEmailError('');
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    const body = { 'shipment-reference': ref, email, subject: `Tracking Enquiry: ${ref}`, _gotcha: '' };

    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.ok) { setStatus('success'); setRef(''); setEmail(''); }
        else setStatus('error');
      } catch { setStatus('error'); }
    } else {
      // mailto fallback
      const subject = encodeURIComponent(`Tracking Enquiry: ${ref}`);
      const body2 = encodeURIComponent(`Shipment Reference: ${ref}\nEmail: ${email}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body2}`;
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
        <svg className="mx-auto mb-3" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="17" stroke="#16a34a" strokeWidth="1.5"/>
          <path d="M11 18l5 5 9-9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-green-800 font-medium">{ui.TRACKING_SUCCESS}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input type="text" name="_gotcha" defaultValue="" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

      <div className="mb-4">
        <label htmlFor="tracking-ref" className="block text-sm font-medium text-navy mb-1">
          {ui.TRACKING_INPUT_LABEL}
        </label>
        <input
          id="tracking-ref"
          type="text"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          onBlur={() => { if (!ref.trim()) setRefError(ui.TRACKING_VALIDATION_REQUIRED); else setRefError(''); }}
          placeholder={ui.TRACKING_INPUT_PLACEHOLDER}
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent/50 focus:border-orange-accent ${refError ? 'border-red-400' : 'border-gray-200'}`}
          aria-describedby={refError ? 'ref-error' : undefined}
          aria-invalid={refError ? 'true' : undefined}
          autoComplete="off"
        />
        {refError && <p id="ref-error" className="mt-1 text-xs text-red-600" role="alert">{refError}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="tracking-email" className="block text-sm font-medium text-navy mb-1">
          {ui.TRACKING_EMAIL_LABEL}
        </label>
        <input
          id="tracking-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (!email.trim()) setEmailError(ui.TRACKING_VALIDATION_REQUIRED);
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setEmailError(ui.TRACKING_VALIDATION_EMAIL);
            else setEmailError('');
          }}
          placeholder={ui.TRACKING_EMAIL_PLACEHOLDER}
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent/50 focus:border-orange-accent ${emailError ? 'border-red-400' : 'border-gray-200'}`}
          aria-describedby={emailError ? 'email-error' : undefined}
          aria-invalid={emailError ? 'true' : undefined}
          autoComplete="email"
        />
        {emailError && <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{emailError}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm mb-4" role="alert">
          {ui.TRACKING_ERROR}{' '}
          <a href="/contact/" className="underline">{ui.TRACKING_ERROR_MAILTO_LABEL}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-orange-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-light transition-colors min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeDasharray="10 28" strokeLinecap="round"/>
            </svg>
            {ui.TRACKING_SUBMITTING}
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {ui.TRACKING_SUBMIT}
          </>
        )}
      </button>
    </form>
  );
}

// ── Bootstrap ────────────────────────────────────────────────────────────────

const pageData = JSON.parse(
  document.getElementById('__PAGE_DATA__')?.textContent || '{}'
);
const { ui = {}, analyticsId, formspreeId, contactEmail } = pageData;

// Tracking form
const trackingRoot = document.getElementById('tracking-form-root');
if (trackingRoot) {
  const formUi = JSON.parse(trackingRoot.dataset.ui || '{}');
  const fId = trackingRoot.dataset.formspreeId || formspreeId || null;
  const cEmail = trackingRoot.dataset.contactEmail || contactEmail || 'info@ssvtlogistics.com';
  ReactDOM.createRoot(trackingRoot).render(
    <TrackingForm formspreeId={fId} contactEmail={cEmail} ui={{ ...ui, ...formUi }} />
  );
}

// SearchBar
const searchRoot = document.getElementById('search-root');
if (searchRoot) {
  ReactDOM.createRoot(searchRoot).render(<SearchBar ui={ui} />);
}

// BackToTop
const btRoot = document.getElementById('back-to-top-root');
if (btRoot) {
  ReactDOM.createRoot(btRoot).render(<BackToTop ui={ui} />);
}

// CookieBanner
const cookieRoot = document.getElementById('cookie-root');
if (cookieRoot) {
  ReactDOM.createRoot(cookieRoot).render(<CookieBanner ui={ui} analyticsId={analyticsId} />);
}

// Analytics
injectAnalytics(analyticsId);

// Scroll reveal
document.addEventListener('DOMContentLoaded', () => initScrollReveal());
initScrollReveal();
