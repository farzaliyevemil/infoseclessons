---
id: threat-modeling
title: Threat Modeling with STRIDE
description: Finding design flaws before code exists — the four-question frame, STRIDE per element, data-flow diagrams, attack trees, ranking with risk, and the practical workflows (privacy-focused PASTA, agile 4-question) real teams run.
slug: /general-security/threat-modeling
sidebar_position: 20
status: reference
last_reviewed: 2026-09-14
category_key: general-security
keywords:
  - threat modeling
  - stride
  - data flow diagram
  - attack tree
  - pasta
  - secure design
  - sdlt
difficulty: intermediate
tags:
  - security-basics
  - intermediate
---

# Threat Modeling with STRIDE

Pentests find flaws that already shipped; threat modeling finds them while they are still cheap — a whiteboard drawing instead of a production patch. It is the discipline of asking, **for this specific system: what can go wrong, and what are we doing about it?** — before and while building. This is the biggest single gap between "we do security testing" and "we design secure systems", and it is the skill CISSP, secure-design interviews and real architecture reviews all probe (see [Enterprise Security Architecture](/general-security/enterprise-security-architecture)).

## The four questions

Every useful threat model, whatever the acronym, answers four questions in order:

1. **What are we building?** — expressed as a data-flow diagram (DFD), not prose.
2. **What can go wrong?** — a systematic technique (STRIDE below) applied to that diagram.
3. **What are we going to do about it?** — mitigations mapped to each accepted threat: fix, mitigate, transfer (insurance/contract), or accept *with a signature*.
4. **Did we do a good enough job?** — review criteria, follow-ups, and a re-model trigger for design changes.

If a "threat model" you inherited is a 60-page document nobody re-reads, it fails question 4. The artifact is only as alive as the last design change.

## Step 1: draw the system as a DFD

A DFD is boxes and arrows, four element types, nothing more:

- **Process** (rectangles) — code that runs: API, worker, job.
- **Data store** (cylinders) — DB, bucket, queue, cache.
- **External entity** (rectangles with square corners) — users, third-party APIs — things you do not control.
- **Data flow** (arrows) — where data moves, labeled with *what* and *how it is protected*.

The most common modeling mistake is drawing the *network diagram* instead. Threat modeling cares about **trust boundaries** — every place data crosses from one trust level to another (internet→API, web→DB, our code→third party). Most vulnerabilities live exactly on those arrows. Draw the flows you actually have, including the ugly ones ("backend calls vendor with a static API key"), because the ugly ones are where incidents come from.

## Step 2: STRIDE per element

STRIDE is a checklist of six failure categories, each with a canonical question per DFD element:

| Threat | Question | Element it applies to | Example finding |
| --- | --- | --- | --- |
| **S**poofing | Can something impersonate an identity here? | External entities, processes | Auth token accepted from a query parameter; no webhook signature |
| **T**ampering | Can data be modified in transit or at rest? | Data flows, data stores | Unsigned price field submitted from client; mutable audit log |
| **R**epudiation | Can an actor deny doing it? | Processes, flows | Actions without audit trail; logs missing user/request IDs |
| **I**nformation disclosure | Can data leak where it shouldn't? | Flows, stores | Verbose error pages; search endpoint that leaks other tenants' rows |
| **D**enial of service | Can this be exhausted? | Processes, stores | Unpaginated report query; no rate limit on OTP send |
| **E**levation of privilege | Can a user get capabilities they shouldn't? | Processes | IDOR; JWT with role claim accepted unsigned; SSRF into metadata (see [Cloud Pentest](/red-teaming/cloud-pentest)) |

Run the table element-by-element — "for this arrow: S? T? R? I? D? E?" — not in a free-form brainstorm. The checklist is what makes the output reproducible across reviewers. Microsoft's EoP tool and the OWASP Threat Dragon draw DFDs and generate STRIDE prompts for you; a whiteboard photo in the ticket works nearly as well.

Practical tip that raises quality immediately: for each **trust boundary**, ask the STRIDE questions first. Boundaries concentrate findings the way edges concentrate bugs.

## Ranking: not every threat is worth a ticket

Raw STRIDE output is a long list; ranking makes it a backlog. Score each threat on impact × likelihood with the organization's existing [risk methodology](/grc/risk-and-privacy) — or, lighter, triage into: **must-fix before launch** (breaks a security invariant), **fix soon** (bounded by another control), **accepted** (documented, with the accepting owner's name and re-review date). The "accepted with a name" discipline is what separates threat modeling from security theater: an accepted risk nobody owns is an unaccepted risk.

## Attack trees: for the threats that matter most

For one or two crown-jewel scenarios ("steal customer PII from the reporting DB"), go deeper than STRIDE with an **attack tree**: the goal as root, AND/OR branches of sub-goals a real attacker would chain. OR branches mean "any one suffices" — and every leaf that is cheaper than your defense for its siblings is where the attacker goes. Attack trees are how you discover that your carefully hardened login is bypassed by a password reset that trusts caller ID (see [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures) for exactly that human layer).

## Fitting it into a real development cycle

- **Design review ritual**: no epic with a new trust boundary ships without a DFD + STRIDE pass — 45–60 minutes with dev, architect and security. Threat modeling is a *conversation with a checklist*, not a document sprint.
- **The agile 4-question pass** at design time; full STRIDE re-run when a new external integration or privilege boundary appears.
- **Track threats as issues** with a `threat-model` label and a link from the DFD node; when the design changes, the linked threats re-open.
- **PASTA** (Process for Attack Simulation and Threat Analysis) is the heavier seven-stage alternative for regulated contexts — same destination, more ceremony; STRIDE-per-element covers most teams' needs.
- **Feed detections forward**: every accepted-but-monitored threat should have a matching alert in the [SIEM](/blue-teaming/siem-fundamentals) — the model tells detection engineering what "should never happen" looks like.

## Where to go next

- [Enterprise Security Architecture](/general-security/enterprise-security-architecture) — where models live in the architecture practice.
- [OWASP Top 10](/red-teaming/owasp-top-10) — the implementation bugs your model predicts.
- [Security Controls](/grc/security-controls) — the mitigations you will map to.
- [Secure App Development](/general-security/secure-app-development) — turning mitigations into code.
