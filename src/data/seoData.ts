export interface PageSEO {
  pageName: string;
  path: string;
  url: string;
  primaryKeyword: string;
  relatedKeywords: [string, string];
  searchIntent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
  seoTitle: string;
  metaDescription: string;
  headingsCount: { h1: number; h2Count: number; h3Count: number };
  questionHeadings: string[];
}

export const BASE_PRODUCTION_URL = 'https://mystrypedia.vercel.app';

export const PAGES_SEO_MAP: Record<string, PageSEO> = {
  home: {
    pageName: 'Homepage',
    path: '/',
    url: `${BASE_PRODUCTION_URL}/`,
    primaryKeyword: 'fascinating mysteries',
    relatedKeywords: ['unexplained mysteries', 'historical mysteries'],
    searchIntent: 'Informational',
    seoTitle: 'Mystrypedia — Historical Mysteries & Discoveries',
    metaDescription: 'Explore fascinating mysteries, historical investigations, and ancient discoveries with peer-reviewed evidence and forensic research at Mystrypedia.',
    headingsCount: { h1: 1, h2Count: 6, h3Count: 4 },
    questionHeadings: [
      'What constitutes a genuine historical mystery versus popular mythology?',
      'How does modern forensic science resolve long-standing unexplained phenomena?'
    ]
  },
  bermuda: {
    pageName: 'Bermuda Triangle Mysteries',
    path: '/bermuda-triangle-mysteries',
    url: `${BASE_PRODUCTION_URL}/bermuda-triangle-mysteries`,
    primaryKeyword: 'Bermuda Triangle mysteries',
    relatedKeywords: ['Bermuda Triangle disappearances', 'Bermuda Triangle theories'],
    searchIntent: 'Informational',
    seoTitle: 'Bermuda Triangle Mysteries: Facts, Disappearances & Theories',
    metaDescription: 'Investigate Bermuda Triangle mysteries, verified maritime disappearances, and evidence-based meteorological theories with historical records and oceanographic facts.',
    headingsCount: { h1: 1, h2Count: 7, h3Count: 6 },
    questionHeadings: [
      'What is the Bermuda Triangle and where is it located?',
      'What is the most plausible scientific explanation for Bermuda Triangle disappearances?'
    ]
  },
  pyramids: {
    pageName: 'How Egyptian Pyramids Were Built',
    path: '/how-egyptian-pyramids-were-built',
    url: `${BASE_PRODUCTION_URL}/how-egyptian-pyramids-were-built`,
    primaryKeyword: 'how Egyptian pyramids were built',
    relatedKeywords: ['ancient Egyptian pyramid construction', 'Egyptian pyramid building methods'],
    searchIntent: 'Informational',
    seoTitle: 'How Egyptian Pyramids Were Built: Ancient Engineering Facts',
    metaDescription: 'Discover how Egyptian pyramids were built through ancient engineering methods, Merer logbook papyri, ramp systems, and archaeological proof from the Giza plateau.',
    headingsCount: { h1: 1, h2Count: 7, h3Count: 5 },
    questionHeadings: [
      'How were the massive limestone blocks transported to the Giza plateau?',
      'What ramp system did ancient Egyptian builders use to erect the Great Pyramid?'
    ]
  },
  maryCeleste: {
    pageName: 'The Mary Celeste Mystery',
    path: '/mary-celeste-mystery',
    url: `${BASE_PRODUCTION_URL}/mary-celeste-mystery`,
    primaryKeyword: 'Mary Celeste mystery',
    relatedKeywords: ['Mary Celeste disappearance', 'abandoned ship mystery'],
    searchIntent: 'Informational',
    seoTitle: 'Mary Celeste Mystery: What Happened to the Abandoned Ship?',
    metaDescription: 'Uncover the Mary Celeste mystery, the 1872 abandoned ship discovery in the Atlantic, missing crew records, Admiralty Court transcripts, and evidence-backed theories.',
    headingsCount: { h1: 1, h2Count: 7, h3Count: 5 },
    questionHeadings: [
      'Why did the crew abandon the seaworthy Mary Celeste?',
      'Was the abandonment of the Mary Celeste caused by piracy or foul play?'
    ]
  }
};
