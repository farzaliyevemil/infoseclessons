---
id: log-analysis
title: Log Analysis for Blue Teams
description: Practical log analysis for defenders — the log sources that actually matter on Windows and Linux, a repeatable triage workflow, timeline building, IOC hunting, and the queries and pitfalls that decide investigations.
slug: /blue-teaming/log-analysis
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - log analysis
  - blue team
  - windows event log
  - sysmon
  - syslog
  - journald
  - auditd
  - ioc hunting
  - timeline
difficulty: foundation

tags:
  - blue-team
  - beginner
---

# Log Analysis for Blue Teams

Alerts tell you _something happened_; logs tell you _what actually happened_. The difference between a fifteen-minute containment and a two-week fire drill is almost always the quality of the log analysis in the first hour. This lesson is the practical layer under [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation): which sources to pull, how to triage them, how to build a timeline, and where investigations usually go wrong.

## The only two questions

Every log query you run ultimately serves one of two questions:

1. **Scope** — what else did this touch? (accounts, hosts, data)
2. **Sequence** — in what order did things happen? (initial access → privilege escalation → actions)

If a query answers neither, skip it. That discipline matters because log volume is effectively unbounded; the skill is exclusion, not collection.

## Windows log sources that earn their storage

Windows logging is a firehose. These are the events that repeatedly decide investigations:

| Event ID                  | Log      | What it tells you                                                                                                                                                                        |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4624 / 4625               | Security | Successful / failed sign-ins. Check **Logon Type**: 2 = console, 3 = network, 10 = RDP, 5 = service. Type 3 and 10 from workstations are where lateral movement lives.                   |
| 4688                      | Security | Process creation (command line needs auditing enabled) — the single highest-value Windows event.                                                                                         |
| 4720 / 4722 / 4725 / 4726 | Security | Account created / enabled / disabled / deleted.                                                                                                                                          |
| 4728 / 4732 / 4756        | Security | Member added to a (global / domain local / universal) group — watch privileged groups specifically.                                                                                      |
| 4672                      | Security | Special privileges assigned to a new logon — flags admin-like sessions.                                                                                                                  |
| 4698 / 4699               | Security | Scheduled task created / deleted — classic persistence.                                                                                                                                  |
| 1102 / 517                | Security | **Audit log cleared** — rarely benign, always an investigation trigger.                                                                                                                  |
| 7045                      | System   | New service installed — persistence via services.                                                                                                                                        |
| Sysmon 1 / 3 / 7 / 8 / 11 | Sysmon   | Process create with full command line / network connection / image load / remote thread / file create. Sysmon with a good config turns Windows from a black box into a recording studio. |

RDP history beyond events: `Microsoft-Windows-TerminalServices-LocalSessionManager/Operational` shows who connected to a host even when Security logs are noisy.

## Linux log sources that earn their storage

| Source                                                          | What it tells you                                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL) | SSH sign-ins, sudo use, account changes — the first stop on any Linux host.                                        |
| `journalctl` (systemd)                                          | Everything from every unit; `journalctl --since "2026-09-01" -u sshd` is a normal sentence in an investigation.    |
| auditd (`/var/log/audit/audit.log`)                             | Syscall-level audit rules: file access, execve, user commands via `auoms`/`auditctl`. Coarse but tamper-resistant. |
| Web/access logs (`nginx/access.log`, Apache)                    | Exploitation attempts against exposed apps, unusual user agents, volume anomalies.                                 |
| Cron and systemd timers logs                                    | Persistence: what ran, when, as whom.                                                                              |

Check journal persistence early: `ls /var/log/journal` — on many default installs the journal is volatile and dies at reboot, which is exactly when you need it. Fix that before an incident, not after.

## A repeatable triage workflow

1. **Anchor in time.** Establish the precise UTC timestamp of the trigger alert and the timezone assumptions of every source. Log analysis without timezone discipline produces confidently wrong timelines.
2. **Identify the patient.** Which user, which host, which process? Pull the account's recent 4624/4625 history and the host's recent 4688s.
3. **Expand by pivot, not by volume.** From the anchor: the account's other logons (lateral movement), the process's children and network connections, the destination IPs' other touchpoints. Each hop is one query, not a marathon scroll.
4. **Build the timeline.** Merge events into one chronology (UTC). Free-form notes die; a CSV of `timestamp, actor, action, source, artifact` survives review.
5. **Bound the incident.** Two timestamps decide everything: **first malicious activity** (often days before detection) and **last evidence of attacker control** (drives containment scope).
6. **Write as you go.** Queries run, results, and conclusions in the case file. Future-you and the auditor both need it.

## IOC hunting in practice

Indicator-of-compromise sweeps are cheap to run and easy to do badly. Make them targeted:

- Correlate on **strong identifiers**: file hashes, full command lines, domain names. IP addresses age fast; user-agent strings alone match legitimate software.
- Sweep **widely but shallowly** first (one IOC across all hosts' authentication and process logs), then deepen only where it hits.
- Expect the initial access host to be wrong — attacker infrastructure (VPN, proxy) means the _user's_ endpoint is the pivot, not the source IP.
- Track coverage: "hash swept across 840 hosts' 4688 + Sysmon 1 for 14 days, zero hits" is a finding worth writing down. Negative results bound the incident.

```bash
# Linux quick sweep: every sudo/auth event for a suspect account
grep "suspect.user" /var/log/auth.log* | grep -Ev "session|systemd"

# Failures per source IP — credential stuffing shape
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head
```

```text
# Windows KQL-shaped sketch: rare process parents
SecurityEvent
| where EventID == 4688
| summarize count() by ParentProcessName, NewProcessName
| where count_ < 5        // one-off parent/child pairs deserve eyeballs
```

## The pitfalls that decide cases

- **Timezone drift.** Local-time logs from different systems interleave wrongly. Normalize to UTC before merging anything.
- **Log clearing.** Event 1102 / empty journald segments / gaps in otherwise-continuous sources are themselves evidence — attackers clean up, and the cleanup leaves a shape.
- **Log rotation blindness.** Rotated and compressed logs (`auth.log.2.gz`) must be searched too; most missed pivots live in archives, not the live file.
- **Trusting a single source.** A VPN log and an EDR process event disagreeing about "the same session" is not an error to resolve — it is the investigation.
- **Retention below attacker dwell time.** Industry dwell-time medians sit in weeks. Thirty days of hot logs means some incidents are simply unknowable.

## Where this fits

- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — doing this at fleet scale instead of host scale.
- [Threat Hunting](/blue-teaming/threat-hunting) — the same skills pointed at hypotheses instead of alerts.
- [Digital Forensics](/blue-teaming/digital-forensics) — when the investigation needs disk and memory, not just logs.
- [Linux Hardening](/operating-systems/linux/hardening) and [Endpoint Security](/blue-teaming/endpoint-security) — generating the logs you will one day need.
