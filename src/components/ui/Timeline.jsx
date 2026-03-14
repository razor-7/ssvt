import React from 'react';

export default function Timeline({ milestones }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        style={{position:'absolute',top:0,bottom:0,width:'2px',backgroundColor:'#d1d5db',left:'50%',transform:'translateX(-50%)'}}
        aria-hidden="true"
      />

      <ol className="space-y-8">
        {milestones.map((milestone, i) => (
          <li key={i} className="relative flex items-start gap-6 md:gap-0" data-reveal>
            {/* Desktop: alternating left/right */}
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <span className="text-orange-accent font-bold text-lg">{milestone.year}</span>
                <p className="text-gray-700 text-sm mt-1 leading-relaxed">{milestone.event}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div
              className="absolute left-4 md:left-1/2 w-3 h-3 bg-orange-accent rounded-full border-2 border-white shadow-sm transform -translate-x-1/2 mt-5"
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
