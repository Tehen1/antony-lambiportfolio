/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import coderImage from "../assets/images/profile_coder_1779518694902.png.png";
import creativeImage from "../assets/images/profile_creative_1779518714244.png";
import { Shield, Code, Server, User, Globe, CheckCircle, Terminal, Palette } from "lucide-react";

export default function About() {
  const [activeIdentity, setActiveIdentity] = useState<"coder" | "creative">(() => {
    return (localStorage.getItem("theme_identity") as "coder" | "creative") || "coder";
  });

  const handleIdentityChange = (identity: "coder" | "creative") => {
    setActiveIdentity(identity);
    localStorage.setItem("theme_identity", identity);
  };

  const coreVibrations = [
    {
      title: "Solidity & EVM Hardening",
      desc: "Je ne me contente pas de coder; j'écris des contrats résistants à la réentrance, aux débordements d'arrondi et aux manipulations d'oracles de prix.",
      icon: <Shield size={18} className="text-neon-green" />
    },
    {
      title: "Automatisation Multi-Agents IA",
      desc: "Architecte de pipelines connectant des agents décisionnels (LLM) à des smart contracts on-chain pour des prises de décision logistiques sécurisées.",
      icon: <Server size={18} className="text-neon-purple" />
    },
    {
      title: "Full-Stack Enterprise Readiness",
      desc: "Des interfaces réactives (Next.js/React 19) à d'importants débits d'indexation (The Graph) avec tests de fuzzing Foundry et typage strict.",
      icon: <Code size={18} className="text-neon-blue" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-bg-light border-b border-border-dark relative">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-neon-green/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative group flex flex-col items-center">
            {/* Holographic Glowing Frames */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-lg blur opacity-40 group-hover:opacity-85 transition duration-700 pointer-events-none" />
            
            <div className="relative rounded-lg overflow-hidden border border-border-dark bg-bg-card max-w-sm sm:max-w-md w-full aspect-square">
              <img
                src={activeIdentity === "coder" ? coderImage : creativeImage}
                alt={activeIdentity === "coder" ? "Antony Lambi - Full Stack Coder" : "Antony Lambi - Creative Architect"}
                className="w-full h-full object-cover select-none filter contrast-[1.08] saturate-[0.9] hover:saturate-[1.1] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Retro scanlines overlay */}
              <div className="absolute inset-0 bg-scanlines opacity-[0.08] pointer-events-none bg-repeat" />
              <div className="absolute bottom-4 left-4 right-4 bg-bg-dark/80 backdrop-blur-md py-2.5 px-4 rounded border border-border-dark/60 font-mono text-[10px] text-neon-blue flex items-center justify-between shadow-lg">
                <span className="flex items-center gap-1.5 font-bold uppercase">
                  <span className={`w-2 h-2 rounded-full animate-ping ${activeIdentity === "coder" ? "bg-neon-blue" : "bg-neon-purple"}`} />
                  ID-SCANNER: {activeIdentity === "coder" ? "DEV_MODE" : "DSN_MODE"}
                </span>
                <span className="text-white">LMB_SR_9901_BE</span>
              </div>
            </div>
            
            {/* Tech details corner tags */}
            <div className="corner-border-top-left" />
            <div className="corner-border-bottom-right" />

            {/* Immersive Dual Identity Switcher */}
            <div className="relative z-10 mt-6 flex gap-2.5 p-1 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-lg">
              <button
                type="button"
                onClick={() => handleIdentityChange("coder")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
                  activeIdentity === "coder"
                    ? "bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Terminal size={12} />
                Full-Stack Coder
              </button>
              <button
                type="button"
                onClick={() => handleIdentityChange("creative")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
                  activeIdentity === "creative"
                    ? "bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Palette size={12} />
                Creative Architect
              </button>
            </div>
          </div>

          {/* Core Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-neon-purple tracking-widest uppercase">
              <User size={14} />
              <span>SÉCURITÉ & INTELLIGENCE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              À propos de <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">Moi</span>
            </h2>

            <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
              <p>
                Développeur et consultant passionné par l'intersection entre la <strong className="text-white">décentralisation de l'actif</strong> et la <strong className="text-white">micro-décision algorithmique</strong>. Basé en Belgique, je combine de solides bases académiques et plus de 5 ans d'ingénierie active pour bâtir des environnements on-chain souverains d'acquisition et de business.
              </p>
              
              <blockquote className="border-l-2 border-neon-blue bg-bg-card/50 px-4 py-3 text-xs sm:text-sm italic text-white rounded-r">
                "Mon objectif n'est pas simplement de livrer du code brut, mais de concevoir des architectures résilientes qui agissent en tant que multiplicateurs de valeur sécurisés et générateurs de revenus passifs automatisés."
              </blockquote>
            </div>

            {/* Structured details blocks */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-border-dark pb-1.5 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-neon-green" />
                Principes fondamentaux de mes builds
              </h3>
              <div className="grid md:grid-cols-1 gap-4">
                {coreVibrations.map((vib, index) => (
                  <div key={index} className="flex gap-3 p-3.5 rounded bg-bg-card border border-border-dark">
                    <div className="mt-0.5">{vib.icon}</div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white">{vib.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{vib.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
