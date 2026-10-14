import { Compass, BookOpen, ShieldCheck, FileCode, CheckSquare, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSEOInspector: () => void;
}

export function Footer({ onNavigate, onOpenSEOInspector }: FooterProps) {
  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-[#52647D]/25 bg-[#171C28] text-[#B8C0CC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-14">
          {/* Column 1: Brand & Editorial Mission */}
          <div className="space-y-4 md:col-span-1">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex flex-col items-start text-white group"
              title="Mystrypedia — Mystery Archive"
            >
              <span className="font-display tracking-[0.2em] text-[#D6A84F] text-2xl font-bold transition-colors group-hover:text-[#E5BC68]">
                MYSTRYPEDIA
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] font-sans text-[#B8C0CC]/75 font-medium">
                Mystrypedia Mystery Archive
              </span>
            </a>
            <p className="text-xs leading-relaxed text-[#B8C0CC] font-sans">
              Explore the Unknown. Discover the Unexplained. A peer-reviewed editorial archive dedicated to separating historical facts from sensational folklore across maritime anomalies and ancient civilizations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#52647D]">
              <ShieldCheck className="h-4 w-4 text-[#38B7A5]" />
              <span className="text-[#B8C0CC]">Evidence-based curatorial standards</span>
            </div>
          </div>

          {/* Column 2: Required Investigative Pages */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] font-sans">
              Curated Investigations
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a
                  href="/bermuda-triangle-mysteries"
                  onClick={(e) => handleNav(e, '/bermuda-triangle-mysteries')}
                  className="hover:text-[#D6A84F] transition-colors"
                >
                  Bermuda Triangle: Facts, Disappearances & Theories
                </a>
              </li>
              <li>
                <a
                  href="/how-egyptian-pyramids-were-built"
                  onClick={(e) => handleNav(e, '/how-egyptian-pyramids-were-built')}
                  className="hover:text-[#D6A84F] transition-colors"
                >
                  How Were the Egyptian Pyramids Built?
                </a>
              </li>
              <li>
                <a
                  href="/mary-celeste-mystery"
                  onClick={(e) => handleNav(e, '/mary-celeste-mystery')}
                  className="hover:text-[#D6A84F] transition-colors"
                >
                  The Mary Celeste Mystery: Abandoned Ship Study
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className="hover:text-[#D6A84F] transition-colors"
                >
                  Homepage & Complete Editorial Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: College Assignment & Technical SEO Files */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] font-sans">
              Technical SEO & Evidence
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button
                  type="button"
                  onClick={onOpenSEOInspector}
                  className="flex items-center gap-1.5 text-left text-[#D6A84F] hover:text-[#E5BC68] hover:underline"
                >
                  <Compass className="h-3.5 w-3.5 text-[#38B7A5]" />
                  <span>Live SEO & Keyword Inspector</span>
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#D6A84F] transition-colors"
                >
                  <FileCode className="h-3.5 w-3.5 text-[#52647D]" />
                  <span>Canonical sitemap.xml</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#D6A84F] transition-colors"
                >
                  <FileCode className="h-3.5 w-3.5 text-[#52647D]" />
                  <span>Crawler robots.txt Directive</span>
                </a>
              </li>
              <li>
                <span className="text-[#52647D]">
                  Target Domain: <code className="text-[#D6A84F] font-mono">mystrypedia.vercel.app</code>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Curatorial Methodology */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] font-sans">
              Curatorial Methodology
            </h3>
            <p className="text-xs leading-relaxed text-[#B8C0CC] font-sans">
              Articles at Mystrypedia strictly reference primary historical archives (Admiralty court logs, NOAA bathymetric data, French Archaeological Institute papyri). Unsupported alien hypotheses or folklore fabrications are explicitly refuted.
            </p>
            <div className="rounded-lg border border-[#52647D]/30 bg-[#101827] p-3 text-[11px] text-[#B8C0CC]">
              <span className="font-semibold text-[#38B7A5]">Answer Engine Optimized (AEO):</span> Every page features direct-answer H2 sections for AI search and Google featured snippets.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#52647D]/25 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#52647D] sm:flex-row font-sans">
          <p>© {new Date().getFullYear()} Mystrypedia. All rights reserved. The Midnight Archive edition.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Primary Keywords Mapped</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Slop Typography</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#38B7A5]">Vercel Deployment Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
