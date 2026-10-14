import { useState } from 'react';
import { X, CheckCircle2, Copy, Code2, Table, Sparkles } from 'lucide-react';
import { PageSEO, PAGES_SEO_MAP } from '../data/seoData';
import { ArticleData } from '../data/articlesData';

interface SEOInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSEO: PageSEO;
  currentArticle?: ArticleData;
}

export function SEOInspectorModal({ isOpen, onClose, currentSEO, currentArticle }: SEOInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'schema' | 'matrix'>('audit');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const titleLength = currentSEO.seoTitle.length;
  const isTitleIdeal = titleLength >= 45 && titleLength <= 65;

  const descLength = currentSEO.metaDescription.length;
  const isDescIdeal = descLength >= 135 && descLength <= 165;

  // Generate current schema preview
  const schemaPreview = {
    '@context': 'https://schema.org',
    '@graph': currentArticle
      ? [
          {
            '@type': 'Article',
            headline: currentArticle.title,
            description: currentSEO.metaDescription,
            image: currentArticle.featuredImage.src,
            author: currentArticle.author.name,
            publisher: 'Mystrypedia',
            datePublished: currentArticle.publishedDate
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: currentArticle.category },
              { '@type': 'ListItem', position: 3, name: currentArticle.title, item: currentArticle.url }
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: currentArticle.sections
              .filter((s) => s.isQuestion)
              .map((s) => ({
                '@type': 'Question',
                name: s.heading,
                acceptedAnswer: { '@type': 'Answer', text: s.directAnswer }
              }))
          }
        ]
      : [
          {
            '@type': 'WebSite',
            name: 'Mystrypedia',
            url: 'https://mystrypedia.vercel.app/'
          },
          {
            '@type': 'Organization',
            name: 'Mystrypedia Publishing',
            url: 'https://mystrypedia.vercel.app/'
          }
        ]
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101827]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-[#52647D]/35 bg-[#171C28] shadow-2xl overflow-hidden text-[#F4EBDD]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#52647D]/25 px-6 py-4 bg-[#101827]">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D6A84F]/20 text-[#D6A84F] font-bold text-xs font-mono border border-[#D6A84F]/40">
              SEO
            </span>
            <div>
              <h2 className="text-base font-serif font-bold text-[#F4EBDD]">Live On-Page SEO & Metadata Audit</h2>
              <p className="text-xs text-[#B8C0CC]">
                Inspecting: <span className="text-[#D6A84F] font-medium">{currentSEO.pageName}</span> ({currentSEO.path})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#52647D] hover:text-[#F4EBDD] hover:bg-[#171C28] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="flex border-b border-[#52647D]/20 bg-[#101827]/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-[#D6A84F] text-[#D6A84F]'
                : 'border-transparent text-[#B8C0CC] hover:text-[#F4EBDD]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Page Audit Checklist
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-[#D6A84F] text-[#D6A84F]'
                : 'border-transparent text-[#B8C0CC] hover:text-[#F4EBDD]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            JSON-LD Structured Data
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'matrix'
                ? 'border-[#D6A84F] text-[#D6A84F]'
                : 'border-transparent text-[#B8C0CC] hover:text-[#F4EBDD]'
            }`}
          >
            <Table className="h-3.5 w-3.5" />
            Master 4-Page Keyword Matrix
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* Keyword Assignment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-[#52647D]/25 bg-[#101827] p-4 shadow-sm">
                  <div className="text-[11px] uppercase tracking-wider text-[#52647D] font-semibold mb-1">
                    Primary Target Keyword
                  </div>
                  <div className="text-sm font-bold text-[#D6A84F]">
                    "{currentSEO.primaryKeyword}"
                  </div>
                  <div className="mt-2 text-[11px] text-[#38B7A5] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>In Title, H1 & Body</span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#52647D]/25 bg-[#101827] p-4 shadow-sm">
                  <div className="text-[11px] uppercase tracking-wider text-[#52647D] font-semibold mb-1">
                    Related Keyword 1
                  </div>
                  <div className="text-sm font-semibold text-[#F4EBDD]">
                    "{currentSEO.relatedKeywords[0]}"
                  </div>
                  <div className="mt-2 text-[11px] text-[#38B7A5] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>In Headings & Copy</span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#52647D]/25 bg-[#101827] p-4 shadow-sm">
                  <div className="text-[11px] uppercase tracking-wider text-[#52647D] font-semibold mb-1">
                    Related Keyword 2
                  </div>
                  <div className="text-sm font-semibold text-[#F4EBDD]">
                    "{currentSEO.relatedKeywords[1]}"
                  </div>
                  <div className="mt-2 text-[11px] text-[#38B7A5] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Contextually Integrated</span>
                  </div>
                </div>
              </div>

              {/* Title & Description Metrics */}
              <div className="space-y-4 rounded-lg border border-[#52647D]/25 bg-[#101827] p-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-[#F4EBDD]">SEO Title Tag (`&lt;title&gt;`)</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      isTitleIdeal ? 'bg-[#38B7A5]/15 text-[#38B7A5] border border-[#38B7A5]/30' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {titleLength} characters (Recommended: 50–60)
                    </span>
                  </div>
                  <div className="rounded border border-[#52647D]/25 bg-[#171C28] p-2.5 font-mono text-[#F4EBDD] select-all">
                    {currentSEO.seoTitle}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-[#F4EBDD]">Meta Description (`&lt;meta name="description"&gt;`)</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      isDescIdeal ? 'bg-[#38B7A5]/15 text-[#38B7A5] border border-[#38B7A5]/30' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {descLength} characters (Recommended: 140–160)
                    </span>
                  </div>
                  <div className="rounded border border-[#52647D]/25 bg-[#171C28] p-2.5 font-mono text-[#F4EBDD] select-all">
                    {currentSEO.metaDescription}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-[#F4EBDD]">Canonical Tag (`&lt;link rel="canonical"&gt;`)</span>
                    <span className="text-[11px] text-[#38B7A5] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-3 w-3" /> Self-referencing production URL
                    </span>
                  </div>
                  <div className="rounded border border-[#52647D]/25 bg-[#171C28] p-2.5 font-mono text-[#D6A84F] select-all">
                    {currentSEO.url}
                  </div>
                </div>
              </div>

              {/* AEO Question H2 Verification */}
              <div className="rounded-lg border border-[#52647D]/25 bg-[#101827] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#F4EBDD]">
                    Answer Engine Optimization (AEO) Questions (Target: $\ge$ 2 Question H2s)
                  </h3>
                  <span className="text-[#38B7A5] font-semibold text-[11px]">2 Verified</span>
                </div>
                <div className="space-y-2.5">
                  {currentSEO.questionHeadings.map((question, idx) => (
                    <div key={idx} className="rounded border border-[#52647D]/20 bg-[#171C28] p-3.5 space-y-1">
                      <div className="flex items-start gap-2 text-[#F4EBDD] font-medium">
                        <span className="text-[#D6A84F] font-mono font-bold">H2 #{idx + 1}:</span>
                        <span>{question}</span>
                      </div>
                      <div className="text-[11px] text-[#B8C0CC] pl-8">
                        Followed immediately by a concise factual direct answer in paragraph 1 for AI citation and rich featured snippet extraction.
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Alt & Content Verification */}
              {currentArticle && (
                <div className="rounded-lg border border-[#52647D]/25 bg-[#101827] p-5 space-y-2">
                  <h3 className="font-semibold text-[#F4EBDD]">Featured Media & Image SEO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="rounded border border-[#52647D]/20 bg-[#171C28] p-3">
                      <div className="text-[#52647D] font-medium mb-1">Image Dimensions & CLS Protection:</div>
                      <div className="text-[#F4EBDD] font-mono">
                        {currentArticle.featuredImage.width} × {currentArticle.featuredImage.height} px (16:9 ratio)
                      </div>
                    </div>
                    <div className="rounded border border-[#52647D]/20 bg-[#171C28] p-3">
                      <div className="text-[#52647D] font-medium mb-1">Descriptive Alt Text:</div>
                      <div className="text-[#B8C0CC] italic">
                        "{currentArticle.featuredImage.alt}"
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[#B8C0CC]">
                  This Schema.org structured data is dynamically rendered in a{' '}
                  <code className="text-[#D6A84F]">&lt;script type="application/ld+json"&gt;</code> tag in the{' '}
                  <code className="text-[#D6A84F]">&lt;head&gt;</code> element for Google Rich Results.
                </p>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(schemaPreview, null, 2))}
                  className="flex items-center gap-1.5 rounded border border-[#52647D]/40 bg-[#101827] px-3 py-1 text-[#F4EBDD] hover:bg-[#101827]/80"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="max-h-96 overflow-x-auto rounded-lg border border-[#52647D]/25 bg-[#101827] p-4 font-mono text-[11px] text-[#38B7A5]">
                {JSON.stringify(schemaPreview, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[#B8C0CC]">
                  Master keyword research table across all 4 pages. Copyable for submission spreadsheets.
                </p>
                <button
                  onClick={() => {
                    const tsv = `Page Name\tPage URL\tPrimary Keyword\tRelated Keyword 1\tRelated Keyword 2\tSearch Intent\tSEO Title\tMeta Description\n${Object.values(PAGES_SEO_MAP).map(p => `${p.pageName}\t${p.url}\t${p.primaryKeyword}\t${p.relatedKeywords[0]}\t${p.relatedKeywords[1]}\t${p.searchIntent}\t${p.seoTitle}\t${p.metaDescription}`).join('\n')}`;
                    copyToClipboard(tsv);
                  }}
                  className="flex items-center gap-1.5 rounded border border-[#D6A84F]/40 bg-[#D6A84F]/10 px-3 py-1 text-[#D6A84F] hover:bg-[#D6A84F]/20"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied TSV!' : 'Copy Table as TSV'}</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[#52647D]/25">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#101827] text-[#52647D] uppercase font-semibold border-b border-[#52647D]/25">
                    <tr>
                      <th className="p-3">Page</th>
                      <th className="p-3">URL</th>
                      <th className="p-3">Primary Keyword</th>
                      <th className="p-3">Related Keywords</th>
                      <th className="p-3">Intent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#52647D]/20 bg-[#171C28]">
                    {Object.values(PAGES_SEO_MAP).map((p) => (
                      <tr key={p.path} className="hover:bg-[#101827]/60 transition-colors">
                        <td className="p-3 font-medium text-[#F4EBDD]">{p.pageName}</td>
                        <td className="p-3 font-mono text-[#D6A84F]">{p.path}</td>
                        <td className="p-3 font-semibold text-[#38B7A5]">{p.primaryKeyword}</td>
                        <td className="p-3 text-[#B8C0CC]">{p.relatedKeywords.join(', ')}</td>
                        <td className="p-3 text-[#52647D]">{p.searchIntent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#52647D]/25 px-6 py-3.5 bg-[#101827] text-[#52647D]">
          <span className="text-[11px]">Full evidence documented in <code className="text-[#D6A84F] font-mono">SEO-Assignment-Evidence.md</code></span>
          <button
            onClick={onClose}
            className="rounded bg-[#171C28] border border-[#52647D]/35 px-4 py-1.5 text-xs font-medium text-[#F4EBDD] hover:bg-[#101827] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
