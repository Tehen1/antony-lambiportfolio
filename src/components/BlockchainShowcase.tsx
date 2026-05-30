/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Flame, 
  Sparkles, 
  Moon, 
  ArrowDownUp, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  Award,
  Loader2,
  ChevronDown
} from "lucide-react";

export default function BlockchainShowcase() {
  // 1. NFT Drop States
  const [mintQuantity, setMintQuantity] = useState(1);
  const [supplyCounter, setSupplyCounter] = useState(842);
  const [nftLogs, setNftLogs] = useState<string[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [lastMintedToken, setLastMintedToken] = useState("");

  // 2. DEX Swap States
  const [fromAmount, setFromAmount] = useState("1.0");
  const [toAmount, setToAmount] = useState("1850.42");
  const [fromToken, setFromToken] = useState<"ETH" | "USDC">("ETH");
  const [swapLogs, setSwapLogs] = useState<string[]>([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [usdBalance, setUsdBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(4.5);

  // 3. Gas Price States
  const [gasEth, setGasEth] = useState(24);
  const [gasPoly, setGasPoly] = useState(115);
  const [gasBsc, setGasBsc] = useState(5.2);
  const [refreshCountdown, setRefreshCountdown] = useState(10);

  // Auto-refresh gas prices simulated fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCountdown(prev => {
        if (prev <= 1) {
          // Trigger fluctuation
          setGasEth(Math.max(14, Math.floor(gasEth + (Math.random() * 6 - 3))));
          setGasPoly(Math.max(80, Math.floor(gasPoly + (Math.random() * 20 - 10))));
          setGasBsc(Math.max(4, Number((gasBsc + (Math.random() * 0.8 - 0.4)).toFixed(1))));
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gasEth, gasPoly, gasBsc]);

  // NFT Pricing calculation
  const nftPrice = 0.08;
  const totalNftPrice = parseFloat((mintQuantity * nftPrice).toFixed(2));

  // Swap calculation logic
  useEffect(() => {
    const num = parseFloat(fromAmount) || 0;
    if (fromToken === "ETH") {
      setToAmount((num * 1850.42).toFixed(2));
    } else {
      setToAmount((num / 1850.42).toFixed(4));
    }
  }, [fromAmount, fromToken]);

  const handleMintNft = () => {
    if (isMinting || supplyCounter >= 1000) return;
    setIsMinting(true);
    setNftLogs(["[RPC] Appel de mint cryptologique...", "Préparation des paramètres de transaction..."]);

    setTimeout(() => {
      setNftLogs(prev => [...prev, "[LEDGER] Envoi des données (Standard ERC-721A)..."]);
      
      setTimeout(() => {
        const txHash = "0x" + Math.floor(Math.random() * 900000).toString(16) + "e8df92";
        const mintedId = `#${supplyCounter + 1}`;
        setSupplyCounter(prev => prev + mintQuantity);
        setNftLogs(prev => [
          ...prev,
          `[SUCCESS] Bloc validé dans le Slot #4812399`,
          `[MINT] Token d'élite ${mintedId} généré!`,
          `[TX HASH] ${txHash}`
        ]);
        setLastMintedToken(mintedId);
        setIsMinting(false);
        setMintSuccess(true);
      }, 1000);
    }, 1200);
  };

  const handleSwitchToken = () => {
    setFromToken(fromToken === "ETH" ? "USDC" : "ETH");
    setFromAmount(toAmount);
  };

  const handleExecuteSwap = () => {
    if (isSwapping) return;
    const amountNum = parseFloat(fromAmount) || 0;
    if (amountNum <= 0) return;

    setIsSwapping(true);
    setSwapLogs(["[DEX] Calcul du meilleur routeur (slippage 0.5%)...", "[GAS] Estimation de l'échange DeFi..."]);

    setTimeout(() => {
      setSwapLogs(prev => [...prev, "[WALLET] Signature d'approbation requise..."]);
      
      setTimeout(() => {
        const txHash = "0xswap" + Math.floor(Math.random() * 900000).toString(16) + "ee78b";
        setSwapLogs(prev => [
          ...prev,
          `[SUCCESS] Échange exécuté via 1inch router`,
          `[TX HASH] ${txHash}`
        ]);

        if (fromToken === "ETH") {
          setEthBalance(prev => Math.max(0, parseFloat((prev - amountNum).toFixed(4))));
          setUsdBalance(prev => parseFloat((prev + parseFloat(toAmount)).toFixed(2)));
        } else {
          setUsdBalance(prev => Math.max(0, parseFloat((prev - amountNum).toFixed(2))));
          setEthBalance(prev => parseFloat((prev + parseFloat(toAmount)).toFixed(4)));
        }

        setIsSwapping(false);
        setFromAmount("0.0");
      }, 1000);
    }, 1200);
  };

  return (
    <section id="web3-sandbox" className="py-24 bg-bg-light border-b border-border-dark relative">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-neon-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Details */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-card border border-border-dark rounded font-mono text-xs text-neon-blue">
            <Activity size={12} />
            <span>SANDBOX INTELLIGENT DE CONTRATS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Intégrations <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">Web3 Interactives</span>
            <span className="text-neon-purple">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-xs sm:text-sm leading-relaxed">
            Démonstrations de dApps prêtes pour la production. Ces widgets simulent l'exécution de contrats intelligents Ethereum (EVM) et Solana en temps réel.
          </p>
        </div>

        {/* Web3 Widgets Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. Mint NFT Drop Widget */}
          <div className="bg-bg-card border border-border-dark rounded-lg p-6 flex flex-col justify-between hover:border-border-dark/80 transition shadow-lg">
            <div>
              <div className="flex justify-between items-center border-b border-border-darkpb-2 mb-4">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={14} className="text-neon-yellow" />
                  UseCase: NFT Drop
                </span>
                <span className="font-mono text-[9px] text-[#34d399] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 font-bold">ERC-721A</span>
              </div>
              
              <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                Simulez l'interaction d'un contrat de mint d'une collection limitée NFT, avec gestion d'état, prix dynamique en crypto et calcul de stock.
              </p>

              {/* Decorative NFT Card Art */}
              <div className="rounded border border-border-dark bg-bg-dark p-4 relative overflow-hidden mb-6 group text-center">
                <div className="absolute inset-0 bg-scanlines opacity-[0.05] pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-pink to-neon-purple mx-auto flex items-center justify-center font-display font-black text-lg text-bg-dark animate-pulse shadow-md">
                  CP_O
                </div>
                <h4 className="font-display font-black text-white mt-3 text-sm tracking-widest">CYBERPUNK ORIGINS</h4>
                <p className="text-[10px] font-mono text-neon-blue uppercase mt-1">Exclusive Genesis Collection</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center text-text-muted">
                  <span>Price</span>
                  <span className="text-white font-bold">{nftPrice} ETH</span>
                </div>

                <div className="flex justify-between items-center text-text-muted">
                  <span>Supply</span>
                  <span className="text-neon-green font-bold">{supplyCounter} / 1000 mintés</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-between items-center border-t border-border-dark/50 pt-3">
                  <span className="text-text-muted">Quantité</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={mintQuantity <= 1}
                      onClick={() => setMintQuantity(prev => prev - 1)}
                      className="w-6 h-6 rounded bg-bg-dark hover:bg-bg-light border border-border-dark flex items-center justify-center text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-white font-bold px-1">{mintQuantity}</span>
                    <button
                      disabled={mintQuantity >= 10}
                      onClick={() => setMintQuantity(prev => prev + 1)}
                      className="w-6 h-6 rounded bg-bg-dark hover:bg-bg-light border border-border-dark flex items-center justify-center text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-border-dark/50 pt-3 font-bold text-sm">
                  <span className="text-white">Total</span>
                  <span className="text-neon-green">{totalNftPrice} ETH</span>
                </div>
              </div>
            </div>

            {/* Mint action controls */}
            <div className="pt-6 border-t border-border-dark/50 mt-6 space-y-3">
              {mintSuccess && (
                <div className="p-3 rounded bg-neon-green/10 border border-neon-green/30 text-[11px] font-mono text-neon-green flex items-start gap-1.5 animate-slide-in">
                  <CheckCircle size={14} className="mt-0.5" />
                  <div>
                    <span className="font-bold block">Félicitations!</span>
                    NFT d'élite {lastMintedToken} frappé on-chain avec succès.
                  </div>
                </div>
              )}

              <button
                disabled={isMinting || supplyCounter >= 1000}
                onClick={handleMintNft}
                className="w-full py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple font-black uppercase text-xs rounded tracking-wider text-bg-dark shadow-[0_0_12px_rgba(0,240,255,0.25)] hover:scale-[1.02] transform transition cursor-pointer flex items-center justify-center gap-1.5 font-mono"
              >
                {isMinting ? <Loader2 size={12} className="animate-spin" /> : null}
                {isMinting ? "Écriture des blocs..." : "Frapper le NFT (Mint)"}
              </button>

              {nftLogs.length > 0 && (
                <div className="p-2.5 bg-bg-dark rounded border border-border-dark font-mono text-[9px] text-text-muted max-h-24 overflow-y-auto space-y-1">
                  {nftLogs.map((log, lIdx) => (
                    <div key={lIdx} className={log.includes("SUCCESS") ? "text-neon-green font-bold" : ""}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. DEX Swap Widget */}
          <div className="bg-bg-card border border-border-dark rounded-lg p-6 flex flex-col justify-between hover:border-border-dark/80 transition shadow-lg">
            <div>
              <div className="flex justify-between items-center border-b border-border-dark pb-2 mb-4">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <ArrowDownUp size={14} className="text-neon-purple" />
                  UseCase: DEX Swap Aggregator
                </span>
                <span className="font-mono text-[9px] text-neon-purple bg-neon-purple/10 px-2 py-0.5 rounded border border-neon-purple/20 font-bold">AMM</span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                Démonstrations d'échanges (Swap) inter-tokens. Le widget estime automatiquement les coûts d'exécution et vérifie l'absence de slippage.
              </p>

              {/* Swap Form block */}
              <div className="space-y-3 font-mono text-xs">
                {/* From Field */}
                <div className="p-3 rounded bg-bg-dark border border-border-dark relative">
                  <div className="flex justify-between items-center text-[10px] text-text-muted mb-1.5">
                    <span>From</span>
                    <span>Solde: {fromToken === "ETH" ? ethBalance : usdBalance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="bg-transparent text-white border-none outline-none font-bold text-base w-[60%]"
                    />
                    <span className="text-neon-blue font-bold tracking-wider">{fromToken}</span>
                  </div>
                </div>

                {/* Swap Icon Button */}
                <div className="flex justify-center -my-2.5 relative z-10">
                  <button
                    onClick={handleSwitchToken}
                    className="w-7 h-7 rounded-full bg-border-dark border border-neon-purple hover:border-neon-blue text-white flex items-center justify-center transition cursor-pointer"
                    title="Inverser les tokens"
                  >
                    <ArrowDownUp size={12} />
                  </button>
                </div>

                {/* To Field */}
                <div className="p-3 rounded bg-bg-dark border border-border-dark relative">
                  <div className="flex justify-between items-center text-[10px] text-text-muted mb-1.5">
                    <span>To (Estimé)</span>
                    <span>Solde: {fromToken === "ETH" ? usdBalance : ethBalance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-white">{toAmount}</span>
                    <span className="text-neon-purple font-bold tracking-wider">
                      {fromToken === "ETH" ? "USDC" : "ETH"}
                    </span>
                  </div>
                </div>

                {/* Exchange Rate summary */}
                <div className="p-2.5 bg-bg-dark/40 rounded border border-border-dark/60 text-[10px] text-text-muted flex justify-between">
                  <span>Taux de conversion</span>
                  <span className="text-white">1 ETH = 1,850.42 USDC</span>
                </div>
              </div>
            </div>

            {/* Swap Actions */}
            <div className="pt-6 border-t border-border-dark/50 mt-6 space-y-3">
              <button
                disabled={isSwapping || (parseFloat(fromAmount) || 0) <= 0}
                onClick={handleExecuteSwap}
                className={`w-full py-2.5 font-black uppercase text-xs rounded tracking-wider text-bg-dark shadow-[0_0_12px_rgba(191,0,255,0.25)] hover:scale-[1.02] transform transition cursor-pointer flex items-center justify-center gap-1.5 font-mono ${
                  (parseFloat(fromAmount) || 0) <= 0 
                    ? "bg-bg-dark border border-border-dark text-text-muted cursor-not-allowed" 
                    : "bg-neon-purple text-white"
                }`}
              >
                {isSwapping ? <Loader2 size={12} className="animate-spin" /> : null}
                {isSwapping ? "Routage du swap..." : "Échanger les Tokens (Swap)"}
              </button>

              {swapLogs.length > 0 && (
                <div className="p-2.5 bg-bg-dark rounded border border-border-dark font-mono text-[9px] text-text-muted max-h-24 overflow-y-auto space-y-1">
                  {swapLogs.map((log, sIdx) => (
                    <div key={sIdx} className={log.includes("SUCCESS") ? "text-neon-green font-bold" : ""}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Gas Price Tracker Widget */}
          <div className="bg-bg-card border border-border-dark rounded-lg p-6 flex flex-col justify-between hover:border-border-dark/80 transition shadow-lg">
            <div>
              <div className="flex justify-between items-center border-b border-border-dark pb-2 mb-4">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <Flame size={14} className="text-neon-pink" />
                  UseCase: MultiChain Analytics
                </span>
                <span className="font-mono text-[9px] text-neon-pink bg-neon-pink/10 px-2 py-0.5 rounded border border-neon-pink/20 font-bold">MONITOR</span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                Suivi temps réel des frais de carburant (Gas) à travers les hubs on-chain. Simulation d'oracles d'analyse réseau.
              </p>

              {/* Gas indicators list */}
              <div className="space-y-4 font-mono text-xs">
                {/* Ethereum indicator */}
                <div className="p-3 bg-bg-dark rounded border border-border-dark/80 flex justify-between items-center relative overflow-hidden">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                    Ethereum Base Fee
                  </span>
                  <div className="text-right">
                    <span className="text-neon-blue font-bold text-sm block">{gasEth} gwei</span>
                    <span className="text-[8px] text-text-muted uppercase">~ $1.85 (Swap standard)</span>
                  </div>
                </div>

                {/* Polygon Layer-2 */}
                <div className="p-3 bg-bg-dark rounded border border-border-dark/80 flex justify-between items-center relative overflow-hidden">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                    Polygon zkEVM Gas
                  </span>
                  <div className="text-right">
                    <span className="text-neon-purple font-bold text-sm block">{gasPoly} gwei</span>
                    <span className="text-[8px] text-text-muted uppercase">~ $0.02 (Swap zkSync L2)</span>
                  </div>
                </div>

                {/* BNB Smart Chain (BSC) */}
                <div className="p-3 bg-bg-dark rounded border border-border-dark/80 flex justify-between items-center relative overflow-hidden">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                    BSC Validator Gas
                  </span>
                  <div className="text-right">
                    <span className="text-[#facc15] font-bold text-sm block">{gasBsc} gwei</span>
                    <span className="text-[8px] text-text-muted uppercase">~ $0.18 (Tx standard)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status alerts */}
            <div className="pt-6 border-t border-border-dark/50 mt-6 space-y-4 font-mono">
              <div className="flex justify-between text-[10px] text-text-muted leading-relaxed uppercase">
                <span>Network state: <strong className="text-neon-green">FAIBLE SÉCURISÉ</strong></span>
                <span>Prochaine synch: <strong className="text-white">{refreshCountdown}s</strong></span>
              </div>

              {/* Congested banner alert */}
              {gasEth > 28 && (
                <div className="p-2.5 rounded bg-neon-pink/15 border border-neon-pink/30 text-[9px] text-neon-pink flex items-center gap-2 animate-pulse">
                  <AlertTriangle size={14} className="flex-shrink-0" />
                  <span>Réseau temporairement encombré. Privilégiez Polygon zkEVM pour vos déploiements.</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
