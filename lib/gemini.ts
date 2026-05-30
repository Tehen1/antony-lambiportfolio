import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured. Set it in Vercel project environment variables."
      );
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { "User-Agent": "antony-lambiportfolio" },
      },
    });
  }
  return aiClient;
}

export async function generateContentWithRetryAndFallback(
  client: GoogleGenAI,
  params: { contents: unknown; config?: unknown },
  primaryModel = "gemini-2.0-flash",
  fallbackModel = "gemini-2.0-flash-lite"
) {
  const maxAttempts = 3;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await client.models.generateContent({
        ...params,
        model: primaryModel,
      });
      return response;
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      const status =
        err && typeof err === "object" && "status" in err
          ? String((err as { status: unknown }).status)
          : "";
      const isTransient =
        errMsg.includes("503") ||
        errMsg.includes("high demand") ||
        errMsg.includes("UNAVAILABLE") ||
        status === "503" ||
        status === "UNAVAILABLE";

      if (isTransient && attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
      } else if (!isTransient) {
        break;
      }
    }
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await client.models.generateContent({
        ...params,
        model: fallbackModel,
      });
      return response;
    } catch (err: unknown) {
      lastError = err;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError;
}

export { Type };
