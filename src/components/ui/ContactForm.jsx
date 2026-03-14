import React, { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ formspreeId, contactEmail, services, ui }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', service: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = ui.CONTACT_FORM_VALIDATION_REQUIRED;
    if (!fields.email.trim()) errs.email = ui.CONTACT_FORM_VALIDATION_REQUIRED;
    else if (!EMAIL_RE.test(fields.email)) errs.email = ui.CONTACT_FORM_VALIDATION_EMAIL;
    if (!fields.message.trim()) errs.message = ui.CONTACT_FORM_VALIDATION_REQUIRED;
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    const errs = validate();
    if (errs[name]) setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (fields._gotcha) return; // honeypot

    if (!formspreeId) {
      window.location.href = `mailto:${contactEmail}?subject=Enquiry&body=${encodeURIComponent(fields.message)}`;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: fields.phone, service: fields.service, message: fields.message }),
      });
      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', service: '', message: '', _gotcha: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6 bg-green-50 rounded-xl border border-green-200">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4 text-green-600" aria-hidden="true"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/><path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <p className="text-green-800 font-semibold">{ui.CONTACT_FORM_SUCCESS}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-6">
      <input type="text" name="_gotcha" value={fields._gotcha} onChange={handleChange} className="hidden" tabIndex="-1" aria-hidden="true" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1">{ui.CONTACT_FORM_NAME_LABEL} <span aria-hidden="true">*</span></label>
          <input id="cf-name" type="text" name="name" value={fields.name} onChange={handleChange} onBlur={handleBlur} placeholder={ui.CONTACT_FORM_NAME_PLACEHOLDER} required className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-navy transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200'}`} aria-describedby={errors.name ? 'cf-name-error' : undefined} aria-invalid={!!errors.name} />
          {errors.name && <p id="cf-name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">{ui.CONTACT_FORM_EMAIL_LABEL} <span aria-hidden="true">*</span></label>
          <input id="cf-email" type="email" name="email" value={fields.email} onChange={handleChange} onBlur={handleBlur} placeholder={ui.CONTACT_FORM_EMAIL_PLACEHOLDER} required className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-navy transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`} aria-describedby={errors.email ? 'cf-email-error' : undefined} aria-invalid={!!errors.email} />
          {errors.email && <p id="cf-email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">{ui.CONTACT_FORM_PHONE_LABEL}</label>
        <input id="cf-phone" type="tel" name="phone" value={fields.phone} onChange={handleChange} placeholder={ui.CONTACT_FORM_PHONE_PLACEHOLDER} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy" />
      </div>
      <div>
        <label htmlFor="cf-service" className="block text-sm font-medium text-gray-700 mb-1">{ui.CONTACT_FORM_SERVICE_LABEL}</label>
        <select id="cf-service" name="service" value={fields.service} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy bg-white">
          <option value="">{ui.CONTACT_FORM_SERVICE_DEFAULT}</option>
          {(services || []).map((s) => (<option key={s.id || s.slug} value={s.slug}>{s.name}</option>))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1">{ui.CONTACT_FORM_MESSAGE_LABEL} <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" value={fields.message} onChange={handleChange} onBlur={handleBlur} rows="5" placeholder={ui.CONTACT_FORM_MESSAGE_PLACEHOLDER} required className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-navy resize-vertical transition-colors ${errors.message ? 'border-red-400' : 'border-gray-200'}`} aria-describedby={errors.message ? 'cf-message-error' : undefined} aria-invalid={!!errors.message} />
        {errors.message && <p id="cf-message-error" className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>}
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">
          {ui.CONTACT_FORM_ERROR}{' '}
          <a href={`mailto:${contactEmail}`} className="underline text-red-600 font-medium">{ui.CONTACT_FORM_ERROR_MAILTO_LABEL}</a>.
        </p>
      )}
      <button type="submit" disabled={status === 'submitting'} className="w-full px-6 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'submitting' ? ui.CONTACT_FORM_SUBMITTING : ui.CONTACT_FORM_SUBMIT}
      </button>
    </form>
  );
}
