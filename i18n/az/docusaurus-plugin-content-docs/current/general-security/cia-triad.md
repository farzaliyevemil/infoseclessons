---
id: cia-triad
title: CIA və DAD Triadaları, Authenticity və Non-repudiation
description: CIA və DAD triadalarını, həqiqiliyi və sonradan inkar edilməməni aydın təriflər, nümunələr və qısa CEH testi ilə öyrənin.
slug: /general-security/cia-triad
sidebar_position: 3
status: foundation
last_reviewed: 2026-09-20
keywords:
  - cia triad
  - dad triad
  - confidentiality
  - integrity
  - availability
  - authenticity
  - non-repudiation
difficulty: foundation
tags:
  - security-basics
  - beginner
  - ceh
---

# CIA və DAD Triadaları, Authenticity və Non-repudiation

İnformasiya təhlükəsizliyi məlumatı və onu saxlayan, emal edən, ötürən sistemləri qoruyur. **CIA** üç əsas məqsədin ingilis adlarının baş hərfləridir: **Confidentiality** (məxfilik), **Integrity** (bütövlük), **Availability** (əlçatanlıq). CEH v13 Module 01 bunlara **Authenticity** (həqiqilik) və **Non-repudiation** (sonradan inkar edilməmə) xüsusiyyətlərini də əlavə edir. Bu beş anlayış hadisənin *nəyə* zərər verdiyini dəqiq deməyə kömək edir.

## CIA triadası

| English term | Azərbaycan dilində mənası | Pozulma nümunəsi | Tipik qoruma |
|---|---|---|---|
| **Confidentiality** | Məlumatı yalnız səlahiyyətli şəxslər görə bilər. | Tələbə başqasının qiymətlərini oxuyur. | Giriş hüquqları və şifrələmə. |
| **Integrity** | Məlumat düzgün qalır və icazəsiz dəyişdirilmir. | Kimsə qiyməti 60-dan 90-a dəyişir. | Yazma hüququnun məhdudlaşdırılması, dəyişiklik qeydləri və bütövlük yoxlaması. |
| **Availability** | Səlahiyyətli şəxslər məlumatdan və xidmətdən lazım olanda istifadə edə bilir. | Qeydiyyat vaxtı qiymət portalı açılmır. | Ehtiyat sistem, monitorinq və yoxlanmış bərpa. |

### Confidentiality — kim oxuya bilər?

Məxfilik məlumat onu görməməli olan şəxsə çatanda pozulur. Həmin şəxs heç nəyi dəyişməyə və silməyə bilər. Yanlış ünvana göndərilmiş məktub da, hücumçunun gizli bazanı oxuması da məxfilik problemidir. Data təsnifatı həssas məlumatı müəyyən edir; giriş hüquqları və şifrələmə ona girişi məhdudlaşdırmağa kömək edir.

### Integrity — məlumat hələ də düzgündürmü?

Bütövlük məlumat lazımi icazə olmadan dəyişəndə və ya korlananda pozulur. Buna hücumçu, səhv proqram və ya insan xətası səbəb ola bilər. Məsələn, idxal skripti tələbənin qiymətini təsadüfən yazıb dəyişərsə, heç kim zərər vermək istəməsə belə bütövlük problemi var. Hash və checksum dəyişiklikləri göstərə bilər; giriş nəzarəti və audit qeydləri isə dəyişikliklərin qarşısını almağa və araşdırmağa kömək edir. Tək bir hash dəyişikliyi kimin etdiyini sübut etmir.

### Availability — səlahiyyətli istifadəçi çata bilirmi?

Əlçatanlıq xidmət və ya məlumat lazım olan vaxt istifadə edilə bilməyəndə pozulur. DDoS hücumu, disk nasazlığı və elektrik kəsilməsi buna səbəb ola bilər. Backup bərpaya, ehtiyat sistem və monitorinq isə xidmətin davamlı işləməsinə kömək edir. Backup-un olması kifayət deyil; ondan bərpa prosesi də yoxlanmalıdır.

**Bir hadisə bir neçə sütuna təsir edə bilər.** Ransomware məlumatı dəyişdirə və ya şifrələyərək əlçatmaz edə bilər. Hücumçu məlumatı kopyalayarsa, məxfilik də pozulur. CIA hücumçunun motivini deyil, nəticəni təsnif edir.

## DAD triadası: CIA pozulanda nə baş verir?

**DAD** üç arzuolunmaz nəticənin ingilis adlarının baş hərfləridir: **Disclosure** (açıqlanma), **Alteration** (dəyişmə) və **Denial** (əlçatanlığın itməsi). Bu, CIA-nın əks tərəfini yadda saxlamaq üçün sxemdir; yeni təhlükəsizlik məqsədləri siyahısı deyil.

