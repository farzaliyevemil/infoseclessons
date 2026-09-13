---
id: compliance-frameworks
title: Uyğunluq Framework-ləri — ISO 27001, SOC 2, PCI DSS və Dostları
description: ISO 27001, SOC 2, PCI DSS, NIST CSF və GDPR əslində nə tələb edir, sertifikasiya attestasiya və qanundan necə fərqlənir, kontekstiniz üçün hansını seçməli və okeanı qaynatmadan necə hazırlanmalı.
slug: /grc/compliance-frameworks
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: grc
keywords:
  - uyğunluq
  - iso 27001
  - soc 2
  - pci dss
  - nist csf
  - gdpr
  - audit hazırlığı
  - grc
difficulty: intermediate
---

# Uyğunluq Framework-ləri — ISO 27001, SOC 2, PCI DSS və Dostları

Akronim divarı GRC-yə girişi qarşılayan ilk şeydir: ISO 27001, SOC 2, PCI DSS, NIST CSF, GDPR, HIPAA. Akronimləri **hər birinin nə tip öhdəlik olduğu** ilə sort etdikdə divarın arxasında sadə xəritə gizlənir — sertifikasiya oluna bilən menecment standartı, audit attestasiyası, kart-şəbəkəsi müqaviləsi, hüquqi regulasyon və ya könüllü framework. Bu dərs divarı sort edir, parçaların necə üst-üstə düşdüyünü göstərir və okeanı qaynatmadan hazırlıq yolunu qoyur. (Risk metodologiyasının özü və GDPR data-subject hüquqlarının detalları [Risk Management and Privacy](/grc/risk-and-privacy)-də yaşayır; burada framework-lərdə qalırıq.)

## Sıralama cədvəli

| Framework                     | Nədir                                                           | Kim tələb edir                                      | Scope                                     | "Kəsr" nəyə bənzəyir                                                             |
| ----------------------------- | --------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------- |
| **ISO 27001**                 | Sertifikasiya-oluna bilən **menecment-sistem** standartı (ISMS) | Müştərilər, regulasyonlar, tenderlər                | Bütün təşkilat (və ya elan olunmuş scope) | Akkreditə olunmuş CB-dən sertifikat, illik surveillance auditlərlə 3 il etibarlı |
| **SOC 2**                     | Servis kriteriyaları üzrə **attestasiya** (AICPA)               | SaaS/hosting müəssisə müştəriləri                   | Bir servis və ya sistem, bir təşkilat     | Audit hesabatı (Type 1 nokta-vaxtı; Type 2 3–12 ay üzərində)                     |
| **PCI DSS**                   | **Müqaviləli** kart-industriyası standartı (v4.x)               | Kart şəbəkələri / acquiring banklar                 | Yalnız cardholder data mühiti (CDE)       | QSA tərəfindən yoxlanılan ROC/SAQ və ya self-assessment                          |
| **NIST CSF / 800-53**         | Könüllü **framework / kontrol kataloqu**                        | ABŞ federal (orada məcburi), qalanları üçün təlimat | Nəyi xəritələsəniz                        | Sertifikat yoxdur — yetkinlik self-assessment                                    |
| **GDPR / HIPAA**              | **Qanun**                                                       | Regulyatorlar                                       | əhatə olunan datanın bütün emalı          | Sertifikat yoxdur — sübuta-əsaslanmış uyğunluq və ya cərimələr                   |
| **CIS Controls / Benchmarks** | Prioritetləşdirilmiş **hardening təlimatı**                     | Sığortaçılar, cyber-essentials sxemləri             | Sistem-başına                             | İmplementasiya qrupları (IG1–IG3)                                                |

Ən çox rast gəlinən qarışıqlıq: **ISO 27001 menecment sistemi sertifikatlaşdırır, təhlükəsizlik səviyyəsini yox.** Şirkət ISO-sertifikatlı ola və breach yaşaya bilər; sertifikat _prosesin_ mövcud olduğunu və audit edildiyini deyir, hər kontrolun mükəmməl olduğunu yox. Əksinə, SOC 2 bütün şirkət haqqında heç nə demir — yalnız hesabatın scope-dakı sistemlər haqqında.

