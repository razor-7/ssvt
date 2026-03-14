import React, { useEffect, useRef } from 'react';

export default function MobileNav({ navigation, ui, isOpen, onClose, currentPath }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when drawer opens
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
      // Focus trap
      if (e.key === 'Tab') {
        const focusable = drawerRef.current?.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-50 md:hidden${isOpen ? '' : ' hidden'}`} role="dialog" aria-modal="true" aria-label="Navigation menu" data-mobile-nav>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
        data-mobile-overlay
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-lg overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="font-bold text-navy">{ui.NAV_MOBILE_MENU_TITLE}</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
            aria-label={ui.NAV_MOBILE_CLOSE_LABEL}
            data-mobile-close-btn
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className="py-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium no-underline min-h-[44px] flex items-center ${
                    currentPath === item.href
                      ? 'text-orange-accent bg-orange-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-navy'
                  }`}
                  onClick={onClose}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                >
                  {item.label}
                </a>
                {item.children && (
                  <ul className="bg-gray-50 border-l-2 border-orange-accent ml-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className={`block px-4 py-2 text-sm no-underline min-h-[44px] flex items-center ${
                            currentPath === child.href
                              ? 'text-orange-accent font-medium'
                              : 'text-gray-600 hover:text-navy'
                          }`}
                          onClick={onClose}
                          aria-current={currentPath === child.href ? 'page' : undefined}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom CTA area */}
        <div className="p-4 border-t border-gray-100 space-y-3 mt-2">
          {/* Primary CTA */}
          <a
            href="/contact/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light no-underline transition-colors min-h-[48px] text-sm"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
              <path d="M1 6l6.5 4L14 6" stroke="white" strokeWidth="1.3"/>
            </svg>
            {ui.NAV_REQUEST_QUOTE}
          </a>

          {/* Secondary links row */}
          <div className="flex gap-2">
            <a
              href="/tracking/"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-navy text-white rounded-lg hover:bg-navy-light no-underline text-xs font-medium transition-colors min-h-[44px]"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="7" width="12" height="6" rx="1" stroke="white" strokeWidth="1.2"/>
                <path d="M3 7V5l2-3h4l2 3v2" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                <circle cx="3.5" cy="11" r="1" fill="white"/>
                <circle cx="10.5" cy="11" r="1" fill="white"/>
              </svg>
              {ui.NAV_TRACKING_LABEL}
            </a>
            {/* Brochure download shown if configured */}
            <a
              href="/brochure.pdf"
              download
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 no-underline text-xs font-medium transition-colors min-h-[44px]"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {ui.BROCHURE_DOWNLOAD_LABEL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
