import React from 'react';

export default function HeroSection({ siteConfig, ui }) {
  return (
    <section
      className="relative min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center overflow-hidden"
      data-reveal
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
        {/* Hero carousel placeholder for SSR — island hydrates this */}
        <div id="hero-carousel-root" data-hero-messages={JSON.stringify(siteConfig.heroMessages)}>
          {/* Static fallback shown before JS hydration */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {siteConfig.heroMessages[0]?.headline}
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {siteConfig.heroMessages[0]?.subtext}
          </p>
          <a
            href="#services"
            className="inline-flex items-center px-8 py-4 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light transition-colors min-h-[44px] no-underline text-lg"
          >
            {siteConfig.heroCTALabel}
          </a>
        </div>

        {/* Scroll hint */}
        <p className="mt-12 text-gray-400 text-sm animate-bounce">{ui.HERO_SCROLL_HINT}</p>
      </div>
    </section>
  );
}
