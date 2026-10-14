import { useState } from 'react';
import { Compass, BookOpen, ArrowRight, ShieldCheck, Clock, CheckCircle2, Search, Sliders, ExternalLink, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/articlesData';
import { PAGES_SEO_MAP } from '../data/seoData';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenSEOInspector: () => void;
}

export function HomePage({ onNavigate, onOpenSearch, onOpenSEOInspector }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const seo = PAGES_SEO_MAP.home;

  const categories = ['All', 'Maritime Enigmas', 'Ancient Civilizations', 'Scientific Curiosities'];

  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((art) => art.category === selectedCategory);

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <SEOHead seo={seo} />

      <main className="min-h-screen bg-[#101827] text-[#F4EBDD]">
        {/* 1. Cinematic Full-Width Hero */}
        <section className="relative w-full border-b border-[#52647D]/20 overflow-hidden min-h-[85vh] flex items-center">
          {/* Background Image with Dark Scrim Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/mystrypedia_hero_investigation_1791993836906.jpg"
              alt="Archival investigator study at twilight with celestial star charts, navigational instruments, and research journals."
              className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.08]"
              width={1280}
              height={720}
              loading="eager"
            />
            {/* Multi-layered dark navy gradient overlay for readability & atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/80 to-[#101827]/60" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#101827]/50 to-[#101827]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Subtle Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6A84F]/30 bg-[#171C28]/80 backdrop-blur-sm text-xs text-[#D6A84F] tracking-[0.2em] uppercase font-sans font-medium">
              <Sparkles className="h-3 w-3 text-[#D6A84F]" />
              <span>The Midnight Archive · Peer-Reviewed Inquiry</span>
            </div>

            {/* Main Editorial H1 (Contains primary keyword naturally) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F4EBDD] tracking-tight leading-[1.12] text-balance">
              Investigating <span className="text-[#D6A84F] italic">Fascinating Mysteries</span> Through Rigorous Historical Evidence
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-serif italic text-[#D6A84F]/90 text-balance font-light">
              Explore the Unknown. Discover the Unexplained.
            </p>

            {/* Introduction prose */}
            <p className="text-base sm:text-lg text-[#B8C0CC] leading-relaxed max-w-3xl mx-auto font-sans font-normal">
              Mystrypedia is an independent digital journal committed to demystifying the world’s most famous historical mysteries and unexplained mysteries. By cross-referencing primary naval court depositions, satellite bathymetry, ancient papyri, and forensic material chemistry, we separate tangible scientific realities from twentieth-century pulp sensationalism.
            </p>

            {/* Call to action cluster */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#featured-investigations"
                className="inline-flex items-center gap-2.5 rounded-md bg-[#D6A84F] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#101827] hover:bg-[#E5BC68] hover:shadow-lg hover:shadow-[#D6A84F]/20 transition-all duration-200"
              >
                <span>Explore Curated Archives</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 rounded-md border border-[#52647D]/50 bg-[#171C28]/90 backdrop-blur-sm px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F4EBDD] hover:border-[#D6A84F]/50 hover:text-[#D6A84F] transition-all duration-200"
              >
                <Search className="h-3.5 w-3.5 text-[#38B7A5]" />
                <span>Search Dossiers</span>
              </button>
            </div>

            {/* Proof strip */}
            <div className="pt-10 max-w-2xl mx-auto border-t border-[#52647D]/25 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-mono font-bold text-lg text-[#F4EBDD]">100%</div>
                <div className="text-[11px] text-[#B8C0CC] uppercase tracking-wider mt-0.5">Primary Archives</div>
              </div>
              <div className="border-x border-[#52647D]/20">
                <div className="font-mono font-bold text-lg text-[#D6A84F]">Zero</div>
                <div className="text-[11px] text-[#B8C0CC] uppercase tracking-wider mt-0.5">Sensationalism</div>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-[#38B7A5]">AEO Verified</div>
                <div className="text-[11px] text-[#B8C0CC] uppercase tracking-wider mt-0.5">Direct Answers</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured Investigations Section (Deep Charcoal Background) */}
        <section id="featured-investigations" className="py-20 lg:py-28 bg-[#171C28] border-b border-[#52647D]/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header with Category Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.25em] text-[#D6A84F] font-medium font-sans">
                  The Curatorial Collection
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4EBDD] tracking-tight">
                  In-Depth Evidentiary Investigations
                </h2>
                <p className="text-sm text-[#B8C0CC] max-w-xl leading-relaxed">
                  Explore full-length monographs on maritime enigmas and ancient architectural construction, complete with primary source documentation.
                </p>
              </div>

              {/* Segmented Category Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#101827] border border-[#52647D]/30 rounded-lg overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#D6A84F] text-[#101827] font-semibold shadow-sm'
                        : 'text-[#B8C0CC] hover:text-[#F4EBDD]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Redesigned Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group flex flex-col rounded-xl border border-[#52647D]/25 bg-[#101827] overflow-hidden hover:border-[#D6A84F]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D6A84F]/5"
                >
                  {/* Card Cover Image with Subtle Zoom */}
                  <a
                    href={`/${article.slug}`}
                    onClick={(e) => handleNav(e, `/${article.slug}`)}
                    className="relative aspect-video overflow-hidden bg-[#101827] block"
                  >
                    <img
                      src={article.featuredImage.src}
                      alt={article.featuredImage.alt}
                      width={article.featuredImage.width}
                      height={article.featuredImage.height}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-transparent opacity-75" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#101827]/85 backdrop-blur-sm border border-[#52647D]/30 text-[10px] uppercase tracking-wider font-semibold text-[#38B7A5]">
                        {article.category}
                      </span>
                    </div>
                  </a>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-6 space-y-3.5">
                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex items-center gap-2 text-xs text-[#52647D]">
                      <span className="flex items-center gap-1 text-[#B8C0CC]">
                        <Clock className="h-3 w-3 text-[#38B7A5]" />
                        {article.readTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#52647D]">{article.wordCount} words</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#52647D]">{article.publishedDate}</span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-xl font-serif font-bold text-[#F4EBDD] group-hover:text-[#D6A84F] transition-colors leading-snug">
                      <a
                        href={`/${article.slug}`}
                        onClick={(e) => handleNav(e, `/${article.slug}`)}
                        className="hover:underline"
                      >
                        {article.title}
                      </a>
                    </h3>

                    {/* Article Excerpt */}
                    <p className="text-xs text-[#B8C0CC] leading-relaxed line-clamp-3 flex-1 font-sans">
                      {article.dek}
                    </p>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-[#52647D]/20 flex items-center justify-between text-xs">
                      <span className="text-[#52647D] text-[11px]">
                        Target: <span className="text-[#B8C0CC]">"{article.primaryKeyword}"</span>
                      </span>
                      <a
                        href={`/${article.slug}`}
                        onClick={(e) => handleNav(e, `/${article.slug}`)}
                        className="inline-flex items-center gap-1 font-semibold text-[#D6A84F] hover:text-[#E5BC68] transition-colors"
                      >
                        <span>Examine Dossier</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. AEO QUESTION 1 SECTION (Midnight Navy Background) */}
        <section className="py-20 lg:py-24 border-b border-[#52647D]/20 bg-[#101827]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#38B7A5] font-semibold">
              <Compass className="h-4 w-4" />
              <span>Answer Engine Optimization (AEO) · Direct Answer Hub</span>
            </div>

            {/* Question H2 #1 */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F4EBDD] leading-snug">
              What constitutes a genuine historical mystery versus popular mythology?
            </h2>

            {/* Direct Answer in 1st Paragraph */}
            <div className="rounded-xl border border-[#D6A84F]/30 bg-[#171C28] p-6 text-sm leading-relaxed text-[#F4EBDD] space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84F]">
                <CheckCircle2 className="h-4 w-4 text-[#38B7A5]" />
                <span>Verified Direct Factual Answer</span>
              </div>
              <p className="font-medium text-[#F4EBDD] leading-relaxed text-base">
                A genuine historical mystery is defined by verified empirical anomalies—such as an abandoned vessel recovered in fully seaworthy condition or megalithic structures erected without surviving engineering blueprints—where authentic physical evidence exists, but causal historical documentation remains incomplete. In contrast, popular mythology relies on unverified folklore, post-hoc fabrications, and sensationalized media embellishments that contradict established archival and scientific records.
              </p>
              <div className="pt-2 text-xs text-[#B8C0CC] border-t border-[#52647D]/20">
                Curatorial criteria: Primary archival verification, physical artifact continuity, and falsifiability.
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="space-y-4 text-sm text-[#B8C0CC] leading-relaxed font-sans">
              <p>
                In our investigation of maritime anomalies like the <a href="/mary-celeste-mystery" onClick={(e) => handleNav(e, '/mary-celeste-mystery')} className="text-[#D6A84F] underline hover:text-[#E5BC68]">Mary Celeste mystery</a>, the core empirical anomaly is uncontested: on December 4, 1872, British sailors boarded an undamaged merchant brigantine with ten missing passengers and six months of unconsumed rations. The historical puzzle is focused entirely on identifying the physiological or psychological catalyst that prompted an experienced master mariner to evacuate an intact vessel.
              </p>
              <p>
                Conversely, many aspects of <a href="/bermuda-triangle-mysteries" onClick={(e) => handleNav(e, '/bermuda-triangle-mysteries')} className="text-[#D6A84F] underline hover:text-[#E5BC68]">Bermuda Triangle mysteries</a> represent manufactured mythology. As demonstrated by archival cross-examinations of Lloyd's of London registries, twentieth-century pulp authors frequently claimed ships disappeared on "calm, glassy seas" when contemporaneous meteorological barometers recorded hurricane-force gales, or failed to retract stories when "vanished" vessels safely arrived in alternate ports.
              </p>
            </div>
          </div>
        </section>

        {/* 4. AEO QUESTION 2 SECTION (Deep Charcoal Background) */}
        <section className="py-20 lg:py-24 border-b border-[#52647D]/20 bg-[#171C28]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#38B7A5] font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Scientific Demystification · AEO Direct Answer</span>
            </div>

            {/* Question H2 #2 */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F4EBDD] leading-snug">
              How does modern forensic science resolve long-standing unexplained phenomena?
            </h2>

            {/* Direct Answer in 1st Paragraph */}
            <div className="rounded-xl border border-[#38B7A5]/30 bg-[#101827] p-6 text-sm leading-relaxed text-[#F4EBDD] space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38B7A5]">
                <CheckCircle2 className="h-4 w-4 text-[#38B7A5]" />
                <span>Forensic Methodology Direct Summary</span>
              </div>
              <p className="font-medium text-[#F4EBDD] leading-relaxed text-base">
                Modern forensic science resolves historical enigmas by applying interdisciplinary empirical disciplines: non-linear fluid dynamics and satellite radar to analyze oceanic rogue waves, muon radiography and hydrological core drilling to reconstruct ancient megalithic logistics, and gas chromatography combined with archival paleography to decode centuries-old chemical reactions and ship manifests.
              </p>
              <div className="pt-2 text-xs text-[#B8C0CC] border-t border-[#52647D]/20">
                Methodology: Replaces speculative supernatural conjecture with verifiable physical laws and archaeological proof.
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="space-y-4 text-sm text-[#B8C0CC] leading-relaxed font-sans">
              <p>
                A preeminent illustration of forensic resolution is the rediscovery of <a href="/how-egyptian-pyramids-were-built" onClick={(e) => handleNav(e, '/how-egyptian-pyramids-were-built')} className="text-[#D6A84F] underline hover:text-[#E5BC68]">how Egyptian pyramids were built</a>. For centuries, writers indulged in speculative hypotheses invoking lost advanced technologies or extraterrestrial intervention. However, the 2013 excavation of the Diary of Merer papyri at Wadi al-Jarf, paired with sediment analyses of extinct Nile canal branches, proved that Fourth Dynasty Egyptian engineers utilized an advanced hydraulic network of harbor basins to deliver limestone blocks directly to the Giza construction base.
              </p>
              <p>
                Similarly, laboratory combustion simulations conducted at University College London in 2006 demonstrated that leaking denatured alcohol vapors in a ship’s hold can trigger a sudden concussive pressure-wave flash without scorch marks—providing a rational, chemical answer to why the crew of the Mary Celeste precipitously abandoned ship.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Editorial Standards & Methodology Banner (Midnight Navy Background) */}
        <section className="py-20 bg-[#101827]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#52647D]/30 bg-[#171C28] p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/30">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F4EBDD]">Archival Primary Sources</h3>
                  <p className="text-xs text-[#B8C0CC] leading-relaxed">
                    Every assertion is cited against original naval inquiry transcripts, peer-reviewed archaeological monographs, and National Oceanic and Atmospheric Administration bulletins.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#38B7A5]/10 text-[#38B7A5] border border-[#38B7A5]/30">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F4EBDD]">Ethical Scholarship</h3>
                  <p className="text-xs text-[#B8C0CC] leading-relaxed">
                    We strictly differentiate established archaeological and maritime facts from working hypotheses. No fabricated sources, quotations, or sensationalist claims are ever tolerated.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/30">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F4EBDD]">Open Technical Audit</h3>
                  <p className="text-xs text-[#B8C0CC] leading-relaxed">
                    Designed for college SEO capstone assessment. Inspect keyword densities, canonical tags, JSON-LD Schema.org graphs, and responsive mobile architecture live on any page.
                  </p>
                  <button
                    onClick={onOpenSEOInspector}
                    className="text-xs font-semibold text-[#D6A84F] hover:text-[#E5BC68] hover:underline inline-flex items-center gap-1.5 pt-1"
                  >
                    <span>Launch Audit Inspector</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
