---
id: storage-filesystems-servers
title: Storage, Fayl Sistemləri və Server Form Factorları
description: "DAS, NAS, SAN, NTFS vs ReFS, MBR vs GPT, VHD növləri, tower/rack/blade serverlər və vSphere datastore protokolları."
slug: /servers/storage-filesystems-servers
sidebar_position: 7
status: reference
last_reviewed: 2026-04-22
keywords:
  - storage
  - das
  - nas
  - san
  - ntfs
  - refs
  - gpt
  - vhd
  - rack server
difficulty: foundation
---

# Storage, Fayl Sistemləri və Server Form Factorları

Bu dərs fiziki diskdən hypervisor-a qədər storage təbəqəsini əhatə edir: storage növləri (DAS/NAS/SAN), partition table-ları, fayl sistemləri, virtual disk formatları, fiziki server form-factorları və VMware vSphere-in hər birini necə istifadə etdiyi.

## Storage növləri

Storage — davamlı məlumatları saxlayan sistemlərə verilən termindir. Enterprise storage üç əsas təqdim modelində gəlir:

### DAS — Direct Attached Storage

Ən sadə model: disklər birbaşa tək serverə qoşulur, aralarında şəbəkə yoxdur.

- Ən ucuz variant
- Yalnız qoşulduğu serverdən əlçatandır
- Böyük miqyasda çevikliyi azdır
- Tipik interfeys: SAS (Serial Attached SCSI) və ya SATA

### NAS — Network Attached Storage

NAS — adi IP şəbəkəsi üzərindən hostname ilə əlçatan storage appliance-dır. Client-lər fayl paylaşma protokolları ilə qoşulur.

- File server kimi istifadə olunur — faylları saxla, paylaş və götür
- Ümumi protokollar: SMB (Windows), NFS (Unix), iSCSI (block)
- Konfiqurasiyası asandır
- Throughput SAN-dan aşağıdır; fayl paylaşma və kiçik yüklər üçün uyğundur, ağır tranzaksion iş yükləri üçün az ideal

### SAN — Storage Area Network

Ən professional səviyyə, enterprise iş yükləri üçün dizayn edilib. SAN-ın serverlər və storage array-lər arasında öz ayrıca şəbəkəsi (ayrı switch-lər) var.

```
Server → HBA → SAN switch → Storage array (EMC, NetApp, Pure…)
```

Ümumi nəqliyyatlar:

- **Fibre Channel (FC)** — ən yüksək performans; SFP modullar və FC kabeldən istifadə edir
- **iSCSI** — standart Ethernet üzərindən block storage; daha ucuz, bir çox iş yükü üçün yaxşıdır
- **FCoE** — Ethernet frame-lərinə inkapsul edilmiş FC

Nümunə SAN switch-lər: Brocade 300 (24 port), Brocade 5100 (40 port). **HBA (Host Bus Adapter)** — serveri SAN fabric-ə qoşan PCIe kartdır.

**Güclü tərəfləri:** mərkəzi idarəetmə, yüksək throughput, yüksək redundancy, enterprise iş yükləri üçün scale edir.
**Mənfi tərəfləri:** bahalıdır, istismar üçün xüsusi bacarıq tələb edir.

### Müqayisə

| | DAS | NAS | SAN |
| --- | --- | --- | --- |
| Qoşulma | Birbaşa | LAN | Ayrıca SAN fabric |
| Protokol | SAS/SATA | SMB/NFS/iSCSI | FC/FCoE/iSCSI |
| Throughput | Orta | Aşağı | Çox yüksək |
| Qiymət | Aşağı | Orta | Yüksək |
| Tipik istifadə | Kiçik quraşdırmalar | File server | Enterprise, virtualizasiya |

## Disk partition table-ları

Partition table diskin necə partisiyalara bölündüyünü müəyyən edir. İkisi geniş istifadə olunur:

### MBR (Master Boot Record)

- **2 TB**-a qədər diskləri dəstəkləyir
- Maksimum **4 primary partition**
- Legacy BIOS boot

### GPT (GUID Partition Table)

