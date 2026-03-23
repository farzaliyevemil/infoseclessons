---
id: open-source-identity-access-secrets
title: Açıq Mənbə Identity, Access və Secrets Alətləri
description: Open-source IAM, MFA, PAM, password management və secrets platformaları üçün fokuslanmış bələdçi.
slug: /general-security/open-source-identity-access-secrets
sidebar_position: 4
---

# Açıq Mənbə Identity, Access və Secrets Alətləri

Müasir infrastrukturların control plane-i identity-dir. Identity və secrets zəifdirsə, güclü network və endpoint alətləri təkbaşına kifayət etməyəcək.

---

## 👤 Identity və Access Management

### Keycloak

Daha uyğundur:

- SSO
- identity federation
- tətbiq mərkəzli identity idarəsi

### Authentik

Daha uyğundur:

- self-hosted SSO
- daha modern admin təcrübəsi istəyən kiçik komandalar

Tradeoff:

- IAM həlləri lifecycle, qrup strukturu və tətbiq inteqrasiyası baxımından diqqətli dizayn tələb edir

---

## 🔐 MFA / OTP

### Authelia

Faydalıdır:

- self-hosted app-lərin önünə MFA qoymaq
- reverse proxy ilə inteqrasiya olunmuş access flow-lar

### privacyIDEA

Faydalıdır:

- çevik MFA token idarəsi
- authentication method əsaslı deployment-lər

---

## 🗝️ Parol idarəsi

### Vaultwarden

Daha uyğundur:

- kiçik və orta komandalar
- Bitwarden-compatible password vault workflow-ları

### Passbolt

Daha uyğundur:

- komanda daxilində credential paylaşımı
- icazə və əməkdaşlıq mərkəzli parol idarəsi

---

## 🔒 Secrets management

### HashiCorp Vault

Daha uyğundur:

- tətbiq secret-ləri
- dynamic credential-lar
- API əsaslı secret workflow-ları

### Infisical

Daha uyğundur:

- modern komanda secret workflow-ları
- developer-friendly secret paylaşımı və idarəsi

---

## 🧑‍💼 Privileged Access Management

### Teleport

Daha uyğundur:

- server və infrastruktur üçün audit olunan access
- mərkəzləşdirilmiş giriş workflow-ları

### JumpServer

Daha uyğundur:

- self-hosted bastion və access control modelləri

---

## ✅ Praktik tövsiyə

Əgər mühit hələ erkən mərhələdədirsə:

1. əvvəl password vault standardını qur
2. sonra SSO və MFA əlavə et
3. app və automation üçün secrets management gətir
4. yüksək dəyərli sistemlər üçün audited privileged access qur

---

## 📌 Yekun fikir

Identity, MFA, password management, secrets və privileged access birlikdə dizayn olunmalıdır. Bunları ayrı-ayrı layihə kimi aparmaq çox vaxt hücumçuların istifadə edə biləcəyi boşluqlar yaradır.
