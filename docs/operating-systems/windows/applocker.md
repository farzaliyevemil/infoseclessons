---
id: applocker
title: What is AppLocker?
description: Learn how AppLocker works, when to use audit mode, and how publisher, path, and hash rules differ.
slug: /operating-systems/windows/applocker
---

# 🧱 What is AppLocker?

**AppLocker** is a Windows application control feature that lets administrators define **which apps are allowed to run**. In practice, it is one of the more approachable allowlisting tools for managed Windows environments.

---

## 🎯 Why Use It?

AppLocker helps reduce risk from:

- Unauthorized tools
- Malicious scripts
- Unsanctioned installers
- Users launching software from risky paths such as temp folders or profile directories

It is especially useful for:

- Workstations
- Shared kiosks or lab machines
- Server admin jump hosts
- Environments that need stronger software control but are not ready for a more advanced application control program

---

## 🔑 What Can AppLocker Control?

AppLocker supports rule collections for:

- **Executables** (`.exe`, `.com`)
- **Windows Installer** files (`.msi`, `.msp`, `.mst`)
- **Scripts** (`.ps1`, `.bat`, `.cmd`, `.vbs`, `.js`)
- **Packaged apps** and packaged app installers
- **DLLs** if you explicitly choose to manage them

> DLL rules add more control, but they also add more complexity and overhead because every DLL load must be evaluated.

---

## 🧭 Start with Audit Mode, Not Enforcement

One of the most important AppLocker practices is to begin with **Audit only** mode.

Why:

- You can see what would be blocked before users are impacted
- You can discover business-critical apps you forgot to allow
- You can tune policy based on real usage instead of guesswork

This is consistent with Microsoft's guidance around AppLocker planning and rule rollout.

---

## 🧩 Rule Condition Types

AppLocker has three primary rule condition types:

| Rule type | Best use | Tradeoff |
| --- | --- | --- |
| **Publisher** | Signed software from known vendors | Most maintainable in many environments |
| **Path** | Fixed trusted directories such as `Program Files` or `Windows` | Easy to manage, but risky if users can write there |
| **File Hash** | Specific files that are unsigned or one-off exceptions | Precise, but high maintenance after updates |

### Practical guidance

- Prefer **Publisher** rules for mainstream signed software
- Use **Path** rules carefully and only for trusted locations
- Use **File Hash** for exceptions, not as your primary strategy

---

## 🛠️ Basic Workflow

1. Create default allow rules first
2. Turn on **Audit only**
3. Review AppLocker event logs
4. Add missing allow rules for legitimate apps
5. Move to **Enforce rules**

Example path:

`gpedit.msc` -> `Computer Configuration` -> `Windows Settings` -> `Security Settings` -> `Application Control Policies` -> `AppLocker`

---

## 🧰 PowerShell Examples

```powershell
# View the effective policy
Get-AppLockerPolicy -Effective | Select-Object -ExpandProperty RuleCollections

# Generate a starter policy from a reference path
New-AppLockerPolicy -Path "C:\Program Files" -RuleType Publisher,Hash,Path -User Everyone

# Export policy as XML
Get-AppLockerPolicy -Local | Set-Content .\AppLockerPolicy.xml
```

---

## ⚖️ AppLocker vs WDAC

AppLocker is a practical and useful control, but it is not the strongest application control option in the Windows ecosystem.

In simple terms:

- **AppLocker** is easier to understand and deploy
- **WDAC / App Control for Business** is stronger and deeper, especially for higher-security environments

If you need a realistic starting point, AppLocker is often easier. If you need the strongest enterprise-grade control model, WDAC is usually the longer-term direction.

---

## ⚠️ Common Mistakes

- Enforcing rules immediately without audit data
- Overusing path rules in writable locations
- Forgetting scripts when locking down PowerShell-heavy environments
- Turning on DLL rules without understanding the operational impact
- Treating AppLocker as a full substitute for EDR, patching, or privilege management

---

## ✅ Where AppLocker Fits Best

AppLocker is strongest as part of a layered design:

- Standard users by default
- Local admin restrictions
- AppLocker or WDAC
- EDR / Defender
- Logging and alerting

---

## 📌 Conclusion

AppLocker is a strong **defense-in-depth** control for Windows. If you deploy it carefully, start in **Audit only**, and build around maintainable rules, it can significantly reduce unauthorized software execution.
