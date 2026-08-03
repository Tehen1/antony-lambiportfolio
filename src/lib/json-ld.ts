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
      addressCountry: 'BE',
    },
    knowsAbout: [
      'Blockchain',
      'Web3',
      'Solidity',
      'Ethereum',
      'zkSync',
      'TypeScript',
      'React',
      'Next.js',
    ],
    sameAs: [
      'https://github.com/antonylambi',
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
  };
}
