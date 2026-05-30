/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Cpu, 
  HelpCircle, 
  FileText, 
  CheckCircle, 
  ShieldAlert, 
  Clock, 
  Euro, 
  Sparkles, 
  Loader2, 
  Terminal, 
  RotateCcw,
  Network
} from "lucide-react";
import { AIAdvisorResponse } from "../types";

export default function AIAdvisor() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<AIAdvisorResponse | null>(null);
  const [errorText, setErrorText] = useState("");
  const [terminalCheckpoints, setTerminalCheckpoints] = useState<string[]>([]);

  const handleConsultAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descriptionInput || descriptionInput.trim().length < 10) {
      setErrorText("La description saisie est trop succinte. Veuillez détailler votre concept (minimum 10 caractères).");
      return;
    }

    setErrorText("");
    setLoading(true);
    setProposal(null);
    setTerminalCheckpoints([]);

    const runCheckpoints = async () => {
      const checkpoints = [
        "1. ANALYSE SÉMANTIQUE : Validation de la cohérence de l'intrigue...",
        "2. GATEWAY PROXY : Sécurisation de l'acheminement réseau...",
        "3. COGNITIVE COMPILING : Interrogation de Gemini 3.5 Flash...",
        "4. SCHÉMATISATION : Évaluation des standards de gas et AccessControl...",
        "5. BLUEPRINT READY : Parsing de la structure de données JSON..."
      ];

      for (let i = 0; i < checkpoints.length; i++) {
        setTerminalCheckpoints(prev => [...prev, checkpoints[i]]);
        await new Promise(r => setTimeout(r, 600));
      }
    };

    try {
      // Run visual progression first, then execute real API fetch
      const [apiResponse] = await Promise.all([
        fetch("/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: descriptionInput })
        }),
        runCheckpoints()
      ]);

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Une erreur est survenue lors de l'exécution du LLM.");
      }

      const data = await apiResponse.json();
      setProposal(data);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Échec d'accès au micro-agent IA. Veuillez retenter.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDescriptionInput("");
    setProposal(null);
    setTerminalCheckpoints([]);
    setErrorText("");
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Introduction Card */}
      <div className="bg-bg-card border border-border-dark rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-[90px] font-black leading-none pointer-events-none text-neon-purple select-none">
          AI
        </div>

        <div className="max-w-2xl space-y-4">
          <h3 className="text-xl font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Cpu size={18} className="text-neon-purple animate-pulse" />
            AI Project Advisor - Studio d'Estimation et d'Architecture
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Décrivez votre idée logicielle (p.ex. <em className="text-white">"Un système d'art NFT avec redevances automatiques et stockage décentralisé"</em> ou <em className="text-white">"Un jeton de récompenses d'entreprise géré on-chain"</em>) et laissez notre système d'Intelligence Artificielle modéliser l'architecture technique idéale de votre dApp.
          </p>
        </div>

        {/* Advisor Input Form */}
        {!proposal && !loading && (
          <form onSubmit={handleConsultAdvisor} className="mt-6 space-y-4 font-mono text-xs">
            <div className="space-y-2">
              <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Décrivez vos spécifications de projet</label>
              <textarea
                required
                rows={4}
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Exemple: J'aimerais développer un bot d'arbitrage de tokens ERC-20 inter-DEX sur Polygon zkEVM, avec une interface de monitoring web sécurisée par Row Level Security..."
                className="w-full bg-bg-dark border border-border-dark rounded p-4 font-sans text-xs sm:text-sm text-white placeholder-text-muted focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none resize-none transition"
              />
            </div>

            {errorText && (
              <p className="text-neon-pink text-xs font-mono">{errorText}</p>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-neon-purple hover:bg-neon-purple/90 text-white font-bold font-mono tracking-wider text-xs uppercase rounded cursor-pointer transition flex items-center gap-2 shadow-[0_0_12px_rgba(191,0,255,0.2)]"
            >
              <Sparkles size={14} className="animate-spin" />
              Générer le Blueprint IA
            </button>
          </form>
        )}

        {/* Loading Terminal logs container */}
        {loading && (
          <div className="mt-6 p-4 bg-bg-dark border border-border-dark rounded font-mono text-[10px] space-y-2.5 animate-slide-in">
            <div className="flex justify-between items-center text-text-muted border-b border-border-dark/60 pb-1 w-full uppercase">
              <span>Robotic Compiler Status</span>
              <span className="flex items-center gap-1">
                <Loader2 size={10} className="animate-spin" />
                Processing
              </span>
            </div>
            
            <div className="space-y-1 text-text-muted">
              {terminalCheckpoints.map((cp, idx) => (
                <div key={idx} className="text-neon-blue animate-pulse">
                  &gt;&gt; {cp}
                </div>
              ))}
            </div>
            
            <p className="pt-2 text-[10px] text-text-muted italic">Modélisation de l'économie de jetons et des structures de sécurité cryptographiques...</p>
          </div>
        )}

        {/* Proposed results wrapper */}
        {proposal && (
          <div className="mt-8 border-t border-border-dark pt-6 space-y-6 animate-slide-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[9px] text-neon-purple uppercase tracking-widest block font-bold">Projet Modélisé</span>
                <h4 className="text-xl font-bold text-white font-display">{proposal.projectName}</h4>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-border-dark rounded text-xs font-mono text-text-muted hover:text-white hover:border-neon-purple transition-all flex items-center gap-1.5 self-start cursor-pointer"
              >
                <RotateCcw size={12} />
                Nouvelle Consultation
              </button>
            </div>

            {/* Estimated cost / time scale badge row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-bg-dark rounded border border-border-dark flex items-center gap-3">
                <div className="p-2.5 rounded bg-neon-purple/10 text-neon-purple">
                  <Euro size={16} />
                </div>
                <div className="font-mono">
                  <span className="text-text-muted block text-[9px] uppercase">Enveloppe budgétaire estimée</span>
                  <span className="text-neon-green font-bold text-sm sm:text-base">{proposal.costEstimation}</span>
                </div>
              </div>

              <div className="p-4 bg-bg-dark rounded border border-border-dark flex items-center gap-3">
                <div className="p-2.5 rounded bg-neon-blue/10 text-neon-blue">
                  <Clock size={16} />
                </div>
                <div className="font-mono">
                  <span className="text-text-muted block text-[9px] uppercase">Calendrier d'ingénierie</span>
                  <span className="text-neon-blue font-bold text-sm sm:text-base">{proposal.timelineEstimate}</span>
                </div>
              </div>
            </div>

            {/* Recommended stack list */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest font-bold block">Réseaux & Frameworks suggérés</span>
              <div className="flex flex-wrap gap-1.5">
                {proposal.suggestedStack.map(st => (
                  <span key={st} className="font-mono text-[10px] text-neon-green bg-neon-green/10 border border-neon-green/20 px-2.5 py-1 rounded">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Security Audit Details */}
            <div className="p-4 bg-bg-dark border border-neon-pink/20 rounded font-mono text-xs space-y-2">
              <span className="text-[10px] font-bold text-neon-pink uppercase tracking-widest block border-b border-border-dark/60 pb-1 flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-neon-pink animate-pulse" />
                Vérification Préactive de la Sécurité
              </span>
              <p className="text-text-muted leading-relaxed font-sans text-xs sm:text-sm">{proposal.securityReview}</p>
            </div>

            {/* Simulated Architecture flowchart structure */}
            <div className="p-4 bg-bg-dark border border-neon-blue/20 rounded font-mono text-xs space-y-3">
              <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest block border-b border-border-dark/60 pb-1 flex items-center gap-1.5">
                <Network size={14} className="text-neon-blue" />
                Diagramme de flux d'architecture sémantique
              </span>
              <p className="text-text-muted leading-relaxed font-sans text-xs sm:text-sm">{proposal.architectureDetails}</p>
            </div>

            {/* Lead capture message CTA */}
            <div className="p-5 rounded bg-bg-card border border-border-dark/80 text-center space-y-3">
              <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">Ce blueprint technique autonome vous convient-il ?</h5>
              <p className="text-xs text-text-muted font-sans max-w-lg mx-auto">
                Antony Lambi est disponible à Liège ou à distance pour matérialiser cette architecture d'élite en un code Solidity auditable et performant.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 py-2 px-5 rounded bg-neon-purple text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-neon-purple/90 transition-all cursor-pointer mt-1"
              >
                Planifier un call technique
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
