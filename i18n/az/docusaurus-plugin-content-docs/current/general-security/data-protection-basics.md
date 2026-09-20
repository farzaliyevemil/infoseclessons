---
id: data-protection-basics
title: Data Vəziyyətləri, Minimizasiya və Kimlikdən Ayrılma
description: Data at rest, in transit və in use anlayışlarını, minimizasiya, masking və tokenisation ilə məlumatın təsirinin azaldılmasını öyrənin.
slug: /general-security/data-protection-basics
sidebar_position: 6
status: foundation
last_reviewed: 2026-09-20
keywords:
  - data at rest
  - data in transit
  - data in use
  - data minimisation
  - tokenisation
difficulty: foundation
tags:
  - data-security
  - privacy
---

# Data Vəziyyətləri, Minimizasiya və Kimlikdən Ayrılma

[CIA triadası](./cia-triad.md) nəyin qorunacağını göstərir. Bu dərs **həssas məlumatın harada olduğunu** və **onun nə qədərinin ümumiyyətlə saxlanmalı olduğunu** soruşur. Eyni məlumatın müxtəlif nüsxələri eyni vaxtda fərqli vəziyyətlərdə ola bilər; bütün dataset-ə tək dəyişməz vəziyyət etiketi vermək əvəzinə hər nüsxə və ötürməyə baxın.

## Üç data vəziyyəti

| English term | Mənası | Nümunə | Uyğun qoruma |
|---|---|---|---|
| **At rest** | Aktiv ötürülməyən və emal edilməyən saxlanmış məlumat | Verilənlər bazası faylı və ya backup | Giriş hüquqları, saxlanma şifrələməsi, təhlükəsiz backup |
| **In transit** | Sistemlər arasında hərəkət edən məlumat | Tələbə transkripti şəbəkə ilə yükləyir | TLS, təhlükəsiz ötürmə protokolu, qarşı tərəfin yoxlanması |
| **In use** | Emal edilən və ya ekranda göstərilən məlumat | Transkript brauzerdə açıqdır və ya yaddaşa yüklənib | Sessiya nəzarəti, minimum səlahiyyət, cihazın qorunması |

**Nümunə:** transkript universitet bazasında saxlanır, qorunan bağlantı ilə tələbənin brauzerinə ötürülür və cihazında göstərilir. Bir nüsxə saxlanarkən digəri ötürülə, üçüncüsü isə istifadə edilə bilər. Disk şifrələməsi açıq brauzer sessiyasını qorumur; TLS də bazadakı faylı kimin aça biləcəyini müəyyən etmir.

## Az toplayın və az saxlayın

**Data minimisation** müəyyən məqsəd üçün yalnız lazım olan məlumatı toplamaq və onu əsaslandırılmış müddətdən artıq saxlamamaqdır. Bu, hücum zamanı açıla biləcək məlumatın miqdarını və qoruma yükünü azaldır.

1. **Az toplayın:** tələbə qeydiyyatı doğum tarixini tələb etmirsə, onu istəməyin.
2. **Girişi məhdudlaşdırın:** hər rola yalnız işi üçün lazım olan sahələri göstərin.
3. **Saxlama müddəti qoyun:** biznes və hüquqi ehtiyaclara əsaslanan sənədləşdirilmiş müddət təyin edin.
4. **Təhlükəsiz silin:** əsas nüsxə, export və backup-ların silmə qaydasına uyğun işlənməsini yoxlayın. Təkcə fayl adının silinməsi hər daşıyıcıdan bərpa ehtimalını aradan qaldırmaya bilər.

## Qalan məlumatı daha az açıqlayıcı edin

| English term | Əsas fikir | Nümunə | Vacib məhdudiyyət |
|---|---|---|---|
| **Masking** | Görünüşdə dəyərin bir hissəsini gizlədir | Kartın yalnız son dörd rəqəmini göstərir | Əsl dəyər bazada qala bilər. |
| **Tokenisation** | Dəyəri token ilə əvəz edir, uyğunlaşdırma cədvəlini ayrıca saxlayır | Ödəniş tətbiqi kart nömrəsi yerinə token saxlayır | Token vault və ona giriş yenə qorunmalıdır. |
| **Pseudonymisation** | Birbaşa identifikatorları nəzarətli yenidən bağlama imkanı ilə əvəz edir | Tələbə adı yerinə tədqiqat ID-si | Yenidən müəyyən etmək mümkündürsə, data şəxsi məlumat olaraq qala bilər. |
| **Anonymisation** | Şəxsin ağlabatan üsulla müəyyən edilməməsi üçün məlumatı işləyir | Uyğun şəkildə ümumiləşdirilmiş statistikanı dərc edir | Zəif hazırlanmış nəticə şəxsi yenidən müəyyən etməyə imkan verə bilər. |

**Hashing avtomatik anonymisation deyil.** E-poçt ünvanı kimi təxmin edilən identifikatorun adi hash-ı çox vaxt sınaqla tapılıb uyğunlaşdırıla bilər. Metod seçimi məlumatı alan şəxsin onunla nə etməli olduğundan asılıdır.

## Exam Focus / Yadda saxla

- **At rest / in transit / in use** nüsxə və ya əməliyyatı təsvir edir; bütün dataset üçün bir-birini istisna edən daimi etiket deyil.
- Hər vəziyyəti öz sərhədində qoruyun; tək şifrələmə ayarı bütün istifadə formalarını əhatə etmir.
- **Minimisation** toplama və saxlamanı azaldır. **Masking** görünüşü dəyişir; **tokenisation** dəyəri qorunan uyğunlaşdırma ilə əvəz edir.
- [DLP](./data-loss-prevention.md) məlumatın riskli hərəkətini izləyir; minimizasiya və giriş nəzarətini əvəz etmir.

## Qısa test

1. Hesabat serverdə saxlanır və brauzerdə açıqdır. Onun nüsxələri eyni vaxtda iki vəziyyətdə ola bilərmi?
2. Kartın ilk on iki rəqəminin gizlədilməsi əsl dəyəri bazadan silirmi?
3. E-poçt ünvanının adi hash-ı avtomatik anonim sayılırmı?

**Cavablar:** 1. Bəli. 2. Xeyr. 3. Xeyr.

## Əlaqəli dərslər

Şifrələmə və hashing üçün [Cryptography Basics](./cryptography/cryptography-basics.md), məxfilik öhdəlikləri və saxlama qərarları üçün [Risk Management and Privacy](../../grc/risk-and-privacy.md) məqalələrinə baxın. Bu, saytın köhnə CIA məqaləsindən ayrılıb yenidən işlənmiş orijinal tədris mətnidir.
