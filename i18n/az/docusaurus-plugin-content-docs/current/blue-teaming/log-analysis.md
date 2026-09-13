---
id: log-analysis
title: Blue Team üçün Loq Analizi
description: Müdafiəçilər üçün praktik loq analizi — Windows və Linux-də əslində vacib olan loq mənbələri, təkrarlanabilir triaj iş axını, taym-layn qurma, IOC axtarışı və araşdırmaları həll edən və ya batıran query və tələlər.
slug: /blue-teaming/log-analysis
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: blue-teaming
keywords:
  - log analysis
  - blue team
  - windows event log
  - sysmon
  - syslog
  - journald
  - auditd
  - ioc hunting
  - timeline
difficulty: foundation
---

# Blue Team üçün Loq Analizi

Alert-lər _nəsə baş verdiyini_ deyir; loqlar isə _əslində nə baş verdiyini_. On dəqiqəlik containment ilə ikihəftəlik yanğın arasındakı fərq demək olar ki, həmişə ilk saatdakı loq analizin keyfiyyətidir. Bu dərs [Incident Investigation and Mitigation](/blue-teaming/investigation-and-mitigation)-ın praktik alt qatıdır: hansı mənbələri çəkməli, triajı necə aparmaalı, taym-laynı necə qurmaalı və araşdırmalar harda səhv gedir.

## Yalnız iki sual

İşlətdiyiniz hər loq query-si sonunda iki sualdan birinə xidmət edir:

1. **Scope** — bunun daha nəyə toxundu? (hesablar, hostlar, data)
2. **Ardıcıllıq** — hadisələr hansı qaydada baş verdi? (ilk giriş → imtiyaz yüksəlişi → hərəkətlər)

Heç birinə cavab verməyən query-ni keçin. Bu intizam vacibdir, çünki loq həcmi faktiki olaraq sərhədsizdir; bacarıq toplamada deyil, xaric etmədədir.

## Yaddaşa dəyən Windows loq mənbələri

Windows loqlaşdırma yanğın şlaqıdır. Araşdırmaları dəfələrlə həll edən hadisələr bunlardır:

| Event ID                  | Log      | Nə deyir                                                                                                                                                                                |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4624 / 4625               | Security | Uğurlu / uğursuz girişlər. **Logon Type**-a baxın: 2 = konsol, 3 = şəbəkə, 10 = RDP, 5 = servis. İş stansiyalarından Type 3 və 10 — lateral movement məhz orada yaşayır.                |
| 4688                      | Security | Proses yaradılması (komanda sətri üçün auditing aktiv olmalıdır) — ən yüksək dəyərli tək Windows hadisəsi.                                                                              |
| 4720 / 4722 / 4725 / 4726 | Security | Hesab yaradıldı / aktivləşdirildi / deaktiv edildi / silindi.                                                                                                                           |
| 4728 / 4732 / 4756        | Security | Qrupa üzv əlavə olundu (global / domain local / universal) — xüsusən imtiyazlı qruplara baxın.                                                                                          |
| 4672                      | Security | Yeni girişə xüsusi imtiyazlar verildi — admin-bənzəri sessiyaları işarələyir.                                                                                                           |
| 4698 / 4699               | Security | Scheduled task yaradıldı / silindi — klassik persistence.                                                                                                                               |
| 1102 / 517                | Security | **Audit log təmizləndi** — nadir hallarda normaldır, həmişə araşdırma siqnalıdır.                                                                                                       |
| 7045                      | System   | Yeni servis quraşdırıldı — servis üzərindən persistence.                                                                                                                                |
| Sysmon 1 / 3 / 7 / 8 / 11 | Sysmon   | Tam komanda sətri ilə proses yaradılması / şəbəkə qoşulması / image load / remote thread / fayl yaradılması. Yaxşı config ilə Sysmon Windows-u qara qutudan yazıçı studiyasına çevirir. |

Event-lərdən əlavə RDP tarixçəsi: `Microsoft-Windows-TerminalServices-LocalSessionManager/Operational` — Security logları qarışıq olanda belə kimin hansı hosta qoşulduğunu göstərir.

## Yaddaşa dəyən Linux loq mənbələri

| Mənbə                                                              | Nə deyir                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `/var/log/auth.log` (Debian/Ubuntu) və ya `/var/log/secure` (RHEL) | SSH girişləri, sudo istifadəsi, hesab dəyişiklikləri — hər Linux hostda ilk məkan.                                  |
| `journalctl` (systemd)                                             | Hər unit-dən hər şey; `journalctl --since "2026-09-01" -u sshd` araşdırmada normal cümlədir.                        |
| auditd (`/var/log/audit/audit.log`)                                | Syscall səviyyəli audit qaydaları: fayl girişi, execve, istifadəçi komandaları. Kobud, amma dəyişdirilməyə davamlı. |
| Web/access logları (`nginx/access.log`, Apache)                    | Açıq applərə qarşı exploitation cəhdləri, qəribə user agent-lər, həcm anomaliyaları.                                |
| Cron və systemd timer logları                                      | Persistence: nə işlədi, nə vaxt, kimin adına.                                                                       |

