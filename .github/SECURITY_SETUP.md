# Security Automation Setup Guide

This document provides step-by-step instructions for setting up the comprehensive security automation pipeline for this TypeScript/Node.js project.

## Overview

The security automation pipeline includes:

- **Dependabot**: Automated dependency updates with grouped PRs
- **CodeQL Analysis**: Static code analysis for security vulnerabilities
- **Security Audit**: Daily npm audit with SARIF upload
- **Dependency Review**: License and vulnerability checks on PRs
- **Auto-Merge**: Controlled automatic merging of safe updates
- **MCP Remediation**: Automated alert tracking and remediation PRs

## Prerequisites

- GitHub repository with admin access
- GitHub Advanced Security enabled (for code scanning)
- Node.js 20 installed locally for testing

## Step 1: Enable Dependabot Alerts

1. Navigate to repository **Settings** → **Security and analysis**
2. Find **Dependabot alerts** section
3. Click **Enable** to activate Dependabot
4. The `.github/dependabot.yml` configuration is already in place

**Configuration Details:**

- Daily npm dependency checks at 03:00 Europe/Brussels
- Weekly GitHub Actions updates on Mondays at 03:00
- Weekly Docker updates on Mondays at 03:00
- Grouped updates for dev and production dependencies
- Auto-merge restricted to patch/minor versions only

## Step 2: Enable GitHub Advanced Security

1. Navigate to repository **Settings** → **Security and analysis**
2. Enable **GitHub Advanced Security** (requires Enterprise plan)
3. This enables:
   - Code scanning alerts (CodeQL)
   - Secret scanning alerts
   - Dependency graph
   - Security tab integration

**Note:** If Advanced Security is not available, CodeQL will still run but results won't appear in the Security tab.

## Step 3: Configure Repository Secrets

Navigate to **Settings** → **Secrets and variables** → **Actions**

### Required Secrets

- **GITHUB_TOKEN**: Automatically provided by GitHub Actions (no manual setup needed)

### Optional Secrets

- **MCP_API_KEY**: If using an external MCP server for remediation

- **NPM_TOKEN**: If installing from private npm registries

- **CODACY_SECRET_KEY**: If using Codacy for additional security scanning

### Adding a Secret

1. Click **New repository secret**
2. Enter secret name (e.g., `MCP_API_KEY`)
3. Paste the secret value
4. Click **Add secret**

## Step 4: Configure Branch Protection

1. Navigate to **Settings** → **Branches** → **Branch protection rules**
2. Click **Add rule** for `main` branch
3. Configure:
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals**: 1 reviewer
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require conversation resolution before merging**
4. Add required status checks:
   - `npm-audit`
   - `dependency-review`
   - `CodeQL Analysis`
   - `secret-scan`
5. Click **Create**

## Step 5: Verify Initial Workflow Runs

### Check Workflow Status

1. Navigate to **Actions** tab
2. Verify the following workflows have run successfully:
   - `CodeQL Analysis`
   - `Security Audit`
   - `Security MCP Remediation`
   - `Tag after merge`

### Manual Trigger for Testing

1. Go to **Actions** tab
2. Select a workflow (e.g., `Security Audit`)
3. Click **Run workflow** → **Run workflow**

### Check Security Tab

1. Navigate to **Security** tab
2. Verify:
   - Dependabot alerts are visible
   - Code scanning alerts are populated
   - Secret scanning alerts (if enabled)
   - Dependency graph is active

## Step 6: Test Auto-Merge on First Dependabot PRs

### Expected Behavior

1. Dependabot opens a PR for a patch/minor update
2. `dependabot-auto-merge` workflow triggers
3. Workflow checks:
   - All status checks pass
   - Update type is patch or minor
   - No conflicting labels
4. Auto-merge is enabled with `--auto --squash`
5. PR is labeled `auto-merge`

### Manual Override

For major updates or when auto-merge should be skipped:

1. Add label `do-not-merge` to the PR
2. Or remove the `auto-merge` label
3. Review and merge manually

## Step 7: Monitor MCP Remediation

The `Security MCP Remediation` workflow runs daily at 03:15 UTC and:

1. Collects open alerts from:
   - Dependabot
   - CodeQL
   - Secret scanning
2. Creates GitHub issues for critical/high alerts
3. Opens remediation PRs when fixes are available
4. Assigns to repository maintainers

### Alert Deduplication

- Maximum 20 alerts per type
- Deduplicated by alert key
- Only open alerts are processed

## Workflow Schedule Summary

| Workflow | Schedule | Time (UTC) | Time (Europe/Brussels) |
|----------|----------|------------|------------------------|
| Dependabot (npm) | Daily | 02:00 | 03:00 |
| Dependabot (Actions) | Weekly (Monday) | 02:00 | 03:00 |
| Dependabot (Docker) | Weekly (Monday) | 02:00 | 03:00 |
| Security Audit | Daily | 02:00 | 03:00 |
| CodeQL Analysis | Weekly (Monday) | 03:00 | 04:00 |
| MCP Remediation | Daily | 01:15 | 02:15 |

## Troubleshooting

### Dependabot Not Opening PRs

- Verify Dependabot is enabled in repository settings
- Check `.github/dependabot.yml` syntax
- Ensure package.json and package-lock.json are committed

### CodeQL Not Running

- Verify GitHub Advanced Security is enabled
- Check workflow permissions in YAML
- Ensure `.github/codeql/codeql-config.yml` exists

### Auto-Merge Not Triggering

- Verify PR is from `dependabot[bot]`
- Check update type (only patch/minor auto-merge)
- Ensure all status checks pass
- Verify GITHUB_TOKEN has write permissions

### MCP Remediation Fails

- Check GITHUB_TOKEN permissions
- Verify gh CLI is installed in workflow
- Check alert API access in repository settings

## Local Testing

### Test npm Audit Locally

```bash
npm ci
npm audit --audit-level=high
```

### Test Workflow Syntax

```bash
# Install actionlint
brew install actionlint

# Validate workflows
actionlint .github/workflows/*.yml
```

### Test with act (Local GitHub Actions)

```bash
# Install act
brew install act

# Run specific workflow
act -W .github/workflows/security-audit.yml
```

## Security Best Practices

1. **Never commit secrets** - Use repository secrets
2. **Review major updates** - Auto-merge only patch/minor
3. **Monitor security tab** - Check alerts regularly
4. **Keep dependencies updated** - Dependabot handles this
5. **Enable 2FA** - For all repository collaborators
6. **Review PRs** - Even with auto-merge enabled
7. **Rotate secrets** - If accidentally exposed

## Contact

For questions or issues with the security automation pipeline:

- Open an issue in the repository
- Contact the security team
- Review GitHub Actions logs for detailed errors
