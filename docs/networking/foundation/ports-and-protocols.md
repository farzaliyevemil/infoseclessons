---
id: ports-and-protocols
title: Ports and Protocols
description: How TCP/UDP ports work, the three port ranges, the 30 ports every infosec professional must know, secure-vs-cleartext alternatives, and how to find unexpected listeners on your hosts.
slug: /networking/ports-and-protocols
sidebar_position: 5
status: reference
last_reviewed: 2026-04-25
keywords:
  - ports
  - protocols
  - well-known ports
  - tcp ports
  - udp ports
  - listening ports
  - networking fundamentals
  - port scanning
difficulty: foundation
---

# Ports and Protocols

## Why this matters

Every running service exposes itself through a port. A web server listens on TCP 443. A domain controller listens on TCP 88, 389, 445, 636 and a half-dozen more. A forgotten test container left over from last sprint listens on TCP 8080. The first question in almost every incident response — "what was talking to what?" — is answered in the language of ports and protocols.

Recognising an unexpected listener is the cheapest, fastest detection a defender owns. A SOC analyst who can rattle off "445 is SMB, 3389 is RDP, 4444 is Metasploit's default" spots the anomaly in the second column of a netstat dump. A pen-tester who cannot interpret an `nmap` report will scan blind and report noise. A sysadmin who lets MSSQL on 1433 leak to the Internet will explain it to the breach-response team within months. Ports are how you read the network map of your own estate — and how attackers read it for you.

This lesson is the reference: the three port ranges, the thirty ports you should know without thinking, the legacy → secure mapping, and the OS commands that turn "what is this host exposing?" into a one-line answer. The transport mechanics behind ports — the 5-tuple, TCP three-way handshake, UDP minimalism — live in [TCP and UDP](./tcp-and-udp.md). The layer model context is in [the OSI model](./osi-model.md) and [the TCP/IP model](./tcp-ip-model.md). Where the legacy-to-modern protocol upgrades are designed and rolled out, see [secure protocols](../secure-design/secure-protocols.md).

## What a port actually is

A port is a **16-bit unsigned integer** in the TCP or UDP header — values `0` through `65535`. It is not a physical hole and not a socket; it is a label the operating system uses to decide which process should receive a given segment. When a packet arrives at a host, the kernel looks at the destination port, finds the process that bound that port, and hands the payload up.

Each side of a flow has its own port. The full identity of a connection is the **5-tuple**:

```text
(protocol, source IP, source port, destination IP, destination port)
```

The **destination port** is the well-known one — `443` for HTTPS, `22` for SSH — because the client must know in advance which door to knock on. The **source port** is almost always ephemeral, picked at random by the client kernel from the dynamic range. Two browser tabs to the same site share the destination tuple `(server-IP, 443)` and stay separate only because their source ports differ — `51000` vs `51001`. Lose the 5-tuple discipline and every packet trace becomes mush.

A single host can have thousands of TCP and UDP ports open simultaneously, on the same IP, because each is a separate kernel data structure. TCP and UDP also have **independent** port spaces — TCP/53 and UDP/53 are different ports that happen to share a number, and DNS uses both.

## The three port ranges

IANA splits the 65,536 numbers into three bands. The split is partly enforced by operating systems and partly by convention.

| Range | Name | Who picks it | Notes |
|---|---|---|---|
| `0 – 1023` | Well-known / system | IANA | Binding requires root on Linux, Administrator on Windows. Reserved for canonical services (HTTP, SSH, DNS, etc.). |
| `1024 – 49151` | Registered / user | IANA on application | Vendors register here (3306 MySQL, 5432 PostgreSQL, 3389 RDP). No special privilege to bind. |
| `49152 – 65535` | Dynamic / ephemeral | Local kernel | Source ports for outgoing client connections. Allocated and recycled automatically. |

The privileged-port rule below 1024 is a Unix tradition: only root can `bind()` there. The intent was that "trustworthy" services run as root and so could not be impersonated by a normal user starting a fake daemon on port 25. Modern systems weaken this somewhat — `setcap CAP_NET_BIND_SERVICE` lets a non-root binary bind to a low port, and Windows has no equivalent restriction by default — but the convention still shapes which ports defaults live on.

