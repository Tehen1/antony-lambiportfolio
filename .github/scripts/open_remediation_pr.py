#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "")
BRANCH = os.environ.get("GITHUB_REF_NAME", "main")

def run(*args, check=True):
    result = subprocess.run(args, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Command failed: {' '.join(args)}", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        sys.exit(result.returncode)
    return result.stdout.strip()

def main():
    # Check if there are any changes
    status = run("git", "status", "--porcelain", check=False)
    if not status:
        print("No changes detected, skipping PR.")
        return

    # Configure git
    run("git", "config", "user.name", "github-actions[bot]")
    run("git", "config", "user.email", "github-actions[bot]@users.noreply.github.com")

    # Create branch
    branch = f"security-remediation/{BRANCH}"
    run("git", "checkout", "-b", branch)
    run("git", "add", "-A")
    run("git", "commit", "-m", "fix: security remediation")
    run("git", "push", "-u", "origin", branch)

    # Create PR
    title = "Security remediation"
    body = """Automated remediation for critical Dependabot, code scanning, and secret scanning alerts.

## Changes
This PR contains automated fixes for:
- Dependency vulnerability updates (Dependabot)
- Code security issues (CodeQL)
- Exposed secrets (Secret scanning)

## Verification
- [ ] All CI checks pass
- [ ] No new vulnerabilities introduced
- [ ] Secrets have been rotated
- [ ] Tests pass

## Reviewers
@security-team please review."""

    run("gh", "pr", "create",
        "--repo", REPO,
        "--title", title,
        "--body", body,
        "--base", BRANCH,
        "--head", branch,
        "--label", "security",
        "--label", "automated-remediation")

if __name__ == "__main__":
    main()
