---
id: windows-server-planning
title: Windows Server Planning Before Installation
description: Plan your Windows Server deployment by choosing the right edition, roles, deployment model, and installation option.
sidebar_position: 3
slug: /servers/windows-server-planning
---

# Windows Server Planning Before Installation

Before you install Windows Server, you should answer four practical questions:

1. Which edition fits your environment?
2. Which roles and features do you actually need?
3. Will this run on physical hardware or as a virtual machine?
4. Should you deploy Server Core or Desktop Experience?

---

## 1. Choose the Right Edition

Windows Server 2025 is commonly planned around these editions:

| Edition | Typical use |
| --- | --- |
| **Standard** | Physical servers and lightly virtualized environments |
| **Datacenter** | Highly virtualized environments and larger server estates |
| **Datacenter: Azure Edition** | Azure-focused deployments with Azure-specific capabilities |

For many teams, a simple planning rule is:

- choose **Standard** when virtualization is limited
- choose **Datacenter** when you expect heavy virtualization on the same licensed host

Licensing details can get more complex than a quick comparison table. In simplified terms:

- **Standard** gives rights for up to **two OSEs/VMs per fully licensed server**
- **Datacenter** gives rights for **unlimited OSEs/VMs per fully licensed server**
- if you need more than two VMs on Standard, additional licensing may be required, so cost planning matters

> For final licensing decisions, always verify the current Microsoft licensing guidance for your channel and environment.

---

## 2. Plan Roles and Features

Windows Server becomes useful through its roles and features. The best approach is to decide what the server is supposed to do before installation.

Common roles:

| Role | Purpose |
| --- | --- |
| **Active Directory Domain Services (AD DS)** | Identity, computer, and domain management |
| **DNS Server** | Resolves names to IP addresses |
| **DHCP Server** | Automatically assigns IP configuration |
| **File and Storage Services** | File shares and storage workloads |
| **Hyper-V** | Virtualization platform |
| **Web Server (IIS)** | Hosts websites and web apps |
| **Remote Desktop Services** | Delivers remote desktop and application access |
| **Windows Server Update Services (WSUS)** | Centralized update distribution |

Practical guidance:

- avoid putting every role on one server unless it is only a small lab
- separate identity, file, web, and virtualization workloads where possible
- plan backup, monitoring, and patching together with the role itself

---

## 3. Physical Server or Virtual Machine?

### Physical Server

Benefits:

- direct access to hardware resources
- useful for some specialized or performance-sensitive workloads

Tradeoffs:

- usually less flexible
- hardware lifecycle and disaster recovery are harder to manage
- scaling often means buying more hardware

### Virtual Machine

Benefits:

- easier provisioning and migration
- better consolidation of multiple servers on one host
- usually easier backup, recovery, and platform management

Tradeoffs:

- depends on the health of the virtualization platform
- noisy-neighbor and host-level issues can affect multiple VMs
- resource planning is still required; overcommit can create instability

> In modern environments, Windows Server often runs as a VM on Hyper-V, VMware, or a cloud platform. Also remember: snapshots are useful, but they are not a full backup strategy.

---

## 4. Choose an Installation Option

Microsoft documents two main installation options:

### Server Core

- no traditional GUI shell
- lower resource usage
- smaller attack surface
- better fit for controlled production workloads
- usually managed with PowerShell, RSAT, or Windows Admin Center

### Server with Desktop Experience

- includes the graphical interface
- easier for learning, troubleshooting, and some admin workflows
- uses more resources than Server Core

Practical rule:

- prefer **Server Core** when your team can manage it properly
- choose **Desktop Experience** when the workload, tooling, or admin maturity requires it

---

## 5. Minimum Hardware Requirements

According to current Microsoft Learn guidance for Windows Server:

| Component | Minimum |
| --- | --- |
| **Processor** | 1.4 GHz 64-bit CPU |
| **RAM** | 2 GB |
| **Storage** | 32 GB |
| **Network** | 1 Gigabit Ethernet adapter |
| **Firmware** | UEFI 2.3.1c-based system and firmware supporting Secure Boot |
| **TPM** | TPM 2.0 |

Recommended planning is usually higher than the minimum:

- **4 GB+ RAM** for Server Core is a more practical baseline
- **8 GB+ RAM** is often more realistic for Desktop Experience or multi-role testing
- plan extra disk space for updates, logs, page files, monitoring agents, and backup tooling

> Minimum requirements only tell you what can boot. They do not tell you what will run comfortably in production.

---

## Pre-Installation Checklist

- Which roles are required?
- Is this server physical or virtual?
- Which edition matches the expected virtualization level?
- Will you use Server Core or Desktop Experience?
- Does the hardware meet realistic workload requirements, not only the minimum?
- Is licensing ready?
- Do you already know how this server will be backed up, monitored, and patched?

---

## Useful Links

- Hardware requirements: [https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements](https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements)
- Compare Windows Server editions: [https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison](https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison)
- Server Core vs Desktop Experience: [https://learn.microsoft.com/en-us/windows-server/get-started/install-options-server-core-desktop-experience](https://learn.microsoft.com/en-us/windows-server/get-started/install-options-server-core-desktop-experience)
- Evaluation Center: [https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)
- Windows Admin Center: [https://aka.ms/windowsadmincenter](https://aka.ms/windowsadmincenter)