The **ephemeral range** is what your kernel hands out when you open an outbound connection. Linux defaults to `32768–60999` (configurable in `/proc/sys/net/ipv4/ip_local_port_range`); Windows uses `49152–65535` by default. A NAT gateway translating thousands of internal clients also picks from this pool, which is why you can run out — see the troubleshooting section.

## The 30 ports every analyst should know

Memorise these. Not "look them up when you need them" — *memorise* them. Every PCAP, every firewall rule, every `nmap` report, and every breach report you read for the rest of your career uses these numbers as background vocabulary.

| Port | Proto | Service | Why it matters | Security note |
|---|---|---|---|---|
| 20 / 21 | TCP | FTP data / control | Legacy file transfer | Cleartext credentials and data. Replace with SFTP or FTPS. |
| 22 | TCP | SSH / SCP / SFTP | Remote admin everywhere | Brute-force target — use keys, fail2ban, non-default port for noise reduction. |
| 23 | TCP | Telnet | Cleartext remote shell | Never expose. Finding it open is itself an incident. |
| 25 | TCP | SMTP | Server-to-server mail | Often abused for spam relay if open authenticated. |
| 53 | TCP/UDP | DNS | Name resolution | UDP for queries, TCP for large/AXFR. Tunnelling and exfiltration favourite. |
| 67 / 68 | UDP | DHCP server / client | DORA address assignment | Rogue DHCP server is a classic LAN attack. |
| 69 | UDP | TFTP | Network boot, config backup | No auth, no encryption. Inside-network only. |
| 80 | TCP | HTTP | Plain web | Should redirect to 443. Cleartext sessions and cookies. |
| 88 | TCP/UDP | Kerberos | Windows / AD authentication | Kerberoasting, AS-REP roasting attacks ride here. |
| 110 | TCP | POP3 | Mail retrieval, legacy | Cleartext. Use POP3S 995. |
| 123 | UDP | NTP | Time synchronisation | Critical for Kerberos, logs, certificate validity. NTP amplification DDoS. |
| 137 / 138 / 139 | UDP/TCP | NetBIOS name / datagram / session | Legacy Windows file/name service | Disable on modern networks. NBT-NS poisoning (Responder). |
| 143 | TCP | IMAP | Mail retrieval, modern | Cleartext. Use IMAPS 993. |
| 161 / 162 | UDP | SNMP / SNMP trap | Network device monitoring | v1/v2 use cleartext community strings — switch to v3. |
| 389 | TCP/UDP | LDAP | Directory lookups | Cleartext binds leak passwords. Use LDAPS or StartTLS. |
| 443 | TCP | HTTPS | Web over TLS | The default. C2 favourite — it blends in. |
| 445 | TCP | SMB / CIFS | Windows file sharing | Ransomware highway (EternalBlue, lateral movement). Never expose to Internet. |
| 465 / 587 | TCP | SMTPS / submission | Authenticated mail submission | 587 with STARTTLS is modern; 465 is implicit-TLS revival. |
| 500 | UDP | IKE | IPsec VPN key exchange | Plus UDP 4500 for NAT-T. |
| 514 | UDP | Syslog | Log shipping | Cleartext, no auth — use TLS-syslog (TCP 6514) for sensitive logs. |
| 636 | TCP | LDAPS | LDAP over TLS | Replaces 389 for password binds. |
| 993 | TCP | IMAPS | Secure IMAP | Implicit TLS. |
| 995 | TCP | POP3S | Secure POP3 | Implicit TLS. |
| 1433 | TCP | MSSQL | Microsoft SQL Server | Internet-exposed MSSQL is breach-imminent. |
| 1521 | TCP | Oracle DB | Oracle TNS listener | Same — never expose externally. |
| 3306 | TCP | MySQL / MariaDB | Open-source SQL | Authentication bypass and weak-cred exposures common. |
| 3389 | TCP | RDP | Windows Remote Desktop | The single most-attacked port on the Internet. NLA + MFA + VPN only. |
| 5432 | TCP | PostgreSQL | Open-source SQL | Restrict via `pg_hba.conf` and firewall. |
| 5985 / 5986 | TCP | WinRM / WinRM-HTTPS | PowerShell remoting | Lateral movement vector — Kerberos-only, restrict source. |
| 8080 / 8443 | TCP | HTTP-alt / HTTPS-alt | Proxies, admin UIs, dev servers | "Forgotten test instance" candidate — scan your own estate for these. |

