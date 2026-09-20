---
id: osint-and-search-engines
title: OSINT and Cybersecurity Search Engines
description: A practical, exam-oriented guide to passive OSINT sources and search engines used for authorised reconnaissance.
slug: /red-teaming/osint-and-search-engines
sidebar_position: 14
status: reference
last_reviewed: 2026-09-20
keywords:
  - osint
  - reconnaissance
  - shodan
  - censys
  - google dorks
  - cybersecurity search engines
difficulty: foundation

tags:
  - red-team
  - beginner
---

# OSINT and Cybersecurity Search Engines

**Open-source intelligence (OSINT)** is the structured collection and analysis of information that is publicly available. In authorised security work, OSINT helps a team understand its external attack surface without immediately touching the target's systems.

This lesson is about lawful, passive reconnaissance. A public result is not automatically permission to exploit, scan, scrape aggressively, or access an account. Active testing still requires explicit scope and authorisation.

## What can OSINT answer?

Start with a question, not with a tool. Examples:

- Which domains and subdomains belong to the organisation?
- Which internet-facing services appear to be exposed?
- What technologies are publicly disclosed by websites and job posts?
- Have corporate email addresses appeared in known breach notifications?
- What information would help an attacker create a convincing phishing message?

The output should be an asset list or intelligence note with a source URL, collection time, confidence, and recommended action. A folder of screenshots is not intelligence until findings are correlated and explained.

## Passive and active reconnaissance

| Type | Meaning | Examples | Authorisation |
|---|---|---|---|
| **Passive** | Uses third-party or public sources without directly probing the target | Search engines, certificate transparency, public DNS history, public code, company pages | Still requires a lawful purpose when personal data is involved |
| **Active** | Sends requests or probes to the target's systems | Port scanning, directory brute force, banner grabbing, DNS zone transfer attempts | Requires explicit written scope and rules of engagement |

Search engines that index a service may show useful information, but using the result to log in, exploit a service, or bypass access controls is a separate activity.

## Useful search and intelligence sources

| Source | Best use | Important caution |
|---|---|---|
| **Search engines and Google Dorks** | Find indexed documents, login pages, exposed directories, and public technology references | Use only for authorised targets; do not download or access sensitive data unnecessarily |
| **Shodan** | Search internet-facing devices by service banners, ports, and organisation or netblock | An index is not proof that a service is currently reachable |
| **Censys** | Certificate, host, service, and internet-infrastructure discovery | Validate ownership and current status before reporting |
| **SecurityTrails-class DNS tools** | Current and historical DNS records, subdomains, and hosting changes | Historical data can be stale |
| **crt.sh** | Certificate Transparency records and forgotten subdomains | A certificate does not prove that a host is still active |
| **Hunter.io** | Public email-pattern and domain information | Respect privacy and data-protection requirements |
| **Have I Been Pwned** | Check whether an email appears in known breach notifications | Do not attempt to retrieve or test leaked passwords |
| **GitHub/GitLab search and grep.app** | Public code, exposed configuration, and accidental secrets | Report exposed secrets responsibly; never use them to access systems |
| **WiGLE** | Public wireless-network observations | Treat location and personal data carefully |
| **GreyNoise and similar services** | Context for internet scanning and background noise | Intelligence context is not an authorisation to scan |

Other commonly seen tools include **Recon-ng**, **theHarvester**, **Maltego**, **SpiderFoot**, **Amass**, **ExifTool**, **Metagoofil**, and **FOCA**. The tool is less important than the workflow: question → collect → record → correlate → report.

## A simple OSINT workflow

1. **Define scope.** Record the organisation, domains, IP ranges, people or brands in scope, and the actions that are prohibited.
2. **Collect passively.** Start with official websites, search engines, certificate logs, DNS data, public code, and reputable intelligence services.
3. **Record provenance.** Save the exact URL, timestamp, query, screenshot or response summary, and confidence level.
4. **Correlate findings.** Link a certificate subdomain to DNS, a DNS host to a service index, and a job post to a technology clue.
5. **Validate ownership.** Shared hosting, CDN addresses, old records, and third-party services can create false positives.
6. **Report risk, not just data.** Explain why an exposed admin panel, leaked secret, or forgotten subdomain matters and what the owner should do.
7. **Stop when the question is answered.** More data is not automatically better intelligence.

## Exam points

- **OSINT is intelligence, not just information collection.** Analysis, context, confidence, and an actionable output are required.
- **Passive recon** avoids direct interaction with the target; **active recon** probes the target and needs authorisation.
- **Shodan and Censys** are internet-wide indexes, not vulnerability scanners by themselves.
- **Certificate Transparency** can reveal subdomains, but a certificate does not prove current service availability.
- **Google Dorking** uses search operators such as `site:`, `filetype:`, and `inurl:` to narrow indexed results.
- **A finding needs validation.** A third-party host or stale DNS record should not be reported as a confirmed asset without evidence.

## Safe practice exercise

Use a domain you own or a training domain explicitly provided for the exercise:

1. Find its public certificate records in `crt.sh`.
2. Compare the discovered names with the organisation's documented asset inventory.
3. Check whether public pages reveal technology versions or sensitive operational details.
4. Record each result with a timestamp and confidence.
5. Write remediation such as removing stale DNS, restricting an exposed service, or removing a secret from public code.

Never turn a passive discovery exercise into scanning or exploitation without written authorisation.

## Key takeaway

OSINT gives defenders and authorised testers an attacker-view of public exposure. Search engines, certificate data, DNS history, code search, and breach-notification services are valuable when used with a clear question, careful validation, lawful scope, and responsible reporting.
