/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Terminal, Shield, Cpu, RefreshCw } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdvisor: () => void;
}

const CONST_NAME = "ANTONY LAMBI";
const SCRAP_CHARACTERS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789%@$&#*+={}[];?/<>";

export default function Hero({ onNavigate, onOpenAdvisor }: HeroProps) {
  const [displayText, setDisplayText] = useState(CONST_NAME);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const triggerCount = useRef(0);

  const startDecrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return CONST_NAME.split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return CONST_NAME[index];
            }
            return SCRAP_CHARACTERS[Math.floor(Math.random() * SCRAP_CHARACTERS.length)];
          })
          .join("");
      });

      iterations += 1/3;
      if (iterations >= CONST_NAME.length) {
        clearInterval(interval);
        setDisplayText(CONST_NAME);
        setIsDecrypting(false);
      }
    }, 40);
  };

  useEffect(() => {
    // Start automated decrypt on initial render
    setTimeout(() => {
      startDecrypt();
    }, 400);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-bg-dark pt-16"
    >
      {/* 3D Perspective Ambient Network Grid Floor */}
      <div 
        aria-hidden 
        className="absolute inset-0 bg-grid-ambient opacity-[0.25] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #050506 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #050506 85%)"
        }}
      />

      {/* Retro-cyber scanline indicator */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-neon-blue/30 opacity-70 pointer-events-none animate-scanline-fade z-20" />

      {/* Cyber ambient glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-8 py-12">
        {/* Availability Radar Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/45 backdrop-blur-md border border-[#39FF14]/30 text-[10px] font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#39FF14]"></span>
          </span>
          <span>AVAILABLE FOR Q3/Q4 MISSIONS</span>
          <span className="text-zinc-700 font-light">|</span>
          <span className="text-neon-green font-extrabold animate-pulse">LIÈGE & REMOTE</span>
        </div>

        {/* Hero title with Decrypt / Matrix effect on Hover */}
        <div className="space-y-4">
          <h1 
            onMouseEnter={startDecrypt}
            onTouchStart={startDecrypt}
            className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-tight text-white select-none cursor-pointer leading-[0.95]"
            title="Survolez ou touchez pour lancer le déchiffrement informatique"
          >
            <span className="block text-gradient bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 duration-300">
              {displayText}
            </span>
          </h1>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#39FF14] to-[#00F0FF] bg-[length:150%_auto] animate-shimmer drop-shadow-[0_0_15px_rgba(57,255,20,0.25)]">
                Blockchain & AI Systems
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-neon-yellow bg-[#facc15]/10 border border-[#facc15]/30 px-3.5 py-1 rounded-sm shadow-[0_0_12px_rgba(250,204,21,0.15)] flex items-center gap-1.5 mt-1.5">
              <span>★</span>
              <span>Expert SEO Technique & Indexation Algorithmique</span>
              <span>★</span>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-[17px] text-zinc-400 font-normal leading-relaxed">
          Architecte de systèmes <span className="text-neon-blue font-semibold">Web3 sécurisés</span> et agents autonomes. <br />
          Expertise en <span className="text-neon-purple font-semibold">dApps zkEVM</span>, smart contracts, <span className="text-neon-pink font-semibold">LLM Orchestration</span> et <span className="text-neon-green font-semibold">SEO algorithmique de pointe</span> à Liège, Belgique.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("portfolio");
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00F0FF] to-neon-purple text-bg-dark font-black rounded-sm text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.35)]"
          >
            GET ARCHITECTURE AUDIT →
          </a>

          <button
            onClick={onOpenAdvisor}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-950/50 backdrop-blur-md border border-neon-purple/40 text-white font-bold rounded-sm text-xs sm:text-sm tracking-wider uppercase hover:border-neon-purple hover:bg-neon-purple/5 hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.15)]"
          >
            <Cpu size={14} className="text-[#00F0FF] animate-bounce" />
            AI SYSTEMS ADVISOR
          </button>
        </div>

        {/* Micro audit metrics banner */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-border-dark text-left font-mono">
          {[
            { value: "15+", label: "Projets validés", icon: <Terminal size={14} className="text-neon-blue" />, glow: "hover:border-neon-blue/45 hover:shadow-[0_0_15px_rgba(0,240,255,0.12)]" },
            { value: "5+ ans", label: "Dev Blockchain", icon: <Shield size={14} className="text-neon-green" />, glow: "hover:border-neon-green/45 hover:shadow-[0_0_15px_rgba(57,255,20,0.12)]" },
            { value: "100%", label: "TypeScript strict", icon: <Cpu size={14} className="text-neon-purple" />, glow: "hover:border-neon-purple/45 hover:shadow-[0_0_15px_rgba(124,58,237,0.12)]" },
            { value: "zkEVM", label: "Stretching Era + SOL", icon: <RefreshCw size={14} className="text-neon-pink" />, glow: "hover:border-neon-pink/45 hover:shadow-[0_0_15px_rgba(255,59,59,0.12)]" },
          ].map((stat, i) => (
            <div key={i} className={`cyber-card p-4 flex items-start gap-3 transition-all duration-300 hover:scale-[1.03] ${stat.glow}`}>
              <div className="p-2 rounded bg-zinc-950/60 border border-border-dark/60">{stat.icon}</div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structural Detail (SVG Grid/Architecture) */}
      <div className="absolute bottom-24 right-4 w-[280px] h-[210px] md:w-[400px] md:h-[300px] opacity-15 pointer-events-none hidden sm:block">
         <svg viewBox="0 0 200 150" className="w-full h-full stroke-zinc-700 fill-none" style={{ strokeWidth: 0.5 }}>
            <rect x="10" y="10" width="50" height="30" rx="2" />
            <rect x="10" y="60" width="50" height="30" rx="2" />
            <rect x="10" y="110" width="50" height="30" rx="2" />
            <path d="M60 25 L100 25 L100 75 L140 75" />
            <path d="M60 75 L140 75" />
            <path d="M60 125 L100 125 L100 75" />
            <circle cx="150" cy="75" r="10" className="stroke-[#00F0FF]" style={{ strokeWidth: 1 }} />
            <text x="14" y="28" className="text-[6px] fill-zinc-500 font-mono uppercase" style={{ stroke: "none" }}>RPC Node</text>
            <text x="14" y="78" className="text-[6px] fill-zinc-500 font-mono uppercase" style={{ stroke: "none" }}>L2 Index</text>
            <text x="14" y="128" className="text-[6px] fill-zinc-500 font-mono uppercase" style={{ stroke: "none" }}>Oracle</text>
            <text x="140" y="60" className="text-[6px] fill-[#00F0FF] font-mono uppercase" style={{ stroke: "none" }}>Mainnet</text>
         </svg>
      </div>

      {/* Smooth scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Explore Matrix</span>
        <ChevronDown size={14} className="text-neon-blue animate-bounce" />
      </div>
    </section>
  );
}
