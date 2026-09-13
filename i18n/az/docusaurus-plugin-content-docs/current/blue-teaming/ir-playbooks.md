---
id: ir-playbooks
title: Incident Response Playbook-ları
description: İcra-hazır incident response playbook-ları — ransomware, phishing və credential kompromisi — hər birində deteksiya trigger-ləri, ilk-saat hərəkətləri, containment, dəlil, recovery və playbook-un işləyib-işləmədiyini deyən metriklər.
slug: /blue-teaming/ir-playbooks
sidebar_position: 9
status: reference
last_reviewed: 2026-09-14
category_key: blue-teaming
keywords:
  - incident response playbook
  - ransomware playbook
  - phishing cavabı
  - credential kompromisi
  - containment
  - soc runbook
difficulty: intermediate
tags:
  - blue-team
  - intermediate
---

# Incident Response Playbook-ları

Incident response prosesi lifecycle-ı izah edir; **playbook** isə 02:40-da alert qışqıran növbətçi analitin faktiki izlədiyidir. Fərq vacibdir: stress altında heç kim prosedur uydurmur — ya birini icra edirlər, ya təxmini edirlər. Bu dərs ardıcıl strukturla üç sınaqdan-keçmiş playbook verir (ransomware, phishing, credential kompromisi) və özününkülərini yazmaq üçün meta-qaydalar. Altındakı lifecycle — triaj, containment, eradication, recovery, dərslər — [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)-da əhatə olunub; hər playbook-un çağırdığı analiz texnikaları [Log Analysis](/blue-teaming/log-analysis) və [Malware Analysis Basics](/blue-teaming/malware-analysis-basics)-dadır.

## Hər playbook-un anatomiyası

Aşağıdakı hər playbook eyni skeletdən istifadə edir — öz ssenariləriniz üçün bu strukturı kopyalayın:

1. **Trigger** — onu aktivləşdirən alertlər/hadisələr.
2. **İlk saat** — vaxt-kritik qərarlar, sıra ilə, sahiblər ilə.
3. **Containment** — dəlili məhv etmədən qanammanı dayandırmaq.
4. **Araşdırma** — nə toplamaq və nəyə cavab vermək.
5. **Eradication & recovery** — silmə və təhlükəsiz geri qayıtma.
6. **Post-incident** — məcburi çıxışlar və izləmələr.
7. **Kontaktlar və alətlər** — incident-dən *əvvəl* doldurulmuş.

Meta-qaydalar: playbook-lar təşkilatın reallığını fərz edir (gecə 3-də domain controller-i izolyasiya etməyə kim avtorizədir?), vəzifə adlarından çox **qərar sahiblərini** adlandırır və məşq olunur — oxunmamış playbook sənəddir, tabletop-məşq edilən bacarıqdır.

## Playbook 1: Ransomware

**Trigger**: kütləvi fayl-genişlənmə dəyişiklikləri və ya ad dəyişmə partlayışları; bir neçə hostda backup iş uğursuzluqları; shadow-copy silmə hadisələri (VssAdmin/Shadows Delete); canary-fayl alertləri; şantaj qeydi artefaktları; EDR kütləvi-şifrələmə davranış alertləri.

**İlk saat (incident-i təyin edən qərarlar):**

1. **Miəyası sürətli təsdiqlə** — neçə hostda şifrələmə fəaliyyəti? Bir host containment-dir; iyirmi — krizis rejimi.
2. **Təsirlənmiş seqmentləri şəbəkə səviyyəsində izolyasiya edin** (switch/firewall) — miqyasda per-host EDR izolyasiyasından sürətlidir. **Hələlik söndürməyin** (aşağıdakı dəlil qeydinə baxın).
3. **Sağ qalanı qoruyun**: backup işlərini *işləməkdən* dondurun (infected backup-lar backup-sızlıqdan pisdır) və başqa hər şeydən əvvəl bir oflayn/immutable backup dəstinin sağlam olduğunu təsdiqləyin — həmin təsdiq bunun recovery-mu, danışıq-mu olduğunu qərar verir.
4. **Incident-i elan edin** yüksəltmə yolu ilə: rəhbərlik, hüquqi, sığorta bildirişi və — yurisdiksiya və siyasətə görə — hüquq-mühafizə. Ransomware SOC-üstü qərar hadisəsidir; SOC-un işi faktlar və containment-dir.
5. **Ştammı müəyyənləşdirin** (fayl genişlənməsi, qeyd mətni, EDR ailə deteksiyası) — IOC-ləri və, səmimi olsaq, gözləntiləri sürükləyir.

