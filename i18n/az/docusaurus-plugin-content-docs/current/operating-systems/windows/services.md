---
id: disable-windows-services
title: Disabling Unnecessary Windows Services
description: Learn how to improve performance and security by disabling unused Windows services.
---


# 🔒 Disable Unnecessary Windows Services (Security & Performance)

Aşağıdakı xidmətlər müəyyən hallarda **təhlükəsizlik riski yarada**, ya da **performansa mənfi təsir göstərə bilər**. Əgər bu xidmətlərə ehtiyacınız yoxdursa, **Manual** və ya **Disabled** vəziyyətə gətirmək tövsiyə olunur.

| Service | Recommendation | Reason |
|--------|----------------|--------|
| **Computer Browser** | 🔴 Disable | Köhnə NetBIOS şəbəkəsi üçün istifadə olunur, təhlükəsizlik riski yarada bilər. |
| **Diagnostic Policy Service** | 🟡 Manual | Sistemin nasazlıqlarını avtomatik diaqnoz edir. Gərəksizsə, Manual kifayətdir. |
| **Distributed Link Tracking Client** | 🔴 Disable | NTFS fayllarının paylaşımını izləyir. Domain lazım deyilsə, deaktiv et. |
| **IP Helper** | 🟡 Manual | IPv6 tunelləri üçün istifadə olunur. Adi istifadəçilər üçün lazım deyil. |
| **Offline Files** | 🔴 Disable | Offline fayl sinxronizasiyası. Domain-ə qoşulu deyilsinizsə, deaktiv et. |
| **Program Compatibility Assistant** | 🟡 Manual | Köhnə proqramlarla uyğunluq üçün. Əgər müasir proqramlar istifadə edirsənsə, lazım deyil. |
| **Portable Device Enumerator** | 🟡 Manual | MTP cihazlar üçün. Çox az istifadə olunursa, Manual edə bilərsən. |
| **Print Spooler** | 🔴 Disable | Printer yoxdursa, təhlükəsizlik məqsədilə tamamilə bağla. CVE-lərdə istifadə olunur. |
| **Remote Registry** | 🔴 Disable | Uzaqdan registry dəyişikliklərinə imkan verir. Təhlükəlidir. |
| **Secondary Logon** | 🟡 Manual | Run as funksiyası üçün istifadə olunur. Az istifadə edilirsə Manual. |
| **Security Center** | 🟠 Leave Enabled | Təhlükəsizlik xəbərdarlıqları üçün lazımdır. Disable tövsiyə olunmur. |
| **Server** | 🟡 Manual | Şəbəkə paylaşımı üçün. Yalnız lokal istifadədirsə, deaktiv edə bilərsən. |
| **TCP/IP NetBIOS Helper** | 🔴 Disable | NetBIOS funksiyası üçün. Modern şəbəkələrdə ehtiyac yoxdur. |
| **Windows Error Reporting** | 🔴 Disable | Microsoft-a crash məlumatı göndərir. Təhlükəsizlik və performans baxımından bağlana bilər. |
| **Windows Image Acquisition (WIA)** | 🟡 Manual | Skannerlər üçün. Əgər istifadə etmirsənsə, deaktiv et. |
| **Windows Search** | 🟡 Manual | Axtarış funksiyası üçün. İstifadə etmirsənsə performans üçün bağlana bilər. |
| **Windows Time (w32time)** | 🟡 Manual | Saat sinxronizasiyası üçün. Domain və ya NTP lazım deyilsə, deaktiv oluna bilər. |

---

## 🛠️ Nə üçün vacibdir?
- **Azaldılmış attack surface (hücum səthi)**
- **Daha az RAM və CPU istifadəsi**
- **Sistemdə daha az background aktivlik**

> ⚠️ Qeyd: Disable etməzdən öncə xidmətin nə etdiyini başa düşmək vacibdir. Domain mühitində və ya Server OS-lərdə fərqli yanaşmaq lazımdır.
