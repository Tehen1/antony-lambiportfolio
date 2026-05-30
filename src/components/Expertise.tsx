/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wallet, Cpu, Lock, Globe, Code, ArrowUpRight } from "lucide-react";

interface ExpertiseProps {
  onNavigate: (sectionId: string) => void;
}

export default function Expertise({ onNavigate }: ExpertiseProps) {
  const listExpertises = [
    {
      icon: <Wallet size={24} />,
      badge: "Solidity / Solana",
      title: "Développement Smart Contracts",
      desc: "Conception, développement, et déploiement de protocoles de Staking, de Markets NFT, d'Automated Market Makers (AMM) et de Vaults de rendement optimisés en gas.",
      colorClass: "text-neon-blue group-hover:text-white",
      hoverStyle: "hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-neon-blue/5",
      iconContainer: "border-neon-blue/20 bg-neon-blue/10 text-neon-blue"
    },
    {
      icon: <Globe size={24} />,
      badge: "viem / wagmi / ethers",
      title: "Intégration dApps & Web3",
      desc: "Création d'interfaces de dApps d'élite avec de parfaites gestions d'état, indexation des sous-graphes (The Graph), et multi-chain wallets adapters (Reown/WalletConnect).",
      colorClass: "text-neon-purple group-hover:text-white",
      hoverStyle: "hover:border-neon-purple hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] bg-neon-purple/5",
      iconContainer: "border-neon-purple/20 bg-neon-purple/10 text-neon-purple"
    },
    {
      icon: <Cpu size={24} />,
      badge: "micro-agents / gemini",
      title: "Intelligence Artificielle & IA Oracles",
      desc: "Mise en place de LLMs en production, chaînes d'agents LangChain, oracles d'IA on-chain et automatisations complexes pour exécuter des scripts de manière souveraine.",
      colorClass: "text-neon-pink group-hover:text-white",
      hoverStyle: "hover:border-neon-pink hover:shadow-[0_0_20px_rgba(255,59,59,0.15)] bg-neon-pink/5",
      iconContainer: "border-neon-pink/20 bg-neon-pink/10 text-neon-pink"
    },
    {
      icon: <Lock size={24} />,
      badge: "slither / mythril / fuzzing",
      title: "Audit & Sécurité Offensive",
      desc: "Audits complets de security, analyses statiques poussées, tests de fuzzing différentiel et formels pour prémunir les dApps de tout type de drain ou d'exploit DeFi.",
      colorClass: "text-neon-green group-hover:text-white",
      hoverStyle: "hover:border-neon-green hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] bg-neon-green/5",
      iconContainer: "border-neon-green/20 bg-neon-green/10 text-neon-green"
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-bg-dark border-b border-border-dark relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-blue">
            <Code size={12} />
            <span>SERVICES CORE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Mon <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">Expertise</span>
            <span className="text-neon-blue">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-sm sm:text-base leading-relaxed">
            Une approche sémantique, sécurisée et d'élite pour concevoir et déployer des applications industrielles performantes de commerce et d'acquisition informatique.
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {listExpertises.map((item, index) => (
            <div
              key={index}
              className={`cyber-card p-8 group border border-border-dark flex flex-col justify-between transition-all duration-300 transform rounded-lg cursor-pointer ${item.hoverStyle}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded border ${item.iconContainer} transition-transform group-hover:rotate-6`}>
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase border border-border-dark/60 bg-bg-dark px-2.5 py-1 rounded">
                    {item.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-white mb-3 transition-colors ${item.colorClass}`}>
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-border-dark/40">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("contact");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-white group-hover:text-neon-blue transition-colors uppercase tracking-wider"
                >
                  Démarrer un audit
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
