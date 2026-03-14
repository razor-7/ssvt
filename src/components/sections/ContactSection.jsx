import React from 'react';

export default function ContactSection({ ui, services }) {
  return (
    <section id="contact" className="py-20 bg-gray-50" data-reveal>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy mb-8 text-center">{ui.CONTACT_FORM_HEADING}</h2>
        {/* ContactForm island root — hydrated by contact page island */}
        <div id="contact-form-root">
          <form className="space-y-6" aria-label="Contact form">
            {/* honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex="-1" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1">
                  {ui.CONTACT_FORM_NAME_LABEL}
                </label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder={ui.CONTACT_FORM_NAME_PLACEHOLDER}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">
                  {ui.CONTACT_FORM_EMAIL_LABEL}
                </label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder={ui.CONTACT_FORM_EMAIL_PLACEHOLDER}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">
                {ui.CONTACT_FORM_PHONE_LABEL}
              </label>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                placeholder={ui.CONTACT_FORM_PHONE_PLACEHOLDER}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label htmlFor="cf-service" className="block text-sm font-medium text-gray-700 mb-1">
                {ui.CONTACT_FORM_SERVICE_LABEL}
              </label>
              <select
                id="cf-service"
                name="service"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy bg-white"
              >
                <option value="">{ui.CONTACT_FORM_SERVICE_DEFAULT}</option>
                {(services || []).map((s) => (
                  <option key={s.id || s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1">
                {ui.CONTACT_FORM_MESSAGE_LABEL}
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows="5"
                placeholder={ui.CONTACT_FORM_MESSAGE_PLACEHOLDER}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy resize-vertical"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors min-h-[44px]"
            >
              {ui.CONTACT_FORM_SUBMIT}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
