---
id: linux-hardening
title: Linux Hardening
description: Turning a default Linux install into a defensible one — attack surface reduction, updates, SSH hardening, firewalls, auditd, kernel settings, and a verification checklist mapped to CIS thinking.
slug: /operating-systems/linux/hardening
sidebar_position: 5
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - hardening
  - ssh
  - firewall
  - ufw
  - auditd
  - fail2ban
  - cis benchmark
  - sysctl
difficulty: intermediate

tags:
  - linux
  - intermediate
---

# Linux Hardening

A default Linux install is convenient, networked, and honest about it: it runs an SSH daemon that accepts passwords for root, ships services nobody asked for, logs just enough to debug, and trusts the kernel defaults of a desktop era. Hardening is the deliberate reversal — **reduce what is reachable, constrain what is runnable, record what happens** — and it is most effective as a checklist applied at build time, before a server ever meets the internet. This lesson is that checklist with the reasoning attached, ordered the way an attacker experiences the system.

## 1. Shrink the surface before anything else

The cheapest control is the thing that does not exist:

```bash
systemctl list-units --type=service --state=running   # what is actually on?
ss -tulpn                                             # what is reachable?
```

Every listening socket is a patch-forever obligation and a potential entry point. Remove or disable what the server's stated role does not need — a database server has no business running a mail agent, and a build runner has no business running cups. Package managers know what pulled a service in (`apt depends`, `dnf repoquery --whatrequires`), so "we might need it someday" can be answered by "we can install it in four minutes someday".

Keep the stack minimal at build time: minimal images (cloud-init `packages:` lists, Dockerfiles from `*-minimal` bases) harden by construction rather than by later discipline.

## 2. Patching: unattended and verified

Most exploited vulnerabilities on Linux servers were patched months before the compromise. Automate the boring layer:

```bash
sudo apt install unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades
```

Decide explicitly what is automatic: security updates — yes, unattended; kernel major bumps and database engines — usually gated behind maintenance windows. Then **verify patch state as data**, not vibes: a weekly `apt list --upgradable` / `dnf updateinfo summary` diff in monitoring, or an inventory tool that alerts when the median patch age per fleet crosses your policy (most teams land on 14–30 days for criticals). Reboot policy belongs in the same sentence: an updated-but-not-rebooted kernel protects nobody — check with `needs-restarting -r` (RHEL) or `/var/run/reboot-required` (Debian).

## 3. SSH: the front door

SSH is the one service almost every Linux server exposes, so it carries the hardening load. Non-negotiables for `/etc/ssh/sshd_config` (drop-ins under `/etc/ssh/sshd_config.d/` on modern distros):

```text
PermitRootLogin no                  # root never logs in directly
PasswordAuthentication no           # keys only, everywhere you can
PubkeyAuthentication yes
KbdInteractiveAuthentication no
AllowGroups ssh-users               # explicit allowlist, not the whole building
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
X11Forwarding no
AllowTcpForwarding no               # unless you genuinely tunnel
```

Working practices that matter as much as the config:

