import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function QEHSPage({ siteConfig, navigation, ui, policy, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{policy.heading}</h1>
          </div>
        </div>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {policy.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </section>
        <section className="py-16 bg-gray-50" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">Performance Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {policy.metrics.map((metric, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-navy font-semibold text-sm mb-1">{metric.label}</p>
                  <p className="text-orange-accent font-bold text-lg">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Our Policies</h2>
            <div className="space-y-4">
              {policy.policies.map((p, i) => (
                <details key={i} className="border border-gray-200 rounded-xl p-5 group">
                  <summary className="font-semibold text-navy cursor-pointer list-none flex justify-between items-center">
                    {p.title}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 ml-2">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{p.body}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
