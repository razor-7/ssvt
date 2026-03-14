import React, { useState } from 'react';
import MobileNav from './MobileNav.jsx';

export default function Header({ navigation, siteConfig, ui, currentPath = '/' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100" data-pagefind-ignore>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a href="/" className="text-navy font-bold text-lg no-underline hover:text-navy-light">
            {siteConfig.companyName}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navigation.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <div className="relative" data-dropdown>
                    <button
                      className={`flex items-center gap-1 text-sm font-medium py-2 hover:text-orange-accent transition-colors ${
                        currentPath.startsWith(item.href) && item.href !== '/'
                          ? 'text-orange-accent'
                          : 'text-gray-700'
                      }`}
                      aria-expanded="false"
                      aria-haspopup="true"
                      data-dropdown-trigger
                    >
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md border border-gray-100 py-1 z-50 hidden" data-dropdown-menu>
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-sm no-underline hover:bg-gray-50 ${
                            currentPath === child.href ? 'text-orange-accent font-medium' : 'text-gray-700 hover:text-navy'
                          }`}
                          aria-current={currentPath === child.href ? 'page' : undefined}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`text-sm font-medium no-underline hover:text-orange-accent transition-colors py-2 ${
                      currentPath === item.href ? 'text-orange-accent' : 'text-gray-700'
                    }`}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: search + brochure + mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Search button placeholder — wired in island */}
            <button
              id="search-open-btn"
              className="p-2 text-gray-600 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
              aria-label={ui.SEARCH_OPEN_LABEL}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11.5 11.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {siteConfig.brochurePdfPath && (
              <a
                href={siteConfig.brochurePdfPath}
                download
                className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-orange-accent rounded hover:bg-orange-light no-underline transition-colors min-h-[44px]"
              >
                {ui.BROCHURE_DOWNLOAD_LABEL}
              </a>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
              aria-label={ui.NAV_MOBILE_OPEN_LABEL}
              aria-expanded="false"
              data-mobile-open-btn
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <MobileNav
        navigation={navigation}
        ui={ui}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={currentPath}
      />
    </header>
  );
}
