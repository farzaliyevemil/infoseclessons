---
id: osint-basics
title: OSINT — Açıq-Mənbəli Kəşfiyyat Əsasları
description: Açıq mənbələrdən qanuni şəkildə kəşfiyyat toplamaq — pentestlər və threat intel üçün recon metodologiyası, insan/şirkət/domain texnikaları, alətlər, verification intizamı və onu qanuni saxlayan etika və OPSEC xətləri.
slug: /red-teaming/osint-basics
sidebar_position: 13
status: reference
last_reviewed: 2026-09-14
category_key: red-teaming
keywords:
  - osint
  - açıq mənbəli kəşfiyyat
  - kəşfiyyat
  - passiv recon
  - threat intelligence
  - shadow osint
difficulty: foundation
tags:
  - red-team
  - beginner
---

# OSINT — Açıq-Mənbəli Kəşfiyyat Əsasları

Hər hücum və hər araşdırma eyni şəkildə başlayır: kiminsə onu həssas kimi düşünmədən dərc etdiyi informasiya ilə. OSINT o informasiyanı sistematik toplamaq intizamıdır — texnoloji stack-i açan iş elanları, arxitekturanı açan konfrans çıxışları, adlandırma konvensiyasını açan dəstək email formatı, badge dizaynını açan konfrans fotosu. Pentesterlər üçün [kəşfiyyatın](/red-teaming/penetration-testing) Fazası Sıfırıdır; blue team-lar üçün brend monitorinqi və hücumçu-baxışından öz-yoxlamasıdır; threat intel analitləri üçün xam qidadır. Bu dərs metodologiya, alətlər və hüquqi xətlərdir.

## Passiv vs aktiv: vacib olan xətt

- **Passiv toplama** yalnız hədəfin işlətmədiyi mənbələrə toxunur — axtarış motorları, sertifikat logları, public reyestrlər, sosial media, breach korpusları. Hədəfin müdafiələri sizi heç vaxt görmür.
- **Aktiv toplama** hədəfin sistemləri ilə interakt edir — port skanları, directory brute-force, DNS zone cəhdləri. Burada avtorizasiya dili tətbiq olunur: sistemə qarşı aktiv recon pentest-in ([Penetration Testing](/red-teaming/penetration-testing)) başlanğıcıdır, OSINT özü deyil.

Ayrımı hər yazıda saxlayın: "passiv müəyyən edildi" və "skan edərək tapıldı" fərqli hüquqi ağırlıqlı fərqli iddialardır. Yanlış-hüquqi-trouble hekayələrinin əksəriyyəti onları qarışdırmaqla başlayır.

## Metodologiya: hədəfdən kəşfiyyata

1. **Əvvəlcə sualı müəyyənləşdirin.** "Org X-ə aid xarici-yönlü infrastruktur nədir?" və "hansı işçilər tailored phishing emailinə klikləyərdi?" fərqli toplamalar və fərqli mənbələrdir. Sualsız kəşfiyyat bookmark yığılmasıdır.
2. **Geniş toplayın, hər şeyi yazın.** Hər tapıntı mənbə URL-i və vaxt damğası alır — OSINT tez köhnəlir (insanlar iş dəyişir, sertifikatlar dövr edir, saytlar yox olur). Provenance-sız screenshot anekdottur.
3. **Korrelyasiya edin.** Bir iş elanı "Okta və Jamf" adlandırır; LinkedIn profili "endpoint security" deyir; certificate transparency `vpn.company.tld` adlandırır — kəşfiyyat *birləşmələrdədir*, maddələrdə yox.
4. **Artefakt istehsal edin.** Hücum-səthi inventarı, phishing simulyasiyaları üçün persona profili, təchizatçı xəritəsi. OSINT çıxışı etimad səviyyələri olan sənəddir, screenshot qovluğu deyil.

## Domain və infrastruktur recon

