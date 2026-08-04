import Link from 'next/link';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section aria-label="Présentation" className="min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">Antony Lambi</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">Dé°°veloppeur Blockchain & Web3</p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Expert smart contracts, dApps et automatisation IA. Basé°° à Liè°°ge, Belgique.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="#projects" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Voir mes projets
          </Link>
          <Link href="#contact" className="inline-flex items-center px-6 py-3 border border-muted-foreground/30 rounded-lg font-medium hover:bg-muted transition-colors">
            Me contacter
          </Link>
        </div>
        <div className="flex justify-center gap-6 mb-16">
          <a href="https://github.com/Tehen1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/antonylambi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:contact@antonylambi.be" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <a href="#skills" aria-label="Aller aux compé°°tences" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