Jurnal persistensini erkən yoxlayın: `ls /var/log/journal` — bir çox defolt quraşdırmada jurnal volatildir və reboot-da ölür, məhz sizi ən çox lazım olduğu anda. Bunu hadisədən sonra yox, əvvəl düzəldin.

## Təkrarlanabilir triaj iş axını

1. **Vaxta lövbər salın.** Trigger alertin dəqiq UTC vaxtını və hər mənbənin saat qurşağı fərziyyəsini müəyyənləşdirin. Saat qurşağı intizamı olmadan loq analizi özünəminə Yanlış taym-layn-lar yaradır.
2. **Xəstəni müəyyənləşdirin.** Hansı istifadəçi, hansı host, hansı proses? Hesabın son 4624/4625 tarixçəsini, hostun son 4688-lərini çəkin.
3. **Həcmlə yox, pivot ilə genişlənin.** Lövbərdən: hesabın digər girişləri (lateral movement), prosesin uşaqları və şəbəkə qoşulmaları, təyinat IP-lərinin digər toxunma nöqtələri. Hər addım bir query-dir, maraton scroll deyil.
4. **Taym-layn qurun.** Hadisələri bir xronologiyada birləşdirin (UTC). Azad-forma qeydlər ölür; `timestamp, aktor, hərəkət, mənbə, artefakt` formatlı CSV review-dan sağ çıxır.
5. **Hadisəni sərhədləyin.** İki vaxt damğası hər şeyə qərar verir: **ilk zərərli fəaliyyət** (adətən deteksiyadan günlər əvvəl) və **hücumçu nəzarətinin son dəlili** (containment scope-unu müəyyən edir).
6. **Yazdıqca yazın.** Query-lər, nəticələr və nəticələr case faylında. Gələcək siz və auditor hər ikisinə lazımdır.

## Praktikdə IOC axtarışı

IOC sweep-lər ucuz işləyir və asanlıqla pis edilir. Məqsədli edin:

- **Güclü identifikatorlarla** korrelyasiya edin: fayl hash-ləri, tam komanda sətirləri, domain adları. IP ünvanlar tez köhnəlir; tək user-agent string-i qanuni proqramlara da uyğun gəlir.
- Əvvəlcə **geniş amma dayaz** sweep edin (bir IOC, bütün hostların auth və proses loglarında), sonra yalnız vurğun olduğu yerdə dərinləşin.
- İlk giriş hostunun yanlış olmasını gözləyin — hücumçu infrastrukturu (VPN, proxy) deməkdir ki, _istifadəçinin_ endpoint-i pivotdur, mənbə IP deyil.
- Coverage-i izləyin: "hash 840 hostun 4688 + Sysmon 1 loglarında 14 gün sweep edildi, sıfır vurğun" — yazılmağa dəyər bir nəticədir. Mənfi nəticələr hadisəni sərhədləyir.

```bash
# Linux sürətli sweep: şübhəli hesabın bütün sudo/auth hadisələri
grep "suspect.user" /var/log/auth.log* | grep -Ev "session|systemd"

# Mənbə IP-yə görə uğursuzluqlar — credential stuffing forması
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head
```

```text
# Windows KQL-şəkilli eskiz: nadir proses valideynləri
SecurityEvent
| where EventID == 4688
| summarize count() by ParentProcessName, NewProcessName
| where count_ < 5        // tək başına valideyn-uşaq cütlükləri gözləməyə dəyər
```

## Halları həll edən tələlər

- **Saat qurşağı sürüşməsi.** Fərqli sistemlərdən lokal-vaxt logları səhv yerdəyişir. Nəsə birləşdirməzdən əvvəl UTC-yə normalizə edin.
- **Log təmizlənməsi.** Event 1102 / boş journald seqmentləri / əks tərəfə davamlı mənbələrdə boşluqlar özlüyündə dəlildir — hücumçu təmizləyir və təmizlik öz izini qoyur.
- **Log rotasiya korluğu.** Rotasiya olunmuş və sıxılmış loglar (`auth.log.2.gz`) da axtarılmalıdır; ən çox buraxılan pivot-lar canlı faylda yox, arxivlərdə yaşayır.
- **Tək mənbəyə inam.** VPN logu ilə EDR proses hadisəsi "eyni sessiya" haqqında ziddiyyət tərsinə düşmək üçün deyil — bu, araşdırmanın özüdür.
- **Hücumçu yaşama müddətindən aşağı retention.** Sənaye dwell-time medianı həftələrlədir. 30 günlük isti loqlar deməkdir ki, bəzi hadisələr sadəcə bilmək mümkün deyil.

## Bunun yeri

- [SIEM Fundamentals](/blue-teaming/siem-fundamentals) — bunu host ölçüsündən fleet ölçüsünə keçirmək.
- [Threat Hunting](/blue-teaming/threat-hunting) — eyni bacarıqları alert-lərə yox, hipotezlərə yönəltmək.
- [Digital Forensics](/blue-teaming/digital-forensics) — araşdırma logdan çox disk və yaddaş istəyəndə.
- [Linux Hardening](/operating-systems/linux/hardening) və [Endpoint Security](/blue-teaming/endpoint-security) — bir gün lazım olacaq loqları indi yaratmaq.
