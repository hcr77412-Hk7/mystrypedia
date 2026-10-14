import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock, FileText, Sparkles } from 'lucide-react';
import { ARTICLES, ArticleData } from '../data/articlesData';

interface SearchResult {
  article: ArticleData;
  matchedField: 'title' | 'keyword' | 'section' | 'dek';
  snippet: string;
  sectionId?: string;
  sectionHeading?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const matches: SearchResult[] = [];

    ARTICLES.forEach((article) => {
      // 1. Check title
      if (article.title.toLowerCase().includes(trimmed)) {
        matches.push({
          article,
          matchedField: 'title',
          snippet: article.title
        });
        return;
      }

      // 2. Check keywords
      if (
        article.primaryKeyword.toLowerCase().includes(trimmed) ||
        article.relatedKeywords.some((k) => k.toLowerCase().includes(trimmed))
      ) {
        matches.push({
          article,
          matchedField: 'keyword',
          snippet: `Keyword match: ${article.primaryKeyword}`
        });
        return;
      }

      // 3. Check dek / subtitle
      if (article.dek.toLowerCase().includes(trimmed) || article.subtitle.toLowerCase().includes(trimmed)) {
        matches.push({
          article,
          matchedField: 'dek',
          snippet: article.dek
        });
        return;
      }

      // 4. Check sections
      for (const sec of article.sections) {
        if (sec.heading.toLowerCase().includes(trimmed)) {
          matches.push({
            article,
            matchedField: 'section',
            snippet: sec.directAnswer || sec.heading,
            sectionId: sec.id,
            sectionHeading: sec.heading
          });
          return;
        }

        const foundPara = sec.content.find((p) => p.toLowerCase().includes(trimmed));
        if (foundPara) {
          const startIdx = Math.max(0, foundPara.toLowerCase().indexOf(trimmed) - 40);
          const excerpt = (startIdx > 0 ? '...' : '') + foundPara.slice(startIdx, startIdx + 140) + '...';
          matches.push({
            article,
            matchedField: 'section',
            snippet: excerpt,
            sectionId: sec.id,
            sectionHeading: sec.heading
          });
          return;
        }
      }
    });

    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (result: SearchResult) => {
    const targetUrl = result.sectionId
      ? `/${result.article.slug}#${result.sectionId}`
      : `/${result.article.slug}`;
    onNavigate(targetUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-[#101827]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl flex flex-col rounded-xl border border-[#52647D]/35 bg-[#171C28] shadow-2xl overflow-hidden text-[#F4EBDD]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#52647D]/25 px-5 py-4 bg-[#101827]">
          <Search className="h-5 w-5 text-[#38B7A5] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival monographs, keywords, or topics..."
            className="w-full bg-transparent text-sm text-[#F4EBDD] placeholder-[#52647D] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#B8C0CC] hover:text-[#F4EBDD] p-1 rounded"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs text-[#52647D] hover:text-[#F4EBDD] hover:bg-[#171C28]"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-2.5">
          {!query.trim() && (
            <div className="py-10 text-center space-y-3 text-[#B8C0CC]">
              <BookOpen className="h-9 w-9 mx-auto text-[#52647D]" />
              <p className="text-xs">Type a keyword or historical topic (e.g., "pyramid", "flight 19", "alcohol", "rogue waves")</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
                {['Bermuda Triangle mysteries', 'how Egyptian pyramids were built', 'Mary Celeste mystery', 'Diary of Merer'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-[#52647D]/30 bg-[#101827] px-3.5 py-1 text-[#B8C0CC] hover:text-[#D6A84F] hover:border-[#D6A84F]/50 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="py-10 text-center text-[#B8C0CC] space-y-1">
              <p className="text-sm font-medium text-[#F4EBDD]">No matching archival records located</p>
              <p className="text-xs text-[#52647D]">Try searching for broader keywords like "disappearances", "limestone", or "cargo".</p>
            </div>
          )}

          {results.map((res, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(res)}
              className="w-full text-left rounded-lg border border-[#52647D]/20 bg-[#101827]/70 hover:bg-[#101827] hover:border-[#D6A84F]/40 p-4 transition-all duration-200 group flex items-start justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-[#52647D]">
                  <span className="text-[#38B7A5] font-semibold uppercase tracking-wider">{res.article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-[#B8C0CC]">
                    <Clock className="h-3 w-3 text-[#38B7A5]" />
                    {res.article.readTime}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[#F4EBDD] group-hover:text-[#D6A84F] transition-colors truncate">
                  {res.article.title}
                </h4>
                {res.sectionHeading && (
                  <div className="text-xs text-[#D6A84F] font-medium flex items-center gap-1 font-sans">
                    <FileText className="h-3 w-3 shrink-0" />
                    <span>Section: {res.sectionHeading}</span>
                  </div>
                )}
                <p className="text-xs text-[#B8C0CC] line-clamp-2 leading-relaxed font-sans">
                  {res.snippet}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#52647D] group-hover:text-[#D6A84F] shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#52647D]/20 px-5 py-3 bg-[#101827] flex items-center justify-between text-[11px] text-[#52647D] font-sans">
          <span>{results.length} active matching records</span>
          <span>Click any record to inspect dossier</span>
        </div>
      </div>
    </div>
  );
}
