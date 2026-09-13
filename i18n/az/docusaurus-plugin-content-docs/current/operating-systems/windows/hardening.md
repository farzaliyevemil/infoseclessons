---
id: windows-hardening
title: Windows Hardening
description: Windows serverləri və iş stansiyalarını hardening etmək — baseline alətləri (LAPS, AppLocker/WDAC, BitLocker), hücum-səthi azaltma, local admin özünə güvənmə, credential qoruması, loglama və benchmark-lara xəritələnən verification dövrü.
slug: /operating-systems/windows/hardening
sidebar_position: 10
status: reference
last_reviewed: 2026-09-14
category_key: operating-systems
keywords:
  - hardening
  - laps
  - applocker
  - wdac
  - bitlocker
  - credential guard
  - asr qaydaları
difficulty: intermediate
tags:
  - windows
  - intermediate
---

# Windows Hardening

Windows istifadəçilərin olduğu yerdir, bu da onu phished klik-lərin düşdüyü yer edir — və defolt Windows quraşdırması uyğunluq üçün tənzimlənib, hücumçulara düşmənçilik üçün yox. Hardening defoltları rəddə çevirir, nə işlədiyini kiçildir, credential-ləri yaddaşda qoruyur və maşını dəyişdiriləndə *səsli* edir. Bu dərsin Linux qarşılığı [Linux Hardening](/operating-systems/linux/hardening)-dir; saytda artıq mövcud olan dərin-dalış bloklar [AppLocker](/operating-systems/windows/applocker) və [BitLocker](/operating-systems/windows/bitlocker)-dir. Budur tam checklist, məntiqi əlavə olunmuş, hücumçunun hərəkət qaydasında.

## 1. Microsoft-un verdiyi alətlərlə baseline

Heç vaxt sərbəst hardening etməyin. Benchmark-dan başlayın və qəsdən sapın:

- **Microsoft Security Baselines** (Windows versiyası-başına, Group Policy şablonları vasitəsilə) — vendor-un öz tövsiyə olunan parametrləri, hər buraxılışla yenilənir.
- **CIS Benchmarks** — daha sərt, icma-auditli, dərəcəli (L1/L2); əksər müəssisələr iş stansiyaları və serverlər üçün CIS L1-i hədəfləyir.
- **Microsoft Defender for Endpoint / Intune** konfiqurasiya profilləri fleetlər üçün — siyasət Registry-ni əl ilə redaktə kimi deyil, data kimi.

Golden image-ə tətbiq edin, yoxlayın, sonra image-deploy edin — maşınları təkbətək hand-harden etməyin. (Serverlər üçün image intizamı [Windows Server Planning](/servers/windows-server-planning)-i əks etdirir.)

## 2. Local admin-i əhliləşdir — ən böyük tək qələbə

Demək olar hər Windows kompromisi hər hansı *bəzi* local admin hüququ üzərindən zəncirlənir:

- **İstifadəçiləri local Administrators-dan çıxarın.** Gündəlik iş standart istifadəçi kimi gedir; UAC prompt-ları o zaman həqiqətən mənanı daşıyır. Admin tələb edən applər virtualizə/tesdiqlənmiş istisna siyahısına düşür.
- **Hər yerdə LAPS** (Windows LAPS müasir Windows-a daxildir): hər maşının local admin şifrəsi unikal olur, dövrü yenilənir, AD/Entra-da saxlanılır və yalnız təsdiqlənmiş identikliklər oxuyur. Onsuz, bir dump olunmuş local hash (və ya bir təkrarlanan şifrə) tam fleet-i sahiblənir — klassik "400 eyni maşında Pass-the-Hash" ssenarisi. `Get-LapsADPassword` ilə yoxlayın.
- **Domain admin login-ini məhdudlaşdırın** — yalnız domain controller-lərə və admin iş stansiyalarına; DA sessiyası iş stansiyasına heç vaxt toxunmasın (credential oğurluğu sessiyanı izləyir).
- **Tiered administration** (Tier 0 = DC/identiklik, Tier 1 = serverlər, Tier 2 = iş stansiyaları) ayrı hesablar və admin-only patch iş stansiyaları ilə. Model deyiləndə sadədir və bütün hücum qrafikini yenidən formalaşdırır.

## 3. Nəyin icra olunduğunu idarə edin

Defolt Windows hər şeyi işlədir. Gücə görə iki mexanizm:

- **Smart App Control / SmartScreen** — itirafçılar və kiçik fleetlər üçün reputasiya-əsaslı bloklama.
- **AppLocker / WDAC** — publisher, yol və ya hash ilə allowlisting. WDAC daha güclüdür (imzalı siyasət, kernel-enforced) və daha sərtdir; AppLocker başlamaq üçün daha asandır. Pragmatik rollout: bir ay **audit modu** — hansı biznes applərinin sınacağını toplamaq üçün, sonra sənədləşdirilmiş istisnalarla enforce. Hər script-kiddie dropper, hər `powershell -enc` payload, hər LOLBin run bu qatda ölür — Windows-un "təsdiqlənməmiş heç nə işləmir"ə ən yaxın olanıdır.

Yan-kanalları bağlayan yoldaş parametrlər: internetdən gələn Office fayllarında makro bloklama (`Block macros from running in Office files from the Internet`), Office applərinin uşaq proses yaratmasını bloklama, istifadə olunmayan yerdə Windows Script Host-u deaktiv etmək.

