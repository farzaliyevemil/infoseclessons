---
id: data-loss-prevention
title: Data Loss Prevention (DLP)
description: Learn how DLP finds sensitive data, monitors risky transfers and applies log, alert, block or quarantine actions.
slug: /general-security/data-loss-prevention
sidebar_position: 5
status: foundation
last_reviewed: 2026-09-20
keywords:
  - DLP
  - data loss prevention
  - endpoint DLP
  - network DLP
difficulty: foundation
tags:
  - data-security
  - security-controls
---

# Data Loss Prevention (DLP)

**DLP — Data Loss Prevention** is a set of policies and tools that identifies sensitive data and responds when someone tries to move it to an inappropriate place. Its practical question is: **“What data is leaving, through which channel, and should that transfer be allowed?”** DLP primarily supports [confidentiality](./cia-triad.md), but an organisation needs access control, training and monitoring alongside it.

## How a DLP rule works

1. **Identify the data:** a classification label, document fingerprint, exact match or pattern indicates sensitivity. A 16-digit sequence alone is weak evidence of a payment-card number; validation and context reduce false positives.
2. **Observe a channel:** email, web upload, cloud sharing, USB copy, print or clipboard, depending on the product and where it is installed.
3. **Apply context:** who is sending, to whom, from which device, in what quantity, and under which policy?
4. **Respond:** log, warn, block or quarantine. An authorised exception should have an owner and an audit trail.

## Where the control runs

| Type | What it can observe | Typical blind spot |
|---|---|---|
| **Endpoint DLP** | Activity on a managed device, such as USB copying or supported app uploads | Unmanaged or offline devices; channels the agent does not cover |
| **Network DLP** | Traffic passing through an inspected gateway or proxy | Encrypted traffic the gateway cannot inspect; traffic that bypasses it |
| **Cloud/SaaS DLP** | Data and sharing actions within a connected cloud service | Other services or personal accounts outside the integration |

No type sees everything. Select the channel based on where the sensitive data actually moves.

## Common actions

| Action | Result | Useful when |
|---|---|---|
| **Log** | Record the event without interrupting the user | Tuning a new rule and learning normal activity |
| **Warn / alert** | Ask the user to reconsider and notify the team | Accidental sharing is likely; a justified override is possible |
| **Block** | Refuse the transfer | High-confidence, high-impact exposure |
| **Quarantine** | Hold the file or message for review | A decision by a data owner or security reviewer is needed |

### Worked example

An employee attaches a spreadsheet of customer payment data to an email addressed to a personal mailbox. A DLP rule identifies the data, checks that the destination is outside the approved organisation and blocks the message. The user sees a clear explanation and an approved route for sharing the data. The security team receives enough metadata to review the event without copying the entire sensitive spreadsheet into a ticket.

The rule reduces accidental disclosure. It does **not** correct an overly broad file permission that let the employee read the spreadsheet in the first place. That requires [identity and access management](./iam-account-management.md). A person can also photograph a screen, so DLP is one layer of protection, not a guarantee.

## Exam Focus / Remember

- **Discovery** identifies sensitive data; **enforcement** acts on an attempted transfer.
- Endpoint, network and cloud DLP observe different places and have different blind spots.
- **Log, warn, block and quarantine** are different policy outcomes.
- DLP helps protect **confidentiality**. It does not replace access permissions or [data minimisation](./data-protection-basics.md).

## Quick quiz

1. Which DLP type is best placed to see a USB copy on a managed laptop?
2. Why can a network gateway miss an upload from a remote worker?
3. Does blocking an email fix a shared folder that grants excessive read access?

**Answers:** 1. Endpoint DLP. 2. The traffic may bypass the gateway or remain uninspectable. 3. No; fix the folder permissions separately.

## Related lessons

Read [security control categories and types](../grc/security-controls.md) for how DLP fits into a wider control programme and [data states and minimisation](./data-protection-basics.md) for reducing the amount of sensitive data exposed. This lesson is original explanatory material adapted from the site's former CIA article; it is not a separate CEH Module 01 topic.
