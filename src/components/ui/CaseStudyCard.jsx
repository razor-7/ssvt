import React from 'react';

export default function CaseStudyCard({ caseStudy, ui }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {caseStudy.thumbnailPath ? (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={caseStudy.thumbnailPath}
            alt={caseStudy.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-navy to-navy-light flex items-center justify-center" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/30">
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded-full">
            {caseStudy.industryTag}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium bg-orange-accent/10 text-orange-accent rounded-full">
            {caseStudy.serviceTag}
          </span>
        </div>
        <h3 className="text-navy font-semibold text-sm mb-2 leading-snug">{caseStudy.title}</h3>
        <p className="text-gray-600 text-xs leading-relaxed flex-1">{caseStudy.summaryText}</p>
        {caseStudy.distanceKm && (
          <p className="text-xs text-gray-400 mt-2">
            <span className="font-medium">{ui.CASE_STUDIES_DISTANCE_LABEL}:</span>{' '}
            {caseStudy.distanceKm.toLocaleString()} km
          </p>
        )}
        <a
          href={`/case-studies/${caseStudy.slug}/`}
          className="inline-flex items-center mt-4 text-xs font-medium text-orange-accent hover:text-orange-light no-underline gap-1 min-h-[44px]"
        >
          Read case study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6h7M6 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  );
}
