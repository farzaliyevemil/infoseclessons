---
id: windows-server-2025-installation
title: Windows Server 2025-i Sıfırdan Quraşdırmaq
description: "Windows Server 2025 üçün addım-addım quraşdırma bələdçisi: media hazırlığı, setup axını, ilk girişdən sonrakı əsas ayarlar və təhlükəsiz başlanğıc yoxlamaları."
slug: /servers/windows-server-2025-installation
sidebar_position: 2
status: reference
last_reviewed: 2026-03-23
keywords:
  - windows server 2025
  - quraşdırma
  - server setup
  - evaluation center
  - ilkin konfiqurasiya
difficulty: foundation
---

# Windows Server 2025-i Sıfırdan Quraşdırmaq

Bu dərs birbaşa quraşdırma axınına fokuslanır. Əgər əvvəlcə edition, role və deployment modeli seçməlisənsə, [Windows Server Planlaşdırması](/servers/windows-server-planning) səhifəsindən başla.

## Başlamazdan Əvvəl

Quraşdırmadan əvvəl üç şey lazımdır:

- quraşdırma mediası, adətən etibarlı mənbədən ISO
- minimum tələbləri qarşılayan fiziki server və ya virtual maşın
- quraşdırma seçimi: Server Core və ya Desktop Experience

Microsoft Windows Server 2025 evaluation mediasını Evaluation Center üzərindən təqdim edir və quraşdırma axınını Microsoft Learn-də sənədləşdirir.

## Quraşdırma Mediasını Yüklə

Lab və öyrənmə məqsədi üçün ən rahat seçim rəsmi evaluation yükləməsidir:

- [Windows Server 2025 Evaluation Center](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)

Evaluation versiyası 180 gündən sonra bitir. Microsoft həmçinin qeyd edir ki, evaluation quraşdırmaları avtomatik shutdown davranışına düşməmək üçün ilk 10 gün ərzində internet üzərindən aktivləşdirilməlidir.

## Minimum Hardware Bazası

Son qərar üçün Microsoft sənədlərinə baxmaq lazımdır, amma sadə quraşdırma üçün praktik minimum baza belədir:

| Komponent | Minimum |
| --- | --- |
| CPU | 1.4 GHz 64-bit prosessor |
| RAM | Server Core üçün 2 GB |
| RAM | Desktop Experience üçün 2 GB, 4 GB tövsiyə olunur |
| Disk | 32 GB və ya daha çox |
| USB media | USB-dən quraşdırılacaqsa 8 GB flaş kart |

Production workload üçün bunları sizing guidance yox, sadəcə install minimumu kimi qəbul et.

## Bootable Media Hazırla

### Fiziki server

Fiziki serverə quraşdırırsansa, ISO-dan bootable USB hazırla.

Yayğın yanaşmalar:

- Microsoft-un sənədləşdirdiyi USB hazırlama addımları
- lab ssenariləri üçün Rufus kimi etibarlı alətlər

Microsoft-un quraşdırma təlimatı ən azı 8 GB USB götürür.

### Virtual maşın

Hədəf VM-dirsə, adətən USB lazım olmur. ISO-nu virtual DVD qurğusuna qoşub maşını həmin media ilə boot etmək kifayətdir.

## Quraşdırma Axını

## 1. Media-dan boot et

- Fiziki serverdə BIOS və ya boot menu üzərindən USB/DVD seç.
- VM-də ISO-nu qoş və virtual optical device-dan boot et.

Adətən çıxan boot mesajını təsdiqləyib setup-a keç.

## 2. Dil və klaviatura ayarlarını seç

Mühitə uyğun dil, tarix/saat formatı və klaviatura düzənini seç, sonra davam et.

## 3. Quraşdırmanı başlat

Windows Server quraşdırma yolunu seç və setup-a davam et.

Media və lisenziyalaşdırma kanalından asılı olaraq qarşına bunlar çıxa bilər:

- product key
- evaluation yolu
- pay-as-you-go kimi lisenziya metodu

