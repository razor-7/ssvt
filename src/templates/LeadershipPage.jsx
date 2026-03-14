import React from 'react';
import PageShell from './PageShell.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import TeamMemberCard from '../components/ui/TeamMemberCard.jsx';

export default function LeadershipPage({ siteConfig, navigation, ui, team, seo, currentPath, canonicalUrl, pageDataScript, islandScript }) {
  return (
    <PageShell siteConfig={siteConfig} navigation={navigation} ui={ui} seo={seo} currentPath={currentPath} canonicalUrl={canonicalUrl} pageDataScript={pageDataScript} islandScript={islandScript}>
      <Header siteConfig={siteConfig} navigation={navigation} ui={ui} currentPath={currentPath} />
      <main id="main-content" data-pagefind-body>
        <div className="py-24 bg-gradient-to-br from-navy-dark to-navy text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Leadership Team</h1>
            <p className="text-lg text-gray-200">Meet the experienced leaders driving SSVT Logistics forward.</p>
          </div>
        </div>
        <section className="py-16 bg-white" data-reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} ui={ui} />
    </PageShell>
  );
}
