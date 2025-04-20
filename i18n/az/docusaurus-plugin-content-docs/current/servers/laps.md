---
id: laps
title: LAPS (Local Administrator Password Solution) Nədir?
description: >-
  Microsoft LAPS – Local Administrator şifrələrinin mərkəzləşmiş və avtomatik
  idarəsi
sidebar_position: 2
slug: /az/laps
---

## 🔐 LAPS (Local Administrator Password Solution) nədir?

**LAPS** — Microsoft-un təqdim etdiyi bir həll yoludur ki, hər bir domain-joined Windows cihazının **local administrator şifrəsini avtomatik dəyişir** və onu **Active Directory-də təhlükəsiz şəkildə saxlayır**.

Əsas məqsəd:
- Eyni şifrə istifadəsinin qarşısını almaq
- Şifrə rotasiyasını avtomatlaşdırmaq
- Local admin hesablarının təhlükəsizliyini artırmaq

---

## 🎯 Niyə LAPS?

Ənənəvi şəkildə şirkətlərdə bütün kompüterlərdə eyni local admin şifrəsi olurdu. Bu isə:
- Bir cihaz kompromis olarsa, **bütün cihazlara yol açır**
- Red Team üçün **lateral movement** çox asan olur
- SOC & Blue Team üçün isə izlənməsi və nəzarəti çətindir

---

## 🛠️ LAPS necə işləyir?

1. **Group Policy (GPO)** vasitəsilə konfiqurasiya olunur.
2. Hər kompüter müəyyən intervalda (məsələn, 30 gündə bir) öz `Administrator` şifrəsini **öz-özünə dəyişir**.
3. Bu şifrə **Active Directory (AD)** obyektinin atributu kimi saxlanılır.
4. Yalnız müəyyən istifadəçilər və ya qruplar bu şifrəni görə bilər.

---

## 🗂️ AD-də saxlanılan məlumat

LAPS şifrəni Active Directory-də `ms-Mcs-AdmPwd` atributunda saxlayır.  
Əlavə metadata isə `ms-Mcs-AdmPwdExpirationTime` atributunda yerləşir.

---

## 🧾 Auditing & Monitoring

- Şifrəyə kim baxıb?
- Şifrə nə vaxt dəyişilib?
- Kimin icazəsi var?

Bütün bu məlumatlar izlənilə bilir. Azure Sentinel, Sysmon və s. ilə inteqrasiya da mümkündür.

---

## 🔐 Təhlükəsizlik və Ən Yaxşı Təcrübələr

| Təhlükəsizlik Addımı | Tövsiyə |
|----------------------|---------|
| 🔍 RBAC tətbiqi | Şifrəyə baxa biləcək user və qruplar ciddi şəkildə məhdudlaşdırılmalıdır |
| 🔄 Rotation Interval | Şifrələr ən azı 30 gündə bir avtomatik dəyişdirilməlidir |
| 🧾 Monitoring | Hər şifrə oxuma hadisəsi loglanmalıdır |
| 🔐 MFA + Tiering | High-privileged admin-lar üçün əlavə qoruma tədbirləri görülməlidir |

---

## 🆕 Windows LAPS (2023+)

- Windows Server 2022 və Windows 11 ilə gələn **yeni nəsil LAPS** artıq **built-in** şəkildə mövcuddur.
- Artıq əlavə agent yazmağa ehtiyac yoxdur.
- PowerShell modulu ilə daha asan idarə olunur.

```powershell
Get-LapsADPassword -Identity PC-123
```

## 🧠 Nəticə
**LAPS** — endpoint təhlükəsizliyində ən sadə və effektiv həllərdən biridir. Əgər təşkilat local admin hesablarından istifadə edirsə, mütləq şəkildə LAPS tətbiq olunmalıdır.
