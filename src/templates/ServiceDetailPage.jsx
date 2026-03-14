import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';
import CaseStudyCard from '../components/ui/CaseStudyCard.jsx';

export default function ServiceDetailPage({ siteConfig, navigation, ui, service, relatedCaseStudies, relatedServices, seo, currentPath, canonicalUrl, jsonLd, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} jsonLd={jsonLd} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        {service.heroImagePath ? (
          <div className="relative h-72 overflow-hidden">
            <img src={service.heroImagePath} alt={service.heroImageAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center px-6">{service.name}</h1>
            </div>
          </div>
        ) : (
          <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
            <div className="max-w-3xl mx-auto px-6">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={service.icon} alt="" className="w-full h-full object-contain brightness-200" aria-hidden="true" />
              </div>
              <h1 className="text-4xl font-bold">{service.name}</h1>
            </div>
          </div>
        )}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {service.fullDescription.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
          {service.industryTags && service.industryTags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-navy mb-4">Industries We Serve</h2>
              <div className="flex flex-wrap gap-2">
                {service.industryTags.map((tag) => (
                  <a key={tag} href={`/industries/${tag}/`} className="px-4 py-2 bg-navy/10 text-navy rounded-full text-sm font-medium no-underline hover:bg-navy hover:text-white transition-colors">
                    {tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {relatedCaseStudies && relatedCaseStudies.length > 0 && (
          <section className="py-16 bg-gray-50" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">{ui.CASE_STUDIES_SECTION_HEADING}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs.id} caseStudy={cs} ui={ui} />
                ))}
              </div>
            </div>
          </section>
        )}
        {relatedServices && relatedServices.length > 0 && (
          <section className="py-16 bg-white" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedServices.map((s) => (
                  <ServiceCard key={s.id} service={s} ui={ui} />
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
