---
id: kms
title: KMS (Key Management Service)
description: Centralized Windows and Office activation — KMS thresholds, renewal intervals, configuration, and ADBA alternative.
slug: /servers/kms
sidebar_position: 6
status: reference
last_reviewed: 2026-04-22
keywords:
  - kms
  - activation
  - adba
  - volume licensing
---

# KMS (Key Management Service)

**KMS** is Microsoft's centralized activation service for volume-licensed Windows and Office products. Instead of activating every client against Microsoft servers, clients in an organization activate against a local KMS host.

> KMS is installed as a role/feature on a Windows Server. A volume license key is entered once on the KMS host, and clients discover it automatically over the network.

## How KMS works

```
KMS clients (Windows / Office)
         ↓
     KMS host server
         ↓
     Activation
```

A single KMS host on a modern Windows Server can activate current and older client OSes and Office products, including Semi-Annual and LTSC (Long-Term Servicing Channel) editions.

## Activation thresholds

KMS only activates clients once a minimum count of unique machines has contacted the host:

| Client type | Minimum count |
| --- | --- |
| Windows client (Windows 10/11) | 25 |
| Windows Server | 5 |

Below these thresholds the KMS host accepts requests but does not activate them. For smaller environments — or environments where you prefer not to manage KMS count — use ADBA instead.

## Activation and renewal intervals

KMS uses two time intervals to keep clients activated:

| Setting | Default | Meaning |
| --- | --- | --- |
| Activation interval | 2 hours | How often an unactivated client retries the KMS host |
| Renewal interval | 7 days | How often an activated client renews its lease |
| Validity | 180 days | Total lease length after successful activation |

After activation, a client contacts the KMS host every 7 days. If it cannot reach the host, it keeps retrying until the 180-day lease expires. Starting at day 173 the client begins retrying more aggressively.

## KMS configuration

Core things to configure on the KMS host:

- **TCP port 1688** — KMS listens here by default; clients connect to this port
- **Firewall** — allow TCP/1688 inbound on the relevant profiles (Domain / Private / Public)
- **DNS auto-publish** — the KMS host automatically publishes an `_VLMCS._TCP` SRV record so clients can discover it

The SRV record is why clients on a domain usually need no manual configuration — they look up `_VLMCS._TCP.<domain>` in DNS and find the host.

Keys themselves come from the Microsoft Volume Licensing Service Center (VLSC). Older KMS hosts (Server 2012/2016) may need cumulative updates installed before they can activate newer client OS versions.

## Activation methods

### KMS

Network-based activation. Clients contact the KMS host using the SRV record, receive a 180-day lease, and renew every 7 days.

### ADBA (Active Directory Based Activation)

ADBA activates clients through Active Directory itself, without needing a dedicated KMS service. When a domain-joined machine authenticates to AD, activation happens as part of that process.

- No client-count threshold
- Activation is tied to domain membership, not to a KMS host
- More reliable and redundant than KMS, since AD already has multi-DC redundancy
- Requires schema version of at least Windows Server 2012

For most modern domain environments, ADBA is the preferred approach. KMS remains useful for non-domain-joined clients or mixed environments.

## KMS vs ADBA

| | KMS | ADBA |
| --- | --- | --- |
| Minimum client count | 25 clients / 5 servers | None |
| Requires domain join | No | Yes |
| Where activation lives | KMS host | Active Directory |
| Redundancy | Single host (add more for HA) | Inherits AD redundancy |
| Best for | Workgroup or mixed environments | Pure AD environments |

## Practical takeaways

- In a modern AD environment, prefer ADBA over KMS
- Do not expose TCP/1688 to the public internet
- Keep the KMS host patched — older hosts need updates to activate newer Windows versions
- Verify the `_VLMCS._TCP` SRV record exists in DNS after setup (`nslookup -type=srv _vlmcs._tcp.<domain>`)

## Useful links

- KMS activation planning: [https://learn.microsoft.com/en-us/windows-server/get-started/kms-activation-planning](https://learn.microsoft.com/en-us/windows-server/get-started/kms-activation-planning)
- Active Directory-Based Activation: [https://learn.microsoft.com/en-us/windows-server/get-started/activation-adba](https://learn.microsoft.com/en-us/windows-server/get-started/activation-adba)
- Volume Licensing overview: [https://www.microsoft.com/en-us/licensing](https://www.microsoft.com/en-us/licensing)
