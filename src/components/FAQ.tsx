/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronDown, HelpCircle, GraduationCap, Briefcase, CreditCard, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FAQCategory = "Expertise" | "Freelance" | "Payment" | "Audit Process";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

const CATEGORIES: { id: FAQCategory; label: string; icon: any }[] = [
  { id: "Expertise", label: "Expertise", icon: GraduationCap },
  { id: "Freelance", label: "Freelance", icon: Briefcase },
  { id: "Payment", label: "Payment & Tarifs", icon: CreditCard },
  { id: "Audit Process", label: "Processus d'Audit", icon: ShieldCheck },
];

const FAQ_LIST: FAQItem[] = [
  {
    id: "exp-1",
    category: "Expertise",
    question: "Quels sont vos services d'ingénierie principaux ?",
    answer: "Je suis spécialisé dans trois domaines clés: l'écriture de contrats intelligents sécurisés (Solidity, Rust), l'intégration d'interfaces Web3 fluides (Next.js/React, viem, wagmi, WalletConnect/Reown), et le déploiement d'automatisations cognitives (agents autonomes IA, oracles décentralisés de décision, workflows d'acquisition automatique)."
  },
  {
    id: "exp-2",
    category: "Expertise",
    question: "Quels langages et protocoles blockchain maîtrisez-vous ?",
    answer: "J'interviens principalement sur Ethereum, les réseaux EVM compatibles (Polygon, Arbitrum, Optimism, zkSync) et Solana. Je maîtrise Solidity, Rust et TypeScript au niveau applicatif. Pour l'indexation et la modélisation blockchain, j'architecture des architectures custom robustes connectées à The Graph."
  },
  {
    id: "free-1",
    category: "Freelance",
    question: "Travaillez-vous en freelance ou seulement sur vos propres projets ?",
    answer: "Je mène les deux de front. Mes propres projets générateurs de revenus passifs (comme FixieRun, RhymeChain, SEOBiz) me permettent de tester mes idées en production réelle. Selon mon planning, je prends des mandats de conseil, de codage, de réécriture ou d'audit de smart contracts (€2k à €5k par semaine)."
  },
  {
    id: "free-2",
    category: "Freelance",
    question: "Comment s'organise l'accompagnement d'un projet freelance ?",
    answer: "Chaque collaboration commence par une session de cadrage technique pour définir l'architecture cible et le périmètre rigoureux de livraison. Ensuite, je travaille par sprints hebdomadaires avec des livraisons de code régulières et transparentes sur GitHub, complétées par des démos de validation asynchrones."
  },
  {
    id: "pay-1",
    category: "Payment",
    question: "Acceptez-vous les règlements cryptographiques ?",
    answer: "Oui, tout à fait. J'accepte les règlements en USDC/USDT sur Solana et Polygon, ainsi qu'en ETH natif. Pour les structures traditionnelles basées en Belgique ou en Europe, j'établis des factures comptables certifiées, payables par virement SEPA ou carte de crédit via Stripe."
  },
  {
    id: "pay-2",
    category: "Payment",
    question: "Quels sont vos tarifs pour la prestation de conseil ?",
    answer: "Chaque formule s'adapte à la complexité. Mon TJM (Tarif Journalier Moyen) de consultation est généralement fixé à 800€ HT. Pour les architectures dApps complexes ou les diagnostics globaux, j'établis un forfait global avec un acompte initial requis de 30% au lancement du projet."
  },
  {
    id: "aud-1",
    category: "Audit Process",
    question: "Quel est votre processus de validation pour un audit de Smart Contracts ?",
    answer: "Chaque contrat passe par 4 filtres d'analyse: 1) Analyse statique automatisée (Slither, Mythril) pour identifier les vulnérabilités de logique basique. 2) Création de tests unitaires rigoureux et de fuzzing differentié (Foundry) pour éprouver la résistance économique du modèle. 3) Revue manuelle de chaque instruction par mes soins. 4) Rédaction et transmission du rapport d'audit avec un accompagnement post-audit."
  },
  {
    id: "aud-2",
    category: "Audit Process",
    question: "Combien de temps prend un audit de Smart Contracts typique ?",
    answer: "Un audit de smart contracts standard pour une dApp de taille moyenne prend généralement de 3 à 7 jours ouvrés. Ce délai varie selon le nombre de lignes de code (SLOC), la complexité des logiques de gouvernance, et les protocoles de DeFi ou de Minting implémentés."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("Expertise");
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = FAQ_LIST.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-bg-dark border-b border-border-dark relative overflow-hidden">
      {/* Visual background spotlights matching other pages */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-blue">
            <HelpCircle size={12} />
            <span>FAQ INTERACTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Des Questions <span className="text-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">Précises</span>
            <span className="text-neon-purple">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Consultez les réponses aux problématiques techniques, financières et méthodologiques classées par thématiques professionnelles.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-bg-card/50 border border-border-dark/60 rounded-xl mb-10 overflow-hidden">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Optional: Keep items open across shifts, or reset. Let's keep a smooth reset for clean look.
                  setOpenIds([]);
                }}
                className={`relative px-4 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-black"
                    : "text-text-muted hover:text-white hover:bg-bg-card"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFAQTab"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#7C3AED] rounded-lg -z-10 shadow-[0_4px_16px_rgba(0,240,255,0.25)]"
                  />
                )}
                <Icon size={14} className={isActive ? "text-black" : "text-text-muted group-hover:text-white"} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion Grid with Animation */}
        <div className="space-y-4 min-h-[250px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    id={`faq-accordion-item-${faq.id}`}
                    className="bg-bg-card border border-border-dark rounded-lg overflow-hidden group hover:border-border-dark/80 transition-all duration-300 shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4.5 text-left flex justify-between items-center bg-transparent focus:outline-none cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-white group-hover:text-neon-blue transition-colors font-mono">
                        {faq.question}
                      </span>
                      <div className="p-1 rounded bg-bg-dark/60 border border-border-dark/40 group-hover:border-neon-blue/30 group-hover:bg-neon-blue/5 transition ml-4 flex-shrink-0">
                        <ChevronDown
                          size={16}
                          className={`text-text-muted group-hover:text-neon-blue transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "transform rotate-180 text-neon-blue" : ""
                          }`}
                        />
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-border-dark/50 bg-bg-dark"
                        >
                          <div className="px-6 pb-5 pt-4 text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
