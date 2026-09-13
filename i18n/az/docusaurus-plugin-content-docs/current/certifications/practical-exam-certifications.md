---
id: practical-exam-certifications
title: Praktik İmtahan Sertifikatları — OSCP, PNPT, CRTO və Dostları
description: Əl-imtahan təbəqəsi — OSCP, PNPT, CRTO, eJPT və qalanları — hər imtahanın faktiki nəyi test etdiyi, necə hazırlanmalı, keçid strategiyaları və praktik sertlərin multiple-choice yolları ilə müqayisəsi.
slug: /certifications/practical-exam-certifications
sidebar_position: 6
status: reference
last_reviewed: 2026-09-14
category_key: certifications
keywords:
  - oscp
  - pnpt
  - crto
  - ejpt
  - praktik sertifikat
  - red team sertifikatı
  - hands-on imtahan
difficulty: intermediate
tags:
  - certifications
  - intermediate
---

# Praktik İmtahan Sertifikatları — OSCP, PNPT, CRTO və Dostları

Multiple-choice sertlər materialı əzbərlədiyinizi ölçür; **praktik imtahanlar saat altında işi edə biləcəyinizi** ölçür — maşınları sındırmaq, tapıntıları zəncirləmək və yazıb vermək. Offensiv rollar üçün işə götürənlər bu təbəqəni ağır qiymətləndirir, məhz saxtalaşdırılması çətin olduğu üçün: 24-saatlıq lab üçün braindump yoxdur. Bu dərs hands-on mənzərəni və hazırlıq yolunu xəritələyir — [CompTIA Certifications](/certifications/comptia-certifications)-dan əsasları və [Building a Security Home Lab](/virtualization/security-home-lab)-dan lab vərdişlərini fərz edir, çünki heç kim əvvəllər bir şey sındırmadan praktik imtahanı keçmir.

## Mənzərə

| Sertifikat | Vendor | Format | Müddət | Xidmət edir |
| --- | --- | --- | --- | --- |
| **eJPT** — Junior Penetration Tester | INE/eLearnSecurity | Tam proktorlu lab (~4 hostdan şəbəkə) | 48 saat | Offensiv işə ilk addım |
| **PNPT** — Practical Network Penetration Tester | TCM Security | 5-günlük engagement: pentest + AD + **yazılı hesabat + debrief zəngi** | 5 gün | Realistik junior pentest; industriyada ən yaxşı hesabat-yazma təlimi |
| **OSCP** — Offensive Security Certified Professional | OffSec | Proktorlu lab imtahanı: 3 standalone + AD dəsti, sonra hesabat | ~24 saat | "Faktiki pentest edə bilər" siqnalı olan industriya standartı |
| **CRTO** — Certified Red Team Operator | Zero-Point Security | **Cobalt Strike** ilə lab-da adversar simulyasiya | 48 saat | Red team / C2 operator rolları |
| **CPTS** — Certified Penetration Testing Specialist | HTB Academy | Proktorlu imtahan maşın şəbəkəsi + hesabat | 10 gün | Maya-başına-dəyəri ağır olan yenilər; AD-ağır, dərinliyə görə tərifli |

(OffSec OSED/OSWE development-fokuslu yolları və daha yeni OSCP+ refresh-i də satır; cari formatları vendor səhifələrində yoxlayın — hamısı blueprint-ləri dövri yeniləyir, bu saytdakı hər sertifikat dərsinin eyni qeydi: [Cisco](/certifications/cisco-certifications), [ISC2](/certifications/isc2-certifications).)

## Hər imtahan faktiki nəyi test edir

- **eJPT** — alət əsasları: enumeration, pivot əsasları, web exploitation, sadə privesc. Praktik imtahan oturmayanlar üçün düzgün ilk imtahan: bağışlayıcı, ucuz, həqiqətən hands-on.
- **PNPT** — tam engagement forması: scope təsdiqi, xarici foothold, Active Directory əl keçirmə, post-exploitation hədəfləri, sonra **yazılı hesabat və canlı debrief** — imtahançılar məntiqinizi soruşur. Debrief unikaldır — etdiklərinizi anladığınızı sertifikatlaşdırır və PNPT məzunlarının niyə müsahibədə yaxşı olduğunun səbəbidir.
- **OSCP** — dözüm klassikası: enumerate, exploit və yüksəlt — standalone maşınlar + Active Directory dəsti, proktorlu, vaxt pəncərəsi daxilində, sonra professional hesabat. Keçid barı obyektiv və amansızdır; "Try Harder" mədəniyyəti realdır. OSCP pentest CV-lərinin oxunmasını təmin edən resume açar sözüdür.
- **CRTO** — pentest əsaslarını fərz edir və **adversar sənətkarlığı** öyrədir: Cobalt Strike əməliyyatları, beaconing, lateral movement, evasion, OPSEC. OSCP-nin qəsdən qaçdığı red-team alət qatını sertifikatlaşdırır (OSCP penetration testing-dir, CRTO deteksiya-əməliyyatlarının olduğunu fərz edir).
- **CPTS** — HTB Academy-nin imtahanı: tam hesabatlı böyük maşın şəbəkəsi, maya-başına-çətinliyə və AD reallığına görə tərifli; daha yeni, bazar tanınması hələ böyüyür amma sürətlə.

