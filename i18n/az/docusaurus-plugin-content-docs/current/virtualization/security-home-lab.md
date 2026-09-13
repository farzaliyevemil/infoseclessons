---
id: security-home-lab
title: Təhlükəsizlik Home Lab Qurmaq
description: Mülayim avadanlıq üzərində praktik təhlükəsizlik homelab — Proxmox və ya Hyper-V host dizaynı, pfSense seqmentasiyası, hücum və müdafiə VM-ləri, mini-SIEM, internet-təhlükəsiz izolyasiya və aylıq icra ediləcək məşqlər.
slug: /virtualization/security-home-lab
sidebar_position: 5
status: reference
last_reviewed: 2026-09-14
category_key: virtualization
keywords:
  - home lab
  - homelab
  - proxmox
  - pfsense
  - siem lab
  - təhlükəsizlik labı
  - məşq mühiti
difficulty: foundation
tags:
  - virtualization
  - beginner
---

# Təhlükəsizlik Home Lab Qurmaq

Sertifikatlar təhlükəsizlik haqqında oxuduğunuzu sübut edir; lab isə onu *edə* bildiyinizi. Homelab bu saytdakı yolları izləyən hər kəs üçün ən yüksək-məhsuldar investisiyadır — hər dərsi ([Linux Hardening](/operating-systems/linux/hardening), [Log Analysis](/blue-teaming/log-analysis), [Wireless Pentest](/red-teaming/wireless-pentest)) oxumaqdan əzələ yaddaşına çevirir və müsahibələrdə yaşayan portfolio artefaktıdır ("labınızı izah edin" real sualdır). Bu dərs birini büdcə ilə, fazalarla, hobbinizi xəbərlərdən uzaq saxlayan təhlükəsizlik relsləri ilə qurur.

## Avadanlıq: düşündüyünüzdən kiçik başlayın

Faza 1 bir çox insanın onsuz da sahib olduğu şeydə işləyir:

- **Minimum**: 32 GB RAM, 500 GB+ SSD və virtualizasiya genişlənməli CPU (VT-x/AMD-V) olan desktop — pfSense + üç yüngül VM üçün bəsdir.
- **Rahat**: 64 GB RAM-lı istifadə edilmiş mini-PC və ya 1U server (ikinci əl korporativ maşınlar klassikdir) — SIEM, zəif hədəflər və Kali box üçün eyni anda yer var.
- **Saxlama**: VM diskləri üçün SSD; snapshot-lar sürətlə yer yeyir (niyəsinə [Virtualization Basics](/virtualization/virtualization-basics)).

Hypervisor seçimi: **Proxmox VE** (pulsuz, KVM-əsaslı, web UI, homelab defoltu) və ya Windows mağazasısanız **Hyper-V** ([Hyper-V](/virtualization/hyper-v)) — konseptlər hər iki yolla transfer olunur.

**Onu təhlükəsiz edən şəbəkə dizaynı**

Bir düz şəbəkə lab-ı incident-ə çevirən səhvdır. Minimum-uyğun seqmentasiya hypervisor daxilində virtual router/firewall kimi pfSense (və ya OPNsense) istifadə edir:

```text
Internet → (ev routeriniz) → pfSense WAN
pfSense LAN interfeysləri:
  ├─ MGMT   — admin iş stansiyanız, hypervisor UI (internetə-baxan heç nə yox)
  ├─ ATTACK — Kali/hücumçu VM-ləri (outbound icazəli, inbound rədd)
  ├─ VULN   — qəsdən zəif hədəflər (outbound internet YOX — əks halda beacon edirlər)
  └─ SOC    — SIEM/collector VM-ləri (VULN+ATTACK seqmentlərindən log alır)
```

Üç qayda təhlükəsizliyi daşıyır:

1. **Zəif VM-lər outbound internet ala bilməz** — patchlənməmiş hədəflərin xaricə skan etməsi və ya müəlliflərinin C2-sinə zəng etməsi real problemdir. Egress-lərini default-deny edin; istisnalar yalnız qəsdən.
2. **Hər zona üçün ayrı VLAN/subnet** aralarında firewall qaydaları — bu, təsadüfi deyil, [Secure Network Design](/networking/secure-network-design) üçün praktik məşqin özüdür.
3. **Lab-da production data yoxdur.** Real şifrə təkrarınız, işəgötürənizin datası, ailə NAS credential-ləriniz yox. Lab vərdişləri sızır.

## VM starter dəsti