A few habits that pay off:

- Treat anything **above 1024 that you didn't put there** as suspect — many backdoors squat on high ports specifically to look unremarkable.
- The number you **don't** recognise is the one to investigate first. Familiar ports rarely surprise; the surprises live in the unknowns.
- The same number can mean different things on TCP vs UDP. Always say the protocol out loud.

## Secure vs cleartext alternatives

Most legacy protocols have a TLS-protected sibling. The migration is rarely free — it costs a certificate, a config change, often a client-library update — but on a modern network the cleartext version should not be running.

| Legacy / cleartext | Port | Secure replacement | Port | Notes |
|---|---|---|---|---|
| Telnet | 23 | SSH | 22 | Telnet should not exist on any production network. |
| FTP | 21 | SFTP (over SSH) | 22 | Or FTPS — implicit TLS on 990, explicit on 21 with `AUTH TLS`. |
| HTTP | 80 | HTTPS | 443 | 80 should 301-redirect to 443 only. |
| SMTP (cleartext) | 25 | SMTP submission + STARTTLS | 587 | Plus implicit-TLS SMTPS on 465. |
| POP3 | 110 | POP3S | 995 | Implicit TLS. |
| IMAP | 143 | IMAPS | 993 | Implicit TLS. |
| LDAP | 389 | LDAPS | 636 | Or LDAP+StartTLS on 389. AD enforces channel binding. |
| SNMP v1 / v2c | 161 | SNMPv3 | 161 | Same port, but with auth + priv. v1/v2c community strings are passwords in plaintext. |
| Syslog (UDP) | 514 | Syslog over TLS | 6514 | TCP + TLS preserves and protects logs in transit. |
| HTTP-based WinRM | 5985 | WinRM-HTTPS | 5986 | Always prefer the TLS variant in domain envs. |
| RDP (RDP Security Layer) | 3389 | RDP with NLA + TLS | 3389 | Same port; require Network Level Authentication. |
| TFTP | 69 | SFTP / SCP | 22 | TFTP only inside trusted boot/management VLANs. |

The pattern is consistent: when in doubt, the secure variant either runs on a different well-known port (POP3S 995, IMAPS 993) or on the same port with TLS bolted on (STARTTLS, LDAP+StartTLS). Knowing both numbers is part of the job.

For the design context — *how* an estate moves off the cleartext column to the secure column without breaking clients — see [secure protocols](../secure-design/secure-protocols.md).

## High-risk ports to watch

Some ports are dangerous not because the protocol is broken but because exposing them to the wrong network ends careers. Treat each of these as "VPN-only, never on the Internet, alert on every external probe":

- **TCP 445 — SMB.** EternalBlue, ransomware lateral movement, NTLM relay. The single highest-impact open port a Windows shop can leak.
- **TCP 3389 — RDP.** The most-brute-forced port on the Internet. Even with NLA, exposing 3389 invites credential-stuffing 24/7. Put it behind a VPN or a jump host with MFA.
- **TCP 1433 — MSSQL.** Public MSSQL is breach-imminent. The default `sa` account, weak passwords, and `xp_cmdshell` make it a one-step pivot to the OS.
- **TCP 5985 — WinRM (HTTP).** Lateral-movement vector; if an attacker has any valid credential, WinRM is often how they spread.
- **TCP 23 — Telnet.** Cleartext credentials. Finding it open on any device built after 2005 is an incident.
- **TCP 21 — FTP.** Cleartext credentials and data. Anonymous FTP servers still leak entire datasets in 2026.
- **UDP 161 — SNMPv1/v2c.** Default community strings (`public`, `private`) are still found on internet-exposed devices and turn into a one-line config dump.
- **TCP 4444, 5555, 6666, 31337.** Not legitimate services — these are common backdoor / Metasploit defaults. Seeing one listening on a host is a strong incident signal.

