import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import CaseStudyCard from '../components/ui/CaseStudyCard.jsx';

export default function CaseStudiesPage({ siteConfig, navigation, ui, caseStudies, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{ui.CASE_STUDIES_SECTION_HEADING}</h1>
            <p className="text-lg text-gray-200">Real projects. Real challenges. Real results.</p>
          </div>
        </div>
        <section className="py-20 bg-white" data-reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* FilterBar island placeholder */}
            <div id="case-studies-filter-root" className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="case-studies-grid">
              {caseStudies.map((cs) => (
                <div key={cs.id} data-industry={cs.industryTag} data-service={cs.serviceTag}>
                  <CaseStudyCard caseStudy={cs} ui={ui} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
