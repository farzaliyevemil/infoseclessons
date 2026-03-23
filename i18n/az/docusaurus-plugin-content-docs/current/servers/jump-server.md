---
id: jump-server
title: Jump Server Nədir?
description: >-
  Jump Server (Bastion Host) nədir, harada istifadə olunur və üstünlükləri
  nələrdir?
sidebar_position: 1
slug: /servers/jump-server
---

## 🔐 Jump Server (və ya Bastion Host) Nədir?

**Jump Server** — daxili şəbəkədə yerləşən sistemlərə girişi **mərkəzləşdirilmiş və təhlükəsiz** şəkildə təmin edən xüsusi bir serverdir.  
İstifadəçilər və ya administratorlar əvvəlcə bu serverə daxil olurlar, daha sonra buradan digər daxili serverlərə keçid edirlər.

---

## 🧭 Harada İstifadə Olunur?

- Bank və maliyyə qurumları
- Böyük korporativ şəbəkələr
- Cloud provider-lərdə (AWS, Azure, GCP)
- Təhlükəsiz DevOps mühitlərində (CI/CD arxitekturası ilə)

---

## 🛡️ Əsas Üstünlüklər

| **Üstünlük**         | **İzah**                                                                                     |
|-----------------------|---------------------------------------------------------------------------------------------|
| 🔒 **Təhlükəsizlik**  | Əsas giriş nöqtəsi tək bir serverə yönəldilir. Bu da daxili sistemlərin birbaşa exposed olmamasını təmin edir. |
| 🧾 **Auditing & Monitoring** | Jump Server-lər üzərindən keçən bütün bağlantılar loq fayllarda qeyd olunur və izlənə bilir. |
| 🧍 **Identity Control**      | Kim hansı sistemə daxil olub? Hansı əmrləri icra edib? – bütün bu sualların cavabı izlənilə bilər. |
| 🔁 **Multi-hop SSH**         | Yalnız birbaşa şəbəkəyə çıxışı olmayan serverlərə tək hopla deyil, jump host vasitəsilə giriş imkanı verir. |

---

## 🧰 Texniki Misal

Bir şirkətdə yalnız `10.0.0.0/8` daxili şəbəkəsində olan sistemlərə SSH ilə daxil olmaq icazəlidir. Amma bu sistemlər **internetə açıq deyil**. O halda:

```plaintext
Client (İnternet) → Jump Server (DMZ-də yerləşir) → Daxili Serverlər (SSH)
```

### 🧱 Real Misal – SSH ilə istifadə:
```bash
ssh -J user@jump-host user@internal-server
```

### OpenSSH konfiqurasiyasında:
```plaintext
Host internal
  HostName 10.0.0.5
  User emil
  ProxyJump jumpuser@jump.example.com
```

---

## ❗ Risklər və Tövsiyələr

- **Risklər**:  
  Jump Server-lər mərkəzi nöqtə olduğu üçün kompromis olarsa, bütün daxili sistemlər riskə girə bilər.

- **Tövsiyələr**:  
  - MFA (Multi-Factor Authentication) və şifrə əvəzinə SSH key istifadəsi şərtdir.  
  - VPN ilə birləşərək istifadə tövsiyə olunur.

---

## 📌 Nəticə

Jump Server sadəcə bir "keçid nöqtəsi" deyil – tətbiq olunan təhlükəsizlik siyasətlərinin mərkəzidir.  
Doğru qurulmuş Jump Server, şəbəkə hücumlarının qarşısını almaqda böyük rol oynayır.