## 4. Attack Surface Reduction (ASR) qaydaları

Defender-in ASR qayda dəsti pulsuz, yüksək-məhsuldar davranış bloklistidir — "PSExec və WMI komandalarından yaranan prosesləri blokla", "LSASS-dan credential oğurluğunu blokla", "exploit olunmuş zəif imzalı driver-lərin sui-istifadəsini blokla" kimi qaydalar. Audit modunda başlayın, event log-u review edin (Event ID 1121/1122), sakit qaydaları block-a keçirin. ASR + AppLocker/WDAC + SmartScreen stack-i phished istifadəçinin payload-ını hər addımda çətinləşdirən müdafiəyə yığılır.

## 5. Credential-ləri yaddaşda qoru

LSASS-a qarşı Mimikatz bir alətdə dörd onillik Windows kompromisidir. Qatlı cavab:

- **Credential Guard** (VBS-izolyasiya olunmuş LSASS, Windows 11 22H2 Enterprise-da defolt-on) — NTLM hash-ləri və Kerberos ticket-ləri dump-oluna bilməz olur.
- **LSASS PPL + PPL audit**; ikinci qat kimi ASR qaydası ilə LSASS girişini blokla.
- **NTLM-ni azalt**: NTLM istifadəsini audit et, Kerberos-a keç, məhdudlaşdırmanı planlaşdır — NTLM relay hədiyyə verməyə davam edən hədiyyədir.
- **Kerberos hardening**: uzun servis-hesabı şifrələri, yalnız-AES şifrələmə tipləri, servisler üçün gMSA (Group Managed Service Accounts) — şifrələr avtomatik dövr edir və insanlar heç vaxt bilmir.

## 6. Cihazı şifrələ və idarə et

- **Laptop-lar üçün TPM+PIN ilə BitLocker** ([BitLocker](/operating-systems/windows/bitlocker) dərsinə baxın); recovery açarları escrow edin və yoxlayın — açarları escrow-olunmamış şifrələmə gözlənilən dəstək outage-dir.
- Data həssaslığı tələb edəndə ** removable media idarəetməsi**.
- **GPO ilə ekran kilidi**, kilidli rollar üçün USB cihaz quraşdırma məhdudiyyətləri.

## 7. Patch et və səthi azalt

- **WSUS/Intune patch ring-ləri**: iş stansiyaları günlər içində, serverlər pəncərənizdə; niyyətlərlə yox, uyğunluq hesabatları ilə yoxlayın. [Linux Hardening](/operating-systems/linux/hardening)-də istifadə edilən patch-yaşı metriki burada da keçərlidir.
- **Lazım olmayanı silin**: SMBv1 (EternalBlue qapısı — yoxla və sil), legacy .NET/Java runtime-ları, istəyə bağlı feature-lar.
- **SMB imzalama** aktiv və SYSVOL/NETLOGON üçün **UNC hardening** (2023-dəki SMB imza defoltları məhz relay hücumlarına görə var).
- **LLMNR/NetBIOS-NS deaktiv** (və ya mövcuddursa DNS-over-SMB/TLS aktiv) — onlar hər responder-üslublu credential-yığma demosunun protokoludur.
- **RDP üçün Network-Level Authentication**, RDP management şəbəkələri ilə məhdud və ya gateway arxasında, internetə açıq 3389 — heç vaxt.

## 8. Loglama: maşını şahidə çevir

Defolt Windows loglama mühüm yerdə nazikdir. Aktivləşdirin və göndərin:

- **Komanda-sətri proses auditing** (komanda sətri ilə 4688) + tunlu config ilə **Sysmon** (proses, şəbəkə, image-load, registry hadisələri) — bu, [Log Analysis](/blue-teaming/log-analysis)-ın Windows-da işlədiyi data.
- **PowerShell**: module/script-block loglama (`4104` hadisələri hər kodlanmış payload-ı hərfi-hərfi yaxalayır) və həssas hostlar üçün transcription.
- **Log shipping** endpoint-in dəyişə bilməyəcəyi mərkəzi mağazaya — lokal loglar real hücumçuların ilk təmizlədiyi şeydir (Event 1102 sizin tamper alarmınızdır).

## 9. Hücumçu kimi yoxla

```powershell
Get-LocalGroupMember Administrators          # bu boxda kim admin-dir?
Get-LapsADPassword -Identity PC01            # LAPS həqiqətən deploy olunubmu?
Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" -MaxEvents 20
Get-Process lsass -IncludeUser               # (PPL ilə: access denied = sağlamdır)
```

Sonra öz estate-inizi hücum edin: şifrə-sprey simulyasiyası, audit modunda benign makro payload, test hosta dump cəhdi. Hardening nəticələrlə yoxlanılır və benchmark alətləri (CIS-CAT, Defender Vulnerability Management) onu bir-dəfəlik layihə əvəzinə təkrarlanan bala çevirir.

## Növbəti addım

- [Linux Hardening](/operating-systems/linux/hardening) — fleet-in digər yarısında eyni intizam.
- [AppLocker](/operating-systems/windows/applocker) və [BitLocker](/operating-systems/windows/bitlocker) — iki pillənin dərin dalışı.
- [Group Policy](/servers/group-policy) — bunun hamısının təhvil mexanizmi.
- [Endpoint Security](/blue-teaming/endpoint-security) — üstündəki EDR və cavab qatı.
