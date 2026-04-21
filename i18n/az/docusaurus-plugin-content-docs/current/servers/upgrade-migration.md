---
id: upgrade-migration
title: Upgrade, Update və Migration
description: "Windows Server-də upgrade, update və migration fərqləri: dəstəklənən yollar, ADBA aktivasiyası və qərar bələdçisi."
slug: /servers/upgrade-migration
sidebar_position: 8
status: reference
last_reviewed: 2026-04-22
keywords:
  - upgrade
  - update
  - migration
  - in-place upgrade
  - adba
---

# Upgrade, Update və Migration

Windows Server mühitlərini saxlayarkən üç əlaqəli amma fərqli termin qarşıya çıxır. Onları qarışdırmaq lifecycle layihəsini planlaşdırarkən tez-tez qarşılaşılan çaşqınlıq mənbəyidir.

| Termin | Mənası |
| --- | --- |
| **Upgrade** | Eyni fiziki serveri saxlamaq, OS-i yeni versiyaya yüksəltmək |
| **Update** | Eyni OS versiyası daxilində patch tətbiq etmək |
| **Migration** | Data və rolları köhnə sistemdən yeni sistemə köçürmək |

## Upgrade

**Upgrade** mövcud fiziki və ya virtual serveri saxlayır, əməliyyat sistemini yeni major versiyaya yüksəldir.

**Nümunə:** Windows Server 2019 işlədən server in-place olaraq Windows Server 2025-ə upgrade edilir. Hardware və server identity eyni qalır; yalnız OS versiyası dəyişir.

**Üstünlükləri:**
- Yeni hardware almaqdan daha ucuz
- Server identity-sini, rolları və konfiqurasiyanı qoruyur

**Çatışmazlıqları:**
- Yeni OS bu hardware-də düzgün işləmirsə, asanlıqla rollback etmək olmur
- Yığılmış drift, zibil və legacy config irəli aparılır
- Alt hardware yenilənmir

ADBA və buna bənzər identity-aware feature-lər üçün upgrade yolunun əlavə ön şərtləri var:

- Schema versiyası ən azı Windows Server 2012 olmalıdır
- Forest və domain funksional səviyyələri ADBA-nın özü üçün qaldırılmalı deyil
- Schema yeniləndikdən sonra, köhnə domain controller-lər də ADBA client-ləri aktivasiya edərkən iştirak etməyə davam edə bilər

## Migration

**Migration** — data, rol və xidmətləri köhnə sistemdən yeni sistemə köçürür. Adətən bu yeni fiziki və ya virtual server qurmaq, təmiz OS quraşdırmaq və sonra iş yükünü köçürmək deməkdir.

**Nümunə:** Windows Server 2012 işlədən köhnə HP server hələ də ehtiyacınız olan datanı saxlayır. Yeni server alırsınız, üzərinə Windows Server 2025 quraşdırırsınız, data və rolları köçürürsünüz, sonra köhnə hardware-i istismardan çıxarırsınız.

**Üstünlükləri:**
- Təzə, təmiz OS quraşdırma — yığılmış drift yoxdur
- Asan rollback: köhnə sistem istismardan çıxarılana qədər hələ də oradadır
- Eyni zamanda hardware modernləşdirmək üçün təbii fürsət

**Çatışmazlıqları:**
- Daha bahalıdır — yeni hardware/VM tutumuna ehtiyacınız var
- In-place upgrade-dan daha çox planlaşdırma və koordinasiya tələb edir

### Upgrade vs migration

| | Upgrade | Migration |
| --- | --- | --- |
| Fiziki server | Eyni qalır | Yeni hardware (və ya yeni VM) |
| Data | Yerindədir | Köçürülür |
| Rollback | Çətindir | Asan (köhnə sistem hələ mövcuddur) |
| Xərc | Aşağı | Yüksək |
| Tövsiyə olunur | Sadə versiya dəyişikliyi | Hardware yenilənməsi, legacy təmizlənməsi |

