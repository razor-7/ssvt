import React from 'react';

const TRUST_ITEMS = [
  {
    uiLabel: 'TRUST_BANNER_CERTIFIED_LABEL',
    uiDesc: 'TRUST_BANNER_CERTIFIED_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.4 5.6L20 9l-4.4 4 1 5.6L12 16l-4.6 2.6 1-5.6L4 9l5.6-1.4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    uiLabel: 'TRUST_BANNER_ISO14001_LABEL',
    uiDesc: 'TRUST_BANNER_ISO14001_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 12c1.5-3 3.5-4 5-4s3.5 1 5 4-1.5 4-5 4-6.5-1-5-4z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    uiLabel: 'TRUST_BANNER_OHSAS_LABEL',
    uiDesc: 'TRUST_BANNER_OHSAS_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    uiLabel: 'TRUST_BANNER_RANKED_LABEL',
    uiDesc: 'TRUST_BANNER_RANKED_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 18V10M12 18V6M16 18v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M4 21h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    uiLabel: 'TRUST_BANNER_GLOBAL_LABEL',
    uiDesc: 'TRUST_BANNER_GLOBAL_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    uiLabel: 'TRUST_BANNER_247_LABEL',
    uiDesc: 'TRUST_BANNER_247_DESC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function TrustBanner({ ui }) {
  return (
    <section className="bg-white border-y border-gray-100 py-10 px-6 overflow-hidden" data-reveal>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-semibold text-brand-muted uppercase tracking-widest mb-8">
          {ui.TRUST_BANNER_HEADING}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.uiLabel}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-brand-surface transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy group-hover:bg-orange-accent group-hover:text-white transition-all mb-3">
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-navy">{ui[item.uiLabel]}</span>
              <span className="text-xs text-brand-muted mt-0.5">{ui[item.uiDesc]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
