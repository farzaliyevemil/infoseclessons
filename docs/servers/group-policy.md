---
id: group-policy
title: Group Policy (GPO) Basics
description: Learn GPO structure, processing order, inheritance, enforced links, password policy scope, SYSVOL, and practical troubleshooting basics.
slug: /servers/group-policy
sidebar_position: 4
status: reference
last_reviewed: 2026-03-23
keywords:
  - group policy
  - gpo
  - lsdou
  - sysvol
  - fgpp
---

# Group Policy (GPO) Basics

Group Policy is the main Windows domain mechanism for centrally applying settings to users and computers.

Typical uses include:

- password and lockout settings
- firewall and security settings
- desktop and user environment controls
- software deployment
- startup, shutdown, logon, and logoff scripts

## What a GPO contains

Each GPO has two main parts:

| Part | Stored in | Purpose |
| --- | --- | --- |
| Group Policy Container (GPC) | Active Directory | Metadata about the policy |
| Group Policy Template (GPT) | SYSVOL | Files such as policy settings, scripts, and templates |

This is why GPO health depends on both directory replication and SYSVOL health.

## Processing order: LSDOU

Group Policy processing is commonly described as **LSDOU**:

1. **Local**
2. **Site**
3. **Domain**
4. **OU** from parent to child

Later-applied settings normally win when there is a direct conflict, unless inheritance behavior is changed.

## Inheritance

By default, policies linked at higher levels flow downward.

Example:

```text
Domain
  -> OU: IT
    -> OU: Admins
```

A domain-linked GPO is normally inherited by child OUs unless something blocks or overrides that behavior.

## Block Inheritance vs Enforced

These two settings are often confused.

- **Block Inheritance**: tells an OU to stop inheriting normal GPOs from above
- **Enforced**: makes a linked GPO keep applying even when lower levels would normally override or block it

Simple rule:

```text
Enforced GPO > Blocked normal inheritance > ordinary downstream conflict rules
```

Use these features carefully. They solve edge cases, but they also make troubleshooting harder when overused.

## Password policy scope

The classic domain password and account lockout policy is effective when configured at the domain level.

Common settings include:

- minimum password length
- complexity requirements
- maximum and minimum password age
- password history
- account lockout threshold and duration

For different password rules on different groups, use **Fine-Grained Password Policies (FGPP)** rather than trying to solve it with OU-linked GPOs.

## SYSVOL

SYSVOL is the shared location that stores Group Policy templates and related files on domain controllers.

It commonly holds:

- GPT content
- logon scripts
- policy template files

Typical path:

```text
C:\Windows\SYSVOL
```

Network access example:

```text
\\domain.example\SYSVOL
```

## Replication basics

GPO health depends on two separate replication paths:

- **Active Directory replication** for the container and metadata
- **SYSVOL replication** for the file-based template content

If either side is unhealthy, GPO troubleshooting becomes inconsistent. That is why “the GPO exists” and “the GPO applies correctly” are not the same thing.

## Useful commands

Refresh policy:

```cmd
gpupdate /force
```

See which GPOs applied:

```cmd
gpresult /r
```

Create an HTML report:

```cmd
gpresult /h C:\gpo-report.html
```

Open Group Policy Management:

```cmd
gpmc.msc
```

## Practical takeaways

- keep your OU model simple enough to reason about
- avoid unnecessary Enforced and Block Inheritance combinations
- treat SYSVOL health as part of GPO health
- use FGPP when password policy needs to differ by group
- troubleshoot processing order before assuming “the setting is broken”

## Useful links

- Group Policy overview: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- Group Policy processing: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing)
- FGPP overview: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/adac/fine-grained-password-policies](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/adac/fine-grained-password-policies)
