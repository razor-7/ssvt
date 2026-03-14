import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';
import CaseStudyCard from '../components/ui/CaseStudyCard.jsx';

export default function IndustryDetailPage({ siteConfig, navigation, ui, industry, relatedServices, relatedCaseStudies, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{industry.name}</h1>
          </div>
        </div>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-4">Industry Challenges</h2>
            <p className="text-gray-700 leading-relaxed mb-10">{industry.challengesDescription}</p>
            <h2 className="text-2xl font-bold text-navy mb-4">How SSVT Helps</h2>
            <p className="text-gray-700 leading-relaxed">{industry.howWeHelpBody}</p>
          </div>
        </section>
        {relatedServices && relatedServices.length > 0 && (
          <section className="py-16 bg-gray-50" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">Relevant Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((s) => (<ServiceCard key={s.id} service={s} ui={ui} />))}
              </div>
            </div>
          </section>
        )}
        {relatedCaseStudies && relatedCaseStudies.length > 0 && (
          <section className="py-16 bg-white" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">{ui.CASE_STUDIES_SECTION_HEADING}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedCaseStudies.map((cs) => (<CaseStudyCard key={cs.id} caseStudy={cs} ui={ui} />))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
