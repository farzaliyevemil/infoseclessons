---
id: ir-playbooks
title: Incident Response Playbooks
description: Ready-to-run incident response playbooks — ransomware, phishing and credential compromise — each with detection triggers, first-hour actions, containment, evidence, recovery and the metrics that tell you whether the playbook works.
slug: /blue-teaming/ir-playbooks
sidebar_position: 9
status: reference
last_reviewed: 2026-09-14
category_key: blue-teaming
keywords:
  - incident response playbook
  - ransomware playbook
  - phishing response
  - credential compromise
  - containment
  - soc runbook
difficulty: intermediate
tags:
  - blue-team
  - intermediate
---

# Incident Response Playbooks

An incident response process explains the lifecycle; a **playbook** is what the on-call analyst actually follows at 02:40 with an alert screaming. The difference matters: under stress, nobody invents procedure — they either execute one or improvise. This lesson provides three field-tested playbooks (ransomware, phishing, credential compromise) in a consistent structure, plus the meta-rules for writing your own. The lifecycle underneath them — triage, containment, eradication, recovery, lessons learned — is covered in [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation); the analysis techniques each playbook calls are in [Log Analysis](/blue-teaming/log-analysis) and [Malware Analysis Basics](/blue-teaming/malware-analysis-basics).

## Anatomy of every playbook

Each playbook below uses the same skeleton — copy this structure for your own scenarios:

1. **Trigger** — the alerts/events that activate it.
2. **First hour** — the time-critical decisions, in order, with owners.
3. **Containment** — stopping the bleeding without destroying evidence.
4. **Investigation** — what to collect and answer.
5. **Eradication & recovery** — removal and safe return to service.
6. **Post-incident** — required outputs and follow-ups.
7. **Contacts & tools** — filled in *before* the incident.

The meta-rules: playbooks assume the organization's reality (who has authority to isolate a domain controller at 3 a.m.?), name **decision owners** rather than job titles alone, and are rehearsed — an unread playbook is a document, a tabletop-exercised one is a capability.

## Playbook 1: Ransomware

**Trigger**: mass file-extension changes or rename bursts; backup job failures on multiple hosts; shadow-copy deletion events (VssAdmin/Shadows Delete); canary-file alerts; extortion note artifacts; EDR mass-encryption behavioral alerts.

**First hour (the decisions that define the incident):**

1. **Confirm scale fast** — how many hosts showing encryption activity? One host is containment; twenty is crisis mode.
2. **Isolate affected segments at the network level** (switch/firewall) — faster than per-host EDR isolation at scale. **Do not power off yet** (see evidence note below).
3. **Protect what remains**: freeze backup jobs from *running* (infected backups are worse than none), and verify one offline/immutable backup set is intact before anything else — that verification decides whether this is recovery or negotiation.
4. **Declare the incident** with the escalation path: leadership, legal, insurance notifier, and — per jurisdiction and policy — law enforcement. Ransomware is a decision-above-SOC event; the SOC's job is facts and containment.
5. **Identify the strain** (note file extension, ransom note text, EDR family detection) — it drives IOCs and, honestly, expectations.

