---
id: cia-triad
title: CIA and DAD Triads, Authenticity and Non-repudiation
description: Learn the CIA and DAD triads, authenticity and non-repudiation through clear definitions, examples and a short CEH exam quiz.
slug: /general-security/cia-triad
sidebar_position: 3
status: foundation
last_reviewed: 2026-09-20
keywords:
  - cia triad
  - dad triad
  - confidentiality
  - integrity
  - availability
  - authenticity
  - non-repudiation
difficulty: foundation
tags:
  - security-basics
  - beginner
  - ceh
---

# CIA and DAD Triads, Authenticity and Non-repudiation

Information security protects information and the systems that store, process and transmit it. **CIA** names three basic objectives: **Confidentiality, Integrity and Availability**. CEH v13 Module 01 discusses two additional properties, **Authenticity** and **Non-repudiation**. These five properties help you describe precisely *what* an incident harmed.

## The CIA triad

| English term | Plain meaning | Violation | Typical protection |
|---|---|---|---|
| **Confidentiality** | Only authorised people can see the information. | A student reads another student's grades. | Access permissions and encryption. |
| **Integrity** | Information remains correct and is not changed without authorisation. | Someone changes a grade from 60 to 90. | Restricted write access, change logs and integrity checks. |
| **Availability** | Authorised people can use the information or service when needed. | The grades portal is unavailable during registration. | Redundancy, monitoring and tested recovery. |

### Confidentiality: who can read it?

Confidentiality is lost when information reaches someone who should not see it. The person need not change or delete anything. A misaddressed email and an attacker reading a private database are both confidentiality problems. Classification tells us which data is sensitive; permissions and encryption help restrict access.

### Integrity: is it still correct?

Integrity is lost when information is altered or corrupted without proper authorisation. The cause may be an attacker, a faulty program or a human error. For example, a student's grade accidentally overwritten by an import script has an integrity problem even if nobody intended harm. Hashes and checksums can reveal changes; access control and audit records help prevent or investigate them. A hash alone does not identify who made a change.

### Availability: can the authorised user reach it?

Availability is lost when a service or its data cannot be used when needed. A DDoS attack, broken disk or power failure can each cause an outage. Backups support recovery, while redundancy and monitoring help keep a service usable. Having a backup is not enough unless restoration has been tested.

**One event can affect more than one pillar.** Ransomware can alter or encrypt data and make it unavailable. If the attacker also copies the data, confidentiality is affected too. CIA classifies the result, not the attacker's motive.

## DAD triad: what happens when CIA fails?

**DAD** names three unwanted outcomes: **Disclosure, Alteration and Denial**. It is a memory aid for the opposite side of CIA, not another set of security goals.

| CIA property to protect | DAD outcome | Simple example |
|---|---|---|
| **Confidentiality** | **Disclosure** — information reaches an unauthorised person. | Someone reads a private grade report. |
| **Integrity** | **Alteration** — information is changed or corrupted without proper authorisation. | A grade changes from 60 to 90. |
| **Availability** | **Denial** — an authorised user cannot use the information or service. | The grades portal is unreachable. |

**Remember the direction:** CIA describes what defenders want to preserve; DAD describes the harmful result. An accident can also cause disclosure, alteration or denial. “Denial” here means loss of access; it is different from **non-repudiation**, which concerns evidence that an action occurred.

## Two additional properties in CEH

### Authenticity: is the claimed source genuine?

**Authenticity** concerns whether a person, message or document really comes from the claimed source. A student should be able to check that an electronic transcript genuinely came from the university. **Authentication** is the *process* used to check an identity or source, such as a login challenge or verification of a digital certificate. Do not confuse the property with the process.

### Non-repudiation: can the action later be denied?

**Non-repudiation** means there is reliable evidence connecting a participant to an action that they might later deny. A properly verified digital signature can link an authorised officer to the exact transcript they signed. The strength of that evidence depends on trustworthy identity checks, exclusive control of the signing key and protected records. A sender's signature alone does not prove that the recipient received or read the document; receipt needs separate evidence. The related [AAA and Non-Repudiation](./aaa-non-repudiation.md) lesson explains the supporting mechanisms.

## One example, five questions

A university issues an electronic transcript through a student portal:

1. **Confidentiality:** can only the student and authorised staff view it?
2. **Integrity:** are the grades unchanged after approval?
3. **Availability:** can the student retrieve it when required?
4. **Authenticity:** can the student verify that the university issued it?
5. **Non-repudiation:** is there reliable evidence of who signed or approved it?

These questions examine different properties of the *same* document. A valid signature does not replace access control or service availability.

## Exam Focus / Remember

- **CIA = Confidentiality + Integrity + Availability.** Authenticity and non-repudiation are additional properties in the CEH source, not extra letters in CIA.
- Unauthorised **reading** → confidentiality; unauthorised **change** → integrity; **outage** → availability.
- **DAD = Disclosure + Alteration + Denial:** the corresponding harmful outcomes for C, I and A.
- **Authenticity** asks whether the source is genuine; **authentication** is the process of checking it.
- **Non-repudiation** concerns evidence of an action. It does not automatically prove that a message was read or received.

## Quick quiz

1. A user views a private file but does not edit it. Which CIA property is affected?
2. An import script accidentally changes a payment amount. Which property is affected?
3. A signed document arrives, but its sender cannot prove delivery. Does the signature by itself prove receipt?
4. What is the difference between authenticity and authentication?
5. Which DAD term describes a service outage?

**Answers:** 1. Confidentiality. 2. Integrity. 3. No. 4. Authenticity is a property; authentication is the checking process. 5. Denial.
