---
id: windows-server-2025-installation
title: Install Windows Server 2025 from Scratch
description: Step-by-step Windows Server 2025 installation guide covering media prep, setup flow, first boot tasks, and safe initial configuration.
slug: /servers/windows-server-2025-installation
sidebar_position: 2
status: reference
last_reviewed: 2026-03-23
keywords:
  - windows server 2025
  - installation
  - server setup
  - evaluation center
  - initial configuration
difficulty: foundation
---

# Install Windows Server 2025 from Scratch

This lesson focuses on the installation workflow itself. If you still need to choose an edition, role set, or deployment model, start with [Windows Server Planning](/servers/windows-server-planning).

## Before You Start

You need three things before installation:

- installation media, usually an ISO from an approved source
- a target machine or virtual machine that meets the hardware requirements
- a deployment decision: Server Core or Desktop Experience

Microsoft provides Windows Server 2025 evaluation media through the Evaluation Center and documents the installation workflow on Microsoft Learn.

## Get the Installation Media

For lab and training use, the simplest option is the official evaluation download:

- [Windows Server 2025 Evaluation Center](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)

The evaluation edition expires after 180 days. Microsoft also notes that evaluation installations should be activated over the internet within the first 10 days to avoid automatic shutdown behavior.

## Minimum Hardware Baseline

Use Microsoft documentation as the final source of truth, but this is the practical minimum baseline for a basic installation:

| Component | Minimum |
| --- | --- |
| CPU | 1.4 GHz 64-bit processor |
| RAM | 2 GB for Server Core |
| RAM | 2 GB for Desktop Experience, 4 GB recommended |
| Storage | 32 GB or more |
| USB media | 8 GB flash drive if installing from USB |

For production workloads, treat these as install minimums, not sizing guidance.

## Create Bootable Media

### Physical hardware

If you are installing on a physical server, prepare a bootable USB drive from the ISO.

Common approaches:

- use Microsoft's documented USB preparation steps
- use a trusted tool such as Rufus for lab scenarios

Microsoft's installation guidance assumes at least an 8 GB USB drive.

### Virtual machine

If the target is a VM, you usually do not need a USB drive. Attach the ISO directly to the virtual DVD drive and boot the VM from that media.

## Installation Flow

## 1. Boot from the media

- On physical hardware, use the BIOS or boot menu to select the USB or DVD device.
- On a VM, attach the ISO and boot from the virtual optical device.

When prompted with the usual boot message, continue into setup.

## 2. Select language and keyboard settings

Choose the language, time format, and keyboard layout appropriate for the environment, then continue.

## 3. Start installation

Select the Windows Server installation path and continue through setup.

Depending on the media and licensing channel, you may be prompted for:

- a product key
- an evaluation path
- a licensing method such as pay-as-you-go

Use the option that matches your environment and licensing model.

## 4. Select the image

Choose the edition and installation option that matches the plan:

- Standard or Datacenter
- Server Core or Desktop Experience

For learning environments, Desktop Experience is often easier at first. For controlled production environments, Server Core is often preferred because it uses fewer resources and presents a smaller attack surface.

## 5. Accept the license terms

Review and accept the software terms to continue.

## 6. Choose a clean installation

If you are building from scratch, choose the clean install path rather than an in-place upgrade path.

## 7. Select the target disk

Choose the disk where Windows Server should be installed.

Important points:

- verify you are selecting the correct disk
- expect the selected target to be overwritten in a clean install
- on some systems, multi-disk boot behavior can matter, so follow Microsoft's installation notes if the device has more than one disk

## 8. Let setup complete

The system copies files, installs components, and reboots several times. This is normal.

## 9. Set the local Administrator password

At the end of setup, create a strong password for the built-in Administrator account.

Use a password that meets complexity requirements and store it securely if this is a temporary standalone build.

## First-Boot Tasks

After the first sign-in, do the basics before adding roles or promoting the server.

## Rename the server

Set a naming convention that matches your environment before the server joins a domain.

Example:

```text
WS2025-DC01
WS2025-FS01
WS2025-MGMT01
```

## Configure networking

For server workloads, a static address is usually more appropriate than leaving the machine on dynamic DHCP.

At minimum, validate:

- IPv4 or IPv6 addressing
- default gateway
- DNS servers
- hostname resolution

If this server will become a domain controller, make sure the DNS design is intentional before promotion.

## Set the correct time and time zone

Time drift causes real operational problems, especially in domain environments. Kerberos is sensitive to clock skew.

## Run updates

Install the latest cumulative updates and servicing components before turning the server into a critical dependency.

GUI path:

```text
Settings -> Windows Update -> Check for updates
```

PowerShell examples:

```powershell
hostname
ipconfig /all
systeminfo
Get-NetFirewallProfile | Select-Object Name, Enabled
Get-WindowsFeature | Where-Object Installed
```

## Install management components if needed

Depending on the platform, you may also need:

- virtualization guest tools such as VMware Tools
- Windows Admin Center for remote management
- vendor drivers and firmware updates on physical hardware

## When to Stop and Recheck

Do not immediately stack more roles onto a fresh server before these checks are complete:

- network connectivity works
- time is correct
- updates are installed
- disk layout is as expected
- the server name is final
- backup and recovery expectations are understood

## Official References

- [Install Windows Server from installation media](https://learn.microsoft.com/en-us/windows-server/get-started/install-windows-server)
- [Hardware requirements for Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements)
- [Windows Server 2025 Evaluation Center](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)
- [Get started with Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/get-started-with-windows-server)
