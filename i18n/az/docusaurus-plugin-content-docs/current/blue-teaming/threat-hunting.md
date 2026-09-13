---
id: threat-hunting
title: Threat Hunting
description: Blue team üçün hipotez-əsaslı threat hunting — hunting dövrü, hipotezlərin seçilməsi və ballandırılması, persistence və living-off-the-land texnikaları üçün praktik ovlar və tapıntıların daimi detection-lara çevrilməsi.
slug: /blue-teaming/threat-hunting
sidebar_position: 7
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - threat hunting
  - blue team
  - mitre attack
  - hipotez
  - living off the land
  - persistence
  - detection engineering
difficulty: intermediate

tags:
  - blue-team
  - intermediate
---

# Threat Hunting

Alert-lər tapılmaq istəyən hücumçuları tapır. Threat hunting tapmaq istəməyənlər üçündür — mühitinizdə səssizcə yaşayan əl-klaviatura operatoru, xüsusi sizin şirkətiniz üçün yazılmış malware, heç bir threshold-un triq etmədiyi kompromitə olunmuş vendor hesabı. Hunt, **heç bir alertin yaxalamadığı zərərli fəaliyyət üçün telemetriyada qəsdən axtarışdır**, səhifə deyil, hipotez tərəfindən idarə olunur. SIEM "qaydalarımız atəşləndimi?" sualını cavablandırırsa, hunt narahatedici sualı cavablandırır: "qaydalarımız _indi_ nəyi buraxır?"

Bu dərs [Log Analysis](/blue-teaming/log-analysis)-dan telemetriya əsaslarını və [SIEM Fundamentals](/blue-teaming/siem-fundamentals)-dan platformanı fərz edir — toplanmamış, normalizə olunmamış data ilə hunting bahalı kürsüdə təxmin etməkdir.

## Hunting dövrü

Praktik hunting dalmadan çox, dövrüdür:

1. **Hipotezi çərçivələndirin.** Konkret və təkzib-olunabilir: _"Son 14 günə shell girişi olan servis hesabı iş stansiyasına interaktiv login olub"_ — _"bir yerdə pis bir şey baş verirmi?" deyil._
2. **Data və texnika seçin.** Hansı loq mənbələri cavabı saxlayır (authentifikasiya, proses yaradılması, fayl hadisələri) və hansı MITRE ATT&CK texnikası hipotezi ifadə edir (T1078.003 lokal hesablar, T1059 shell komandaları).
3. **Açıq zehinlə query edin.** Axtarışı işlədin — amma yolda hər anomaliyanı data kimi qəbul edin. Əksər ovlar analitin orijinal ideyadakı tunel görüşündən ölür.
4. **Səmimi qiymətləndirin.** Yaxşı izah tapıldı → sənədləşdirin (o, baseline bilgisi deliverable-dır). Şübhəli və izah edilə bilməz → case-ə yüksəldin ([Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)-a baxın).
5. **Məhsul yığın.** Hər hunt artefaktlarla bitir: yeni detection qaydası, tənzimlənmiş parser, sənədləşdirilmiş baseline, və ya data-boşluğu bileti ("buna cavab verə bilmirik — EDR build serverlərində yoxdur"). **Yazıya alınmamış hunt heç vaxt baş verməyib.**

Yetkin proqramlar bu dövrü təqvimsel işlədir (həftəlik kadans yayğındır) və hər hansı mühəndislik işi kimi izləyir: qaldırılan hipotezlər, tamamlanan ovlar, yaradılan detection-lar, açılan data boşluqları, əlavə olunan coverage.

## Hipotezlər hardan gəlir

- **ATT&CK coverage boşluqları.** Detection qaydalarınızı ATT&CK-a xəritələyin; boş hüceyrələr hunting növbəsidir. "Linux-da T1547 boot autostart üçün heç nə təsbit etmirik" — hunt tapşırığıdır.
- **Yeni threat intelligence.** Sizin stack-ə uyğun gələ biləcək TTP-ləri — IOC-ləri yox — təsvir edən kampaniya hesabatı. IOC-lər günlərlə köhnəlir; davranışlarla illərlə ov aparılır.
- **Keçmiş incidentlərdən sürprizlər.** Hər post-incident review "Ya onlar X əvəzinə Y etsəydilər?" sualını verir — o, Y-lər əvvəldən-yoxlanılmış hipotezlərdir.
- **Öz hücum səthiniz.** Yeni SaaS inteqrasiyası, heç kimin sahib olmadığı legacy server, alınmış şirkətin domeni: estate-dəki hər dəyişiklik hunting promptudur.
- **İdmançı instinkti.** Bir az yanlış görünən metrik, loq həcmi pattern-i fərqlənən host. Onları izləyin — gut tapıntıları adətən formalılaşdırmağa dəyər pattern tanımadır.

## Saatlara dəyən dörd ov

### 1. Living-off-the-land binary-lər

Hücumçular malware əvəzinə imzalanmış admin alətlərindən istifadə edirlər. _Qanuni binary-ləri qanunsuz kontekstdə_ axtarın:

```text
# Office applərindan PowerShell, kodlanmış komandalar, download cradle-lər
process_events
| where parent in ("winword.exe","excel.exe","outlook.exe")
| where child in ("powershell.exe","cmd.exe","mshta.exe")

# Download edən certutil və ya bitsadmin — serverlərdə heç vaxt normal deyil
process_events | where name in ("certutil.exe","bitsadmin.exe")
| where cmdline has_any ("http","urlcache")
```

