---
id: disable-windows-services
title: Disabling Unnecessary Windows Services
description: >-
  Learn how to improve performance and security by disabling unused Windows
  services.
slug: /services
---

# 🔒 Disable Unnecessary Windows Services (Security & Performance)

The following services may pose **security risks** or **negatively impact system performance** if not required. It is recommended to set them to **Manual** or **Disabled** based on your usage needs.

| Service | Recommendation | Reason |
|--------|----------------|--------|
| **Computer Browser** | 🔴 Disable | Used for old NetBIOS network discovery, can pose security risks. |
| **Diagnostic Policy Service** | 🟡 Manual | Diagnoses system issues automatically. If unnecessary, Manual is sufficient. |
| **Distributed Link Tracking Client** | 🔴 Disable | Tracks shared NTFS files. Disable if not part of a domain. |
| **IP Helper** | 🟡 Manual | Used for IPv6 tunnels. Not needed for most users. |
| **Offline Files** | 🔴 Disable | Manages offline file synchronization. Disable if not joined to a domain. |
| **Program Compatibility Assistant** | 🟡 Manual | Assists with older software. Unnecessary for modern applications. |
| **Portable Device Enumerator** | 🟡 Manual | Used for MTP devices. Can be set to Manual if rarely used. |
| **Print Spooler** | 🔴 Disable | Disable completely if no printer is used. Often exploited in CVEs. |
| **Remote Registry** | 🔴 Disable | Allows registry changes over network. Security risk. |
| **Secondary Logon** | 🟡 Manual | Required for “Run as” feature. Set to Manual if rarely used. |
| **Security Center** | 🟠 Leave Enabled | Provides security alerts. Not recommended to disable. |
| **Server** | 🟡 Manual | Used for file and printer sharing. Can be disabled for local-only systems. |
| **TCP/IP NetBIOS Helper** | 🔴 Disable | Supports NetBIOS over TCP/IP. Obsolete for modern networks. |
| **Windows Error Reporting** | 🔴 Disable | Sends crash reports to Microsoft. May be disabled for privacy/performance. |
| **Windows Image Acquisition (WIA)** | 🟡 Manual | For scanners. Disable if not using imaging devices. |
| **Windows Search** | 🟡 Manual | Powers Windows Search. Can be disabled to save resources. |
| **Windows Time (w32time)** | 🟡 Manual | Syncs time via NTP. Can be disabled if domain/NTP is not used. |

---

## 🛠️ Why is this important?

- **Reduced attack surface**
- **Lower RAM and CPU usage**
- **Less background activity**

> ⚠️ Note: Always understand what a service does before disabling it. Domain environments or Server OS configurations may require different considerations.
