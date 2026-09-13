---
id: practical-exam-certifications
title: Practical Exam Certifications — OSCP, PNPT, CRTO and Friends
description: The hands-on certification tier — OSCP, PNPT, CRTO, eJPT and beyond — what each exam actually tests, how to prepare, pass strategies, and how practical certs compare to multiple-choice paths.
slug: /certifications/practical-exam-certifications
sidebar_position: 6
status: reference
last_reviewed: 2026-09-14
category_key: certifications
keywords:
  - oscp
  - pnpt
  - crto
  - ejpt
  - practical certification
  - red team certification
  - hands-on exam
difficulty: intermediate
tags:
  - certifications
  - intermediate
---

# Practical Exam Certifications — OSCP, PNPT, CRTO and Friends

Multiple-choice certificates measure whether you memorized the material; **practical exams measure whether you can do the job under a clock** — break into machines, chain findings, and write it up. Hiring managers for offensive roles weight this tier heavily precisely because it is hard to fake: there is no braindump for a 24-hour lab. This lesson maps the hands-on landscape and how to prepare for it — it assumes the fundamentals from [CompTIA Certifications](/certifications/comptia-certifications) and the lab habits from [Building a Security Home Lab](/virtualization/security-home-lab), because nobody passes a practical exam without having broken things before.

## The landscape

| Certificate | Vendor | Format | Duration | Serves |
| --- | --- | --- | --- | --- |
| **eJPT** — Junior Penetration Tester | INE/eLearnSecurity | Fully proctored lab (network of ~4 hosts) | 48 h | First foot in offensive work |
| **PNPT** — Practical Network Penetration Tester | TCM Security | 5-day engagement: pentest + AD + **written report + debrief call** | 5 days | Realistic junior pentest, best report-writing training in the industry |
| **OSCP** — Offensive Security Certified Professional | OffSec | Proctored lab exam: 3 standalone + AD set, then report | ~24 h | The industry-standard "you can actually pentest" signal |
| **CRTO** — Certified Red Team Operator | Zero-Point Security | Adversary simulation in a lab with **Cobalt Strike** | 48 h | Red team / C2 operator roles |
| **CPTS** — Certified Penetration Testing Specialist | HTB Academy | Proctored exam machine network + report | 10 days | The value-heavy newcomer; AD-heavy, praised for depth-per-price |

(OffSec also sells the OSED/OSWE development-focused tracks and the newer OSCP+ refresh; verify current formats on vendor pages — all of them revise blueprints periodically, same caveat as every certification lesson on this site: [Cisco](/certifications/cisco-certifications), [ISC2](/certifications/isc2-certifications).)

## What each exam actually tests

- **eJPT** — tooling fundamentals: enumeration, pivoting basics, web exploitation, simple privesc. The right first exam if you have never sat a practical: forgiving, cheap, genuinely hands-on.
- **PNPT** — the full engagement shape: scope acknowledgment, external foothold, Active Directory takeover, post-exploitation objectives, then **a written report and a live debrief** where examiners probe your reasoning. The debrief is unique — it certifies that you understood what you did, and it is why PNPT graduates interview well.
- **OSCP** — the endurance classic: enumerate, exploit and escalate on standalone machines plus an Active Directory set, proctored, within the time window, then a professional report. The pass bar is objective and unforgiving; the "Try Harder" culture is real. OSCP is the resume keyword that gets pentest CVs read.
- **CRTO** — assumes pentest basics and teaches **adversary tradecraft**: Cobalt Strike operations, beaconing, lateral movement, evasion, OPSEC. It certifies the red-team tooling layer that OSCP deliberately avoids (OSCP is penetration testing, CRTO is assumed-detection-operations).
- **CPTS** — HTB Academy's exam: a large machine network with full reporting, widely praised for difficulty-per-cost and AD realism; newer, so market recognition is still growing but moving fast.

## Preparation that actually works

Practical exams are passed in a lab, not in a reading chair:

1. **Home lab first.** The [home lab](/virtualization/security-home-lab) with vulnerable targets (VulnHub, DVWA, Metasploitable) is where enumeration becomes reflex. If you can complete TryHackMe's intermediate paths comfortably, you are ready to book a first practical.
2. **Learn Active Directory seriously.** Every serious exam has an AD component: Kerberos abuse, delegated permissions, credential relay, group policy weaknesses. AD attack courses (TCM's, HTB's pro labs) are the differentiator between junior and passable.
3. **Practice enumeration discipline.** Most exam failures are missed information, not missed exploits. Build a personal checklist (ports → versions → creds → web → AD) and run it identically on every machine until it is boring.
4. **Train note-taking from day one.** Screenshots with timestamps, commands and outputs organized per host. OSCP and PNPT reports fail candidates as often as the hacking does; the habit is [the same one](/blue-teaming/log-analysis) that makes SOC work good.
5. **Time-box on exam day.** The classic OSCP advice holds everywhere: attack machines in rotation, park stuck boxes, return with fresh eyes. The exam rewards disciplined process under fatigue — which is the job.

## Choosing between them

- **Never done a practical exam** → eJPT (confidence + fundamentals).
- **Want the most realistic engagement for the money** → PNPT (the report+debrief format is career-shaping).
- **Want the recognized keyword for pentest job applications** → OSCP.
- **Already pentesting, moving to red team ops** → CRTO (and its CRTO-II/III successors).
- **Maximum technical depth per dollar, AD-focused** → CPTS.

A sane sequence for a self-taught path: Security+ ([CompTIA](/certifications/comptia-certifications)) → eJPT → home-lab months → PNPT or CPTS → OSCP once employed in security work → CRTO when red team tooling becomes the job. Multiple-choice leadership certs ([ISC2](/certifications/isc2-certifications)) complement this track later for management roles — practical and governance tiers answer different interview questions.

## The honest caveats

- Practical certificates **expire** more meaningfully: OffSec certs require Continuing Education points, and tradecraft (CRTO especially) ages with the tooling — plan renewal like [Cisco](/certifications/cisco-certifications) recertification.
- These exams are **stressful by design**; candidates fail on sleep management and panic, not on knowledge. Rehearse the full duration in the home lab at least once before the real attempt.
- Cost is real (labs + exam attempts), but discount windows and bundle packs exist; never buy the exam before the lab-hours exist in your calendar.

## Where to go next

- [Penetration Testing](/red-teaming/penetration-testing) — the methodology every one of these exams grades.
- [Wireless Pentest](/red-teaming/wireless-pentest) and [Cloud Pentest](/red-teaming/cloud-pentest) — specializations beyond the core exams.
- [Threat Hunting](/blue-teaming/threat-hunting) — the defender's mirror of the tradecraft CRTO certifies.
- [Building a Security Home Lab](/virtualization/security-home-lab) — where the preparation happens.
