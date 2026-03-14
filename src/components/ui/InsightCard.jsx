import React from 'react';

export default function InsightCard({ article, ui }) {
  const formattedDate = new Date(article.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {article.thumbnailPath ? (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img src={article.thumbnailPath} alt={article.thumbnailAlt || ''} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-400"><rect x="6" y="6" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M12 20h16M12 15h8M12 25h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded-full">{article.category}</span>
          <time dateTime={article.publishedDate} className="text-xs text-gray-400">{formattedDate}</time>
        </div>
        <h3 className="text-navy font-semibold text-sm mb-2 leading-snug">{article.title}</h3>
        <p className="text-gray-600 text-xs leading-relaxed flex-1">{article.summary}</p>
        <a href={`/insights/${article.slug}/`} className="inline-flex items-center mt-4 text-xs font-medium text-orange-accent hover:text-orange-light no-underline gap-1 min-h-[44px]">
          Read article
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6h7M6 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </article>
  );
}
