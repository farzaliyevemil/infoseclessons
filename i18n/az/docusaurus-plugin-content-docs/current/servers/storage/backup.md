---
id: backup
title: Windows Server Backup
description: "Windows Server Backup üzrə praktik dərslik — backup növləri, quraşdırma, scheduled və on-demand backup, fayl/System State/bare metal bərpa və AD Recycle Bin."
slug: /servers/backup
sidebar_position: 9
status: reference
last_reviewed: 2026-04-28
keywords:
  - backup
  - windows server backup
  - wbadmin
  - system state
  - bare metal recovery
  - ad recycle bin
  - authoritative restore
  - rto
  - rpo
  - gfs
  - immutable backup
  - replication
difficulty: intermediate
---

# Windows Server Backup

Backup son təhlükəsizlik toru kimi işləyir. Disk xarab olanda, ransomware bir share-i şifrələyəndə, admin səhvən səhv OU-nu silib və ya update sistemi yararsız hala salanda — işləyən backup çox vaxt production-a qayıtmağın yeganə yoludur.

Backup-ın pis bir saat ilə itirilmiş bir həftə arasındakı fərqi yaratdığı tipik hallar:

- Disk xarab olub və üstündəki bütün data gedib
- Ransomware faylları şifrələyib və ödəniş tələb edir
- Administrator təsadüfən vacib OU və ya GPO-nu silib
- Active Directory database korlanıb, heç kim login ola bilmir
- Uğursuz update OS-i boot olunmaz vəziyyətə salıb
- İstifadəçi vacib faylı silib və geri istəyir

> Backup yoxdursa — data yoxdur. Backup test edilməyibsə — backup yoxdur.

## 3-2-1 qaydası

Sağlam backup strategiyası **3-2-1 qaydasına** uyğun olur:

```
3 — Datanın üç nüsxəsini saxla (original + iki backup)
2 — İki fərqli media tipində saxla (disk, tape, cloud)
1 — Bir nüsxəni offsite saxla (başqa fiziki məkanda)
```

Ransomware eyni LAN-da oturan backup-ı da şifrələyə bilər. Buna tab gətirən yalnız offsite nüsxədir.

## Backup növləri

| Növ | Nəyi kopyalayır | Üstünlük | Mənfi | Tipik cədvəl |
| --- | --- | --- | --- | --- |
| **Full** | Hər şeyi | Bərpa asan, tək fayldan | Yavaş, böyük | Həftədə 1 dəfə |
| **Incremental** | **Son backup-dan** (full və ya incremental) sonra dəyişən | Sürətli, az yer | Bərpa üçün full + bütün incremental-lar lazımdır | Hər gün |
| **Differential** | **Son full-dan** sonra dəyişən hər şey | Bərpa yalnız full + son differential ilə | Hər gün böyüyür | Hər gün |
| **System State** | AD database, registry, boot files, SYSVOL, CA DB | OS bərpa etmədən AD/GPO-nu qaytarır | Tam server image deyil | DC-lərdə hər gün |
| **Bare Metal Recovery (BMR)** | OS, driver, proqram, konfiqurasiya, data | Boş hardware-ə tam bərpa | Ən böyük image | Həftədə 1 dəfə |

### Incremental vs differential — nümunə

```
Bazar (Full):         50 GB

        Incremental                        Differential
B.     50 GB (full)                   B.     50 GB (full)
B.E.    2 GB (B.-dən bəri)            B.E.    2 GB (B.-dən bəri)
Ç.A.    3 GB (B.E.-dən bəri)          Ç.A.    5 GB (B.-dən bəri)
Ç.      1 GB (Ç.A.-dən bəri)          Ç.      6 GB (B.-dən bəri)
C.A.    4 GB (Ç.-dən bəri)            C.A.   10 GB (B.-dən bəri)

Cümə axşamı bərpa:
  Incremental:   Full + B.E. + Ç.A. + Ç. + C.A.  (5 fayl)
  Differential:  Full + C.A.                      (2 fayl)
```

Windows Server Backup arxa planda block-level incremental engine istifadə edir, amma bərpanı tək əməliyyat kimi göstərir.

