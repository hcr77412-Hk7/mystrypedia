/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SEOInspectorModal } from './components/SEOInspectorModal';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ARTICLES, ArticleData } from './data/articlesData';
import { PAGES_SEO_MAP, PageSEO } from './data/seoData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSEOInspectorOpen, setIsSEOInspectorOpen] = useState(false);

  // Sync state on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handler
  const handleNavigate = (path: string) => {
    const [pathname, hash] = path.split('#');
    const normalizedPath = pathname || '/';

    if (normalizedPath !== currentPath) {
      window.history.pushState(null, '', path);
      setCurrentPath(normalizedPath);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      window.history.pushState(null, '', path);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine current active article and SEO metadata
  let currentArticle: ArticleData | undefined;
  let currentSEO: PageSEO = PAGES_SEO_MAP.home;
  let isNotFound = false;

  const cleanPath = currentPath.replace(/\/+$/, '') || '/';

  if (cleanPath === '/') {
    currentSEO = PAGES_SEO_MAP.home;
  } else if (cleanPath === '/bermuda-triangle-mysteries') {
    currentArticle = ARTICLES.find((a) => a.slug === 'bermuda-triangle-mysteries');
    currentSEO = PAGES_SEO_MAP.bermuda;
  } else if (cleanPath === '/how-egyptian-pyramids-were-built') {
    currentArticle = ARTICLES.find((a) => a.slug === 'how-egyptian-pyramids-were-built');
    currentSEO = PAGES_SEO_MAP.pyramids;
  } else if (cleanPath === '/mary-celeste-mystery') {
    currentArticle = ARTICLES.find((a) => a.slug === 'mary-celeste-mystery');
    currentSEO = PAGES_SEO_MAP.maryCeleste;
  } else {
    isNotFound = true;
    currentSEO = {
      pageName: '404 Not Found',
      path: cleanPath,
      url: `https://mystrypedia.vercel.app${cleanPath}`,
      primaryKeyword: 'page not found',
      relatedKeywords: ['404 error', 'uncharted page'],
      searchIntent: 'Navigational',
      seoTitle: '404 - Archival Record Not Found | Mystrypedia',
      metaDescription: 'The requested archival record or investigation could not be found in the Mystrypedia catalog.',
      headingsCount: { h1: 1, h2Count: 1, h3Count: 0 },
      questionHeadings: []
    };
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#101827] text-[#F4EBDD] font-sans selection:bg-[#D6A84F]/30 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentPath={cleanPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSEOInspector={() => setIsSEOInspectorOpen(true)}
      />

      {/* Main Page Views */}
      <div className="flex-1">
        {isNotFound ? (
          <NotFoundPage
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        ) : currentArticle ? (
          <ArticlePage
            key={currentArticle.slug}
            article={currentArticle}
            onNavigate={handleNavigate}
            onOpenSEOInspector={() => setIsSEOInspectorOpen(true)}
          />
        ) : (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSEOInspector={() => setIsSEOInspectorOpen(true)}
          />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSEOInspector={() => setIsSEOInspectorOpen(true)}
      />

      {/* Real Functional Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* College Assignment SEO & Metadata Inspector */}
      <SEOInspectorModal
        isOpen={isSEOInspectorOpen}
        onClose={() => setIsSEOInspectorOpen(false)}
        currentSEO={currentSEO}
        currentArticle={currentArticle}
      />
    </div>
  );
}
