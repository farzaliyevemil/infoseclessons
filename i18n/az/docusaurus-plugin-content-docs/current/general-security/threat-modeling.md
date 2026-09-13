---
id: threat-modeling
title: STRIDE ilə Threat Modeling
description: Kod mövcud olmazdan əvvəl dizayn xətalarını tapmaq — dörd-suallı çərçivə, element-başına STRIDE, data-flow diaqramları, hücum ağacları, risk ilə sıralama və real komandaların işlətdiyi praktik iş axınları (PASTA, agile 4-sual).
slug: /general-security/threat-modeling
sidebar_position: 20
status: reference
last_reviewed: 2026-09-14
category_key: general-security
keywords:
  - threat modeling
  - stride
  - data flow diagram
  - hücum ağacı
  - pasta
  - secure dizayn
  - sdlt
difficulty: intermediate
tags:
  - security-basics
  - intermediate
---

# STRIDE ilə Threat Modeling

Pentest-lər artıq ship olunmuş xətaları tapır; threat modeling onları hələ ucuz olanda — prodüksiyon patch-i əvəzinə whiteboard çizimi qiymətinə — tapır. O, bu konkret sistem üçün soruşulan intizamdır: **nə qururuq və nə səhv gedə bilər, buna nə edirik?** — qurularkən və qurularkən. Bu, "təhlükəsizlik testi edirik" ilə "təhlükəsiz sistemlər dizayn edirik" arasındakı ən böyük tək boşluqdur və CISSP, secure-dizayn müsahibələri və real arxitektura review-larının hamısı probe etdiyi bacarıqdır ([Enterprise Security Architecture](/general-security/enterprise-security-architecture)).

## Dörd sual

Faydalı hər threat model, akronimi nə olursa olsun, dörd sualı sıra ilə cavablandırır:

1. **Nə qururuq?** — proses deyil, data-flow diaqramı (DFD) kimi ifadə edilmiş.
2. **Nə səhv gedə bilər?** — həmin diaqrama tətbiq olunan sistematik texnika (aşağıda STRIDE).
3. **Buna nə edəcəyik?** — hər qəbul edilmiş təhdidə xəritələnmiş yumşaldıcılar: düzəlt, yumşald, transfer et (sığorta/müqavilə), və ya *imza ilə* qəbul et.
4. **Kifayət qədər yaxşı iş gördükmü?** — review kriteriyaları, izləmələr və dizayn dəyişikliyi üçün re-model trigger-i.

Miras aldığınız "threat model" 60-səhifəlik, heç kimin yenidən oxumadığı sənəddirsə, 4-cü sualda uğursuzdur. Artefakt son dizayn dəyişikliyi qədər canlıdır.

## Addım 1: sistemi DFD kimi çizin

DFD qutular və oxlardır, dörd element tipi, daha çox yox:

- **Process** (düzbucaqlar) — işləyən kod: API, worker, job.
- **Data store** (silindrlər) — DB, bucket, queue, cache.
- **Xarici entitet** (kvadrat küncli düzbucaqlar) — istifadəçilər, üçüncü-tərəf API-lər — idarə etmədiyiniz şeylər.
- **Data flow** (oxlar) — data hara hərəkət edir, *nə* və *necə qorunduğu* ilə etiketli.

Ən yayğın model-ləşdirmə xətası şəbəkə diaqramını çizməkdir. Threat modeling **trust sərhədləri** ilə maraqlanır — data bir etimad səviyyəsindən başqasına keçən hər məqam (internet→API, web→DB, bizim kod→üçüncü tərəf). Vulnerability-lərin əksəriyyəti məhz o oxlarda yaşayır. Faktiki olan axınları çizin, çirkin olanları da ("backend vendora statik API açarı ilə zəng edir") — çirkin olanlar incidentlərin çıxdığı yerdədir.

## Addım 2: element-başına STRIDE

STRIDE altı uğursuzluq kateqoriyasından ibarət checklist-dir, hər birinin DFD elementinə görə kanonik sualı var:

| Təhdid | Sual | Tətbiq olunduğu element | Nümunə tapıntı |
| --- | --- | --- | --- |
| **S**poofing | Bir şey burada identiklik təqlid edə bilərmi? | Xarici entitetlər, proseslər | Auth token query parametrindən qəbul olunur; webhook imzası yoxdur |
| **T**ampering | Data ötürmədə və ya istirahətdə dəyişdirilə bilərmi? | Data axınları, data store-lar | Client-dən göndərilən imzasız qiymət sahəsi; dəyişdirilə bilən audit log |
| **R**epudiation | Aktor etdiyini inkar edə bilərmi? | Proseslər, axınlar | Audit izi olmadan hərəkətlər; loglarda istifadəçi/request ID yoxdur |
| **I**nformation disclosure | Data olması lazım olmayan yerə sıza bilərmi? | Axınlar, store-lar | Detallı error səhifələri; digər tenant-ların sətirlərini sızan search endpoint |
| **D**enial of service | Bu tükəndirilə bilərmi? | Proseslər, store-lar | Pagination-sız report sorğusu; OTP göndərmədə rate limit yoxdur |
| **E**levation of privilege | İstifadəçi olmaması lazım olan bacarıqları əldə edə bilərmi? | Proseslər | IDOR; imzasız qəbul edilən rolu JWT; metadata-ya SSRF ([Cloud Pentest](/red-teaming/cloud-pentest)) |

