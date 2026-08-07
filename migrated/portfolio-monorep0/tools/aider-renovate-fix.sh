#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(pwd)"

echo "==> Detecting changed files"

# Check if we're in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
  # Try to get changed files from git
  if git rev-parse --verify origin/main > /dev/null 2>&1; then
    CHANGED_FILES=$(git diff --name-only origin/main...HEAD)
  else
    # Fallback to diff against working tree if origin/main doesn't exist
    CHANGED_FILES=$(git diff --name-only HEAD || git ls-files --modified)
  fi
else
  # Not a git repository - process all relevant files
  echo "Warning: Not a git repository, processing all source files"
  CHANGED_FILES=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" \) ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/dist/*" ! -path "*/.turbo/*" | tr '\n' ' ')
fi

if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files"
  exit 0
fi

echo "Found changed files:"
echo "$CHANGED_FILES"

echo "==> Running install"
pnpm install

echo "==> Running codemods"

npx @next/codemod@canary upgrade latest || true

echo "==> Running lint autofix"
pnpm lint --fix || true

echo "==> Running prettier"
pnpm prettier . --write || true

echo "==> Running TypeScript checks"
pnpm typecheck || true

echo "==> Running tests"
pnpm test || true

echo "==> Running build"
pnpm build || true

echo "==> Launching Aider"

if command -v aider &> /dev/null; then
  # Set timeout for aider command (10 minutes)
  timeout 600 aider \
    --model openrouter/deepseek/deepseek-chat-v3-0324 \
    --yes \
    $CHANGED_FILES \
    <<EOF
Fix all TypeScript, React 19, Next.js 15, ESLint, Prisma and build errors introduced by dependency upgrades.

Rules:
- No any
- Keep strict typing
- Preserve RSC compatibility
- Preserve App Router compatibility
- Preserve Suspense compatibility
- Fix deprecated APIs
- Fix React 19 ref changes
- Fix Next.js async params/searchParams
- Keep production-ready quality
EOF

  # Check if aider timed out
  if [ $? -eq 124 ]; then
    echo "Warning: Aider command timed out after 10 minutes"
    echo "Continuing with remaining steps..."
  fi
else
  echo "Warning: aider not found, skipping AI-assisted fixes"
  echo "Install aider to enable automatic fixes: pip install aider-chat"
fi

echo "==> Final verification"

pnpm lint
pnpm typecheck
pnpm test
pnpm build

echo "==> Done"