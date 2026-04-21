---
id: ip-addressing-subnetting
title: IP Addressing and Subnetting
description: Practical guide to IPv4 addressing, classes, public vs private, NAT, DMZ, CIDR, and subnet math.
slug: /networking/ip-addressing-subnetting
sidebar_position: 4
status: reference
last_reviewed: 2026-04-22
keywords:
  - ip
  - subnet
  - cidr
  - nat
  - dmz
  - private ip
---

# IP Addressing and Subnetting

An **IP address** is the logical address a device uses to be reachable on a network. Devices need an IP (static or dynamic) to communicate with each other over IP networks.

IPv4 uses 32 bits, written as four decimal octets (0–255) separated by dots:

```
192  .  168  .   1  .  10
 8bit    8bit    8bit   8bit
         32 bits total
```

## IPv4 classes

Classical IPv4 address classes, based on the first octet:

| Class | First-octet range | Default mask | Typical use |
| --- | --- | --- | --- |
| A | 1 – 126 | 255.0.0.0 (/8) | Very large networks |
| B | 128 – 191 | 255.255.0.0 (/16) | Medium networks |
| C | 192 – 223 | 255.255.255.0 (/24) | Small networks |

`127.0.0.0/8` is reserved for loopback (`127.0.0.1` → your own host). `224.0.0.0/4` is class D (multicast), and `240.0.0.0/4` is class E (reserved).

Modern networks use classless routing (CIDR) rather than strict class boundaries, but the ranges above still describe the default masks you will see in practice.

## Private IP ranges

Private ranges (RFC 1918) are not routable on the public internet. They are used inside homes, offices, and data centers, and rely on NAT to reach the internet.

| Class | Private range |
| --- | --- |
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

In practice, the 10.x and 192.168.x ranges are most common internally, while the 172.16–31.x range is often used for DMZ and management networks.

## Public vs private IP

| | Public IP | Private IP |
| --- | --- | --- |
| Other names | WAN IP, global IP | LAN IP, internal IP |
| Internet reachability | Directly routable | Only via NAT |
| Issued by | ISP / cloud provider | Router / DHCP |
| Example | 173.222.14.238 | 192.168.1.10 |

Typical home example: laptop `192.168.1.2`, PC `192.168.1.3`, phone `192.168.1.4` — all private. Services like `google.com` (e.g. `173.x.x.x`) are public.

## NAT (Network Address Translation)

NAT translates private addresses into a single (or small pool of) public addresses so private hosts can reach the internet. The router on the edge of the LAN performs NAT and typically serves as the **default gateway**.

```
Internal client (192.168.1.x)
        ↓
Default gateway / router (192.168.1.1)
        ↓ NAT
Public IP (203.0.113.10)
        ↓
Internet
```

A host's IP and its default gateway must live in the same subnet for direct forwarding to work.

## DMZ (demilitarized zone)

A **DMZ** is a network segment isolated between the public internet and the internal network by firewalls. Public-facing services (web, mail, reverse proxy) live here so a compromise of those servers does not give direct access to the internal network.

```
Internet → [Edge firewall] → DMZ (web, mail, reverse proxy)
                         → [Inner firewall] → Internal (AD, DB)
```

The 172.16–31.x private range is often used for DMZ networks by convention, though any private range works.

## Loopback

The loopback address `127.0.0.1` always points to the host itself. It is used for local service testing (`curl http://127.0.0.1:8080`) and stack validation without touching a physical NIC.

Two addresses in every subnet are reserved:

- **Network ID** — the first address, identifies the subnet itself
- **Broadcast** — the last address, used to reach all hosts in the subnet

Neither is assigned to individual hosts.

## Subnet mask

A subnet mask separates the network portion from the host portion of an IP address. Bits set to 1 belong to the network part; bits set to 0 belong to the host part.

| Class | Default mask | Prefix |
| --- | --- | --- |
| A | 255.0.0.0 | /8 |
| B | 255.255.0.0 | /16 |
| C | 255.255.255.0 | /24 |

## CIDR notation

**CIDR (Classless Inter-Domain Routing)** writes a network prefix as `address/n`, where `n` is the number of 1-bits in the mask.

```
192.168.1.100/24  →  mask 255.255.255.0
192.168.1.210/26  →  mask 255.255.255.192
```

CIDR is how modern networks express subnets — you are not bound to classful `/8`, `/16`, `/24` boundaries.

## Subnet math

Two key formulas for working with the variable octet of a mask:

```
2^x = number of subnets
      (x = count of 1-bits in the variable octet)

2^n = number of addresses per subnet
      (n = count of 0-bits in the variable octet)
```

The first and last addresses in each subnet are reserved (network ID and broadcast), so usable host count is `(2^n) - 2`.

### Worked example — mask 255.255.255.224 (/27)

`224 = 11100000` in binary → 3 one-bits, 5 zero-bits.

```
1-bits = 3  →  2^3 = 8 subnets
0-bits = 5  →  2^5 = 32 addresses per subnet (30 usable)
```

Alternative shortcut:

```
256 − 224 = 32   (block size)
256 ÷ 32  = 8    (subnet count)
```

### Subnet breakdown for 192.168.1.0/27

Eight subnets, 32 addresses each:

| # | Range |
| --- | --- |
| 1 | 192.168.1.0 – 192.168.1.31 |
| 2 | 192.168.1.32 – 192.168.1.63 |
| 3 | 192.168.1.64 – 192.168.1.95 |
| 4 | 192.168.1.96 – 192.168.1.127 |
| 5 | 192.168.1.128 – 192.168.1.159 |
| 6 | 192.168.1.160 – 192.168.1.191 |
| 7 | 192.168.1.192 – 192.168.1.223 |
| 8 | 192.168.1.224 – 192.168.1.255 |

The first address of each range is the network ID; the last is the broadcast.

### Same-subnet check

Two hosts are in the same subnet only if they share the same network ID under the given mask.

```
192.168.1.10/27   →  subnet 1 (192.168.1.0/27)
192.168.1.111/27  →  subnet 4 (192.168.1.96/27)
```

In this example they cannot reach each other directly — traffic must traverse a router (Layer 3 forwarding).

## Binary refresher

Each octet is 8 bits. The positional values are:

```
128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
```

So `192 = 128 + 64 = 11000000`, `224 = 128 + 64 + 32 = 11100000`, and so on. All subnet math reduces to counting 1-bits and 0-bits in the variable octet.

## Practical takeaways

- Learn to identify the network ID and broadcast of any subnet instantly
- Use CIDR; do not assume classful boundaries outside legacy equipment
- NAT is not a security boundary — use firewalls for that
- Put public-facing services in a DMZ; do not NAT them into the internal network
- Document subnets and their purpose before you deploy them

## Useful links

- Subnet calculator: [https://www.subnet-calculator.com/](https://www.subnet-calculator.com/)
- CIDR explained: [https://cidr.xyz](https://cidr.xyz)
- RFC 1918 (private ranges): [https://datatracker.ietf.org/doc/html/rfc1918](https://datatracker.ietf.org/doc/html/rfc1918)
