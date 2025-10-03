---
id: network-basics
title: Networking Basics
description: Thorough networking guide — types, topologies, switching vs routing, VLANs, IP/IPv6, subnetting, NAT, DHCP/DNS, ports, OSI/TCP-IP, Wi‑Fi, and troubleshooting.
slug: /network-types
---

# 🧠 Networking Basics

A structured, practical primer on core networking topics. Each section now includes an illustration and concise, accurate notes you can apply immediately.

---

## ❓ What Is Networking?

- Definition: connecting devices so they can exchange data and share resources.
- Key building blocks: media (copper/fiber/wireless), addresses (MAC/IP), forwarding (switching/routing), and protocols (TCP/IP, DNS, DHCP).
- Extra: small networks keep things simple; as scale grows, you add segmentation, NAT, and routing policies.

![Concept overview](/img/networking/computer-networking/image1.png)

---

## 🗺️ Types of Area Networks

- LAN: small area (home/office/campus). High speed, low latency; typically Ethernet and Wi‑Fi.
- MAN: city/metropolitan scale. Often fiber rings; managed by ISPs or large orgs.
- WAN: connects sites over long distances via carriers; uses MPLS/VPN/Internet.
- Extra: Cloud connectivity (Direct Connect/ExpressRoute) extends WANs to cloud providers.

![LAN/MAN/WAN](/img/networking/computer-networking/image2.png)

---

## 🔗 LAN Topologies

- Bus: all nodes share one cable; simple/cheap but collisions and single-cable failure risks.
- Star: each node to a central switch; most common, easy to manage, single central point failure.
- Ring: traffic circulates around a ring; simple but a ring break stops traffic (unless dual rings).
- Mesh: multiple paths between nodes; resilient, costlier, used in backbone/mesh Wi‑Fi.
- Extra: modern LANs are physically star but can form logical meshes with redundant links (e.g., LACP, STP).

![Topologies](/img/networking/computer-networking/image3.png)

---

## 🔀 Switching vs Routing

- Switching (Layer 2): forwards frames by MAC table; operates within broadcast domains (VLANs).
- Routing (Layer 3): forwards packets by IP routes; connects different networks/subnets.
- Inter‑VLAN routing: via L3 switch (SVIs) or router‑on‑a‑stick (802.1Q trunk to router).
- Resiliency: use STP/RSTP on L2, and first‑hop redundancy (HSRP/VRRP/GLBP) on L3 gateways.
- Extra: prefer L3 links between distribution/cores to avoid large L2 failure domains.

![Switch vs Router](/img/networking/computer-networking/image4.png)

Gateway redundancy (HSRP):

```shell
interface Vlan10
 ip address 192.168.10.2 255.255.255.0
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt
```

---

## 📡 Types of Communication

- Unicast: one‑to‑one delivery to a single receiver. Extra: used by most web/app traffic.
- Multicast: one‑to‑many to subscribed receivers. Extra: efficient for streaming/finance feeds; requires multicast routing.
- Broadcast: one‑to‑all in a subnet. Extra: limited to L2 domains; excessive broadcast can cause storms.

![Unicast/Multicast/Broadcast](/img/networking/computer-networking/image5.png)

---

## 🧵 VLANs & Trunking

- VLAN: logical L2 segmentation; isolates broadcast domains and improves security/scale.
- Access port: carries a single VLAN to an endpoint. Trunk port: carries multiple VLANs (802.1Q tags).
- Native VLAN: untagged traffic on a trunk; align on both sides to avoid leaks.
- Inter‑VLAN: needs L3 gateway (SVI). Use ACLs or firewall policies between VLANs.
- Extra: prune unused VLANs from trunks; avoid VLAN 1 for management.

![VLANs](/img/networking/computer-networking/image6.png)

Quick configs (Cisco IOS):

```shell
! Access port in VLAN 10
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

! 802.1Q trunk allowing VLANs 10,20
interface GigabitEthernet0/48
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 999
 spanning-tree portfast trunk
```

Inter‑VLAN routing on L3 switch (SVIs):

```shell
! Create L3 interfaces for VLANs
vlan 10
 name USERS
vlan 20
 name SERVERS

interface Vlan10
 ip address 192.168.10.1 255.255.255.0
interface Vlan20
 ip address 192.168.20.1 255.255.255.0
ip routing
```

---

## 🌐 IP Addressing (IPv4/IPv6)

- Private vs Public:
  - Private (RFC1918): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; not routed on the public Internet.
  - Public: globally routable by ISPs.
- Dynamic vs Static:
  - Dynamic: assigned via DHCP; changes over time.
  - Static: fixed assignment; stable for servers/DNS.
- IPv6: 128‑bit addressing; massive space, simpler header, no NAT required. Extra: dual‑stack is common during migration.

More IPv6 specifics:
- Address types: Global Unicast (2000::/3), Link‑Local (fe80::/10), Unique Local (fc00::/7), Multicast (ff00::/8).
- Host addressing: SLAAC (RA) or DHCPv6; ND/RS/RA replace ARP.
- Subnetting: typical /64 per subnet; do not use /120+ for hosts unless justified.

![IP Addressing](/img/networking/computer-networking/image7.png)

---

## ➗ Subnetting & CIDR

- CIDR notation: `192.168.1.0/24` means 24 network bits, 256 total addresses (254 usable).
- Small point‑to‑point nets: `/30` (IPv4) provides 2 usable IPs; `/31` for point‑to‑point links (RFC 3021).
- Legacy classes (A/B/C) are historical; modern networks use CIDR for variable‑length subnets.
- Extra: plan subnets by function (users, servers, management) to simplify firewalling.