- 2 TB-dan böyük diskləri dəstəkləyir (cari hardware üçün praktik olaraq limitsizdir)
- Default olaraq **128 partition**-a qədər
- UEFI boot üçün tələb olunur
- Müasir sistemlər üçün tövsiyə olunur

> Kiçik **recovery partition** (~100–500 MB) OS quraşdırıldıqda avtomatik yaradılır.

### Disk növləri

| Növ | Məqsəd |
| --- | --- |
| Basic disk | Primary/extended partition və sadə volume-lərlə standart disk |
| Dynamic disk | Windows software RAID və spanned/striped volume-lər üçün |

## Fayl sistemləri

Windows Server bir neçə fayl sistemi ilə gəlir, hər biri fərqli iş yüklərinə uyğundur:

| Fayl sistemi | Tam adı | Qeyd |
| --- | --- | --- |
| FAT / FAT32 | File Allocation Table | Legacy; 4 GB maksimum fayl ölçüsü |
| exFAT | Extended FAT | USB disklər, flash kartlar |
| NTFS | New Technology File System | Windows üçün default ✓ |
| ReFS | Resilient File System | Çox böyük volume-lər, data bütövlüyü üçün dizayn edilib |

### FAT32 vs NTFS

| | FAT32 | NTFS |
| --- | --- | --- |
| Max fayl ölçüsü | 4 GB | Praktik olaraq limitsizdir |
| Compression | Yox | Var |
| Encryption (EFS) | Yox | Var |
| ACL / icazələr | Yox | Var |
| Journaling | Yox | Var |

> **Allocation unit size** oxuma/yazma performansına təsir edir. SQL database kimi iş yükləri I/O nümunəsinə uyğun daha böyük allocation unit (məs. 64 KB) seçir.

### ReFS (Resilient File System)

Windows Server 2012-də təqdim olunub və sonrakı release-lərdə yetkinləşib, ReFS çox böyük volume-ləri hədəfləyir və data bütövlüyünə (checksum-lar, integrity stream-lər, silent corruption-dan qoruma) fokuslanır. Lakin hər Microsoft iş yükü ReFS-i dəstəkləmir — məsələn, Exchange və ya SQL database-ləri birbaşa ReFS üzərində işlətməyin məhdudiyyətləri var. İş yüklərini ora yerləşdirmədən əvvəl cari Microsoft rəhbərliyinə baxın.

## Virtual disk formatları

Virtual disk formatları VM-in "disk"-ini hostda və ya shared storage-da fayl kimi saxlayır:

| Format | Platforma |
| --- | --- |
| .vhd / .vhdx | Hyper-V (Microsoft) |
| .vmdk | VMware |

### VHD növləri

**Fixed**
Elan edilən tam ölçüsünü dərhal reserve edən VHD. 300 GB təyin olunubsa, yaradıldıqda hostda 300 GB götürülür.

- Ən yüksək performans ✓
- Database və yüksək I/O iş yükləri üçün tövsiyə olunur

**Dynamically expanding**
Kiçik başlayır və data yazıldıqca elan edilən maksimuma qədər böyüyür.

- Host storage-dan səmərəli istifadə
- Fixed-dan bir az aşağı performans

**Differencing**
Snapshot və clone-lar üçün istifadə olunur — disk child faylı parent-ə zəncirləyir. Yazışlar child-a gedir; oxumalar parent-ə qayıdır.

```
Base disk ← differencing ← (yazışlar buraya)
```

Differencing disk-lər qısa ömürlü state və snapshot-lar üçün rahatdır, amma snapshot zəncirləri I/O overhead əlavə edir və performansı fraqmentləşdirə bilər. Microsoft-un rəsmi rəhbərliyi VM snapshot-ları qısa ömürlü saxlamaqdır (günlər, ay yox).

## Fiziki server form-factorları

### Tower server

Böyük desktop PC-yə bənzəyir, amma server səviyyəli komponentlərlə.

- Rack-siz kiçik ofislər üçün rahat
- Çevik disk və genişlənmə layout-u
- Standart 19-düym rack-a quraşdırıla bilmir

### Rack server

