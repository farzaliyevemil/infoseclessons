---
id: sysprep
title: Sysprep – Windows Sistem Hazırlıq Aləti
description: >-
  Sysprep nədir, niyə imaging və deployment üçün istifadə olunur, və Windows
  quraşdırmalarını necə ümumiləşdirmək olar.
slug: /operating-systems/windows/sysprep
---

# 🧰 Sysprep nədir?

**Sysprep (System Preparation Tool)** — Windows əməliyyat sisteminin əvvəlcədən qurulmuş versiyasını fərqli cihazlara yaymaq (deploy) üçün istifadə olunan Microsoft alətidir.

---

## 🎯 Nə üçün istifadə olunur?

- 💻 **Yeni kompüterlərə eyni imiclə OS yazmaq**: Eyni konfiqurasiya ilə çoxlu kompüter qurmaq istədikdə.
- 🧹 **SID (Security Identifier) təmizləməsi**: Hər bir Windows cihazının unikal SID-si olur. Sysprep bu SID-ni sıfırlayaraq yeni sistemlərdə konfliktlərin qarşısını alır.
- 🧰 **Audit və ya Out-of-Box Experience (OOBE)** rejimlərində sistem hazırlamaq.
- 📦 **Imaging (imic almaq)** məqsədilə hazırlanmış sistemləri klonlamaq üçün.

---

## 🔧 Əsas əmrlər və funksiyalar

Sysprep GUI ilə və ya komanda sətri ilə istifadə oluna bilər:

### Sysprep GUI:
```bash
C:\Windows\System32\Sysprep\Sysprep.exe
```

### Sysprep Komanda Sətri:
```bash
sysprep /oobe /generalize /shutdown
```

### Əmrlərin izahı:
- `/oobe` – İstifadəçiyə ilk giriş ekranını göstərmək üçün istifadə olunur.
- `/generalize` – Sistemi hardware-dən və unikal identifikatorlardan ayırır (SID-ləri sıfırlayır).
- `/shutdown` – Proses bitdikdən sonra sistemi söndürür.

---

## 📝 Əlavə Nümunə: Imaging üçün hazırlıq

1. Lazım olan proqramlar və konfiqurasiyalar quraşdırılır.
2. Aşağıdakı əmri icra edin:
   ```bash
   sysprep /generalize /oobe /shutdown
   ```
3. Kompüter imic almağa hazır vəziyyətə gəlir (məsələn, Clonezilla, MDT və ya WDS ilə).

---

## ⚠️ Qeydlər

- Sysprep yalnız Windows-un müəyyən versiyalarında mövcuddur.
- Sysprep bir sistemdə bir neçə dəfə istifadə olunarsa problem yarana bilər.
- Microsoft bəzi proqramların və tətbiqlərin Sysprep ilə uyğun olmaya biləcəyini bildirir.
