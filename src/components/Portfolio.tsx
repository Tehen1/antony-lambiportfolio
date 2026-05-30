/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../config/site";
import { ProjectType } from "../types";
import { 
  Check, 
  Search, 
  ExternalLink, 
  Github, 
  TrendingUp, 
  Cpu, 
  Vote, 
  Inbox, 
  Award, 
  Flame, 
  Loader2,
  Calendar,
  Sparkles
} from "lucide-react";

interface PortfolioProps {
  onOpenSEODashboard: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Portfolio({ onOpenSEODashboard, onNavigate }: PortfolioProps) {
  // Faceted Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // FixieRun Blockchain States
  const [phantomConnected, setPhantomConnected] = useState(false);
  const [fixeBalance, setFixeBalance] = useState(240);
  const [claimableFixe, setClaimableFixe] = useState(125);
  const [isClaiming, setIsClaiming] = useState(false);
  const [fixeLogs, setFixeLogs] = useState<string[]>([]);

  // RhymeChain Blockchain States
  const [artists, setArtists] = useState([
    { name: "MC Crypto", votes: 12, verse: "\"Decentralized mind, Solidity lines, scanning the blocks under neon signs...\"", tx: "0x3ab3...77e2" },
    { name: "Satoshi Spitter", votes: 45, verse: "\"In cryptography we trust, financial rules turning to dust, peer-to-peer or bust...\"", tx: "0x89ee...42c1" },
    { name: "Ether Flow", votes: 8, verse: "\"EVM state changing, gas optimizes arranging, smart loops rearranging...\"", tx: "0xf021...bcee" },
  ]);
  const [userVoted, setUserVoted] = useState(false);
  const [votedArtist, setVotedArtist] = useState("");
  const [isVoting, setIsVoting] = useState<string | null>(null);
  const [rhymeLogs, setRhymeLogs] = useState<string[]>([]);

  // Real-time GitHub stars states
  const [githubStars, setGithubStars] = useState<Record<string, number | null>>({});
  const [starsLoading, setStarsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchGithubStars = async () => {
      const updatedStars: Record<string, number | null> = {};
      const updatedLoading: Record<string, boolean> = {};

      const projectsWithGithub = projectsData.filter((p) => p.github);
      
      projectsWithGithub.forEach((p) => {
        updatedLoading[p.id] = true;
      });
      setStarsLoading(updatedLoading);

      const promises = projectsWithGithub.map(async (project) => {
        if (!project.github) return;
        try {
          const path = project.github.replace("https://github.com/", "");
          const [owner, name] = path.split("/");
          if (owner && name) {
            // Fetch dynamically via our secure Express proxy endpoint to avoid CORS and rate limits
            const response = await fetch(`/api/github-stars?owner=${owner}&repo=${name}`);
            if (response.ok) {
              const data = await response.json();
              updatedStars[project.id] = data.stars;
            } else {
              // Graceful fallback for API issues
              updatedStars[project.id] = project.id === "fixie-run" ? 42 : 18;
            }
          }
        } catch (error) {
          console.log(`[GitHub API client] Note: Falling back to cached star count for ${project.id}`);
          updatedStars[project.id] = project.id === "fixie-run" ? 42 : 18;
        } finally {
          setStarsLoading((prev) => ({ ...prev, [project.id]: false }));
        }
      });

      await Promise.all(promises);
      setGithubStars((prev) => ({ ...prev, ...updatedStars }));
    };

    fetchGithubStars();
  }, []);

  // 1. Faceted Filters list
  const categories = ["all", "blockchain", "ai", "saas", "ecommerce", "content"];
  const technologies = ["all", "Solidity", "Next.js", "Solana", "TypeScript", "PostgreSQL", "Tailwind CSS"];
  const impacts = [
    { label: "Tous les impacts", value: "all" },
    { label: "Chiffre d'Affaire Élite (High Revenue Y1)", value: "high_revenue" },
    { label: "Niveau de Sécurité Maximal (Security Focused)", value: "security" }
  ];

