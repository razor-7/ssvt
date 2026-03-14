/**
 * build-static.mjs
 * Node.js ESM static site generator.
 * Reads JSON data files → renders React templates → writes HTML to dist/
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { micromark } from 'micromark';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA = join(ROOT, 'data');
const DIST = join(ROOT, 'dist');

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function readJson(filePath) {
  const abs = join(DATA, filePath);
  if (!existsSync(abs)) {
    throw new Error(`Data file not found: ${abs}`);
  }
  return JSON.parse(readFileSync(abs, 'utf-8'));
}

function readMd(filePath) {
  const abs = join(DATA, filePath);
  if (!existsSync(abs)) {
    throw new Error(`Markdown file not found: ${abs}`);
  }
  return readFileSync(abs, 'utf-8');
}

function parseMarkdown(md) {
  return micromark(md);
}

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function renderPage(templateComponent, props) {
  const element = React.createElement(templateComponent, props);
  return '<!DOCTYPE html>' + renderToStaticMarkup(element);
}

function writePage(outputPath, html) {
  const fullPath = join(DIST, outputPath);
  ensureDir(dirname(fullPath));
  writeFileSync(fullPath, html, 'utf-8');
  console.log(`✓ Written: ${outputPath}`);
}

// ─────────────────────────────────────────────
// SEO validation
// ─────────────────────────────────────────────

function validateSeo(seo, pageId) {
  if (!seo) return;
  if (seo.title && seo.title.length > 60) {
    console.warn(`⚠ SEO title too long (${seo.title.length} chars) for ${pageId}: "${seo.title}"`);
  }
  if (seo.description && seo.description.length > 160) {
    console.warn(`⚠ SEO description too long (${seo.description.length} chars) for ${pageId}`);
  }
}

// ─────────────────────────────────────────────
// Slug cross-reference validator
// ─────────────────────────────────────────────

function validateSlugs(refs, folder, pageId) {
  for (const slug of refs || []) {
    const file = join(DATA, folder, `${slug}.json`);
    if (!existsSync(file)) {
      throw new Error(`Missing slug reference "${slug}" in ${folder}/ (referenced by ${pageId})`);
    }
  }
}

// ─────────────────────────────────────────────
// Shared data loading
// ─────────────────────────────────────────────

const siteConfig = readJson('config/site.json');
const navigation = readJson('config/navigation.json');
const ui = readJson('config/ui.json');

const BASE_URL = process.env.BASE_URL || 'https://ssvtlogistics.com';

function canonicalUrl(path) {
  return `${BASE_URL}${path}`;
}

// ─────────────────────────────────────────────
// Template imports
// ─────────────────────────────────────────────

// Dynamic imports to handle templates that may not exist yet gracefully
async function importTemplate(name) {
  try {
    const mod = await import(`../src/templates/${name}.jsx`);
    return mod.default;
  } catch (e) {
    console.warn(`⚠ Template not found: ${name}.jsx — skipping`);
    return null;
  }
}

// ─────────────────────────────────────────────
// Page generation functions
// ─────────────────────────────────────────────

async function generateHomePage() {
  const HomePage = await importTemplate('HomePage');
  if (!HomePage) return;

  const services = readJson('services/index.json');
  const industries = readJson('industries/index.json');
  const caseStudies = readJson('case-studies/index.json');
  const statistics = readJson('statistics.json');
  const partners = readJson('partners.json');
  const awards = readJson('awards.json');

  const seo = {
    title: siteConfig.companyName,
    description: siteConfig.seoDefaults.description,
  };
  validateSeo(seo, 'homepage');

  const pageData = {
    siteConfig,
    navigation,
    ui,
    services,
    industries,
    caseStudies: caseStudies.slice(0, 4),
    statistics,
    partners,
    awards,
    seo,
    currentPath: '/',
    canonicalUrl: canonicalUrl('/'),
  };

  const pageDataScript = JSON.stringify({
    heroMessages: siteConfig.heroMessages,
    heroCTALabel: siteConfig.heroCTALabel,
    heroCarouselIntervalMs: siteConfig.heroCarouselIntervalMs,
    statistics,
    analyticsId: siteConfig.analyticsId,
    formspreeId: siteConfig.formspreeId,
    contactEmail: siteConfig.contactEmail,
    services,
    industries,
    ui,
  });

  const html = renderPage(HomePage, { ...pageData, pageDataScript, islandScript: '/assets/home.js' });
  writePage('index.html', html);
}

async function generateServicesPages() {
  const ServicesPage = await importTemplate('ServicesPage');
  const ServiceDetailPage = await importTemplate('ServiceDetailPage');

  const services = readJson('services/index.json');
  const allCaseStudies = readJson('case-studies/index.json');

  if (ServicesPage) {
    const seo = { title: 'Our Services', description: 'Explore SSVT Logistics comprehensive range of specialised logistics and transport services.' };
    validateSeo(seo, 'services-index');
    const html = renderPage(ServicesPage, {
      siteConfig, navigation, ui, services, seo,
      currentPath: '/services/',
      canonicalUrl: canonicalUrl('/services/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/services.js',
    });
    writePage('services/index.html', html);
  }

  if (ServiceDetailPage) {
    for (const summary of services) {
      const service = readJson(`services/${summary.slug}.json`);
      validateSeo(service.seo, `service/${summary.slug}`);
      validateSlugs(service.industryTags, 'industries', `service/${summary.slug}`);
      validateSlugs(service.caseStudySlugs, 'case-studies', `service/${summary.slug}`);
      validateSlugs(service.relatedServiceSlugs, 'services', `service/${summary.slug}`);

      const relatedCaseStudies = (service.caseStudySlugs || [])
        .map((slug) => allCaseStudies.find((c) => c.slug === slug))
        .filter(Boolean);
      const relatedServices = (service.relatedServiceSlugs || [])
        .map((slug) => services.find((s) => s.slug === slug))
        .filter(Boolean);

      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.seo?.description || '',
        provider: { '@type': 'Organization', name: siteConfig.companyName },
      });

      const html = renderPage(ServiceDetailPage, {
        siteConfig, navigation, ui, service, relatedCaseStudies, relatedServices,
        seo: service.seo,
        currentPath: `/services/${summary.slug}/`,
        canonicalUrl: canonicalUrl(`/services/${summary.slug}/`),
        jsonLd,
        pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
        islandScript: '/assets/service-detail.js',
      });
      writePage(`services/${summary.slug}/index.html`, html);
    }
  }
}

async function generateAboutPages() {
  const AboutPage = await importTemplate('AboutPage');
  const LeadershipPage = await importTemplate('LeadershipPage');
  const CompliancePage = await importTemplate('CompliancePage');
  const QEHSPage = await importTemplate('QEHSPage');

  if (AboutPage) {
    const about = readJson('about.json');
    validateSeo(about.seo, 'about');
    const html = renderPage(AboutPage, {
      siteConfig, navigation, ui, about, seo: about.seo,
      currentPath: '/about/',
      canonicalUrl: canonicalUrl('/about/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/about.js',
    });
    writePage('about/index.html', html);
  }

  if (LeadershipPage) {
    const team = readJson('team.json');
    const seo = { title: 'Leadership Team', description: 'Meet the leadership team driving SSVT Logistics forward.' };
    validateSeo(seo, 'leadership');
    const html = renderPage(LeadershipPage, {
      siteConfig, navigation, ui, team, seo,
      currentPath: '/leadership/',
      canonicalUrl: canonicalUrl('/leadership/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/leadership.js',
    });
    writePage('leadership/index.html', html);
  }

  if (CompliancePage) {
    const policy = readJson('compliance.json');
    validateSeo(policy.seo, 'compliance');
    const html = renderPage(CompliancePage, {
      siteConfig, navigation, ui, policy, seo: policy.seo,
      currentPath: '/compliance/',
      canonicalUrl: canonicalUrl('/compliance/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/compliance.js',
    });
    writePage('compliance/index.html', html);
  }

  if (QEHSPage) {
    const policy = readJson('qehs.json');
    validateSeo(policy.seo, 'qehs');
    const html = renderPage(QEHSPage, {
      siteConfig, navigation, ui, policy, seo: policy.seo,
      currentPath: '/qehs/',
      canonicalUrl: canonicalUrl('/qehs/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/qehs.js',
    });
    writePage('qehs/index.html', html);
  }
}

async function generateIndustriesPages() {
  const IndustriesPage = await importTemplate('IndustriesPage');
  const IndustryDetailPage = await importTemplate('IndustryDetailPage');

  const industries = readJson('industries/index.json');
  const services = readJson('services/index.json');
  const allCaseStudies = readJson('case-studies/index.json');

  if (IndustriesPage) {
    const seo = { title: 'Industries We Serve', description: 'SSVT Logistics serves diverse industries with specialised logistics solutions.' };
    validateSeo(seo, 'industries-index');
    const html = renderPage(IndustriesPage, {
      siteConfig, navigation, ui, industries, seo,
      currentPath: '/industries/',
      canonicalUrl: canonicalUrl('/industries/'),
      pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/industries.js',
    });
    writePage('industries/index.html', html);
  }

  if (IndustryDetailPage) {
    for (const summary of industries) {
      const industry = readJson(`industries/${summary.slug}.json`);
      validateSeo(industry.seo, `industry/${summary.slug}`);
      validateSlugs(industry.relatedServiceSlugs, 'services', `industry/${summary.slug}`);
      validateSlugs(industry.caseStudySlugs, 'case-studies', `industry/${summary.slug}`);

      const relatedServices = (industry.relatedServiceSlugs || [])
        .map((slug) => services.find((s) => s.slug === slug))
        .filter(Boolean);
      const relatedCaseStudies = (industry.caseStudySlugs || [])
        .map((slug) => allCaseStudies.find((c) => c.slug === slug))
        .filter(Boolean);

      const html = renderPage(IndustryDetailPage, {
        siteConfig, navigation, ui, industry, relatedServices, relatedCaseStudies,
        seo: industry.seo,
        currentPath: `/industries/${summary.slug}/`,
        canonicalUrl: canonicalUrl(`/industries/${summary.slug}/`),
        pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
        islandScript: '/assets/industry-detail.js',
      });
      writePage(`industries/${summary.slug}/index.html`, html);
    }
  }
}

async function generateInsightsPages() {
  const InsightsPage = await importTemplate('InsightsPage');
  const InsightDetailPage = await importTemplate('InsightDetailPage');

  const allArticles = readJson('insights/index.json');
  const sorted = [...allArticles].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  const categories = [...new Set(sorted.map((a) => a.category))];

  if (InsightsPage) {
    const seo = { title: 'Insights', description: 'Industry insights, news, and updates from SSVT Logistics.' };
    validateSeo(seo, 'insights-index');
    const html = renderPage(InsightsPage, {
      siteConfig, navigation, ui, articles: sorted, categories, seo,
      currentPath: '/insights/',
      canonicalUrl: canonicalUrl('/insights/'),
      pageDataScript: JSON.stringify({ articles: sorted, categories, ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/insights.js',
    });
    writePage('insights/index.html', html);
  }

  if (InsightDetailPage) {
    for (const summary of allArticles) {
      const article = readJson(`insights/${summary.slug}.json`);
      validateSeo(article.seo, `insight/${summary.slug}`);
      validateSlugs(article.relatedSlugs, 'insights', `insight/${summary.slug}`);

      const bodyHtml = parseMarkdown(article.bodyMarkdown || '');
      const relatedArticles = (article.relatedSlugs || [])
        .map((slug) => allArticles.find((a) => a.slug === slug))
        .filter(Boolean)
        .slice(0, 3);

      const html = renderPage(InsightDetailPage, {
        siteConfig, navigation, ui, article: { ...article, bodyHtml }, relatedArticles,
        seo: article.seo,
        currentPath: `/insights/${summary.slug}/`,
        canonicalUrl: canonicalUrl(`/insights/${summary.slug}/`),
        pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
        islandScript: '/assets/insight-detail.js',
      });
      writePage(`insights/${summary.slug}/index.html`, html);
    }
  }
}

async function generateCaseStudiesPages() {
  const CaseStudiesPage = await importTemplate('CaseStudiesPage');
  const CaseStudyDetailPage = await importTemplate('CaseStudyDetailPage');

  const allCaseStudies = readJson('case-studies/index.json');
  const services = readJson('services/index.json');
  const industries = readJson('industries/index.json');

  if (CaseStudiesPage) {
    const seo = { title: 'Case Studies', description: 'SSVT Logistics project case studies across complex logistics challenges.' };
    validateSeo(seo, 'case-studies-index');
    const filterServices = services.map((s) => ({ id: s.id, slug: s.slug, name: s.name }));
    const filterIndustries = industries.map((i) => ({ id: i.id, slug: i.slug, name: i.name }));
    const html = renderPage(CaseStudiesPage, {
      siteConfig, navigation, ui, caseStudies: allCaseStudies, seo,
      currentPath: '/case-studies/',
      canonicalUrl: canonicalUrl('/case-studies/'),
      pageDataScript: JSON.stringify({ caseStudies: allCaseStudies, services: filterServices, industries: filterIndustries, ui, analyticsId: siteConfig.analyticsId }),
      islandScript: '/assets/case-studies.js',
    });
    writePage('case-studies/index.html', html);
  }

  if (CaseStudyDetailPage) {
    for (const summary of allCaseStudies) {
      const cs = readJson(`case-studies/${summary.slug}.json`);
      validateSeo(cs.seo, `case-study/${summary.slug}`);
      validateSlugs(cs.relatedServiceSlugs, 'services', `case-study/${summary.slug}`);

      const bodyHtml = parseMarkdown(cs.fullBody || '');
      const relatedServices = (cs.relatedServiceSlugs || [])
        .map((slug) => services.find((s) => s.slug === slug))
        .filter(Boolean);

      const html = renderPage(CaseStudyDetailPage, {
        siteConfig, navigation, ui, caseStudy: { ...cs, bodyHtml }, relatedServices,
        seo: cs.seo,
        currentPath: `/case-studies/${summary.slug}/`,
        canonicalUrl: canonicalUrl(`/case-studies/${summary.slug}/`),
        pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
        islandScript: '/assets/case-study-detail.js',
      });
      writePage(`case-studies/${summary.slug}/index.html`, html);
    }
  }
}

async function generateContactPage() {
  const ContactPage = await importTemplate('ContactPage');
  if (!ContactPage) return;

  const offices = readJson('offices.json');
  const services = readJson('services/index.json');

  const seo = { title: 'Contact Us', description: 'Get in touch with SSVT Logistics for specialised logistics enquiries.' };
  validateSeo(seo, 'contact');

  const html = renderPage(ContactPage, {
    siteConfig, navigation, ui, offices, services, seo,
    currentPath: '/contact/',
    canonicalUrl: canonicalUrl('/contact/'),
    pageDataScript: JSON.stringify({
      formspreeId: siteConfig.formspreeId,
      contactEmail: siteConfig.contactEmail,
      services: services.map((s) => ({ id: s.id, slug: s.slug, name: s.name })),
      ui,
      analyticsId: siteConfig.analyticsId,
    }),
    islandScript: '/assets/contact.js',
  });
  writePage('contact/index.html', html);
}

async function generateCareersPage() {
  const CareersPage = await importTemplate('CareersPage');
  if (!CareersPage) return;

  const careers = readJson('careers.json');
  validateSeo(careers.seo, 'careers');

  const html = renderPage(CareersPage, {
    siteConfig, navigation, ui, careers, seo: careers.seo,
    currentPath: '/careers/',
    canonicalUrl: canonicalUrl('/careers/'),
    pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
    islandScript: '/assets/careers.js',
  });
  writePage('careers/index.html', html);
}

async function generateSustainabilityPage() {
  const SustainabilityPage = await importTemplate('SustainabilityPage');
  if (!SustainabilityPage) return;

  const sustainability = readJson('sustainability.json');
  validateSeo(sustainability.seo, 'sustainability');

  const html = renderPage(SustainabilityPage, {
    siteConfig, navigation, ui, sustainability, seo: sustainability.seo,
    currentPath: '/sustainability/',
    canonicalUrl: canonicalUrl('/sustainability/'),
    pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
    islandScript: '/assets/sustainability.js',
  });
  writePage('sustainability/index.html', html);
}

async function generateTrainingAcademyPage() {
  const TrainingAcademyPage = await importTemplate('TrainingAcademyPage');
  if (!TrainingAcademyPage) return;

  const academy = readJson('training-academy.json');
  validateSeo(academy.seo, 'training-academy');

  const html = renderPage(TrainingAcademyPage, {
    siteConfig, navigation, ui, academy, seo: academy.seo,
    currentPath: '/training-academy/',
    canonicalUrl: canonicalUrl('/training-academy/'),
    pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
    islandScript: '/assets/training-academy.js',
  });
  writePage('training-academy/index.html', html);
}

async function generatePrivacyPolicyPage() {
  const PrivacyPolicyPage = await importTemplate('PrivacyPolicyPage');
  if (!PrivacyPolicyPage) return;

  const md = readMd('privacy-policy.md');
  const bodyHtml = parseMarkdown(md);

  const seo = {
    title: 'Privacy Policy',
    description: siteConfig.seoDefaults.description,
  };
  validateSeo(seo, 'privacy-policy');

  const html = renderPage(PrivacyPolicyPage, {
    siteConfig, navigation, ui, bodyHtml, seo,
    currentPath: '/privacy-policy/',
    canonicalUrl: canonicalUrl('/privacy-policy/'),
    pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
    islandScript: '/assets/privacy-policy.js',
  });
  writePage('privacy-policy/index.html', html);
}

async function generateTrackingPage() {
  const TrackingPage = await importTemplate('TrackingPage');
  if (!TrackingPage) return;

  const tracking = readJson('tracking.json');
  validateSeo(tracking.seo, 'tracking');

  const html = renderPage(TrackingPage, {
    siteConfig, navigation, ui, tracking, seo: tracking.seo,
    currentPath: '/tracking/',
    canonicalUrl: canonicalUrl('/tracking/'),
    pageDataScript: JSON.stringify({
      ui,
      analyticsId: siteConfig.analyticsId,
      formspreeId: siteConfig.formspreeId,
      contactEmail: 'tracking@ssvtlogistics.com',
    }),
    islandScript: '/assets/tracking.js',
  });
  writePage('tracking/index.html', html);
}

async function generateNotFoundPage() {
  const NotFoundPage = await importTemplate('NotFoundPage');
  if (!NotFoundPage) return;

  const seo = { title: 'Page Not Found', description: 'The requested page could not be found.' };
  validateSeo(seo, '404');

  const html = renderPage(NotFoundPage, {
    siteConfig, navigation, ui, seo,
    currentPath: '/404',
    canonicalUrl: canonicalUrl('/404'),
    pageDataScript: JSON.stringify({ ui, analyticsId: siteConfig.analyticsId }),
    islandScript: '/assets/404.js',
  });
  writePage('404.html', html);
}

// ─────────────────────────────────────────────
// Main entry
// ─────────────────────────────────────────────

async function main() {
  console.log('🔨 Building static pages...\n');
  ensureDir(DIST);

  await generateHomePage();
  await generateServicesPages();
  await generateAboutPages();
  await generateIndustriesPages();
  await generateInsightsPages();
  await generateCaseStudiesPages();
  await generateContactPage();
  await generateCareersPage();
  await generateSustainabilityPage();
  await generateTrainingAcademyPage();
  await generatePrivacyPolicyPage();
  await generateTrackingPage();
  await generateNotFoundPage();

  console.log('\n✅ Static build complete.');
}

main().catch((err) => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});