- **Manage keys like credentials**: `authorized_keys` audit (`awk '{print $NF}' ~/.ssh/authorized_keys` to see who a key belongs to), rotation on departure, and no shared personal keys. For fleets, certificate-based SSH (short-lived certs signed by a CA, via something like HashiCorp Vault SSH or Teleport) removes the key-sprawl class entirely.
- **Changing the port** stops the bulk scanner noise, not targeted attacks — fine as hygiene, never as a control.
- **fail2ban** (or `sshd`'s own `MaxStartups` + firewall rules) against brute-force noise: `sudo apt install fail2ban` works acceptably out of the box on Debian-family.
- Test every change with `sshd -t` and keep a second session open — this is the classic self-lockout scenario.

## 4. Firewall: default-deny is a posture, not a setting

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.0.0/24 to any port 22 proto tcp   # management subnet only
sudo ufw allow 80,443/tcp
sudo ufw enable && sudo ufw status verbose
```

The principle that separates a firewall from decoration: **management planes (SSH, databases, caches, admin UIs) get source restrictions; only the service's public ports get world rules.** A Postgres port open to `0.0.0.0/0` with a strong password is an incident consuming its lucky days. On multi-host systems, prefer nftables/iptables managed by configuration management, or cloud security groups with the same default-deny logic — the tool matters less than the invariant: _nothing is reachable except what is documented as reachable._

## 5. Users, sudo and identity hygiene

Covered in depth in [Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions); the hardening one-liners:

```bash
awk -F: '$3 == 0 {print $1}' /etc/passwd              # exactly one UID-0 account
sudo awk -F: '$2 !~ /^[!*]/ {print $1}' /etc/shadow   # who has a password at all
grep -rE "NOPASSWD" /etc/sudoers /etc/sudoers.d/       # passwordless sudo inventory
find / -perm -4000 -type f 2>/dev/null                # SUID baseline
```

Service accounts get `nologin` shells and no passwords; humans get sudo (logged, per-command) instead of shared root; departures disable, not delete.

## 6. Kernel and network settings

A small sysctl set closes the classic network-layer gaps — `/etc/sysctl.d/99-hardening.conf`:

```text
net.ipv4.ip_forward = 0                # routers forward; servers don't
net.ipv4.conf.all.rp_filter = 1        # source validation
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.tcp_syncookies = 1            # SYN flood resistance
kernel.kptr_restrict = 2               # hide kernel pointers from unprivileged users
kernel.dmesg_restrict = 1
fs.protected_symlinks = 1
fs.protected_hardlinks = 1
```

Apply with `sysctl --system`. On containers or VMs some keys are namespace-scoped — verify per host rather than copy-pasting between a bare-metal and a Kubernetes node.

## 7. Mandatory access control

SELinux (RHEL-family) and AppArmor (Ubuntu/SUSE) confine what a compromised service can touch beyond file permissions. Running them in enforcing mode is the single highest-leverage default most distributions already give you — the sin is disabling them the first time something breaks instead of fixing the label:

```bash
getenforce                                 # Enforcing is the goal state (RHEL)
aa-status | head                           # AppArmor profiles loaded (Ubuntu)
audit2why < /var/log/audit/audit.log       # SELinux: why was this denied
```

Confined services plus the systemd sandbox from [Linux Services and systemd](/operating-systems/linux/systemd-services) (`ProtectSystem=strict`, `PrivateTmp`, `CapabilityBoundingSet=`) overlap defensively: one misconfiguration then has a second layer behind it.

## 8. Logging and audit

You cannot investigate what you did not record (see [Log Analysis](/blue-teaming/log-analysis)). Minimums:

- **journald persistence** (`/var/log/journal` exists) and remote shipping — logs on the same disk as the attacker are suggestions, not evidence. Ship to a central store the host cannot write to.
- **auditd** for the high-value rules — watch keys that answer "who touched auth and identities":

```bash
sudo auditctl -w /etc/passwd -p wa -k identity
sudo auditctl -w /etc/sudoers -p wa -k identity
sudo auditctl -w /etc/ssh/sshd_config -p wa -k sshd_config
sudo ausearch -k identity | aureport -f   # readable report
```

- **login accounting** kept intact: `last`, `lastb`, and the raw auth logs, rotated and shipped.
- Integrity monitoring (AIDE/Wazuh/FIM) on `/etc`, `/usr/bin`, `/usr/sbin` — drift alerting beats monthly audits.

## 9. Verify like an attacker

Hardening without verification is a document. Close the loop:

```bash
systemd-analyze security                 # per-service exposure scores
sudo lynis audit system                  # CIS-mapped review with hardening index
nmap -sV -p- <host>                      # from outside: is the surface what you documented?
```

Then codify it: the CIS benchmark for your distribution is the industry baseline checklist, and tools (OpenSCAP, Lynis, Wazuh SCA) turn it into continuous compliance instead of an annual PDF. The realistic team standard is: **new servers are built from a hardened image, drift is alerted on, and the image itself is reviewed quarterly.**

## The checklist, compressed

| Layer        | Control                                               | Verify                          |
| ------------ | ----------------------------------------------------- | ------------------------------- |
| Surface      | Only role-required services listening                 | `ss -tulpn` vs documented ports |
| Patching     | Unattended security updates, reboot policy            | patch-age alerting              |
| SSH          | Keys only, no root, allowlisted users                 | `sshd -T`, failed-auth trends   |
| Network      | Default-deny inbound, source-restricted management    | external `nmap`                 |
| Identity     | One UID-0, no password service accounts, audited sudo | the three one-liners above      |
| Kernel       | sysctl hardening set applied                          | `sysctl --system` output        |
| MAC          | SELinux/AppArmor enforcing                            | `getenforce` / `aa-status`      |
| Logging      | Persistent, shipped, tamper-resistant                 | log gap monitoring              |
| Verification | CIS-mapped scan on schedule                           | Lynis/OpenSCAP reports          |

## Where to go next

- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) and [Linux Services and systemd](/operating-systems/linux/systemd-services) — the primitives this checklist assembles.
- [Log Analysis](/blue-teaming/log-analysis) — what the logging you just configured is for.
- [Vulnerability Management](/general-security/vulnerability-management) — where patching fits in the wider lifecycle.
