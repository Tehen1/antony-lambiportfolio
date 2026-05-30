/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Cpu, Server, Layers, HelpCircle, HardDrive, Terminal } from "lucide-react";

type StackCategory = "all" | "blockchain" | "frontend" | "backend" | "ai" | "devops";

interface TechDetails {
  name: string;
  category: StackCategory;
  proficiency: number;
  useCase: string;
  badge: string;
  color: string;
  shadow: string;
}

const STACK_ITEMS: TechDetails[] = [
  {
    name: "Solidity & EVM",
    category: "blockchain",
    proficiency: 95,
    useCase: "Contrats intelligents hautement optimisés, proxies, standards OpenZeppelin.",
    badge: "Solids / ERC-20 / ERC-721",
    color: "text-neon-blue",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.2)]"
  },
  {
    name: "Foundry & Hardhat",
    category: "blockchain",
    proficiency: 92,
    useCase: "Tests de fuzzing, simulations de fork, assertions de gaz, déploiement automatisé.",
    badge: "Testing Hardened",
    color: "text-neon-purple",
    shadow: "shadow-[0_0_12px_rgba(191,0,255,0.2)]"
  },
  {
    name: "zkSync & Layer-2s",
    category: "blockchain",
    proficiency: 88,
    useCase: "Développement dApps zkEVM à très hauts rendements de transaction sur Polygon et Arbitrum.",
    badge: "Scale Protocol",
    color: "text-neon-blue",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.2)]"
  },
  {
    name: "Next.js & React 19",
    category: "frontend",
    proficiency: 90,
    useCase: "Front-ends d'autorité optimisés SEO, Server Components, routeurs de sous-répertoires.",
    badge: "CSR / SSR Engine",
    color: "text-neon-green",
    shadow: "shadow-[0_0_12px_rgba(57,255,20,0.2)]"
  },
  {
    name: "TypeScript (Strict)",
    category: "frontend",
    proficiency: 100,
    useCase: "Typage statique absolu à 100% pour fiabiliser les appels RPC de blockchain et l'IA.",
    badge: "Type Safety",
    color: "text-neon-cyan",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.25)]"
  },
  {
    name: "Gemini API & LLMs",
    category: "ai",
    proficiency: 88,
    useCase: "Modèles génératifs, extraction de schémas JSON, chaînes de traitement d'agents autonomes.",
    badge: "Cognitive Engine",
    color: "text-neon-pink",
    shadow: "shadow-[0_0_12px_rgba(255,0,128,0.2)]"
  },
  {
    name: "LangChain & n8n",
    category: "ai",
    proficiency: 85,
    useCase: "Micro-agents de décision, flux d'automatisation d'acquisition et agents d'analyse sémantique.",
    badge: "Automation Pipelines",
    color: "text-neon-yellow",
    shadow: "shadow-[0_0_12px_rgba(255,255,0,0.2)]"
  },
  {
    name: "Supabase & Postgres",
    category: "backend",
    proficiency: 90,
    useCase: "Authentification décentralisée, gestion de leads, Row Level Security (RLS) impénétrable.",
    badge: "DB / Security Core",
    color: "text-neon-green",
    shadow: "shadow-[0_0_12px_rgba(57,255,20,0.2)]"
  },
  {
    name: "Kubernetes & Docker",
    category: "devops",
    proficiency: 82,
    useCase: "Orchestration de micro-agents serveurs, isolation réseau et redondance 24/7.",
    badge: "Infra Scale",
    color: "text-neon-purple",
    shadow: "shadow-[0_0_12px_rgba(191,0,255,0.2)]"
  },
  {
    name: "Vercel & Cloudflare",
    category: "devops",
    proficiency: 91,
    useCase: "Déploiement Edge, pare-feu WAF restrictif, routage sémantique à très haute vitesse.",
    badge: "CDN Integration",
    color: "text-neon-blue",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.2)]"
  }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<StackCategory>("all");

  const filteredItems = activeCategory === "all"
    ? STACK_ITEMS
    : STACK_ITEMS.filter(item => item.category === activeCategory);

  const filterTabs: { label: string; value: StackCategory }[] = [
    { label: "Arsenal Complet", value: "all" },
    { label: "Blockchain CORE", value: "blockchain" },
    { label: "IA & Agents", value: "ai" },
    { label: "Front-end d'Élite", value: "frontend" },
    { label: "Back-end & DB", value: "backend" },
    { label: "Infra & Edge", value: "devops" }
  ];

  return (
    <section id="tech-stack" className="py-24 bg-bg-light border-b border-border-dark relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-purple">
              <Layers size={12} />
              <span>STACK TECHNIQUE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              Arsenal <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">Technologique</span>
              <span className="text-neon-blue">.</span>
            </h2>
          </div>
          <p className="max-w-md text-text-muted text-xs sm:text-sm leading-relaxed">
            Chaque bloc de code est conçu sur un canevas 100% typé de manière stricte, garantissant une résilience critique et des performances optimales (CWV).
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border-dark/60">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded transition-all duration-300 cursor-pointer border ${
                activeCategory === tab.value
                  ? "bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border-neon-blue text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  : "bg-bg-dark border-border-dark/60 text-text-muted hover:border-border-dark hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stack Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.name}
              className="p-5.5 rounded bg-bg-card border border-border-dark relative group overflow-hidden transition-all duration-300 hover:border-border-dark/80 glow-blue-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <span className={`text-base font-bold font-display tracking-tight text-white group-hover:text-neon-blue transition-colors`}>
                    {item.name}
                  </span>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest bg-bg-dark px-2 py-0.5 rounded border border-border-dark/40 inline-block">
                    {item.badge}
                  </div>
                </div>
                
                {/* Visual score display */}
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[10px] text-white font-black">{item.proficiency}%</span>
                  <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Maîtrise</span>
                </div>
              </div>

              <div className="h-1 bg-bg-dark rounded-full overflow-hidden mb-4 border border-border-dark/20">
                <div 
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000"
                  style={{ width: `${item.proficiency}%` }}
                />
              </div>

              <p className="text-xs text-text-muted leading-relaxed font-sans">{item.useCase}</p>

              {/* Holographic matrix background accent */}
              <div className="absolute right-0 bottom-0 opacity-[0.02] group-hover:opacity-[0.06] transform translate-x-4 translate-y-4 transition-all duration-500 text-neon-blue pointer-events-none">
                <Terminal size={140} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
