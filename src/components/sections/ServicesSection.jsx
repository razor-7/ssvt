import React from 'react';
import ServiceCard from '../ui/ServiceCard.jsx';

export default function ServicesSection({ services, ui, activeIndustry, onIndustryChange }) {
  const filtered = activeIndustry
    ? services.filter((s) => s.industryTags && s.industryTags.includes(activeIndustry))
    : services;

  const displayServices = filtered.length > 0 ? filtered : services;

  return (
    <section id="services" className="py-20 bg-white" data-reveal>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy mb-10 text-center">{ui.SERVICES_SECTION_HEADING}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
