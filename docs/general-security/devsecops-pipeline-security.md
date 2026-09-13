---
id: devsecops-pipeline-security
title: DevSecOps — Securing the CI/CD Pipeline
description: Building security into the delivery pipeline — shift-left vs shift-right, SAST/DAST/SCA/secrets-scanning compared, supply-chain security (SBOM, dependency pinning, signing), pipeline hardening, and gates that don't strangle delivery.
slug: /general-security/devsecops-pipeline-security
sidebar_position: 22
status: reference
last_reviewed: 2026-09-14
category_key: general-security
keywords:
  - devsecops
  - ci cd security
  - sast
  - dast
  - sca
  - secrets scanning
  - sbom
  - supply chain
difficulty: intermediate
tags:
  - security-basics
  - intermediate
---

# DevSecOps — Securing the CI/CD Pipeline

The pipeline is where code becomes production — which makes it both the best place to catch vulnerabilities (automatically, on every commit, before they cost anything) and a prime attack target itself (compromise one CI system and you inherit every credential it holds). DevSecOps is the discipline of getting both right: **automated security checks inside delivery, and a delivery system that is itself hardened.** This lesson covers the scanner landscape, supply-chain controls, and the pipeline hardening checklist, with the gates that catch real issues without strangling delivery speed.

## Shift-left and shift-right: what moves where

- **Shift-left** = find issues as early as possible: threat modeling at design ([Threat Modeling](/general-security/threat-modeling)), SAST on the pull request, secrets scanning pre-commit. Cheapest fixes, developer-friendly context.
- **Shift-right** = keep testing in production where truth lives: DAST against staging, runtime protection, chaos and abuse testing, and feeding production findings back into the pipeline.

A mature pipeline runs both; the biggest single mistake is buying a heavy scanner, running it quarterly, and drowning in a 4,000-finding PDF nobody reads.

## The scanner landscape (and what each is actually for)

| Class | What it checks | Catches | Representative tools |
| --- | --- | --- | --- |
| **SAST** | Source code, statically | Injection flaws, hardcoded credentials, unsafe APIs | Semgrep, SonarQube, CodeQL |
| **DAST** | The running app, from outside | Runtime misconfig, auth bypasses, injection confirmations | ZAP, Burp Suite Enterprise |
| **SCA** | Dependencies and licenses | Known-vulnerable libraries (the Log4Shell class), abandoned packages | Dependabot, Snyk, OWASP Dependency-Check |
| **Secrets scanning** | Commits, diffs, histories | API keys, tokens, private keys pushed to git | Gitleaks, TruffleHog, provider-side push protection |
| **IaC scanning** | Terraform/K8s definitions | Public S3 buckets, open security groups, privileged containers | Checkov, tfsec, KICS |
| **Container scanning** | Images and layers | CVEs in base images, embedded secrets, wrong user | Trivy, Grype |

Two rules prevent scanner fatigue. **First, start with secrets scanning and SCA** — they have near-zero false-positive noise and cover the two most common real-world breach causes (leaked keys, vulnerable dependencies). **Second, every gate ships with a triage SLA**: a finding older than 30 days without an owner is the metric that decides whether the program works. Ignore-baselines are legitimate (document why each finding is waved through) — unreviewed blanket disables are not (the kadr-tap-style `.gitleaksignore` pattern: two historical findings, each explained, dated).

## Supply-chain security: trusting less

The dependency you didn't write is code you run with full privileges. The modern minimum:

- **SBOM** (Software Bill of Materials) — a machine-readable inventory of every component (SPDX/CycloneDX formats). Generate per build (`syft`), store with the artifact; when the next Log4Shell lands, "are we affected?" becomes a query, not a week.
- **Pin and verify.** Pin dependency versions and lockfiles; pin CI actions by commit SHA, not `@latest`; verify third-party artifacts with checksums or signatures (Sigstore/cosign is becoming the norm).
- **Least-privilege tokens in CI.** Pipelines should get short-lived, scoped credentials (OIDC federation instead of stored cloud keys — both GitHub Actions and GitLab support it). A leaked CI token with 15 minutes of life and one-repo scope is a non-event; a static cloud key is a breach.
- **Protect the branch.** Required reviews, signed commits where feasible, no direct pushes to main — the pipeline is only as trustworthy as what can enter it.

## Hardening the pipeline itself

CI systems are crown jewels holding production credentials, and they are frequently exposed to the internet. The checklist:

- **Runners as attack surface**: self-hosted runners on ephemeral VMs, never on long-lived production machines; public-repo PRs run in isolated, unprivileged environments (a rogue PR can otherwise steal runner secrets).
- **Secrets hygiene**: every secret in the vault/secret manager, never in logs (`mask` everything), per-repository scoping, rotation on contributor departure — the same offboarding discipline as [Onboarding and Offboarding](/helpdesk-basics/onboarding-offboarding).
- **Deploy separation**: the build pipeline can *push* artifacts to a registry; the deploy pipeline — a different job, ideally different credentials — *pulls and promotes* them. Build systems that can also deploy are one compromise from production.
- **Environment gates**: production deploys require an approval from outside the author (four-eyes), even if automated otherwise.

## Gates that don't strangle delivery

The engineering compromise, battle-tested:

1. **Fail the build**: new secrets, new critical CVEs in direct dependencies, SAST findings on changed lines only.
2. **Ticket, don't block**: pre-existing SAST debt and medium CVEs — auto-created issues with owners and SLAs.
3. **Report everything**: every scan publishes its full result as a build artifact; visibility without blocking.
4. **Review the rules quarterly**: a gate that fires weekly and gets ignored is worse than no gate — tune or delete it.

The metric set that proves the program: percentage of repos with scanners active, mean age of open critical findings, secrets incidents per quarter (should trend to zero after push-protection), and — the honest one — **developer lead time added by security gates**. If your gates add two days to every PR, the org will route around you; if they add two minutes, the org forgets they exist, which is the goal.

## Where to go next

- [Threat Modeling](/general-security/threat-modeling) — design-time security that feeds these gates.
- [Secure App Development](/general-security/secure-app-development) — writing the code the scanners check.
- [Vulnerability Management](/general-security/vulnerability-management) — the lifecycle for findings that leave the pipeline.
- [Container and Kubernetes Security](/general-security/cloud/container-and-kubernetes-security) — securing what the pipeline ships.
