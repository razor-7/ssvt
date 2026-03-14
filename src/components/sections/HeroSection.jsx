import React from 'react';

export default function HeroSection({ siteConfig, ui }) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background: photo or gradient fallback */}
      {siteConfig.heroBackgroundPath ? (
        <img
          src={siteConfig.heroBackgroundPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" aria-hidden="true" />
      )}

      {/* Dark overlay — guarantees text contrast over photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy/70 to-navy-dark/85" aria-hidden="true" />

      {/* Animated geometric background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-8 w-48 h-48 border border-orange-accent/20 rounded-full animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute top-1/3 left-16 w-24 h-24 border border-white/10 rounded-full animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 right-8 w-64 h-64 border border-orange-accent/10 rounded-full animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}} />
        <div className="absolute top-1/2 right-16 w-32 h-32 border border-white/10 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '0.5s'}} />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{background: 'linear-gradient(135deg, transparent 60%, rgba(240,123,43,0.15) 60%)'}} />

        {/* Moving cargo route line — decorative SVG */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
          <path d="M0 150 Q180 80 360 120 T720 100 T1080 130 T1440 90" stroke="white" strokeWidth="2" fill="none" strokeDasharray="8 4"/>
          <circle cx="360" cy="120" r="4" fill="rgba(240,123,43,0.8)"/>
          <circle cx="720" cy="100" r="4" fill="rgba(240,123,43,0.8)"/>
          <circle cx="1080" cy="130" r="4" fill="rgba(240,123,43,0.8)"/>
        </svg>
      </div>

      {/* Hero carousel — island hydrates this */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24 flex-1 flex flex-col justify-center">
        <div id="hero-carousel-root" data-hero-messages={JSON.stringify(siteConfig.heroMessages)}>
          {/* Static fallback shown before JS hydration */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-accent/20 border border-orange-accent/30 rounded-full text-orange-light text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4v4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            24/7 Operations — ISO 9001:2015 Certified
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {siteConfig.heroMessages[0]?.headline}
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.heroMessages[0]?.subtext}
          </p>

          {/* Dual CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light transition-all min-h-[52px] no-underline text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M9 3l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {siteConfig.heroCTALabel}
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all min-h-[52px] no-underline text-lg backdrop-blur-sm hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M2 7l7 4 7-4" stroke="white" strokeWidth="1.5"/>
              </svg>
              {ui.HERO_SECONDARY_CTA}
            </a>
          </div>
        </div>

        {/* Key stats row in hero */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '15+', label: 'Years' },
            { value: '1,200+', label: 'Projects' },
            { value: '12', label: 'Countries' },
            { value: '98%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-accent">{s.value}</div>
              <div className="text-xs text-gray-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-10">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            {ui.HERO_SCROLL_HINT}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-bounce">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </p>
        </div>
      </div>

      {/* Trust certification strip */}
      <div className="relative z-10 w-full bg-white/5 border-t border-white/10 py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.5 3.9 11l.6-3.5L2 5l3.5-.5L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            {ui.HERO_TRUST_CERTIFIED}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4.5 7l1.5 1.5L9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {ui.HERO_TRUST_RANKED}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M2 7q2.5-3 5 0t5 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
            {ui.HERO_TRUST_GLOBAL}
          </span>
          <span className="text-white/20">|</span>
          <a href="/tracking/" className="flex items-center gap-1.5 text-orange-accent hover:text-orange-light transition-colors no-underline font-medium">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v6M4 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="9" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Track Your Shipment
          </a>
        </div>
      </div>
    </section>
  );
}
