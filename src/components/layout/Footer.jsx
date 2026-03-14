import React from 'react';

export default function Footer({ siteConfig, ui }) {
  const { companyName, tagline, socialLinks, brochurePdfPath } = siteConfig;

  return (
    <footer className="bg-navy-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold text-white mb-2">{companyName}</p>
            <p className="text-sm text-gray-300">{ui.FOOTER_TAGLINE || tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy/" className="text-gray-300 hover:text-orange-accent no-underline">
                  {ui.FOOTER_PRIVACY_LINK}
                </a>
              </li>
              {brochurePdfPath && (
                <li>
                  <a href={brochurePdfPath} className="text-gray-300 hover:text-orange-accent no-underline" download>
                    {ui.BROCHURE_DOWNLOAD_LABEL}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social links */}
          <div>
            {socialLinks && (
              <ul className="flex gap-4">
                {socialLinks.linkedin && (
                  <li>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-accent no-underline text-sm"
                      aria-label="LinkedIn"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {socialLinks.facebook && (
                  <li>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-accent no-underline text-sm"
                      aria-label="Facebook"
                    >
                      Facebook
                    </a>
                  </li>
                )}
                {socialLinks.twitter && (
                  <li>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-accent no-underline text-sm"
                      aria-label="Twitter"
                    >
                      Twitter
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>{ui.FOOTER_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
