import React from 'react';

export default function PartnersStrip({ partners, ui }) {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy mb-8 text-center">{ui.PARTNERS_SECTION_HEADING}</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center justify-center w-32 h-16">
              {partner.websiteUrl ? (
                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                  <img
                    src={partner.logoPath}
                    alt={partner.logoAlt}
                    className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </a>
              ) : (
                <img
                  src={partner.logoPath}
                  alt={partner.logoAlt}
                  className="max-w-full max-h-full object-contain opacity-60"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
