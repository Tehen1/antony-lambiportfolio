#!/usr/bin/env python3
import json
import os
import subprocess
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "")
LABEL = "security"
ISSUE_PREFIX = "[Security]"
MAX_ALERTS = 20

root = Path(".")
dependabot_file = root / "dependabot-alerts.json"
code_scanning_file = root / "code-scanning-alerts.json"

def load_json(path):
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            return data if isinstance(data, list) else data.get("items", data.get("alerts", []))
        except Exception:
            return []

def gh(*args):
    return subprocess.run(["gh", *args], check=True, capture_output=True, text=True).stdout.strip()

def create_issue(title, body):
    cmd = [
        "gh", "issue", "create",
        "--repo", REPO,
        "--title", title,
        "--body", body,
        "--label", LABEL,
    ]
    subprocess.run(cmd, check=True)

def alert_key(obj):
    return obj.get("number") or obj.get("id") or obj.get("ghsa_id") or obj.get("html_url") or obj.get("htmlUrl") or obj.get("package_name") or "unknown"

def is_critical_or_high(sev):
    if not sev:
        return False
    return sev.lower() in {"critical", "high"}

dependabot = load_json(dependabot_file)
code_scanning = load_json(code_scanning_file)

seen = set()

for a in dependabot[:MAX_ALERTS]:
    sev = (
        a.get("security_vulnerability", {}).get("severity")
        or a.get("securityAdvisory", {}).get("severity")
        or a.get("severity")
        or ""
    )
    state = a.get("state", "open")
    if state != "open" or not is_critical_or_high(sev):
        continue

    key = f"dependabot:{alert_key(a)}"
    if key in seen:
        continue
    seen.add(key)

    pkg = (
        a.get("security_vulnerability", {}).get("package", {}).get("name")
        or a.get("securityVulnerability", {}).get("package", {}).get("name")
        or a.get("package_name")
        or "unknown-package"
    )
    title = f"{ISSUE_PREFIX} Dependabot {sev.upper()} - {pkg}"
    body = "\n".join([
        f"Repository: `{REPO}`",
        f"Type: Dependabot alert",
        f"Severity: `{sev}`",
        f"Package: `{pkg}`",
        "",
        "Actions:",
        "- validate the upgrade path",
        "- patch the dependency or bump the lockfile",
        "- run tests and security audit",
    ])
    create_issue(title, body)

for a in code_scanning[:MAX_ALERTS]:
    sev = a.get("rule", {}).get("security_severity_level") or a.get("severity") or ""
    state = a.get("state", "open")
    if state != "open" or not is_critical_or_high(sev):
        continue

    key = f"codescan:{alert_key(a)}"
    if key in seen:
        continue
    seen.add(key)

    rule_id = a.get("rule", {}).get("id") or a.get("rule", {}).get("name") or "unknown-rule"
    path = a.get("most_recent_instance", {}).get("location", {}).get("path") or a.get("location", {}).get("path") or "unknown-path"
    line = a.get("most_recent_instance", {}).get("location", {}).get("start_line") or a.get("location", {}).get("start_line") or "?"
    title = f"{ISSUE_PREFIX} Code scanning {sev.upper()} - {rule_id}"
    body = "\n".join([
        f"Repository: `{REPO}`",
        f"Type: Code scanning alert",
        f"Severity: `{sev}`",
        f"Rule: `{rule_id}`",
        f"Location: `{path}:{line}`",
        "",
        "Actions:",
        "- review the vulnerable code path",
        "- patch the root cause",
        "- add regression tests",
    ])
    create_issue(title, body)