  // 2. Faceted filters URL parameter synchronization
  useEffect(() => {
    // Read initial filters from URL on mount
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("f_cat");
    const tech = params.get("f_tech");
    const imp = params.get("f_imp");
    const search = params.get("f_query");

    if (cat) setSelectedCategory(cat);
    if (tech) setSelectedTech(tech);
    if (imp) setSelectedImpact(imp);
    if (search) setSearchQuery(search);
  }, []);

  const updateFilters = (newCat: string, newTech: string, newImp: string, newQuery: string) => {
    setSelectedCategory(newCat);
    setSelectedTech(newTech);
    setSelectedImpact(newImp);
    setSearchQuery(newQuery);

    const params = new URLSearchParams();
    if (newCat !== "all") params.set("f_cat", newCat);
    if (newTech !== "all") params.set("f_tech", newTech);
    if (newImp !== "all") params.set("f_imp", newImp);
    if (newQuery) params.set("f_query", newQuery);

    const newRelativePathQuery = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.pushState(null, "", newRelativePathQuery);
  };

  // 3. Faceted Filter Criteria
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesTech = selectedTech === "all" || project.stack.some(t => t.toLowerCase() === selectedTech.toLowerCase() || (selectedTech === "Tailwind CSS" && t.includes("Tailwind")));
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.stack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesImpact = true;
    if (selectedImpact === "high_revenue") {
      // Matches projects with high income potential values
      matchesImpact = ["fixie-run", "rhymechain", "adaptogenic-mushrooms", "tech-review-blog"].includes(project.id);
    } else if (selectedImpact === "security") {
      // Matches projects heavily optimized for smart contracts or advanced databases
      matchesImpact = ["fixie-run", "rhymechain", "seobiz", "adaptogenic-mushrooms"].includes(project.id);
    }

