---
id: storage-filesystems-servers
title: Storage, File Systems, and Server Form Factors
description: DAS, NAS, SAN, NTFS vs ReFS, MBR vs GPT, VHD types, tower/rack/blade servers, and vSphere datastore protocols.
slug: /servers/storage-filesystems-servers
sidebar_position: 7
status: reference
last_reviewed: 2026-04-22
keywords:
  - storage
  - das
  - nas
  - san
  - ntfs
  - refs
  - gpt
  - vhd
  - rack server
difficulty: foundation
---

# Storage, File Systems, and Server Form Factors

This lesson covers the storage layer from the physical disk up to the hypervisor: storage types (DAS/NAS/SAN), partition tables, file systems, virtual disk formats, physical server form factors, and how VMware vSphere consumes each of them.

## Storage types

Storage is the term for the systems that hold persistent data. Enterprise storage comes in three main delivery models:

### DAS — Direct Attached Storage

The simplest model: disks are connected directly to a single server, with no network in between.

- Cheapest option
- Reachable only from the server it is attached to
- Limited flexibility at scale
- Typical interface: SAS (Serial Attached SCSI) or SATA

### NAS — Network Attached Storage

A NAS is a storage appliance reachable over the regular IP network by hostname. Clients connect via file-sharing protocols.

- Used as a file server — store, share, and retrieve files
- Common protocols: SMB (Windows), NFS (Unix), iSCSI (block)
- Easy to configure
- Throughput is generally lower than SAN; suitable for file sharing and smaller workloads, less ideal for heavy transactional workloads

### SAN — Storage Area Network

The most professional tier, designed for enterprise workloads. A SAN has its own dedicated network (separate switches) between servers and storage arrays.

```
Server → HBA → SAN switch → Storage array (EMC, NetApp, Pure…)
```

Common transports:

- **Fibre Channel (FC)** — highest performance; uses SFP modules and FC cabling
- **iSCSI** — block storage over standard Ethernet; cheaper, good for many workloads
- **FCoE** — FC encapsulated in Ethernet frames

Example SAN switches: Brocade 300 (24 port), Brocade 5100 (40 port). An **HBA (Host Bus Adapter)** is a PCIe card that connects a server to the SAN fabric.

**Strengths:** centralized management, high throughput, high redundancy, scales for enterprise workloads.
**Trade-offs:** expensive, requires specialized skills to operate.

### Comparison

| | DAS | NAS | SAN |
| --- | --- | --- | --- |
| Connectivity | Direct | LAN | Dedicated SAN fabric |
| Protocol | SAS/SATA | SMB/NFS/iSCSI | FC/FCoE/iSCSI |
| Throughput | Moderate | Lower | Very high |
| Cost | Low | Moderate | High |
| Typical use | Small setups | File servers | Enterprise, virtualization |

## Disk partition tables

A partition table defines how a disk is divided into partitions. Two are in widespread use:

### MBR (Master Boot Record)

- Supports disks up to **2 TB**
- Maximum of **4 primary partitions**
- Legacy BIOS boot

### GPT (GUID Partition Table)

- Supports disks larger than 2 TB (effectively unlimited for current hardware)
- Up to **128 partitions** by default
- Required for UEFI boot
- Recommended for modern systems

> A small **recovery partition** (~100–500 MB) is often created automatically at OS install time.

### Disk types

| Type | Purpose |
| --- | --- |
| Basic disk | Standard disk with primary/extended partitions and simple volumes |
| Dynamic disk | Used for Windows software RAID and spanned/striped volumes |

## File systems

Windows Server ships with several file systems, each suited to different workloads:

| File system | Full name | Notes |
| --- | --- | --- |
| FAT / FAT32 | File Allocation Table | Legacy; 4 GB maximum file size |
| exFAT | Extended FAT | USB drives, flash cards |
| NTFS | New Technology File System | Default for Windows ✓ |
| ReFS | Resilient File System | Designed for very large volumes, data integrity |

### FAT32 vs NTFS

| | FAT32 | NTFS |
| --- | --- | --- |
| Max file size | 4 GB | Effectively unlimited |
| Compression | No | Yes |
| Encryption (EFS) | No | Yes |
| ACLs / permissions | No | Yes |
| Journaling | No | Yes |

> **Allocation unit size** affects read/write performance. Workloads like SQL databases typically pick a larger allocation unit (for example 64 KB) to match their I/O pattern.

### ReFS (Resilient File System)

