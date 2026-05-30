/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteConfig } from "../config/site";

export default function SiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.contact.address.city,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: siteConfig.contact.address.country,
        },
        sameAs: [
          siteConfig.socials.github,
          siteConfig.socials.linkedin,
          siteConfig.socials.twitter,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} — Portfolio`,
        description: siteConfig.description,
        inLanguage: "fr-BE",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        description: siteConfig.description,
        areaServed: { "@type": "City", name: "Liège" },
        provider: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
