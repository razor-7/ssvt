import React from 'react';

export default function IndustryCard({ industry, ui }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col items-start">
      <div className="w-10 h-10 mb-3">
        <img src={industry.icon} alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>
      <h3 className="text-navy font-semibold text-sm mb-1">{industry.name}</h3>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{industry.summary}</p>
      <a
        href={`/industries/${industry.slug}/`}
        className="inline-flex items-center mt-3 text-xs font-medium text-orange-accent hover:text-orange-light no-underline gap-1 min-h-[44px]"
      >
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6h7M6 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </article>
  );
}
