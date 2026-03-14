import React, { useState } from 'react';
import MobileNav from './MobileNav.jsx';

export default function Header({ navigation, siteConfig, ui, currentPath = '/' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100" data-pagefind-ignore>
      {/* Top bar — tracking + brochure */}
      <div className="hidden md:block bg-navy-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <span className="text-gray-300">24/7 Operations Centre: <a href="tel:+912212345678" className="text-orange-accent hover:text-orange-light no-underline font-medium">+91 22 1234 5678</a></span>
          <div className="flex items-center gap-4">
            <a href="/tracking/" className="text-gray-300 hover:text-orange-accent no-underline flex items-center gap-1 transition-colors">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L10.5 5.5H14.5L11.5 8.5L12.5 13L8 10.5L3.5 13L4.5 8.5L1.5 5.5H5.5L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              {ui.NAV_TRACKING_LABEL}
            </a>
            {siteConfig.brochurePdfPath && (
              <a
                href={siteConfig.brochurePdfPath}
                download
                className="text-gray-300 hover:text-orange-accent no-underline flex items-center gap-1 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1v9M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {ui.BROCHURE_DOWNLOAD_LABEL}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2 no-underline hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-orange-accent rounded flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 11L5 4L9 8L13 3L15 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 14h14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-navy font-bold text-lg">{siteConfig.companyName}</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
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
                    <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-md border border-gray-100 py-1 z-50 hidden" data-dropdown-menu>
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm no-underline hover:bg-orange-accent/5 border-l-2 transition-colors ${
                            currentPath === child.href
                              ? 'text-orange-accent font-medium border-orange-accent'
                              : 'text-gray-700 hover:text-navy border-transparent hover:border-orange-accent'
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

          {/* Right side: search + Request a Quote + mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              id="search-open-btn"
              className="p-2 text-gray-500 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-gray-50 transition-colors"
              aria-label={ui.SEARCH_OPEN_LABEL}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11.5 11.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Request a Quote — primary CTA */}
            <a
              href="/contact/"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-orange-accent rounded-lg hover:bg-orange-light no-underline transition-colors min-h-[44px] shadow-sm hover:shadow-md"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v6M4 4l3 3 3-3M1 10h12v2H1z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {ui.NAV_REQUEST_QUOTE}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-navy min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-gray-50 transition-colors"
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
