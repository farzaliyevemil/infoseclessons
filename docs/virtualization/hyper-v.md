---
id: hyper-v
title: Microsoft Hyper-V
description: Windows virtualization with Hyper-V — how it compares to VMware and Proxmox, Gen1 vs Gen2 VMs, virtual switches, checkpoints, host hardening, and the admin tasks that come up in real environments.
slug: /virtualization/hyper-v
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: virtualization
keywords:
  - hyper-v
  - microsoft
  - hypervisor
  - vm
  - checkpoint
  - virtual switch
difficulty: foundation

tags:
  - virtualization
  - beginner
---

# Microsoft Hyper-V

Hyper-V is Microsoft's Type-1 hypervisor, shipped as a role in Windows Server and as a feature in Windows 10/11. If [Virtualization Basics](/virtualization/virtualization-basics) and [Hypervisors](/virtualization/hypervisor) covered the theory and [VMware Virtualization](/virtualization/vmware-virtualization) covered the market leader, this lesson is the hypervisor most Windows-centric organizations already own — included in their licensing, manageable with the same Group Policy and identity stack as everything else, and increasingly relevant through Azure Stack HCI and Windows Admin Center.

## Where Hyper-V sits in the market

| Aspect             | Hyper-V                                                                | VMware (ESXi/vSphere)                                | Proxmox VE                         |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| Licensing          | Included in Windows Server; no per-VM hypervisor fee                   | Per-core subscription (post-Broadcom pricing shifts) | Free open source; optional support |
| Management         | Hyper-V Manager, Windows Admin Center, SCVMM (large shops), PowerShell | vCenter — the mature benchmark                       | Built-in web UI                    |
| Ecosystem strength | Windows/Azure integration, AD, Group Policy                            | Third-party tooling, enterprise features             | Community, KVM flexibility         |
| Typical home       | Microsoft-first shops, hybrid-with-Azure estates                       | Large enterprises with mixed fleets                  | Homelabs, budget-conscious SMBs    |

The honest summary: Hyper-V rarely wins a feature checklist against mature vCenter deployments, but it removes an entire vendor relationship for organizations that already run Windows Server everywhere — and its Azure alignment (Shielded VMs, Azure Site Recovery, consistent image formats) is a genuine differentiator.

## Getting started: where it runs

Two flavors, and the difference matters for what you can host:

- **Windows Server with the Hyper-V role** — full server virtualization. Server Core or Datacenter editions; no GUI needed with Windows Admin Center or PowerShell.
- **Windows 10/11 Client Hyper-V** — a developer feature (`Turn Windows features on` → Hyper-V), fine for test VMs but _not_ a hosting platform. Note it coexists awkwardly with VirtualBox/older VMware versions (both use the CPU's virtualization extensions differently) and enables the Windows Sandbox and WSL2 backends.

```powershell
# Server: install the role
Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart

# Client: enable the feature
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

## Generation 1 vs Generation 2: decide before you create

Every VM is created as one of two generations and **cannot be converted later**:

- **Gen 1** — legacy BIOS boot, IDE boot disks, emulated legacy hardware. Exists for old operating systems (2012-era and older guests) and odd installers. Choose it rarely.
- **Gen 2** — UEFI, Secure Boot, SCSI boot, PXE v4/v6. Everything modern runs here; default to Gen 2 unless you have a specific reason not to.

Security-relevant Gen 2 features: **Secure Boot** for Linux guests too (select the Microsoft UEFC template in VM settings), and vTPM (a virtualized TPM 2.0) — required for Windows 11 guests and the foundation for the shielded-VM story below.

## Networking: the three switch types

Virtual switches connect VMs to the world, and choosing wrong produces the classic "my VM can't reach anything" ticket:

| Type         | Behavior                                           | Typical use                                  |
| ------------ | -------------------------------------------------- | -------------------------------------------- |
| **External** | Bound to a physical NIC; VMs are real LAN citizens | Production VMs that need LAN/internet access |
| **Internal** | Host↔VM private network, no physical wire          | Lab networks, host-only services             |
| **Private**  | VM↔VM only, host excluded                          | Isolated test tiers, malware analysis labs   |

Operational notes that save hours: one external switch per physical NIC; use the default switch (NAT) for quick client VMs but expect its subnet to change; and VLAN tags are set per-VM NIC (`Set-VMNetworkAdapterVlan`) — a mis-tagged VM "loses the network" the moment it migrates to another host.

## Checkpoints vs backups — the lesson everyone learns twice

Checkpoints (Hyper-V's snapshots) capture a VM's disk and memory state at a moment. They are excellent for _what if_ work — patch this test VM, revert if the upgrade melts — and terrible as backups:

- A checkpoint is **not a copy**: it is a differencing chain that grows while active, degrades disk performance, and lives on the same storage as the VM. Lose the volume, lose the VM _and_ its checkpoints.
- **Production Checkpoints** (default since 2016) use the guest's Volume Snapshot Service for application-consistent snapshots — good for short-lived pre-change states; still not backups.
- Real protection is a backup product that reads VM disks through Hyper-V's APIs (Windows Server Backup, Veeam, Azure Backup) writing to different storage, following the [Backup and Storage](/servers/backup) rules — including offline/immutable copies.

Rule of thumb for teams: checkpoints may exist for hours, not weeks; an unexplained two-month-old checkpoint on a production VM is a hygiene finding.

## Day-to-day administration

```powershell
# Inventory
Get-VM | Format-Table Name, State, CPUUsage, MemoryAssigned, Uptime

# Lifecycle
New-VM -Name "app01" -Generation 2 -MemoryStartupBytes 4GB `
  -NewVHDPath "D:\VMs\app01.vhdx" -NewVHDSizeBytes 80GB -SwitchName "ProdSwitch"
Checkpoint-VM -Name "app01" -SnapshotName "pre-patch"
Restore-VMCheckpoint -Name "pre-patch" -VMName "app01"
Move-VM -Name "app01" -DestinationHost "hv02"        # live migration between hosts

# Guest services
Get-VMIntegrationService -VMName "app01"             # time sync, heartbeat, guest services
```

The integration services deserve a security note: **time sync keeps Kerberos alive** (a drifting guest is an authentication incident generator in AD domains), while the full "Guest Services" copy channel should stay off on security-sensitive VMs — it is a host-to-guest file path you rarely need.

## Hardening the host

The hypervisor is the highest-value target on the rack — root on it means root on everything. The baseline:

- **Patch the host on its own schedule** and treat host reboots as planned maintenance with failover (clusters exist for this).
- **Minimize the host**: Server Core or minimal role selection; the host runs VMs, not browsers and file shares.
- **Lock down management**: Hyper-V Manager/Admin Center access restricted to admin subnets, PowerShell Remoting over HTTPS, and dedicated admin accounts (no daily-driver accounts with hypervisor rights).
- **Isolate storage and management networks** — management traffic (live migration included, which is memory-over-wire by default) on its own VLAN; enable `Set-VMHost -UseAnyNetworkForMigration $false` and encrypt live migration traffic.
- **BitLocker the host and the VM data volumes**; for high-assurance workloads, look at **Shielded VMs with Host Guardian Service**, which encrypts guest state and cryptographically decides which hosts may run which VM — the strongest anti-tampering story in the Windows ecosystem, at real operational cost.
- **Constrain delegation**: hosts joined to AD with the same care as domain controllers — a hypervisor is one, effectively.

## Choosing the hypervisor, honestly

Hyper-V is the right default when your estate is Windows-centric, your team speaks PowerShell, and your DR plan ends in Azure. VMware remains the enterprise feature benchmark — at a price many organizations are re-evaluating. Proxmox wins homelabs and cost-sensitive Linux shops. The engineering answer is rarely "which is best" and usually "which failure modes, licensing model, and team skills fit us for the next five years" — revisit [Hypervisors](/virtualization/hypervisor) for the theory that comparison rests on.

## Where to go next

- [Virtualization Basics](/virtualization/virtualization-basics) and [Hypervisors](/virtualization/hypervisor) — the concepts under every product here.
- [VMware Virtualization](/virtualization/vmware-virtualization) — the other enterprise incumbent.
- [Windows Server Planning](/servers/windows-server-planning) — sizing hosts in a Windows estate.
- [Backup and Storage](/servers/backup) — what actually protects the VMs this lesson creates.
