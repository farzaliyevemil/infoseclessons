---
id: siem-fundamentals
title: SIEM Əsasları
description: SIEM əslində nə edir — toplama, normalizasiya, korrelyasiya, alertləmə, retention — detection qaydaları necə qurulur və tənzimlənir, hansı loq mənbələri maya dəyərini ödəyir və SOC iş axını onun ətrafında necə qurulur.
slug: /blue-teaming/siem-fundamentals
sidebar_position: 6
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - siem
  - soc
  - detection engineering
  - korrelyasiya qaydaları
  - splunk
  - sentinel
  - elastic
  - mitre attack
  - log mənbələri
difficulty: intermediate
---

# SIEM Fundamentals

Security Information and Event Management sistemi blue team-ın yaddaşıdır: hər hostun və applikasiyanın istehsal etdiyi logları toplayır, onları bir query-əlçatan formaya normalizə edir, maşınlar və zaman arasında korrelyasiya edir və korrelyasiya "bu, ehtimal ki, incidentdir" deyəndə insana page göndərir. Alətin özü — Splunk, Microsoft Sentinel, Elastic Security, QRadar, Wazuh — əhəmiyyətli deyil; onun ətrafındakı intizam vacibdir. Pis qidalanan və ehtiyatsız tənzimlənən SIEM noise istehsal edən bahalı üsuldur; yaxşı qidalanan isə breach-i doqquz dəqiqədə və ya doqquz həftədə bilmək arasındakı fərqdir.

## SIEM əslində nə edir

Beş funksiya, pipeline sırası ilə:

1. **Toplama** — agent-lər (Windows Event Forwarding, Fluentd, Beats), syslog, API çəkilmə (M365, AWS CloudTrail, Okta) və şəbəkə sensorları event-ləri platformaya itələyir.
2. **Normalizasiya** — hər şey ümumi sxemə parse olunur (timestamp, mənbə istifadəçi, host, hərəkət, obyekt, nəticə). SIEM ağrısının əksəriyyəti burada yaşayır: qırıq parser bütün loq mənbəyini səssizcə ölü çəkiyə çevirir.
3. **Korrelyasiya və deteksiya** — qaydalar stream-ləri və aqreqatları qiymətləndirir: tək giriş noise-dur; bir saatda beş ölkə qaydadır.
4. **Alertləmə və case management** — yüksək-əminlikli uyğunluqlar sahibləri, prioritetləri və iş axınları olan incident-lərə çevrilir.
5. **Retention və axtarış** — aylar-illər tarixçəsi üçün soyuq saxlama, çünki araşdırmalar həmişə "fərq qoymazdan _əvvəl_ nə baş verdi" sualını verir.

İlk dördü real-vaxta yaxın işləyir; beşinci SIEM-i alertləmə alətindən araşdırma platformasına çevirəndir.

## Loq mənbələri, gigabayt-başına dəyərə görə sıralanmış

Hər mənbə eyni büdcəni bərabər tutmur. Əksər təşkilatlar üçün kobud dəyər sıralaması:

| Səviyyə                               | Mənbələr                                                                       | Niyə                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| 1 — identiklik və authentifikasiya    | Domain controller Security logları, IdP/SSO (Okta, Entra ID), VPN, MFA logları | Demək olar hər hücum identikliyə toxunur; bu loglar "kim, haradan, nə ilə" sualını cavablandırır |
| 2 — endpoint proses və güc hadisələri | EDR telemetriya, Sysmon, 4688 proses yaradılması                               | Nə icra olunduğunun və nəyə toxunduğunun yekun həqiqəti                                          |
| 3 — bulud control plane               | CloudTrail, Azure Activity, GCP Audit                                          | Hücumçuların ən çox yüksəldiyi yerdə vəziyyət dəyişiklikləri                                     |
| 4 — şəbəkə kənarları                  | Firewall, proxy, DNS, email gateway                                            | İlk giriş yolları və C2 kanalları                                                                |
| 5 — qalan hər şey                     | Applikasiya logları, DB audit, fiziki giriş                                    | Kontekst və uyğunluq; seçici inges edin                                                          |

Ümumi uğursuzluq tərs xərcləmədir: çoxdanışan applikasiya loglarının terabaytlarını inges etmək, DNS resolver — ən sakit, ən yüksək-siqnallı mənbə — toplanmamış halda.

## Detection qaydaları: yaxşı qaydanın anatomiyası

Detection qaydası kodla yazılmış hipotezdir. Yaxşıları bir formanı paylaşır:

- **Data**: hansı normalizə olunmuş mənbə və sahələri oxuyur.
- **Məntiq**: konkret şərt — threshold, rare-event join, ardıcıllıq.
- **Xəritələmə**: hansı MITRE ATT&CK texnikasını təsbit edir (bu, coverage-i ölçüləbilir edir).
- **Cavab təlimatı**: analit ilk nəyi yoxlamalıdır — ilk-addımı olmayan qayda təlimat-sız pager-dir.