Introduced in Windows Server 2012 and maturing in later releases, ReFS targets very large volumes and focuses on data integrity (checksums, integrity streams, protection against silent corruption). However, not every Microsoft workload supports ReFS — for example, running Exchange or SQL databases directly on ReFS has limitations. Check current Microsoft guidance before placing workloads there.

## Virtual hard disk formats

Virtual disk formats store a VM's "disk" as a file on the host or shared storage:

| Format | Platform |
| --- | --- |
| .vhd / .vhdx | Hyper-V (Microsoft) |
| .vmdk | VMware |

### VHD types

**Fixed**
A VHD that reserves its full declared size immediately. 300 GB allocated means 300 GB taken on the host at creation time.

- Highest performance ✓
- Recommended for databases and high-I/O workloads

**Dynamically expanding**
Starts small and grows as data is written, up to the declared maximum.

- Efficient use of host storage
- Slightly lower performance than fixed

**Differencing**
Used for snapshots and clones — the disk chains a child file onto a parent. Writes go to the child; reads fall back to the parent.

```
Base disk ← differencing ← (writes here)
```

Differencing disks are convenient for short-lived state and snapshots, but chains of snapshots add I/O overhead and can fragment performance. Microsoft's official guidance is to keep VM snapshots short-lived (days, not months).

## Physical server form factors

### Tower server

Looks like a large desktop PC, but with server-grade components.

- Convenient for small offices without a rack
- Flexible drive and expansion layout
- Cannot be mounted in a standard 19-inch rack

### Rack server

Designed for 19-inch data center racks. Measured in units of **1U** (1.75"). A switch is typically 1U; servers range from 1U to 4U or more.

- Standardized form factor for data centers
- Better power, cooling, and cable management
- Easy to scale by adding more units

### Blade server

Blades are stripped-down server modules that slot into a shared chassis. The chassis provides power, cooling, networking, and often shared storage connectivity.

- Very high density (many compute nodes per rack unit)
- Shared cooling and power reduce per-node overhead
- Hot-swappable blades — replace a module without taking the chassis down
- Trade-off: vendor lock-in at the chassis level

### Comparison

| | Tower | Rack | Blade |
| --- | --- | --- | --- |
| Location | Desk / closet | 19" rack | Blade chassis |
| Density | Low | Medium | Very high |
| Cooling | Simple | Per-rack | Centralized chassis |
| Best for | Small office | Data center | Large data center |
| Cabling | Lots | Moderate | Minimal |

## VMware vSphere datastores

ESXi hosts consume storage through **datastores**. Two formats:

| Datastore | Purpose | Works with |
| --- | --- | --- |
| VMFS (VM File System) | VMware's clustered file system | Direct-attached, FC, FCoE, iSCSI |
| NFS | Standard NFS mount | NAS appliances |

```
ESXi hosts
     ↓
  VMFS   NFS
   ↓      ↓
DAS FC FCoE iSCSI   NAS
```

### vSphere feature support by storage type

| Protocol | Boot from SAN | vMotion | vSphere HA | vSphere DRS | Raw Device Mapping |
| --- | :---: | :---: | :---: | :---: | :---: |
| Fibre Channel | ✓ | ✓ | ✓ | ✓ | ✓ |
| FCoE | ✓ | ✓ | ✓ | ✓ | ✓ |
| iSCSI | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFS | — | ✓ | ✓ | — | — |
| DAS | — | ✓ | — | — | ✓ |
| Virtual Volumes | — | ✓ | ✓ | ✓ | — |
| vSAN | — | ✓ | ✓ | ✓ | — |

**Feature glossary:**
- **vMotion** — migrate a running VM from one ESXi host to another with no downtime
- **vSphere HA** — automatically restart VMs on another host if their host fails
- **vSphere DRS** — automatically balance VMs across hosts based on load
- **Raw Device Mapping (RDM)** — give a VM direct access to a storage LUN

## Practical takeaways

- Use GPT for anything larger than 2 TB and for all UEFI systems
- Pick allocation unit size based on workload (default for general use, larger for DBs)
- Fixed VHDs beat dynamically expanding for high-I/O workloads; avoid long snapshot chains
- Match the storage tier to the workload: DAS for isolated hosts, NAS for file sharing, SAN for virtualization and transactional databases
- For vSphere, FC/iSCSI give the widest feature coverage (HA, DRS, RDM) — NFS is simpler but has gaps

## Useful links

- Windows Server storage: [https://learn.microsoft.com/en-us/windows-server/storage/storage](https://learn.microsoft.com/en-us/windows-server/storage/storage)
- ReFS overview: [https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview](https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview)
- SMB file server overview: [https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview](https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview)
