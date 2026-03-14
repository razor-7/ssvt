import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';

export default function ContactPage({ siteConfig, navigation, ui, offices, services, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-200">Get in touch with our team for enquiries, quotes, and project consultations.</p>
          </div>
        </div>
        <ContactSection ui={ui} services={services} />
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Our Offices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {offices.locations.map((loc, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wide text-orange-accent">{loc.type} Office</span>
                  <p className="font-semibold text-navy mt-1 mb-2">{loc.label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{loc.address}</p>
                  <p className="text-gray-600 text-sm mt-2 font-medium">{loc.phone}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <img
                src={offices.mapConfig.staticMapImagePath}
                alt={offices.mapConfig.mapImageAlt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <a
                  href={offices.mapConfig.viewOnMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition-colors no-underline min-h-[44px]"
                >
                  View on Maps
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1.5" aria-hidden="true"><path d="M4 4h6v6M4 10l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
