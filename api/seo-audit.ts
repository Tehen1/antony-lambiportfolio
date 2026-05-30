import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  generateContentWithRetryAndFallback,
  getGeminiClient,
  Type,
} from "../lib/gemini";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body ?? {};
    if (!url || typeof url !== "string" || !url.includes(".")) {
      return res.status(400).json({
        error: "Veuillez fournir un URL de site web valide pour l'audit.",
      });
    }

    const client = getGeminiClient();
    const prompt = `Effectue un audit SEO complet et technique pour le site web suivant: "${url.trim()}".
Génère des mesures de Core Web Vitals simulées réalistes, un score de performance, et des recommandations stratégiques d'Intelligence Artificielle en JSON strict.`;

    const response = await generateContentWithRetryAndFallback(client, {
      contents: prompt,
      config: {
        systemInstruction:
          "Tu es un spécialiste IA d'élite en audit de référencement (SEO) et performance web. Tu simules les scores de performance de Lighthouse et fournis des explications claires et des structures de silos. Tu réponds TOUJOURS par un objet JSON strict ayant les clés de schéma suivantes: 'originalUrl', 'lcp' (p.ex. '1.5s'), 'fid' (p.ex. '45ms'), 'cls' (p.ex. '0.02'), 'performanceScore' (nombre de 0 à 100), 'seoScore' (nombre de 0 à 100), 'bestPractices' (nombre de 0 à 100), 'analysis' (analyse globale rapide), 'pillars' (tableau de 3-4 piliers de contenu thématiques recommandés), et 'recommendations' (tableau de 4 recommandations techniques). Aucun texte hors du JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalUrl: { type: Type.STRING },
            lcp: { type: Type.STRING },
            fid: { type: Type.STRING },
            cls: { type: Type.STRING },
            performanceScore: { type: Type.INTEGER },
            seoScore: { type: Type.INTEGER },
            bestPractices: { type: Type.INTEGER },
            analysis: { type: Type.STRING },
            pillars: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            "originalUrl",
            "lcp",
            "fid",
            "cls",
            "performanceScore",
            "seoScore",
            "bestPractices",
            "analysis",
            "pillars",
            "recommendations",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Réponse vide de l'API Gemini.");
    }

    return res.json(JSON.parse(text.trim()));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return res.status(500).json({
      error: message,
      isDevelopmentNotice: !process.env.GEMINI_API_KEY
        ? "La clé GEMINI_API_KEY est requise."
        : undefined,
    });
  }
}
