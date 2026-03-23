---
id: dhcp
title: DHCP (Dynamic Host Configuration Protocol)
description: Practical DHCP guide covering DORA, scopes, reservations, leases, options, DHCPv4 vs DHCPv6, and failover basics.
slug: /networking/dhcp
sidebar_position: 3
status: reference
last_reviewed: 2026-03-23
keywords:
  - dhcp
  - dora
  - scope
  - reservation
  - failover
---

# DHCP (Dynamic Host Configuration Protocol)

DHCP automatically assigns IP configuration to clients on a network. Without it, administrators would need to manually set addresses, masks, gateways, and DNS settings on every endpoint.

Typical values delivered by DHCP include:

- IP address
- subnet mask
- default gateway
- DNS servers
- DNS domain suffix

## How DHCP works: DORA

The classic DHCPv4 flow is often described as **DORA**:

1. **Discover**: the client broadcasts to find a DHCP server
2. **Offer**: the server offers an address and lease
3. **Request**: the client asks to use that offer
4. **Acknowledge**: the server confirms the lease

This is why DHCP problems often affect the entire “get on the network” path before higher-level troubleshooting even starts.

## DHCPv4 vs DHCPv6

| Topic | DHCPv4 | DHCPv6 |
| --- | --- | --- |
| Address family | IPv4 | IPv6 |
| Default transport | UDP 67/68 | UDP 546/547 |
| Reservation identity | MAC address | DUID |
| Windows failover support | Yes | No |

In IPv6 environments, DHCPv6 is only one part of the design. Router advertisements and SLAAC may also play a role.

## What a scope does

A **scope** defines the range of addresses and options a DHCP server can hand out to a client group.

A typical IPv4 scope includes:

- a start and end range
- subnet mask
- exclusions for static devices
- reservations for specific clients
- lease duration
- option values such as router and DNS

## Common scope options

| Option | Code | Meaning |
| --- | --- | --- |
| Router | `003` | Default gateway |
| DNS Servers | `006` | Name resolution servers |
| DNS Domain Name | `015` | DNS suffix / domain name |

## Exclusions vs reservations

These are often confused.

- **Exclusion**: removes addresses from the dynamic pool
- **Reservation**: assigns one fixed address to one known client

Use exclusions for infrastructure you configured manually. Use reservations when you want DHCP to keep assigning the same address to the same device.

## Lease duration

A lease is temporary ownership of an address.

Shorter leases help in rapidly changing client networks, such as guest or lab environments. Longer leases reduce DHCP churn in more stable environments.

## DHCP failover

Windows DHCP failover provides resilience for **DHCPv4** scopes.

Common deployment modes:

| Mode | Meaning |
| --- | --- |
| Hot Standby | One server is primary and the partner is mostly standby |
| Load Balance | Two servers actively share lease servicing |

Failover helps keep address assignment available when a DHCP server goes offline, but it does not replace planning for DNS, relay, and network segmentation.

## Basic PowerShell examples

Install the role:

```powershell
Install-WindowsFeature DHCP -IncludeManagementTools
```

Authorize the DHCP server in Active Directory:

```powershell
Add-DhcpServerInDC -DnsName "dhcp.corp.az" -IPAddress 192.168.1.10
```

Create an IPv4 scope:

```powershell
Add-DhcpServerv4Scope `
  -Name "Office Network" `
  -StartRange 192.168.1.100 `
  -EndRange 192.168.1.200 `
  -SubnetMask 255.255.255.0
```

Set common scope options:

```powershell
Set-DhcpServerv4OptionValue `
  -ScopeId 192.168.1.0 `
  -Router 192.168.1.1 `
  -DnsServer 192.168.1.5 `
  -DnsDomain "corp.az"
```

## Practical takeaways

- give DHCP servers static addresses
- document scopes before production rollout
- separate exclusions from reservations clearly
- remember that DHCP issues can look like “DNS is broken” or “internet is down”
- review relay paths, VLANs, and scope boundaries together

## Useful links

- DHCP quickstart: [https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/quickstart-install-configure-dhcp-server](https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/quickstart-install-configure-dhcp-server)
- DHCP scopes: [https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-scopes](https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-scopes)
- DHCP failover: [https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-failover](https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-failover)
