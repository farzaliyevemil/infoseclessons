---
id: laps
title: What is LAPS (Local Administrator Password Solution)?
description: Microsoft LAPS – Centralized and automated management of Local Administrator passwords.
sidebar_position: 2
---

## 🔐 What is LAPS (Local Administrator Password Solution)?

**LAPS** is a solution provided by Microsoft that **automatically changes the local administrator password** for every domain-joined Windows device and securely stores it in **Active Directory**.

Main objectives:
- Prevent the reuse of the same password.
- Automate password rotation.
- Enhance the security of local admin accounts.

---

## 🎯 Why Use LAPS?

Traditionally, organizations used the same local admin password across all computers. This approach:
- If one device is compromised, **all devices are at risk**.
- Makes **lateral movement** very easy for Red Teams.
- Is difficult to monitor and control for SOC & Blue Teams.

---

## 🛠️ How Does LAPS Work?

1. Configured via **Group Policy (GPO)**.
2. Each computer **automatically changes** its `Administrator` password at a defined interval (e.g., every 30 days).
3. The password is stored as an attribute in **Active Directory (AD)**.
4. Only specific users or groups can view the password.

---

## 🗂️ Data Stored in AD

LAPS stores the password in the `ms-Mcs-AdmPwd` attribute in Active Directory.  
Additional metadata, such as expiration time, is stored in the `ms-Mcs-AdmPwdExpirationTime` attribute.

---

## 🧾 Auditing & Monitoring

- Who accessed the password?
- When was the password last changed?
- Who has permission to view it?

All this information can be tracked. Integration with tools like Azure Sentinel, Sysmon, etc., is also possible.

---

## 🔐 Security and Best Practices

| Security Measure      | Recommendation |
|-----------------------|----------------|
| 🔍 RBAC Implementation | Strictly limit users and groups who can view the password. |
| 🔄 Rotation Interval   | Passwords should be automatically rotated at least every 30 days. |
| 🧾 Monitoring          | Every password access event should be logged. |
| 🔐 MFA + Tiering       | Additional protection measures should be applied for high-privileged admins. |

---

## 🆕 Windows LAPS (2023+)

- The **new generation of LAPS**, available with Windows Server 2022 and Windows 11, is now **built-in**.
- No need for additional agents.
- Easier management with the PowerShell module.

```powershell
Get-LapsADPassword -Identity PC-123
```

---

## 🧠 Conclusion

**LAPS** is one of the simplest and most effective solutions for endpoint security. If your organization uses local admin accounts, implementing LAPS is a must.