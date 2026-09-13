---
id: devsecops-pipeline-security
title: DevSecOps — CI/CD Pipeline-nın Təhlükəsizləşdirilməsi
description: Təhvil pipeline-ına təhlükəsizlik qoşmaq — shift-left vs shift-right, SAST/DAST/SCA/secrets-scanning müqayisəsi, təchizat-zənciri təhlükəsizliyi (SBOM, asılılıq pinning, imzalama), pipeline hardening və təhvili boğmayan darvazalar.
slug: /general-security/devsecops-pipeline-security
sidebar_position: 22
status: reference
last_reviewed: 2026-09-14
category_key: general-security
keywords:
  - devsecops
  - ci cd təhlükəsizliyi
  - sast
  - dast
  - sca
  - secrets scanning
  - sbom
  - təchizat zənciri
difficulty: intermediate
tags:
  - security-basics
  - intermediate
---

# DevSecOps — CI/CD Pipeline-nın Təhlükəsizləşdirilməsi

Pipeline kodun prodüksiyona çevrildiyi yerdir — bu, onu həm vulnerability-ləri yaxalamaq üçün ən yaxşı məkan edir (avtomatik, hər commit-də, mayaya düşməzdən əvvəl), həm də birbaşa hücum hədəfi (bir CI sistemi kompromitə edin və saxladığı hər credential-i miras alın). DevSecOps hər ikisini düzgün etmək intizamıdır: **təhvildə avtomatlaşdırılmış təhlükəsizlik yoxlamaları və özü hardened olan təhvil sistemi.** Bu dərs skaner mənzərəsini, təchizat-zənciri kontrollarını və pipeline hardening checklist-ini əhatə edir — real problemləri yaxalayan, amma təhvili boğmayan darvazalarla.

## Shift-left və shift-right: nə hara köçür

- **Shift-left** = problemləri mümkün qədər erkən tapmaq: dizaynda [threat modeling](/general-security/threat-modeling), pull request-də SAST, pre-commit-də secrets scanning. Ən ucuz düzəlişlər, developer-dostlu kontekst.
- **Shift-right** = həqiqətin yaşadığı prodüksiyonda test etməyə davam: staging-ə qarşı DAST, runtime qoruma, kaos və sui-istifadə testləri, prodüksiyon tapıntılarının pipeline-a geri qidalandırılması.

Yetkin pipeline hər ikisini işlədir; ən böyük tək səhv ağır skaner alıb, rübdə bir dəfə işlətmək və heç kimin oxumadığı 4.000-tapıntılıq PDF-ə batmaqdır.

## Skaner mənzərəsi (hər biri faktiki nə üçündür)

| Sinif | Nəyi yoxlayır | Nəyi yaxalayır | Nümayəndə alətlər |
| --- | --- | --- | --- |
| **SAST** | Mənbə kod, statik | Injection zəiflikləri, hardcoded credential-lər, təhlükəsiz-olmayan API-lər | Semgrep, SonarQube, CodeQL |
| **DAST** | İşləyən app, xaricdən | Runtime misconfig, auth bypass-ları, injection təsdiqləri | ZAP, Burp Suite Enterprise |
| **SCA** | Asılılıqlar və lisenziyalar | Bilinen zəif kitabxanalar (Log4Shell sinfi), tərk edilmiş paketlər | Dependabot, Snyk, OWASP Dependency-Check |
| **Secrets scanning** | Commit-lər, diff-lər, tarixçələr | Git-ə itələnən API açarları, token-lər, private key-lər | Gitleaks, TruffleHog, provayder push protection |
| **IaC scanning** | Terraform/K8s tərifləri | Public S3 bucket-lər, açık security group-lar, imtiyazlı konteynerlər | Checkov, tfsec, KICS |
| **Container scanning** | Imagelər və qatlar | Base image CVE-ləri, gömülü sirrlər, yanlış istifadəçi | Trivy, Grype |

Skaner yorğunluğunun qarşısını alan iki qayda. **Birincisi, secrets scanning və SCA ilə başlayın** — false-positive səsi demək olar yoxdur və ən çox rast gəlinən iki real-breach səbəbini (sızan açarlar, zəif asılılıqlar) əhatə edir. **İkincisi, hər darvaza triage SLA ilə gəlir**: sahibi olmayan 30 günlük tapıntı proqramın işləyib-işləmədiyinə qərar verən metrikdir. Ignore-baseline-lər legitimdir (hər keçilən tapıntının niyəsini sənədləşdirin) — review-olunmamış ümumi deaktivasiyalar deyil.

## Təchizat-zənciri təhlükəsizliyi: daha az güvənmək

