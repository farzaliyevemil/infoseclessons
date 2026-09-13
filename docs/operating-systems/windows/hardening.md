---
id: windows-hardening
title: Windows Hardening
description: Hardening Windows servers and workstations — baseline tools (LAPS, AppLocker/WDAC, BitLocker), attack-surface reduction, local admin taming, credential protection, logging, and the verification loop mapped to benchmarks.
slug: /operating-systems/windows/hardening
sidebar_position: 10
status: reference
last_reviewed: 2026-09-14
category_key: operating-systems
keywords:
  - hardening
  - laps
  - applocker
  - wdac
  - bitlocker
  - credential guard
  - asr rules
difficulty: intermediate
tags:
  - windows
  - intermediate
---

# Windows Hardening

Windows is where the users are, which makes it where the phished clicks land — and a default Windows install is tuned for compatibility, not hostility to attackers. Hardening flips the defaults toward deny, shrinks what runs, protects credentials in memory, and makes the machine *loud* when tampered with. The Linux counterpart of this lesson is [Linux Hardening](/operating-systems/linux/hardening); the deep-dive building blocks already on this site are [AppLocker](/operating-systems/windows/applocker) and [BitLocker](/operating-systems/windows/bitlocker). Here is the full checklist with the reasoning, ordered the way an attacker moves.

## 1. Baseline with the tools Microsoft gives you

Never harden freehand. Start from a benchmark and deviate deliberately:

- **Microsoft Security Baselines** (per Windows version, via Group Policy templates) — the vendor's own recommended settings, updated with each release.
- **CIS Benchmarks** — stricter, community-audited, graded (L1/L2); most enterprises target CIS L1 for workstations and servers.
- **Microsoft Defender for Endpoint / Intune** configuration profiles for fleets — policy as data, not as hand-edited Registry edits.

Apply to a golden image, verify, then image-deploy — never hand-harden one machine at a time. (For servers, the image discipline mirrors [Windows Server Planning](/servers/windows-server-planning).)

## 2. Tame local admin — the single biggest win

Almost every Windows compromise chains through *some* local admin right:

- **Remove users from local Administrators.** Day-to-day work runs as standard user; UAC prompts then actually mean something. Applications that demand admin belong in a virtualized/approved exception list.
- **LAPS everywhere** (Windows LAPS is built into modern Windows): every machine's local admin password becomes unique, rotated, stored in AD/Entra and readable only by approved identities. Without it, one dumped local hash (or one reused password) owns the entire fleet — the classic "Pass-the-Hash across 400 identical machines" scenario. Verify with `Get-LapsADPassword`.
- **Limit domain admin logon** to domain controllers and admin workstations only — never let a DA session touch a workstation (credential theft follows the session).
- **Tiered administration** (Tier 0 = DCs/identity, Tier 1 = servers, Tier 2 = workstations) with separate accounts and admin-only patching workstations. The model is simple to state and reshapes an entire attack graph.

## 3. Control what executes

Default Windows runs anything. Two mechanisms, in increasing strength:

- **Smart App Control / SmartScreen** — reputation-based blocking for consumers and small fleets.
- **AppLocker / WDAC** — allowlisting by publisher, path or hash. WDAC is stronger (signed policy, kernel-enforced) and stricter; AppLocker is easier to start with. The pragmatic rollout: **audit mode first** for a month to collect what business apps would break, then enforce with documented exceptions. Every script-kiddie dropper, every `powershell -enc` payload, every LOLBin run dies at this layer — it is the closest thing Windows has to "nothing runs unless approved".

Companion settings that close the scripting side-channels: disable Office macros from the internet (`Block macros from running in Office files from the Internet`), block Office apps from creating child processes, disable Windows Script Host where unused.

## 4. Attack Surface Reduction (ASR) rules

