---
id: siem-fundamentals
title: SIEM Fundamentals
description: What a SIEM really does — collection, normalization, correlation, alerting, retention — how detection rules are built and tuned, which log sources earn their cost, and how a SOC workflow fits around it.
slug: /blue-teaming/siem-fundamentals
sidebar_position: 6
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - siem
  - soc
  - detection engineering
  - correlation rules
  - splunk
  - sentinel
  - elastic
  - mitre attack
  - log sources
difficulty: intermediate

tags:
  - blue-team
  - intermediate
---

# SIEM Fundamentals

A Security Information and Event Management system is the blue team's memory: it collects the logs every host and application produces, normalizes them into one queryable shape, correlates events across machines and time, and pages a human when the correlation says "this is probably an incident". The tool itself — Splunk, Microsoft Sentinel, Elastic Security, QRadar, Wazuh — matters less than the discipline around it. A SIEM fed poorly and tuned carelessly is an expensive way to generate noise; the same product fed well is the difference between knowing about a breach in nine minutes and in nine weeks.

## What a SIEM actually does

Five functions, in pipeline order:

1. **Collection** — agents (Windows Event Forwarding, Fluentd, Beats), syslog, API pull (M365, AWS CloudTrail, Okta), and network sensors push events into the platform.
2. **Normalization** — everything is parsed into a common schema (timestamp, source user, host, action, object, outcome). This is where most SIEM pain lives: a broken parser silently turns a whole log source into dead weight.
3. **Correlation and detection** — rules evaluate streams and aggregates: a single sign-in is noise; five countries in one hour is a rule.
4. **Alerting and case management** — high-confidence matches become incidents with owners, priorities, and workflows.
5. **Retention and search** — cold storage for months-to-years of history, because investigations always need "what happened _before_ we noticed".

The first four run in near-real-time; the fifth is what turns a SIEM from an alerting tool into an investigation platform.

## Log sources, ranked by value per gigabyte

Not all sources deserve the same budget. Rough value ordering for most organizations:

| Tier                                  | Sources                                                                  | Why                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| 1 — identity and authentication       | Domain controller Security logs, IdP/SSO (Okta, Entra ID), VPN, MFA logs | Almost every attack touches identity; these logs answer "who, from where, with what" |
| 2 — endpoint process and power events | EDR telemetry, Sysmon, 4688 process creation                             | The ground truth of what executed and what it touched                                |
| 3 — cloud control plane               | CloudTrail, Azure Activity, GCP Audit                                    | State changes in the place where attackers escalate hardest                          |
| 4 — network edges                     | Firewall, proxy, DNS, email gateway                                      | Initial access paths and C2 channels                                                 |
| 5 — everything else                   | Application logs, DB audit, physical access                              | Context and compliance; ingest selectively                                           |

The common failure is inverted spending: ingesting terabytes of verbose application logs while the DNS resolver — the quietest, highest-signal source — goes uncollected.

## Detection rules: anatomy of a good one

A detection rule is a hypothesis written in code. Good ones share a shape:

- **Data**: which normalized source and fields it reads.
- **Logic**: the specific condition — a threshold, a rare-event join, a sequence.
- **Mapping**: which MITRE ATT&CK technique it detects (this makes coverage measurable).
- **Response guidance**: what the analyst should check first — a rule without a first-step is a pager with no instructions.

Three classic rule patterns:

```text
1. Threshold — brute force
source=auth | where outcome=failed | group_by src_ip, user
| window 10m | where count > 20 → credential_stuffing candidate

2. Rare-behavior — first-time privileged action
source=cloudtrail | where event=AttachUserPolicy
| group_by principal | where first_seen_30d → privilege escalation candidate

3. Sequence — recon then move
source=edr | where process=~"whoami|net group" (by host)
followed within 30m by source=auth | logon_type=10 (same host)
→ hands-on-keyboard pattern
```

Sigma is the de-facto open format for expressing such rules vendor-neutrally, and community repositories map thousands of rules to ATT&CK — a starting library, not a substitute for rules tuned to your own environment.

## Tuning: the real job

The first month of any SIEM produces hundreds of alerts; most are wrong. Tuning is not busywork — it is how detection quality is manufactured:

- **Measure before silencing.** For every noisy rule: true-positive rate, top triggering entities, whether it ever led to a real case. Data kills the "just turn it off" argument.
- **Suppress the benign cause, not the rule.** If the backup service's scheduled `whoami` trips a recon rule, filter _that service on those hosts_, and document why. Blanket suppression is how real detections die.
- **Watch the base-rate trap.** An alert that is 99% accurate and fires 200 times a day still buries analysts in two false positives a day. At SOC scale, precision matters as much as recall.
- **Feed the loop.** Every closed false positive improves a rule; every real incident becomes at least one new rule and one new data requirement.

## The SOC workflow around it

Tier 1 triages alerts against the rule's guidance (validate, enrich, escalate or close) with a strict SLA. Tier 2 investigates and contains — this is where [Log Analysis](/blue-teaming/log-analysis) and [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation) take over. Detection engineering owns the rules, parsers, and coverage mapping. The metrics that keep everyone honest: **MTTD** (mean time to detect — the SIEM's core promise), **MTTA** (time to acknowledge), **MTTR** (time to resolve), false-positive rate per rule, and ATT&CK coverage against the techniques that actually threaten your sector.

## SIEM, XDR, or a data lake?

- A **traditional SIEM** is the right frame when log diversity and compliance retention drive the work.
- **XDR** bundles endpoint, identity, and mail telemetry with vendor-tuned detections — fast time-to-value, at the cost of lock-in and weaker custom logic.
- A **data lake** (raw logs in object storage, queried on demand) wins on cost for long retention; the trade is slower hunting and DIY detection.

Mature teams converge on a hybrid: hot detection in the SIEM/XDR for the last 30–90 days, cold evidence in a lake for the year or more that compliance and investigations demand. The architectural rule that survives every vendor cycle: **Postgres-style thinking — the SIEM is derived, the logs are the truth.** Keep raw logs exportable; never let the platform be the only copy.

## Where to go next

- [Log Analysis](/blue-teaming/log-analysis) — the hands-on skill every rule depends on.
- [Threat Hunting](/blue-teaming/threat-hunting) — using the same data against hypotheses, not alerts.
- [Endpoint Security](/blue-teaming/endpoint-security) — the richest single source a SIEM ingests.
- [Security Tools](/general-security/security-tools) — where the SIEM sits in the wider toolkit.
