import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function TrainingAcademyPage({ siteConfig, navigation, ui, academy, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{academy.heading}</h1>
          </div>
        </div>

        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {academy.overview.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gray-50" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Courses & Programmes</h2>
            <div className="space-y-6">
              {academy.courses.map((course, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="text-navy font-semibold">{course.title}</h3>
                    {course.duration && (
                      <span className="px-3 py-1 text-xs font-medium bg-orange-accent/10 text-orange-accent rounded-full shrink-0">
                        {course.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy text-white text-center" data-reveal>
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-4">Ready to Enrol?</h2>
            <p className="text-gray-200 mb-8">Contact our Training Academy team to discuss course availability, group bookings, and bespoke training programmes.</p>
            <a
              href="/contact/"
              className="inline-flex items-center px-8 py-4 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light transition-colors no-underline min-h-[44px]"
            >
              {academy.enrolmentCtaLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
