---
id: compliance-frameworks
title: Compliance Frameworks — ISO 27001, SOC 2, PCI DSS and Friends
description: What ISO 27001, SOC 2, PCI DSS, NIST CSF and GDPR actually demand, how certification differs from attestation and law, which to choose for your context, and how to prepare without boiling the ocean.
slug: /grc/compliance-frameworks
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: grc
keywords:
  - compliance
  - iso 27001
  - soc 2
  - pci dss
  - nist csf
  - gdpr
  - audit readiness
difficulty: intermediate

tags:
  - grc
  - intermediate
---

# Compliance Frameworks — ISO 27001, SOC 2, PCI DSS and Friends

The acronym wall is the first thing that greets anyone entering GRC: ISO 27001, SOC 2, PCI DSS, NIST CSF, GDPR, HIPAA. The acronyms hide a simple map once you sort them by **what kind of obligation each one is** — a certifiable management standard, an audit attestation, a card-network contract, a legal regulation, or a voluntary framework. This lesson sorts the wall, shows how the pieces overlap, and lays out a preparation path that does not require boiling the ocean. (Risk methodology itself, and GDPR data-subject rights in detail, live in [Risk Management and Privacy](/grc/risk-and-privacy); here we stay on the frameworks.)

## The sorting table

| Framework                     | What it is                                        | Who demands it                                          | Scope                                  | "Pass" looks like                                                         |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| **ISO 27001**                 | Certifiable **management-system** standard (ISMS) | Customers, regulators, tenders                          | Whole organization (or declared scope) | Certificate from an accredited CB, valid 3 years with surveillance audits |
| **SOC 2**                     | **Attestation** over service criteria (AICPA)     | Enterprise customers of SaaS/hosts                      | One service or system, one org         | Audit report (Type 1 point-in-time; Type 2 over 3–12 months)              |
| **PCI DSS**                   | **Contractual** card-industry standard (v4.x)     | Card networks / acquiring banks                         | Cardholder data environment (CDE) only | ROC/SAQ validated by QSA or self-assessment                               |
| **NIST CSF / 800-53**         | Voluntary **framework / control catalog**         | US federal (mandatory there), everyone else as guidance | Whatever you map                       | No certificate — maturity self-assessment                                 |
| **GDPR / HIPAA**              | **Law**                                           | Regulators                                              | All processing of covered data         | No certificate — demonstrable compliance or fines                         |
| **CIS Controls / Benchmarks** | Prioritized **hardening guidance**                | Insurers, cyber-essentials schemes                      | Per system                             | Implementation groups (IG1–IG3)                                           |

The single most common confusion: **ISO 27001 certifies a management system, not a security level.** A company can be ISO-certified and breached; the certificate says the _process_ exists and is audited, not that every control is perfect. Conversely, SOC 2 says nothing about the whole company — only the systems in the report's scope.

## ISO 27001: the management system

ISO 27001's core idea is a **Plan-Do-Check-Act loop wrapped around a Statement of Applicability (SoA)**: you scope the ISMS, run a risk assessment, pick controls from Annex A (93 controls across organizational, people, physical and technological themes), justify every include/exclude decision, and then prove the loop runs — management review, internal audit, corrective actions, metrics.

What auditors actually probe: not whether you have a firewall, but whether you _know why_ it is configured that way, who reviewed it, and what happens when it drifts. The heavy lifting is documents-with-a-pulse: risk methodology, asset inventory, access reviews, incident process, awareness training evidence. Stage 1 audit reviews the paperwork and readiness; Stage 2 tests that the system operates; surveillance audits continue annually; recertification every three years.

**Cost/effort reality for a small company:** 6–12 months of preparation, one significant project per month — the certificate is won in spreadsheets and reviews, not in security appliances.

## SOC 2: the SaaS tax

SOC 2 is the de-facto enterprise sales checklist for anything cloud-hosted. It evaluates a _service_ against the AICPA Trust Services Criteria — Security (mandatory), plus optionally Availability, Confidentiality, Processing Integrity, Privacy.

