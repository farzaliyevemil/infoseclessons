---
id: account-and-password-procedures
title: Account and Password Procedures
description: The helpdesk procedures that protect identity — verifying who is on the phone before touching anything, password resets, account lockouts, MFA re-enrollment, and the social-engineering attacks that target the helpdesk specifically.
slug: /helpdesk-basics/account-and-password-procedures
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: helpdesk-basics
keywords:
  - password reset
  - account lockout
  - mfa
  - identity verification
  - social engineering
  - vishing
difficulty: foundation

tags:
  - helpdesk
  - beginner
---

# Account and Password Procedures

The helpdesk holds the keys to everything: the ability to reset a password, re-enroll MFA, or unlock an account is the ability to become that person. That is why attackers stopped brute-forcing logins years ago and started **calling the helpdesk instead**. A friendly voice, a plausible story, a busy analyst — and a $0 attack bypasses every control the security team built. This lesson is the procedure layer that keeps the helpdesk helpful to staff and hostile to everyone else.

## The golden rule: verify the human, not the story

**Nothing identity-related is done without verifying who you are actually talking to.** Not for executives, not for "the CEO is waiting", not for the nice person who knows everyone's names. Verification is the whole control.

A standard verification ladder (match depth to the sensitivity of the action):

1. **In-person** — staff ID card. Simple and strong.
2. **Callback to the number on record** — never a number the caller offers. Call the person's listed extension or ask them to call the service desk back on the official number.
3. **Manager confirmation** — the caller's line manager confirms from their own verified channel, _in addition to_ one of the above.
4. **Identity platform evidence** — an MFA push to an enrolled device for low-risk self-service actions.

What is **never** sufficient on its own: employee name, employee number, department, job title, their manager's name, recent ticket numbers, or the caller's frustration level. All of that is on LinkedIn, in phishing emails, and guessable. A caller who _becomes aggressive when asked to verify_ is not a red flag — that is the lesson working exactly as designed. Stay polite, stay firm, offer the official callback path.

The famous pattern to internalize: attackers impersonate a C-level to a junior analyst with "I'm in a board meeting, my password expired, reset it NOW". The correct answer costs nothing — _"Absolutely, I can help. Let me call you back on the number I have for you."_ An imposter hangs up; a real executive respects it.

## Password resets

The routine procedure, with the security logic attached:

1. **Verify identity** per the ladder above.
2. **Reset, never reveal.** Issue a fresh temporary password; _never_ read out, hint at, or "confirm" an existing password. If a caller asks "just tell me my current one", the answer is always no — you cannot know it anyway (hashes only), and revealing would prove you handle plaintext.
3. **Force change at first logon.** A temporary password that survives a week is a permanent one.
4. **Revoke active sessions** where the platform allows it — otherwise a token stolen before the reset outlives the reset.
5. **Document** the ticket: who requested, how verified, what changed, when.

Password policy context belongs to the identity team (length over complexity, no forced rotation unless compromise is suspected — see [IAM Account Management](/general-security/iam-account-management)), but the helpdesk enforces its human edge: **no exceptions, no "temporary shared" passwords, no writing it on the ticket as plain text.**

## Account lockouts

Lockouts are usually boring and occasionally camouflage:

| Cause                                                     | Signature                                                | First response                                                                             |
| --------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| User changed password; an old one is cached               | Failures from _one_ device, right after a reset          | Clear cached credentials (Windows Credential Manager, keychain), locked-out apps on phones |
| Scheduled task / mapped drive / service with old password | Failures every N minutes from one source, even at 3 a.m. | Find the task or service account and update it                                             |
| Genuine typo storms                                       | Burst, then silence                                      | Unlock, wait                                                                               |
| **Someone is guessing**                                   | Many failures across many accounts or from external IPs  | Do **not** just unlock — check source IPs, escalate per policy, consider disabling instead |

The unlock reflex is the trap: repeatedly unlocking an account while something out there keeps guessing is helpdesk-assisted brute force. Look at the _pattern_ before clicking unlock — a lockout with failures from three countries is not a ticket, it is an incident in progress.

## MFA re-enrollment: the highest-risk routine request

Re-enrolling MFA means **minting a new factor of trust for an account** — for an attacker who talked their way past verification, it is the master key. Procedure:

1. Verify identity at the **highest** rung of the ladder — for MFA, callback plus manager confirmation is the sane minimum, because MFA is precisely what the attacker wants to replace.
2. Revoke all existing factors and active sessions first — an attacker's enrolled device must not survive alongside the new one.
3. Re-enroll with the user **on camera or on a verified callback**, never through a third party "helping them set it up".
4. Check the account's recent activity for signs the compromise already happened (impossible sign-ins, new inbox rules — inbox rules are the classic follow-up after MFA takeover).
5. Document who verified, via what channel, and when.

## Shared accounts and the word "no"

Shared logins are where accountability dies: every action becomes unattributable, offboarding breaks, and one password change breaks everyone's work. The helpdesk answer is to route the _need_, not the workaround: "you need shared access to this mailbox" is a legitimate request — solved with a shared mailbox, group permissions, or a proper service account owned by an identifiable team (see [IAM Account Management](/general-security/iam-account-management)). Saying yes to shared _personal_ accounts feels helpful today and creates an audit finding tomorrow.

## The social-engineering lens

Expect these, and rehearse the responses:

- **Vishing** ("IT here, we're fixing your account, read me the code on your screen") — IT never needs your password or your MFA code. Anyone asking for the code is the attack.
- **Impersonating a colleague** using details from the website, LinkedIn, or an email signature. Verification by story always fails; verification by callback always works.
- **Urgency and authority pressure.** Both are the attacker's clock management. The callback takes ninety seconds and defeats both.
- **Pretext tickets** — a real-sounding ticket crafted to make an analyst reset a specific account. Ticket queues are attacker-recon territory; this is why procedures bind the _action_, not the story.

Every refusal that follows procedure is a save. The helpdesk that verifies calmly and documents everything is, functionally, the organization's second MFA factor.

## Where to go next

- [Common Helpdesk Tickets](/helpdesk-basics/common-helpdesk-tickets) — the wider ticket landscape.
- [Onboarding and Offboarding](/helpdesk-basics/onboarding-offboarding) — identity lifecycle beyond day-to-day requests.
- [Social Engineering](/red-teaming/social-engineering) — the attacker's side of this phone call.
- [IAM Account Management](/general-security/iam-account-management) — the platform layer beneath these procedures.