**Containment & evidence:** isolate, do not wipe; capture volatile memory from one representative host *before* shutdown where feasible (the strain's packer and exfil behavior matter later); preserve the initial-access trail — the phishing email or VPN account that started it (see playbooks 2 and 3). Note: some strains delete data after exfiltration — modern ransomware is a **double-extortion** event, so the question "did they take data?" is not optional; it changes legal and notification duties.

**Eradication & recovery:** rebuild rather than clean (a "disinfected" ransomware host is untrusted); rotate every credential that touched affected hosts — domain-wide KRBTGT double reset if domain compromise is confirmed; restore from verified-clean backups into a **segmented, monitored** zone; keep prevention rules (EDR blocklist, GPO/ASR hardening) updated before re-exposure.

**Post-incident:** patient-zero timeline (initial access vector, dwell time), backup-verification cadence review, and the table-top that turns this incident into next year's training.

## Playbook 2: Phishing (reported or detected)

**Trigger**: user-report button submissions; mail-gateway detections post-delivery; anomalous inbox-rule creation; login attempts from phishing-kit URLs.

**First hour:**

1. **Preserve the email** — full headers and original `.eml` from the reporter *before* any purge. Headers are the investigation.
2. **Scope the blast radius**: mail-gateway trace for the same sender/subject/campaign across all mailboxes — who received, who opened (if tracked), who clicked, who submitted credentials.
3. **Triage the artifact**: is it credential harvesting (link to a fake login), payload delivery (attachment → [Malware Analysis Basics](/blue-teaming/malware-analysis-basics)), or BEC-style fraud (payment redirection — then finance is a stakeholder, not just IT)?
4. **Block and purge**: sender/URL/domain to mail-gateway and DNS blocklists; purge matching messages from all mailboxes via the gateway's action (Search-and-purge in M365 terms) — with the affected-user list recorded.

**Containment:** for users who *submitted credentials* → switch to **Playbook 3 (credential compromise) for those accounts immediately** — this is the branching rule analysts forget. For users who *clicked only* → monitor their accounts and endpoints, verify MFA enrollment health.

**Investigation & hardening:** analyze the kit URL (safe: passive DNS, URLScan — not your production browser); check whether the sender was spoofed (SPF/DKIM/DMARC verdicts in headers) or a real account was compromised (then their tenant actions need review too); add detection rules for the sender/kit patterns; feed the simulation program (if the org runs phishing simulations, real incidents are the best training input).

**Post-incident:** report-back to the reporter (positive feedback doubles future reporting rates), gateway rule tuning, and DMARC policy review if spoofing succeeded.

## Playbook 3: Credential compromise

**Trigger**: impossible-travel or anomalous-location sign-ins; MFA-fatigue bursts (push spam) followed by approval; dormant account activity; leaked-credential intelligence hits; inbox-rule creation followed by mail forwarding.

**First hour — in this order (order matters):**

1. **Revoke sessions and tokens** — identity platform "revoke sessions", refresh-token revocation. Killing the password without killing sessions leaves the attacker inside.
2. **Force credential reset** and (for MFA accounts) **re-verify the enrolled factors** — an attacker-approved MFA device must be removed, not assumed absent (see [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures) for the re-enrollment procedure).
3. **Assess what the attacker touched**: mailbox rules and delegations (the classic persistence — forwarding rules survive password resets), OAuth app grants the user approved, files accessed/downloaded, sent items.

**Containment & investigation:** check the sign-in log for every session in the window (IPs, devices, apps); correlate endpoint activity if a session was from a managed device (is the device itself compromised?); hunt the same infrastructure across other accounts ([Threat Hunting](/blue-teaming/threat-hunting) — one stolen password rarely travels alone). Remove malicious inbox rules, OAuth grants, and forwarding — in that order of persistence risk.

**Eradication & recovery:** rotate passwords anywhere the credential was reused; if the account had privileged roles, expand to the privileged-access playbook (KRBTGT/enterprise-app consent review); verify with the user which actions were legitimate — humans are the best baseline data source.

**Post-incident:** why did the password leak (phishing site? infostealer on the endpoint? reuse from a third-party breach — check breach corpora), what detected it and how long it took, and whether conditional-access/step-up policies would have stopped the session (the [Zero Trust](/general-security/zero-trust-architecture) feedback loop).

## Writing and maintaining your own playbooks

- Start from the three here, then add your top incident types from history (every org's top three are knowable from the last 12 months of tickets).
- Every playbook gets **decision points with named owners** ("CISO authorizes domain-wide KRBTGT reset"), a **contact block** with real numbers, and a **last-tested date** in the header.
- **Tabletop each playbook twice a year**; update after every real incident — the post-incident review's action items belong inside the playbook, not just in a report.
- Keep them reachable when the network is not: printed copies or offline access is a ransomware-scenario requirement, not paranoia.

## Where to go next

- [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation) — the lifecycle and evidence discipline under these playbooks.
- [Log Analysis](/blue-teaming/log-analysis) — the collection that feeds every trigger above.
- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — wiring the triggers into alerts.
- [Digital Forensics](/blue-teaming/digital-forensics) — when a playbook hands off to formal evidence work.
