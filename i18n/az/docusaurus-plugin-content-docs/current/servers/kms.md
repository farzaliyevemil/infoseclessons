---
id: kms
title: KMS (Key Management Service)
description: "Windows və Office üçün mərkəzləşdirilmiş aktivasiya: KMS həddləri, renewal interval-ları, konfiqurasiya və ADBA alternativi."
slug: /servers/kms
sidebar_position: 6
status: reference
last_reviewed: 2026-04-22
keywords:
  - kms
  - aktivasiya
  - adba
  - volume licensing
---

# KMS (Key Management Service)

**KMS** — volume-licensed Windows və Office məhsulları üçün Microsoft-un mərkəzləşdirilmiş aktivasiya xidmətidir. Hər client-i Microsoft serverlərində aktivasiya etmək əvəzinə, təşkilatdakı client-lər lokal KMS host-una qarşı aktivasiya olunur.

> KMS Windows Server-də role/feature kimi quraşdırılır. Volume license key bir dəfə KMS host-da daxil edilir, client-lər onu şəbəkə üzərindən avtomatik tapır.

## KMS necə işləyir

```
KMS client-lər (Windows / Office)
         ↓
     KMS host server
         ↓
      Aktivasiya
```

Müasir Windows Server-də olan tək KMS host həm cari, həm də köhnə client OS-ləri və Office məhsullarını aktivasiya edə bilər, o cümlədən Semi-Annual və LTSC (Long-Term Servicing Channel) edisiyalarını.

## Aktivasiya həddləri

KMS yalnız unikal maşınların minimum sayı host ilə əlaqə saxladıqdan sonra client-ləri aktivasiya edir:

| Client növü | Minimum say |
| --- | --- |
| Windows client (Windows 10/11) | 25 |
| Windows Server | 5 |

Bu həddlərdən az olduqda KMS host sorğuları qəbul edir, amma aktivasiya etmir. Kiçik mühitlər üçün — və ya KMS sayı idarə etmək istəmədiyiniz mühitlər üçün — ADBA istifadə edin.

## Aktivasiya və renewal interval-ları

KMS client-ləri aktiv saxlamaq üçün iki zaman interval-ı istifadə edir:

| Ayar | Default | Mənası |
| --- | --- | --- |
| Activation interval | 2 saat | Aktivasiya olunmamış client KMS host-u nə qədər tez-tez yoxlayır |
| Renewal interval | 7 gün | Aktivasiya olunmuş client lease-i nə qədər tez-tez yeniləyir |
| Etibarlılıq | 180 gün | Uğurlu aktivasiyadan sonra ümumi lease müddəti |

Aktivasiya olunduqdan sonra client hər 7 gündən bir KMS host-la əlaqə qurur. Host-a çata bilmirsə, 180 günlük lease bitənə qədər cəhd etməyə davam edir. 173-cü gündən başlayaraq daha aqressiv yenidən cəhd edir.

## KMS konfiqurasiyası

KMS host-da konfiqurasiya etmək lazım olan əsas şeylər:

- **TCP port 1688** — KMS default olaraq burada dinləyir; client-lər bu porta qoşulur
- **Firewall** — müvafiq profillərdə (Domain / Private / Public) TCP/1688 inbound-a icazə ver
- **DNS auto-publish** — KMS host avtomatik olaraq `_VLMCS._TCP` SRV record publish edir ki, client-lər onu tapa bilsin

Bu SRV record sayəsində domain-dəki client-lərə adətən manual konfiqurasiya lazım olmur — onlar DNS-də `_VLMCS._TCP.<domain>` axtarır və host-u tapır.

Key-lərin özləri Microsoft Volume Licensing Service Center (VLSC)-dən gəlir. Köhnə KMS host-ları (Server 2012/2016) yeni client OS versiyalarını aktivasiya etmək üçün cumulative update-lərin quraşdırılmasına ehtiyac duya bilər.

## Aktivasiya metodları

### KMS

Şəbəkə əsaslı aktivasiya. Client-lər SRV record-dan istifadə edərək KMS host ilə əlaqə qurur, 180 günlük lease alır və hər 7 gündən bir yeniləyir.

### ADBA (Active Directory Based Activation)

ADBA client-ləri Active Directory-nin özü vasitəsilə aktivasiya edir — ayrıca KMS xidmətinə ehtiyac yoxdur. Domain-joined maşın AD-də autentifikasiya edəndə aktivasiya bu prosesin hissəsi kimi baş verir.

- Client sayı həddi yoxdur
- Aktivasiya KMS host-a yox, domain membership-ə bağlıdır
- KMS-dən daha etibarlı və redundant-dır, çünki AD-nin artıq multi-DC redundancy-si var
- Ən azı Windows Server 2012 schema versiyası tələb olunur

Əksər müasir AD mühitləri üçün ADBA üstünlük verilən yanaşmadır. KMS domain-joined olmayan client-lər və ya qarışıq mühitlər üçün faydalı qalır.

## KMS vs ADBA

| | KMS | ADBA |
| --- | --- | --- |
| Minimum client sayı | 25 client / 5 server | Yoxdur |
| Domain join tələbi | Yox | Bəli |
| Aktivasiya harada yerləşir | KMS host | Active Directory |
| Redundancy | Tək host (HA üçün əlavə et) | AD redundancy-ni miras alır |
| Ən yaxşı istifadə | Workgroup və ya qarışıq mühit | Təmiz AD mühiti |

## Praktik nəticələr

- Müasir AD mühitində ADBA-nı KMS-dən üstün tutun
- TCP/1688-i public internetə açmayın
- KMS host-u patched saxlayın — köhnə host-lar yeni Windows versiyalarını aktivasiya etmək üçün update-ə ehtiyac duyur
- Quraşdırmadan sonra DNS-də `_VLMCS._TCP` SRV record-un mövcudluğunu yoxlayın (`nslookup -type=srv _vlmcs._tcp.<domain>`)

## Faydalı linklər

- KMS aktivasiya planlaması: [https://learn.microsoft.com/en-us/windows-server/get-started/kms-activation-planning](https://learn.microsoft.com/en-us/windows-server/get-started/kms-activation-planning)
- Active Directory-Based Activation: [https://learn.microsoft.com/en-us/windows-server/get-started/activation-adba](https://learn.microsoft.com/en-us/windows-server/get-started/activation-adba)
- Volume Licensing ümumi baxış: [https://www.microsoft.com/en-us/licensing](https://www.microsoft.com/en-us/licensing)
