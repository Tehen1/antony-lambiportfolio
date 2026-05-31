/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import TechStack from "./components/TechStack";
import Portfolio from "./components/Portfolio";
import BlockchainShowcase from "./components/BlockchainShowcase";
import SEODashboard from "./components/SEODashboard";
import AIAdvisor from "./components/AIAdvisor";
import LocalSEO from "./components/LocalSEO";
import SEOPrompts from "./components/SEOPrompts";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import SiteJsonLd from "./components/SiteJsonLd";
import OllamaChat from "./components/OllamaChat";
import { ArrowLeft, Globe, Settings, TrendingUp, HelpCircle } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "seo-dashboard">("home");

  // Handle browser back state or internal anchors
  const navigateToSection = (sectionId: string) => {
    setActiveView("home");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    // Scroll to top on view modification
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  return (
    <div className="min-h-screen bg-bg-dark text-[#F5F5F4] font-sans selection:bg-neon-blue/30 selection:text-white relative overflow-hidden">
      <SiteJsonLd />
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#7c3aed] rounded-full blur-[160px] opacity-[0.12] pointer-events-none z-0" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#00f0ff] rounded-full blur-[160px] opacity-[0.12] pointer-events-none z-0" />
      
      {/* 1. Global Navigation Frame */}
      <Navbar 
        activeSection={activeView === "home" ? "hero" : "seo-dashboard"} 
        onNavigate={navigateToSection}
        onOpenAdvisor={() => navigateToSection("ai-advisor-section")}
        onOpenSEODashboard={() => setActiveView("seo-dashboard")}
      />

      {/* Main Container Switch */}
      {activeView === "home" ? (
        <main className="animate-fade-in">
          {/* Hero Section */}
          <Hero 
            onNavigate={navigateToSection} 
            onOpenAdvisor={() => navigateToSection("ai-advisor-section")} 
          />
          
          {/* About Section */}
          <About />

          {/* Services / Expertise */}
          <Expertise onNavigate={navigateToSection} />

          {/* Tech Stack Bento Category Grid */}
          <TechStack />

          {/* Portfolio & Built Cases & Interactive Web3 dApp modules */}
          <Portfolio 
            onOpenSEODashboard={() => setActiveView("seo-dashboard")} 
            onNavigate={navigateToSection}
          />

          {/* Interactive Web3 Sandbox (NFT Mint, AMM DEX Swap, MultiChain Gas Price tracker) */}
          <BlockchainShowcase />

          {/* AI Project Advisor Generator Panel */}
          <section id="ai-advisor-section" className="py-24 bg-bg-dark border-b border-border-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-purple uppercase">
                  <Settings size={12} className="text-neon-purple animate-spin" />
                  Orchestrateurs Cognitifs
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                  Conseils d'Élite <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">sur Mesure</span>
                  <span className="text-neon-purple">.</span>
                </h2>
                <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
                  Bâtissez vos plans techniques. Décrivez vos requis de protocole ci-dessous pour déclencher une modélisation instantanée d'architecture système via Gemini.
                </p>
              </div>
              <AIAdvisor />
            </div>
          </section>

          {/* Local Geographic Anchor - Liège Area SEO */}
          <LocalSEO />

          {/* Premium SEOPrompts Copy deck Hub */}
          <SEOPrompts />

          {/* rotating feedback client trust builder */}
          <Testimonials />

          {/* FAQ Accordion Module */}
          <FAQ />

          {/* Contact Input Form Container */}
          <ContactForm />
        </main>
      ) : (
        /* 2. Fullscreen Dedicated Workspace View: SEO Performance & CWV Tracker Dashboard */
        <main className="py-24 bg-bg-light min-h-[90vh] relative animate-slide-in">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Dashboard Navigation Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-border-dark/60">
              <div className="space-y-1.5 text-left">
                <button
                  onClick={() => setActiveView("home")}
                  className="font-mono text-xs text-text-muted hover:text-neon-blue transition-colors flex items-center gap-1 cursor-pointer mb-2 uppercase tracking-wide group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Retour au Showcase
                </button>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={20} className="text-neon-blue" />
                  <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight uppercase">
                    SEOBiz Analytics Studio
                  </h1>
                </div>
                <p className="text-text-muted text-xs font-sans">
                  Workplace d'analyse de mots-clés de référencement, performance d'indexation, et audit d'acquisition en Belgique.
                </p>
              </div>

              <div className="font-mono text-xs flex gap-2 items-center text-neon-green uppercase bg-neon-green/10 border border-neon-green/25 px-3.5 py-2.5 rounded">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
                SYSTEM RUNNING STATE: 100% SECURE
              </div>
            </div>

            {/* Render Dashboard Widget Contents */}
            <SEODashboard />
          </div>
        </main>
      )}

      {/* 3. Global Legal / Corporate Footer */}
      <Footer />

      {/* 4. Ollama Chat Widget */}
      <OllamaChat />
    </div>
  );
}
