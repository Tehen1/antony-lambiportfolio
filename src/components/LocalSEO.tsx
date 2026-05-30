/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { locationsData } from "../config/site";
import { LocationDefinition } from "../types";
import { MapPin, Building, Globe, Send, ShieldCheck, Map, ArrowRight } from "lucide-react";

export default function LocalSEO() {
  const [selectedSlug, setSelectedSlug] = useState<string>("centre-ville");

  const activeLoc = locationsData.find(l => l.slug === selectedSlug) || locationsData[0];

  return (
    <section id="liege-local" className="py-24 bg-bg-dark border-b border-border-dark relative">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-neon-green/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-green">
              <MapPin size={12} />
              <span>ZONE D'INTERVENTION LIÉGEOISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              Ancrage Local <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green">à Liège</span>
              <span className="text-neon-green">.</span>
            </h2>
          </div>
          <p className="max-w-md text-text-muted text-xs sm:text-sm leading-relaxed">
            Consultez mes points de présence et de collaboration physiques en région liégeoise (Wallonie, Belgique). Ateliers et workshops sur site.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Region selection tabs */}
              <div className="flex flex-wrap gap-2 border-b border-border-dark/60 pb-4">
                {locationsData.map(loc => (
                  <button
                    key={loc.slug}
                    onClick={() => setSelectedSlug(loc.slug)}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase font-bold tracking-widest rounded border transition-all cursor-pointer ${
                      selectedSlug === loc.slug
                        ? "border-neon-green bg-neon-green/10 text-white font-black"
                        : "border-border-dark bg-bg-card text-text-muted hover:text-white"
                    }`}
                  >
                    {loc.name.replace(" de Liège", "")}
                  </button>
                ))}
              </div>

              {/* Target Location Detailed Summary */}
              <div className="space-y-4 animate-slide-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-neon-green/10 text-neon-green border border-neon-green/20 flex items-center justify-center">
                    <Building size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white">{activeLoc.h1}</h3>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                      Code Postal: {activeLoc.postalCode} • Focus SEO sémantique: <strong className="text-neon-green">{activeLoc.keywordFocus}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans pt-2">
                  {activeLoc.description}
                </p>

                {/* Local micro hub card details */}
                <div className="p-4 rounded bg-bg-card border border-border-dark space-y-2">
                  <span className="font-mono text-[9px] text-[#34d399] uppercase tracking-widest font-bold block">Pôle technologique / Coworking de référence:</span>
                  <div className="text-xs text-white font-bold flex items-center gap-1.5">
                    <Globe size={14} className="text-neon-green" />
                    {activeLoc.localHub}
                  </div>
                </div>
              </div>
            </div>

            {/* Local CTA action block */}
            <div className="p-5 rounded bg-bg-card border border-border-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-text-muted uppercase font-bold block">Prendre rendez-vous</span>
                <p className="text-xs text-white font-sans font-bold">Votre entreprise est située à {activeLoc.name}?</p>
              </div>
              <a
                href="#contact"
                className="py-2 px-5 bg-neon-green hover:bg-neon-green/90 font-mono font-bold text-xs uppercase text-bg-dark rounded shadow-md transition-all self-start flex items-center gap-1.5 cursor-pointer"
              >
                Let's Meet
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right panel: Pulsing SVG Map Grid (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center bg-bg-card border border-border-dark rounded-lg p-6 min-h-[300px]">
            <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />
            
            {/* Holographic simulated geographic layout grid */}
            <div className="w-full h-full relative flex flex-col justify-between">
              <div className="flex justify-between font-mono text-[9px] text-text-muted border-b border-border-dark pb-2 mb-2 w-full uppercase">
                <span><Map size={10} className="inline mr-1" /> Vectorial Map Grid</span>
                <span>LIÈGE COORD: 50.6326 / 5.5797</span>
              </div>

              {/* Pulsing visual nodes plotted on styled SVG network */}
              <div className="flex-grow flex items-center justify-center relative min-h-[220px]">
                <svg viewBox="0 0 100 100" className="w-full max-w-[220px] stroke-border-dark/60 opacity-[0.6] absolute pointer-events-none">
                  {/* Connecting lines for regional tech cluster */}
                  <line x1="50" y1="50" x2="30" y2="40" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="70" y2="80" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="20" y2="75" strokeWidth="0.5" />
                  
                  {/* Outer circle rings */}
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="0.25" strokeDasharray="2,2" />
                  <circle cx="50" cy="50" r="25" fill="none" strokeWidth="0.25" strokeDasharray="3,3" />
                </svg>

                {/* 1. Centre-Ville Node (Center) */}
                <button
                  onClick={() => setSelectedSlug("centre-ville")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer"
                >
                  <span className="relative flex h-5 w-5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedSlug === "centre-ville" ? "bg-neon-green" : "bg-neon-blue"}`} />
                    <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[9px] font-mono text-bg-dark font-black ${selectedSlug === "centre-ville" ? "bg-neon-green" : "bg-neon-blue"}`}>
                      1
                    </span>
                  </span>
                  <span className="absolute left-6 top-1 px-1.5 py-0.5 rounded bg-bg-dark/80 border border-border-dark text-[9px] font-mono text-white whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                    Centre-ville
                  </span>
                </button>

                {/* 2. Guillemins Node (Slightly bottom-left of center) */}
                <button
                  onClick={() => setSelectedSlug("guillemins")}
                  className="absolute bottom-[35%] left-[30%] z-20 group focus:outline-none cursor-pointer"
                >
                  <span className="relative flex h-5 w-5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedSlug === "guillemins" ? "bg-neon-green" : "bg-neon-blue"}`} />
                    <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[9px] font-mono text-bg-dark font-black ${selectedSlug === "guillemins" ? "bg-neon-green" : "bg-neon-blue"}`}>
                      2
                    </span>
                  </span>
                  <span className="absolute right-6 top-1 px-1.5 py-0.5 rounded bg-bg-dark/80 border border-border-dark text-[9px] font-mono text-white whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                    Guillemins
                  </span>
                </button>

                {/* 3. Herstal Node (Slightly top-right of center) */}
                <button
                  onClick={() => setSelectedSlug("herstal")}
                  className="absolute top-[25%] right-[25%] z-20 group focus:outline-none cursor-pointer"
                >
                  <span className="relative flex h-5 w-5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedSlug === "herstal" ? "bg-neon-green" : "bg-neon-blue"}`} />
                    <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[9px] font-mono text-bg-dark font-black ${selectedSlug === "herstal" ? "bg-neon-green" : "bg-neon-blue"}`}>
                      3
                    </span>
                  </span>
                  <span className="absolute left-6 top-1 px-1.5 py-0.5 rounded bg-bg-dark/80 border border-border-dark text-[9px] font-mono text-white whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                    Herstal
                  </span>
                </button>

                {/* 4. Sart-Tilman Node (Slightly bottom-left/science park) */}
                <button
                  onClick={() => setSelectedSlug("sart-tilman")}
                  className="absolute bottom-[15%] left-[45%] z-20 group focus:outline-none cursor-pointer"
                >
                  <span className="relative flex h-5 w-5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedSlug === "sart-tilman" ? "bg-neon-green" : "bg-neon-blue"}`} />
                    <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[9px] font-mono text-bg-dark font-black ${selectedSlug === "sart-tilman" ? "bg-neon-green" : "bg-neon-blue"}`}>
                      4
                    </span>
                  </span>
                  <span className="absolute left-6 top-1 px-1.5 py-0.5 rounded bg-bg-dark/80 border border-border-dark text-[9px] font-mono text-white whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                    Sart-Tilman
                  </span>
                </button>
              </div>

              <div className="p-2.5 rounded bg-bg-dark/60 border border-border-dark/60 text-[9px] font-mono text-text-muted flex items-start gap-1.5">
                <ShieldCheck size={12} className="text-neon-green flex-shrink-0" />
                <span>Interventions garanties sous 4 heures en région liégeoise (SLA réactivité).</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
