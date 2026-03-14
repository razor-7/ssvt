import React from 'react';
import CaseStudyCard from '../ui/CaseStudyCard.jsx';

export default function CaseStudiesSection({ caseStudies, ui }) {
  return (
    <section className="py-20 bg-white" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy mb-10 text-center">{ui.CASE_STUDIES_SECTION_HEADING}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {caseStudies.slice(0, 4).map((cs) => (
            <CaseStudyCard key={cs.id} caseStudy={cs} ui={ui} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/case-studies/" className="inline-flex items-center px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors no-underline min-h-[44px]">
            View All Case Studies
          </a>
        </div>
      </div>
    </section>
  );
}
