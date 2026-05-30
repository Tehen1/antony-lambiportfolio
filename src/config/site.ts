/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SEOKeyword, LocationDefinition, ProjectType } from "../types";

export const siteConfig = {
  name: "Antony Lambi",
  role: "Développeur Blockchain & Smart Contracts",
  location: "Liège, Belgique",
  url: "https://antony-lambiportfolio.vercel.app",
  ogImage: "https://antony-lambiportfolio.vercel.app/og.jpg",
  description: "Expert développeur senior blockchain et IA à Liège. Spécialisé en Solidity, smart contracts, dApps zkEVM, etc. +5 ans d'expérience.",
  contact: {
    email: "contact@antonylambi.be",
    phone: "+32491234567",
    address: {
      street: "Rue de la Cathédrale",
      city: "Liège",
      postalCode: "4000",
      country: "BE"
    }
  },
  socials: {
    github: "https://github.com/devtehen",
    linkedin: "https://linkedin.com/in/antonylambi",
    twitter: "https://twitter.com/devtehen"
  }
} as const;

export const locationsData: LocationDefinition[] = [
  {
    slug: "centre-ville",
    name: "Centre-ville de Liège",
    postalCode: "4000",
    keywordFocus: "Développeur Blockchain",
    h1: "Développeur Blockchain au Centre-ville de Liège",
    latitude: 50.6412,
    longitude: 5.5718,
    localHub: "La Grand Poste (écosystème Tech & startups)",
    description: "Basé à proximité immédiate de la Place Saint-Lambert et du pôle créatif de La Grand Poste, j'accompagne les startups, corporates, et espaces de coworking liégeois dans le prototypage et déploiement de leurs solutions Web3 et agents IA autonomes."
  },
  {
    slug: "guillemins",
    name: "Quartier des Guillemins",
    postalCode: "4000",
    keywordFocus: "Smart Contracts Audit",
    h1: "Expert Smart Contracts au Quartier des Guillemins",
    latitude: 50.6272,
    longitude: 5.5684,
    localHub: "Paradis Express (quartier d'affaires)",
    description: "Facilement accessible via la gare TGV de Liège-Guillemins, je collabore avec les structures de conseil et fintechs installées à Paradis Express pour auditer et sécuriser leurs contrats intelligents Solidity avant leur déploiement sur les mainnets EVM."
  },
  {
    slug: "herstal",
    name: "Herstal & Parcs Industriels",
    postalCode: "4040",
    keywordFocus: "Web3 logistique et traçabilité",
    h1: "Développeur Web3 pour l'Industrie à Herstal",
    latitude: 50.6659,
    longitude: 5.6268,
    localHub: "Parc Industriel des Hauts-Sarts",
    description: "Pour les grandes entreprises manufacturières et de logistique situées aux Hauts-Sarts, je conçois des registres d'audit décentralisés, des protocoles de traçabilité d'actifs et de gestion de supply-chain via des blockchains L2 à frais optimisés."
  },
  {
    slug: "sart-tilman",
    name: "Sart-Tilman & LIEGE Science Park",
    postalCode: "4031",
    keywordFocus: "R&D Blockchain & IoT Integration",
    h1: "Partenaire R&D Blockchain au Sart-Tilman",
    latitude: 50.5843,
    longitude: 5.5614,
    localHub: "LIEGE Science Park & ULiège Spin-offs",
    description: "En partenariat avec les spin-offs universitaires de l'Université de Liège (ULiège) et les pôles d'innovation du LIEGE Science Park, je développe des architectures de validation décentralisée intégrant l'IA géospatiale et l'Internet des objets (IoT)."
  }
];

export const keywordsData: SEOKeyword[] = [
  { keyword: "développeur blockchain belgique", volume: 480, difficulty: "Medium", intent: "Commercial" },
  { keyword: "smart contract developer liège", volume: 140, difficulty: "Low", intent: "Local" },
  { keyword: "nextjs blockchain developer", volume: 320, difficulty: "Medium", intent: "Commercial" },
  { keyword: "développeur web3 liège", volume: 180, difficulty: "Low", intent: "Local" },
  { keyword: "ai automation engineer freelance", volume: 550, difficulty: "High", intent: "Commercial" },
  { keyword: "audit sécurité smart contract solidity", volume: 210, difficulty: "Medium", intent: "Commercial" },
  { keyword: "zkSync developer europe", volume: 120, difficulty: "Low", intent: "Commercial" }
];

export const projectsData: ProjectType[] = [
  {
    id: "fixie-run",
    title: "FixieRun",
    category: "blockchain",
    image: "🏃‍♂️",
    description: "Application d'économie de santé 'Move-to-Earn' combinant suivi GPS, cycles de combustion physique et récompenses en tokens FIXE sur la blockchain Solana.",
    stack: ["Solidity", "React Native", "Mapbox", "Solana Web3"],
    link: "https://fixie.run",
    github: "https://github.com/devtehen/fixierun-core",
    status: "Live",
    earnings: "$390,000 Y1 Potential"
  },
  {
    id: "rhymechain",
    title: "RhymeChain",
    category: "blockchain",
    image: "🎤",
    description: "Battlefields de rap et de poésie tokenisés par des Smart Contracts. Les créateurs mintent leurs strophes sous forme de NFT et la communauté vote on-chain.",
    stack: ["Next.js", "IPFS", "Hardhat", "Polygon Contracts"],
    link: "https://rhymechain.win",
    github: "https://github.com/devtehen/rhymechain-mono",
    status: "In Progress",
    earnings: "$315,000 Y1 Potential"
  },
  {
    id: "aiftw-marketplace",
    title: "AIFTW Marketplace",
    category: "ai",
    image: "🤖",
    description: "Agrégateur d'intelligence artificielle et marketplace d'agents autonomes. Intègre des modules d'affiliation automatique à forte valeur ajoutée.",
    stack: ["Next.js", "Stripe Checkout", "Gemini API Proxy"],
    link: "https://aiftw.be",
    status: "Live",
    earnings: "$293,000 Y1 Potential"
  },
  {
    id: "seobiz",
    title: "SEOBiz.be",
    category: "saas",
    image: "📈",
    description: "SaaS de content programming SEO. Analyse automatique d'autorité, clustering sémantique intelligent et pipelines de rédaction propulsés par GPT-4/Gemini.",
    stack: ["React SPA", "PostgreSQL Core", "Tailwind CSS", "Lighthouse Pipeline"],
    link: "https://seobiz.be",
    status: "Live",
    earnings: "$280,000 Y1"
  },
  {
    id: "adaptogenic-mushrooms",
    title: "Adaptogenic Mushrooms",
    category: "ecommerce",
    image: "🍄",
    description: "Hub e-commerce d'autorité et boutique d'herboristerie adaptogène. Utilise une tokenomics ADAPT on-chain pour tracker la pureté des lots labélisés.",
    stack: ["Vite + React", "Solana Web3", "Tailwind CSS"],
    link: "https://adaptogenic-mushrooms.com",
    status: "Live",
    earnings: "$370,000 Y1"
  },
  {
    id: "tech-review-blog",
    title: "Tech Review Blog",
    category: "content",
    image: "💻",
    description: "Moteur de blog d'affiliation tech haut comité. Génère des architectures de contenu hautement qualifiées sur le cloud, le matériel IoT et le Web3.",
    stack: ["React Router", "Dynamic MDX", "Tailwind CSS Optimizer"],
    link: "https://tech-review-blog.com",
    status: "Live",
    earnings: "$608,000 Y1"
  }
];