Example: split `192.168.10.0/24` into 4 equal /26 subnets: `192.168.10.0/26`, `.64/26`, `.128/26`, `.192/26`.

![Subnetting](/img/networking/computer-networking/image8.png)

---

## 🔁 NAT (Network Address Translation)

- What: translates private addresses to public (and ports) at the edge.
- Types: Static (1:1), Dynamic (pool), PAT/NAPT (many‑to‑one via ports).
- Uses: IPv4 conservation, hide internal addressing, simple egress policy.
- Extra: NAT breaks end‑to‑end reachability; use port‑forwarding or reverse proxies for inbound.

Advanced notes:
- Hairpin NAT (NAT loopback) to access internal hosts via public IP from inside.
- NAT64/NPTv6 exist for IPv6 edge cases; generally prefer native IPv6 without NAT.

![NAT](/img/networking/computer-networking/image9.png)

Examples:

```shell
! Cisco IOS PAT (many-to-one)
interface GigabitEthernet0/0
 ip address 203.0.113.10 255.255.255.248
 ip nat outside
interface GigabitEthernet0/1
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
access-list 10 permit 192.168.10.0 0.0.0.255
ip nat inside source list 10 interface GigabitEthernet0/0 overload
```

```bash
# Linux (iptables) SNAT/MASQUERADE
sysctl -w net.ipv4.ip_forward=1
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -o eth0 -j MASQUERADE
```

---

## 🆔 MAC & ARP

- MAC address: layer‑2 hardware identifier (e.g., `00:aa:bb:cc:dd:ee`).
- ARP: maps IPv4 addresses to MAC addresses in a broadcast domain.
- Extra: gratuitous ARP updates neighbors; ARP poisoning is a common L2 attack vector.

![MAC/ARP](/img/networking/computer-networking/image10.png)

---

## 🤝 DHCP (DORA)

- Discover → Offer → Request → Ack: four steps to lease an IP and options (GW, DNS, lease time).
- Extra: reservations bind MAC→IP; relay (IP Helper) forwards client broadcasts across subnets.

Helpful options: `3` Default Gateway, `6` DNS Servers, `15` Domain Name, `42` NTP.

![DHCP](/img/networking/computer-networking/image11.png)

---

## 🔤 DNS Essentials

- Purpose: human‑readable names to IPs (A/AAAA), plus mail (MX), aliases (CNAME), text (TXT).
- Components: cache, resolver, authoritative name servers, namespace (root, TLDs, domains).
- Extra: TTL controls cache time; split‑horizon DNS serves different answers internally vs externally.

Reverse DNS: PTR records map IP→name. For mail servers, align PTR, SPF (TXT), DKIM, DMARC for deliverability.

![DNS](/img/networking/computer-networking/image12.png)

Sample zone (BIND):

```dns
$TTL 3600
@   IN SOA ns1.example.com. hostmaster.example.com. (
        2025010101 ; serial
        3600       ; refresh
        900        ; retry
        1209600    ; expire
        300 )      ; minimum
    IN NS  ns1.example.com.
ns1 IN A   192.0.2.53
www IN A   198.51.100.42
mail IN A  203.0.113.25
@   IN MX  10 mail.example.com.
```

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

![Ports](/img/networking/computer-networking/image13.png)

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

![OSI Layers](/img/networking/computer-networking/image33.png)

---

## 📶 Wireless Basics (Wi‑Fi)

- Bands: 2.4 GHz (longer range, crowded), 5 GHz (faster, more channels), 6 GHz (Wi‑Fi 6E, very clean spectrum).
- Channels: use non‑overlapping channels (e.g., 1/6/11 @2.4 GHz). Consider DFS channels @5 GHz.
- Security: WPA2‑PSK minimum; prefer WPA3 where supported. Avoid open/ WEP networks.
- Design: cell overlap ~15–20% for roaming; reduce power to avoid co‑channel interference; use 20/40/80 MHz width wisely.
- Extra: separate SSIDs per use (corp/guest/IoT); put IoT on isolated VLAN with firewall rules.

![Wi‑Fi](/img/networking/computer-networking/image14.png)

---

## 🧰 Troubleshooting Essentials

- Connectivity: `ping`, `traceroute`/`tracert`, `arp -a`, `ipconfig`/`ifconfig`, `route`/`ip route`.
- Name resolution: `nslookup`/`dig` to check A/AAAA/MX; verify DNS server and search domain.
- Capture: `tcpdump`/Wireshark to inspect packets, handshake, retransmits.
- Common issues: wrong VLAN/access port, missing default gateway, DNS misconfig, asymmetric routing, MTU/PMTUD failure.
- Extra: test from both ends; check ARP/MAC tables on switches and ARP cache on hosts.

![Troubleshooting](/img/networking/computer-networking/image15.png)

---

## 🔒 Network Security Basics

- Segmentation: separate user/servers/management into VLANs/subnets with ACLs between them.
- Perimeter: stateful firewall for inbound/outbound; least‑privilege rules; NAT/port‑forwarding where needed.
- Visibility: enable logs/NetFlow; SNMP/Telemetry to monitor health and anomalies.
- Hardening: disable unused services, secure management (SSH, AAA), patch network OS.
- Extra: use TLS everywhere; for public apps place behind reverse proxy/WAF; consider Zero Trust for sensitive apps.

![Security](/img/networking/computer-networking/image16.png)
