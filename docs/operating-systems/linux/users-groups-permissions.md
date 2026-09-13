---
id: linux-users-groups-permissions
title: Linux Users, Groups and Permissions
description: How Linux identity and access actually works — /etc/passwd and shadow, sudo and sudoers, the permission bit model, SUID/SGID/sticky, umask, and ACLs — with the misconfigurations attackers look for.
slug: /operating-systems/linux/users-groups-permissions
sidebar_position: 3
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - linux
  - permissions
  - users
  - groups
  - sudo
  - chmod
  - suid
  - umask
  - acl
difficulty: foundation
---

# Linux Users, Groups and Permissions

Every question a security engineer asks about a Linux box eventually reduces to **"which identity can do what here?"** This lesson is that model, end to end: where identities live, how privilege escalation is delegated, how the permission bits work, and which misconfigurations turn a boring server into an easy target.

## Where identities live

Three files define local identity. Read them with care — they are world-readable for good reasons and each hides exactly one secret:

| File          | Contains                                     | Permissions                          |
| ------------- | -------------------------------------------- | ------------------------------------ |
| `/etc/passwd` | Username, UID, GID, home, shell — no secrets | `644`, world-readable                |
| `/etc/group`  | Group name, GID, members                     | `644`                                |
| `/etc/shadow` | Password hashes and aging policy             | `000` or `640` (root + shadow group) |

Anatomy of a passwd line: `elvin:x:1001:1001:Elvin Farzaliyev:/home/elvin:/bin/bash`. The `x` means the hash lives in shadow. **A `!` or `*` in the shadow hash field means the password login is disabled** — that is what a healthy service account looks like. `UID 0` is root by definition: any _second_ account with UID 0 is a red flag worth alerting on.

Useful audit one-liners:

```bash
awk -F: '$3 == 0 {print $1}' /etc/passwd        # every UID-0 account
awk -F: '$7 !~ /(nologin|false)$/' /etc/passwd  # accounts that can actually log in
sudo awk -F: '$2 !~ /^[!*]/ {print $1}' /etc/shadow  # accounts with a set password
```

## Creating and managing users

```bash
sudo useradd -m -s /bin/bash aysel     # low-level: create home, set shell
sudo adduser aysel                     # Debian's friendlier interactive wrapper
sudo usermod -aG docker aysel          # append to a group (-a matters: without it you REPLACE groups)
sudo passwd aysel                      # set/rotate a password
sudo usermod -L aysel                  # lock the password (hash prefixed with !)
sudo usermod -s /usr/sbin/nologin oldsvc   # turn a leaver into a nologin account
usermod -u 0 backdoor                  # attacker move: UID 0 clone — detect, don't emulate
```

The `usermod -aG` mistake is a classic outage: forgetting `-a` removes the user from every group except the new one — including `sudo`.

## sudo: delegated privilege done right

Direct root logins should be off; privilege should flow through `sudo`, which authenticates, authorizes, and **logs**. Policy lives in `/etc/sudoers` and `/etc/sudoers.d/` — edit only with `visudo`, which syntax-checks before saving (a broken sudoers file can lock you out of root entirely).

```sudoers
aysel   ALL=(ALL:ALL) ALL              # full sudo, asks for own password
%devops ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx   # narrow, passwordless
backupsvc ALL=(root) NOPASSWD: /usr/local/bin/backup.sh        # service account pattern
```

The security review checklist for sudoers:

- `NOPASSWD:` entries with wildcards (`/usr/bin/systemctl *`) are effectively full root — editors, find, tar, and less all escape via shell escapes.
- `sudo -l` as any user prints their grants; on an assessment it is the first command after a foothold, and on a hardening audit it is the first policy leak to check.
- `Defaults logfile="/var/log/sudo.log"` plus `iolog_dir` gives you per-command audit trails worth having.

## The permission bits

Every file carries three triplets — owner, group, others — of read/write/execute:

```text
-rwxr-x--- 1 aysel devops 4096 app.sh
 │└─┤└─┤└──┘
 │ │  │  └── others: no access
 │ │  └───── group (devops): read + execute
 │ └──────── owner (aysel): read + write + execute
 └────────── file type: - file, d directory, l symlink
```

For directories the bits mean something different: `r` lists names, `w` creates/deletes entries, `x` _traverses_ into the directory. A directory with `--x` is pass-through-only — you can reach files inside by exact name but cannot list them.

Octal arithmetic is the working shorthand: `r=4, w=2, x=1`.

```bash
chmod 644 report.md      # rw-r--r--  — default for documents
chmod 600 id_rsa         # rw-------  — the only sane private key mode
chmod 755 deploy.sh      # rwxr-xr-x  — executable others can run
chown aysel:devops app/  # owner and group at once
```

`umask` subtracts from new-file modes (typically `022` → `644`/`755`). A shared-staging server that needs group-write by default sets `umask 002` in the shell profile — deliberately, not accidentally.

## Special bits: the three extra flags

| Bit                     | On files                                            | On directories                                     | Example                                   |
| ----------------------- | --------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| **SUID** (`u+s`, 4xxx)  | Runs with the _file owner's_ identity, usually root | —                                                  | `/usr/bin/passwd` needs it to edit shadow |
| **SGID** (`g+s`, 2xxx)  | Runs with the _group's_ identity                    | New files inherit the directory's group            | shared team directories                   |
| **Sticky** (`+t`, 1xxx) | —                                                   | Only the file's owner (or root) can delete entries | `/tmp` (`drwxrwxrwt`)                     |

SUID is the one to police. Every SUID-root binary is a privilege-escalation primitive if its editor is careless (`GTFOBins` documents the well-known escape routes for `vim`, `find`, `less` and friends). Two standing checks:

```bash
find / -perm -4000 -type f 2>/dev/null     # enumerate SUID binaries — diff against baseline
find / -perm -2000 -type f 2>/dev/null     # enumerate SGID binaries
mount | grep nosuid                        # where SUID is (and isn't) honored
```

Administrators should keep the set small and reviewers should treat any _new_ entry — especially in writable paths such as `/tmp` or a web root — as an incident signal, not trivia.

## Beyond the bits: ACLs and attributes

POSIX ACLs solve "one extra user needs access" without inventing groups:

```bash
getfacl /srv/shared
setfacl -m u:backup:r /srv/shared/dump.sql   # grant read to backup user
setfacl -m d:g:devops:rwX /srv/shared        # default ACL — inherited by new files
```

`chattr` adds filesystem-level flags a normal `chmod` cannot override: `chattr +a logfile` (append-only — beloved by log shipping) and `+i` (immutable, even root cannot edit without removing the flag first). Attackers use `+i` on implanted files too; `lsattr` shows it, and an immutable flag you did not set is a finding.

## The misconfigurations that actually bite

1. **`chmod 777` as a support tool.** It fixes the symptom and publishes the directory. Diagnose the real identity problem instead.
2. **`NOPASSWD` sprawl.** Every unaudited wildcard grant is root with extra steps; keep them named, versioned, and minimal.
3. **Service accounts with shells.** `nologin` + no password + scoped sudo at most.
4. **World-writable files in system paths.** `find /etc /usr -perm -002 -type f` should return nothing on a healthy host.
5. **Unpoliced SUID.** New SUID binaries appear via careless `chmod` or attacker implantation — baseline the set and alert on drift.

## Where to go next

- [Linux Services and systemd](/operating-systems/linux/systemd-services) — constraining what services can do once they are compromised.
- [Linux Hardening](/operating-systems/linux/hardening) — turning all of this into a checklist.
- [Linux Basic Commands](/operating-systems/linux/basic-commands) — the verbs, if the nouns here moved fast.
