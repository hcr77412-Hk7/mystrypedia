import { useState, useEffect } from 'react';
import { Clock, Calendar, Share2, Check, ArrowRight, BookOpen, ExternalLink, ShieldCheck, FileText, Compass, AlertCircle, Quote } from 'lucide-react';
import { ArticleData, ARTICLES } from '../data/articlesData';
import { PAGES_SEO_MAP } from '../data/seoData';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TableOfContents } from '../components/TableOfContents';

interface ArticlePageProps {
  article: ArticleData;
  onNavigate: (path: string) => void;
  onOpenSEOInspector: () => void;
}

export function ArticlePage({ article, onNavigate, onOpenSEOInspector }: ArticlePageProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Map slug to SEO key
  const seoKeyMap: Record<string, string> = {
    'bermuda-triangle-mysteries': 'bermuda',
    'how-egyptian-pyramids-were-built': 'pyramids',
    'mary-celeste-mystery': 'maryCeleste'
  };

  const seoKey = seoKeyMap[article.slug] || 'home';
  const seo = PAGES_SEO_MAP[seoKey] || PAGES_SEO_MAP.home;

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.dek,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const relatedArticles = ARTICLES.filter((a) => article.relatedArticleSlugs.includes(a.slug));

  // Domain-specific dossier data
  const dossierMap: Record<string, { label: string; value: string }[]> = {
    'bermuda-triangle-mysteries': [
      { label: 'Geographic Boundaries', value: 'Miami (FL) · San Juan (PR) · Bermuda Island' },
      { label: 'Estimated Sea Area', value: 'Approx. 500,000 square miles (1.3M km²)' },
      { label: 'Maximum Bathymetry', value: 'Puerto Rico Trench (27,493 ft / 8,380 m depth)' },
      { label: 'Key Incidents Investigated', value: 'Flight 19 (1945) · USS Cyclops (1918)' },
      { label: 'Actuarial Assessment', value: "Lloyd's of London confirms standard maritime insurance risk" },
      { label: 'Primary Physical Driver', value: 'Gulf Stream currents, localized micro-squalls, rogue waves' }
    ],
    'how-egyptian-pyramids-were-built': [
      { label: 'Construction Era', value: 'Fourth Dynasty Old Kingdom (~2560 BCE, Reign of Khufu)' },
      { label: 'Monumental Mass', value: '~2.3 million megalithic blocks (avg 2.5 tons; beams up to 80 tons)' },
      { label: 'Primary Eyewitness Text', value: 'The Diary of Merer papyri (Discovered 2013 at Wadi al-Jarf)' },
      { label: 'Nile Hydraulic Logistical Net', value: 'Artificial inundation harbor basins directly below the Giza plateau' },
      { label: 'Friction Reduction Physics', value: '2% to 5% water wetting desert sand reduces sledge drag by ~50%' },
      { label: 'Workforce Archaeology', value: 'Skilled Egyptian artisans with medical care, not enslaved labor' }
    ],
    'mary-celeste-mystery': [
      { label: 'Vessel Classification', value: '282-ton merchant brigantine, built Spencer\'s Island, Nova Scotia' },
      { label: 'Derelict Recovery Date', value: 'December 4, 1872 (~400 nm east of Azores by Dei Gratia)' },
      { label: 'Cargo Manifest', value: '1,701 wooden barrels of denatured industrial alcohol (9 found empty)' },
      { label: 'Vessel Condition at Boarding', value: 'Completely seaworthy, 6 months food, 3.5 ft water in pump well' },
      { label: 'Critical Gear Missing', value: 'Sole yawl lifeboat, sextant, chronometer; sounding rod on deck' },
      { label: 'Forensic Scientific Finding', value: 'UCL (2006) cool alcohol vapor flash + false sounding well panic' }
    ]
  };

  const dossierItems = dossierMap[article.slug] || [];

  // Domain-specific pull quotes
  const pullQuoteMap: Record<string, { quote: string; source: string }> = {
    'bermuda-triangle-mysteries': {
      quote: "Official Lloyd's of London registries confirm that the proportion of vessels and aircraft reported lost in the triangular zone is no greater than in any other heavily trafficked maritime thoroughfare in the world.",
      source: "Actuarial Cross-Examination of Atlantic Maritime Loss Registries"
    },
    'how-egyptian-pyramids-were-built': {
      quote: "Inspector Merer's 4th-Dynasty logbook provides the missing administrative link, proving that casing stone deliveries were managed by a literate civil bureaucracy coordinating seasonal Nile transport.",
      source: "Pierre Tallet, Institut Français d'Archéologie Orientale (Wadi al-Jarf Papyri)"
    },
    'mary-celeste-mystery': {
      quote: "A mixture of denatured ethanol vapor and air creates a concussive cool flash—a terrifying pressure wave without generating sustained heat to scorch timber. To Captain Briggs, it was the prelude to an unavoidable explosion.",
      source: "Dr. Andrea Sella, Inorganic Chemistry Laboratory, University College London"
    }
  };

  const pullQuote = pullQuoteMap[article.slug];

  return (
    <>
      <SEOHead seo={seo} article={article} />

      {/* Reading Progress Bar (Antique Gold gradient) */}
      <div
        className="fixed top-20 left-0 z-30 h-1 bg-gradient-to-r from-[#D6A84F] via-[#E5BC68] to-[#38B7A5] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <article className="min-h-screen bg-[#101827] text-[#F4EBDD] pb-24">
        {/* Article Header & Dek */}
        <header className="border-b border-[#52647D]/20 bg-[#171C28] pt-10 pb-14 lg:pt-14 lg:pb-18">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumbs */}
            <Breadcrumbs
              category={article.category}
              articleTitle={article.title}
              onNavigate={onNavigate}
            />

            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#52647D] pt-2">
              <span className="text-[#38B7A5] font-semibold tracking-wider uppercase">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#B8C0CC]">
                <Calendar className="h-3.5 w-3.5 text-[#52647D]" />
                Published {article.publishedDate}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#B8C0CC]">
                <Clock className="h-3.5 w-3.5 text-[#38B7A5]" />
                {article.readTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#52647D]">{article.wordCount} words</span>
            </div>

            {/* Exactly One Clear H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F4EBDD] tracking-tight leading-[1.14] text-balance">
              {article.title}
            </h1>

            {/* Subtitle / Dek */}
            <p className="text-lg sm:text-xl text-[#D6A84F]/95 font-serif italic leading-relaxed text-balance">
              {article.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#B8C0CC] leading-relaxed max-w-3xl font-sans">
              {article.dek}
            </p>

            {/* Author Byline & Action Cluster */}
            <div className="pt-6 border-t border-[#52647D]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#101827] text-[#D6A84F] font-serif font-bold text-sm border border-[#D6A84F]/40 shadow-inner">
                  {article.author.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F4EBDD]">{article.author.name}</div>
                  <div className="text-xs text-[#B8C0CC]">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-md border border-[#52647D]/40 bg-[#101827] px-3.5 py-1.5 text-xs font-medium text-[#F4EBDD] hover:border-[#D6A84F]/50 hover:text-[#D6A84F] transition-colors"
                  title="Share this study"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-[#38B7A5]" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSEOInspector}
                  className="flex items-center gap-1.5 rounded-md border border-[#D6A84F]/40 bg-[#D6A84F]/10 px-3.5 py-1.5 text-xs font-medium text-[#D6A84F] hover:bg-[#D6A84F]/20 transition-colors"
                  title="Audit this page's SEO score"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D6A84F]" />
                  <span>SEO Audit</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image with Editorial Frame & Caption */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 my-10">
          <figure className="overflow-hidden rounded-xl border border-[#52647D]/30 bg-[#171C28] p-2 shadow-2xl">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[#101827]">
              <img
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                width={article.featuredImage.width}
                height={article.featuredImage.height}
                loading="eager"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="p-3.5 text-xs text-[#B8C0CC] italic text-center font-serif leading-relaxed">
              {article.featuredImage.caption}
            </figcaption>
          </figure>
        </section>

        {/* Highlighted Key Facts Dossier Box */}
        {dossierItems.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-12">
            <div className="rounded-xl border border-[#D6A84F]/35 bg-[#171C28] p-6 shadow-xl">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#52647D]/25">
                <FileText className="h-4 w-4 text-[#D6A84F]" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A84F] font-sans">
                  Archival Investigation Dossier · Verified Case Facts
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {dossierItems.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-[#52647D]/20 bg-[#101827]/70 p-3.5 space-y-1">
                    <div className="text-[11px] font-semibold text-[#38B7A5] uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm font-medium text-[#F4EBDD] font-sans">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content Layout (Asymmetric: Table of Contents & Reading Prose) */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sidebar with Table of Contents (Sticky on Desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
              <TableOfContents items={article.tableOfContents} />

              {/* Research Methodology Card */}
              <div className="rounded-xl border border-[#52647D]/30 bg-[#171C28] p-5 space-y-3 text-xs text-[#B8C0CC]">
                <div className="font-semibold text-[#F4EBDD] uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="h-4 w-4 text-[#D6A84F]" />
                  <span>Curatorial Standards</span>
                </div>
                <p className="leading-relaxed">
                  This monograph conforms to peer-reviewed historiographical standards. All maritime depositions, archaeological papyri, and meteorological claims are referenced from primary institutional archives.
                </p>
                <div className="pt-2 border-t border-[#52647D]/20 text-[11px] text-[#52647D]">
                  Target Keyword: <span className="text-[#D6A84F]">"{article.primaryKeyword}"</span>
                </div>
              </div>
            </aside>

            {/* Reading Column: Long-form Prose */}
            <main className="lg:col-span-8 space-y-14 order-1 lg:order-2">
              {article.sections.map((section, sIdx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="space-y-5 scroll-mt-28"
                >
                  {/* H2 Heading (Question or Descriptive) */}
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EBDD] tracking-tight leading-snug">
                    {section.heading}
                  </h2>

                  {/* Direct Answer Paragraph if Question Heading (AEO requirement) */}
                  {section.isQuestion && section.directAnswer && (
                    <div className="rounded-xl border border-[#38B7A5]/35 bg-[#171C28] p-6 text-sm sm:text-base leading-relaxed text-[#F4EBDD] shadow-lg space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#38B7A5] font-semibold flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-[#38B7A5]" />
                        <span>Direct Answer (Answer Engine Optimization Summary)</span>
                      </div>
                      <p className="font-medium leading-relaxed text-[#F4EBDD] text-base font-sans">
                        {section.directAnswer}
                      </p>
                    </div>
                  )}

                  {/* Body Paragraphs with Drop Cap for the very first section */}
                  <div className="space-y-5 text-base sm:text-lg text-[#F4EBDD]/90 leading-relaxed font-sans">
                    {section.content.map((paragraph, pIdx) => {
                      const isFirstPara = sIdx === 0 && pIdx === 0 && !section.directAnswer;
                      return (
                        <p
                          key={pIdx}
                          className={isFirstPara ? 'first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:text-[#D6A84F] first-letter:leading-none' : ''}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Pull quote after second section */}
                  {sIdx === 1 && pullQuote && (
                    <div className="my-8 py-6 border-y border-[#D6A84F]/30 bg-[#171C28]/60 px-6 rounded-lg space-y-2">
                      <div className="text-lg sm:text-xl font-serif italic text-[#D6A84F] leading-relaxed">
                        "{pullQuote.quote}"
                      </div>
                      <div className="text-xs text-[#B8C0CC] uppercase tracking-wider font-sans font-medium">
                        — {pullQuote.source}
                      </div>
                    </div>
                  )}

                  {/* Subsections if present */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-8 space-y-6 pl-5 border-l border-[#52647D]/30">
                      {section.subsections.map((sub) => (
                        <div key={sub.id} id={sub.id} className="space-y-3 scroll-mt-28">
                          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#F4EBDD]">
                            {sub.heading}
                          </h3>
                          {sub.content.map((subPara, spIdx) => (
                            <p key={spIdx} className="text-sm sm:text-base text-[#B8C0CC] leading-relaxed font-sans">
                              {subPara}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Curatorial Conclusion */}
              <section id="curatorial-verdict" className="space-y-4 rounded-xl border border-[#D6A84F]/30 bg-[#171C28] p-7 sm:p-8 shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EBDD]">
                  {article.conclusion.heading}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#B8C0CC] leading-relaxed font-sans">
                  {article.conclusion.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>

              {/* Credible References & Sources */}
              <section id="scholarly-references" className="space-y-5 pt-8 border-t border-[#52647D]/25">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84F]">
                  <BookOpen className="h-4 w-4" />
                  <span>Archival & Bibliographical References</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F4EBDD]">
                  Primary Sources and Cited Literature
                </h3>
                <div className="space-y-3">
                  {article.references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#52647D]/30 bg-[#171C28] p-4 text-xs space-y-1.5 transition-colors hover:border-[#D6A84F]/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-[#F4EBDD] text-sm font-sans">{ref.title}</span>
                        <span className="font-mono text-[#D6A84F]">{ref.year}</span>
                      </div>
                      <div className="text-[#38B7A5] font-medium">{ref.authorOrOrg}</div>
                      <div className="text-[11px] text-[#B8C0CC] italic">{ref.note}</div>
                      {ref.url && (
                        <div className="pt-1.5">
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#D6A84F] hover:text-[#E5BC68] hover:underline"
                          >
                            <span>Access Institutional Archive</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Investigations with Descriptive Anchor Texts */}
              <section className="space-y-5 pt-8 border-t border-[#52647D]/25">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#52647D]">
                  Continue Exploring
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EBDD]">
                  Related Historical Investigations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {relatedArticles.map((rel) => (
                    <a
                      key={rel.slug}
                      href={`/${rel.slug}`}
                      onClick={(e) => handleNav(e, `/${rel.slug}`)}
                      className="group flex flex-col justify-between rounded-xl border border-[#52647D]/25 bg-[#171C28] p-5 hover:border-[#D6A84F]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D6A84F]/5"
                    >
                      <div className="space-y-2.5">
                        <div className="text-[11px] text-[#38B7A5] font-semibold uppercase tracking-wider">{rel.category}</div>
                        <h4 className="text-base font-serif font-bold text-[#F4EBDD] group-hover:text-[#D6A84F] transition-colors leading-snug">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[#B8C0CC] line-clamp-2 leading-relaxed">
                          {rel.dek}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#52647D]/20 flex items-center justify-between text-xs font-semibold text-[#D6A84F]">
                        <span>Examine Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </article>
    </>
  );
}
