/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  tags: string[];
  avatarColors: { from: string; to: string };
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Sylvain Dubois",
    role: "CTO",
    company: "DeFiLabs Paris",
    quote: "Antony a audité notre protocole d'assurance décentralisé sur Polygon. Il a détecté une vulnérabilité critique de réentrance liée au calcul d'indexation de nos oracles avant notre déploiement principal. Son professionnalisme et la clarté de son rapport d'audit ont sauvé notre capital d'amorçage.",
    rating: 5,
    tags: ["Smart Contract Audit", "Solidity", "Securité"],
    avatarColors: { from: "#00F0FF", to: "#7C3AED" },
    initials: "SD"
  },
  {
    id: "test-2",
    author: "Justine Meurisse",
    role: "Directrice Innovation",
    company: "Belgique Logistique AI",
    quote: "Nous avons collaboré avec Antony pour l'automatisation cognitive de nos centres de tri près de Liège. Son agent IA autonome orchestré par LLM a réduit nos temps de traitement de feuilles de route de 40 %, tout en maintenant une agilité technique exemplaire lors des phases de tests.",
    rating: 5,
    tags: ["LLM Orchestration", "Agents IA", "Belgique"],
    avatarColors: { from: "#39FF14", to: "#00F0FF" },
    initials: "JM"
  },
  {
    id: "test-3",
    author: "Marcus Thorne",
    role: "Founder",
    company: "Solana Walkers (FixieRun Partner)",
    quote: "L'expertise technique d'Antony sur la stack Web3 est impressionnante. Il a conçu et déployé les smart contracts de notre Move-to-Earn de bout en bout, avec une rigueur absolue sur la cryptographie économique et la rapidité d'indexation. Une recommandation les yeux fermés.",
    rating: 5,
    tags: ["Solana Web3", "Tokenomics", "Move-to-Earn"],
    avatarColors: { from: "#FF3B3B", to: "#7C3AED" },
    initials: "MT"
  },
  {
    id: "test-4",
    author: "Amélie Peeters",
    role: "Product Manager",
    company: "AuraMedia Group",
    quote: "Son approche du SEO technique combinée à l'analyse algorithmique de notre arborescence a propulsé notre acquisition de leads. Nous sommes passés de 25k à plus de 130k de trafic mensuel ciblé grâce à ses recommandations sur l'indexation de nos millions d'URLs.",
    rating: 5,
    tags: ["SEO Technique", "Indexation", "Structure"],
    avatarColors: { from: "#facc15", to: "#FF3B3B" },
    initials: "AP"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Automatic Rotation interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  const selectTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-rotation when user manually interacts
  };

  const current = TESTIMONIALS[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-bg-dark border-b border-border-dark relative overflow-hidden">
      {/* Abstract geometric mesh decorations */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-purple">
            <MessageSquare size={12} className="text-neon-purple" />
            <span>RETOURS EXPÉRIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Confiance & <span className="text-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">Validation Client</span>
            <span className="text-neon-purple">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Découvrez les retours de fondateurs de start-ups de la finance décentralisée, de directeurs d'innovation industrielle d'IA et de responsables SEO suite à nos travaux d'ingénierie.
          </p>
        </div>

        {/* Carousel Testimonial Container */}
        <div 
          className="relative bg-bg-card border border-border-dark/80 rounded-2xl p-6 sm:p-10 md:p-14 shadow-2xl hover:border-border-dark transition-colors group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Neon quote decoration */}
          <div className="absolute top-6 right-8 text-neutral-800 pointer-events-none opacity-40 select-none group-hover:text-neon-purple/10 group-hover:scale-105 transition-all duration-500">
            <Quote size={128} />
          </div>

          <div className="relative min-h-[280px] flex flex-col justify-between">
            {/* Animating Card Element */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
                id={`testimonial-slide-${current.id}`}
              >
                {/* Visual Rating Row */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-neon-yellow text-neon-yellow" />
                  ))}
                  <span className="ml-2 font-mono text-xs text-neon-yellow flex items-center gap-1">
                    <Sparkles size={11} /> 5.0 Audit de Confiance
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-base sm:text-lg md:text-[19px] text-[#F5F5F4] leading-relaxed font-sans italic tracking-wide">
                  "{current.quote}"
                </p>

                {/* Client Profile and Industry Tags */}
                <div className="border-t border-border-dark/50 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {/* Modern geometric monogram avatar instead of generic face */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base text-white shadow-lg border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${current.avatarColors.from}, ${current.avatarColors.to})`
                      }}
                    >
                      {current.initials}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight leading-tight">
                        {current.author}
                      </h4>
                      <p className="text-xs text-text-muted">
                        {current.role} — <span className="text-neon-blue font-medium">{current.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Highlight Chips tags */}
                  <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {current.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-bg-dark border border-border-dark/50 rounded text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-bg-dark border border-border-dark/80 hover:border-neon-blue text-text-muted hover:text-white hover:bg-neon-blue/5 transition cursor-pointer select-none focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-bg-dark border border-border-dark/80 hover:border-neon-blue text-text-muted hover:text-white hover:bg-neon-blue/5 transition cursor-pointer select-none focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel indicator bullet list */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => selectTestimonial(index)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                index === currentIndex ? "w-8 bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_8px_rgba(0,240,255,0.4)]" : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
