import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import FilterBar from '../../components/ui/FilterBar.jsx';
import CookieBanner from '../../components/layout/CookieBanner.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import { initScrollReveal } from '../../utils/animations.js';
import SearchBar from '../../components/ui/SearchBar.jsx';

const pageData = JSON.parse(document.getElementById('__PAGE_DATA__')?.textContent || '{}');
const { articles, categories, ui, analyticsId } = pageData;

// FilterBar island
const filterRoot = document.getElementById('insights-filter-root');
if (filterRoot && articles) {
  function InsightsFilter() {
    const [active, setActive] = useState(null);
    function handleFilter(cat) {
      setActive(cat);
      document.querySelectorAll('#insights-grid [data-category]').forEach((el) => {
        if (!cat || el.dataset.category === cat) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    }
    return React.createElement(FilterBar, { items: articles, filterKey: 'category', allLabel: 'All', onFilter: handleFilter });
  }
  ReactDOM.createRoot(filterRoot).render(React.createElement(InsightsFilter));
}

const cookieBannerRoot = document.getElementById('cookie-banner-root');
if (cookieBannerRoot) ReactDOM.createRoot(cookieBannerRoot).render(React.createElement(CookieBanner, { analyticsId, ui }));
const backToTopRoot = document.getElementById('back-to-top-root');
if (backToTopRoot) ReactDOM.createRoot(backToTopRoot).render(React.createElement(BackToTop, { ui }));
const searchRoot = document.getElementById('search-root');
if (searchRoot) ReactDOM.createRoot(searchRoot).render(React.createElement(SearchBar, { ui }));

document.addEventListener('DOMContentLoaded', initScrollReveal);
if (document.readyState !== 'loading') initScrollReveal();