### System State nəyi tutur

| Komponent | Qeyd |
| --- | --- |
| Registry | Bütün sistem konfiqurasiyası |
| Boot faylları | OS başlanğıcı üçün lazımdır |
| Active Directory database | `NTDS.dit`, yalnız domain controller-lərdə |
| SYSVOL | GPO faylları və login script-lər, yalnız DC-lərdə |
| Certificate Services DB | AD CS quraşdırılıbsa |
| Cluster DB | Server cluster üzvüdürsə |

Domain controller-də **System State aldığın ən vacib backup-dır** — bu, fəlakətdən sonra AD-ni bərpa etməyə imkan verən şeydir.

## Backup strategiyasının əsasları

Quraşdırma sehrbazına toxunmazdan əvvəl, əslində nədən qoruduğunu, nə qədər tez bərpa etmək lazım olduğunu və nə qədər geri qayıda biləcəyini qərarlaşdır. Windows Server Backup feature-ı sadəcə bir alətdir — ətrafındakı strategiya gerçək insidentin bir saatlıq bərpaya, yoxsa bir həftəlik dayanmaya çevrilməsini müəyyən edir.

### RTO və RPO

İki rəqəm hər backup dizaynını idarə edir. Onları biznes ilə razılaşdır, yaz və backup cədvəlini bu rəqəmlərə uyğun qur.

| Termin | Cavab verdiyi sual | Hansı amilə bağlıdır | Tipik nümunə |
| --- | --- | --- | --- |
| **RTO** (Recovery Time Objective) | Servis nə qədər müddət sıradan çıxa bilər biznesə zərər vurmadan? | Bərpa sürəti, hardware mövcudluğu, runbook keyfiyyəti | File server üçün 4 saat |
| **RPO** (Recovery Point Objective) | Vaxt baxımından nə qədər data itirə bilərik? | Backup tezliyi, replikasiya gecikməsi | HR share üçün 24 saat, AD üçün 15 dəqiqə |

```
                RPO                                    RTO
   |<------------>|                       |<----------------------->|
 son uğurlu       insident              bərpa                  servis
 backup            baş verdi             başladı                qaytdı
```

Biznes RPO 1 saat deyirsə, gecəlik backup kifayət etmir — saatlıq snapshot, log shipping və ya replikasiya lazımdır. RTO 1 saatdırsa, kuryerlə offsite-dan gətirilən tape kifayət etmir — local restore tier lazımdır.

### Coğrafi yayılma — 3-2-1-dəki "1"

"1 offsite" nüsxə dəbdəbə deyil, sağ qalan yeganə şeydir:

- **Saytı bütün tutan fəlakətlər** — yanğın, daşqın, zəlzələ, uzunmüddətli enerji kəsilməsi
- **LAN-ı keçən ransomware** — müasir variantlar backup share-ləri tapıb şifrələyir
- **Daxili sabotaj** — domain hüquqları olan admin on-prem backup-ları saniyələrlə silə bilər

Elə məsafə seç ki, bir hadisə hər iki nüsxəni məhv edə bilməsin. Otağın o tərəfi offsite deyil. Şəhərin o tərəfi bina yanğınından qoruyur, amma regional daşqından yox. Cross-region cloud və ya başqa şəhərdəki partnyor DC hər ikisindən qoruyur.

### Backup media tier-ləri

Müxtəlif storage media sürəti, qiyməti və dayanıqlığı dəyişir. Yetkin strategiya bir neçəsini istifadə edir:

| Tier | Üstünlük | Mənfi | Harada işə yarayır |
| --- | --- | --- | --- |
| **Disk (D2D)** | Sürətli bərpa, random access, asan script | Online — LAN-dakı ransomware-ə açıqdır | Gündəlik incremental üçün birinci hədəf |
| **Tape (LTO)** | TB başına ucuz, çıxarıldıqda təbii air-gap, onilliklərlə saxlama müddəti | Sequential, bərpası yavaş, robot və ya operator lazımdır | Uzunmüddətli retention, tənzimləmə arxivi |
| **Cloud / object storage** | Tərifinə görə offsite, dayanıqlı, miqyaslanır | Egress dəyəri, bərpa sürəti bandwidth-dən asılı, vendor lock-in | 3-2-1-dəki "1" nüsxə, DR landing zone |

