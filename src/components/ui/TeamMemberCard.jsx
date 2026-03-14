import React from 'react';

export default function TeamMemberCard({ member }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
      {member.photoPath ? (
        <img
          src={member.photoPath}
          alt={member.photoAlt}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-navy/10 flex items-center justify-center" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-navy/40">
            <circle cx="18" cy="13" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 32c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      <h3 className="text-navy font-semibold text-base mb-0.5">{member.name}</h3>
      <p className="text-orange-accent text-xs font-medium mb-3">{member.title}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
    </article>
  );
}
