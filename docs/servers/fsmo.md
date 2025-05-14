#️⃣ FSMO Roles (Flexible Single Master Operations)

Flexible Single Master Operations (FSMO) are specialized domain controller tasks in an Active Directory (AD) environment. While AD is a multi-master system (meaning any domain controller can make changes), certain operations must be handled by a single domain controller to avoid conflicts — these roles are known as FSMO roles.

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

## 🛠️ Transferring FSMO Roles

FSMO roles can be transferred via:
- **GUI** (AD Users & Computers, Schema Console, etc.)
- **Command Line** using `ntdsutil`
- **PowerShell**:
```powershell
Move-ADDirectoryServerOperationMasterRole -Identity "DCName" -OperationMasterRole SchemaMaster,RIDMaster,...
```

---

FSMO roles are foundational to the health of any Active Directory infrastructure. Understanding them ensures stability, scalability, and consistency across the domain and forest.
