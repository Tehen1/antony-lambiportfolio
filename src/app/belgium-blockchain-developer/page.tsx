import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { personJsonLd, professionalServiceJsonLd, breadcrumbJsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Développeur Blockchain Belgique — Antony Lambi',
  description:
    'Antony Lambi, développeur blockchain et Solidity basé en Belgique. Smart contracts Ethereum, zkEVM, zkSync Era. Audits, dApps et intégrations Web3 pour projets freelance.',
  alternates: {
    canonical: '/belgium-blockchain-developer',
  },
  keywords: [
    'développeur blockchain Belgique',
    'blockchain developer Belgium',
    'Solidity developer Belgium',
    'smart contracts Liège',
    'zkEVM developer Belgium',
    'développeur Web3 Belgique',
    'freelance blockchain Belgique',
  ],
});

export default function BelgiumBlockchainDeveloperPage() {
  const crumbs = [
    { name: 'Accueil', url: siteConfig.url },
    { name: 'Développeur Blockchain Belgique', url: `${siteConfig.url}/belgium-blockchain-developer` },
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
              <span itemProp="name">Développeur Blockchain Belgique</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Développeur Blockchain &amp; Solidity — Belgique
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Smart contracts Ethereum, zkEVM et zkSync Era. Disponible pour missions freelance en Belgique et remote.
        </p>

        <section aria-labelledby="expertise-heading" className="mb-12">
          <h2 id="expertise-heading" className="text-2xl font-semibold mb-4">
            Expertise blockchain
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              'Smart contracts Solidity 0.8.x — ERC-20, ERC-721, ERC-1155',
              'zkEVM et zkSync Era — Prover, circuits ZK',
              'TimelockController, Gnosis Safe multi-sig',
              'Tests Foundry — fuzz ≥95%, invariant tests',
              'Slither, Aderyn — audit statique automatisé',
              'Intégration DeFi : Uniswap v4, AAVE, Chainlink',
            ].map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden="true" className="text-foreground">▸</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="projects-heading" className="mb-12">
          <h2 id="projects-heading" className="text-2xl font-semibold mb-4">
            Projets notables
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-foreground">▸</span>
              FixieRun v2 — Move2Earn zkEVM, mainnet, 244 commits, 0 issue ouverte
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-foreground">▸</span>
              RhymeChain — Gaming NFT hip-hop, Solidity + TypeScript
            </li>
          </ul>
        </section>

        <a
          href="/#contact"
          className="inline-block px-6 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Discuter de votre projet
        </a>
      </main>
    </>
  );
}