- **Certificate transparency** (crt.sh, Censys) — domain üçün heç vaxt loglanmış hər TLS sertifikatı: unudulmuş köhnə subdomain-lər, staging hostlar, daxili adlandırma. Hücum-səthi xəritə üçün ən zəngin passiv mənbədir.
- **DNS qeydləri və tarixçəsi** — cari qeydlər + tarixi (SecurityTrails-tipli servisler) köhnə hosting, migration-lar və unudulmuş assetləri açır; unudulmuş assetlər klassik real-dünya giriş nöqtəsidir.
- **Axtarış-motoru dorkları** — `site:`, `filetype:`, `inurl:` operatorları açıq sənədləri, directory listing-ləri, login səhifələrini ("index of /backup") və konfiq fayllarını səthə çıxarır. [Dork kolleksiyaları](https://github.com) janrı böyükdür; bacarıq sualınız üçün query yazmaq və onları təqvim üzrə yenidən işlətməkdir.
- **Shodan/Censys-tipli mühərriklər** — internet-miğyaslı cihaz indeksləri: açıq RDP, açık dashboard-lar, sənaye gear, və banner-ləri ilə org-un IP aralıqları.
- **Kod və pastes** — org-bağlı hesablar və sızan sirrlər üçün GitHub/GitLab axtarışı (öz org-unuzda öz [secrets scanning](/general-security/devsecops-pipeline-security)-iniz ilə birləşdirin — auditorlarınızın işlədəcəyi eyni texnikadır).

## İnsan və təşkilat recon

- **LinkedIn və iş elanları** — org qrafikləri, təhlükəsizlik komandasının ölçüsü və alətləri ("Sentinel təcrübəsi tələb olunur" kontrol inventarıdır), yeni-işçi zəiflikləri (birinci-həftə işçiləri daha çox klikləyir — phishing proqramlarının istifadə etdiyi fakt).
- **Breach korpusları** (HaveIBeenPwned-tipli) — hansı korporativ emaillar credential dump-larında görünür; həm şifrə-təkrar riskini, həm email adlandırma formatını deyir.
- **Sosial platformalar** — badge fotosu, konfrans çıxışları, dəstek-forum fəaliyyəti; hücumçıların [sosial mühəndisliyi](/red-teaming/social-engineering) tailoring üçün istifadə etdiyi rəqəmli-iz görünüşü.
- **Şirkət sənədləri** — illik hesabatlar, tender sənədləri, partnyor logoları: texnologiya qərarları saytında görünməzdən əvvəl nəsrdə görünür.

## Alətlər: zərif kit

- **Recon-ng / theHarvester** — emaillar, hostlar, subdomain-lər üçün modul passiv toplama.
- **Amass** — passiv və aktiv modlu hücum-səthi xəritələmə (avtorizasiya olmadan passiv qalın).
- **Maltego** — tapıntıların insan↔domain↔infra birləşməsi lazım olanda qrafik-əsaslı korrelyasiya.
- **crt.sh, urlscan.io, SecurityTrails, HaveIBeenPwned** — əksər toplamaların söykəndiyi web servisler.
- **Spreadsheet və ya case aləti** — quru-görünüşlü və vacib: hər maddə üçün mənbə, vaxt, etimad, növbəti-addım.

Alətlər dövrədən az vacibdir: sual → topla → yaz → korrelyasiya et → hesabat. Alətlər aylıq dövr edir; metod etmir.

## Müdafiəçi güzgüsü: özünüzü shadow-OSINT edin

Eyni toplama run-u öz təşkilatınıza qarşı birinci-sınıf müdafiə məşğədir — shadow-OSINT deyin:

1. Xarici səthinizi hücumçu kimi enumerate edin (CT logları, DNS tarixçəsi, dorklar) və sənədləşdirilmiş asset inventarı ilə diff edin — sənədləşdirilməmiş hostlar tapıntıdır.
2. Öz domainləriniz üçün lookalike və typosquat-ları yoxlayın; uyğunluqları takedown və brend-monitorinq iş axınlarına göndərin.
3. İş elanları, konfrans çıxışları və dəstək forumlarının stack haqqında nə aşkar etdiyini review edin — sonra nəyin *public olması lazım olduğuna* qərar verin.
4. Öz işçilərinizin maruzluğunu sample edin (HR/hüquqi xeyir-ilə) — [sosial mühəndislik](/red-teaming/social-engineering) riskini və awareness proqramını kalibr etmək üçün.

Rüblük işlədin; səth hər product lansmanı və gedən mühəndislə dəyişir.

## Etika, hüquq və OPSEC

- **Hüquqi xətlər yurisdiksiyaya görə dəyişir**: servis şərtlərinə qarşı scraping, personal data yığılması və işçi datasının GDPR emalı hər biri real məhdudiyyətlər daşıyır. [risk-and-privacy](/grc/risk-and-privacy) öhdəlikləri OSINT toplamalarına da aiddir — data minimizasiyası və məqsəd-məhdudiyyəti isteğə bağlı deyil.
- **Etik xətlər**: qiymətləndirmə, müdafiə, jurnalistika və tədqiqat üçün OSINT; fərdlərə hədəflənən eyni texnikalar (doxxing, stalkinq) sui-istifadədir. Professional OSINT məqsədini və avtorizasiyasını pentest kimi sənədləşdirir.
- **Öz OPSEC-iniz**: dedicated research persona və infrastruktur, şəxsi hesab yox, browser izolyasiyası — bəzi hədəflər kimə baxdıqlarını loglayır və real identikliyinizlə yanlış org-un phishing kit-inə "sadəcə baxmaq" researcher-lərin ziyarət aldığı yoldur. Jurnalistlər buna mənbə qoruması deyir; hücumçular sənətkarlıq; hər halda, eyni intizamdır.

## Növbəti addım

- [Penetration Testing](/red-teaming/penetration-testing) — OSINT-in aktiv recon-a ötürdüyü yer.
- [Social Engineering](/red-teaming/social-engineering) — insan-recon çıxışının istehlakçısı.
- [Threat Actors and Intel](/red-teaming/threat-actors-and-intel) — kampaniya miqyasında kəşfiyyat intizamı.
- [Threat Hunting](/blue-teaming/threat-hunting) — eyni toplama sənətkarlığının müdafiə istifadəsi.
