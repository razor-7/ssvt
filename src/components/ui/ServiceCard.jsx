import React from 'react';

export default function ServiceCard({ service, ui }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col">
      <div className="w-12 h-12 mb-4">
        <img src={service.icon} alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>
      <h3 className="text-navy font-semibold text-base mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">{service.shortDescription}</p>
      <a
        href={`/services/${service.slug}/`}
        className="inline-flex items-center mt-4 text-sm font-medium text-orange-accent hover:text-orange-light no-underline gap-1 min-h-[44px]"
      >
        {ui.SERVICES_LEARN_MORE}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </article>
  );
}