| VM | Məqsəd | Qeydlər |
| --- | --- | --- |
| **Kali Linux** | Hücum alət dəsti | Standart; hər məşqdən əvvəl snapshot |
| **Metasploitable 3 / VulnHub imageləri** | Qəsdən zəif Linux/Windows hədəfləri | Pulsuz, sındırılmaq üçün dizayn olunub — *yalnız sizin* şəbəkəniz |
| **Windows 10/11 eval** | Realistik müdafiə-tərəfi hədəf | [Windows Hardening](/operating-systems/windows/hardening)-i nüsxə üzərində məşq edin |
| **Ubuntu Server** | Linux hədəf + servisler | SSH hardening, auditd, servis məşqləri |
| **Security Onion / Wazuh / Splunk Free** | Mini-SIEM | Hər seqmentdən logları inges edin; [SIEM Fundamentals](/blue-teaming/siem-fundamentals)-ın konkretləşdiyi yer budur |

Bilməyə dəyər zəif VM mənbələri: **VulnHub** (oflayn hədəflər), **TryHackMe/HackTheBox** (hosted — başlamaq üçün lab lazım deyil), **DVWA / Juice Shop** (web-app hədəfləri) və Windows üçün Microsoft-un eval ISO-ları.

## Ay-başına müfredil

Lab, proqramı olanda rəfin yerini qazanır. Bir realist rotasiya:

- **Ay 1 — şəbəkə təməli**: pfSense deploy, VLAN-lar seqmentləşdirildi, firewall qaydaları sənədləşdirildi; öz qaydalarınızı sındırın və düzəldin.
- **Ay 2 — hardening məşqi**: Ubuntu + Windows hədəfləri qurun; hardening dərslərini tətbiq edin; Lynis və CIS-üslubu yoxlamalarla verify edin; "hardened" və "default" vəziyyətlərini snapshot edin.
- **Ay 3 — hücum məşqi**: öz Metasploitable/DVWA hədəflərinizə [pentest metodologiyası](/red-teaming/penetration-testing) işlədin; tapıntıları real hesabat kimi sənədləşdirin.
- **Ay 4 — müdafiə**: bütün seqment loglarını SIEM-ə göndərin; hədəflərinizə hücum edin; hərəkətlərinizi loglarda tapın ([Log Analysis](/blue-teaming/log-analysis) dövrünün miniatürü).
- **Ay 5 — detection engineering**: SIEM-də hücumlarınız üçün alert qaydaları yazın; false positive-ləri tənzimləyin; nə görə bilib-bilmədiyinizi ölçün.
- **Ay 6 — tam dövr**: kiçik incident-i başdan-ayağa simulyasiya edin — zəif VM-də ilk giriş, deteksiya, triaj, containment, hesabat ([Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)).

Lab jurnalı saxlayın — hər sınıq və düzəliş sənədləşdirilmiş. O, müsahibələr üçün bacarıq sübutu kimi ikiqat işləyir və sənədləşdirmə vərdişi məhz [OSCP](/certifications/practical-exam-certifications)-nin öyrətdiyidir.

## Hobini təhlükəsiz saxlayan vərdişlər

- **Hər eksperimentdən əvvəl snapshot**; sərbəst revert edin, onlar bunun üçündür.
- **Update-lər məşqin bir hissəsidir**: bir il onlayn qalan patchlənməmiş lab host özü zəif hədəfdir — lab-ı mini-fleet kimi, qəsdən patch edin.
- **Lab-a VPN/remote giriş** yalnız güclü authentifikasiya ilə; hypervisor UI-ni heç vaxt internetə port-forward etməyin (klassik homelab breach budur).
- **Enerji və səs büdcəsi**: köhnə serverlər səsli və acdır; mini-PC və laptop-sınıf avadanlıq qəpik-quruq 24/7 işləyir. Saxlayacağınıza görə ölçü verin.
- **Ev bağlantınızdan hücum trafiki üçün ISP/ev qaydalarını bilin** — zəif seqmentlərin internetsiz olması üçün başqa bir səbəb.

## Növbəti addım

- [Virtualization Basics](/virtualization/virtualization-basics) və [Hypervisors](/virtualization/hypervisor) — lab-ın dayandığı qat.
- [Proxmox](/virtualization/hypervisor) və [Hyper-V](/virtualization/hyper-v) — iki host seçimi dərində.
- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — müdafiə tərəfinin mərkəz daşıyıcısı.
- [Practical Exam Certifications](/certifications/practical-exam-certifications) — lab-ın karyera credential-ına çevrildiyi yer.
