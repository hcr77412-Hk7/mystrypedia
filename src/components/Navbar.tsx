import { useState } from 'react';
import { Search, Sliders, Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenSEOInspector: () => void;
}

export function Navbar({ currentPath, onNavigate, onOpenSearch, onOpenSEOInspector }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Bermuda Triangle', path: '/bermuda-triangle-mysteries' },
    { label: 'Egyptian Pyramids', path: '/how-egyptian-pyramids-were-built' },
    { label: 'Mary Celeste', path: '/mary-celeste-mystery' }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#52647D]/25 bg-[#101827]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex flex-col items-start whitespace-nowrap shrink-0 transition-opacity hover:opacity-95"
          title="Mystrypedia — Mystery Archive"
        >
          <span className="font-display tracking-[0.2em] text-[#D6A84F] text-2xl font-bold transition-colors group-hover:text-[#E5BC68]">
            MYSTRYPEDIA
          </span>
          <span className="text-[9px] uppercase tracking-[0.28em] font-sans text-[#B8C0CC]/80 font-medium">
            Mystrypedia Mystery Archive
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`whitespace-nowrap shrink-0 py-2 relative transition-all duration-200 ${
                  isActive
                    ? 'text-[#D6A84F] font-semibold'
                    : 'text-[#B8C0CC] hover:text-[#F4EBDD]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Functional Search button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-md border border-[#52647D]/40 bg-[#171C28] px-3.5 py-1.5 text-xs font-medium text-[#B8C0CC] hover:border-[#D6A84F]/50 hover:text-[#F4EBDD] transition-all duration-200 shadow-sm"
            title="Search articles and topics (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-[#38B7A5]" />
            <span className="hidden sm:inline">Search Archives</span>
            <kbd className="hidden sm:inline-block rounded border border-[#52647D]/50 bg-[#101827] px-1.5 py-0.5 text-[10px] text-[#52647D]">
              ⌘K
            </kbd>
          </button>

          {/* College SEO Inspector Trigger */}
          <button
            type="button"
            onClick={onOpenSEOInspector}
            className="flex items-center gap-1.5 rounded-md border border-[#D6A84F]/40 bg-[#D6A84F]/10 px-3 py-1.5 text-xs font-medium text-[#D6A84F] hover:bg-[#D6A84F]/20 hover:border-[#D6A84F]/60 transition-all duration-200"
            title="Inspect SEO Metadata & Keywords for this page"
          >
            <Sliders className="h-3.5 w-3.5 text-[#D6A84F]" />
            <span className="hidden md:inline">SEO Audit</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center rounded-md p-2 text-[#B8C0CC] hover:text-[#F4EBDD] hover:bg-[#171C28] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#52647D]/30 bg-[#171C28] px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#D6A84F]/15 text-[#D6A84F] font-semibold border-l-2 border-[#D6A84F]'
                    : 'text-[#B8C0CC] hover:bg-[#101827] hover:text-[#F4EBDD]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#52647D]/30 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-md border border-[#52647D]/40 bg-[#101827] px-3 py-2 text-xs font-medium text-[#F4EBDD]"
            >
              <Search className="h-3.5 w-3.5 text-[#38B7A5]" />
              <span>Search Database</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSEOInspector();
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-md border border-[#D6A84F]/40 bg-[#D6A84F]/10 px-3 py-2 text-xs font-medium text-[#D6A84F]"
            >
              <Sliders className="h-3.5 w-3.5 text-[#D6A84F]" />
              <span>SEO Audit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