## ISO 27001: menecment sistemi

ISO 27001-in əsas ideyası **Statement of Applicability (SoA) ətrafına sarılmış Plan-Do-Check-Act dövrüdür**: ISMS-i scope edirsiniz, risk qiymətləndirməsi aparırsınız, Annex A-dan kontrolları seçirsiniz (organizasiya, insan, fiziki və texnoloji temalarda 93 kontrol), hər include/exclude qərarını əsaslandırırsınız və sonra dövrün işlədiyini sübut edirsiniz — menecment review, daxili audit, düzəldici hərəkətlər, metriklər.

Auditorların əslində soruşduğu: firewall-ın olub-olmaması deyil, onun _niyə_ belə konfiqurasiya edildiyini bilib-bilməməniz, kimin review etdiyi və drift olanda nə baş verdiyidir. Ağır iş pulse-la-sənədlərdir: risk metodologiyası, asset inventarı, giriş review-ləri, incident prosesi, awareness training sübutları. Stage 1 audit sənədləri və hazırlığı review edir; Stage 2 sistemin işlədiyini test edir; surveillance auditlər illik davam edir; üçildə bir dəfə recertification.

**Kiçik şirkət üçün maya/əmək reallığı:** 6–12 aylıq hazırlıq, aylıq bir ciddi layihə — sertifikat security appliance-lərdə yox, spreadsheet-lərdə və review-lərdə qazanılır.

## SOC 2: SaaS vergisi

SOC 2 buludda-hosted hər şey üçün de-fakto müəssisə satış checklist-idir. AICPA Trust Services Kriteriyalarına görə bir _servisi_ qiymətləndirir — Security (məcburi), əlavə olaraq Availability, Confidentiality, Processing Integrity, Privacy.

- **Type 1** — kontroller bir vaxt nöqtəsində mövcud idi və düzgün dizayn olunmuşdu. Ucuz, sürətli, zəif: müştərilər getdikcə Type 2-də israr edir.
- **Type 2** — auditor bir dövr üzərində (3–12 ay) **operativ effektivliyi test edir**. Sübutlar audit pəncərəsindən _əvvəl_ yığılır: giriş review-ləri, change ticket-ləri, background yoxlamalar, vendor qiymətləndirmələr. Buna görə SOC 2 hazırlığı sənəd-sprinti deyil, 6+ aylıq iş-üsuludur.

Dəqiq amma qəraredici məqam: **auditor siyasətlərinizin söylədiyini test edir.** Reallıqdan qat-qat sərt siyasətlər öz-özünə yaratdığınız tapıntılardır. Faktiki dəstəkləyə bildiyiniz prosesi təsvir edən siyasətlər yazın, sonra sübutu avtomatlaşdırın (giriş review-ləri, MFA coverage, endpoint uyğunluğu) ki, audit pəncərəsi arxeologiya layihəsi yox, hesabat export-u olsun.

## PCI DSS: scope strategiyadır

PCI DSS kart datasını saxlayan, emal edən və ya ötürən hər kəsə tətbiq olunur və onun amansız dəahəti **scope**-dur: Cardholder Data Environment-ə toxunan hər şey tam 12-tələb dəstini miras alır — şəbəkə seqmentasiyası, şifrələmə, açar idarəetməsi, rüblük ASV skanları, penetration testing.

Maya baxımından sıralanmış strateji oynunuşlar:

1. **Kart datasına toxunmayın.** Payment provayderi vasitəsilə tokenizasiya (Stripe, Adyen) əksər tələbləri silir — QSA-nız sizi sevəcək.
2. **CDE-ni seqmentləşdirin və kiçildin.** Yaxşı izolyasiya olunmuş bir payment zonası üç "əksəriyyəti-uyğun" şəbəkədən üstündür.
3. **Sonra kiçik scope daxilində uyğun gəlin.** PCI layihələri kontrol çətinliyindən yox, scope genişlənməsində uğursuz olur.

