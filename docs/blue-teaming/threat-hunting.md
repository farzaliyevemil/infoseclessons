---
id: threat-hunting
title: Threat Hunting
description: Hypothesis-driven threat hunting for blue teams — the hunting loop, choosing and scoring hypotheses, practical hunts for persistence and living-off-the-land techniques, and turning findings into permanent detections.
slug: /blue-teaming/threat-hunting
sidebar_position: 7
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - threat hunting
  - blue team
  - mitre attack
  - hypothesis
  - living off the land
  - persistence
  - detection engineering
difficulty: intermediate

tags:
  - blue-team
  - intermediate
---

# Threat Hunting

Alerts find the attackers who want to be found. Threat hunting is for the ones who don't — the hands-on-keyboard operator living in your environment quietly, the malware written specifically for your company, the compromised vendor account that never trips a threshold. A hunt is a **deliberate search through telemetry for malicious activity that no alert caught**, driven by a hypothesis rather than a page. Where a SIEM answers "did our rules fire?", a hunt answers the uncomfortable question: "what are our rules _missing_ right now?"

This lesson assumes the telemetry foundations from [Log Analysis](/blue-teaming/log-analysis) and the platform from [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — hunting without collected, normalized data is just guessing in an expensive chair.

## The hunting loop

Practical hunting is a cycle, not a dive:

1. **Frame a hypothesis.** Specific and falsifiable: _"A service account with shell access interactively logged on to a workstation in the last 14 days"_ — not _"is anything bad happening?"_
2. **Choose data and technique.** Which log sources hold the answer (authentication, process creation, file events), and which MITRE ATT&CK technique expresses the hypothesis (T1078.003 local accounts, T1059 shell commands).
3. **Query with an open mind.** Run the search — but treat every anomaly en route as data. Most hunts die from analyst tunnel vision on the original idea.
4. **Judge honestly.** Benign explanation found → document it (that baseline knowledge is a deliverable). Suspicious and unexplainable → escalate into a case (see [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)).
5. **Harvest.** Every hunt ends in artifacts: a new detection rule, a tuned parser, a documented baseline, or a data-gap ticket ("we can't answer this — EDR isn't on the build servers"). **A hunt that produces nothing written down never happened.**

Mature programs run this loop on a schedule (weekly cadence is common) and track it like any engineering work: hypotheses raised, hunts completed, detections created, data gaps opened, coverage added.

## Where hypotheses come from

- **ATT&CK coverage gaps.** Map your detection rules to ATT&CK; the empty cells are the hunting queue. "We detect nothing for T1547 boot autostart on Linux" is a hunt assignment.
- **New threat intelligence.** A campaign report describing TTPs — not IOCs — that could apply to your stack. IOCs age in days; behaviors hunt for years.
- **Surprise from past incidents.** Every post-incident review yields "what if they had done X instead?" — those X's are pre-validated hypotheses.
- **Your own attack surface.** New SaaS integration, a legacy server nobody owns, an acquired company's domain: every change to the estate is a hunting prompt.
- **Athlete's instinct.** The metric that looks slightly wrong, the host whose log volume pattern differs. Chase those — gut findings are usually pattern recognition worth formalizing.

## Four hunts that earn their hours

### 1. Living-off-the-land binaries

Attackers increasingly use signed admin tools instead of malware. Look for _legitimate binaries in illegitimate contexts_:

```text
# PowerShell from Office apps, encoded commands, download cradles
process_events
| where parent in ("winword.exe","excel.exe","outlook.exe")
| where child in ("powershell.exe","cmd.exe","mshta.exe")

# Certutil or bitsadmin doing downloads — never normal on servers
process_events | where name in ("certutil.exe","bitsadmin.exe")
| where cmdline has_any ("http","urlcache")
```

Baseline first ("our backup agent runs certutil hourly"), then hunt the exceptions. The output is nearly always a detection rule about _relationships_ (parent→child, user→host), which is exactly what generic signatures miss.

### 2. Persistence that survives reboots

Anything ensuring re-execution is attacker real estate. Sweep both sides of the fence:

- **Windows**: scheduled tasks created outside change windows (4698), new services (7045), Run keys and startup-folder writes (Sysmon 13/11), WMI subscriptions.
- **Linux**: systemd units and timers added outside package management (diff `/etc/systemd/system` against package manifests), `authorized_keys` churn, crontabs for service accounts, `rc.local` edits.

The strongest version is set-theoretic: _every scheduled task in the estate, joined against a change-ticket inventory_ — the set difference is a short list where anything unexplained is worth a conversation.

### 3. Identity: accounts behaving like two people

Identity telemetry is the highest-signal hunting ground:

- Service accounts with **interactive or RDP logons** (they should authenticate as services, not sit at desktops).
- Accounts authenticating from **impossible travel** or from subnets never seen for that account before.
- **Dormant accounts waking up** — 90 days of silence, then VPN at 3 a.m.
- MFA-fatigue shapes: push-bombing bursts, or MFA succeeded from a device never seen for the user.

These hunts need Tier-1 sources from the [SIEM](/blue-teaming/siem-fundamentals) value table — identity first, always.

### 4. Data leaving through the side door

Exfiltration hides in volume shifts: a host uploading 50× its baseline to a never-before-seen destination, DNS queries with high-entropy subdomains, cloud storage APIs used by a user who never touched them. Baselines make this hunt mechanical — which is also why it fails silently when NetFlow/proxy/DNS logs are uncollected. The hunt output here is often a data-gap finding, and that is a real outcome.

## The discipline that keeps hunting honest

- **Time-box.** Two-hour hunts with a written question beat eight-hour dives with vibes. If it gets interesting, escalate — don't chase the whole intrusion inside a hunt slot.
- **Baseline before anomaly.** "Rare" means nothing without knowing what common looks like; the first execution of any hunt against new telemetry is baseline-building, not detection.
- **Write everything.** Queries, screenshots, and the benign explanation for every oddity. The hunt document is what turns one analyst's insight into the team's capability.
- **Convert or close.** Exit conditions: a new rule deployed, a baseline documented, a data-gap ticket filed, or a case opened. Anything else is an unfinished hunt.

## Measuring a hunting program

Hunting metrics are slippery (you can't count breaches prevented). Track what you actually control: hypotheses executed per month, **detection rules created from hunts**, telemetry gaps closed, ATT&CK coverage delta per quarter, and mean time from hunt to deployed detection. A program whose output is a growing rule library and a shrinking coverage map is working — even in quarters where nothing malicious turned up, because "nothing found, here's proof of what we can now see" is exactly the result you want.

## Where to go next

- [Log Analysis](/blue-teaming/log-analysis) and [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — the data layer hunting stands on.
- [Threat Actors and Intel](/red-teaming/threat-actors-and-intel) — turning intelligence into hypotheses.
- [Attack Indicators](/red-teaming/attack-indicators) — the IOC vocabulary hunts correlate against.
- [Digital Forensics](/blue-teaming/digital-forensics) — when a hunt escalates into a case.
