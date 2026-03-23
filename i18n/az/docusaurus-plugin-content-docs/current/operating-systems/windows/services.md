---
id: disable-windows-services
title: Windows Services Hardening Bələdçisi
description: >-
  Windows xidmətlərini kor-koranə disable etmədən, daha təhlükəsiz və düzgün
  şəkildə necə review etmək lazım olduğunu öyrənin.
slug: /services
---


# 🔒 Windows Services Hardening Bələdçisi

Windows xidmətlərini disable etmək bəzən təhlükəsizliyi yaxşılaşdıra bilər, amma ehtiyatsız yanaşma login, şəbəkə, print, remote support və ya domain davranışını poza bilər.

Yəni düzgün sual adətən bu deyil:

---

> "Hansı 20 service-i disable edim?"

Daha düzgün sual budur:

> "Bu cihazın roluna görə hansı service-ləri review etməliyəm?"

---

## 🧭 Əvvəl cihaz rolunu müəyyən et

Tövsiyə buna görə dəyişir:

- şəxsi workstation
- domain-joined korporativ laptop
- kiosk və ya lab cihazı
- admin workstation
- Windows Server

Standalone home PC üçün təhlükəsiz görünən dəyişiklik enterprise workstation və ya server üçün səhv ola bilər.

---

## ✅ Ümumi düzgün qaydalar

- Anlamadığın service-i disable etmə
- Əmin deyilsənsə **Disabled** yox, **Manual** seç
- Geniş rollout-dan əvvəl bir cihazda test et
- Dependency-ləri yoxla
- Nə dəyişdiyini sənədləşdir

---

## 🔍 Review etməyə dəyən service-lər

| Service | Tövsiyə | Səbəb |
| --- | --- | --- |
| **Print Spooler** | Printer lazım deyilsə review et | Lazımsız sistemlərdə exposure azaldır |
| **Remote Registry** | Adətən disable etmək olar | Uzaq attack surface yaradır |
| **Offline Files** | İstifadəyə görə review et | Hər mühitdə lazım olmur |
| **TCP/IP NetBIOS Helper** | Modern şəbəkələrdə review et | Legacy compatibility üçün qalır |
| **Windows Error Reporting** | Policy-yə görə review et | Privacy və support tradeoff-u var |
| **Windows Search** | User ehtiyacına görə review et | Bəzi cihazlarda resurs qənaəti verir |
| **Portable Device Enumerator** | Lazım deyilsə review et | Sərt nəzarətli cihazlarda az istifadə olunur |
| **Program Compatibility Assistant** | Ehtiyacdan asılı review et | Köhnə tətbiqlər olmayanda əhəmiyyəti azalır |

---

## ⚠️ Ehtiyatla yanaşılmalı service-lər

| Service | Niyə ehtiyat lazımdır |
| --- | --- |
| **Windows Time** | Domain mühitində vacibdir; Kerberos vaxt dəqiqliyindən asılıdır |
| **Server** | SMB və file sharing üçün lazım ola bilər |
| **Secondary Logon** | Bəzi admin workflow-lar üçün lazımdır |
| **Diagnostic Policy Service** | Troubleshooting üçün faydalıdır |
| **IP Helper** | IPv6, VPN və transition ssenarilərində lazım ola bilər |
| **Security Center** | Client cihazlarda adətən enabled qalmalıdır |

---

## 🏢 Enterprise qeydləri

Domain-joined sistemlərdə:

- Yalnız "boş görünür" deyə service disable etmə
- GPO, EDR, VPN, RMM və support alətləri ilə əlaqəni nəzərə al
- Service onboarding, patching, remote support və compliance reporting vaxtı lazım ola bilər

Xüsusilə bunlarda diqqətli ol:

- time sync
- SMB/file service
- remote administration
- endpoint management və VPN agent-ləri

---

## 🛠️ Təhlükəsiz review prosesi

1. Cihaz rolunu müəyyən et
2. Service və dependency-lərini yoxla
3. Business və support alətlərinə təsirini qiymətləndir
4. Mümkündürsə əvvəl **Manual** et
5. Monitorinq apar
6. Sonra ehtiyac varsa **Disabled** et

Faydalı əmrlər:

```powershell
Get-Service
Get-Service -Name Spooler
sc qc Spooler
```

---

## 🧨 Yayğın səhvlər

- "disable these 20 services" tipli siyahıları kor-koranə tətbiq etmək
- Server-də workstation məntiqi ilə qərar vermək
- Dependency-ləri unutmaq
- Cüzi resurs qənaəti üçün admin workflow-ları sındırmaq
- Performance tuning ilə security hardening-i eyni şey saymaq

---

## 📌 Praktik tövsiyə

Əgər təhlükəsiz baseline istəyirsənsə, bunlardan başla:

- **Print Spooler**-i review et
- **Remote Registry**-ni review et
- legacy compatibility service-ləri review et
- domain-sensitive service-lərə dependency yoxlamadan toxunma

---

Windows service hardening faydalıdır, amma yalnız **rol əsaslı, test edilmiş və sənədləşdirilmiş** şəkildə aparılanda.
