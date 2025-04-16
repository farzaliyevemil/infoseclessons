---
id: applocker
title: What is AppLocker?
description: How to control application execution using Windows AppLocker.
---

# 🧱 What is AppLocker?

**AppLocker** is an **application whitelisting** system in Windows that allows administrators to control which applications users are allowed to run.

---

## 🎯 Purpose

- Prevent the execution of malware and unauthorized programs.
- Ensure users only run approved software.
- Enhance endpoint security.

---

## 🔑 How It Works

AppLocker creates rules for the following application types:

- **EXE and DLL** files.
- **MSI and MSP** (installation packages).
- **Scripts** (.ps1, .bat, .cmd, .vbs, .js).
- **AppX** (Windows Store apps).

---

## 🛠️ Configuring AppLocker

### Using GUI:
1. Open `gpedit.msc` → *Computer Configuration* → *Windows Settings* → *Security Settings* → *Application Control Policies* → *AppLocker*.
2. Create or edit rules for each type (EXE, scripts, etc.).
3. Rules can be based on "Publisher", "Path", or "File Hash".

### Using PowerShell:
```powershell
# Retrieve existing rules
Get-AppLockerPolicy -Effective | ConvertFrom-XML

# Create a new path-based rule
New-AppLockerPolicy -Path "C:\example" -RuleType Path -User Everyone -RuleName "ExampleRule"
```

---

## ✅ Advantages

1. Fast and local whitelisting system.
2. Central management via Group Policy.
3. Improved endpoint protection.
4. Blocks unauthorized PowerShell scripts.

---

## ⚠️ Limitations

- Only available in **Enterprise** and **Education** editions.
- Rules may break if file hashes or paths change.
- Complex environments may require advanced rule management.

---

## 📌 Conclusion

AppLocker is a powerful tool to strengthen security and enforce endpoint control. It plays an important role in GRC (Governance, Risk, Compliance) and Blue Team operations.