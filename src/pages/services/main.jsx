import ReactDOM from 'react-dom/client';
import React from 'react';
import CookieBanner from '../../components/layout/CookieBanner.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import { initScrollReveal } from '../../utils/animations.js';
import SearchBar from '../../components/ui/SearchBar.jsx';

const pageData = JSON.parse(document.getElementById('__PAGE_DATA__')?.textContent || '{}');
const { ui, analyticsId } = pageData;

const cookieBannerRoot = document.getElementById('cookie-banner-root');
if (cookieBannerRoot) ReactDOM.createRoot(cookieBannerRoot).render(React.createElement(CookieBanner, { analyticsId, ui }));

const backToTopRoot = document.getElementById('back-to-top-root');
if (backToTopRoot) ReactDOM.createRoot(backToTopRoot).render(React.createElement(BackToTop, { ui }));

const searchRoot = document.getElementById('search-root');
if (searchRoot) ReactDOM.createRoot(searchRoot).render(React.createElement(SearchBar, { ui }));

document.addEventListener('DOMContentLoaded', initScrollReveal);
if (document.readyState !== 'loading') initScrollReveal();
