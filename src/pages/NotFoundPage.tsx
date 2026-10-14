import { Compass, Home, ArrowRight, Search } from 'lucide-react';
import { ARTICLES } from '../data/articlesData';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export function NotFoundPage({ onNavigate, onOpenSearch }: NotFoundPageProps) {
  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-[#101827] px-4 py-20 text-[#F4EBDD]">
      <div className="max-w-xl w-full text-center space-y-7">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/30 shadow-lg">
          <Compass className="h-8 w-8 animate-pulse text-[#D6A84F]" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#D6A84F]">
            Error 404 · Uncharted Coordinates
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4EBDD] tracking-tight">
            Archival Record Not Located
          </h1>
          <p className="text-sm text-[#B8C0CC] leading-relaxed max-w-md mx-auto font-sans">
            The manuscript or document you requested could not be retrieved from the Mystrypedia index. It may have been relocated or cataloged under a revised historical citation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            className="inline-flex items-center gap-2 rounded-md bg-[#D6A84F] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#101827] hover:bg-[#E5BC68] transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </a>

          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 rounded-md border border-[#52647D]/50 bg-[#171C28] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#F4EBDD] hover:border-[#D6A84F]/50 hover:text-[#D6A84F] transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-[#38B7A5]" />
            <span>Search Active Archives</span>
          </button>
        </div>

        <div className="pt-8 border-t border-[#52647D]/25 text-left space-y-3 font-sans">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F]">
            Available Verified Case Studies:
          </div>
          <div className="space-y-2.5">
            {ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`/${article.slug}`}
                onClick={(e) => handleNav(e, `/${article.slug}`)}
                className="group flex items-center justify-between p-3.5 rounded-lg border border-[#52647D]/25 bg-[#171C28] hover:bg-[#171C28]/80 hover:border-[#D6A84F]/40 transition-colors"
              >
                <div className="text-xs">
                  <div className="font-semibold text-[#F4EBDD] group-hover:text-[#D6A84F] transition-colors">
                    {article.title}
                  </div>
                  <div className="text-[11px] text-[#52647D] mt-0.5">{article.category} · {article.readTime}</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#52647D] group-hover:text-[#D6A84F] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
