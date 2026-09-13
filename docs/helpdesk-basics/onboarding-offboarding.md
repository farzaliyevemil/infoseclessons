---
id: onboarding-offboarding
title: IT Onboarding and Offboarding
description: Joiner-mover-leaver done right — onboarding checklists that grant least privilege from day one, access moves, and offboarding that actually revokes access on the day someone leaves.
slug: /helpdesk-basics/onboarding-offboarding
sidebar_position: 3
status: reference
last_reviewed: 2026-09-13
category_key: helpdesk-basics
keywords:
  - onboarding
  - offboarding
  - joiner mover leaver
  - access revocation
  - least privilege
  - identity lifecycle
  - compliance
difficulty: foundation

tags:
  - helpdesk
  - beginner
---

# IT Onboarding and Offboarding

Every account your organization has ever created still exists until someone deletes it — and accounts, unlike people, never forget their permissions. The identity lifecycle (**joiner → mover → leaver**, JML in audit language) is where security theory meets helpdesk reality: done well, nobody notices; done badly, it produces ex-employees with active VPN access, new hires waiting a week for a laptop, and audit findings that write themselves. This lesson is the practical playbook for all three transitions, with the security reasoning attached to every step.

## The principle underneath everything

**Access is granted to roles, revoked on schedule, and reviewed continuously — never granted casually and never left as a favor.** Two rules carry the whole lesson:

- **Least privilege from day one.** New joiners get the access their _role_ needs, not the access their enthusiastic teammates share. Every "can you also give her admin for now?" is a future incident wearing a helpful face.
- **Revocation is a deadline, not a suggestion.** The access of a person who resigned yesterday is a live credential. Disgruntled-departure incidents are a documented, recurring pattern — offboarding is a security control, not an HR courtesy.

## Onboarding (joiner): day zero, not week two

A new hire's first day sets the tone — both for their productivity and for their security habits. The checklist that works, split by owner:

**Before day one (HR triggers IT, ideally 3–5 working days ahead):**

- [ ] Account created in the identity platform with **role-based group membership** — never a hand-built pile of per-system grants
- [ ] Hardware provisioned and pre-enrolled in device management (disk encryption on, screen lock policy applied)
- [ ] MFA enrollment scheduled _on day one_ — before first email, not "sometime next week"
- [ ] Mailbox, shared drives and tools from the role's standard access profile
- [ ] Temporary credentials issued through a secure channel, forced change at first logon

**Day one (IT-assisted):**

- [ ] First logon + **MFA enrollment verified** (not assumed)
- [ ] Password manager issued and password reuse discussed in one sentence — this conversation is cheap now and impossible later
- [ ] Security basics in the first week: phishing reporting button, who to call, acceptable use in plain language (see [Social Engineering](/red-teaming/social-engineering) for what they will face)
- [ ] Equipment handover documented (serial numbers into the asset register)

The hidden cost of slow onboarding is shadow IT: a developer waiting four days for repo access will create a personal account in five minutes — and that unmanaged credential outlives the frustration. Speed and security are the same goal here.

## Mover: the transition everyone forgets

Role changes create privilege drift — the new responsibilities stack on top of the old ones. When an employee moves from support to engineering, they should _lose_ the support queues that same day; most organizations only ever add. The mover checklist:

- [ ] Old role's access groups removed (the identity platform's group model does this almost automatically — one more reason role-based access beats per-request grants)
- [ ] New role's access granted from the standard profile
- [ ] Shared/elevated credentials they held rotated (admin passwords, shared mailboxes, break-glass codes)
- [ ] Data ownership reassigned if they owned reports, dashboards, vendor accounts

Movers matter for attackers too: an account with a support-level past and an engineering present is exactly the standing privilege an insider incident is made of. Quarterly access reviews (manager confirms "this person still needs each of these") are the net that catches drift the process missed.

## Offboarding (leaver): the deadline that matters

The moment employment ends, every credential is a liability. The sequence is deliberate — **disable first, clean up after**:

**Effective at termination (same day, ideally automated from the HR system):**

- [ ] **Disable the account — do not delete.** Deletion destroys mailbox access for legal/compliance holds and breaks license-transfer workflows; disabling ends authentication instantly.
- [ ] **Revoke sessions and tokens** (identity platform "revoke sessions", VPN certificates, mobile device wipe/app-pin) — a disabled account with a live session token is still an open door until that token expires, and tokens can live for hours to days.
- [ ] **Reset passwords for anything shared** the person knew: admin service accounts, shared mailboxes delegated to them, vendor portals, Wi-Fi PSK if applicable, break-glass credentials if they were a custodian.
- [ ] **Remove MFA device enrollments** and API tokens/personal access tokens — tokens are credentials that rarely appear in offboarding checklists and almost never expire on their own.
- [ ] Redirect mailbox (manager or named successor), set out-of-office, document the delegation.

**Within the first days:**

- [ ] Remove from groups and license assignments (cost + hygiene)
- [ ] Asset return: laptop, phone, tokens, keys, access cards — matched against the asset register, not against memory
- [ ] Transfer data ownership; export what the team needs _while the account exists_, not after deletion
- [ ] Remove them from vendor/third-party systems — the SaaS apps with their own user lists (the ones outside SSO) are the classic offboarding leak

**The audit trail:** each step timestamped and tied to the HR termination date. Auditors sample leavers and compare "HR end date" against "last authentication" and "group removal" — gaps between those dates are findings, and worse, they are real windows. Automating offboarding from the HR system (identity lifecycle tooling, or at minimum a daily reconciliation) is the single highest-leverage fix in this whole lesson: manual checklists fail exactly when the organization is busy, and dismissals are never scheduled at convenient times.

## The edge cases worth knowing

- **Immediate-dismissal / hostile leaver.** Disable _before_ the meeting, not after — the standard playbook for termination-with-cause assumes access is already cut when HR walks in.
- **Garden leave and contractors.** Fixed-term access needs automatic expiry dates at grant time, not a human remembering to remove it.
- **Death or long illness.** Same revocation mechanics, handled with HR and with dignity — the account still needs locking.
- **The admin who knows everything.** Leaving administrators hold break-glass credentials and infrastructure secrets. Rotate every credential they could know, review recent privileged activity, and treat their domain-admin password as compromised on departure — because operationally, it is.

## Where to go next

- [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures) — the day-to-day identity operations this lifecycle feeds.
- [IAM Account Management](/general-security/iam-account-management) — the platform architecture behind role-based access.
- [Security Governance](/grc/security-governance) — where JML sits in policies and audits.
- [Common Helpdesk Tickets](/helpdesk-basics/common-helpdesk-tickets) — the daily ticket flow around these processes.
