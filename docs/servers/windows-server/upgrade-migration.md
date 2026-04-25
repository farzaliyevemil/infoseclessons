---
id: upgrade-migration
title: Upgrade, Update, and Migration
description: Differences between Windows Server upgrade, update, and migration — supported paths, ADBA activation, and decision guidance.
slug: /servers/upgrade-migration
sidebar_position: 8
status: reference
last_reviewed: 2026-04-22
keywords:
  - upgrade
  - update
  - migration
  - in-place upgrade
  - adba
difficulty: intermediate
---

# Upgrade, Update, and Migration

Three related but distinct terms come up when maintaining Windows Server environments. Mixing them up is a common source of confusion when planning a lifecycle project.

| Term | Meaning |
| --- | --- |
| **Upgrade** | Keeping the same physical server but moving its OS to a newer version |
| **Update** | Applying patches within the same OS version |
| **Migration** | Moving data and roles from an old system to a new one |

## Upgrade

An **upgrade** keeps the existing physical or virtual server and raises the operating system to a newer major version.

**Example:** A server running Windows Server 2019 is upgraded in place to Windows Server 2025. The hardware and server identity stay the same; only the OS version changes.

**Pros:**
- Cheaper than buying new hardware
- Preserves server identity, roles, and configuration

**Cons:**
- Cannot easily roll back if the new OS misbehaves on this hardware
- Any accumulated drift, junk, and legacy config is carried forward
- The underlying hardware is not refreshed

For ADBA and similar identity-aware features, the upgrade path has additional prerequisites:

- Schema version must be at least Windows Server 2012
- Forest and domain functional levels do not need to be raised for ADBA itself
- Once the schema is updated, even older domain controllers can continue to participate while ADBA activates clients

## Migration

A **migration** moves data, roles, and services from an old system to a new one. Typically this means standing up a new physical or virtual server, installing a fresh OS, and then moving the workload.

**Example:** An aging HP server running Windows Server 2012 holds data you still need. You buy a new server, install Windows Server 2025 on it, move the data and roles across, then retire the old hardware.

**Pros:**
- Fresh, clean OS install — no accumulated drift
- Easy rollback: the old system is still there until you decommission it
- Natural opportunity to modernize hardware at the same time

**Cons:**
- More expensive — you need the new hardware/VM capacity
- More planning and coordination than an in-place upgrade

### Upgrade vs migration

| | Upgrade | Migration |
| --- | --- | --- |
| Physical server | Stays the same | New hardware (or new VM) |
| Data | Stays in place | Copied/moved |
| Rollback | Difficult | Easy (old system still exists) |
| Cost | Lower | Higher |
| Recommended for | Simple version jump | Hardware refresh, legacy cleanup |

## In-place upgrade paths

Microsoft documents which previous Windows Server versions can be upgraded directly to each new release. For Windows Server 2025, currently supported in-place upgrades include:

| Existing OS | Upgrade to |
| --- | --- |
| Windows Server 2012 R2 | Windows Server 2025 |
| Windows Server 2016 | Windows Server 2025 |
| Windows Server 2019 | Windows Server 2025 |
| Windows Server 2022 | Windows Server 2025 |

> Preview and Evaluation editions are **not** supported as upgrade sources. Always check the current Microsoft upgrade matrix before planning — supported paths change with each major release.

## What upgrading gets you (and what it does not)

Upgrading gets you a newer OS on the same machine, with existing roles, local users, and most config preserved.

It does **not** give you:

- A rollback if the upgrade fails in production — restore from backup is the safety net
- A cleanup of accumulated drift (old scheduled tasks, obsolete registry entries, abandoned features)
- Any hardware refresh

For these reasons, a clean install plus migration is often preferred for production identity workloads (domain controllers in particular).

## ADBA (Active Directory-Based Activation)

ADBA activates Windows and Office via Active Directory membership, without needing a separate KMS host. When a domain-joined machine authenticates to AD, activation happens as part of that process.

**Requirements:**
- Schema version at least Windows Server 2012
- Forest and domain functional levels do not need to be raised for ADBA itself
- After the schema update, even older domain controllers can continue serving while ADBA activates clients

ADBA is more reliable and redundant than a single KMS host, since AD already has multi-DC redundancy. In modern environments it is usually the preferred activation approach — see the [KMS lesson](/servers/kms) for the detailed comparison.

## Choosing the right approach

```
Existing server is healthy and only the OS is outdated
    → Upgrade (in-place)

Hardware is also old, or you want a clean slate with critical data
    → Migration

Both are needed
    → Migrate first (to new hardware), then upgrade later if needed
```

## Practical takeaways

- Always test upgrades in a lab or staging environment first
- Take full backups before any in-place upgrade
- For domain controllers, migration (new DC, replicate, demote old) is usually safer than in-place upgrade
- Document the upgrade/migration plan, including rollback steps
- Verify Microsoft's current supported upgrade matrix — do not rely on older documentation

## Useful links

- Windows Server upgrade overview: [https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-overview](https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-overview)
- Windows Server migration: [https://learn.microsoft.com/en-us/windows-server/get-started/windows-server-migration](https://learn.microsoft.com/en-us/windows-server/get-started/windows-server-migration)
- Upgrade to Windows Server 2025: [https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-2025](https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-2025)