| Qorunan CIA xüsusiyyəti | DAD nəticəsi | Sadə nümunə |
|---|---|---|
| **Confidentiality** | **Disclosure** — məlumat icazəsiz şəxsə çatır. | Kimsə gizli qiymət hesabatını oxuyur. |
| **Integrity** | **Alteration** — məlumat icazəsiz dəyişir və ya korlanır. | Qiymət 60-dan 90-a dəyişir. |
| **Availability** | **Denial** — səlahiyyətli şəxs xidmətdən istifadə edə bilmir. | Qiymət portalı açılmır. |

**İstiqaməti yadda saxla:** CIA müdafiəçinin qorumaq istədiyini, DAD isə zərərli nəticəni göstərir. Təsadüfi xəta da disclosure, alteration və ya denial yarada bilər. Buradakı **Denial** girişin itirilməsidir; əmələ dair sübutla bağlı olan **Non-repudiation** ilə qarışdırılmamalıdır.

## CEH-də əlavə iki xüsusiyyət

### Authenticity — mənbə həqiqidirmi?

**Authenticity** şəxs, mesaj və ya sənədin həqiqətən iddia edilən mənbədən gəlib-gəlmədiyini bildirir. Tələbə elektron transkriptin universitet tərəfindən verildiyini yoxlaya bilməlidir. **Authentication** isə kimlik və ya mənbəni yoxlama *prosesidir*: məsələn, giriş zamanı əlavə kod və ya rəqəmsal sertifikatın yoxlanması. Xüsusiyyətlə yoxlama prosesini qarışdırmayın.

### Non-repudiation — əməli sonradan inkar etmək olarmı?

**Non-repudiation** iştirakçının sonradan inkar edə biləcəyi əməli ona bağlayan etibarlı sübutun olmasıdır. Düzgün yoxlanmış rəqəmsal imza səlahiyyətli əməkdaşı məhz imzaladığı transkriptə bağlaya bilər. Sübutun gücü kimliyin düzgün yoxlanmasından, imza açarına yalnız həmin şəxsin nəzarətindən və qeydlərin qorunmasından asılıdır. Göndərənin imzası sənədin qarşı tərəfə çatdığını və ya onun tərəfindən oxunduğunu öz-özünə sübut etmir; qəbul üçün ayrıca sübut lazımdır. Dəstəkləyici mexanizmlər [AAA və Non-repudiation](./aaa-non-repudiation.md) dərsində izah edilir.

## Bir nümunə, beş sual

Universitet tələbəyə portal vasitəsilə elektron transkript verir:

1. **Confidentiality:** onu yalnız tələbə və səlahiyyətli əməkdaşlar görə bilirmi?
2. **Integrity:** qiymətlər təsdiqdən sonra dəyişməyibmi?
3. **Availability:** tələbə sənədi lazım olanda əldə edə bilirmi?
4. **Authenticity:** tələbə sənədin universitetdən gəldiyini yoxlaya bilirmi?
5. **Non-repudiation:** sənədi kimin imzaladığını və ya təsdiqlədiyini göstərən etibarlı sübut varmı?

Bu suallar *eyni* sənədin müxtəlif xüsusiyyətlərinə baxır. Etibarlı imza giriş nəzarətini və ya xidmətin əlçatanlığını əvəz etmir.

## Exam Focus / Yadda saxla

- **CIA = Confidentiality + Integrity + Availability.** Authenticity və Non-repudiation CEH mənbəyində əlavə xüsusiyyətlərdir; CIA akroniminin hərfləri deyil.
- İcazəsiz **oxuma** → Confidentiality; icazəsiz **dəyişmə** → Integrity; xidmətin **işləməməsi** → Availability.
- **DAD = Disclosure + Alteration + Denial:** C, I və A-nın uyğun pozulma nəticələri.
- **Authenticity** mənbənin həqiqiliyini soruşur; **Authentication** onun yoxlanması prosesidir.
- **Non-repudiation** əmələ dair sübutdur. Mesajın oxunduğunu və ya qəbul edildiyini avtomatik sübut etmir.

## Qısa test

1. İstifadəçi gizli faylı görür, amma dəyişmir. CIA-nın hansı sütunu pozulub?
2. İdxal skripti ödəniş məbləğini təsadüfən dəyişir. Hansı sütun pozulub?
3. İmzalı sənəd göndərilib, amma çatdırılma sübutu yoxdur. İmza təkbaşına qəbulu sübut edirmi?
4. Authenticity ilə Authentication arasındakı fərq nədir?
5. Xidmətin işləməməsi DAD-də hansı terminlə adlanır?

**Cavablar:** 1. Confidentiality. 2. Integrity. 3. Xeyr. 4. Authenticity xüsusiyyətdir; Authentication yoxlama prosesidir. 5. Denial.
