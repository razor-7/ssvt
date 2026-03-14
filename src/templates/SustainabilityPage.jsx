import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function SustainabilityPage({ siteConfig, navigation, ui, sustainability, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{sustainability.heading}</h1>
          </div>
        </div>

        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {sustainability.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gray-50" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">ESG Commitments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {sustainability.esgSections.map((section, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  {section.iconPath ? (
                    <img src={section.iconPath} alt="" className="w-10 h-10 mb-3" aria-hidden="true" />
                  ) : (
                    <div className="w-10 h-10 mb-3 bg-green-100 rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-600">
                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <h3 className="text-navy font-semibold mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">CSR Initiatives</h2>
            <div className="space-y-6">
              {sustainability.csrInitiatives.map((initiative, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-navy font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{initiative.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {sustainability.reports && sustainability.reports.length > 0 && (
          <section className="py-16 bg-gray-50" data-reveal>
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">Sustainability Reports</h2>
              <ul className="space-y-3">
                {sustainability.reports.map((report, i) => (
                  <li key={i}>
                    <a
                      href={report.fileUrl}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors no-underline min-h-[44px]"
                      download={report.fileUrl !== '#'}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {report.title} ({report.year})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