The defensive rule of thumb: if a port from this list is reachable from the Internet, the answer is not "harden it" but "remove the exposure first, then harden."

## Finding listening ports

Half of the value of this lesson is being able to answer "what is this host exposing right now?" in one command. Run this on every box you own. Run it after every deployment. Run it when you suspect compromise.

### Linux

```bash
# Modern: ss is the iproute2 replacement for netstat
sudo ss -tulpn

# -t TCP, -u UDP, -l listening only, -p show owning process, -n numeric (no DNS)
```

```bash
# Older: netstat from net-tools, same flags
sudo netstat -tulpn
```

```bash
# lsof: more detail per socket, including the user
sudo lsof -i -P -n | grep LISTEN
```

Each row gives you the protocol, local IP and port, the process name, and the PID. Pipe through `awk` or `column` for tidier output, and into `sort -k5` to group by port. A common pattern:

```bash
sudo ss -tulpn | awk 'NR>1 {print $1, $5, $7}' | column -t
```

### Windows

```powershell
# Modern PowerShell — listening TCP only
Get-NetTCPConnection -State Listen |
    Sort-Object LocalPort |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

```powershell
# Map PID to process name in one go
Get-NetTCPConnection -State Listen |
    ForEach-Object {
        $proc = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
        [PSCustomObject]@{
            Port    = $_.LocalPort
            Address = $_.LocalAddress
            PID     = $_.OwningProcess
            Process = $proc.ProcessName
        }
    } | Sort-Object Port | Format-Table -AutoSize