Tipik nümunə: gecəlik D2D yerli repository-yə, həftəlik kopyası cloud object storage-ə, aylıq tape kitabxanadan çıxarılıb yanğından qorunan seyfdə saxlanılır.

### Replikasiya backup deyil

Replikasiya canlı datanın ikinci nüsxəsini fasiləsiz olaraq sinxron saxlayır. High availability üçün əladır və **backup-ın əvəzi deyil**.

| Rejim | Necə işləyir | RPO | Nə vaxt istifadə olunur |
| --- | --- | --- | --- |
| **Synchronous** | Yazma yalnız hər iki tərəf diskə yazandan sonra təsdiqlənir | Sıfıra yaxın | Eyni kampus və ya metro, aşağı latency link |
| **Asynchronous** | Primary dərhal yazır, secondary çatır | Saniyələr–dəqiqələr | Cross-region, cloud DR, WAN latency olan yerlər |

Tələ: replikasiya pis dəyişiklikləri də sədaqətlə kopyalayır. İstifadəçi qovluğu silsə, ransomware share-i şifrələsə və ya script database-i kəssə, replikasiya zərəri saniyələrlə secondary-yə ötürür. Əvvəlki vəziyyəti bərpa etmək üçün hələ də nöqtəvi backup lazımdır.

`example.local` mühitində tipik replikasiya texnologiyaları:

- **AD replikasiyası** domain controller-lər arasında (built-in, multi-master)
- **DFS Replication** file share-lər üçün
- **Storage Replica** volume səviyyəsində synchronous və ya asynchronous mirror
- **Hyper-V Replica** VM səviyyəsində asynchronous replikasiya
- **SAN-to-SAN** replikasiyası fərqli data-mərkəzlərdəki array-lar arasında

### Backup retention — Grandfather-Father-Son (GFS)

Sadəlövh "30 gün backup saxla" yanaşması 90 gün əvvəl başlayan korlanma görünənə qədər işləyir. GFS bunu bir neçə rotasiya tier-i ilə həll edir:

| Tier | Tezlik | Retention | Məqsəd |
| --- | --- | --- | --- |
| **Son** | Gündəlik | 7–14 gün | Dünənki səhvi geri qaytar |
| **Father** | Həftəlik | 4–6 həftə | Keçən ayın səhvini geri qaytar |
| **Grandfather** | Aylıq (çox vaxt rüb sonu full) | 12+ ay | Audit, tənzimləmə, dərin tarix |

```
B.E. Ç.A. Ç. C.A. C.  Ş.   B.    <- Son (gündəlik, 14 gün)
                     [Father]    <- Həftəlik full (6 həftə)
Ay sonu: [Grandfather]            <- Aylıq arxiv (12 ay+)
```

Tənzimlənən iş yükləri (maliyyə qeydləri, sağlamlıq datası, GRC öhdəlikləri) üçün retention IT seçimi ilə deyil, qanunla təyin olunur — bax: [risk and privacy](../../grc/risk-and-privacy.md).

### Immutable, WORM və air-gap backup

Müasir ransomware operatorları əvvəlcə backup-ları axtarır. Şəbəkədə oturur, backup serveri tapır, repozitoriyaları silir və ya şifrələyir, və yalnız sonra ransomware-i tətikləyirlər. Hücumçunun silə biləcəyi backup — backup deyil.

Üç üst-üstə düşən müdafiə:

- **Immutable backup** — backup hədəfi retention vaxtı dolanadək "silmə yox, üstünə yazma yox" qaydasını məcburi edir. Nümunələr: S3 Object Lock, Azure Blob immutability policy, Veeam hardened repository, Wasabi immutable bucket.
- **WORM (Write Once Read Many)** — eyni ideya storage səviyyəsində; tape-də və compliance-grade object storage-də adi haldır. Yazıldıqdan sonra mediyanın özü dəyişikliyi qəbul etmir.
- **Air-gap backup** — production-dan fiziki və ya məntiqi ayrılmış. Seyfdə çıxarılmış tape, offline yaşayan çıxarılan disk, və ya yalnız backup pəncərəsində əlçatan olan ayrı şəbəkədəki repozitoriya.

