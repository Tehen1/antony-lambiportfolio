/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteConfig } from "../config/site";
import { Terminal, ShieldAlert, Cpu, Award, Globe, Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark border-t border-border-dark py-12 relative overflow-hidden font-mono text-xs text-text-muted">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-neon-blue/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-border-dark/60">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-white font-black uppercase text-sm font-display tracking-widest">
              <span className="text-neon-blue font-mono">&lt;</span>
              <span>LMB_SYS</span>
              <span className="text-neon-blue font-mono">/&gt;</span>
            </div>
            
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              Ingénierie de pointe croisant protocoles décentralisés Solidity on-chain et automatisations cognitives IA en Belgique.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="uppercase font-bold text-white">System Status: SECURE</span>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Plan du Site</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#about" className="hover:text-neon-blue transition-colors">
                  &gt; À propos de moi
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-neon-blue transition-colors">
                  &gt; Services &amp; Expertise
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-neon-blue transition-colors">
                  &gt; Portfolio d'Élite
                </a>
              </li>
              <li>
                <a href="#web3-sandbox" className="hover:text-neon-blue transition-colors">
                  &gt; Web3 Sandbox
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Local Zones */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Zones d'Interventions</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#liege-local" className="hover:text-neon-green transition-colors">
                  &gt; Liège Centre-Ville
                </a>
              </li>
              <li>
                <a href="#liege-local" className="hover:text-neon-green transition-colors">
                  &gt; Liège-Guillemins affaires
                </a>
              </li>
              <li>
                <a href="#liege-local" className="hover:text-neon-green transition-colors">
                  &gt; LIEGE Science Park
                </a>
              </li>
              <li>
                <a href="#liege-local" className="hover:text-neon-green transition-colors">
                  &gt; Herstal Industriel
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate NAP coordinates */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Coordonnées de l'Entreprise</h5>
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              <strong>{siteConfig.name}</strong><br />
              {siteConfig.contact.address.street}, {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}<br />
              Province de Liège, Belgique<br />
              Registre National Wallon
            </p>
            <div className="flex gap-2.5 pt-1.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 bg-bg-card hover:bg-bg-light border border-border-dark flex items-center justify-center rounded text-white hover:text-neon-blue transition"
                title="Github"
              >
                <Github size={14} />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 bg-bg-card hover:bg-bg-light border border-border-dark flex items-center justify-center rounded text-white hover:text-neon-blue transition font-black"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

        </div>

        {/* Legal notice baseline row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[10px] text-text-muted text-center sm:text-left">
          <p>© {year} Antony Lambi. Tous droits réservés. Développé en Belgique.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition cursor-pointer">Conditions Générales</span>
            <span>•</span>
            <span className="hover:text-white transition cursor-pointer">RGPD &amp; Cookies de Session</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
