/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldAlert, Loader2, Sparkles, User, Mail, Building, Plus } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "< 5k€",
    message: ""
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  // Load Cloudflare Turnstile script and expose callbacks globally
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Expose callbacks globally for Turnstile
    (window as any).handleTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
      setIsVerifying(false);
    };

    (window as any).handleTurnstileError = () => {
      setTurnstileToken(null);
      setIsVerifying(false);
      setErrorNotice("Échec de la vérification Turnstile. Veuillez réessayer.");
    };

    return () => {
      document.head.removeChild(script);
      delete (window as any).handleTurnstileSuccess;
      delete (window as any).handleTurnstileError;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorNotice("Veuillez remplir tous les champs obligatoires (Nom, Email, Message).");
      return;
    }

    if (!turnstileToken) {
      setErrorNotice("Veuillez valider la vérification Cloudflare Turnstile.");
      return;
    }

    setErrorNotice("");
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "< 5k€",
          message: ""
        });
        setTurnstileToken(null);
      } else {
        setErrorNotice(result.error || "Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      setErrorNotice("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const budgetOptions = ["< 5k€", "5-15k€", "15-50k€", "50k€+"];

  return (
    <section id="contact" className="py-24 bg-bg-light border-b border-border-dark relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-green">
            <Plus size={12} />
            <span>CONTACT & COMMANDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Démarrer un <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green">Projet</span>
            <span className="text-neon-green">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Expliquez-moi votre idée. Je vous ferai parvenir une estimation de budget sémantique et un plan d'architecture sous 24 heures.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-bg-card border border-border-dark rounded-lg p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
          
          {success ? (
            <div className="text-center py-12 space-y-4 animate-slide-in">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30 animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-black font-display text-white uppercase tracking-wider">Demande Enregistrée!</h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                Votre lead d'acquisition a été capturé de manière cryptographique et synchronisé avec mes notifications. Je prendrai contact sous 24 heures ouvrées.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 border border-border-dark text-white rounded text-xs font-mono hover:text-neon-green hover:border-neon-green transition"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs text-white">
              
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Votre Nom *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Antony Lambi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-bg-dark border border-border-dark rounded px-4 py-2.5 pl-10 text-xs text-white outline-none focus:border-neon-blue transition"
                    />
                    <User size={14} className="absolute left-3.5 top-3 text-text-muted" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Adresse E-mail *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="nom@entreprise.be"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-bg-dark border border-border-dark rounded px-4 py-2.5 pl-10 text-xs text-white outline-none focus:border-neon-blue transition"
                    />
                    <Mail size={14} className="absolute left-3.5 top-3 text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Company */}
                <div className="space-y-2">
                  <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Société (Optionnel)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="SaaS / Startup / PME"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-bg-dark border border-border-dark rounded px-4 py-2.5 pl-10 text-xs text-white outline-none focus:border-neon-blue transition"
                    />
                    <Building size={14} className="absolute left-3.5 top-3 text-text-muted" />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Budget Estimé *</label>
                  <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`py-2 text-[10px] tracking-wide font-black uppercase text-center rounded border transition-all cursor-pointer ${
                          formData.budget === opt
                            ? "border-neon-green bg-neon-green/15 text-white"
                            : "border-border-dark bg-bg-dark text-text-muted hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-text-muted text-[10px] uppercase font-bold tracking-widest block">Description des Spécifications *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Expliquez brièvement votre idée technique ou vos requis Solidity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-bg-dark border border-border-dark rounded p-4 font-sans text-xs sm:text-sm text-white outline-none focus:border-neon-blue resize-none transition"
                />
              </div>

              {/* Cloudflare Turnstile Widget */}
              <div className="p-4 bg-bg-dark rounded border border-border-dark/60 flex items-center justify-between font-sans">
                <div className="flex items-center gap-3">
                  <div 
                    className="cf-turnstile"
                    data-sitekey="0x4AAAAAADaOEqUHkguzSOG-"
                    data-callback="handleTurnstileSuccess"
                    data-error-callback="handleTurnstileError"
                  ></div>
                  <div className="text-xs">
                    <span className="text-white block font-bold font-mono text-[10px] tracking-widest">CLOUDFLARE TURNSTILE</span>
                    <span className="text-text-muted text-[10px]">Vérification anti-bot</span>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono text-text-muted tracking-tight">WAF LEVEL-3</span>
              </div>

              {errorNotice && (
                <p className="text-neon-pink font-mono text-xs">{errorNotice}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-blue text-bg-dark tracking-widest font-black uppercase text-xs rounded hover:scale-[1.01] transform transition shadow-[0_0_12px_rgba(57,255,20,0.2)] flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {submitting ? "Traitement de l'envoi..." : "Soumettre la proposition"}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
