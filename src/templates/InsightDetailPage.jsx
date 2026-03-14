import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import InsightCard from '../components/ui/InsightCard.jsx';

export default function InsightDetailPage({ siteConfig, navigation, ui, article, relatedArticles, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  const formattedDate = new Date(article.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm bg-white/20 rounded-full">{article.category}</span>
              <time dateTime={article.publishedDate} className="text-sm text-gray-300">{formattedDate}</time>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">{article.title}</h1>
            {article.author && <p className="mt-3 text-gray-300 text-sm">By {article.author}</p>}
          </div>
        </div>
        <article className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
          </div>
        </article>
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="py-16 bg-gray-50" data-reveal>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (<InsightCard key={a.id} article={a} ui={ui} />))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