19-düymlük data center rack-ları üçün dizayn edilib. **1U** (1.75") vahidlərlə ölçülür. Switch adətən 1U-dur; serverlər 1U-dan 4U və ya daha çox qədər dəyişir.

- Data center-lər üçün standartlaşdırılmış form factor
- Daha yaxşı güc, soyutma və kabel idarəetməsi
- Daha çox vahid əlavə edərək scale etmək asan

### Blade server

Blade-lər ortaq şassiyə yerləşdirilən yığcam server moduludur. Şassi güc, soyutma, şəbəkə və tez-tez paylaşılan storage əlaqəsi təmin edir.

- Çox yüksək sıxlıq (hər rack vahidində çoxsaylı compute node)
- Paylaşılan soyutma və güc per-node overhead-i azaldır
- Hot-swappable blade-lər — şassini söndürmədən modulu dəyişdir
- Mənfi tərəf: şassi səviyyəsində vendor lock-in

### Müqayisə

| | Tower | Rack | Blade |
| --- | --- | --- | --- |
| Yerləşmə | Masa / şkaf | 19" rack | Blade şassi |
| Sıxlıq | Aşağı | Orta | Çox yüksək |
| Soyutma | Sadə | Per-rack | Mərkəzləşdirilmiş şassi |
| Ən yaxşı istifadə | Kiçik ofis | Data center | Böyük data center |
| Kabel | Çox | Orta | Minimal |

## VMware vSphere datastore-ları

ESXi host-ları storage-ı **datastore**-lar vasitəsilə istifadə edir. İki format:

| Datastore | Məqsəd | Nə ilə işləyir |
| --- | --- | --- |
| VMFS (VM File System) | VMware-in clustered fayl sistemi | Direct-attached, FC, FCoE, iSCSI |
| NFS | Standart NFS mount | NAS appliance-lar |

```
ESXi host-lar
     ↓
  VMFS   NFS
   ↓      ↓
DAS FC FCoE iSCSI   NAS
```

### Storage növünə görə vSphere feature dəstəyi

| Protokol | Boot from SAN | vMotion | vSphere HA | vSphere DRS | Raw Device Mapping |
| --- | :---: | :---: | :---: | :---: | :---: |
| Fibre Channel | ✓ | ✓ | ✓ | ✓ | ✓ |
| FCoE | ✓ | ✓ | ✓ | ✓ | ✓ |
| iSCSI | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFS | — | ✓ | ✓ | — | — |
| DAS | — | ✓ | — | — | ✓ |
| Virtual Volumes | — | ✓ | ✓ | ✓ | — |
| vSAN | — | ✓ | ✓ | ✓ | — |

**Feature izahları:**
- **vMotion** — işləyən VM-i bir ESXi host-dan digərinə downtime-sız köçürmək
- **vSphere HA** — host uğursuzluğunda VM-ləri avtomatik başqa hostda restart etmək
- **vSphere DRS** — yükə əsasən VM-ləri host-lar arasında avtomatik balanslaşdırmaq
- **Raw Device Mapping (RDM)** — VM-ə storage LUN-a birbaşa giriş vermək

## Praktik nəticələr

- 2 TB-dan böyük hər şey və bütün UEFI sistemləri üçün GPT istifadə edin
- Allocation unit size-ı iş yükünə əsasən seçin (ümumi istifadə üçün default, DB-lər üçün daha böyük)
- Yüksək I/O iş yükləri üçün fixed VHD dynamically expanding-dən üstündür; uzun snapshot zəncirlərindən qaçın
- Storage səviyyəsini iş yükünə uyğunlaşdırın: izolyasiyalı hostlar üçün DAS, fayl paylaşımı üçün NAS, virtualizasiya və tranzaksion DB-lər üçün SAN
- vSphere üçün FC/iSCSI ən geniş feature əhatəsini verir (HA, DRS, RDM) — NFS daha sadədir, amma boşluqları var

## Faydalı linklər

- Windows Server storage: [https://learn.microsoft.com/en-us/windows-server/storage/storage](https://learn.microsoft.com/en-us/windows-server/storage/storage)
- ReFS ümumi baxış: [https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview](https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview)
- SMB file server ümumi baxış: [https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview](https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview)
