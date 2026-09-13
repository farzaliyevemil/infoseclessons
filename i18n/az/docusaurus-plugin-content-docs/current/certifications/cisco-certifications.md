---
id: cisco-certifications
title: Cisco Sertifikatları (2026 Bələdçisi)
description: Şəbəkə və təhlükəsizlik karyerası üçün Cisco sertifikat yolu — CCNA, CyberOps, CCNP Security və CCIE — hər imtahanın nəyi əhatə etdiyi, recertification-un necə işlədiyi və hər birinin hansı rollara xidmət etdiyi.
slug: /certifications/cisco-certifications
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: certifications
keywords:
  - cisco
  - ccna
  - ccnp security
  - ccie
  - cyberops
  - şəbəkə sertifikatı
  - təhlükəsizlik sertifikatı
difficulty: foundation
---

# Cisco Sertifikatları (2026 Bələdçisi)

Bu bələdçi sentyabr 2026 vəziyyətinə görə geniş istinad edilən **Cisco sertifikat strukturunu** əks etdirir. Cisco imtahan blueprint-lərini və portfolio adlandırmasını müntəzəm yeniləyir, ona görə bunu xəritə kimi qəbul edin və nəsə rezerv etməzdən əvvəl cari detalları rəsmi Cisco Learning Network-də yoxlayın. CompTIA ([CompTIA Certifications](/certifications/comptia-certifications)) vendor-neytral əsasları sertifikatlaşdırırsa, Cisco dünyanın ən çox quraşdırılmış şəbəkə avadanlığını sertifikatlaşdırır — buna görə "CCNA-səviyyəli bilik" Cisco gear işlətməyən mağazalarda belə networking müsahibələrinin lingua franca-sıdır.

## Cisco piramidası

```text
                    ┌─────────────┐
                    │   CCIE Lab   │          expert
                    └──────▲──────┘
              ┌────────────┴────────────┐
              │ CCNP (Security / Enterprise / …)   professional
              └────────────▲────────────┘
        ┌──────────────────┴──────────────────┐
        │ CCNA  (tək associate-səviyyə imtahan)          associate
        └──────────────────▲──────────────────┘
        │ Cisco Certified Support Technician / giriş yolları   entry
        └────────────────────────────────────┘
```

## CCNA: brendindən uzun yaşayan təməl

Şəbəkə əsasları, IP routing və switching, wireless, təhlükəsizlik əsasları, avtomatlaşdırma və əsas IPv6-nı əhatə edən bir imtahan (200-301). Planetin ən çox tanınan giriş-səviyyəli şəbəkə sertifikatı olaraq qalır.

Nəyə yaxşıdır:

- VLAN-ları, subnetting-i, OSPF əsaslarını və ACL-ləri izahsız anladığınızı fərz edən **network engineer / NOC / sysadmin** rolları.
- Aşağıdakı hər təhlükəsizlik yolu üçün **prerequisite bilik** — topologiya üzərindən izləyə bilmədiyinizi təhlükəsizləşdirə bilməzsiniz.

Əsas İT background-lu adam üçün realist hazırlıq: lab ilə 3–6 ay. İmtahan _kostyumda hands-on-dur_: subnetting sürəti və config-oxuma triviyadan çox vacibdir. Video kurslar + virtual lab (əsaslar üçün Cisco Modeling Labs, GNS3, EVE-NG, və ya Packet Tracer) sübut olunmuş kombinasiyadır.

## CyberOps: Cisco-nun blue-team yolu

Engineering yox, təhlükəsizlik əməliyyatları üçün:

- **Cisco Certified Support Technician (CCST) Cybersecurity** — giriş səviyyəsi; köhnə CyberOps Associate ərazisi sadələşdirilmiş formada.
- **CyberOps Professional** — associate-dan professional-a blue-team yolu: təhlükəsizlik konseptləri, şəbəkə/endpoint monitorinqi, incident response, təhdid analizi. Security+ ilə yanaşı SOC analyst CV-si üçün legitim alternativ yol ([CompTIA Certifications](/certifications/comptia-certifications)) — Cisco-nun versiyası şəbəkə telemetriyasına daha çox söykənir.

## CCNP Security: işləyən professional-ın təhlükəsizlik sertifikatı

