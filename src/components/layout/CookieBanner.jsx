import React, { useState, useEffect } from 'react';
import { getConsent, setConsent } from '../../utils/consent.js';
import { injectAnalytics } from '../../utils/analytics.js';

export default function CookieBanner({ analyticsId, ui }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if analyticsId is set and consent not yet recorded
    if (!analyticsId) return;
    const existing = getConsent();
    if (existing === 'accepted') {
      injectAnalytics(analyticsId);
      return;
    }
    if (!existing) {
      setVisible(true);
    }
  }, [analyticsId]);

  function handleAccept() {
    setConsent('accepted');
    injectAnalytics(analyticsId);
    setVisible(false);
  }

  function handleDecline() {
    setConsent('declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy text-white p-4 shadow-lg"
      role="region"
      aria-label="Cookie consent"
      data-pagefind-ignore
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-sm mb-1">{ui.COOKIE_BANNER_HEADING}</p>
          <p className="text-sm text-gray-300">
            {ui.COOKIE_BANNER_BODY}{' '}
            <a href="/privacy-policy/" className="underline text-orange-accent hover:text-orange-light text-sm">
              {ui.COOKIE_PRIVACY_LINK}
            </a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-400 text-gray-200 rounded hover:bg-gray-700 min-h-[44px] transition-colors"
          >
            {ui.COOKIE_DECLINE}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-orange-accent text-white rounded hover:bg-orange-light min-h-[44px] transition-colors"
          >
            {ui.COOKIE_ACCEPT}
          </button>
        </div>
      </div>
    </div>
  );
}
