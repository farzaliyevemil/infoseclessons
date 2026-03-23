---
id: laps
title: Microsoft LAPS Explained
description: >-
  Understand Windows LAPS, legacy Microsoft LAPS, password backup options,
  rotation, and operational best practices.
sidebar_position: 2
slug: /laps
---

# 🔐 Microsoft LAPS Explained

**LAPS** stands for **Local Administrator Password Solution**. Its job is simple: each Windows device gets its **own unique local administrator password**, and that password is **rotated automatically** on a schedule.

That solves one of the most common workstation security problems: the same local admin password being reused across many devices.

---

## 🎯 Why Use LAPS?

Without LAPS, many organizations end up with one of these bad patterns:

- The same local admin password on every workstation
- A manually managed spreadsheet of passwords
- Local admin accounts that never rotate

These patterns make **lateral movement** much easier after a single device compromise.

---

## 🧠 Legacy Microsoft LAPS vs Windows LAPS

There are two versions you should know:

| Version | Status | Notes |
| --- | --- | --- |
| **Legacy Microsoft LAPS** | Older | Uses the classic `ms-Mcs-AdmPwd` approach in AD |
| **Windows LAPS** | Current | Built into modern Windows and Windows Server |

**Windows LAPS** is the version you should prefer for new deployments.

Why it is better:

- Built into supported Windows versions
- Can back up passwords to **Windows Server Active Directory** or **Microsoft Entra ID**
- Supports newer management cmdlets such as `Get-LapsADPassword`, `Get-LapsAADPassword`, and `Reset-LapsPassword`
- Supports stronger security features such as password encryption in AD and password history in modern deployments

> Based on current Microsoft Learn guidance, Windows LAPS is the strategic direction, while legacy Microsoft LAPS is mainly relevant for migration or compatibility scenarios.

---

## 🛠️ How Windows LAPS Works

1. Configured via **Group Policy (GPO)**.
2. A managed local administrator account is selected.
3. The device generates a random password or passphrase.
4. That secret is backed up to **Active Directory** or **Microsoft Entra ID**.
5. The password rotates automatically based on policy.
6. Administrators retrieve the password only when needed.

![LAPS Flow](/img/servers/laps-flow.svg)

---

## 🗂️ Where Can the Password Be Backed Up?

### Windows Server Active Directory

Useful for traditional on-premises environments.

Common advantages:

- Familiar for domain admins
- Works well with classic GPO-driven management
- Can be integrated with delegated permissions and auditing

### Microsoft Entra ID

Useful for cloud-managed and modern device fleets.

Common advantages:

- Good fit for Intune / Entra-managed devices
- Easier for modern support workflows
- No dependency on on-prem AD for retrieval

---

## 🔎 Important Schema Note

If you are working with **legacy Microsoft LAPS**, you will still see classic attributes such as:

- `ms-Mcs-AdmPwd`
- `ms-Mcs-AdmPwdExpirationTime`

If you are working with **Windows LAPS natively**, you should not assume those legacy attributes are the main design forever. Windows LAPS uses a newer model and newer cmdlets, especially when using modern AD schema extensions and Entra-backed scenarios.

---

## 🧾 Auditing & Monitoring

You should be able to answer these questions at any time:

- Who can read the password?
- Who actually read the password?
- When was it last rotated?
- Was it reset outside the normal schedule?

This is why LAPS should be treated as both a **security control** and an **audit control**.

---

## 🔐 Best Practices

| Security Measure      | Recommendation |
|-----------------------|----------------|
| 🔍 Least privilege | Only specific support/admin groups should be allowed to read or reset passwords |
| 🔄 Rotation | Rotate regularly and force immediate rotation after sensitive support work |
| 🧾 Auditing | Audit read access and reset activity |
| 🔐 Tiering | Use separate admin accounts and MFA for privileged operations |
| 🧹 Scope control | Do not deploy local admin rights more broadly than needed |
| 📋 Break-glass planning | Define who can retrieve passwords during outages or recovery events |

---

## 🧰 Useful PowerShell Examples

```powershell
# Read a password from Active Directory
Get-LapsADPassword -Identity PC-123

# Read a password from Microsoft Entra ID
Get-LapsAADPassword -DeviceIds <device-id>

# Force an immediate password rotation
Reset-LapsPassword
```

> Exact operational flow depends on whether the device backs up to AD or Entra ID.

---

## 🧨 Common Mistakes

- Leaving many technicians with permanent read access
- Treating LAPS as a replacement for privilege management
- Migrating to Windows LAPS but still documenting only legacy cmdlets
- Forgetting to audit who can reset expiration or read passwords
- Using local admin accounts widely and assuming LAPS alone solves that risk

---

## 🆕 Windows LAPS Notes for Newer Releases

Microsoft's current documentation also notes newer capabilities such as:

- Native Windows LAPS management cmdlets
- Entra ID backup support
- AD password encryption and history features in modern deployments
- Passphrase support in newer Windows releases

These features are another reason to plan around **Windows LAPS**, not legacy Microsoft LAPS, for new environments.

---

## 🧠 Conclusion

If your organization still uses local administrator accounts, **LAPS is essential**. It reduces password reuse, limits lateral movement, improves auditability, and gives support teams a safer way to perform privileged local work.
