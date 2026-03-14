import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Timeline from '../components/ui/Timeline.jsx';

export default function AboutPage({ siteConfig, navigation, ui, about, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About SSVT Logistics</h1>
            <p className="text-lg text-gray-200">Built on 15 years of delivering complex logistics for the world's most demanding industries.</p>
          </div>
        </div>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {about.storyParagraphs.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-10 text-center">Our Journey</h2>
            <Timeline milestones={about.milestones} />
          </div>
        </section>
        {about.certifications && about.certifications.length > 0 && (
          <section className="py-16 bg-white" data-reveal>
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8 text-center">Certifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {about.certifications.map((cert, i) => (
                  <div key={i} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                    {cert.badgePath ? (
                      <img src={cert.badgePath} alt={cert.badgeAlt} className="w-16 h-16 mx-auto mb-3 object-contain" />
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-3 bg-navy/10 rounded-full flex items-center justify-center" aria-hidden="true">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-navy"><circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M9 14l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                    <h3 className="text-navy font-bold text-sm">{cert.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{cert.body}</p>
                    {cert.year && <p className="text-orange-accent text-xs font-medium mt-1">Since {cert.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