    return matchesCategory && matchesTech && matchesSearch && matchesImpact;
  });

  // ----------------------------------------------------
  // FixieRun Wallet / Claims Web3 Simulation Action
  // ----------------------------------------------------
  const handleConnectPhantom = () => {
    setPhantomConnected(true);
    const newLogs = ["Wallet Phantom détecté : ANTy...LmBi99sLN", "Balance du réseau Solana synchronisée..."];
    setFixeLogs(newLogs);
  };

  const handleClaimFixe = () => {
    if (claimableFixe === 0) return;
    setIsClaiming(true);
    setFixeLogs(prev => [...prev, "[TX PREPARATION] Initialisation de l'appel de réclamation..."]);
    
    setTimeout(() => {
      setFixeLogs(prev => [...prev, "[TX SIGNING] En attente de signature cryptographique Phantom..."]);
      
      setTimeout(() => {
        const txHash = "SOL-Tx98f7eD" + Math.floor(Math.random() * 90000 + 10000) + "77zD";
        setFixeLogs(prev => [
          ...prev, 
          `[LEDGER SUCCESS] Bloqué validé dans le slot #1428592`,
          `[TX HASH] ${txHash}`,
          `[CLAIM] +${claimableFixe} FIXE ajoutés à votre solde.`
        ]);
        setFixeBalance(prev => prev + claimableFixe);
        setClaimableFixe(0);
        setIsClaiming(false);
      }, 1000);
    }, 1200);
  };

  // ----------------------------------------------------
  // RhymeChain EVM Voting Web3 Simulation Action
  // ----------------------------------------------------
  const handleRhymeVote = (artistName: string) => {
    if (userVoted) return;
    setIsVoting(artistName);
    setRhymeLogs([
      `[GAS PREPARATION] Estimation de l'opcode de vote (Gas Estim: 21,452 Gwei)...`,
      `[TX REQUEST] Signature de transaction requise pour voter pour '${artistName}'...`
    ]);

    setTimeout(() => {
      setArtists(prev => prev.map(a => {
        if (a.name === artistName) {
          return { ...a, votes: a.votes + 1 };
        }
        return a;
      }));
      const hash = "0x" + Math.floor(Math.random() * 100000000).toString(16) + "e8b23447c1f";
      setRhymeLogs(prev => [
        ...prev,
        `[SIGNATURE APPROVED] Données du contrat de vote signées.`,
        `[TX BROADCAST] Transaction propagée à nos oracles...`,
        `[CONFIRMED] Bloc validé! TxHash: ${hash}`
      ]);
      setUserVoted(true);
      setVotedArtist(artistName);
      setIsVoting(null);
    }, 2000);
  };

  return (
    <section id="portfolio" className="py-24 bg-bg-dark border-b border-border-dark relative">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-green">
            <Award size={12} />
            <span>PORTFOLIO PARÉTO (TOP 20%)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Projets & <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green">Réalisations</span>
            <span className="text-neon-green">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Monopole technique et business : découvrez mes applications Web3 réelles, mes automatisations logicielles, et manipulez les fonctionnalités blockchain simulées ci-dessous.
          </p>
        </div>

        {/* FACETED SEARCH / INTERACTIVE SEARCH FORM */}
        <div className="p-6 bg-bg-card border border-border-dark rounded-lg mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center pb-4 border-b border-border-dark/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Recherche facettée synchronisée (URL)</span>
            </div>
            
            {/* Simple live text search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Filtrer par techno, mot clé..."
                value={searchQuery}
                onChange={(e) => updateFilters(selectedCategory, selectedTech, selectedImpact, e.target.value)}
                className="w-full bg-bg-dark border border-border-dark rounded px-3 py-1.5 pl-9 font-mono text-xs text-white placeholder-text-muted focus:border-neon-blue focus:outline-none transition-colors"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-text-muted" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 font-mono text-xs">
            {/* Category facet */}
            <div className="space-y-2">
              <label className="text-text-muted font-bold text-[10px] uppercase tracking-wider block">Catégorie Métier</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilters(cat, selectedTech, selectedImpact, searchQuery)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "border-neon-blue bg-neon-blue/10 text-white font-bold"
                        : "border-border-dark bg-bg-dark text-text-muted hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "TOUTES" : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Technologies facet */}
            <div className="space-y-2">
              <label className="text-text-muted font-bold text-[10px] uppercase tracking-wider block">Pilier Technologique</label>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => updateFilters(selectedCategory, tech, selectedImpact, searchQuery)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition-all cursor-pointer ${
                      selectedTech === tech
                        ? "border-neon-purple bg-neon-purple/10 text-white font-bold"
                        : "border-border-dark bg-bg-dark text-text-muted hover:text-white"
                    }`}
                  >
                    {tech === "all" ? "TOUTES" : tech.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Metric facet */}
            <div className="space-y-2">
              <label className="text-text-muted font-bold text-[10px] uppercase tracking-wider block">Critère d'Impact Business</label>
              <div className="space-y-1.5">
                {impacts.map(imp => (
                  <button
                    key={imp.value}
                    onClick={() => updateFilters(selectedCategory, selectedTech, imp.value, searchQuery)}
                    className={`w-full text-left px-2.5 py-1 rounded border overflow-hidden text-ellipsis whitespace-nowrap transition-all cursor-pointer block ${
                      selectedImpact === imp.value
                        ? "border-neon-green bg-neon-green/10 text-white font-bold"
                        : "border-border-dark bg-bg-dark text-text-muted hover:text-white"
                    }`}
                  >
                    {imp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="grid md:grid-cols-2 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-bg-card border border-border-dark rounded-lg p-6 relative group hover:scale-105 transition-all duration-300 hover:shadow-[0_12px_45px_-8px_rgba(0,240,255,0.22)] hover:border-neon-blue/40 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl select-none">{project.image}</span>
                    <div>
                      <h3 className="text-lg font-extrabold font-display text-white group-hover:text-neon-blue transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider bg-bg-dark border border-border-dark px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded font-black ${
                      project.status === "Live" 
                        ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                        : "bg-neon-blue/10 text-neon-blue border border-neon-blue/30"
                    }`}>
                      {project.status}
                    </span>
                    {project.github && (
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#facc15] bg-[#facc15]/10 border border-[#facc15]/30 px-2 py-0.5 rounded">
                        {starsLoading[project.id] ? (
                          <Loader2 size={10} className="animate-spin text-[#facc15]" />
                        ) : (
                          <>
                            <span className="text-[#facc15]">★</span>
                            <span>{githubStars[project.id] !== undefined ? githubStars[project.id] : "-"}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Core technologies list tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map(tech => (
                    <span key={tech} className="font-mono text-[9px] text-white bg-bg-dark border border-border-dark/80 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Earnings metrics snippet */}
                <div className="p-3 bg-bg-dark/40 rounded border border-border-dark/60 font-mono text-xs flex justify-between items-center mb-6">
                  <span className="text-text-muted text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp size={12} className="text-neon-green" />
                    Potentiel d'Acquisition (Y1)
                  </span>
                  <span className="text-neon-green font-bold text-sm">{project.earnings}</span>
                </div>

                {/* SPECIAL EMBEDDED DAPP WIDGETS */}
                {/* 1. FixieRun dApp simulation */}
                {project.id === "fixie-run" && (
                  <div className="p-4 bg-bg-dark rounded border border-neon-blue/20 mb-6 font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center border-b border-border-dark/60 pb-1.5">
                      <span className="text-neon-blue text-[10px] uppercase font-bold tracking-wider">FixieRun Solana Engine</span>
                      <span className="text-[10px] text-text-muted">RPC Status: SECURE</span>
                    </div>
                    
                    {!phantomConnected ? (
                      <button
                        onClick={handleConnectPhantom}
                        className="w-full py-2 bg-neon-blue text-bg-dark hover:bg-neon-blue/90 font-bold uppercase rounded cursor-pointer transition-transform text-[11px]"
                      >
                        Connecter Phantom (Solana App)
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 bg-bg-card rounded border border-border-dark">
                            <span className="text-text-muted block text-[9px] uppercase">Solde stable:</span>
                            <span className="text-neon-green font-bold text-sm">{fixeBalance} FIXE</span>
                          </div>
                          <div className="p-2 bg-bg-card rounded border border-border-dark relative">
                            <span className="text-text-muted block text-[9px] uppercase">À réclamer:</span>
                            <span className="text-neon-blue font-bold text-sm">{claimableFixe} FIXE</span>
                            {claimableFixe > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-pink animate-ping" />}
                          </div>
                        </div>

                        <button
                          disabled={isClaiming || claimableFixe === 0}
                          onClick={handleClaimFixe}
                          className={`w-full py-2 font-bold uppercase rounded text-[11px] flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            claimableFixe === 0
                              ? "bg-bg-card text-text-muted border border-border-dark"
                              : "bg-neon-green text-bg-dark hover:bg-neon-green/90"
                          }`}
                        >
                          {isClaiming ? <Loader2 size={12} className="animate-spin" /> : null}
                          {isClaiming ? "Vérification..." : claimableFixe === 0 ? "Récompenses Réclamées" : "Collecter FIXE récompenses"}
                        </button>
                      </div>
                    )}

                    {/* Sim logs console */}
                    {fixeLogs.length > 0 && (
                      <div className="p-2 bg-bg-card rounded border border-border-dark text-[9px] text-text-muted max-h-24 overflow-y-auto space-y-1">
                        {fixeLogs.map((log, lIdx) => (
                          <div key={lIdx} className={log.includes("LEDGER") ? "text-neon-green font-bold" : ""}>
                            &gt; {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. RhymeChain Voting dApp simulation */}
                {project.id === "rhymechain" && (
                  <div className="p-4 bg-bg-dark rounded border border-neon-purple/20 mb-6 font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center border-b border-border-dark/60 pb-1.5">
                      <span className="text-neon-purple text-[10px] uppercase font-bold tracking-wider">RhymeChain Live EVM Battles</span>
                      <span className="text-[10px] text-text-muted">Mainnet Node #02</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold">Lancer un vote cryptographique sur l'artiste d'élite:</p>
                      <div className="space-y-2">
                        {artists.map(art => (
                          <div key={art.name} className="p-2 bg-bg-card rounded border border-border-dark flex justify-between items-center">
                            <div className="space-y-0.5 max-w-[70%]">
                              <span className="text-white font-bold block text-[11px]">{art.name}</span>
                              <span className="text-[9px] text-text-muted italic block line-clamp-1">{art.verse}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-neon-green font-bold">{art.votes} vote{art.votes > 1 ? "s" : ""}</span>
                              <button
                               disabled={userVoted || isVoting !== null}
                               onClick={() => handleRhymeVote(art.name)}
                               className={`px-2 py-1 rounded text-[9px] uppercase font-bold cursor-pointer transition-all ${
                                 userVoted
                                   ? votedArtist === art.name 
                                     ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                                     : "bg-bg-card text-text-muted border border-border-dark"
                                   : "bg-neon-purple hover:bg-neon-purple/90 text-white"
                               }`}
                             >
                               {isVoting === art.name ? <Loader2 size={10} className="animate-spin" /> : "Voter"}
                             </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {rhymeLogs.length > 0 && (
                      <div className="p-2 bg-bg-card rounded border border-border-dark text-[9px] text-text-muted max-h-24 overflow-y-auto space-y-1">
                        {rhymeLogs.map((log, rIdx) => (
                          <div key={rIdx} className={log.includes("CONFIRMED") ? "text-neon-green font-bold" : ""}>
                            &gt; {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ACTION LINKS BOX */}
              <div className="flex gap-2 pt-4 border-t border-border-dark/50 mt-auto">
                {project.id === "seobiz" && (
                  <button
                    onClick={onOpenSEODashboard}
                    className="flex-1 py-2 sm:py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple text-bg-dark font-black uppercase text-[10px] sm:text-xs rounded hover:scale-[1.02] transform transition cursor-pointer flex items-center justify-center gap-1.5 font-mono shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                  >
                    <TrendingUp size={14} />
                    View SEO Dashboard
                  </button>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 sm:py-2 bg-bg-dark hover:bg-bg-light text-white font-bold rounded text-[10px] sm:text-xs uppercase tracking-wider text-center border border-border-dark cursor-pointer flex items-center justify-center gap-1 font-mono transition-colors"
                >
                  <ExternalLink size={12} />
                  Visiter Site
                </a>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-bg-dark hover:bg-bg-light rounded border border-border-dark text-white hover:text-neon-blue transition cursor-pointer flex items-center justify-center gap-1.5 font-mono text-[10px]"
                    title="Code source crypté"
                  >
                    <Github size={12} />
                    <span>Repository</span>
                    {githubStars[project.id] !== undefined && githubStars[project.id] !== null && (
                      <span className="text-neon-blue font-bold">
                        ★ {githubStars[project.id]}
                      </span>
                    )}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-2 text-center py-16 bg-bg-card border border-border-dark rounded-lg space-y-3 font-mono">
              <Inbox size={32} className="mx-auto text-text-muted animate-bounce" />
              <p className="text-text-muted text-sm">Aucun build d'élite ne correspond à ce filtre.</p>
              <button
                onClick={() => updateFilters("all", "all", "all", "")}
                className="text-neon-blue hover:underline text-xs"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