Praktik qayda: hər vacib datasetin ən azı bir nüsxəsi ya immutable, ya da air-gapped olmalıdır. Backup-ların yeganə yeri helpdesk-in yaza bildiyi domain-joined Windows share-dirsə, bir helpdesk hesabını phish edən hücumçu hamısını silə bilər. Ransomware cavab tərəfi üçün bax: [investigation and mitigation](../../blue-teaming/investigation-and-mitigation.md).

### High availability backup deyil

Bu ikisi tez-tez qarışdırılır və auditor və ya CIO "qorunmuşuqmu?" soruşanda fərq önəm daşıyır.

| Aspekt | High availability | Backup |
| --- | --- | --- |
| **Nədən qoruyur** | Hardware xətası, tək node sıradan çıxması | Data korlanması, silinmə, ransomware, dərin bərpa |
| **Vaxt üfüqü** | İndi (saniyələrlə failover) | Keçmiş (dünən, keçən ay, keçən il) |
| **Nümunələr** | Failover cluster, RAID, NIC teaming, redundant PSU | Gündəlik WSB işi, aylıq tape, immutable cloud nüsxə |
| **Səni xilas ETMƏYƏN** | İstifadəçi faylı silir — hər iki node silinməni xoşbəxt replikasiya edir | Anakart səhər 3-də yanır, ehtiyat hardware yoxdur |

Hər ikisi lazımdır. RAID və clustering hardware xətası boyunca servisi saxlayır (bax: [RAID](../../general-security/raid.md)); backup-lar məntiqi bir şey pozulanda zaman keçidi imkan verir.

### Ölçüləndirmə nümunəsi

`DC01.example.local` AD, DNS və 200 GB file share saxlayır. Biznes deyir: fayllar üçün RPO 24 saat, AD üçün 1 saat; RTO 4 saat.

- **Gündəlik** System State + critical-volume backup 21:00-da ayrılmış `D:` diskinə (Son tier, 14 gün)
- **Saatlıq** VSS vasitəsilə AD-aware snapshot iş saatları ərzində — 1 saat AD RPO üçün
- **Həftəlik** tam server image cloud object-storage bucket-ə kopyalanır, 30 gün object-lock ilə (offsite, immutable)
- **Aylıq** arxiv nüsxəsi 12 ay GFS Grandfather tier-də saxlanır
- **Bərpa təlimi** rüblük — təsadüfi backup götür, sandbox VM-ə bərpa et, AD database-in mount olduğunu və nümunə faylın açıldığını yoxla

Windows Server Backup üçün açıq mənbə alternativlər (Veeam Community, Bacula, Restic, BorgBackup) — bax: [backup and storage tools](../../general-security/open-source-tools/backup-and-storage.md) referansı.

## Windows Server Backup quraşdırması

Feature default olaraq quraşdırılmır.

```powershell
Install-WindowsFeature Windows-Server-Backup -IncludeManagementTools
```

GUI yolu: **Server Manager → Manage → Add Roles and Features → Features → Windows Server Backup**.

Console-u **Server Manager → Tools → Windows Server Backup** ilə və ya `wbadmin.msc` ilə aç.

```
Windows Server Backup
├── Local Backup
│   ├── Backup Schedule    — avtomatik cədvəl
│   ├── Backup Once        — birdəfəlik backup
│   ├── Recover            — bərpa
│   └── Status             — hazırkı / son backup nəticəsi
└── Messages
```

## Backup almaq

### Birdəfəlik backup (Backup Once)

Console-da **Backup Once… → Different options** və addımlar:

1. **Backup configuration:** tam image üçün `Full server (recommended)`, yoxsa konkret item-lər üçün `Custom`
2. **Add items:** `System State`-i işarələ (DC-də mütləqdir), əlavə olaraq lazımi volume və qovluqları
3. **Destination:**
   - `Local drives` — ayrılmış backup diski (ən yaxşısı)
   - `Remote shared folder` — UNC path, məsələn `\\BackupServer\Backups`
