import React from 'react';

export default function PageShell({
  siteConfig,
  navigation,
  ui,
  seo,
  currentPath,
  children,
  canonicalUrl,
  jsonLd,
  pageDataScript,
  islandScript,
}) {
  const title = seo?.title
    ? `${seo.title} | ${siteConfig.companyName}`
    : siteConfig.companyName;
  const description = seo?.description || siteConfig.seoDefaults.description;
  const ogImage = siteConfig.seoDefaults.ogImage || '';

  // Organization JSON-LD for homepage
  const orgJsonLd =
    currentPath === '/'
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.companyName,
          url: canonicalUrl ? canonicalUrl.replace(/\/$/, '') : '',
          logo: `${ogImage}`,
          sameAs: Object.values(siteConfig.socialLinks || {}).filter(Boolean),
        })
      : null;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="/assets/styles.css" />
        {orgJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: orgJsonLd }}
          />
        )}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        )}
      </head>
      <body className="overflow-x-hidden">
        {children}
        {/* Island mount points */}
        <div id="search-root" data-pagefind-ignore />
        <div id="cookie-banner-root" data-pagefind-ignore />
        <div id="back-to-top-root" data-pagefind-ignore />
        {pageDataScript && (
          <script
            id="__PAGE_DATA__"
            type="application/json"
            dangerouslySetInnerHTML={{ __html: pageDataScript }}
          />
        )}
        {islandScript && <script type="module" src={islandScript} />}
        <script src="/nav.js" />
      </body>
    </html>
  );
}
