import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({
    status: "online",
    serverTime: new Date().toISOString(),
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
}
