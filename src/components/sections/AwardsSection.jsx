import React from 'react';

export default function AwardsSection({ awards, ui }) {
  return (
    <section className="py-20 bg-white" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy mb-10 text-center">{ui.AWARDS_SECTION_HEADING}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              {award.badgePath ? (
                <img src={award.badgePath} alt={award.badgeAlt} className="w-16 h-16 mx-auto mb-3 object-contain" />
              ) : (
                <div className="w-16 h-16 mx-auto mb-3 bg-navy/10 rounded-full flex items-center justify-center" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-navy">
                    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <h3 className="text-navy font-semibold text-sm mb-1">{award.name}</h3>
              <p className="text-gray-500 text-xs">{award.issuingBody}</p>
              <p className="text-orange-accent text-xs font-medium mt-1">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
