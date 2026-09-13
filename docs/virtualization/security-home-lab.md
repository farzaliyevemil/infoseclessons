---
id: security-home-lab
title: Building a Security Home Lab
description: A practical security homelab on modest hardware — Proxmox or Hyper-V host design, pfSense segmentation, attack and defense VMs, a mini-SIEM, internet-safe isolation, and exercises to run in it month by month.
slug: /virtualization/security-home-lab
sidebar_position: 5
status: reference
last_reviewed: 2026-09-14
category_key: virtualization
keywords:
  - home lab
  - homelab
  - proxmox
  - pfsense
  - siem lab
  - security lab
  - practice environment
difficulty: foundation
tags:
  - virtualization
  - beginner
---

# Building a Security Home Lab

Certificates prove you read about security; a lab proves you can *do* it. A homelab is the single highest-leverage investment for anyone following the paths on this site — it turns every lesson ([Linux Hardening](/operating-systems/linux/hardening), [Log Analysis](/blue-teaming/log-analysis), [Wireless Pentest](/red-teaming/wireless-pentest)) from reading into muscle memory, and it is the portfolio artifact that survives interviews ("walk me through your lab" is a real question). This lesson builds one on a budget, in phases, with the safety rails that keep your hobby off the news.

## Hardware: start smaller than you think

Phase 1 runs on what many people already own:

- **Minimum**: a desktop with 32 GB RAM, a 500 GB+ SSD, and a CPU with virtualization extensions (VT-x/AMD-V) — enough for pfSense plus three light VMs.
- **Comfortable**: a used mini-PC or 1U server with 64 GB RAM (Ebay ex-corporate machines are the classic) — room for a SIEM, vulnerable targets and a Kali box simultaneously.
- **Storage**: SSDs for VM disks; snapshots eat space fast (see [Virtualization Basics](/virtualization/virtualization-basics) for why).

Hypervisor choice: **Proxmox VE** (free, KVM-based, web UI, the homelab default) or **Hyper-V** if you are a Windows shop ([Hyper-V](/virtualization/hyper-v)) — the concepts transfer either way.

## The network design that makes it safe

One flat network is the mistake that turns a lab into an incident. The minimum viable segmentation uses pfSense (or OPNsense) as a virtual router/firewall inside the hypervisor:

```text
Internet → (your home router) → pfSense WAN
pfSense LAN interfaces:
  ├─ MGMT   — your admin workstation, hypervisor UI (no internet-facing anything)
  ├─ ATTACK — Kali/attacker VMs (outbound allowed, inbound denied)
  ├─ VULN   — deliberately vulnerable targets (NO outbound internet — they beacon otherwise)
  └─ SOC    — SIEM/collector VMs (receives logs from VULN+ATTACK segments)
```

Three rules carry the safety:

1. **Vulnerable VMs never get outbound internet** — unpatched targets scanning outward, or phoning their authors' C2, are a real problem. Default-deny their egress; add exceptions only deliberately.
2. **Separate VLANs/subnets per zone** with firewall rules between them — which, conveniently, *is* the practical exercise for [Secure Network Design](/networking/secure-network-design).
3. **No production data in the lab.** Not your real password reuse, not your employer's data, not your family's NAS credentials. Lab habits leak.

## The VM starter set

| VM | Purpose | Notes |
| --- | --- | --- |
| **Kali Linux** | Attack toolkit | The standard; snapshots before every exercise |
| **Metasploitable 3 / VulnHub images** | Deliberately vulnerable Linux/Windows targets | Free, designed to be broken — *your* network only |
| **Windows 10/11 eval** | Realistic defender-side target | Practice [Windows Hardening](/operating-systems/windows/hardening) on a copy |
| **Ubuntu Server** | Linux target + services | SSH hardening, auditd, service practice |
| **Security Onion / Wazuh / Splunk Free** | Mini-SIEM | Ingest logs from every segment; this is where [SIEM Fundamentals](/blue-teaming/siem-fundamentals) becomes concrete |

Vulnerable VM sources worth knowing: **VulnHub** (offline targets), **TryHackMe/HackTheBox** (hosted — no lab needed to start), **DVWA / Juice Shop** (web-app targets), and Microsoft's evaluation ISOs for Windows.

## A month-by-month curriculum

The lab earns its shelf space when it has a program. One realistic rotation:

- **Month 1 — network foundation**: pfSense deployed, VLANs segmented, firewall rules documented; break your own rules and fix them.
- **Month 2 — hardening practice**: stand up Ubuntu + Windows targets; apply the hardening lessons; verify with Lynis and CIS-style checks; snapshot "hardened" vs "default" states.
- **Month 3 — attack practice**: run a [pentest methodology](/red-teaming/penetration-testing) against your own Metasploitable/DVWA targets; document findings like a real report.
- **Month 4 — defense**: ship all segment logs to the SIEM; attack your own targets; go find your actions in the logs (the [Log Analysis](/blue-teaming/log-analysis) loop in miniature).
- **Month 5 — detection engineering**: write alert rules for your attacks in the SIEM; tune false positives; measure what you can and cannot see.
- **Month 6 — full cycle**: simulate a small incident end to end — initial access on a vulnerable VM, detection, triage, containment, report (see [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)).

Keep a lab journal — every breakage and fix documented. It doubles as evidence of competence for interviews and certification practicals (the documentation habit is exactly what [OSCP](/certifications/practical-exam-certifications) trains).

## Habits that keep the hobby safe

- **Snapshots before every experiment**; revert freely, that is what they are for.
- **Updates are part of the exercise**: an unpatched lab host that stays online for a year is itself a vulnerable target — patch the lab like a mini-fleet, on purpose.
- **VPN/remote access to the lab** only through strong authentication; never port-forward the hypervisor UI to the internet (this is the classic homelab breach).
- **Power and noise budget**: old servers are loud and hungry; mini-PCs and laptop-class hardware run 24/7 for pennies. Size to what you will actually maintain.
- **Know your ISP/apartment rules** for running attack traffic out of your home connection — another reason vulnerable segments get no internet.

## Where to go next

- [Virtualization Basics](/virtualization/virtualization-basics) and [Hypervisors](/virtualization/hypervisor) — the layer the lab stands on.
- [Proxmox](/virtualization/hypervisor) and [Hyper-V](/virtualization/hyper-v) — the two host choices in depth.
- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — the centerpiece of the defense side.
- [Practical Exam Certifications](/certifications/practical-exam-certifications) — where the lab becomes a career credential.
