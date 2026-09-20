---
id: data-loss-prevention
title: Data Loss Prevention (DLP)
description: DLP-nin həssas məlumatı necə tapdığını, riskli ötürmələri izlədiyini və log, xəbərdarlıq, bloklama və karantin tədbirlərini öyrənin.
slug: /general-security/data-loss-prevention
sidebar_position: 5
status: foundation
last_reviewed: 2026-09-20
keywords:
  - DLP
  - data loss prevention
  - endpoint DLP
  - network DLP
difficulty: foundation
tags:
  - data-security
  - security-controls
---

# Data Loss Prevention (DLP)

**DLP — Data Loss Prevention** həssas məlumatı müəyyən edən və onun uyğun olmayan yerə ötürülməsinə cavab verən qayda və alətlər toplusudur. Praktik sualı belədir: **“Hansı məlumat, hansı kanaldan çıxır və bu ötürməyə icazə varmı?”** DLP əsasən [məxfiliyi](./cia-triad.md) dəstəkləyir; onunla yanaşı giriş nəzarəti, təlim və monitorinq də lazımdır.

## DLP qaydası necə işləyir?

1. **Məlumatı tanıyır:** təsnifat etiketi, sənəd izi, dəqiq uyğunluq və ya nümunə onun həssas olduğunu göstərə bilər. Təkcə 16 rəqəm görmək ödəniş kartını sübut etmir; yoxlama və kontekst yanlış siqnalları azaldır.
2. **Kanalı izləyir:** məhsulun qurulduğu yerdən asılı olaraq e-poçt, web upload, cloud paylaşımı, USB köçürmə, çap və ya clipboard.
3. **Konteksti nəzərə alır:** kim göndərir, kimə, hansı cihazdan, nə qədər və hansı qaydaya əsasən?
4. **Tədbir görür:** log yazır, xəbərdarlıq edir, bloklayır və ya karantinə alır. İcazəli istisnanın məsul şəxsi və audit izi olmalıdır.

## Nəzarət harada işləyir?

| Növ | Nəyi görə bilər? | Tipik kor nöqtə |
|---|---|---|
| **Endpoint DLP** | İdarə olunan cihazda USB köçürmə və dəstəklənən tətbiqlərdən upload kimi fəaliyyətləri | İdarə olunmayan və ya offline cihazlar; agentin əhatə etmədiyi kanallar |
| **Network DLP** | Yoxlanılan gateway və ya proxy-dən keçən trafiki | Yoxlana bilməyən şifrəli trafik; gateway-dən yan keçən trafik |
| **Cloud/SaaS DLP** | Bağlanmış cloud xidmətində məlumat və paylaşma əməliyyatlarını | İnteqrasiyadan kənar xidmət və şəxsi hesabları |

Heç bir növ hər şeyi görmür. Nəzarəti həssas məlumatın həqiqətən hərəkət etdiyi kanala uyğun seçin.

## Əsas tədbirlər

| Tədbir | Nəticə | Nə vaxt uyğundur? |
|---|---|---|
| **Log** | İstifadəçiyə mane olmadan hadisəni qeydə alır | Yeni qaydanı tənzimləmək və normal fəaliyyəti öyrənmək |
| **Warn / alert** | İstifadəçini yenidən düşünməyə çağırır və komandanı xəbərdar edir | Təsadüfi paylaşım ehtimalı yüksəkdir; əsaslandırılmış istisna mümkündür |
| **Block** | Ötürməyə icazə vermir | Yüksək əminlikli və ciddi məlumat sızması riski |
| **Quarantine** | Fayl və ya məktubu baxış üçün saxlayır | Data sahibi və ya təhlükəsizlik əməkdaşının qərarı lazımdır |

### İşlənmiş nümunə

Əməkdaş müştərilərin ödəniş məlumatları olan cədvəli şəxsi e-poçt ünvanına göndərmək istəyir. DLP qaydası həssas məlumatı tanıyır, ünvanın təşkilat xaricində olduğunu yoxlayır və məktubu bloklayır. İstifadəçi səbəbi və məlumatı bölüşməyin icazəli yolunu görür. Təhlükəsizlik komandası isə bütöv cədvəli ticket-ə kopyalamadan araşdırma üçün kifayət qədər metadata alır.

Bu qayda təsadüfi sızmanı azaldır. Lakin əməkdaşın cədvəli əvvəldən oxumasına imkan verən həddən artıq geniş fayl icazəsini **düzəltmir**. Bunun üçün [identity and access management](./iam-account-management.md) lazımdır. Ekranın şəkli də çəkilə bilər; buna görə DLP qoruma qatıdır, tam zəmanət deyil.

## Exam Focus / Yadda saxla

- **Discovery** həssas məlumatı tapır; **enforcement** ötürmə cəhdinə cavab verir.
- Endpoint, network və cloud DLP fərqli yerləri görür və fərqli kor nöqtələri var.
- **Log, warn, block və quarantine** fərqli qayda nəticələridir.
- DLP **Confidentiality** qorunmasına kömək edir. Giriş hüquqlarını və [data minimizasiyasını](./data-protection-basics.md) əvəz etmir.

## Qısa test

1. İdarə olunan noutbukda USB köçürməni hansı DLP növü daha yaxşı görə bilər?
2. Network gateway niyə uzaqdan işləyən şəxsin upload-unu görməyə bilər?
3. E-poçtun bloklanması həddən artıq geniş fayl oxuma hüququnu düzəldirmi?

**Cavablar:** 1. Endpoint DLP. 2. Trafik gateway-dən yan keçə və ya yoxlana bilməyən şifrəli formada qala bilər. 3. Xeyr; fayl icazəsi ayrıca düzəldilməlidir.

## Əlaqəli dərslər

DLP-nin daha geniş nəzarət proqramındakı yerini [security control kateqoriyaları və növləri](../../grc/security-controls.md), həssas məlumatın miqdarının azaldılmasını isə [data vəziyyətləri və minimizasiya](./data-protection-basics.md) dərsində oxuyun. Bu məqalə saytın köhnə CIA yazısından ayrılıb yenidən işlənmiş orijinal tədris mətnidir; CEH Module 01-in ayrıca mövzusu deyil.
