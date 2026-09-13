---
id: zero-trust-architecture
title: Zero Trust Arxitekturası
description: Marketinqdən kənar zero trust-ın real mənası — heç kimə güvənmə, həmişə yoxlama; perimetr kimi identiklik; NIST 800-207 pillərləri; mərhələli qəbul yolu və ZT-ni bahalı VLAN-a çevirən səhvlər.
slug: /general-security/zero-trust-architecture
sidebar_position: 21
status: reference
last_reviewed: 2026-09-14
category_key: general-security
keywords:
  - zero trust
  - ztna
  - nist 800-207
  - mikroseqmentasiya
  - davamlı verification
  - identiklik
  - ən az imtiyaz
difficulty: intermediate
tags:
  - security-basics
  - intermediate
---

# Zero Trust Arxitekturası

"Zero trust" marketinqdə xərcə çevrilib — vendor-lar onu məhsul kimi satır, büdcələr buzzword kimi alır və üç il sonra şəbəkə yeni dashboard ilə eyni görünür. Real konsepsiya bir cümlədir: **girişi sorğunın haradan gəldiyinə görə verməyi dayandır; kimin soruşduğuna, nəyə görə və konteksti nə dediyinə görə ver — və davamlı yenidən qiymətləndir.** Bu dərs arxitekturanı marketinqdən ayırır, NIST SP 800-207-ni referans çərçivə kimi istifadə edir və illər yox, həftələrlə ödəyən qəbul yolunu verir.

## Köhnə model niyə işləmədi

Qala və xəndək modeli iki zona fərz edirdi: etibarlı daxili şəbəkə və etibarsız xaric. Bu fərziyyə iki dəfə öldü — bir dəfə işçi qüvvəsi binadan çıxanda (VPN "daxili"nin "bir yerdə laptop" mənasına düşməsi demək oldu), ikinci dəfə data mərkəzi SaaS və üç bulud provayderinə dağılanda. Lateral movement operativ simptomdur: düz daxili girişi olan bir phished VPN credential-i tam domain kompromisidir (son onilliyin hər böyük ransomware hadisəsi belə başlayır). Cavab daha qalın xəndək deyil; dolayı-olaraq etibarlı zona *ideyasını* silməkdir.

## Əsl prinsiplər

Zero trust bir məhsul deyil; dizayn öhdəlikləri dəstidir:

1. **Identiklik perimetrdir.** Hər sorğu istifadəçi, cihaz və applikasiyanı adlandıran siyasətə görə authentifikasiya və avtorizasiya olunur — mənbə subnet-i yox.
2. **Heç kimə güvənmə, həmişə yoxlama — davamlı.** Giriş qərarları kontekst dəyişəndə (yeni məkan, cihaz sürüşməsi, qəribə davranış) sessiya-başına yenidən qiymətləndirilir, login-da bir dəfə möhürlənmir. Sessiyalar qısadır; token-lər scoped-dur.
3. **Ən az imtiyaz, açıq.** Giriş per-applikasiya və per-hərəkətdir, "şəbəkədə olmaq" deyil. "İçində olmaq" özü heç nə vermir.
4. **Breach-i fərz et.** Bir asset-in kompromisi qonşularının kompromisi demək olmasın deyə seqmentləşdir; hər şeyi loqla çünki kompromis hipotetik deyil, gözləniləndir.
5. **Siqnal topla, sonra qərar ver.** Cihaz vəziyyəti (patchlidir? şifrələnib? EDR sağlamdır?), threat intel və davranış analitikası siyasət mühərrikini qidalandırır — [loq mənbələri](/blue-teaming/log-analysis) maya dəyərini ödəyən siyasət girişlərinə çevrilir.

NIST 800-207 bunu **Policy Decision Point** (beyin: identiklik + kontekst + siyasət) və **Policy Enforcement Points** (əzələ: proxy-lər, gateway-lər, agent-lər) kimi formalizə edir ki, onlar qorunan resursları əhatə edir və şəbəkə daim düşmən kimi qəbul edilir.

## Bloklar: məhz sahib olduğunuz şeyə xəritələnmiş

