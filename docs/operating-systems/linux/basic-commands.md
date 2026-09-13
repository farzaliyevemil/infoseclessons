---
id: linux-basic-commands
title: Linux Basic Commands — Working Reference
description: The Linux commands an IT or security engineer uses every day — navigation, file management, text inspection, permissions, processes, and archives — with security-relevant notes on each.
slug: /operating-systems/linux/basic-commands
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - commands
  - bash
  - navigation
  - grep
  - permissions
  - processes
  - tar
difficulty: foundation

tags:
  - linux
  - beginner
---

# Linux Basic Commands

Linux fundamentals ([Linux Fundamentals](/operating-systems/linux/fundamentals)) explain how the system is organized; this lesson is the working vocabulary you use inside it. Every command here runs on any mainstream distribution and appears constantly in incident timelines, runbooks, and interviews. The goal is not memorization — it is being able to _move around a system and answer questions about it_ without reaching for a search engine.

## Navigation and inspection

```bash
pwd                     # where am I — print working directory
ls -lah                 # list with human sizes and hidden files
cd /var/log             # change directory (cd - returns to previous)
tree -L 2               # two levels of directory tree (install via package manager)
file report.bin         # what kind of file is this really?
stat file.txt           # timestamps, ownership, permissions in one view
df -h                   # disk space per filesystem
du -sh /var/log         # size of a directory
free -h                 # memory; uptime for load
```

`ls -lah` is the single most typed command in support work. The `-h` keeps sizes human-readable, `-a` shows dotfiles such as `.bash_history` — which, incidentally, is one of the first files an investigator reads on a compromised account.

## Finding things

```bash
find /etc -name "*.conf"              # by name, under /etc
find / -mtime -1 -type f 2>/dev/null  # files changed in the last 24 h
find / -size +100M -type f 2>/dev/null
locate nginx.conf                     # fast, but only as fresh as its index
which python3                         # where does this command resolve from?
history | tail -50                    # what did this shell recently run?
```

`find` is the investigator's scalpel: "everything modified since the alert fired" and "any file over 100 MB in a web root" are both one-liners. The `2>/dev/null` suppresses permission errors you do not care about while scanning as a normal user.

## Reading files

```bash
cat config.yml                # small files, whole content
less +F /var/log/syslog       # like tail -f, with scrolling (Ctrl+C to stop)
head -20 app.log
tail -100 app.log
tail -f /var/log/auth.log     # follow a log live — the SOC reflex
grep -i "failed password" /var/log/auth.log
grep -rn "TODO" ./project/    # recursive, with line numbers
grep -c "error" app.log       # count matches
diff old.conf new.conf        # what changed between two files
```

`grep` deserves deliberate practice — it is half of every log-analysis session (the other half is [Log Analysis](/blue-teaming/log-analysis)). Useful flags beyond the basics: `-v` (invert match), `-E` (extended regex), `-A 3 -B 1` (context lines around a match).

## Editing files

Server work happens in terminal editors, not GUIs:

- **nano** — what you use when you just need to change one line. `Ctrl+O` saves, `Ctrl+X` exits.
- **vim** — what you find on every server. Minimum survival kit: `i` to insert, `Esc`, `:wq` to save and quit, `:q!` to quit without saving, `/text` to search, `dd` to delete a line.

Prefer `sudoedit /etc/ssh/sshd_config` over `sudo vim` — it edits a copy and writes back atomically, so a botched edit cannot leave a broken root-owned file behind.

## Permissions and ownership

The full model gets its own lesson ([Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions)); these are the everyday verbs:

```bash
chmod 600 id_rsa            # owner read/write only — SSH key hygiene
chmod +x deploy.sh          # make executable
chown www-data:www-data /var/www/uploads -R
sudo -l                     # which commands may I run as root?
```

## Processes and services

```bash
ps aux | grep nginx         # is it running?
top                         # live view (q to quit)
kill 12345                  # terminate politely (SIGTERM)
kill -9 12345               # last resort (SIGKILL) — no cleanup, use rarely
systemctl status nginx      # service state and recent log lines
sudo systemctl restart sshd
```

Systemd gets a dedicated lesson ([Linux Services and systemd](/operating-systems/linux/systemd-services)); for now, `systemctl status` is the fastest "is it broken and why" answer, because its first lines include the last journal entries for the unit.

## Archives and transfer

```bash
tar -czf logs.tar.gz /var/log/app/    # create gzip archive
tar -xzf logs.tar.gz                  # extract
tar -tzf logs.tar.gz                  # list contents without extracting
scp evidence.tar.gz analyst@10.0.0.5:/tmp/
rsync -avz /data/ backup@host:/backup/data/   # efficient incremental sync
```

Collect evidence with `tar` before touching a system: `tar -czf /tmp/$(hostname)-$(date +%F).tar.gz /var/log /etc` captures the two directories every incident review asks for.

## A minimal field kit

If you remember nothing else, these six answer most "what is happening on this box" questions:

```bash
uptime && free -h && df -h        # load, memory, disk
ps aux --sort=-%cpu | head        # top CPU consumers
ss -tulpn                         # listening ports and owning processes
tail -100 /var/log/syslog         # recent system events
last -20                          # recent logins
```

`ss -tulpn` deserves a special mention: on any unfamiliar system it answers "what is listening and who owns it" — the question behind most initial triage and most compromise assessments.

## Where to go next

- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) — the model behind `chmod` and `chown`.
- [Linux Services and systemd](/operating-systems/linux/systemd-services) — beyond `systemctl restart`.
- [Linux Hardening](/operating-systems/linux/hardening) — turning a default install into a defensible one.