4. **Backup** düyməsini bas

PowerShell qarşılıqları:

```powershell
# Yalnız System State (DC-də ən vacibi)
wbadmin start systemstatebackup -backuptarget:D: -quiet

# Tam server (bütün critical volume-lar + System State)
wbadmin start backup -backuptarget:D: -include:C: -allcritical -systemstate -quiet

# Konkret qovluq network share-a
wbadmin start backup `
  -backuptarget:\\BackupServer\Backups `
  -include:C:\SharedData `
  -user:EXAMPLE\backupadmin -password:P@ssw0rd -quiet
```

Orta hardware-də təxmini müddətlər:

| Backup | Təxmini vaxt |
| --- | --- |
| System State | 5–15 dəq |
| Full server (~30 GB) | 15–45 dəq |
| Incremental (2–5 GB dəyişiklik) | 5–10 dəq |

### Scheduled backup

Console: **Backup Schedule… → Full server və ya Custom → Once a day / More than once a day → destination seç**.

Destination növləri:

- **Dedicated backup disk** — disk formatlanır və tamamilə Windows Server Backup tərəfindən idarə olunur. Ən etibarlısı.
- **Backup to a volume** — başqa diskin bir volume-u, digər data ilə paylaşıla bilər
- **Remote shared folder** — yalnız bir backup saxlanır (hər yeni backup əvvəlkini üstünə yazır)

PowerShell:

```powershell
$policy = New-WBPolicy
Add-WBSystemState -Policy $policy
Add-WBBareMetalRecovery -Policy $policy

$target = New-WBBackupTarget -VolumePath "D:"
Add-WBBackupTarget -Policy $policy -Target $target

Set-WBSchedule -Policy $policy -Schedule 21:00
Set-WBPolicy -Policy $policy
```

## Bərpa (Recovery)

Bərpa qərarları bir neçə əsas kateqoriyaya bölünür:

```mermaid
flowchart TD
    Start["Nəsə sındı"]
    Q1{"Nə itib?"}
    Files["Fayllar və ya qovluqlar"]
    Vol["Bütöv volume"]
    State["AD / registry / boot faylları"]
    HW["Bütöv server / hardware getdi"]

    Fix1["Files and Folders bərpası"]
    Fix2["Volumes bərpası"]
    Fix3["System State bərpası (DSRM)"]
    Fix4["Bare Metal Recovery"]

    Start --> Q1
    Q1 --> Files --> Fix1
    Q1 --> Vol --> Fix2
    Q1 --> State --> Fix3
    Q1 --> HW --> Fix4
```

### Fayl və qovluq bərpası

Console: **Recover… → This server → backup tarixini seç → Files and folders → path seç → Original location və ya Another location**.

```powershell
wbadmin get versions

wbadmin start recovery `
  -version:04/22/2026-21:00 `
  -itemtype:File `
  -items:C:\SharedData\vacib.docx `
  -recoveryTarget:C:\Recovered -quiet
