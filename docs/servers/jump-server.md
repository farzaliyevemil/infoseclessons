---
id: jump-server
title: What is a Jump Server?
description: >-
  What is a Jump Server (Bastion Host), where is it used, and what are its
  advantages?
sidebar_position: 1
slug: /jump-server
---

## 🔐 What is a Jump Server (or Bastion Host)?

A **Jump Server** is a specialized server that provides **centralized and secure** access to systems located within an internal network.  
Users or administrators first connect to this server and then access other internal servers from there.

![Jump Server Diagram](/img/servers/jump-server.svg)

---

## 🧭 Where is it Used?

- Banks and financial institutions  
- Large corporate networks  
- Cloud providers (AWS, Azure, GCP)  
- Secure DevOps environments (with CI/CD architecture)  

---

## 🛡️ Key Advantages

| **Advantage**         | **Description**                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| 🔒 **Security**        | The main entry point is directed to a single server, ensuring that internal systems are not directly exposed. |
| 🧾 **Auditing & Monitoring** | All connections passing through Jump Servers are logged and can be monitored.                              |
| 🧍 **Identity Control**      | Who accessed which system? What commands were executed? – All these questions can be tracked.             |
| 🔁 **Multi-hop SSH**         | Provides access to servers without direct network access via a single hop through the Jump Host.          |

---

## 🧰 Technical Example

In a company, only systems within the `10.0.0.0/8` internal network can be accessed via SSH. However, these systems are **not exposed to the internet**. In this case:

```plaintext
Client (Internet) → Jump Server (Located in DMZ) → Internal Servers (SSH)
```

### 🧱 Real Example – Using SSH:
```bash
ssh -J user@jump-host user@internal-server
```

### In OpenSSH Configuration:
```plaintext
Host internal
  HostName 10.0.0.5
  User emil
  ProxyJump jumpuser@jump.example.com
```

---

## ❗ Risks and Recommendations

- **Risks**:  
  Since Jump Servers are a central point, if compromised, all internal systems may be at risk.

- **Recommendations**:  
  - Use MFA (Multi-Factor Authentication) and SSH keys instead of passwords.  
  - Combine with VPN for enhanced security.

---

## 📌 Conclusion

A Jump Server is not just a "gateway" – it is the core of implemented security policies.  
A properly configured Jump Server plays a significant role in preventing network attacks.
