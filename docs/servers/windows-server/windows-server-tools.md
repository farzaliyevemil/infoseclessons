---
id: windows-server-tools
title: Windows Server Administration Tools
description: Practical guide to Server Manager, Event Viewer, Performance Monitor, Resource Monitor, Services, Server Core tools, and related admin workflows.
slug: /servers/windows-server-tools
sidebar_position: 5
status: reference
last_reviewed: 2026-03-23
keywords:
  - windows server
  - server manager
  - event viewer
  - perfmon
  - resmon
  - services
difficulty: foundation
---

# Windows Server Administration Tools

Good Windows Server administration is not only about roles and features. It also depends on knowing which built-in tools to open first when you need visibility.

## Server Manager

Server Manager is often the first console administrators use after installation.

It helps with:

- role and feature installation
- local server settings
- event and service visibility
- basic multi-server management

Useful checks right after deployment:

- computer name
- time and time zone
- network configuration
- remote management state

## Event Viewer

Event Viewer is the primary built-in tool for checking Windows logs.

Common log groups:

- Application
- Security
- System
- Setup

Open it with:

```cmd
eventvwr.msc
```

## Performance Monitor

Performance Monitor helps you measure system behavior over time instead of guessing.

Common counters:

- `Processor\% Processor Time`
- `Memory\Available MBytes`
- `PhysicalDisk\Disk Transfers/sec`
- `Network Interface\Bytes Total/sec`

Open it with:

```cmd
perfmon
```

## Resource Monitor

Resource Monitor is useful when you need a faster process-level view than a long performance capture.

It shows which processes are actively consuming:

- CPU
- memory
- disk
- network

Open it with:

```cmd
resmon
```

## Services

Services are one of the most common troubleshooting surfaces on Windows Server.

Use the Services console to:

- verify whether a service is running
- inspect startup type
- restart failed services carefully
- confirm service dependencies

Open it with:

```cmd
services.msc
```

## Server Core note

If you run Server Core, command-line and remote tooling matter more.

Useful options include:

- `sconfig`
- PowerShell remoting
- RSAT from an admin workstation
- Windows Admin Center

## Quick identity and system checks

For a quick view of the current user SID:

```cmd
whoami /user
```

For local users and their SIDs in PowerShell:

```powershell
Get-LocalUser | Select-Object Name, SID
```

## Related tool: Sysprep

If your workflow involves imaging and template preparation, use the dedicated Sysprep lesson instead of treating it as just another daily admin console:

- [Sysprep](/operating-systems/windows/sysprep)

## Practical takeaways

- start with Event Viewer before guessing
- use Performance Monitor when a problem needs measurement over time
- use Resource Monitor when you need immediate process-level visibility
- treat Services as a dependency map, not just a start/stop button
- learn both GUI and remote/PowerShell paths for the same task

## Useful links

- Windows Server administration overview: [https://learn.microsoft.com/en-us/windows-server/administration/](https://learn.microsoft.com/en-us/windows-server/administration/)
- Performance tuning: [https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/](https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/)
- Windows Admin Center: [https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview](https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview)
