import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function NotFoundPage({ siteConfig, navigation, ui, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-6">
        <div className="max-w-lg text-center">
          <p className="text-8xl font-bold text-navy/20 mb-4">404</p>
          <h1 className="text-3xl font-bold text-navy mb-3">{ui.NOT_FOUND_HEADING}</h1>
          <p className="text-gray-600 mb-8">{ui.NOT_FOUND_BODY}</p>

          {/* Search island placeholder */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3">{ui.NOT_FOUND_SEARCH_HINT}</p>
            <div id="not-found-search-root" />
          </div>

          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors no-underline min-h-[44px]"
          >
            {ui.NOT_FOUND_HOME_LINK}
          </a>
        </div>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
