import React from 'react';

export default function SustainabilityTeaser({ ui }) {
  return (
    <section className="py-20 bg-gradient-to-r from-navy to-navy-light text-white" data-reveal>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Committed to a Greener Future</h2>
        <p className="text-gray-200 text-lg mb-8">
          SSVT Logistics is dedicated to sustainable operations, reducing carbon emissions, and supporting
          the global transition to renewable energy — because the future of logistics must be sustainable.
        </p>
        <a
          href="/sustainability/"
          className="inline-flex items-center px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors no-underline min-h-[44px]"
        >
          Our Sustainability Commitments
        </a>
      </div>
    </section>
  );
}