- **Type 1** — controls existed and were suitably designed at one point in time. Cheap, fast, weak: customers increasingly insist on Type 2.
- **Type 2** — the auditor tests **operating effectiveness over a period** (3–12 months). Evidence accumulates _before_ the audit window: access reviews, change tickets, background checks, vendor assessments. This is why SOC 2 prep is a 6+ month way-of-working, not a document sprint.

A subtle but decisive point: **the auditor tests what your policies say you do.** Policies far stricter than reality are self-inflicted findings. Write policies that describe the process you can actually sustain, then automate the evidence (access reviews, MFA coverage, endpoint compliance) so the audit window is a report export, not an archaeology project.

## PCI DSS: scope is the strategy

PCI DSS applies to anyone storing, processing or transmitting cardholder data, and its brutal genius is **scope**: everything that touches the Cardholder Data Environment inherits the full 12-requirement requirement set — network segmentation, encryption, key management, quarterly ASV scans, penetration testing.

The strategic plays, in order of value:

1. **Don't touch card data.** Tokenization via a payment provider (Stripe, Adyen) removes most requirements — your QSA will love you.
2. **Segment and shrink the CDE.** One well-isolated payment zone beats three "mostly compliant" networks.
3. **Then comply, within a small scope.** PCI compliance projects fail on scope creep, not on control difficulty.

## NIST CSF and CIS Controls: the maps behind the certificates

Neither certifies anything, and both are more useful day-to-day than most certificates:

- **NIST CSF 2.0** — six functions (Govern, Identify, Protect, Detect, Respond, Recover) as a common language for maturity discussions with executives and insurers.
- **NIST 800-53** — the full control catalog federal systems must implement; the source many other frameworks borrow from.
- **CIS Controls** — 18 controls in three implementation groups, deliberately ordered by defense value per unit of effort: IG1 is "essential cyber hygiene" (inventory, patches, MFA on remote access, backups) that stops the majority of commodity attacks.

The practical pattern mature teams use: **one internal control set, mapped to many frameworks.** Implement a control once (say, MFA on all remote access), map it to ISO A.5.17, SOC 2 CC6.x, PCI 8.x, NIST CSF PR.AA — then every audit becomes a re-mapping exercise instead of a re-implementation.

## Choosing and sequencing

A realistic decision path for a growing organization:

1. **CIS IG1 now** — hygiene that pays regardless of any certificate.
2. **SOC 2 Type 1** when the first enterprise customer demands it; start **Type 2 evidence collection immediately after** (the window runs while you sell).
3. **ISO 27001** when tender pipelines, regulated customers or international expansion make a management-system certificate pay for itself.
4. **PCI DSS** only as far as your card-data footprint forces — and pay down that footprint first.
5. **GDPR/HIPAA-class obligations** are not a menu item — they apply by data type and jurisdiction; treat them as the legal floor under everything above.

## Preparation that does not boil the ocean

- **Inventory before policy.** Half of every framework is "know your assets and data flows" — the same inventory serves all of them.
- **One control library, many mappings.** Build the internal matrix once; audits become exports.
- **Automate the evidence.** Access reviews, MFA coverage, patch status, backups tested — if a control's evidence is a manual screenshot, it will fail during a busy quarter.
- **Beware the paper gap.** The audit punishes the distance between policy and practice. Write what you do, then do what you wrote — in that order, with drift alerts.
- **Treat the certificate as a milestone, not the goal.** The ISMS/report/ROD is the product; the PDF is its receipt.

## Where to go next

- [Risk Management and Privacy](/grc/risk-and-privacy) — the risk engine feeding every framework above.
- [Security Governance](/grc/security-governance) — the policies and roles frameworks hang on.
- [Security Controls](/grc/security-controls) — implementing what the frameworks ask for.
- [Vulnerability Management](/general-security/vulnerability-management) — the operational loop audits keep asking about.
