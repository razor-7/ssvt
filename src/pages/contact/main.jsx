import ReactDOM from 'react-dom/client';
import React from 'react';
import ContactForm from '../../components/ui/ContactForm.jsx';
import CookieBanner from '../../components/layout/CookieBanner.jsx';
import BackToTop from '../../components/ui/BackToTop.jsx';
import { initScrollReveal } from '../../utils/animations.js';
import SearchBar from '../../components/ui/SearchBar.jsx';

const pageData = JSON.parse(document.getElementById('__PAGE_DATA__')?.textContent || '{}');
const { formspreeId, contactEmail, services, ui, analyticsId } = pageData;

const contactFormRoot = document.getElementById('contact-form-root');
if (contactFormRoot) {
  ReactDOM.createRoot(contactFormRoot).render(
    React.createElement(ContactForm, { formspreeId, contactEmail, services, ui })
  );
}
const cookieBannerRoot = document.getElementById('cookie-banner-root');
if (cookieBannerRoot) ReactDOM.createRoot(cookieBannerRoot).render(React.createElement(CookieBanner, { analyticsId, ui }));
const backToTopRoot = document.getElementById('back-to-top-root');
if (backToTopRoot) ReactDOM.createRoot(backToTopRoot).render(React.createElement(BackToTop, { ui }));
const searchRoot = document.getElementById('search-root');
if (searchRoot) ReactDOM.createRoot(searchRoot).render(React.createElement(SearchBar, { ui }));

document.addEventListener('DOMContentLoaded', initScrollReveal);
if (document.readyState !== 'loading') initScrollReveal();