Cədvəli element-element keçin — "bu ox üçün: S? T? R? I? D? E?" — azad-forma beyinfırtınası yox. Checklist çıxışı reviewer-lər arasında təkrarlanabilir edən şeydir. Microsoft-un EoP aləti və OWASP Threat Dragon DFD çizir və STRIDE prompt-ları yaradır; ticket-dəki whiteboard fotosu demək olar eyni işi görür.

Keyfiyyəti dərhal yüksəldən praktik məsləhət: hər **trust sərhədi** üçün STRIDE suallarını əvvəlcə verin. Sərhədlər tapıntıları, kənarlar bug-ları topladığı kimi toplayır.

## Sıralama: hər təhdid ticket-ə dəymir

Xam STRIDE çıxışı uzun siyahıdır; sıralama onu backlog-a çevirir. Hər təhdidi təşkilatın mövcud [risk metodologiyası](/grc/risk-and-privacy) ilə təsir × ehtimal üzrə ballandırın — və ya yüngülcə triaj edin: **lansmandan-əvvəl-məcburi-düzəliş** (təhlükəsizlik invariantını sındırır), **tez-düzəliş** (başqa kontrol ilə məhdudlaşır), **qəbul edilmiş** (sənədləşdirilmiş, qəbul edən sahibin adı və yenidən-review tarixi ilə). "Adı olan qəbul" intizamı threat modeling-i security teatrından ayıran şeydir: heç kimin sahib olmadığı qəbul edilmiş risk qəbul edilməmiş riskdir.

## Hücum ağacları: ən vacib təhdidlər üçün

Bir-iki crown-jewel ssenarisi üçün ("report DB-dən müştəri PII oğurluğu") STRIDE-dan dərinə **hücum ağacı** ilə gedın: kökdə hədəf, real hücumçunun zəncirlədiyi alt-məqsədlərin AND/OR budaqları. OR budaqları "hər hansı biri bəs edir" deməkdir — və qardaşları üçün müdafiənizdən ucuz olan hər yarpaq hücumçunun gedəcəyi yerdır. Hücum ağacları sizin diqqətlə möhkəmləndiyiniz login-in zəng-ID-ə güvənən şifrə reset-i ilə bypass olunduğunu kəşf etdiyiniz yerdir (məhz o insan qatı üçün [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures)).

## Real inkişaf dövrünə sığdırmaq

- **Dizayn review ritualı**: yeni trust sərhədli heç bir epic DFD + STRIDE keçidi olmadan ship olmur — dev, arxitektor və security ilə 45–60 dəqiqə. Threat modeling sənəd-sprinti deyil, *checklist ilə söhbətdir*.
- **Dizayn vaxtı agile 4-sual keçidi**; yeni xarici inteqrasiya və ya imtiyaz sərhədi görünəndə tam STRIDE yenidən.
- **Təhdidləri issue kimi izləyin**: `threat-model` etiketi ilə və DFD düyünündən link; dizayn dəyişəndə bağlı təhdidlər yenidən açılır.
- **PASTA** (Process for Attack Simulation and Threat Analysis) regulyator kontekstlər üçün daha ağır yeddi-mərhələli alternativdir — eyni təyinata, daha çox mərasimə; STRIDE-per-element əksər komandaların ehtiyacını ödəyir.
- **Deteksiyalara ötürün**: hər qəbul-amma-monitör olunan təhdidin [SIEM](/blue-teaming/siem-fundamentals)-də uyğun alert-i olmalıdır — model detection engineering-ə "heç vaxt olmamalıdır"ın nəyə bənzədiyini deyir.

## Növbəti addım

- [Enterprise Security Architecture](/general-security/enterprise-security-architecture) — modellərin arxitektura təcrübəsindəki yeri.
- [OWASP Top 10](/red-teaming/owasp-top-10) — modelinizin proqnozlaşdırdığı implementation bug-ları.
- [Security Controls](/grc/security-controls) — xəritələyəcəyiniz yumşaldıcılar.
- [Secure App Development](/general-security/secure-app-development) — yumşaldıcıları kodda bərqərar etmək.
