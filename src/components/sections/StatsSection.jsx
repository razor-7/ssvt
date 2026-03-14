import React from 'react';
import StatCounter from '../ui/StatCounter.jsx';

export default function StatsSection({ statistics, ui }) {
  return (
    <section className="py-20 bg-navy" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">{ui.STATS_SECTION_HEADING}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {statistics.map((stat, i) => (
            <div key={i} className="text-center p-6">
              <p className="text-4xl lg:text-5xl font-bold text-orange-accent mb-2">{stat.value}</p>
              <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
