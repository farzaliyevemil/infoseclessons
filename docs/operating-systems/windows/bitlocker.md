---
id: bitlocker
title: What is BitLocker?
description: >-
  Learn how BitLocker works, why TPM plus PIN matters, and how BitLocker differs from automatic device encryption.
slug: /bitlocker
---

# 🔐 What is BitLocker?

**BitLocker** is Microsoft's built-in disk encryption feature for Windows. Its main goal is to protect data **if a device is lost, stolen, or accessed offline**.

In other words, BitLocker helps protect the contents of a disk even if someone removes the drive or tries to boot the device outside the normal operating system flow.

---

## 🎯 What Problem Does BitLocker Solve?

BitLocker is designed to reduce risk from:

- Lost or stolen laptops
- Offline attacks against a powered-off device
- Attempts to read disks from another machine
- Certain tampering scenarios before Windows starts

---

## ⚙️ How BitLocker Works

BitLocker encrypts the drive and protects access to the decryption keys by using one or more protectors.

Common protectors include:

- **TPM only**
- **TPM + PIN**
- **Startup key on removable media**
- **Recovery key**

Microsoft's current guidance still treats **TPM-backed BitLocker** as the standard starting point, and **TPM + PIN** as a stronger option when you want extra protection at boot.

---

## 🔐 TPM vs TPM + PIN

| Mode | Security level | Notes |
| --- | --- | --- |
| **TPM only** | Good baseline | Most transparent for users |
| **TPM + PIN** | Stronger | Adds preboot user authentication |
| **Startup key** | Situational | Requires removable media handling |
| **Password without TPM** | Weaker | Generally discouraged compared with TPM-backed protection |

Why TPM + PIN matters:

- It adds **multifactor-style preboot protection**
- A stolen laptop is harder to boot even if the attacker has the device in hand
- It is useful for higher-risk users and privileged admin devices

---

## 💻 BitLocker vs Device Encryption

These terms are related, but not identical:

| Feature | Meaning |
| --- | --- |
| **BitLocker** | The underlying Windows disk encryption technology |
| **Device encryption** | A more automatic BitLocker experience on qualifying devices |

On supported hardware, **device encryption** can enable BitLocker automatically and back up recovery information to a Microsoft account, Active Directory, or Microsoft Entra ID depending on the join state and management model.

---

## ✅ Advantages

- Built into Windows
- Strong protection against offline data theft
- Works with TPM for hardware-backed protection
- Supports **BitLocker To Go** for removable drives
- Supports enterprise recovery and management workflows

---

## ⚠️ Important Limitations

- BitLocker does **not** stop an attacker who already has access to your unlocked session
- Weak recovery key handling can undermine the whole design
- TPM-only mode is convenient, but not the strongest option
- Some environments need careful planning around firmware updates, BIOS changes, and recovery workflows

---

## 🧾 Recovery Key Handling

Recovery planning is part of BitLocker, not an optional extra.

Recovery keys may be stored in:

- **Microsoft account**
- **Active Directory**
- **Microsoft Entra ID**
- **Printed or offline secure storage**

Good practice:

- Back up recovery keys before broad rollout
- Know who can retrieve them
- Test support workflows before a real incident

---

## 🛠️ Example Enablement

### GUI

1. Open **Manage BitLocker**
2. Turn on protection for the target drive
3. Save the recovery key securely
4. Choose encryption scope and start encryption

### PowerShell

```powershell
Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -TpmProtector
```

If you need stronger startup assurance, plan around **TPM + PIN** instead of relying only on TPM.

---

## 🧨 Common Mistakes

- Enabling BitLocker without a recovery key retrieval process
- Assuming encryption alone protects an unlocked laptop
- Forgetting firmware or boot changes can trigger recovery
- Using local-only recovery storage with no central process
- Treating device encryption and managed enterprise BitLocker as if they were operationally identical

---

## 🧠 Summary

BitLocker is one of the most valuable built-in security controls in Windows. For most organizations, the right baseline is:

- TPM-backed BitLocker everywhere possible
- Central recovery key backup
- TPM + PIN for higher-risk devices or privileged users

When handled well, BitLocker significantly improves endpoint data protection with relatively low operational cost.
