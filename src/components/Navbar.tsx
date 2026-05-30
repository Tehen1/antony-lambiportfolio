/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { siteConfig } from "../config/site";
import { Menu, X, Wallet, Shield, Check, Flame } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdvisor: () => void;
  onOpenSEODashboard: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenAdvisor, onOpenSEODashboard }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletChain, setWalletChain] = useState<"solana" | "ethereum">("solana");
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [systemPing, setSystemPing] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const interval = setInterval(() => {
      setSystemPing(Math.floor(Math.random() * 8) + 18);
    }, 4000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleWallet = (chain: "solana" | "ethereum") => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress("");
      setShowWalletMenu(false);
    } else {
      setWalletConnected(true);
      setWalletChain(chain);
      setWalletAddress(
        chain === "solana" 
          ? "ANTy...LmBi99sLN" 
          : "0xANT...1aMb1E9"
      );
      setShowWalletMenu(false);
    }
  };

  const navLinks = [
    { name: "Services", id: "expertise" },
    { name: "Tech Stack", id: "tech-stack" },
    { name: "Builds", id: "portfolio" },
    { name: "Web3 Sandbox", id: "web3-sandbox" },
    { name: "SEO Hub", id: "seo-hub" },
    { name: "Liège Local", id: "liege-local" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#050505]/75 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        {/* Branding Info */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("hero");
            }}
            className="font-display text-lg sm:text-xl font-black tracking-widest text-white flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-blue to-neon-purple p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform">
              <span className="text-xs font-black text-bg-dark">AL</span>
            </div>
            <span className="hidden sm:inline">
              ANTONY<span className="text-neon-blue font-light">.LAMBI</span>
            </span>
          </a>

          {/* Real-time Status node */}
          <div className="hidden lg:flex items-center gap-2 ml-4 px-2.5 py-1 rounded bg-zinc-950/40 backdrop-blur-md border border-neon-green/30 text-[10px] font-mono text-neon-green shadow-[0_0_12px_rgba(57,255,20,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></span>
            <span>MAINNET ONLINE</span>
            <span className="text-zinc-700">|</span>
            <span className="font-semibold text-white">{systemPing}ms</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
              className={`transition-colors py-1 relative ${
                activeSection === link.id
                  ? "text-neon-blue font-bold font-display"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
              )}
            </a>
          ))}

          {/* Custom navigation trigger to full-screen interactive advisor or dashboard */}
          <button
            onClick={onOpenAdvisor}
            className="px-2.5 py-1 text-[11px] rounded border border-neon-purple/50 bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all cursor-pointer font-bold flex items-center gap-1 shrink-0"
          >
            <Flame size={12} className="animate-pulse" />
            AI ADVISOR
          </button>
        </nav>

        {/* Web3 wallet & controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono rounded border transition-all cursor-pointer ${
                walletConnected
                  ? "border-neon-green bg-neon-green/10 text-neon-green shadow-[0_0_10px_rgba(57,255,20,0.15)]"
                  : "border-neon-blue bg-neon-blue/10 text-neon-blue hover:bg-neon-blue hover:text-bg-dark font-semibold"
              }`}
            >
              <Wallet size={14} />
              <span className="hidden sm:inline">
                {walletConnected ? walletAddress : "Connect Wallet"}
              </span>
              <span className="inline sm:hidden">
                {walletConnected ? "Connected" : "Wallet"}
              </span>
            </button>

            {showWalletMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded immersive-glass shadow-2xl z-50 p-1.5 font-mono text-xs animate-slide-in">
                <div className="px-2.5 py-1.5 text-[10px] text-text-muted uppercase border-b border-white/[0.08]">
                  Select Blockchain
                </div>
                {!walletConnected ? (
                  <>
                    <button
                      onClick={() => toggleWallet("solana")}
                      className="w-full text-left px-2.5 py-2 hover:bg-white/[0.05] hover:text-neon-blue transition rounded flex items-center justify-between mt-1 text-white cursor-pointer"
                    >
                      <span>Solana dApp</span>
                      <span className="text-[10px] text-neon-purple">Phantom</span>
                    </button>
                    <button
                      onClick={() => toggleWallet("ethereum")}
                      className="w-full text-left px-2.5 py-2 hover:bg-white/[0.05] hover:text-neon-blue transition rounded flex items-center justify-between text-white cursor-pointer"
                    >
                      <span>EVM Network</span>
                      <span className="text-[10px] text-neon-blue">MetaMask</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-2.5 py-2 hover:bg-white/[0.03] rounded text-white border-b border-white/[0.08] mb-1">
                      <div className="text-[10px] text-text-muted uppercase">Active Address:</div>
                      <div className="text-neon-blue overflow-hidden text-ellipsis">{walletAddress}</div>
                      <div className="text-[10px] text-neon-green font-bold mt-1">
                        {walletChain === "solana" ? "SOL Balance: 42.15" : "ETH Balance: 2.84"}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleWallet(walletChain)}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-red-500/10 hover:text-red-400 text-red-500 font-bold hover:rounded transition cursor-pointer"
                    >
                      Disconnect Wallet
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-white hover:bg-white/[0.05] rounded border border-border-dark cursor-pointer animate-pulse"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 immersive-glass border-b p-4 flex flex-col gap-3 font-mono text-xs shadow-2xl animate-slide-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                onNavigate(link.id);
              }}
              className={`p-2 rounded text-left transition-colors ${
                activeSection === link.id
                  ? "bg-white/[0.07] text-neon-blue border-l-2 border-neon-blue font-bold font-display"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-2 pt-2 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdvisor();
              }}
              className="flex-1 text-center py-2.5 rounded border border-neon-purple/50 bg-neon-purple/10 text-neon-purple font-bold uppercase tracking-wider text-[11px] cursor-pointer"
            >
              AI Advisor App
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSEODashboard();
              }}
              className="flex-1 text-center py-2.5 rounded border border-neon-blue/50 bg-neon-blue/10 text-neon-blue font-bold uppercase tracking-wider text-[11px] cursor-pointer"
            >
              SEO Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
