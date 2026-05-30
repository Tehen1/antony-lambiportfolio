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
    const { description } = req.body ?? {};
    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return res.status(400).json({
        error: "Veuillez fournir une description de projet valide (minimum 10 caractères).",
      });
    }

    const client = getGeminiClient();
    const prompt = `L'utilisateur souhaite obtenir une proposition de projet et une architecture technique pour le besoin suivant: "${description.trim()}".
Génère une proposition professionnelle complète et structurée sous forme d'un objet JSON strict.
Sois précis, technique et audacieux. Utilise des technologies modernes (comme Solidity, Solana, Rust, Next.js, Web3 adapters, micro-agents IA, Supabase, Vercel, etc.).`;

    const response = await generateContentWithRetryAndFallback(client, {
      contents: prompt,
      config: {
        systemInstruction:
          "Tu es un architecte principal Web3 et IA chevronné agissant pour le compte d'Antony Lambi, développeur freelance d'élite à Liège. Tu crées des propositions d'architecture, estimations de coûts et calendrier. Ta réponse doit TOUJOURS être un objet JSON valide et structuré avec ces clés précises: 'projectName', 'suggestedStack' (un tableau de chaînes), 'securityReview', 'costEstimation' (p.ex. '4500€ - 7000€'), 'timelineEstimate' (p.ex. '3 - 5 semaines'), et 'architectureDetails'. Aucun texte hors du JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            suggestedStack: { type: Type.ARRAY, items: { type: Type.STRING } },
            securityReview: { type: Type.STRING },
            costEstimation: { type: Type.STRING },
            timelineEstimate: { type: Type.STRING },
            architectureDetails: { type: Type.STRING },
          },
          required: [
            "projectName",
            "suggestedStack",
            "securityReview",
            "costEstimation",
            "timelineEstimate",
            "architectureDetails",
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
        ? "Configurez GEMINI_API_KEY dans les variables Vercel."
        : undefined,
    });
  }
}