Yazmadığınız asılılıq tam imtiyazla işlətdiyiniz koddur. Müasir minimum:

- **SBOM** (Software Bill of Materials) — hər komponentin maşın-oxunaqlı inventarı (SPDX/CycloneDX formatları). Hər build-də yaradın (`syft`), artefaktlarla saxlayın; növbəti Log4Shell düşəndə "təsirlənirikmi?" sualı həftə yox, query olur.
- **Pin edin və yoxlayın.** Asılılıq versiyalarını və lockfile-ları pin edin; CI action-larını `@latest` yox, commit SHA ilə pin edin; üçüncü-tərəf artefaktları checksum və ya imzalarla yoxlayın (Sigstore/cosign norma olur).
- **CI-də ən-az-imtiyazlı token-lər.** Pipeline-lar qısaömürlü, scoped credential almalıdır (saxlanmış bulud açarları əvəzinə OIDC federasiyası — GitHub Actions və GitLab hər ikisi dəstəkləyir). 15 dəqiqəlik ömrü və bir-repo scope-u olan sızan CI token qeyri-hadisədir; statik bulud açarı breach-dir.
- **Branch-i qoruyun.** Məcburi review-lər, mümkün olduğu yerdə imzalı commit-lər, main-ə birbaşa push yoxdur — pipeline yalnız içərinə nə girə bildiyi qədər etibarlıdır.

## Pipeline-nın özünü hardening etmək

CI sistemləri prodüksiyon credential-lərini saxlayan crown jewel-lərdir və tez-tez internetə açıqdır. Checklist:

- **Runner-lər hücum səthi kimi**: öz-hosted runner-lər keçici VM-lərdə, uzunömürlü production maşınlarında heç vaxt; public-repo PR-ları izolyasiya olunmuş, imtiyazsız mühitlərdə işləyir (rogue PR əks halda runner sirrlərini oğurlayır).
- **Secrets gigiyenası**: hər sirr vault/secret menecerində, heç vaxt loglarda yox (`mask` edin hər şeyi), repo-başına scoping, contributor departure-da rotasiya — [Onboarding and Offboarding](/helpdesk-basics/onboarding-offboarding)-dəki eyni offboarding intizamı.
- **Deploy ayrılığı**: build pipeline artefaktları registry-yə *itələyə* bilər; deploy pipeline — ayrı job, ideal olaraq ayrı credential-lər — onları *çəkib yüksəldir*. Deploy da edə bilən build sistemləri bir kompromi prodüksiyondadır.
- **Mühit darvazaları**: prodüksiyon deploy-ları müəllifdən kənar təsdiq tələb edir (dörd-göz), əks halda avtomatik olsa belə.

## Təhvili boğmayan darvazalar

Sınaqdan-keçmiş mühəndislik kompromisi:

1. **Build-i sındır**: yeni sirrlər, birbaşa asılılıqlarda yeni kritik CVE-lər, yalnız dəyişən sətirlərdəki SAST tapıntıları.
2. **Ticket, blok yox**: əvvəldən mövcud SAST borcu və orta CVE-lər — sahib və SLA ilə avtomatik yaradılan issue-lar.
3. **Hər şeyi hesabat edin**: hər skan tam nəticəsini build artefaktı kimi dərc edir; bloklamadan görünürlük.
4. **Qaydaları rüblük review edin**: həftədə atəşlənən və laqeyd edilən darvaza darvaza-olmamaqdandır — tənzimləyin və ya silin.

Proqramı sübut edən metrik dəsti: skanerləri aktiv olan repo-ların %, açık kritik tapıntıların orta yaşı, rüblük secrets incident-ləri (push-protection-dan sonra sıfıra trend etməlidir) və — səmimi olanı — **security darvazalarının developer lead time-ına əlavə etdiyi günlər**. Darvazalarınız hər PR-ə iki gün əlavə edirsə, təşkilat yanından dolaşacaq; iki dəqiqə əlavə edirsə, təşkilat onların mövcudluğunu unudur — bu, hədəfdir.

## Növbəti addım

- [Threat Modeling](/general-security/threat-modeling) — bu darvazaları qidalandıran dizayn-vaxtı təhlükəsizlik.
- [Secure App Development](/general-security/secure-app-development) — skanerlərin yoxladığı kodu yazmaq.
- [Vulnerability Management](/general-security/assessment/vulnerability-management) — pipeline-dan çıxan tapıntıların lifecycle-ı.
- [Container and Kubernetes Security](/general-security/cloud/container-and-kubernetes-security) — pipeline-ın ship etdiyi şeyi təhlükəsizləşdirmək.
