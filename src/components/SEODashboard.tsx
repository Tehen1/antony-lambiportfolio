/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Inbox, 
  Globe, 
  Mail, 
  Tv, 
  ChevronRight, 
  Loader2,
  Lock
} from "lucide-react";
import { SEOMetric } from "../types";

export default function SEODashboard() {
  const [urlInput, setUrlInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  // Default SEO metrics mockup for initial state
  const keywordRankings = [
    { keyword: "développeur blockchain liège", pos: 1, volume: 180, trend: "+2", path: "/liege/centre-ville" },
    { keyword: "smart contract expert belgium", pos: 3, volume: 290, trend: "+1", path: "/services/smart-contracts-solidity-liege" },
    { keyword: "développeur web3 liège", pos: 1, volume: 240, trend: "0", path: "/liege/guillemins" },
    { keyword: "audit sécurité solidity", pos: 8, volume: 410, trend: "+11", path: "/services/audit-smart-contracts-expert" },
    { keyword: "ai agents automation freelance", pos: 12, volume: 550, trend: "+4", path: "/" }
  ];

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput || !urlInput.includes(".")) {
      setErrorNotice("Veuillez saisir un URL complet valide (p.ex. clientwebsite.com).");
      return;
    }

    setErrorNotice("");
    setAuditLoading(true);
    setAuditResult(null);

    try {
      const resp = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Impossible d'initier le crawling IA.");
      }

      const data = await resp.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorNotice(err.message || "Échec de connexion au micro-agent SEO.");
    } finally {
      setAuditLoading(false);
    }
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setLeadCaptured(true);
    setEmailInput("");
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Audit Generator / Lead Magnet */}
      <div className="bg-bg-card border border-border-dark rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[90px] font-black leading-none pointer-events-none text-neon-blue select-none">
          SEO
        </div>
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <h3 className="text-xl font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Globe size={18} className="text-neon-blue animate-spin" />
            AI SEO Auditor & Audit de Faisabilité (Lighthouse AI)
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Saisissez l'adresse URL de votre projet ou d'un concurrent d'acquisition. Notre robot simulera un crawl technique et utilisera <strong className="text-white">Gemini 3.5 Flash</strong> pour dresser des piliers sémantiques.
          </p>

          <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              placeholder="votre-projet-web.be"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={auditLoading}
              className="flex-1 bg-bg-dark border border-border-dark rounded px-4 py-2.5 text-xs text-white placeholder-text-muted focus:border-neon-blue outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={auditLoading}
              className="px-6 py-2.5 bg-neon-blue hover:bg-neon-blue/90 text-bg-dark font-mono font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition flex items-center justify-center gap-1.5 shrink-0"
            >
              {auditLoading ? <Loader2 size={12} className="animate-spin" /> : null}
              {auditLoading ? "Analyse en cours..." : "Lancer l'Audit SEO"}
            </button>
          </form>

          {errorNotice && (
            <p className="text-neon-pink font-mono text-xs">{errorNotice}</p>
          )}
        </div>

        {/* AI Lead Results Render */}
        {auditResult && (
          <div className="mt-8 border-t border-border-dark pt-6 space-y-6 animate-slide-in">
            <div className="grid sm:grid-cols-3 gap-4 text-center font-mono">
              <div className="p-3 bg-bg-dark rounded border border-border-dark flex flex-col justify-center items-center">
                <span className="text-xs text-text-muted uppercase tracking-wider">Lighthouse Perf</span>
                <span className="text-xl font-black text-neon-green mt-1">{auditResult.performanceScore}%</span>
              </div>
              <div className="p-3 bg-bg-dark rounded border border-border-dark flex flex-col justify-center items-center">
                <span className="text-xs text-text-muted uppercase tracking-wider">SEO Score</span>
                <span className="text-xl font-black text-neon-blue mt-1">{auditResult.seoScore}%</span>
              </div>
              <div className="p-3 bg-bg-dark rounded border border-border-dark flex flex-col justify-center items-center">
                <span className="text-xs text-text-muted uppercase tracking-wider">Best Practices</span>
                <span className="text-xl font-black text-neon-purple mt-1">{auditResult.bestPractices}%</span>
              </div>
            </div>

            <div className="p-4 bg-bg-dark rounded border border-border-dark font-mono text-xs space-y-1.5 text-text-muted relative">
              <span className="text-[10px] text-neon-blue uppercase font-bold tracking-widest block border-b border-border-dark/60 pb-1 mb-2">Simulated Core Web Vitals (Edge Crawl)</span>
              <div>LCP : <strong className="text-white">{auditResult.lcp}</strong></div>
              <div>FID : <strong className="text-white">{auditResult.fid}</strong></div>
              <div>CLS : <strong className="text-white">{auditResult.cls}</strong></div>
            </div>

            <div className="p-4 bg-bg-dark rounded border border-border-dark/60 space-y-3">
              <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider">Analyse des Lacunes Techniques</h4>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">{auditResult.analysis}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-4 bg-bg-dark rounded border border-border-dark space-y-3">
                <h4 className="text-[10px] font-bold text-neon-purple uppercase tracking-widest block border-b border-border-dark/60 pb-1">Silos recommandés</h4>
                <ul className="space-y-1.5 text-text-muted">
                  {auditResult.pillars.map((pil: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <ChevronRight size={12} className="text-neon-purple mt-0.5" />
                      <span>{pil}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-bg-dark rounded border border-border-dark space-y-3">
                <h4 className="text-[10px] font-bold text-neon-blue uppercase tracking-widest block border-b border-border-dark/60 pb-1">Actions Correctives AI</h4>
                <ul className="space-y-1.5 text-text-muted">
                  {auditResult.recommendations.map((reco: string, rIdx: number) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <CheckCircle size={12} className="text-neon-green mt-0.5" />
                      <span>{reco}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA capture email form */}
            <div className="p-6 rounded bg-gradient-to-r from-neon-blue/15 to-neon-purple/15 border border-neon-blue/30 relative overflow-hidden">
              {!leadCaptured ? (
                <form onSubmit={handleCaptureLead} className="max-w-xl mx-auto text-center space-y-4">
                  <h4 className="font-display font-black text-white text-sm uppercase tracking-wider">🔒 Débloquer l'Audit PDF Rédactionnel Complet & Plan de Mots-Clés rédigé</h4>
                  <p className="text-xs text-text-muted font-sans leading-relaxed">
                    Saisissez votre e-mail d'entreprise. Nous vous ferons parvenir le rapport SEO rédigé, ainsi que le diagramme d'architecture sémantique formaté pour votre CMS.
                  </p>
                  <div className="flex gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="votre-nom@pme.be"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-grow bg-bg-dark border border-border-dark rounded px-3 py-1.5 text-xs text-white placeholder-text-muted focus:border-neon-blue outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-1.5 bg-neon-green text-bg-dark font-mono font-bold text-xs uppercase rounded cursor-pointer hover:bg-neon-green/90 transition-all shadow-md"
                    >
                      Recevoir le Plan
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-2 animate-slide-in">
                  <CheckCircle size={24} className="mx-auto text-neon-green animate-bounce" />
                  <h4 className="font-display font-medium text-white text-sm uppercase tracking-wider">Plan de Mots-Clés Envoyé!</h4>
                  <p className="text-xs text-text-muted font-sans">
                    Le rapport complet d'analyse sémantique a été transmis à votre adresse e-mail. À bientôt pour transformer vos metrics!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. SEO Key Metrics Grid */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Core web vitals metrics cards (5 cols) */}
        <div className="md:col-span-4 bg-bg-card border border-border-dark rounded-lg p-5 flex flex-col justify-between font-mono space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest block">SEOBiz Auditor Status</span>
            <h4 className="text-xs font-black text-white">CORE WEB VITALS METRICS</h4>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-bg-dark border border-border-dark flex justify-between items-center rounded">
              <span className="text-text-muted">Largest Contentful Paint</span>
              <span className="text-neon-green font-bold">LCP : 1.4s</span>
            </div>
            <div className="p-3 bg-bg-dark border border-border-dark flex justify-between items-center rounded">
              <span className="text-text-muted">First Input Delay</span>
              <span className="text-neon-green font-bold">FID : 28ms</span>
            </div>
            <div className="p-3 bg-bg-dark border border-border-dark flex justify-between items-center rounded">
              <span className="text-text-muted">Cumulative Layout Shift</span>
              <span className="text-neon-green font-bold">CLS : 0.01</span>
            </div>
          </div>

          <div className="p-3 rounded bg-bg-dark border border-border-dark text-[9px] text-[#10b981] flex items-center gap-1.5">
            <CheckCircle size={12} className="flex-shrink-0 text-neon-green" />
            <span>Tous les CWV répondent au standard strict Google Green de 2026.</span>
          </div>
        </div>

        {/* Organic Traffic Area Graph (8 cols) */}
        <div className="md:col-span-8 bg-bg-card border border-border-dark rounded-lg p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start border-b border-border-dark/60 pb-3 mb-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">Web Analytics</span>
              <h4 className="text-xs font-black text-white uppercase font-display tracking-widest flex items-center gap-1">
                <TrendingUp size={14} className="text-neon-green" />
                Silo Growth: SEOBiz Organic Performance Trend 2026
              </h4>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-neon-green font-bold block">+34.8% MoM</span>
              <span className="text-[9px] text-text-muted uppercase">Search Console</span>
            </div>
          </div>

          {/* Clean, fully custom responsive SVG Area Chart */}
          <div className="h-44 w-full relative">
            <svg viewBox="0 0 500 150" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cyber-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid-lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1b1b22" strokeDasharray="3,3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#1b1b22" strokeDasharray="3,3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#1b1b22" strokeDasharray="3,3" />
              
              {/* Area layout */}
              <path
                d="M 10,130 C 80,110 120,95 180,75 C 240,55 320,45 380,30 C 440,15 480,10 490,5 L 490,140 L 10,140 Z"
                fill="url(#cyber-area-grad)"
              />
              
              {/* Spline line layout */}
              <path
                d="M 10,130 C 80,110 120,95 180,75 C 240,55 320,45 380,30 C 440,15 480,10 490,5"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_#00f0ff]"
              />

              {/* Dynamic plotting vertex nodules */}
              <circle cx="10" cy="130" r="3.5" fill="#00f0ff" />
              <circle cx="180" cy="75" r="3.5" fill="#00f0ff" />
              <circle cx="380" cy="30" r="3.5" fill="#00f0ff" />
              <circle cx="490" cy="5" r="3.5" fill="#00f0ff" />
            </svg>

            <div className="absolute left-2 top-2 font-mono text-[8px] text-text-muted uppercase">6,000 Visitors</div>
            <div className="absolute left-2 top-11 font-mono text-[8px] text-text-muted uppercase">3,500 Visitors</div>
            <div className="absolute left-2 bottom-8 font-mono text-[8px] text-text-muted uppercase">1,500 Visitors</div>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-text-muted uppercase pt-4 border-t border-border-dark/60">
            <span>Jan 2026</span>
            <span>Fév 2026</span>
            <span>Mar 2026</span>
            <span>Avr 2026</span>
            <span>Mai 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Keywords list tracker table */}
      <div className="bg-bg-card border border-border-dark rounded-lg p-5 font-mono text-xs">
        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Search size={14} className="text-neon-blue" />
          ACTIVE TARGET SEARCH CONSOLE POSITIONS
        </h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-dark text-text-muted text-[10px] uppercase">
                <th className="py-2.5">Mot Clé Target</th>
                <th className="py-2.5">Position Google</th>
                <th className="py-2.5">Volume (Mensuel)</th>
                <th className="py-2.5">Tendance</th>
                <th className="py-2.5">Silo Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark/40 text-text-muted">
              {keywordRankings.map((key, kIdx) => (
                <tr key={kIdx} className="hover:bg-bg-dark/40 transition">
                  <td className="py-3 text-white font-bold">{key.keyword}</td>
                  <td className="py-3 text-neon-green">#{key.pos}</td>
                  <td className="py-3">{key.volume} views</td>
                  <td className="py-3">{key.trend}</td>
                  <td className="py-3 text-neon-blue font-light">{key.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
