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
      </div>
    </div>
  );
}