```

### System State bərpası

AD korlananda, GPO-lar itəndə və ya registry sınanda lazım olur. Domain controller-də System State bərpası **Directory Services Restore Mode (DSRM)**-də işlədilir.

1. DC-ni restart et
2. Boot-da **F8** bas, yoxsa `bcdedit /set safeboot dsrepair` təyin et və restart et
3. DC promote olunanda təyin edilmiş **DSRM şifrəsi** ilə login ol
4. Elevated prompt-dan:

   ```
   wbadmin start systemstaterecovery -version:<versiya> -quiet
   ```

5. Normal boot-a qayıt:

   ```
   bcdedit /deletevalue safeboot
   ```

Sadə System State bərpası **non-authoritative**-dir: DC online qayıtdıqdan sonra digər DC-lər daha yeni data-nı replikasiya edib bərpanı üstünə yazacaq. DC-ni sadəcə təmir edəndə istədiyin budur. Bilərəkdən silinmiş və artıq replikasiya olunmuş obyekti geri qaytarmaq istəyəndə bu kifayət **deyil**.

### Authoritative restore (AD obyektlərini geri qaytarmaq)

Ssenari: kimsə `Students` OU-nu silib və silinmə bütün DC-lərə replikasiya olunub.

1. DC-ni DSRM-ə boot et
2. `wbadmin start systemstaterecovery` ilə System State bərpa et (DSRM-də qal)
3. `ntdsutil` ilə obyekti authoritative işarələ:

   ```
   ntdsutil
   > activate instance ntds
   > authoritative restore
   > restore subtree "OU=Students,DC=example,DC=local"
   > quit
   > quit
   ```

4. `bcdedit /deletevalue safeboot` və restart

OU indi authoritative işarələndiyi üçün bərpa olunmuş versiya digər DC-lərdəki tombstone-lardan daha yüksək version number-a malik olur və replikasiyada qalib gəlir.

### Bare Metal Recovery

Hardware gedibsə və ya disk silinibsə:

1. Windows Server installation media-dan boot et
2. **Repair your computer** seç (Install yox)
3. **Troubleshoot → System Image Recovery**
4. Backup yerini göstər
5. Bərpanın bitməsini gözlə və restart et

## AD Recycle Bin

AD silmələrinin əksəriyyəti System State bərpasına ehtiyac yaradır. Windows Server 2008 R2-dən bəri AD-də **Recycle Bin** var — silinmiş obyektlər recycle bin aktiv olduğu müddətcə backup olmadan yerində bərpa edilə bilər.

**Default olaraq deaktivdir.** İlk gün aktiv et:

```powershell
Enable-ADOptionalFeature `
  -Identity "Recycle Bin Feature" `
  -Scope ForestOrConfigurationSet `
  -Target "example.local" -Confirm:$false
```

Recycle Bin-in aktivləşdirilməsi **birtərəflidir** — sonradan deaktiv edilə bilməz. Aktivləşdirməyin heç bir mənfi tərəfi yoxdur.

Silinmiş obyekti bərpa etmək:

```powershell
# Silinmiş user-ləri göstər
Get-ADObject -Filter {isDeleted -eq $true -and objectClass -eq "user"} -IncludeDeletedObjects

# Display name ilə birini bərpa et
Get-ADObject -Filter {displayName -eq "Əli Vəliyev" -and isDeleted -eq $true} `
  -IncludeDeletedObjects | Restore-ADObject

# Silinmiş OU-nu bütün içindəkilərlə birlikdə bərpa et
Get-ADObject -Filter {isDeleted -eq $true -and name -like "*Students*"} `
  -IncludeDeletedObjects | Restore-ADObject
```

Silinmiş obyektlər **tombstone lifetime** müddətində recycle bin-də qalır (default 180 gün). Sonra həmişəlik gedir.

## Monitoring

### Status və son işləmə

```powershell
Get-WBSummary                    # Son backup nəticəsi
Get-WBJob -Previous 1            # Son işin detalları
Get-WBPolicy | Select Schedule, BackupTargets
wbadmin get versions             # Saxlanılan bütün backup-lar
```

### Event log

```
Event Viewer → Applications and Services Logs → Microsoft → Windows → Backup → Operational
```

| Event ID | Mənası |
| --- | --- |
| 4 | Backup uğurlu oldu |
| 5 | Backup uğursuz oldu |
| 8 | Scheduled backup başlamadı |
| 9 | Backup cancel olundu |
| 14 | Bərpa uğurlu oldu |

```powershell
Get-WinEvent -LogName "Microsoft-Windows-Backup" -MaxEvents 20 |
  Select TimeCreated, Id, LevelDisplayName, Message
```

## Praktik nəticələr

- Hər domain controller-də ən azı gündəlik System State backup al
- Tez BMR üçün həftəlik full server backup saxla
- 3-2-1-ə əməl et; yalnız LAN-da olan backup ransomware hədəfidir, bərpa planı deyil
- Bərpaları müntəzəm olaraq test et — heç vaxt bərpa edilməmiş backup — backup deyil
- Forest-in ilk günündə AD Recycle Bin-i aktiv et
- DSRM şifrəsini yadda saxla və password vault-da saxla; onsuz System State bərpa edə bilməzsən
- Backup işinin uğursuzluqlarına alert qur ki, səssiz dayanma həftələrlə görünməmiş qalmasın
- Ən azı 30 gün retention saxla; tənzimlənən data üçün daha çox
- Bərpa runbook-unu sənədləşdir, o cümlədən DSRM-i kimin başlatma səlahiyyəti olduğunu

