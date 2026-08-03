import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { personJsonLd, websiteJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = buildMetadata({
  alternates: { canonical: '/' },
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd()]),
        }}
      />
      <div className="min-h-screen flex flex-col">
        {/* Hero — static shell, rendered at build time */}
        <section
          id="main-content"
          aria-labelledby="hero-heading"
          className="flex-1 flex items-center justify-center px-6 py-24"
        >
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Antony Lambi
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Développeur Blockchain &amp; Web3 · Liège, Belgique
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Smart contracts Solidity, zkSync Era, dApps React/Next.js.
              Disponible pour missions freelance.
            </p>
          </div>
        </section>

        {/* Dynamic section — streamed via Suspense */}
        <Suspense
          fallback={
            <div className="py-16 text-center text-muted-foreground" aria-live="polite">
              Chargement des projets…
            </div>
          }
        >
          <ProjectsSection />
        </Suspense>
      </div>
    </>
  );
}

// RSC async component — placeholder until real data source is wired
async function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="py-16 px-6 bg-muted/30"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="projects-heading"
          className="text-2xl font-semibold mb-8 text-center"
        >
          Projets
        </h2>
        <p className="text-center text-muted-foreground">
          Les projets seront chargés depuis la source de données.
        </p>
      </div>
    </section>
  );
}