Mühitinə uyğun olan variantı seç.

## 4. Image seç

Planına uyğun edition və quraşdırma seçimini götür:

- Standard və ya Datacenter
- Server Core və ya Desktop Experience

Öyrənmə mühitlərində Desktop Experience adətən daha rahatdır. Nəzarətli production mühitlərində isə Server Core daha az resurs istifadə etdiyinə və daha kiçik attack surface verdiyinə görə çox vaxt üstün tutulur.

## 5. Lisenziya şərtlərini qəbul et

Davam etmək üçün proqram şərtlərini oxu və qəbul et.

## 6. Təmiz quraşdırmanı seç

Sıfırdan qurursansa, in-place upgrade yox, clean install yolunu seç.

## 7. Hədəf diski seç

Windows Server-in qurulacağı diski seç.

Vacib məqamlar:

- düzgün diski seçdiyini yoxla
- clean install zamanı hədəf disk üzərinə yazılacağını gözlə
- bəzi sistemlərdə birdən çox disk olanda boot davranışı əhəmiyyətli olur, buna görə Microsoft-un quraşdırma qeydlərinə bax

## 8. Setup-ın bitməsini gözlə

Sistem faylları köçürür, komponentləri quraşdırır və bir neçə dəfə restart edir. Bu normaldır.

## 9. Local Administrator parolunu təyin et

Quraşdırmanın sonunda built-in Administrator hesabı üçün güclü parol yarat.

Əgər bu müvəqqəti standalone quruluşdursa, kompleks parol seç və onu təhlükəsiz saxla.

## İlk Girişdən Sonrakı İşlər

İlk sign-in-dən sonra, role əlavə etməzdən və ya serveri promote etməzdən əvvəl əsas bazanı qur.

## Server adını dəyiş

Server domain-ə qoşulmazdan əvvəl mühitinə uyğun naming convention seç.

Nümunə:

```text
WS2025-DC01
WS2025-FS01
WS2025-MGMT01
```

## Şəbəkə konfiqurasiyasını yoxla

Server workload-lərində statik ünvan çox vaxt DHCP-dən daha uyğundur.

Heç olmasa bunları yoxla:

- IPv4 və ya IPv6 ünvanlama
- default gateway
- DNS server-lər
- hostname resolution

Əgər bu server domain controller olacaqsa, promote etməzdən əvvəl DNS dizaynı məqsədli olmalıdır.

## Saat və saat zonasını düz təyin et

Saat fərqi real əməliyyat problemləri yaradır, xüsusən də domain mühitlərində. Kerberos clock skew-a həssasdır.

## Update-ləri quraşdır

Serveri kritik dependency-ə çevirməzdən əvvəl son cumulative update və servicing komponentlərini quraşdır.

GUI yolu:

```text
Settings -> Windows Update -> Check for updates
```

PowerShell nümunələri:

```powershell
hostname
ipconfig /all
systeminfo
Get-NetFirewallProfile | Select-Object Name, Enabled
Get-WindowsFeature | Where-Object Installed
```

## Lazım olan idarəetmə komponentlərini əlavə et

Platformadan asılı olaraq bunlara da ehtiyac ola bilər:

- VMware Tools kimi virtualization guest alətləri
- remote idarəetmə üçün Windows Admin Center
- fiziki serverdə vendor driver və firmware update-ləri

## Hansı Nöqtədə Dayanıb Yenidən Yoxlamalısan

Bu yoxlamalar tamamlanmamış təzə serverə dərhal əlavə role yığma:

- şəbəkə bağlantısı işləyir
- saat düzgündür
- update-lər qurulub
- disk quruluşu gözlənilən kimidir
- server adı finaldır
- backup və recovery gözləntiləri aydındır

## Rəsmi Mənbələr

- [Install Windows Server from installation media](https://learn.microsoft.com/en-us/windows-server/get-started/install-windows-server)
- [Hardware requirements for Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements)
- [Windows Server 2025 Evaluation Center](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)
- [Get started with Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/get-started-with-windows-server)