CCNP Security = bir core imtahan (**SCOR 350-701**: təhlükəsizlik infrastrukturu, threat defense, secure şəbəkə girişi, bulud təhlükəsizliyi, siyasətlər) **+ seçiminizə görə bir konsentrasiya imtahanı**:

| Konsentrasiya                    | Xidmət edir                                         |
| -------------------------------- | --------------------------------------------------- |
| SVPN                             | Uzaq giriş, VPN arxitekturaları                     |
| SISE                             | Identity Services Engine (ISE) — NAC, 802.1X        |
| SNSA                             | Firewall/threat defense (Cisco hardware-də ASA/FTD) |
| SNCVA / SCOR-qonşu bulud yolları | Bulud şəbəkə təhlükəsizliyi                         |
| SUSA                             | Təhlükəsizlik üçün avtomatlaşdırma                  |

Praktik məna: **SCOR təkbaşına "Cisco Security Specialist" badge-i verir; konsentrasiya onu CCNP edir** — və CCNP Security körfəz, Avropa və ABŞ-daki firewall/NAC/təhlükəsizlik-engineering iş elanlarının standart tələbidir. Gözlənilən background: CCNA-səviyyəli şəbəkə + real cihaz tanışlığı; hazırlıq işləyərkən adətən imtahan-başına 4–8 ay.

## CCIE Security: expert təbəqə

CCIE industriyanın ən tələbkar praktik sertifikatı olaraq qalır: yazılı kvalifikasiya imtahanı + **səkkizsaatlıq hands-on lab**. Zaman təzyiqi altında tam təhlükəsizlik arxitekturalarını _dizayn etmə, deploy etmə və troubleshoot etmə_ bacarığını sertifikatlaşdırır — bütün dünyada istənilən CCIE sahibi yüz mindən azdır. Lead arxitektor rolları və konsaltinq etibarı üçün vacibdir; birinci və ya ikinci sertifikat kimi overkill-dir.

## Recertification (hər kəsin unutduğu hissə)

Cisco associate- və professional-səviyyə sertifikatları **üç il** etibarlıdır; CCIE yazılı+lab izə tərəfindən dəyişir. Yeniləmə yolları:

- daha yüksək səviyyəli imtahan keçmək (istənilən CCNP altındakı aktiv CCNA-nı recertify edir),
- **Continuing Education kreditləri qazanmaq** (associate səviyyədə adətən 3 illik dövrə 30 CE kredit, professional-da 80),
- və ya qarışıq. Kreditlər training kurslarından, təsdiqlənmiş vebinarlardan və bəzi yazı/tədrisdən gəlir.

Yenilənməni ikinci ildə təqvimə yazın — vaxtı keçənə yenidən sıfırdan imtahan vermək düşür, gecikmə haqqı yox.

## Hansı, nə vaxt

| Vəziyyətiniz                                     | Seçim                                                                                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Şəbəkə/İT dəstəyinə girmək                       | **CCNA**                                                                                                                                                                    |
| SOC analyst yolu, şəbəkə-ağır SOC                | **CCST Cybersecurity → CyberOps Professional** (və ya əvvəl Security+ — [CompTIA](/certifications/comptia-certifications)-a baxın)                                          |
| Firewall / NAC / şəbəkə təhlükəsizliyi mühəndisi | **CCNP Security** (SCOR + SISE və ya SNSA)                                                                                                                                  |
| Baş şəbəkə-təhlükəsizlik arxitektu               | Müştəri işi tələb edəndə **CCIE Security**                                                                                                                                  |
| Bulud-ağır rol                                   | CCNA + bulud-native sertlər ([AWS](/certifications/aws-certifications), [Microsoft](/certifications/microsoft-certifications)) istənilən Cisco konsentrasiyasından üstündür |

## Növbəti addım

- [CompTIA Certifications](/certifications/comptia-certifications) — vendor-neytral əsaslar nərdivanı.
- [ISC2 Certifications](/certifications/isc2-certifications) — idarəetmə/menecment təbəqəsi (SSCP, CISSP, CCSP).
- [Microsoft Certifications](/certifications/microsoft-certifications) və [AWS Certifications](/certifications/aws-certifications) — platforma yolları.
- [Firewall, IDS and WAF](/general-security/firewall-ids-waf) — CCNP Security syllabus-unun texnologiya yarısı.
