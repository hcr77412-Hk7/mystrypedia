import { useEffect } from 'react';
import { PageSEO, BASE_PRODUCTION_URL } from '../data/seoData';
import { ArticleData } from '../data/articlesData';

interface SEOHeadProps {
  seo: PageSEO;
  article?: ArticleData;
}

export function SEOHead({ seo, article }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = seo.seoTitle;

    // 2. Helper to set or create meta tags
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Helper to set canonical tag
    const setCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard meta tags
    setMeta('description', seo.metaDescription);
    setMeta('keywords', `${seo.primaryKeyword}, ${seo.relatedKeywords.join(', ')}`);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setCanonical(seo.url);

    // OpenGraph
    setMeta('og:title', seo.seoTitle, true);
    setMeta('og:description', seo.metaDescription, true);
    setMeta('og:url', seo.url, true);
    setMeta('og:type', article ? 'article' : 'website', true);
    setMeta('og:site_name', 'Mystrypedia', true);

    const imageUrl = article
      ? `${BASE_PRODUCTION_URL}${article.featuredImage.src}`
      : `${BASE_PRODUCTION_URL}/og-cover.jpg`;
    setMeta('og:image', imageUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.seoTitle);
    setMeta('twitter:description', seo.metaDescription);
    setMeta('twitter:image', imageUrl);

    // 4. Inject JSON-LD Schema
    const schemaId = 'mystrypedia-json-ld';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas: any[] = [];

    // Base Website & Organization schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mystrypedia',
      alternateName: 'Mystrypedia Editorial',
      url: BASE_PRODUCTION_URL,
      description: 'Explore the Unknown. Discover the Unexplained. A premium editorial magazine exploring historical mysteries, ancient civilizations, and maritime phenomena.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_PRODUCTION_URL}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Mystrypedia Publishing',
      url: BASE_PRODUCTION_URL,
      logo: `${BASE_PRODUCTION_URL}/logo.png`,
      sameAs: [
        'https://twitter.com/mystrypedia',
        'https://github.com/mystrypedia'
      ]
    });

    // If Article page: Add Article & Breadcrumb schema
    if (article) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: seo.metaDescription,
        image: [`${BASE_PRODUCTION_URL}${article.featuredImage.src}`],
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        author: [
          {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role
          }
        ],
        publisher: {
          '@type': 'Organization',
          name: 'Mystrypedia',
          url: BASE_PRODUCTION_URL
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': article.url
        },
        keywords: [article.primaryKeyword, ...article.relatedKeywords].join(', '),
        articleSection: article.category,
        wordCount: article.wordCount
      });

      // BreadcrumbList
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_PRODUCTION_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: article.category,
            item: `${BASE_PRODUCTION_URL}/#category-${encodeURIComponent(article.category)}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: article.url
          }
        ]
      });

      // FAQPage schema for question sections
      const qaEntities = article.sections
        .filter((sec) => sec.isQuestion && sec.directAnswer)
        .map((sec) => ({
          '@type': 'Question',
          name: sec.heading,
          acceptedAnswer: {
            '@type': 'Answer',
            text: sec.directAnswer
          }
        }));

      if (qaEntities.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: qaEntities
        });
      }
    } else if (seo.pageName === 'Homepage') {
      // FAQ schema for homepage questions
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What constitutes a genuine historical mystery versus popular mythology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A genuine historical mystery is characterized by documented empirical anomalies—such as an abandoned vessel in seaworthy condition or unrecorded megastructure construction techniques—where physical evidence survives but causal documentation is absent. In contrast, popular mythology relies on unsubstantiated folklore, fabricated rumors, and sensationalized distortions lacking archival or forensic validation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does modern forensic science resolve long-standing unexplained phenomena?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modern forensic science resolves historical enigmas through interdisciplinary analytical tools: satellite radar bathymetry and fluid dynamics for maritime disappearances, carbon-14 dating and muon tomography for ancient masonry, and gas chromatography and archival paleography for chemical and maritime records.'
            }
          }
        ]
      });
    }

    scriptTag.textContent = JSON.stringify(schemas, null, 2);
  }, [seo, article]);

  return null;
}
