import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import ServicesSection from '../components/sections/ServicesSection.jsx';
import IndustriesSection from '../components/sections/IndustriesSection.jsx';
import StatsSection from '../components/sections/StatsSection.jsx';
import CaseStudiesSection from '../components/sections/CaseStudiesSection.jsx';
import PartnersStrip from '../components/sections/PartnersStrip.jsx';
import AwardsSection from '../components/sections/AwardsSection.jsx';
import SustainabilityTeaser from '../components/sections/SustainabilityTeaser.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';

export default function HomePage({
  siteConfig, navigation, ui, services, industries, caseStudies,
  statistics, partners, awards, seo, currentPath, canonicalUrl,
  pageDataScript, islandScript,
}) {
  return (
    <PageShell
      siteConfig={siteConfig}
      navigation={navigation}
      ui={ui}
      seo={seo}
      currentPath={currentPath}
      canonicalUrl={canonicalUrl}
      pageDataScript={pageDataScript}
      islandScript={islandScript}
    >
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} data-pagefind-ignore />
      <main id="main-content" data-pagefind-body>
        <HeroSection siteConfig={siteConfig} ui={ui} />
        <div id="filter-root" data-pagefind-ignore>
          {/* Fallback static render for SEO — replaced by FilterRoot island on hydration */}
          <ServicesSection services={services} ui={ui} />
          <IndustriesSection industries={industries} ui={ui} />
        </div>
        <StatsSection statistics={statistics} ui={ui} />
        <CaseStudiesSection caseStudies={caseStudies} ui={ui} />
        <PartnersStrip partners={partners} ui={ui} />
        <AwardsSection awards={awards} ui={ui} />
        <SustainabilityTeaser ui={ui} />
        <ContactSection ui={ui} services={services} />
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
