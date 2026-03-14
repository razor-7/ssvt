import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';

export default function CaseStudyDetailPage({ siteConfig, navigation, ui, caseStudy, relatedServices, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 text-sm bg-white/20 rounded-full">{caseStudy.industryTag?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
              <span className="px-3 py-1 text-sm bg-orange-accent/80 rounded-full">{caseStudy.serviceTag?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">{caseStudy.title}</h1>
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-300">
              <div>
                <span className="font-medium text-white">{ui.CASE_STUDIES_ORIGIN_LABEL}:</span>{' '}
                {caseStudy.originLocation}
              </div>
              <div>
                <span className="font-medium text-white">{ui.CASE_STUDIES_DESTINATION_LABEL}:</span>{' '}
                {caseStudy.destinationLocation}
              </div>
              {caseStudy.distanceKm && (
                <div>
                  <span className="font-medium text-white">{ui.CASE_STUDIES_DISTANCE_LABEL}:</span>{' '}
                  {caseStudy.distanceKm.toLocaleString()} km
                </div>
              )}
            </div>
          </div>
        </div>

        <article className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {caseStudy.imagePath && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img src={caseStudy.imagePath} alt={caseStudy.imageAlt} className="w-full object-cover" />
              </div>
            )}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: caseStudy.bodyHtml }}
            />
            {caseStudy.outcome && (
              <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200">
                <h2 className="text-base font-bold text-green-800 mb-2">Outcome</h2>
                <p className="text-green-700 text-sm leading-relaxed">{caseStudy.outcome}</p>
              </div>
            )}
          </div>
        </article>

        {relatedServices && relatedServices.length > 0 && (
          <section className="py-16 bg-gray-50" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedServices.map((s) => (<ServiceCard key={s.id} service={s} ui={ui} />))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
