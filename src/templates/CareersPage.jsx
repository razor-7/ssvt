import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function CareersPage({ siteConfig, navigation, ui, careers, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Careers</h1>
            <p className="text-lg text-gray-200">Join our team of logistics professionals delivering excellence worldwide.</p>
          </div>
        </div>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-4">{careers.cultureHeading}</h2>
            <p className="text-gray-700 leading-relaxed mb-10">{careers.cultureBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {careers.values.map((val, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  {val.iconPath ? (
                    <img src={val.iconPath} alt="" className="w-10 h-10 mb-3" aria-hidden="true" />
                  ) : (
                    <div className="w-10 h-10 mb-3 bg-navy/10 rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-navy"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <h3 className="text-navy font-semibold text-sm mb-1">{val.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Open Roles</h2>
            {careers.openRoles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">{ui.CAREERS_NO_ROLES}</p>
                <a href="/contact/" className="inline-flex items-center px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors no-underline min-h-[44px]">
                  {ui.CAREERS_SPECULATIVE_LABEL}
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {careers.openRoles.map((role, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-navy font-semibold text-base mb-1">{role.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{role.location}</span>
                          <span className="px-2 py-0.5 text-xs bg-orange-accent/10 text-orange-accent rounded-full font-medium">{role.type}</span>
                        </div>
                      </div>
                      <a
                        href={role.applyUrl || '/contact/'}
                        className="inline-flex items-center px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors no-underline min-h-[44px] shrink-0"
                      >
                        Apply Now
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mt-3">{role.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
