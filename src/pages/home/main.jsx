import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import HeroCarousel from '../../components/ui/HeroCarousel.jsx';
import IndustriesSection from '../../components/sections/IndustriesSection.jsx';
import ServicesSection from '../../components/sections/ServicesSection.jsx';
import StatCounter from '../../components/ui/StatCounter.jsx';
import CookieBanner from '../../components/layout/CookieBanner.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import { initScrollReveal } from '../../utils/animations.js';
import SearchBar from '../../components/ui/SearchBar.jsx';

const pageData = JSON.parse(document.getElementById('__PAGE_DATA__')?.textContent || '{}');
const { heroMessages, heroCTALabel, heroCarouselIntervalMs, statistics, analyticsId, services, industries, ui } = pageData;

// Hydrate hero carousel
const heroRoot = document.getElementById('hero-carousel-root');
if (heroRoot && heroMessages) {
  ReactDOM.createRoot(heroRoot).render(
    React.createElement(HeroCarousel, {
      heroMessages,
      heroCTALabel,
      heroCarouselIntervalMs,
      scrollTargetId: 'services',
      ui,
    })
  );
}

// Shared filter root — IndustriesSection + ServicesSection share activeIndustry state
function FilterRoot() {
  const [activeIndustry, setActiveIndustry] = useState(null);
  useEffect(() => { initScrollReveal(); }, []);
  return (
    <>
      <IndustriesSection
        industries={industries || []}
        ui={ui || {}}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
      />
      <ServicesSection
        services={services || []}
        ui={ui || {}}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
      />
    </>
  );
}

// Mount interactive filter root (replaces static ServicesSection + IndustriesSection)
const filterRoot = document.getElementById('filter-root');
if (filterRoot && industries && services) {
  ReactDOM.createRoot(filterRoot).render(React.createElement(FilterRoot));
}

// Hydrate stat counters
if (statistics) {
  document.querySelectorAll('[data-stat-index]').forEach((el) => {
    const idx = parseInt(el.getAttribute('data-stat-index'), 10);
    if (statistics[idx]) {
      ReactDOM.createRoot(el).render(React.createElement(StatCounter, { stat: statistics[idx] }));
    }
  });
}

// Cookie banner
const cookieBannerRoot = document.getElementById('cookie-banner-root');
if (cookieBannerRoot) {
  ReactDOM.createRoot(cookieBannerRoot).render(
    React.createElement(CookieBanner, { analyticsId, ui })
  );
}

// Back to top
const backToTopRoot = document.getElementById('back-to-top-root');
if (backToTopRoot) {
  ReactDOM.createRoot(backToTopRoot).render(
    React.createElement(BackToTop, { ui })
  );
}

// Scroll reveal
const searchRoot = document.getElementById('search-root');
if (searchRoot) ReactDOM.createRoot(searchRoot).render(React.createElement(SearchBar, { ui }));

document.addEventListener('DOMContentLoaded', initScrollReveal);
if (document.readyState !== 'loading') initScrollReveal();
