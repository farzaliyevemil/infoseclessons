---
id: open-source-identity-access-secrets
title: Open-Source Identity, Access, and Secrets Tools
description: A focused guide to open-source IAM, MFA, PAM, password management, and secrets platforms.
slug: /general-security/open-source-identity-access-secrets
sidebar_position: 4
---

# Open-Source Identity, Access, and Secrets Tools

Identity is the control plane of modern infrastructure. If identity and secrets are weak, strong network or endpoint tooling will not save you for long.

---

## 👤 Identity and Access Management

### Keycloak

Best for:

- SSO
- identity federation
- application-centric identity management

### Authentik

Best for:

- self-hosted SSO
- smaller teams that want a modern admin experience

Tradeoff:

- IAM platforms need careful design around lifecycle, group structure, and application integration

---

## 🔐 MFA / OTP

### Authelia

Good for:

- adding MFA in front of self-hosted apps
- reverse proxy integrated access flows

### privacyIDEA

Good for:

- flexible MFA token management
- more authentication-method-focused deployments

---

## 🗝️ Password Management

### Vaultwarden

Best for:

- small to mid-sized teams
- Bitwarden-compatible password vault workflows

### Passbolt

Best for:

- team-based credential sharing
- organizations that want password collaboration and permissions

---

## 🔒 Secrets Management

### HashiCorp Vault

Best for:

- application secrets
- dynamic credentials
- API-driven secret workflows

### Infisical

Best for:

- modern team secret workflows
- developer-friendly secret sharing and management

---

## 🧑‍💼 Privileged Access Management

### Teleport

Best for:

- audited access to servers and infrastructure
- centralized access workflows

### JumpServer

Best for:

- self-hosted bastion and access control patterns

---

## ✅ Practical Recommendation

If your environment is still early-stage:

1. Standardize password vaulting first
2. Add SSO and MFA next
3. Introduce secrets management for apps and automation
4. Add audited privileged access for high-value systems

---

## 📌 Final Takeaway

Identity, MFA, password management, secrets, and privileged access should be designed together. Treating them as separate projects usually creates gaps attackers can exploit.
