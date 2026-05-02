---
id: laps
title: Microsoft LAPS İzahı
description: >-
  Windows LAPS, legacy Microsoft LAPS, password backup seçimləri, rotation və
  əməliyyat best practice-ləri haqqında praktik izah.
sidebar_position: 2
slug: /servers/laps
difficulty: intermediate
---

# 🔐 Microsoft LAPS İzahı

**LAPS** — **Local Administrator Password Solution** deməkdir. Məntiq sadədir: hər Windows cihazının **özünəməxsus local administrator parolu** olur və həmin parol **avtomatik rotasiya** edilir.

Bu, workstation təhlükəsizliyində ən yayğın problemlərdən birini həll edir: çox sayda cihazda eyni local admin parolunun istifadəsi.

---

## 🎯 Niyə LAPS?

LAPS olmayan mühitlərdə adətən bu səhv modellərdən biri görünür:

- Bütün workstation-larda eyni local admin parolu
- Excel və ya qeyri-rəsmi siyahı ilə parol idarəsi
- Heç vaxt rotate olmayan local admin hesabları

Bu isə bir cihaz kompromis olduqdan sonra **lateral movement**-i çox asanlaşdırır.

---

## 🧠 Legacy Microsoft LAPS və Windows LAPS fərqi

İki versiyanı fərqləndirmək vacibdir:

| Versiya | Status | Qeyd |
| --- | --- | --- |
| **Legacy Microsoft LAPS** | Köhnə model | Klassik `ms-Mcs-AdmPwd` yanaşması |
| **Windows LAPS** | Cari model | Müasir Windows və Windows Server daxilində built-in |

Yeni deployment-lər üçün **Windows LAPS** daha düzgün seçimdir.

Niyə:

- Dəstəklənən Windows versiyalarında built-in gəlir
- Parolu **Windows Server Active Directory** və ya **Microsoft Entra ID**-yə backup edə bilir
- `Get-LapsADPassword`, `Get-LapsAADPassword`, `Reset-LapsPassword` kimi yeni cmdlet-lər verir
- Müasir deployment-lərdə AD encryption və password history kimi daha güclü xüsusiyyətlər təqdim edir

> Microsoft Learn-dəki cari yanaşmaya əsasən, strateji istiqamət Windows LAPS-dir; legacy Microsoft LAPS əsasən migration və compatibility üçün qalır.

---

## 🛠️ Windows LAPS necə işləyir

1. **GPO** və ya müasir idarəetmə vasitəsi ilə policy verilir
2. Hansı local admin hesabının idarə olunacağı təyin edilir
3. Cihaz random parol və ya passphrase yaradır
4. Həmin secret **AD** və ya **Entra ID**-yə backup edilir
5. Policy-yə uyğun rotasiya olunur
6. Admin yalnız ehtiyac olduqda parolu oxuyur

![LAPS axını](/img/servers/laps-flow.svg)

---

## 🗂️ Parol hara backup edilə bilər?

### Windows Server Active Directory

Ənənəvi on-prem mühitlər üçün uyğundur.

Üstünlüklər:

- Domain admin və support komandaları üçün tanış model
- GPO ilə yaxşı işləyir
- Delegation və auditing ilə birləşdirilə bilir

### Microsoft Entra ID

Modern device fleet-lər üçün daha uyğun variantdır.

Üstünlüklər:

- Intune / Entra idarəli cihazlar üçün rahatdır
- Modern support workflow-larına daha uyğun gəlir
- Parol retrieval üçün on-prem AD-dən asılılıq az olur

---

## 🔎 Vacib Schema Qeydi

Əgər sən **legacy Microsoft LAPS** ilə işləyirsənsə, bu klassik atributları görə bilərsən:

- `ms-Mcs-AdmPwd`
- `ms-Mcs-AdmPwdExpirationTime`

Amma **Windows LAPS native** deployment-lərində həmin atributları həmişə əsas model kimi düşünmək düzgün deyil. Windows LAPS artıq yeni cmdlet və yeni schema istiqaməti ilə işləyir.

---

## 🧾 Auditing & Monitoring

Bu suallara cavab verə bilməlisən:

- Parolu kim oxuya bilər?
- Parolu faktiki kim oxuyub?
- Axırıncı dəfə nə vaxt rotate olub?
- Normal schedule-dan kənar reset edilibmi?

Yəni LAPS həm **security control**, həm də **audit control** kimi düşünülməlidir.

---

## 🔐 Best Practice-lər

| Təhlükəsizlik Addımı | Tövsiyə |
|----------------------|---------|
| 🔍 Least privilege | Parolu yalnız konkret support və admin qrupları oxuya bilməlidir |
| 🔄 Rotation | Həssas support işindən sonra dərhal əlavə rotation faydalıdır |
| 🧾 Auditing | Read access və reset əməliyyatları audit olunmalıdır |
| 🔐 Tiering | Privileged əməliyyatlar üçün ayrıca admin hesabları və MFA istifadə olunmalıdır |
| 🧹 Scope control | Lazımsız local admin paylanmasından qaçılmalıdır |
| 📋 Break-glass plan | Outage və recovery vaxtı parolu kimin götürə biləcəyi əvvəlcədən müəyyən olunmalıdır |

---

## 🧰 Faydalı PowerShell Nümunələri

```powershell
# AD-dən parolu oxumaq
Get-LapsADPassword -Identity PC-123

# Entra ID-dən parolu oxumaq
Get-LapsAADPassword -DeviceIds <device-id>

# Dərhal yeni rotation başlatmaq
Reset-LapsPassword
```

> Hansı cmdlet-dən istifadə olunacağı backup modelindən asılıdır: AD və ya Entra ID.

---

## 🧨 Yayğın Səhvlər

- Çox sayda texnikə daimi read access vermək
- LAPS-i privilege management-in əvəzi kimi görmək
- Windows LAPS-ə keçib hələ də yalnız legacy cmdlet-ləri öyrətmək
- Kimin reset və read hüququ olduğunu audit etməmək
- Local admin istifadəsini geniş saxlayıb təkcə LAPS-lə riskin həll olduğunu düşünmək

---

## 🆕 Yeni Windows LAPS Xüsusiyyətləri

Microsoft-un cari sənədlərində aşağıdakı imkanlar da vurğulanır:

- Native Windows LAPS PowerShell cmdlet-ləri
- Entra ID backup
- Müasir deployment-lərdə AD encryption və password history
- Yeni Windows buraxılışlarında passphrase dəstəyi

Buna görə yeni mühitlər üçün plan quranda **Windows LAPS** əsas seçim olmalıdır.

---

## 🧠 Nəticə

Əgər təşkilatda local administrator hesabları istifadə olunursa, **LAPS vacibdir**. O, parol reuse-un qarşısını alır, lateral movement riskini azaldır, audit qabiliyyətini artırır və support komandası üçün daha təhlükəsiz privileged local access modeli yaradır.
