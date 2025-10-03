---
id: network-basics
title: Networking Basics
description: Practical intro to networking — types, topologies, addressing, NAT, DNS, ports, and OSI/TCP-IP models.
slug: /network-types
---

# 🧠 Networking Basics

A structured primer to core networking topics. Content is consolidated from “Computer networking.pptx” and expanded with short clarifications and lists.

---

## ❓ What Is Networking?

- Definition: connecting devices so they can exchange data and share resources.
- Key building blocks: media (copper/fiber/wireless), addresses (MAC/IP), forwarding (switching/routing), and protocols (TCP/IP, DNS, DHCP).
- Extra: small networks keep things simple; as scale grows, you add segmentation, NAT, and routing policies.

---

## 🗺️ Types of Area Networks

- LAN: small area (home/office/campus). High speed, low latency; typically Ethernet and Wi‑Fi.
- MAN: city/metropolitan scale. Often fiber rings; managed by ISPs or large orgs.
- WAN: connects sites over long distances via carriers; uses MPLS/VPN/Internet.
- Extra: Cloud connectivity (Direct Connect/ExpressRoute) extends WANs to cloud providers.

---

## 🔗 LAN Topologies

- Bus: all nodes share one cable; simple/cheap but collisions and single-cable failure risks.
- Star: each node to a central switch; most common, easy to manage, single central point failure.
- Ring: traffic circulates around a ring; simple but a ring break stops traffic (unless dual rings).
- Mesh: multiple paths between nodes; resilient, costlier, used in backbone/mesh Wi‑Fi.
- Extra: modern LANs are physically star but can form logical meshes with redundant links (e.g., LACP, STP).

Images (from the original slides):

![Slide figure](/img/networking/computer-networking/image1.png)
![Slide figure](/img/networking/computer-networking/image2.png)
![Slide figure](/img/networking/computer-networking/image3.png)
![Slide figure](/img/networking/computer-networking/image4.png)

---

## 📡 Types of Communication

- Unicast: one‑to‑one delivery to a single receiver. Extra: used by most web/app traffic.
- Multicast: one‑to‑many to subscribed receivers. Extra: efficient for streaming/finance feeds; requires multicast routing.
- Broadcast: one‑to‑all in a subnet. Extra: limited to L2 domains; excessive broadcast can cause storms.

---

## 🌐 IP Addressing (IPv4/IPv6)

- Private vs Public:
  - Private (RFC1918): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; not routed on the public Internet.
  - Public: globally routable by ISPs.
- Dynamic vs Static:
  - Dynamic: assigned via DHCP; changes over time.
  - Static: fixed assignment; stable for servers/DNS.
- IPv6: 128‑bit addressing; massive space, simpler header, no NAT required. Extra: dual‑stack is common during migration.

---

## ➗ Subnetting & CIDR

- CIDR notation: `192.168.1.0/24` means 24 network bits, 256 total addresses (254 usable).
- Small point‑to‑point nets: `/30` (IPv4) provides 2 usable IPs; `/31` for point‑to‑point links (RFC 3021).
- Legacy classes (A/B/C) are historical; modern networks use CIDR for variable‑length subnets.
- Extra: plan subnets by function (users, servers, management) to simplify firewalling.

---

## 🔁 NAT (Network Address Translation)

- What: translates private addresses to public (and ports) at the edge.
- Types: Static (1:1), Dynamic (pool), PAT/NAPT (many‑to‑one via ports).
- Uses: IPv4 conservation, hide internal addressing, simple egress policy.
- Extra: NAT breaks end‑to‑end reachability; use port‑forwarding or reverse proxies for inbound.

---

## 🆔 MAC & ARP

- MAC address: layer‑2 hardware identifier (e.g., `00:aa:bb:cc:dd:ee`).
- ARP: maps IPv4 addresses to MAC addresses in a broadcast domain.
- Extra: gratuitous ARP updates neighbors; ARP poisoning is a common L2 attack vector.

---

## 🤝 DHCP (DORA)

- Discover → Offer → Request → Ack: four steps to lease an IP and options (GW, DNS, lease time).
- Extra: reservations bind MAC→IP; relay (IP Helper) forwards client broadcasts across subnets.

---

## 🔤 DNS Essentials

- Purpose: human‑readable names to IPs (A/AAAA), plus mail (MX), aliases (CNAME), text (TXT).
- Components: cache, resolver, authoritative name servers, namespace (root, TLDs, domains).
- Extra: TTL controls cache time; split‑horizon DNS serves different answers internally vs externally.

---

## 🔢 Common Ports & Protocols

- 20/21 FTP — file transfer (data/control); legacy, avoid on Internet.
- 22 SSH — secure remote shell and tunnels.
- 23 Telnet — plaintext remote shell; avoid.
- 25/465/587 SMTP — mail transfer and submission.
- 53 DNS — name resolution (UDP/TCP).
- 67/68 DHCP — IPv4 address leasing.
- 80/443 HTTP/HTTPS — web.
- 110 POP3, 143 IMAP — mail retrieval.
- 123 NTP — time sync.
- 137‑139 NetBIOS, 445 SMB — Windows file/services.
- 161/162 SNMP — network monitoring/traps.
- 389 LDAP — directory services.
- 1433 MSSQL, 1521 Oracle, 3306 MySQL, 5432 PostgreSQL — databases.
- 3389 RDP — Windows remote desktop.

---

## 🧭 Models: TCP/IP and OSI

- TCP/IP (5‑layer view): Application • Transport • Network • Data Link • Physical.
- OSI (7 layers):
  - 7 Application — user‑facing protocols (HTTP, DNS, SMTP). Data.
  - 6 Presentation — format/encrypt/compress (TLS/SSL). Data.
  - 5 Session — sessions/checkpoints (RPC). Data.
  - 4 Transport — TCP/UDP, ports, reliability, ordering. Segments/Datagrams.
  - 3 Network — IP routing, addressing, TTL. Packets. Devices: routers/L3 switches.
  - 2 Data Link — framing, MAC, VLANs, ARP. Frames. Devices: switches/bridges.
  - 1 Physical — bits, signaling, media, connectors. Bits.
- Extra: encapsulation wraps data as it moves down; each hop decapsulates to forward at its layer.

OSI figures (from slides):

![Slide figure](/img/networking/computer-networking/image33.png)
![Slide figure](/img/networking/computer-networking/image40.png)

---

## 📎 Slide Figures Gallery

Below are additional figures extracted from the original presentation for quick reference.

![Fig](/img/networking/computer-networking/image5.png)
![Fig](/img/networking/computer-networking/image6.png)
![Fig](/img/networking/computer-networking/image7.png)
![Fig](/img/networking/computer-networking/image8.png)
![Fig](/img/networking/computer-networking/image9.png)
![Fig](/img/networking/computer-networking/image10.png)
