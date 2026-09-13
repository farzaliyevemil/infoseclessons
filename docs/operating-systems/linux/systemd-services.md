---
id: linux-systemd-services
title: Linux Services and systemd
description: Running and securing services on modern Linux — systemctl, unit files, journalctl, timers, drop-ins, and the sandboxing directives that limit blast radius when a service is compromised.
slug: /operating-systems/linux/systemd-services
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - linux
  - systemd
  - systemctl
  - journalctl
  - services
  - units
  - timers
  - hardening
difficulty: foundation
---

# Linux Services and systemd

On every mainstream distribution, `systemd` is PID 1: it starts the system, supervises every service, restarts the crashed ones, writes the journal, and runs the scheduled jobs. For an IT or security engineer that means one thing — **if you cannot answer "how is this service defined, is it healthy, and what can it touch?", you cannot operate or defend Linux.** This lesson is the working subset: daily `systemctl`, unit anatomy, the journal, timers, and the sandboxing options that turn a compromised service into a contained one.

## The daily verbs

```bash
systemctl status nginx        # state + the last journal lines for the unit
systemctl start|stop|restart nginx
systemctl reload nginx        # re-read config without dropping connections (if supported)
systemctl enable nginx        # start at boot (creates the symlink)
systemctl enable --now nginx  # enable AND start in one move
systemctl disable --now nginx
systemctl list-units --type=service --state=running
systemctl list-units --failed           # the first triage stop on a sick host
systemctl cat nginx                     # the actual unit file, drop-ins included
```

`--failed` deserves a place in every health check: a server can pass its monitoring probe while three units sit in a failed state, one of them being your backup job.

## Anatomy of a unit file

Units live in `/usr/lib/systemd/system/` (packaged defaults — do not edit) and `/etc/systemd/system/` (yours — wins on name collision). A typical service unit:

```ini
[Unit]
Description=Internal reporting API
After=network-online.target postgresql.service
Wants=network-online.target

[Service]
Type=simple
User=reportapi
Group=reportapi
ExecStart=/usr/local/bin/reportapi --config /etc/reportapi/config.yml
Restart=on-failure
RestartSec=5
Environment="LOG_LEVEL=info"

[Install]
WantedBy=multi-user.target
```

What matters operationally:

- **`Type=simple`** (default) — the process itself is the service. `Type=forking` is legacy daemons; `Type=notify` is modern apps that signal readiness.
- **`After=` / `Wants=`** — ordering and weak dependencies. `After` is order only; `Requires` is the strong "die together" coupling that over-eager admins add and then wonder why everything restarts.
- **`User=`** — services running as `root` by default are the most common hardening finding on Linux servers.
- **`Restart=on-failure`** — the difference between a blip and a 3 a.m. page.
- **`[Install] WantedBy=`** — what `enable` hooks into.

After editing any unit: `systemctl daemon-reload` (re-read definitions), then restart the service. Forgetting `daemon-reload` produces the classic "I changed the file and nothing happened".

## Drop-ins: change without owning

Never copy a packaged unit into `/etc` wholesale — upgrades then silently bypass your changes. Override surgically:

```bash
systemctl edit nginx
# creates /etc/systemd/system/nginx.service.d/override.conf
```

```ini
[Service]
# empty Assignment= clears the packaged value — required for list-type keys
ExecStart=
ExecStart=/usr/sbin/nginx -c /etc/nginx/nginx-special.conf
```

The drop-in pattern keeps upgrades working and makes local changes diffable — `systemctl cat` shows base plus overrides together.

## journalctl: the journal is the log

On systemd systems the journal is the primary log store, with plain-text files (`/var/log/auth.log` etc.) as shims for compatibility. Persistence must be enabled explicitly on many distributions — `mkdir /var/log/journal && systemctl restart systemd-journald` — otherwise logs die at reboot, exactly when you need them.

```bash
journalctl -u nginx -f                     # follow one unit
journalctl -u sshd --since "2 hours ago"
journalctl -p err..alert -b                # this boot, errors and worse
journalctl --since "2026-09-13 09:00" --until "2026-09-13 11:00"
journalctl --disk-usage                    # how much the journal eats
```

The security-relevant habit: **correlate service journals with authentication logs** (see [Log Analysis](/blue-teaming/log-analysis)) — `journalctl -u sshd` answers "who came in", `auth.log` answers "what did they do with sudo".

## Timers: cron, but observable

systemd timers replace most cron jobs with units you can inspect, log, and dependency-order:

```ini
# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=*-*-* 02:30:00
Persistent=true          # run after downtime if the slot was missed

[Install]
WantedBy=timers.target
```

```bash
systemctl list-timers --all     # when each fires and when it last ran
```

`Persistent=true` alone is worth the migration — a server that was down at backup time still gets its backup. Cron stays legitimate for one-line user jobs; for anything you might need to debug at 3 a.m., prefer a timer.

## Sandboxing: assume the service will be compromised

This is where systemd pays for itself. A service unit can shed capabilities and filesystem reach before the first packet arrives — each directive is one line, and together they mean a web-shell in this service does not read your private keys:

```ini
[Service]
NoNewPrivileges=true
ProtectSystem=strict          # /usr, /boot, /etc read-only
ProtectHome=true              # hide /home, /root
PrivateTmp=true               # private /tmp per service
PrivateDevices=true           # no raw device nodes
ProtectKernelTunables=true
ProtectKernelModules=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
CapabilityBoundingSet=        # no capabilities at all
ReadWritePaths=/var/lib/reportapi   # the one writable exception
```

```bash
systemd-analyze security nginx        # 0–10 exposure score per unit, with the missing directives listed
```

`systemd-analyze security` is the fastest hardening review available on Linux: it grades every running unit and tells you exactly which lines to add. Shipping a new service with a score below ~4 is a reasonable team standard.

## Troubleshooting playbook

| Symptom               | First moves                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Service won't start   | `systemctl status unit` → read the journal excerpt; `journalctl -u unit -n 50`                                                          |
| Starts, then dies     | Look for `Restart=` loops; `journalctl -u unit -p err`; test `ExecStart` command manually as the service user (`sudo -u reportapi ...`) |
| Config change ignored | `systemctl daemon-reload`, then restart; check drop-in with `systemctl cat`                                                             |
| Port already in use   | `ss -tulpn \| grep :8080` — find the real owner before killing                                                                          |
| Boot hangs on a unit  | `systemd-analyze blame`; disable the offender and debug offline                                                                         |

## Where to go next

- [Linux Hardening](/operating-systems/linux/hardening) — sandboxing in the wider context.
- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) — the identity model these units run under.
- [Log Analysis](/blue-teaming/log-analysis) — reading the journal like an investigator.
