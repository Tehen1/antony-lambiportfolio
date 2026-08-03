import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { personJsonLd, professionalServiceJsonLd, breadcrumbJsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Développeur React Liège — Antony Lambi',
  description:
    'Antony Lambi, développeur React et Next.js basé à Liège (Belgique). Missions freelance React, TypeScript, Web3 et blockchain. Disponible immédiatement.',
  alternates: {
    canonical: '/liege-react-developer',
  },
  keywords: [
    'développeur React Liège',
    'React developer Liège',
    'Next.js developer Belgium',
    'freelance React Liège',
    'développeur TypeScript Belgique',
    'développeur frontend Liège',
  ],
});

export default function LiegeReactDeveloperPage() {
  const crumbs = [
    { name: 'Accueil', url: siteConfig.url },
    { name: 'Développeur React Liège', url: `${siteConfig.url}/liege-react-developer` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personJsonLd(),
            professionalServiceJsonLd(),
            breadcrumbJsonLd(crumbs),
          ]),
        }}
      />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <a href="/" itemProp="item" className="hover:underline">
                <span itemProp="name">Accueil</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true">›</li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Développeur React Liège</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Développeur React &amp; Next.js — Liège, Belgique
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Freelance disponible pour missions React, TypeScript et Web3 basé à Liège.
        </p>

        <section aria-labelledby="services-heading" className="mb-12">
          <h2 id="services-heading" className="text-2xl font-semibold mb-4">
            Services
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              'Applications React et Next.js 15 — Server Components, App Router',
              'Interfaces Web3 (ethers.js, wagmi, viem)',
              'TypeScript strict, tests Vitest/Playwright',
              'Intégration Supabase, Stripe, API REST/GraphQL',
              'Déploiement Vercel et optimisation Core Web Vitals',
            ].map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden="true" className="text-foreground">▸</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="zone-heading" className="mb-12">
          <h2 id="zone-heading" className="text-2xl font-semibold mb-4">
            Zone d&apos;intervention
          </h2>
          <p className="text-muted-foreground">
            Liège · Wallonie · Belgique · Remote Europe
          </p>
        </section>

        <a
          href="/#contact"
          className="inline-block px-6 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Demander un devis
        </a>
      </main>
    </>
  );
}