Üç klassik qayda pattern-i:

```text
1. Threshold — brute force
source=auth | where outcome=failed | group_by src_ip, user
| window 10m | where count > 20 → credential_stuffing namizədi

2. Rare-behavior — ilk dəfə imtiyazlı hərəkət
source=cloudtrail | where event=AttachUserPolicy
| group_by principal | where first_seen_30d → imtiyaz yüksəlişi namizədi

3. Ardıcıllıq — kəşf sonra hərəkət
source=edr | where process=~"whoami|net group" (by host)
30 dəq ərzində source=auth | logon_type=10 (eyni host)
→ əl-klaviatura pattern-i
```

Sigma belə qaydaları vendor-neytral ifadə etmək üçün de-fakto açıq formatdır və icma repoları minlərlə qaydanı ATT&CK-a xəritələyir — başlanğıc kitabxanası, öz mühitinə tənzimlənmiş qaydaların əvəzi deyil.

## Tuning: əsl iş

Hər hansı SIEM-in ilk ayı yüzlərlə alert istehsal edir; əksəriyyəti yanlışdır. Tuning busywork deyil — detection keyfiyyətinin istehsal edildiyi yerdədir:

- **Susdurmadan əvvəl ölç.** Hər noisy qayda üçün: true-positive nisbəti, ən çox trigger edən entite-lər, real case-yə səbəb olub-olmadığı. Data "sadəcə söndür" arqumentini öldürür.
- **Yaranan səbəbi suppress et, qaydanı yox.** Backup servisinin planlı `whoami`-si recon qaydasını triq edirsə, _o servisi o hostlarda_ filtrləyin və niyəsini sənədləşdirin. Ümumi suppression real detection-ların öldüyü yerdədir.
- **Base-rate tələsinə baxın.** 99% dəqiq və gündə 200 dəfə atəşlənən alert analit-ləri gündə iki false-positive ilə basır. SOC miqyasında dəqiqlik recall qədər vacibdir.
- **Loop-u qidalandırın.** Hər bağlanmış false positive qaydanı yaxşılaşdırır; hər real incident ən azı bir yeni qayda və bir yeni data tələbi olur.

## Ətrafındakı SOC iş axını

Tier 1 alert-ləri qaydanın təlimatına uyğun triaj edir (yoxla, zənginləşdir, yüksəlt və ya bağla) cədd SLA ilə. Tier 2 araşdırır vəContained edir — [Log Analysis](/blue-teaming/log-analysis) və [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation) məhz burada ötür. Detection engineering qaydaların, parser-lərin və coverage xəritəsinin sahibidir. Hamını sadiq saxlayan metriklər: **MTTD** (deteksiyaya orta vaxt — SIEM-in əsas vədi), **MTTA** (qəbul etməyə vaxt), **MTTR** (həllə vaxt), qayda-başına false-positive nisbəti və sektorunuzu həqiqətən hədələyən texnikalara qarşı ATT&CK coverage.

## SIEM, XDR, ya da data lake?

- **Traditional SIEM** loq müxtəlifliyi və uyğunluq retention işi sürüklədikdə düzgün çərçivədir.
- **XDR** endpoint, identiklik və mail telemetriyasını vendor-tunlu detections ilə birləşdirir — sürətli time-to-value, lock-in və zəif custom məntiq mayası ilə.
- **Data lake** (obyekt saxlamada xam loglar, tələb üzrə query) uzun retention üçün maya qazandırır; ticarət — daha yavaş hunting və DIY deteksiya.

Yetkin komandalar hibridə yığılır: son 30–90 gün üçün SIEM/XDR-də isti deteksiya, uyğunluq və araşdırmaların tələb etdiyi il və ya daha çox üçün göldə soyuq sübut. Hər vendor dövrünü yaşayan arxitektur qayda: **Postgres-tipli təfəkkür — SIEM törəmədir, loglar həqiqətdir.** Xam logları export-əlçatan saxlayın; platformanın tək nüsxə olmasına heç vaxt icazə verməyin.

## Növbəti addım

- [Log Analysis](/blue-teaming/log-analysis) — hər qaydanın asılı olduğu əl-bacarığı.
- [Threat Hunting](/blue-teaming/threat-hunting) — eyni datanı alert-lərə yox, hipotezlərə qarşı işlətmək.
- [Endpoint Security](/blue-teaming/endpoint-security) — SIEM-in inges etdiyi ən zəngin tək mənbə.
- [Security Tools](/general-security/security-tools) — SIEM-in geniş alət dəstindəki yeri.
