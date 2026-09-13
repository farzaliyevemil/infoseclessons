---
id: osint-basics
title: OSINT — Open-Source Intelligence Basics
description: Gathering intelligence from public sources legally — recon methodology for pentests and threat intel, people/company/domain techniques, tooling, verification discipline, and the ethics and OPSEC lines that keep it lawful.
slug: /red-teaming/osint-basics
sidebar_position: 13
status: reference
last_reviewed: 2026-09-14
category_key: red-teaming
keywords:
  - osint
  - open source intelligence
  - reconnaissance
  - passive recon
  - threat intelligence
  - shadow osint
difficulty: foundation
tags:
  - red-team
  - beginner
---

# OSINT — Open-Source Intelligence Basics

Every attack and every investigation begins the same way: with information someone published without thinking of it as sensitive. OSINT is the discipline of collecting that information systematically — job postings that reveal the tech stack, conference talks that reveal architecture, a support email format that reveals the naming convention, an employee's conference photo that reveals the badge design. For pentesters it is Phase Zero of [reconnaissance](/red-teaming/penetration-testing); for blue teams it is brand monitoring and attacker-view self-assessment; for threat intel analysts it is the raw feed. This lesson is the methodology, the tooling, and the legal lines.

## Passive vs active: the line that matters

- **Passive collection** touches *only* sources the target doesn't operate — search engines, certificate logs, public registries, social media, breach corpora. The target's defenses never see you.
- **Active collection** interacts with the target's systems — port scans, directory brute-forcing, DNS zone attempts. This is where authorization language applies: active recon against a system is the beginning of a pentest ([Penetration Testing](/red-teaming/penetration-testing)), not OSINT proper.

Keep the distinction in every writeup: "passively determined" and "discovered by scanning" are different claims with different legal weight. Most mistaken-legal-trouble stories start by confusing them.

## The methodology: from target to intelligence

1. **Define the question first.** "What external-facing infrastructure belongs to org X?" and "which employees would click a tailored phishing email?" are different collections with different sources. Intelligence without a question is bookmark hoarding.
2. **Collect broadly, record everything.** Every finding gets a source URL and timestamp — OSINT ages fast (people change jobs, certificates rotate, sites vanish). A screenshot without provenance is an anecdote.
3. **Correlate.** One job posting names "Okta and Jamf"; a LinkedIn profile says "endpoint security"; certificate transparency names `vpn.company.tld` — the intelligence is in the *joins*, not the items.
4. **Produce an artifact.** An attack-surface inventory, a persona profile for phishing simulations, a supplier map. OSINT output is a document with confidence levels, not a folder of screenshots.

## Domain and infrastructure recon

- **Certificate transparency** (crt.sh, Censys) — every TLS certificate ever logged for a domain: subdomains long gone and forgotten, staging hosts, internal naming. The single richest passive source for attack-surface mapping.
- **DNS records and history** — current records plus historical (SecurityTrails-class services) reveal old hosting, migrations and forgotten assets; forgotten assets are the classic real-world entry point.
- **Search-engine dorking** — `site:`, `filetype:`, `inurl:` operators surface exposed documents, directory listings, login pages ("index of /backup") and configuration files. The [dork collections](https://github.com) genre is large; the skill is crafting queries for *your* question and re-running them on a schedule.
- **Shodan/Censys-class engines** — internet-wide device indexes: exposed RDP, open dashboards, industrial gear, and the organization's IP ranges with their banners.
- **Code and pastes** — GitHub/GitLab search for org-affiliated accounts and leaked secrets (paired with [secrets scanning](/general-security/devsecops-pipeline-security) on your own org — the same technique your auditors will run).

## People and organization recon

- **LinkedIn and job postings** — org charts, the security team's size and tooling ("experience with Sentinel required" is a control inventory), new-hire vulnerabilities (week-one employees click more — a fact phishing programs exploit).
- **Breach corpora** (HaveIBeenPwned-class) — which corporate emails appear in credential dumps; tells you both the password-reuse risk and the email naming format.
- **Social platforms** — badge photos, conference talks, support-forum activity; the digital-footprint view attackers use to tailor [social engineering](/red-teaming/social-engineering).
- **Company documents** — annual reports, tender documents, partner logos: technology decisions appear in prose long before they appear on a website.

## Tooling: a lean kit

- **Recon-ng / theHarvester** — modular passive collection for emails, hosts, subdomains.
- **Amass** — attack-surface mapping with passive and active modes (stay passive without authorization).
- **Maltego** — graph-based correlation when the findings need to connect people↔domains↔infra.
- **crt.sh, urlscan.io, SecurityTrails, HaveIBeenPwned** — the web services most collections lean on.
- **A spreadsheet or case tool** — unglamorous and essential: source, timestamp, confidence, next-step for every item.

The tooling matters less than the loop: question → collect → record → correlate → report. Tools rotate monthly; the method does not.

## The defensive mirror: shadow-OSINT yourself

The same collection run against your own organization is a first-class defensive exercise — call it shadow-OSINT:

1. Enumerate your external surface the way an attacker would (CT logs, DNS history, dorks) and diff it against the documented asset inventory — undocumented hosts are findings.
2. Check your own domains for lookalikes and typosquats; feed matches into takedown and brand-monitoring workflows.
3. Review what job postings, conference talks and support forums reveal about your stack — then decide what *should* be public.
4. Sample your own employees' exposure (with HR/legal blessing) to calibrate the [social engineering](/red-teaming/social-engineering) risk and the awareness program.

Run it quarterly; the surface changes with every product launch and departed engineer.

## Ethics, legality and OPSEC

- **Legal lines vary by jurisdiction**: scraping against terms of service, aggregating personal data, and GDPR processing of employee data each carry real constraints. The [risk-and-privacy](/grc/risk-and-privacy) obligations apply to OSINT collections of personal information — data minimization and purpose limitation are not optional.
- **Ethical lines**: OSINT for assessment, defense, journalism and research; the same techniques aimed at individuals (doxxing, stalking) are abuse. Professional OSINT documents its purpose and authorization just like a pentest does.
- **Your own OPSEC**: dedicated research personas and infrastructure, no personal accounts, browser isolation — some targets log who looks at them, and "casually browsing" the wrong org's phishing kit from your real identity is how researchers get visits. Journalists call this source protection; attackers call it tradecraft; either way, it is the same discipline.

## Where to go next

- [Penetration Testing](/red-teaming/penetration-testing) — where OSINT hands off to active recon.
- [Social Engineering](/red-teaming/social-engineering) — the consumer of the people-recon output.
- [Threat Actors and Intel](/red-teaming/threat-actors-and-intel) — the intelligence discipline at campaign scale.
- [Threat Hunting](/blue-teaming/threat-hunting) — the defensive use of the same collection craft.
