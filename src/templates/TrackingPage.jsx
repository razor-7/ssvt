import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function TrackingPage({ siteConfig, navigation, ui, tracking, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell
      siteConfig={siteConfig}
      navigation={navigation}
      ui={ui}
      seo={seo}
      currentPath={currentPath}
      canonicalUrl={canonicalUrl}
      pageDataScript={pageDataScript}
      islandScript={islandScript}
    >
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
      {/* Page header */}
      <section className="bg-gradient-to-br from-navy-dark to-navy py-16 px-6 text-white" data-reveal>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-accent/20 border border-orange-accent/30 rounded-full text-orange-light text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="8" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M3 8V5l3-3h5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="3.5" cy="11" r="1" fill="currentColor"/>
              <circle cx="10.5" cy="11" r="1" fill="currentColor"/>
            </svg>
            Real-Time Cargo Tracking
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{tracking.heading}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">{tracking.subtext}</p>
        </div>
      </section>

      {/* Tracking form + how it works */}
      <section className="py-16 px-6 bg-brand-surface" data-reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Tracking enquiry form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-2">{ui.TRACKING_PAGE_TITLE}</h2>
            <p className="text-brand-muted text-sm mb-6">{ui.TRACKING_PAGE_DESCRIPTION}</p>

            {/* Island placeholder — wired in main.jsx */}
            <div id="tracking-form-root"
              data-formspree-id=""
              data-contact-email="tracking@ssvtlogistics.com"
              data-ui={JSON.stringify({
                TRACKING_INPUT_LABEL: ui.TRACKING_INPUT_LABEL,
                TRACKING_INPUT_PLACEHOLDER: ui.TRACKING_INPUT_PLACEHOLDER,
                TRACKING_EMAIL_LABEL: ui.TRACKING_EMAIL_LABEL,
                TRACKING_EMAIL_PLACEHOLDER: ui.TRACKING_EMAIL_PLACEHOLDER,
                TRACKING_SUBMIT: ui.TRACKING_SUBMIT,
                TRACKING_SUBMITTING: ui.TRACKING_SUBMITTING,
                TRACKING_SUCCESS: ui.TRACKING_SUCCESS,
                TRACKING_ERROR: ui.TRACKING_ERROR,
                TRACKING_ERROR_MAILTO_LABEL: ui.TRACKING_ERROR_MAILTO_LABEL,
                TRACKING_VALIDATION_REQUIRED: ui.TRACKING_VALIDATION_REQUIRED,
                TRACKING_VALIDATION_EMAIL: ui.TRACKING_VALIDATION_EMAIL,
              })}
            >
              {/* Static fallback form markup */}
              <form noValidate>
                <div className="mb-4">
                  <label htmlFor="tracking-ref" className="block text-sm font-medium text-navy mb-1">
                    {ui.TRACKING_INPUT_LABEL}
                  </label>
                  <input
                    id="tracking-ref"
                    type="text"
                    placeholder={ui.TRACKING_INPUT_PLACEHOLDER}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent/50 focus:border-orange-accent"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="tracking-email" className="block text-sm font-medium text-navy mb-1">
                    {ui.TRACKING_EMAIL_LABEL}
                  </label>
                  <input
                    id="tracking-email"
                    type="email"
                    placeholder={ui.TRACKING_EMAIL_PLACEHOLDER}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent/50 focus:border-orange-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-light transition-colors min-h-[48px] flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h12M8 2l6 6-6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {ui.TRACKING_SUBMIT}
                </button>
              </form>
            </div>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-8">{ui.TRACKING_HOW_IT_WORKS_HEADING}</h2>
            <ol className="space-y-6">
              {tracking.howItWorksSteps.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{step.label}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Immediate help block */}
            <div className="mt-10 p-6 bg-navy rounded-xl text-white">
              <h3 className="font-semibold text-lg mb-2">{ui.TRACKING_ALT_HEADING}</h3>
              <p className="text-gray-300 text-sm mb-4">{ui.TRACKING_ALT_BODY}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${tracking.contactPhone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-accent text-white rounded-lg hover:bg-orange-light no-underline text-sm font-medium transition-colors min-h-[44px]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2.5C2 2.5 3 1 4.5 2.5L6 4l-1 1s1.5 2.5 4 4l1-1 1.5 1.5C13 11 11.5 12 11.5 12S7 11 4.5 8.5 2 2.5 2 2.5z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                  {ui.TRACKING_ALT_CALL_LABEL}
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 no-underline text-sm font-medium transition-colors min-h-[44px]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="white" strokeWidth="1.2"/>
                    <path d="M1 5.5l6 3.5 6-3.5" stroke="white" strokeWidth="1.2"/>
                  </svg>
                  {ui.TRACKING_ALT_CONTACT_LABEL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
