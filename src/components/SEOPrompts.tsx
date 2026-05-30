/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Copy, Check, Download, Mail, BookOpen, Send, Sparkles } from "lucide-react";

interface PromptTemplate {
  title: string;
  category: "Blockchain" | "SEO" | "Dev/AI" | "Web3 Tokenomics";
  description: string;
  promptText: string;
}

const PREMIUM_PROMPTS: PromptTemplate[] = [
  {
    title: "Contract Solidity Security Analyzer",
    category: "Blockchain",
    description: "Analyse avancée de vulnérabilité, vérification de débordement d'arrondi, et contrôle strict d'AccessControl (OpenZeppelin v5).",
    promptText: "Tu es un auditeur de sécurité senior Solidity. Analyse le smart contract suivant ligne par ligne. Liste les overflows, les failles d'ordre d'exécution (Frontrunning), et les possibles réentrances en proposant des correctifs avec ReentrancyGuard ou CEI (Checks-Effects-Interactions)..."
  },
  {
    title: "Semantic Content Silo Creator",
    category: "SEO",
    description: "Template sémantique pour structurer un réseau de silos sémantiques (Topic Clustering) et forcer le jus de lien vers un mot clé d'ancrage local.",
    promptText: "Tu es un consultant en référencement naturel technique. Je veux créer un monopole sémantique à Liège pour la thématique '[Thème]'. Rédige un diagramme sémantique complet avec 1 page d'ancrage H1 locale, 3 pages de sous-catégories thématiques de second niveau, et rédige les ancres exactes des liens internes en HTML..."
  },
  {
    title: "Cognitive Multi-Agent LLM Gateway",
    category: "Dev/AI",
    description: "Framework complet d'intégration pour sécuriser et orchestrer des agents décisionnels LLM avec validation de schéma de sortie.",
    promptText: "Tu es un architecte d'intégration IA. Rédige un script Node.js / Express utilisant le kit GoogleGenAI pour instancier un client AI sécurisé. Rédige des schémas de sortie stricts au format JSON et implémente des systèmes de repli (Fallback) en cas de timeout réseau..."
  },
  {
    title: "DeFi Balanced Tokenomics Designer",
    category: "Web3 Tokenomics",
    description: "Formulation mathématique de jetons, vérouillage d'allocation (Vesting), et mécanismes de buyback pour limiter l'inflation.",
    promptText: "Tu es un concepteur d'économie de jetons (Tokenomics) pour dApps. Propose un plan d'allocation pour 1,000,000,000 de jetons, prévoyant un vesting linéaire sur 24 mois pour l'équipe R&D via des smart contrats de vesting certifiés, une réserve pour staking d'AMM de 35%, et détaille les frais de transaction de brûlage (burn fee) de 0.5%..."
  }
];

export default function SEOPrompts() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <section id="seo-hub" className="py-24 bg-bg-light border-b border-border-dark relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-purple">
            <BookOpen size={12} />
            <span>RESSOURCES EXCLUSIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Prompts & <span className="text-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">Templates AI</span>
            <span className="text-neon-pink">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Boostez votre productivité technique. Accédez et copiez instantanément mes formulations d'ingénierie de prompt exploitées sur mes propres plateformes d'acquisition.
          </p>
        </div>

        {/* List of prompts */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PREMIUM_PROMPTS.map((prompt, idx) => (
            <div
              key={idx}
              className="bg-bg-card border border-border-dark rounded-lg p-6 hover:border-neon-blue/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-neon-blue transition-colors font-display">
                      {prompt.title}
                    </h3>
                    <span className="font-mono text-[9px] text-[#bf00ff] bg-[#bf00ff]/10 border border-[#bf00ff]/20 px-2 py-0.5 rounded font-black mt-1 inline-block uppercase">
                      {prompt.category}
                    </span>
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(prompt.promptText, idx)}
                    className="p-1.5 rounded bg-bg-dark border border-border-dark text-text-muted hover:text-white hover:border-neon-blue transition cursor-pointer"
                    title="Copier le prompt dans le presse-papiers"
                  >
                    {copiedIndex === idx ? (
                      <Check size={14} className="text-neon-green" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                  {prompt.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-border-dark/40 mt-6 flex justify-between items-center text-xs font-mono">
                {copiedIndex === idx ? (
                  <span className="text-neon-green font-bold text-[10px] animate-pulse">Copie cryptographique validée!</span>
                ) : (
                  <span className="text-text-muted text-[9px]">Standard optimisé 2026</span>
                )}
                
                <button
                  onClick={() => handleCopy(prompt.promptText, idx)}
                  className="text-neon-blue hover:text-neon-blue/80 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download size={12} />
                  Copier Prompt
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Box */}
        <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/5 to-bg-card border border-border-dark rounded-lg p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
          
          <div className="max-w-xl space-y-3 relative z-10 text-left">
            <h3 className="text-lg sm:text-2xl font-black font-display text-white flex items-center gap-2">
              <Sparkles size={20} className="text-neon-purple animate-pulse" />
              Rejoignez ma Newsletter Blockchain & IA
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              Recevez mensuellement en avant-première mes diagnostics sémantiques, mes retours de failles de sécurité de contrats EVM et des audits d'acquisition Web3 réels menés en Belgique.
            </p>
          </div>

          <div className="w-full md:w-auto relative z-10">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 font-mono text-xs max-w-sm w-full">
                <input
                  type="email"
                  required
                  placeholder="votre-email@pro.be"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-bg-dark border border-border-dark rounded px-3 py-2.5 text-xs text-white placeholder-text-muted focus:border-neon-purple outline-none sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neon-purple hover:bg-neon-purple/90 text-white font-bold rounded uppercase cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  <Send size={12} />
                  S'inscrire
                </button>
              </form>
            ) : (
              <div className="p-3 rounded border border-neon-green/30 bg-neon-green/10 text-neon-green font-mono text-xs text-center flex items-center gap-2 animate-slide-in">
                <Check size={14} className="animate-bounce" />
                <span>Enregistré! Bienvenue dans le Matrix.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
