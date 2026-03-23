---
id: fsmo
title: FSMO Roles in Active Directory
description: Learn what the five FSMO roles do, how to check them, and when to transfer or seize them safely.
sidebar_position: 1
slug: /fsmo
---

# FSMO Roles in Active Directory

Flexible Single Master Operations (FSMO) are specialized domain controller tasks in an Active Directory (AD) environment. While AD is a multi-master system (meaning any domain controller can make changes), certain operations must be handled by a single domain controller to avoid conflicts — these roles are known as FSMO roles.

![FSMO Overview](/img/servers/fsmo-overview.svg)

---

## 🔹 Types of FSMO Roles

There are **five** FSMO roles, divided into two categories:

### 🔸 Forest-wide Roles (Only One per Forest):

1. **Schema Master**
   - Controls changes to the AD schema (structure of objects).
   - Required when adding attributes/classes (e.g., during Exchange or Lync setup).

2. **Domain Naming Master**
   - Handles changes to the forest namespace (e.g., adding/removing domains).
   - Ensures domain names are unique.

### 🔸 Domain-wide Roles (One per Domain):

3. **RID Master** (Relative Identifier Master)
   - Allocates pools of RIDs to domain controllers.
   - Ensures each object (user, computer, etc.) has a unique Security Identifier (SID).

4. **PDC Emulator** (Primary Domain Controller Emulator)
   - Provides backward compatibility with NT4.
   - Handles password changes, account lockouts, Group Policy updates.
   - Acts as time source for domain controllers.

5. **Infrastructure Master**
   - Updates references between objects in different domains (e.g., when a user from domain A is added to a group in domain B).

---

## 📌 How to Check FSMO Role Holders

Use the following command in PowerShell or Command Prompt:
```bash
netdom query fsmo
```

---

## 🔄 Transfer vs Seize

These two terms are not the same:

| Action | When to use it | Risk level |
| --- | --- | --- |
| **Transfer** | The current role holder is online and healthy enough to hand off the role gracefully | Lower |
| **Seize** | The current role holder is gone, unrecoverable, or should never return to the domain | Higher |

Microsoft's current guidance still treats **transfer** as the preferred option whenever possible, because it synchronizes role data before the handoff. **Seize** is a recovery action for failed or permanently lost domain controllers.

> If you seize a role from a failed domain controller, that original server should generally not be brought back into the environment as if nothing happened.

---

## ⚙️ Best Practices

- Place **Schema Master** and **Domain Naming Master** on separate domain controllers (usually the root domain).
- Place **PDC Emulator** on the best-performing DC (lowest latency, best hardware).
- **RID Master** and **Infrastructure Master** can be on the same or separate DCs.
- **Do not place Infrastructure Master on a Global Catalog server** unless all DCs are GCs.

---

## 🧠 Why FSMO Role Placement Matters

Improper placement can lead to:
- Authentication delays
- Inconsistent password replication
- SID duplication or group reference failures

---

## 🚨 Which Role Usually Hurts the Most?

In many real environments, the **PDC Emulator** is the role users notice first when something is wrong because it is involved in:

- Password changes
- Account lockout behavior
- Time synchronization
- Group Policy related activity

That does not make the other roles unimportant, but it explains why PDC issues often become visible quickly.

---

## 🛠️ Moving FSMO Roles

FSMO roles can be transferred via:
- **GUI** (AD Users & Computers, Schema Console, etc.)
- **Command Line** using `ntdsutil`
- **PowerShell**:
```powershell
Move-ADDirectoryServerOperationMasterRole -Identity "DCName" -OperationMasterRole SchemaMaster,RIDMaster,PDCEmulator,InfrastructureMaster,DomainNamingMaster
```

---

## ✅ Practical Rule of Thumb

- Use **transfer** during planned maintenance, migrations, and DC refresh work
- Use **seize** only when the old role holder is effectively dead to the environment
- Document role owners before and after changes
- Verify replication health after the move

---

FSMO roles are foundational to the health of any Active Directory infrastructure. Understanding what each role does, and knowing when to **transfer** versus **seize**, is critical for stable domain operations.