Əvvəlcə baseline qurun ("bizim backup agentimiz saatda bir dəfə certutil işlədir"), sonra istisnaları ovlayın. Nəticə demək olar ki, həmişə _münasibətlər_ haqqında detection qaydasıdır (valideyn→uşaq, istifadəçi→host) — məhz generic imzaların buraxdığı şey budur.

### 2. Reboot-lardan sağ çıxan persistence

Yenidən icranı təmin edən hər şey hücumçunun əmlakıdır. Çəpərin hər iki tərəfini sweep edin:

- **Windows**: dəyişiklik pəncərələri xaricində yaradılmış scheduled task-lar (4698), yeni servisler (7045), Run açarları və startup-qovluq yazıları (Sysmon 13/11), WMI abunəlikləri.
- **Linux**: paket idarəetməsi xaricində əlavə olunmuş systemd unit və timer-ləri (`/etc/systemd/system`-i paket manifestləri ilə diff edin), `authorized_keys` dəyişiklikləri, servis hesablarının crontab-ları, `rc.local` redaktələri.

Ən güclü versiya set-nəzəriyyəsidir: _estate-dəki hər scheduled task, dəyişiklik-bileti inventarı ilə join olunmuş_ — set fərqi izah edilməli hər şeyin qısa siyahısıdır.

### 3. İdentiklik: iki insan kimi davranan hesablar

İdentiklik telemetriyası ən yüksək-siqnallı hunting sahəsidir:

- **İnteraktiv və ya RDP login olan** servis hesabları (servis kimi authentifikasiya etməlidirlər, desktop-da oturmamalıdırlar).
- **Mümkünsüz səyahət** ilə authentifikasiya edən və ya həmin hesab üçün heç vaxt görünməmiş subnet-lərdən gələn hesablar.
- **Yatan hesabların oyanması** — 90 gün sükut, sonra saat 3-də VPN.
- MFA-yorğunluq formaları: push-bombing partlayışları, və ya istifadəçi üçün heç vaxt görünməmiş cihazdan uğurlu MFA.

Bu ovlar [SIEM](/blue-teaming/siem-fundamentals) dəyər cədvəlindəki Tier-1 mənbələr tələb edir — identiklik əvvəl, həmişə.

### 4. Yan qapıdan çıxan data

Exfiltration həcm sürüşmələrində gizlənir: baseline-ın 50×-i həcmini heç vaxt görünməmiş təyinata upload edən host, yüksək-entropiya subdomain-ləri ilə DNS sorğuları, heç vaxt istifadə etməyən istifadəçinin bulud saxlama API-ləri. Baseline-lar bu ovu mexaniki edir — məhz buna görə də NetFlow/proxy/DNS logları toplanmadıqda səssizcə uğursuz olur. Buradakı ov çıxışı çox vaxt data-boşluğu tapıntısıdır və bu, real nəticədir.

## Hunting-i səmimi saxlayan intizam

- **Vaxt-limiti qoy.** Yazılmış sualı olan ikisaatlıq ovlar, emosiya ilə səkkizsaatlıq dalmalardan üstündür. Maraqlı olursa, yüksəldin — bütün intrusion-u hunt slotu daxilində təqib etməyin.
- **Anomalidən əvvəl baseline.** "Nadir" nəyin adi göründüyünü bilmədən mənasızdır; yeni telemetriya ilə hər hunt-un ilk icrası deteksiya deyil, baseline-qurmadır.
- **Hər şeyi yaz.** Query-lər, screenshot-lar və hər qəribəlik üçün yaxşı izah. Hunt sənədi bir analitin anlayışını komandanın bacarığına çevirəndir.
- **Çevir və ya bağla.** Çıxış şərtləri: deploy olunmuş yeni qayda, sənədləşdirilmiş baseline, açılmış data-boşluğu bileti və ya açılmış case. Başqa hər şey tamamlanmamış huntdur.

## Hunting proqramını ölçmək

Hunting metrikləri sürüşkəndir (qarşısı alınan breach-ləri saymaq olmaz). Faktiki nəzarət etdiyiniz şeyi izləyin: aylıq icra olunan hipotezlər, **ovlardan yaradılan detection qaydaları**, bağlanan telemetriya boşluqları, rüblük ATT&CK coverage deltası, huntdan deploy olunmuş detection-a orta vaxt. Çıxışı böyüyən qayda kitabxanası və kiçilən coverage xəritəsi olan proqram işləyir — heç bir zərərli fəaliyyət tapılmayan rüblərdə belə, çünki "heç nə tapılmadı, indi nə görə bildiyimizin sübutu buradadır" məhz istədiyiniz nəticədir.

## Növbəti addım

- [Log Analysis](/blue-teaming/log-analysis) və [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — hunting-in dayandığı data qatı.
- [Threat Actors and Intel](/red-teaming/threat-actors-and-intel) — intelligence-i hipotezlərə çevirmək.
- [Attack Indicators](/red-teaming/attack-indicators) — ovların korrelyasiya etdiyi IOC lüğəti.
- [Digital Forensics](/blue-teaming/digital-forensics) — hunt case-ə yüksəldikdə.
