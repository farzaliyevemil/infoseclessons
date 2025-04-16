---
id: bitlocker
title: What is BitLocker?
description: An introduction to BitLocker technology for disk encryption in Windows systems.
---

# 🔐 What is BitLocker?

**BitLocker** is a disk encryption technology provided by Windows. Its purpose is to ensure the protection of data. Even if the system is not booted, the data remains secure.

---

## 🎯 Main Purpose

- Prevent unauthorized access to the disk in case of physical theft or device loss.
- Protect against offline attacks.

---

## ⚙️ How It Works

- **Full Disk Encryption**: Encrypts all data on the disk.
- **Integration with TPM (Trusted Platform Module)**: Uses TPM to securely store encryption keys.
- **Recovery Key for Restoration**: Allows recovery of encrypted disks using a Recovery Key.

---

## ✅ Advantages

- Simple management (via GUI and PowerShell).
- Full disk encryption.
- **BitLocker To Go**: Encryption support for USB devices.
- Enhanced security with TPM support.

---

## ⚠️ Limitations

- Not available in the **Home Edition** version.
- Configuration can be challenging on systems without TPM.
- Slight performance impact may be observed.

---

## 🛠️ Activation

### Using GUI:
1. Search for **"Manage BitLocker"**.
2. Select the desired disk and activate it.
3. Choose a method to save the **Recovery Key** (Microsoft account, USB, or print).
4. Select the encryption type and start the process.

### Using PowerShell:
```powershell
Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -TpmProtector
```

---

## 🧾 Where is the Recovery Key Stored?

- **Microsoft Account**: The Recovery Key is automatically uploaded to your account.
- **Active Directory**: Can be stored in network environments.
- **Azure AD**: For cloud-based management.
- **USB or Print**: For physical storage.

---

## 🧠 Summary

**BitLocker** is an effective security tool for both personal and corporate users. Offline disk encryption provides a primary level of protection against attacks. When configured correctly, it is an indispensable tool for enhancing data security.