| ZT bacarığı | Bu gün tipik implementasiya |
| --- | --- |
| Güclü identiklik | SSO/IdP (Entra ID, Okta) + **phishing-ə-davamlı MFA** (FIDO2/passkeys — [IAM Account Management](/general-security/iam-account-management)) |
| Şəbəkə-etimadsız applikasiya girişi | Düz VPN girişini əvəz edən **ZTNA** broker (Cloudflare Access, Entra Private Access, Tailscale) |
| Cihaz etimadı | Conditional access-ə qidalandırılan MDM/EDR vəziyyət siqnalları |
| Mikroseqmentasiya | Mərkəzi idarə olunan host firewall-ları, şərq-qərb siyasətləri (və ya Kubernetes estate-lərində service mesh) |
| Data qoruması | Klassifikasiya + DLP + idarə olunan açarlarla şifrələmə |
| Görünürlük | Birləşdirilmiş auth/endpoint/şəbəkə logları → davranış analitikası ilə [SIEM](/blue-teaming/siem-fundamentals) |

VPN kanonik ilk qətldir. ZTNA broker *istifadəçiləri applikasiyalara* identiklik-başlı proxy vasitəsilə qoşur — istifadəçi heç vaxt şəbəkəyə qoşulmur, haqqı olmayan applikasiyanı görmür və applikasiyalar işləmək üçün internetə açıq olmalı deyil. Bu tək migration lateral-movement magistralını və açıq-VPN-hücum-səthi sinfini eyni anda silir.

## Qəbul: işləyən fazalar

Zero trust big-bang proqram kimi uğursuz, görünən qələbələr ardıcıllığı kimi uğur qazanır:

1. **Əvvəl identiklik (0–3 ay).** Hər şeyə SSO, hər yerdə phishing-ə-davamlı MFA, imtiyazlı rolların ən-az-imtiyaz review-u. Bu, real risk azalmasının ~60%-dir və alətləri onsuz da sahibsiniz.
2. **İmtiyazlılar üçün cihaz etimadı (3–6 ay).** Conditional access: admin və maliyyə appləri idarə olunan, sağlam cihaz tələb edir. Yolda paylaşılan/legacy hesabları öldürün ([Onboarding and Offboarding](/helpdesk-basics/onboarding-offboarding)).
3. **Ən çox istifadə olunan applər üçün VPN girişini əvəz et (6–12 ay).** İnsanların əslində istifadə etdiyi beş daxili applikasiyanın önünə ZTNA; o populyasiyalar üçün düz VPN grant-ını təqaüdə göndərin. Helpdesk sürtünməsini gözləyin — büdcəyə yazın ([Account Procedures](/helpdesk-basics/account-and-password-procedures)).
4. **Şərq-qərbi seqmentləşdir (davamlı).** Crown jewel-lərdən başlayın: domain controller-lər, backup-lar, core DB-lər açıq allowlist alır; qalan hər şey inkremental olaraq deny-by-default siyasətlər alır.
5. **Qərarları avtomatlaşdırın (2-ci il).** Risk-əsaslı giriş (mümkünsüz səyahət, cihaz drift → step-up auth), avtomatik token ömürləri, imtiyazlı iş üçün sessiya yazılışı.

## Zero trust-u bahalı teatra çevirən uğursuzluqlar

- **ZTNA alıb düz girişi saxlamaq.** "İçində olmaq" hələ də file share verirsə, daha bahalı VPN aldınız.
- **Buludda perimetr təfəkkürü** — VPC-ni yeni qala hesab etmək. Eyni identiklik-və-siyasət intizamı service-to-service çağırışlarına da aiddir (mTLS, workload identiklik), yalnız insanlara yox.
- **Datasız siyasət mühərriki.** Cihaz vəziyyət siqnalları olmayan conditional access yenidən şifrə-only yoxlamaya enir.
- **Legacy-i laqeyd etmək.** Printer-lər, OT cihazları, o Windows 2008 box — hər estate-də düzəldilə bilməyən sakinlər var. Açıq istisna zonaları *kompensasiya edən kontrollarla* dizayn edin, [threat model](/general-security/threat-modeling)-də sənədləşdirin, onların olmadığını görməzlikdən gəlməyin əvəzinə.
- **Ölçməmək.** Modeli sübut edən metrikləri izləyin: identiklik-başlı girişin arxasında olan % applər, phishing-ə-davamlı MFA %, kompromitə olunmuş endpoint-dən lateral yollar (attack-path alətləri), MTTD/MTTR trendləri.

## Növbəti addım

- [IAM Account Management](/general-security/iam-account-management) — identiklik birinci pillədir; buradan başlayın.
- [Threat Modeling](/general-security/threat-modeling) — sildiyiniz trust sərhədlərini model-ləşdirin.
- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — qərarların asılı olduğu siqnal qatı.
- [Cloud Security Solutions](/general-security/cloud/cloud-security-solutions) — eyni fəlsəfə bulud control plane-lərində.
