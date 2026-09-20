---
id: data-protection-basics
title: Data States, Minimisation and De-identification
description: Understand data at rest, in transit and in use, and reduce exposure with minimisation, masking and tokenisation.
slug: /general-security/data-protection-basics
sidebar_position: 6
status: foundation
last_reviewed: 2026-09-20
keywords:
  - data at rest
  - data in transit
  - data in use
  - data minimisation
  - tokenisation
difficulty: foundation
tags:
  - data-security
  - privacy
---

# Data States, Minimisation and De-identification

The [CIA triad](./cia-triad.md) names the properties to protect. This lesson asks **where sensitive data exists** and **how much needs to exist at all**. A dataset can have several copies in different states at the same time; classify each copy and each transfer rather than claiming the whole dataset has only one state.

## Three data states

| English term | What it means | Example | Suitable protections |
|---|---|---|---|
| **At rest** | Stored rather than actively moving or being processed | A database file or backup | Access permissions, storage encryption, secure backup |
| **In transit** | Moving between systems | A student downloads a transcript over the network | TLS, secure transfer protocols, endpoint verification |
| **In use** | Being processed or displayed | The transcript is open in a browser or loaded into memory | Session controls, least privilege, device protection |

**Worked example:** a transcript rests in the university database, travels to the student's browser through a protected connection, and is displayed on the student's device. A stored copy may still exist while another copy is in transit and a third is in use. Storage encryption does not protect an unlocked browser session; TLS does not control who may open the stored database.

## Collect and keep less

**Data minimisation** means collecting only what a stated purpose requires and retaining it only as long as justified. It reduces the amount an attacker could expose and the effort needed to protect it.

1. **Collect less:** do not request date of birth if student enrolment does not need it.
2. **Limit access:** give each role only the fields required for its work.
3. **Retain deliberately:** set a documented retention period based on business and legal needs.
4. **Dispose safely:** verify that production copies, exports and backups follow the disposal policy. Deleting a file entry alone may not remove recoverable data from every medium.

## Make retained data less revealing

| Method | Basic idea | Example | Important limit |
|---|---|---|---|
| **Masking** | Hide part of a value in a view | Show only the last four card digits | The original value may still exist in storage. |
| **Tokenisation** | Replace the value with a token and keep the mapping separately | Payment app stores a token instead of a card number | The token vault and access to it still need protection. |
| **Pseudonymisation** | Replace direct identifiers while keeping a controlled re-linking method | Use a study ID instead of a student name | Data may remain personal data if re-identification is possible. |
| **Anonymisation** | Process data so individuals are no longer reasonably identifiable | Publish suitably aggregated statistics | Poorly designed releases may permit re-identification. |

**Hashing is not anonymisation by default.** A predictable identifier such as an email address can often be guessed and matched against a plain hash. The right method depends on what the recipient must still be able to do with the data.

## Exam Focus / Remember

- **At rest / in transit / in use** describe a copy or operation, not an exclusive permanent label for an entire dataset.
- Protect each state at its own boundary; one encryption setting does not cover all uses.
- **Minimisation** reduces collection and retention. **Masking** changes a view; **tokenisation** replaces a value using a protected mapping.
- [DLP](./data-loss-prevention.md) monitors risky movement of data; it does not replace minimisation or access control.

## Quick quiz

1. A report is stored on a server and open in a browser. Can copies exist in two states at once?
2. Does masking the first twelve card digits remove the original value from the database?
3. Is an ordinary hash of an email address automatically anonymous?

**Answers:** 1. Yes. 2. No. 3. No.

## Related lessons

For encryption and hashing, see [Cryptography Basics](./cryptography/cryptography-basics.md). For privacy obligations and retention decisions, see [Risk Management and Privacy](../grc/risk-and-privacy.md). This is original explanatory material adapted from the site's former CIA article.