## In-place upgrade yolları

Microsoft hansı əvvəlki Windows Server versiyalarının hər yeni release-ə birbaşa upgrade edilə biləcəyini sənədləşdirir. Windows Server 2025 üçün hazırda dəstəklənən in-place upgrade-lər:

| Mövcud OS | Upgrade hədəfi |
| --- | --- |
| Windows Server 2012 R2 | Windows Server 2025 |
| Windows Server 2016 | Windows Server 2025 |
| Windows Server 2019 | Windows Server 2025 |
| Windows Server 2022 | Windows Server 2025 |

> Preview və Evaluation edisiyaları upgrade mənbəyi kimi **dəstəklənmir**. Planlaşdırmadan əvvəl həmişə Microsoft-un cari upgrade matrix-inə baxın — dəstəklənən yollar hər major release ilə dəyişir.

## Upgrade sizə nə verir (və nə vermir)

Upgrade eyni maşında yeni OS verir, mövcud rollar, yerli istifadəçilər və konfiqurasiyanın əksəriyyəti qorunur.

Sizə **vermədikləri:**

- Production-da upgrade uğursuz olsa rollback — backup-dan restore təhlükəsizlik toruldur
- Yığılmış drift-in təmizlənməsi (köhnə scheduled task-lar, köhnə registry qeydləri, tərk edilmiş feature-lər)
- Hardware yenilənməsi

Bu səbəbdən təmiz quraşdırma + migration çox vaxt production identity iş yükləri üçün (xüsusilə domain controller-lər) üstünlük verilir.

## ADBA (Active Directory-Based Activation)

ADBA Windows və Office-i ayrıca KMS host-a ehtiyac olmadan Active Directory membership vasitəsilə aktivasiya edir. Domain-joined maşın AD-yə autentifikasiya olunduqda aktivasiya bu prosesin hissəsi kimi baş verir.

**Tələblər:**
- Schema versiyası ən azı Windows Server 2012
- Forest və domain funksional səviyyələri ADBA-nın özü üçün qaldırılmalı deyil
- Schema yeniləndikdən sonra köhnə domain controller-lər də xidmət göstərməyə davam edə bilər, ADBA client-ləri aktivasiya edir

ADBA tək KMS host-dan daha etibarlı və redundant-dır, çünki AD-nin artıq multi-DC redundancy-si var. Müasir mühitlərdə adətən üstünlük verilən aktivasiya yanaşmasıdır — detallı müqayisə üçün [KMS dərsinə](/servers/kms) baxın.

## Doğru yanaşmanı seçmək

```
Mövcud server sağlamdır, yalnız OS köhnəlib
    → Upgrade (in-place)

Hardware də köhnəlib və ya təmiz başlanğıc və kritik data istəyirsiniz
    → Migration

Hər ikisi lazımdır
    → Əvvəl migrate et (yeni hardware-ə), sonra lazım olsa upgrade et
```

## Praktik nəticələr

- Upgrade-ləri həmişə əvvəl lab və ya staging mühitində test edin
- In-place upgrade-dən əvvəl tam backup alın
- Domain controller-lər üçün migration (yeni DC, replikasiya, köhnəni demote etmə) adətən in-place upgrade-dan daha təhlükəsizdir
- Upgrade/migration planını, o cümlədən rollback addımlarını sənədləşdirin
- Microsoft-un cari dəstəklənən upgrade matrix-ini yoxlayın — köhnə sənədlərə güvənməyin

## Faydalı linklər

- Windows Server upgrade ümumi baxış: [https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-overview](https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-overview)
- Windows Server migration: [https://learn.microsoft.com/en-us/windows-server/get-started/windows-server-migration](https://learn.microsoft.com/en-us/windows-server/get-started/windows-server-migration)
- Windows Server 2025-ə upgrade: [https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-2025](https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-2025)