## Faktiki işləyən hazırlıq

Praktik imtahanlar lab-da keçir, oxu kürsüsündə yox:

1. **Əvvəl home lab.** Zəif hədəfləri olan [home lab](/virtualization/security-home-lab) (VulnHub, DVWA, Metasploitable) enumeration-un refleksə çevrildiyi yerdir. TryHackMe-nin orta yollarını rahat tamamlaya bilirsinizsə, ilk praktik üçün rezerv etməyə hazırsınız.
2. **Active Directory-ni ciddi öyrənin.** Ciddi hər imtahanda AD komponenti var: Kerberos sui-istifadəsi, deleanqasiya olunmuş icazələr, credential relay, qrup siyasəti zəiflikləri. AD hücum kursları (TCM-in, HTB-nin pro lab-ları) junior ilə keçəbilən arasındakı fərqdir.
3. **Enumeration intizamını məşq edin.** İmtahan uğursuzluqlarının əksəriyyəti buraxılmış exploit deyil, buraxılmış informasiyadır. Şəxsi checklist qurun (portlar → versiyalar → credler → web → AD) və hər maşında eyni şəkildə işlədin, darıxdırıcı olana qədər.
4. **Qeyd aparmağı ilk gündən məşq edin.** Vaxt damğalı screenshot-lar, komandalar və çıxışlar host-başına təşkil edilmiş. OSCP və PNPT hesabatları namizədləri hacking qədər tez-tez sındırır; vərdiş [SOC işini yaxşı edən eyni vərdişdir](/blue-teaming/log-analysis).
5. **İmtahan günü vaxt-limitləyin.** Klassik OSCP məsləhəti hər yerdə keçərlidir: maşınları rotasiya ilə hücum edin, yapışan box-ları park edin, təzə gözlə geri qayıdın. İmtahan yorğunluq altında intizamlı prosesi mükafatlandırır — bu, işin özüdür.

## Arasında seçim

- **Praktik imtahan oturmayıbsınız** → eJPT (etimad + əsaslar).
- **Mayaya görə ən realistik engagement istəyirsiniz** → PNPT (hesabat+debrief formatı karyeranı formalaşdırır).
- **Pentest iş müraciətləri üçün tanınan açar söz istəyirsiniz** → OSCP.
- **Artıq pentest edirsiniz, red team ops-a keçirsiniz** → CRTO (və CRTO-II/III xələfləri).
- **Dollar-başına maksimum texniki dərinlik, AD-fokuslu** → CPTS.

Öz-təlimli yol üçün ağıllı sıra: Security+ ([CompTIA](/certifications/comptia-certifications)) → eJPT → home-lab ayları → işə qəbul edildikdə PNPT və ya CPTS → təhlükəsizlik işində işləyəndə OSCP → red team alətləri iş olanda CRTO. Multiple-choice rəhbərlik sertləri ([ISC2](/certifications/isc2-certifications)) bu yolu sonra menecment rolları üçün tamamlayır — praktik və idarəetmə təbəqələri müsahibədə fərqli suallara cavab verir.

## Səmimi qeydlər

- Praktik sertlər daha **mənalı bitir**: OffSec sertləri Continuing Education point-ləri tələb edir və sənətkarlıq (xüsusən CRTO) alətlərlə birlikdə köhnəlir — yeniləməni [Cisco](/certifications/cisco-certifications) recertification kimi planlaşdırın.
- Bu imtahanlar **stress üçün dizayn olunub**; namizədlər bilikdən yox, yuxu idarəetməsində və panikada uğursuz olur. Real cəhddən əvvəl home lab-da tam müddəti bir dəfə məşq edin.
- Maya realdır (lab-lar + imtahan cəhdləri), amma endirim pəncərələri və bundle paketləri var; lab saatları təqviminizdə mövcud olmamışdan imtahanı almayın.

## Növbəti addım

- [Penetration Testing](/red-teaming/penetration-testing) — bu imtahanların hamısının ballandırdığı metodologiya.
- [Wireless Pentest](/red-teaming/wireless-pentest) və [Cloud Pentest](/red-teaming/cloud-pentest) — core imtahanlardan kənar spesializasiyalar.
- [Threat Hunting](/blue-teaming/threat-hunting) — CRTO-nun sertifikatlaşdırdığı sənətkarlığın müdafiəçi güzgüsü.
- [Building a Security Home Lab](/virtualization/security-home-lab) — hazırlığın baş verdiyi yer.