**Containment & dəlil:** izolyasiya edin, təmizləməyin; mümkün olarsa, söndürməzdən *əvvəl* bir nümayəndə hostdan volatile yaddaşı yaxalayın (ştammın packer-i və exfil davranışı sonra vacibdir); ilk-giriş izini qoruqlayın — başladan phishing emaili və ya VPN hesabı (2 və 3 nömrəli playbook-lara baxın). Qeyd: bəzi ştamlar exfiltration-dan sonra data silir — müasir ransomware **çift-şantaj** hadisəsidir, ona görə "data götürdülərmi?" sualı isteğe bağlı deyil; hüquqi və bildiriş öhdəliklərini dəyişir.

**Eradication & recovery:** təmizləməkdənsə yenidən qurun ("dezinfeksiya edilmiş" ransomware hostuna etimad yoxdur); təsirlənmiş hostlara toxunan hər credential-i rotasiya edin — domain kompromisi təsdiqlənibsə domain-miğyaslı KRBTGT ikiqat reset; təsdiqlənmiş-təmiz backuplardan **seqmentləşdirilmiş, monitor olunan** zonaya bərpa edin; yenidən-məruz qalmaqdan əvvəl qoruma qaydalarını (EDR bloklist, GPO/ASR hardening) yeniləyin.

**Post-incident:** patient-zero taym-laynı (ilk giriş vektoru, dwell vaxtı), backup-verification kadansı review-u və bu incidenti gələn ilin məşqinə çevirən table-top.

## Playbook 2: Phishing (hesabat verildi və ya təsbit edildi)

**Trigger**: istifadəçi-hesabat düyməsi göndərişləri; çatdırılmadan sonra mail-gateway deteksiyaları; qəribə inbox-qayda yaradılması; phishing-kit URL-lərindən login cəhdləri.

**İlk saat:**

1. **Emaili qoruqlayın** — hər hansı təmizlikdən *əvvəl* hesabat verəndən tam header-lər və orijinal `.eml`. Header-lər araşdırmadır.
2. **Partlayış radiusunu ölç**: mail-gateway izi — eyni göndərən/mövzu/kampaniya bütün mailboxlarda — kim qəbul etdi, kim açdı (izlənirsə), kim kliklədi, kim credential göndərdi.
3. **Artefaktı triaj edin**: credential yığınmıdır (fake login-ə link), payload çatdırmadır (attachment → [Malware Analysis Basics](/blue-teaming/malware-analysis-basics)) və ya BEC-tipli fırıldaqçılıq (ödəniş yönləndirmə — onda maliyyə yalnız İT deyil, maraqlı tərəfdir)?
4. **Blokla və təmizlə**: göndərən/URL/domain mail-gateway və DNS bloklistlərinə; gateway-in hərəkəti vasitəsilə bütün mailboxlardan uyğun mesajları sil (M365 terminində Search-and-purge) — təsirlənən-istifadəçi siyahısı qeyd olunmuş.

**Containment:** *credential göndərən* istifadəçilər → həmin hesablar üçün dərhal **Playbook 3-ə (credential kompromisi)** keçin — bu, analitlərin unutduğu branching qaydasıdır. *Yalnız klikləyənlər* üçün → hesablarını və endpoint-lərini monitorinq edin, MFA qeydiyyat sağlamlığını yoxlayın.

**Araşdırma & hardening:** kit URL-ni analiz edin (təhlükəsiz: passiv DNS, URLScan — production browseriniz yox); göndərənin spoof olunduğunu yoxlayın (header-lərdə SPF/DKIM/DMARC hökmləri) və ya real hesab kompromitə olunubmu (onda onların tenant hərəkətləri də review olunmalıdır); göndərən/kit patternləri üçün deteksiya qaydaları əlavə edin; simulyasiya proqramını qidalandırın (org phishing simulyasiyaları aparırsa, real incidentlər ən yaxşı təlim girişidir).