## NIST CSF və CIS Controls: sertifikatların arxasındakı xəritələr

Heç biri heç nə sertifikatlaşdırmır və hər ikisi əksər sertifikatlardan daha gündəlik faydalıdır:

- **NIST CSF 2.0** — rəhbərliklə və sığortaçılarla yetkinlik müzakirələri üçün ümumi dil kimi altı funksiya (Govern, Identify, Protect, Detect, Respond, Recover).
- **NIST 800-53** — federal sistemlərin implementasiya etməli olduğu tam kontrol kataloqu; bir çox digər framework-ün borclandığı mənbə.
- **CIS Controls** — üç implementasiya qrupunda 18 kontrol, əmək-başına müdafiə dəyərinə görə qəsdən sıralanıb: IG1 "əsas cyber gigiyenası"dır (inventar, patchlər, uzaq girişdə MFA, backup-lar) ki, əmtəə hücumlarının əksəriyyətini dayandırır.

Yetkin komandaların praktik pattern-i: **bir daxili kontrol dəsti, bir çox framework-ə xəritələnmiş.** Kontrolu bir dəfə implement edin (məsələn, bütün uzaq girişdə MFA), ISO A.5.17, SOC 2 CC6.x, PCI 8.x, NIST CSF PR.AA-a xəritələyin — sonra hər audit yenidən-implementasiya əvəzinə yenidən-xəritələmə məşğə olur.

## Seçmək və sıralamaq

Böyüyən təşkilat üçün realist qərar yolu:

1. **İndi CIS IG1** — hər hansı sertifikatdan asılı olmayaraq ödəyən gigiyena.
2. İlk müəssisə müştəri tələb edəndə **SOC 2 Type 1**; dərhal sonra **Type 2 sübut toplamağna başlayın** (pəncərə satarkən işləyir).
3. Tender pipeline-ları, regulasiya olunmuş müştərilər və ya beynəlxalq genişlənmə menecment-sistem sertifikatını özünü ödəyən etdikdə **ISO 27001**.
4. **PCI DSS** yalnız kart-data footprintinizin məcbur etdiyi qədər — və əvvəlcə footprint-i ödəyin.
5. **GDPR/HIPAA-tipli öhdəliklər** menyu maddəsi deyil — data tipinə və yurisdiksiyaya görə tətbiq olunur; yuxarıdakı hər şeyin altında hüquqi döşəmə kimi qəbul edin.

## Okeanı qaynatmayan hazırlıq

- **Siyasətdən əvvəl inventar.** Hər framework-ün yarısı "asset və data axınlarını bil"dir — eyni inventar hamısına xidmət edir.
- **Bir kontrol kitabxanası, çoxlu xəritələmə.** Daxili matrix-i bir dəfə qurun; auditlər export-a çevrilir.
- **Sübutu avtomatlaşdırın.** Giriş review-ləri, MFA coverage, patch vəziyyəti, test olunan backup-lar — kontrolun sübutu əl-screenshot-idirsə, məşğul rübdə uğursuz olacaq.
- **Kağız-boşluğundan ehtiyatlanın.** Audit siyasət ilə təcrübə arasındakı məsafəni cəzalandırır. Etdiyinizi yazın, sonra yazdığınızı edin — bu qaydada, drift alertləri ilə.
- **Sertifikatı milestone kimi qəbul edin, hədəf kimi yox.** ISMS/hesabat/ROD məhsuldur; PDF onun qəbzidir.

## Növbəti addım

- [Risk Management and Privacy](/grc/risk-and-privacy) — yuxarıdakı hər framework-ü qidalandıran risk mühərriki.
- [Security Governance](/grc/security-governance) — framework-lərin asıldığı siyasətlər və rollar.
- [Security Controls](/grc/security-controls) — framework-lərin istədiyini implement etmək.
- [Vulnerability Management](/general-security/vulnerability-management) — auditlərin daim soruşduğu operativ dövr.