## Faydalı linklər

- Windows Server Backup icmalı: [https://learn.microsoft.com/en-us/windows-server/administration/windows-server-backup/windows-server-backup](https://learn.microsoft.com/en-us/windows-server/administration/windows-server-backup/windows-server-backup)
- `wbadmin` reference: [https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin)
- AD Recycle Bin addım-addım: [https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/dd392261(v=ws.10)](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/dd392261(v=ws.10))
- `ntdsutil` ilə authoritative restore: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/troubleshoot/perform-an-authoritative-restore](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/troubleshoot/perform-an-authoritative-restore)

## İstinad şəkilləri

Bu illüstrasiyalar orijinal təlim slaydından götürülüb və yuxarıdakı dərs məzmununu tamamlayır.

<div className="lesson-image-grid">
  <figure><img src="/img/lessons/backup/slide01_image1.jpeg" alt="Slayd 1" loading="lazy" /><figcaption>Slayd 1</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide03_image2.png" alt="Slayd 3" loading="lazy" /><figcaption>Slayd 3</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide04_image3.png" alt="Slayd 4" loading="lazy" /><figcaption>Slayd 4</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide05_image4.png" alt="Slayd 5" loading="lazy" /><figcaption>Slayd 5</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide06_image5.png" alt="Slayd 6" loading="lazy" /><figcaption>Slayd 6</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide07_image6.png" alt="Slayd 7" loading="lazy" /><figcaption>Slayd 7</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide08_image7.png" alt="Slayd 8" loading="lazy" /><figcaption>Slayd 8</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide09_image8.png" alt="Slayd 9" loading="lazy" /><figcaption>Slayd 9</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide10_image9.png" alt="Slayd 10" loading="lazy" /><figcaption>Slayd 10</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide11_image10.png" alt="Slayd 11" loading="lazy" /><figcaption>Slayd 11</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide12_image11.png" alt="Slayd 12" loading="lazy" /><figcaption>Slayd 12</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide13_image12.jpeg" alt="Slayd 13" loading="lazy" /><figcaption>Slayd 13</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide14_image13.jpeg" alt="Slayd 14" loading="lazy" /><figcaption>Slayd 14</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide16_image14.png" alt="Slayd 16" loading="lazy" /><figcaption>Slayd 16</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide17_image15.png" alt="Slayd 17" loading="lazy" /><figcaption>Slayd 17</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide18_image16.png" alt="Slayd 18" loading="lazy" /><figcaption>Slayd 18</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide22_image17.png" alt="Slayd 22" loading="lazy" /><figcaption>Slayd 22</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide24_image18.png" alt="Slayd 24" loading="lazy" /><figcaption>Slayd 24</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide25_image19.png" alt="Slayd 25" loading="lazy" /><figcaption>Slayd 25</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide26_image20.png" alt="Slayd 26" loading="lazy" /><figcaption>Slayd 26</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide27_image21.png" alt="Slayd 27" loading="lazy" /><figcaption>Slayd 27</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide28_image22.png" alt="Slayd 28" loading="lazy" /><figcaption>Slayd 28</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide30_image23.png" alt="Slayd 30" loading="lazy" /><figcaption>Slayd 30</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide33_image24.png" alt="Slayd 33" loading="lazy" /><figcaption>Slayd 33</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide34_image25.png" alt="Slayd 34" loading="lazy" /><figcaption>Slayd 34</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide35_image26.png" alt="Slayd 35" loading="lazy" /><figcaption>Slayd 35</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide36_image27.png" alt="Slayd 36" loading="lazy" /><figcaption>Slayd 36</figcaption></figure>
  <figure><img src="/img/lessons/backup/slide37_image28.png" alt="Slayd 37" loading="lazy" /><figcaption>Slayd 37</figcaption></figure>
</div>
