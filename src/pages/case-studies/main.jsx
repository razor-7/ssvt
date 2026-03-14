import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import FilterBar from '../../components/ui/FilterBar.jsx';
import CookieBanner from '../../components/layout/CookieBanner.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import { initScrollReveal } from '../../utils/animations.js';
import SearchBar from '../../components/ui/SearchBar.jsx';

const pageData = JSON.parse(document.getElementById('__PAGE_DATA__')?.textContent || '{}');
const { caseStudies, services, industries, ui, analyticsId } = pageData;

const filterRoot = document.getElementById('case-studies-filter-root');
if (filterRoot && industries) {
  function CaseStudiesFilter() {
    function handleFilter(industry) {
      document.querySelectorAll('#case-studies-grid [data-industry]').forEach((el) => {
        el.style.display = (!industry || el.dataset.industry === industry) ? '' : 'none';
      });
    }
    return React.createElement(FilterBar, {
      items: industries || [],
      filterKey: 'slug',
      allLabel: ui?.CASE_STUDIES_FILTER_ALL || 'All',
      onFilter: handleFilter,
    });
  }
  ReactDOM.createRoot(filterRoot).render(React.createElement(CaseStudiesFilter));
}

const cookieBannerRoot = document.getElementById('cookie-banner-root');
if (cookieBannerRoot) ReactDOM.createRoot(cookieBannerRoot).render(React.createElement(CookieBanner, { analyticsId, ui }));
const backToTopRoot = document.getElementById('back-to-top-root');
if (backToTopRoot) ReactDOM.createRoot(backToTopRoot).render(React.createElement(BackToTop, { ui }));
const searchRoot = document.getElementById('search-root');
if (searchRoot) ReactDOM.createRoot(searchRoot).render(React.createElement(SearchBar, { ui }));

document.addEventListener('DOMContentLoaded', initScrollReveal);
if (document.readyState !== 'loading') initScrollReveal();