Defender's ASR rule set is a free, high-yield behavior blocklist — rules like "Block process creations originating from PSExec and WMI commands", "Block credential stealing from LSASS", "Block abuse of exploited vulnerable signed drivers". Start in audit mode, review the event log (Event ID 1121/1122), move the quiet rules to block. ASR + AppLocker/WDAC + SmartScreen stack into a defense where a phished user's payload struggles at every step.

## 5. Protect credentials in memory

Mimikatz against LSASS is four decades of Windows compromise in one tool. The layered answer:

- **Credential Guard** (VBS-isolated LSASS, default-on in Windows 11 22H2 Enterprise) — NTLM hashes and Kerberos tickets stop being dumpable.
- **LSASS PPL + LSASS protection audit**; block LSASS access via ASR rule as a second layer.
- **Reduce NTLM**: audit NTLM usage ( NTLM auditing events), move to Kerberos, and plan its restriction — NTLM relay is the gift that keeps giving.
- **Kerberos hardening**: long service-account passwords, AES-only encryption types, gMSA (Group Managed Service Accounts) for services so passwords rotate automatically and are never known to humans.

## 6. Encrypt and control the device

- **BitLocker with TPM+PIN** for laptops (see the [BitLocker](/operating-systems/windows/bitlocker) lesson); escrow recovery keys, and verify — encryption with unescrowed keys is a support outage waiting to happen.
- **Removable media control** where data sensitivity demands it.
- **Screen lock via GPO**, USB device installation restrictions for locked-down roles.

## 7. Patch and reduce the surface

- **WSUS/Intune patch rings**: workstations within days, servers within your window; verify with compliance reporting, not intentions. The same patch-age metric used in [Linux Hardening](/operating-systems/linux/hardening) applies.
- **Uninstall what is not needed**: SMBv1 (the EternalBlue door — check and remove), legacy .NET/Java runtimes, optional features.
- **SMB signing** enabled and **UNC hardening** for SYSVOL/NETLOGON (the 2023-era SMB signing defaults exist precisely because of relay attacks).
- **Disable LLMNR/NetBIOS-NS** (or enable DNS-over-SMB/TLS where available) — they are the protocol behind every responder-style credential-harvesting demo.
- **Network-Level Authentication** for RDP, RDP restricted to management networks or behind a gateway, no exposed 3389 to the internet — ever.

## 8. Logging: make the machine a witness

Default Windows logging is thin where it matters. Enable and ship:

- **Command-line process auditing** (4688 with command line) + **Sysmon** with a tuned config (process, network, image-load, registry events) — this is the data that makes [Log Analysis](/blue-teaming/log-analysis) work on Windows.
- **PowerShell**: module/script-block logging (`4104` events catch every encoded payload verbatim) and transcription for sensitive hosts.
- **Log shipping** to a central store the endpoint cannot alter — local logs are the first thing real attackers clear (Event 1102 is your tamper alarm).

## 9. Verify like an attacker

```powershell
Get-LocalGroupMember Administrators          # who is admin on this box?
Get-LapsADPassword -Identity PC01            # is LAPS actually deployed?
Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" -MaxEvents 20
Get-Process lsass -IncludeUser               # (with PPL: access denied = healthy)
```

Then attack your own estate: a password-spray simulation, a benign macro payload in audit mode, a dump attempt against a test host. Hardening is verified by outcomes, and the benchmark tools (Microsoft Baseline Security Analyzer lineage, CIS-CAT, Defender Vulnerability Management) turn it into a recurring score rather than a one-time project.

## Where to go next

- [Linux Hardening](/operating-systems/linux/hardening) — the same discipline on the other half of the fleet.
- [AppLocker](/operating-systems/windows/applocker) and [BitLocker](/operating-systems/windows/bitlocker) — deep dives on two of the pillars.
- [Group Policy](/servers/group-policy) — the delivery mechanism for all of it.
- [Endpoint Security](/blue-teaming/endpoint-security) — EDR and the response layer on top.