```

```powershell
# Classic netstat — works on every Windows since XP
netstat -ano | findstr LISTENING
```

The PID in the last column maps to a process via `tasklist /FI "PID eq 4567"` or `Get-Process -Id 4567`. **Always** map PID to process — a row that says "port 4444, PID 8732" tells you nothing until you know whether that is `chrome.exe` or `nc.exe`.

For UDP listeners on Windows, use `Get-NetUDPEndpoint`. Note that UDP has no "state" — a UDP socket is either bound or not — so the distinction between LISTEN and ESTABLISHED that TCP uses does not apply.

## Port scanning basics

When you don't have shell access — testing a remote host, doing recon from outside, validating a firewall rule — you scan from the network with `nmap`. Three modes cover 90% of the work:

| Flag | Name | What it does | When to use |
|---|---|---|---|
| `-sS` | SYN scan ("half-open") | Send SYN, read SYN/ACK or RST, never complete handshake | Default for authorised TCP recon. Needs root. |
| `-sT` | TCP connect scan | Full three-way handshake via the OS sockets API | When you can't get root. Logged by the target. |
| `-sU` | UDP scan | Send empty UDP, infer state from ICMP unreachable or app reply | UDP services. Slow and noisy by nature. |

The output for each port is one of three states:

- **open** — the target replied affirmatively (SYN/ACK on TCP, application response on UDP). A service is listening.
- **closed** — the target answered "nothing here" (RST on TCP, ICMP port-unreachable on UDP). The host is up; the port is not.
- **filtered** — no useful answer at all. A firewall is dropping the probe silently. You cannot tell open from closed.

A typical authorised scan of a single host:

```bash
sudo nmap -sS -sV -p- --reason -oA scan example.local
```

`-sV` does service / version detection (banner grabbing), `-p-` covers all 65,535 TCP ports, `--reason` shows *why* nmap labelled each port the way it did, and `-oA` writes nmap, gnmap, and XML output for later parsing.

**Legality and authorisation.** Port scanning a host you do not own and have not been authorised to test is illegal in most jurisdictions — the UK Computer Misuse Act, the US CFAA, the Azerbaijani Criminal Code Article 271-273, and the EU NIS2 frameworks all reach scanning. "I was just looking" is not a defence. Get written authorisation before scanning anything that is not yours. Lab networks, CTF ranges, and explicit pen-test scopes are the only safe playgrounds.

## Hands-on / practice

Five exercises. Do them in order; each builds on the previous.

### 1. List listening ports on your machine

On Linux: `sudo ss -tulpn`. On Windows: the PowerShell snippet from the section above. Write down every listener — port, protocol, process. For each one, answer: "do I know why this is here?" Anything you cannot explain in a sentence is a research task.

### 2. Scan a lab host with nmap

Spin up a deliberately vulnerable VM (Metasploitable, DVWA, a CTF box) on an isolated network. Scan it: `sudo nmap -sS -sV -p- 10.0.0.99`. Read the output. Identify three open ports and look up the running service version. Cross-reference one with `searchsploit` to see whether a public exploit exists.

### 3. Identify unexpected listeners

On the host from exercise 1, deliberately run `python3 -m http.server 8765` in a terminal, then re-run `ss -tulpn`. Find the new listener. Map the port to the process. Now imagine you found that listener on a host you didn't expect to be running a Python web server — write the three sentences you would put in your incident ticket.

### 4. Look up an unknown port

Pick three ports you do not recognise: `tcp/2375`, `tcp/2483`, `udp/5353`. For each, consult `/etc/services` (Linux) or the IANA Service Name and Transport Protocol Port Number Registry online. Note the service and write a sentence on what it does and whether it is something you would want exposed.

### 5. Decide secure alternatives

For each of these eight legacy services, write down the modern secure replacement and the port it runs on: Telnet, FTP, HTTP, POP3, IMAP, LDAP, SNMPv2c, syslog. Check your answers against the **secure vs cleartext alternatives** table above.

## Worked example — `example.local` SOC analyst spots a listener on TCP 4444

Routine endpoint posture sweep at `example.local`. The hourly `ss -tulpn` cron job on `web03.example.local` reports a new listener:

```text
tcp   LISTEN  0  128  0.0.0.0:4444  0.0.0.0:*  users:(("svchost",pid=8421,fd=3))
```

Port 4444 — Metasploit's default reverse-shell handler port. The process name is `svchost` (lowercase, on Linux — that is already odd; `svchost.exe` is a Windows thing). The on-call SOC analyst opens the ticket and walks the stack.

**Step 1 — confirm the listener.** SSH to `web03`, rerun `sudo ss -tulpn | grep 4444`. Same row. Listener is real, not a stale report.

**Step 2 — identify the process.** `sudo lsof -i :4444` gives the PID, the binary path, and the user it runs as. The path is `/tmp/.X11-unix/svchost`. A binary in `/tmp` masquerading as a Windows service name is *not* a legitimate dev server.

**Step 3 — examine the binary.** `file /tmp/.X11-unix/svchost` shows `ELF 64-bit LSB executable, x86-64, statically linked`. `sha256sum` it, submit the hash to the threat-intel lookup. Hit: known Meterpreter payload.

**Step 4 — find the parent.** `ps -ef | grep 8421` shows the parent PID; trace it up the tree. The parent turns out to be the `apache2` worker — meaning the web server spawned the implant. That points at a web-app vulnerability that achieved code execution; the implant is the second stage.

**Step 5 — contain.** Pull `web03` from the load balancer, snapshot the disk for forensics, kill the listener (`kill -9 8421`), block outbound connections from the host pending investigation. Open a P1 incident — this is not a misconfigured dev server; this is a live foothold.

**Counterfactual.** If the binary had been `/usr/bin/python3` running as the developer's user, with the parent being a screen session, this would be a junior dev testing a tutorial. The fix is "don't run Metasploit on prod hosts," not a P1.

The discriminator was not the port number alone — 4444 is suggestive but not conclusive. It was the **port plus the process plus the parent plus the binary path**. Ports are the thread you pull; the rest of the investigation is what is on the other end.

## Troubleshooting & pitfalls

**Port collisions — two services want the same port.** Only one process can bind a TCP port on a given IP at a time. The second one fails with `EADDRINUSE` ("Address already in use"). Find the squatter with `ss -tulpn | grep :8080` and either stop it, change its port, or bind to a different IP. The same port number on different IPs (`127.0.0.1:8080` vs `0.0.0.0:8080`) is sometimes allowed and sometimes not — depends on the OS and `SO_REUSEADDR`.

**Ephemeral port exhaustion on a NAT gateway.** A NAT device translating thousands of clients picks a source port from its ephemeral pool for every outgoing connection. With Linux's default `~28,000` ports per public IP, a busy gateway can run out — clients see random connection failures while the gateway logs `nf_conntrack: table full` or `bind: cannot assign requested address`. Fixes: add public IPs (each adds a fresh ephemeral pool), widen `ip_local_port_range`, lower `tcp_fin_timeout` so ports recycle faster, or move to per-destination NAT.

**Well-known port without privilege drop.** A daemon binds port 80 as root, then forgets to drop privileges. Now the entire web server runs as root, and any code-execution bug becomes root code execution. The Unix idiom is "bind low, then `setuid()` to a service account." On systemd, prefer `AmbientCapabilities=CAP_NET_BIND_SERVICE` and run the service as a non-root user from the start.

**IPv6-only listeners hidden from IPv4 checks.** A service bound to `::1` shows up in `ss -tlnp` only if you ask for both families (`-6`) or use the right view. `netstat -an4` will not show it. Always check both stacks: `ss -tulpn` (default shows both), or explicitly `ss -tulpn -4` and `ss -tulpn -6`. An attacker who has noticed your ops team only inspects v4 will preferentially put their backdoor on v6.

**Firewall vs port state confusion.** A `filtered` result from nmap does not mean the port is closed — it means a firewall ate the probe. Run a credentialed listener check on the host as well; what the network sees and what the host actually exposes can differ when there are middle-boxes.

**TCP and UDP are independent.** Closing TCP/53 does not close UDP/53. Audit both, especially for DNS, NTP, SNMP, and Kerberos — all of which use one transport for normal traffic and the other for edge cases.

## Key takeaways

- A port is a 16-bit label the OS uses to deliver segments to the right process. The 5-tuple identifies a flow uniquely.
- Three ranges: well-known `0–1023`, registered `1024–49151`, ephemeral `49152–65535`. Source ports are almost always ephemeral.
- The thirty ports in the table above are vocabulary — memorise them, do not look them up.
- Every cleartext legacy protocol has a TLS-protected sibling. On a modern network the cleartext one should not be running.
- High-risk ports (445, 3389, 1433, 5985, 23, 21, SNMPv1, 4444) belong on a "never on the Internet" list.
- `ss -tulpn` and `Get-NetTCPConnection -State Listen` are the two commands to live by. Run them often.
- `nmap -sS / -sT / -sU` cover most authorised recon. Always interpret open / closed / filtered correctly. Always have written authorisation.
- The number alone is a hint, not a verdict — investigate process, parent, binary path, and user before declaring incident or innocence.

## References

- IANA Service Name and Transport Protocol Port Number Registry: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
- RFC 6335 — IANA Procedures for Port and Service Name Assignment: https://www.rfc-editor.org/rfc/rfc6335
- RFC 9293 — Transmission Control Protocol: https://www.rfc-editor.org/rfc/rfc9293
- RFC 768 — User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768
- Nmap Reference Guide: https://nmap.org/book/man.html
- Nmap port-scanning techniques: https://nmap.org/book/man-port-scanning-techniques.html
- Microsoft — Service overview and network port requirements for Windows: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/service-overview-and-network-port-requirements
- Linux `ss(8)` manual: https://man7.org/linux/man-pages/man8/ss.8.html
- SANS — Top ports list and common service mappings: https://www.sans.org/blog/
