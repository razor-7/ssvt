import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar({ ui }) {
  const [open, setOpen] = useState(false);
  const scriptLoadedRef = useRef(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Wire the static header search button to open this island
  useEffect(() => {
    const headerBtn = document.getElementById('search-open-btn');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => setOpen(true));
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    // Re-init PagefindUI on every open so the input is always fresh
    const initUI = () => {
      if (window.PagefindUI) {
        const container = document.getElementById('pagefind-search');
        if (container) container.innerHTML = '';
        new window.PagefindUI({ element: '#pagefind-search', showImages: false });
      }
    };

    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.onload = initUI;
      document.head.appendChild(script);
    } else {
      initUI();
    }

    setTimeout(() => closeButtonRef.current?.focus(), 10);

    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, input, a, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold text-navy">{ui?.SEARCH_MODAL_TITLE || 'Search'}</span>
          <button
            ref={closeButtonRef}
            onClick={() => setOpen(false)}
            className="p-2 text-gray-500 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
            aria-label={ui?.SEARCH_CLOSE_LABEL || 'Close search'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div id="pagefind-search" />
        </div>
      </div>
    </div>
  );
}
