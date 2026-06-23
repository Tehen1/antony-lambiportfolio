#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "")
BRANCH = os.environ.get("GITHUB_REF_NAME", "main")

def run(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout.strip()

def main():
    status = run("git", "status", "--porcelain")
    if not status:
        print("No changes detected, skipping PR.")
        return

    run("git", "config", "user.name", "github-actions[bot]")
    run("git", "config", "user.email", "github-actions[bot]@users.noreply.github.com")

    branch = f"security-remediation/{BRANCH}"
    run("git", "checkout", "-b", branch)
    run("git", "add", "-A")
    run("git", "commit", "-m", "fix: security remediation")
    run("git", "push", "-u", "origin", branch)

    title = "Security remediation"
    body = "Automated remediation for critical Dependabot and code scanning alerts."

    subprocess.run([
        "gh", "pr", "create",
        "--repo", REPO,
        "--title", title,
        "--body", body,
        "--base", BRANCH,
        "--head", branch,
    ], check=True)

if __name__ == "__main__":
    main()
