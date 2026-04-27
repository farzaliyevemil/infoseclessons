---
id: dns
title: DNS (Domain Name System)
description: A practical DNS guide covering resolution flow, query types, zones, caching, TTL, records, and reverse lookup.
slug: /networking/dns
sidebar_position: 6
status: reference
last_reviewed: 2026-03-23
keywords:
  - dns
  - ttl
  - records
  - recursive query
  - reverse lookup
difficulty: foundation
---

# DNS (Domain Name System)

DNS translates names into the answers systems actually need: IP addresses, mail destinations, service records, and authoritative server locations.

![DNS resolution flow](/img/networking/dns-resolution-flow.svg)

## What DNS Does

- Converts domain names such as `google.com` into IP addresses
- Helps clients find authoritative name servers
- Supports email delivery, service discovery, and reverse lookups
- Reduces repeated lookups through caching and TTL behavior

## Resolution Flow

When a client needs to resolve a name, the usual order is:

1. Check the local host name and local resolver state
2. Check the DNS client cache and local `hosts` file
3. Query the configured DNS resolver
4. If needed, the resolver performs iterative lookups against other DNS servers

Useful Windows commands:

```cmd
ipconfig /displaydns
ipconfig /flushdns
```

## Naming Hierarchy

DNS names follow a hierarchy:

```text
. (root)
└── com
    └── google
        └── support
```

Example: `support.google.com`

- `.` is the root
- `com` is the top-level domain
- `google` is the second-level domain
- `support` is a subdomain

## Query Types

### Recursive Query

This is the client-to-resolver request. The client expects a final answer or an error.

### Iterative Query

This happens between DNS servers. One server points another server toward the next place to ask until the answer is found.

### Reverse Query

This maps IP addresses back to names. Reverse DNS commonly uses `PTR` records.

## TTL and Caching

TTL defines how long a DNS answer can stay cached.

- A resolver returns both the answer and its TTL
- The client or downstream resolver keeps the result until TTL expires
- During that period, repeated lookups can use cache instead of asking again
- If the underlying IP changes before TTL expiry, clients may continue using the stale answer

## Transport and Port

DNS uses port `53`.

- `UDP 53` is the default for most lookups
- `TCP 53` is used for larger responses and zone transfers

## Zone Types

| Zone Type | Purpose |
|---|---|
| Primary Zone | Writable source of truth for records |
| Secondary Zone | Read-only copy used for resilience and load distribution |
| AD-Integrated Zone | Stores DNS data in Active Directory for replication and fault tolerance |
| Stub Zone | Keeps only NS, SOA, and glue records to help delegation |
| Forward Lookup Zone | Resolves names to IP addresses |
| Reverse Lookup Zone | Resolves IP addresses to names |

## Common Record Types

| Record | Purpose |
|---|---|
| `A` | IPv4 address |
| `AAAA` | IPv6 address |
| `CNAME` | Alias to another name |
| `MX` | Mail routing |
| `NS` | Authoritative name server |
| `PTR` | Reverse lookup |
| `SOA` | Start of authority and zone metadata |
| `TXT` | Text-based metadata such as SPF |
| `SRV` | Service location records, important in Active Directory |

## Dynamic vs Manual DNS

Dynamic DNS lets clients or DHCP-connected systems update records automatically. In Windows environments, this is often controlled through secure or non-secure update policies.

Manual DNS requires administrators to create and update records directly.

## Practical Takeaways

- Weak DNS understanding slows down troubleshooting across almost every infrastructure role
- TTL and caching explain many “it works for one user but not another” problems
- Reverse lookups and record types matter in logging, mail, and identity systems
- AD-integrated DNS is usually the right choice inside Windows domain environments
