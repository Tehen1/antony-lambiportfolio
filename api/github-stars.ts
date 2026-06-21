import type { VercelRequest, VercelResponse } from "@vercel/node";

// Allowlist: only permit valid GitHub owner/repo names (alphanumeric, hyphens, dots, underscores)
const GITHUB_SAFE_PATTERN = /^[a-zA-Z0-9_.-]{1,100}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const owner = req.query.owner;
  const repo = req.query.repo;

  if (!owner || !repo || typeof owner !== "string" || typeof repo !== "string") {
    return res.status(400).json({ error: "Missing 'owner' or 'repo' query parameters." });
  }

  // SSRF fix: validate owner and repo against safe allowlist pattern
  if (!GITHUB_SAFE_PATTERN.test(owner) || !GITHUB_SAFE_PATTERN.test(repo)) {
    return res.status(400).json({ error: "Invalid 'owner' or 'repo' parameter format." });
  }

  try {
    const headers: Record<string, string> = {
      "User-Agent": "antony-lambiportfolio",
      Accept: "application/vnd.github.v3+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
    });

    if (response.ok) {
      const data = (await response.json()) as { stargazers_count: number };
      return res.json({ stars: data.stargazers_count });
    }

    const fallbackStars =
      repo.includes("fixie") || repo === "fixie-run" ? 42 : 18;
    return res.json({ stars: fallbackStars, rateLimited: response.status === 403 });
  } catch {
    const fallbackStars =
      typeof repo === "string" && (repo.includes("fixie") || repo === "fixie-run")
        ? 42
        : 18;
    return res.json({ stars: fallbackStars });
  }
}
