---
id: windows-server-tools
title: Windows Server İdarəetmə Alətləri
description: Server Manager, Event Viewer, Performance Monitor, Resource Monitor, Services, Server Core alətləri və əlaqəli admin iş axını üçün praktik bələdçi.
slug: /servers/windows-server-tools
sidebar_position: 5
status: reference
last_reviewed: 2026-03-23
keywords:
  - windows server
  - server manager
  - event viewer
  - perfmon
  - resmon
  - services
---

# Windows Server İdarəetmə Alətləri

Yaxşı Windows Server idarəçiliyi yalnız rol və feature-ləri bilməkdən ibarət deyil. Problemi başa düşmək üçün ilk hansı daxili aləti açacağını bilmək də vacibdir.

## Server Manager

Server Manager çox vaxt quraşdırmadan sonra administratorun ilk istifadə etdiyi konsoldur.

Əsas funksiyaları:

- role və feature quraşdırılması
- local server ayarları
- event və service görünürlüğü
- sadə multi-server idarəçiliyi

Deployment-dan sonra ilk yoxlamalar:

- computer name
- time və time zone
- şəbəkə konfiqurasiyası
- remote management vəziyyəti

## Event Viewer

Event Viewer Windows log-larına baxmaq üçün əsas built-in alətdir.

Ən çox istifadə olunan log qrupları:

- Application
- Security
- System
- Setup

Açmaq üçün:

```cmd
eventvwr.msc
```

## Performance Monitor

Performance Monitor problemi təxmin etmədən, zaman üzrə ölçməyə kömək edir.

Ən çox izlənən counter-lər:

- `Processor\% Processor Time`
- `Memory\Available MBytes`
- `PhysicalDisk\Disk Transfers/sec`
- `Network Interface\Bytes Total/sec`

Açmaq üçün:

```cmd
perfmon
```

## Resource Monitor

Resource Monitor uzun capture əvəzinə daha sürətli process-level görünüş lazım olanda faydalıdır.

Hansının aktiv istifadə olunduğunu göstərir:

- CPU
- memory
- disk
- network

Açmaq üçün:

```cmd
resmon
```

## Services

Services Windows Server-də ən çox troubleshooting olunan səthlərdən biridir.

Services konsolu ilə bunları edə bilərsiniz:

- service işləyir ya yox yoxlamaq
- startup type-a baxmaq
- uğursuz service-ləri ehtiyatla restart etmək
- dependency-ləri təsdiqləmək

Açmaq üçün:

```cmd
services.msc
```

## Server Core qeydi

Server Core istifadə olunursa, command-line və remote alətlər daha vacib olur.

Ən faydalı seçimlər:

- `sconfig`
- PowerShell remoting
- admin workstation-dan RSAT
- Windows Admin Center

## Sürətli identity və sistem yoxlamaları

Cari istifadəçinin SID-ini görmək üçün:

```cmd
whoami /user
```

Local user və SID siyahısı üçün PowerShell:

```powershell
Get-LocalUser | Select-Object Name, SID
```

## Əlaqəli alət: Sysprep

Əgər iş axının image və template hazırlama ilə bağlıdırsa, bunu gündəlik admin konsolu kimi deyil, ayrıca mövzu kimi görün:

- [Sysprep](/operating-systems/windows/sysprep)

## Praktik nəticələr

- təxmin etməzdən əvvəl Event Viewer-ə baxın
- zaman üzrə ölçü lazımdırsa Performance Monitor istifadə edin
- ani process-level görünüş üçün Resource Monitor açın
- Services-i sadəcə start/stop düyməsi yox, dependency xəritəsi kimi görün
- eyni işi həm GUI, həm də remote/PowerShell yolu ilə etməyi öyrənin

## Faydalı linklər

- Windows Server administration overview: [https://learn.microsoft.com/en-us/windows-server/administration/](https://learn.microsoft.com/en-us/windows-server/administration/)
- Performance tuning: [https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/](https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/)
- Windows Admin Center: [https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview](https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview)
