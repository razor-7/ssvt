import React from 'react';
import IndustryCard from '../ui/IndustryCard.jsx';

export default function IndustriesSection({ industries, ui, activeIndustry, onIndustryChange }) {
  return (
    <section id="industries" className="py-20 bg-gray-50" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy mb-6 text-center">{ui.INDUSTRIES_SECTION_HEADING}</h2>

        {/* Industry filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter by industry">
          <button
            onClick={() => onIndustryChange && onIndustryChange(null)}
            className={`px-4 py-2 text-sm rounded-full border transition-colors min-h-[44px] ${
              !activeIndustry
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
            }`}
          >
            {ui.INDUSTRIES_FILTER_ALL}
          </button>
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => onIndustryChange && onIndustryChange(industry.slug)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors min-h-[44px] ${
                activeIndustry === industry.slug
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeIndustry ? industries.filter((i) => i.slug === activeIndustry) : industries).map((industry) => (
            <IndustryCard key={industry.id} industry={industry} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