**Post-incident:** hesabat verənə geri-cavab (müsbət feedback gələcək hesabat verməni ikiqat artırır), gateway qayda tənzimləməsi və spoofing uğur qazanıbsa DMARC siyasət review-u.

## Playbook 3: Credential kompromisi

**Trigger**: mümkünsüz-səyahət və ya anomaliya-məkanlı girişlər; MFA-yorğunluq partlayışları (push spam) + təsdiq; yatan hesab fəaliyyəti; sızılan-credential intelligence vuruşları; inbox-qayda yaratma + mail forwarding.

**İlk saat — bu sıra ilə (sıra vacibdir):**

1. **Sessiyaları və tokenləri ləğv edin** — identiklik platforması "revoke sessions", refresh-token ləğvi. Şifrəni öldürmək sessiyaları öldürməzsə, hücumçu içəridə qalır.
2. **Credential reset-i məcbur edin** və (MFA hesabları üçün) **qeydiyyatlı faktorları yenidən yoxlayın** — hücumçu təsdiqləmiş MFA cihazı silinməlidir, yoxdığını fərz etmək deyil (yenidən qeydiyyat proseduru üçün [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures)).
3. **Hücumçunun nəyə toxunduğunu qiymətləndirin**: mailbox qaydaları və deleanqasiyalar (klassik persistence — forwarding qaydaları şifrə resetlərindən sağ çıxır), istifadəçinin təsdiqlədiyi OAuth app grant-ları, açılan/yüklənən fayllar, göndərilənlər.

**Containment & araşdırma:** pəncərədəki hər sessiyanı giriş logunda yoxlayın (IP-lər, cihazlar, applər); sessiya idarə olunan cihazdan idisə endpoint fəaliyyətini korrelyasiya edin (cihazın özü kompromitə olunubmu?); eyni infrastrukturu digər hesablarda ovlayın ([Threat Hunting](/blue-teaming/threat-hunting) — bir oğurlanmış şifrə nadirən tək gəzir). Zərərli inbox qaydalarını, OAuth grant-larını və forwarding-i silin — persistence risk sırası ilə.

**Eradication & recovery:** credential yenidən istifadə olunduğu hər yerdə şifrələri rotasiya edin; hesab imtiyazlı rolları vardırsa, imtiyazlı-giriş playbook-una genişləndirin (KRBTGT/enterprise-app consent review); hansı hərəkətlərin legitim olduğunu istifadəçi ilə təsdiqləyin — insanlar ən yaxşı baseline mənbəyidir.

**Post-incident:** şifrə niyə sızdı (phishing saytı? endpoint-də infostealer? üçüncü-tərəf breach-dən təkrar istifadə — breach korpuslarını yoxlayın), nə təsbit etdi və nə qədər vaxt aldı, və conditional-access/step-up siyasətləri sessiyanı dayandırardımı ([Zero Trust](/general-security/zero-trust-architecture) feedback dövrü).

## Öz playbook-larınızı yazmaq və canlı saxlamaq

- Buradakı üçlükdən başlayın, sonra tarixçənizdən ən yuxarı incident tiplərinizi əlavə edin (hər org-un top üçlüyü son 12 ayın ticketlərindən bilinir).
- Hər playbook **adlı sahibləri olan qərar nöqtələri** alır ("CISO domain-miğyaslı KRBTGT reset-inə avtorizə verir"), real nömrəli **kontakt bloku** və başlıqda **son-test tarixi**.
- Hər playbook-u **ildə iki dəfə tabletop edin**; hər real incidentdən sonra yeniləyin — post-incident review-un hərəkət maddələri hesabatda yox, playbook-un içində yaşayır.
- Şəbəkə olmayanda əlçatan saxlayın: çap nüsxələri və ya oflayn giriş ransomware-ssenasarı tələbidir, paranoya deyil.

## Növbəti addım

- [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation) — bu playbookların altındakı lifecycle və dəlil intizamı.
- [Log Analysis](/blue-teaming/log-analysis) — yuxarıdakı hər trigger-ı qidalandıran toplama.
- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — trigger-ləri alertlərə qoşmaq.
- [Digital Forensics](/blue-teaming/digital-forensics) — playbook formal dəlil işinə ötürəndə.
