import { siteConfig } from './metadata';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Antony Lambi',
    url: siteConfig.url,
    jobTitle: 'Développeur Blockchain & Web3',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Liège',
      addressRegion: 'Wallonie',
      addressCountry: 'BE',
    },
    knowsAbout: [
      'Blockchain',
      'Web3',
      'Solidity',
      'Ethereum',
      'zkSync Era',
      'zkEVM',
      'TypeScript',
      'React',
      'Next.js',
      'Smart Contracts',
      'DeFi',
      'NFT',
    ],
    sameAs: [
      'https://github.com/Tehen1',
      'https://linkedin.com/in/antonylambi',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'fr-BE',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Antony Lambi — Développeur Blockchain & Web3',
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: [
      { '@type': 'City', name: 'Liège' },
      { '@type': 'Country', name: 'Belgique' },
    ],
    serviceType: [
      'Développement Blockchain',
      'Smart Contracts Solidity',
      'dApps React/Next.js',
      'zkEVM Development',
      'Web3 Integration',
      'Freelance Development',
    ],
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Liège',
      addressRegion: 'Wallonie',
      addressCountry: 'BE',
    },
    founder: {
      '@type': 'Person',
      name: 'Antony Lambi',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function creativeWorkJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    keywords: opts.keywords?.join(', '),
    author: {
      '@type': 'Person',
      name: 'Antony Lambi',
    },
    programmingLanguage: ['TypeScript', 'Solidity'],
  };
}
