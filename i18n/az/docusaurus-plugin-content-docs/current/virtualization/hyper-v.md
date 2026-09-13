---
id: hyper-v
title: Microsoft Hyper-V
description: Hyper-V ilə Windows virtualizasiyası — VMware və Proxmox ilə müqayisə, Gen1 vs Gen2 VM-lər, virtual switch-lər, checkpoint-lər, host hardening və real mühitlərdə qarşıya çıxan admin tapşırıqları.
slug: /virtualization/hyper-v
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: virtualization
keywords:
  - hyper-v
  - microsoft
  - virtualization
  - hypervisor
  - vm
  - checkpoint
  - virtual switch
difficulty: foundation
---

# Microsoft Hyper-V

Hyper-V Microsoft-un Type-1 hypervisor-dur: Windows Server-də rol kimi, Windows 10/11-də isə feature kimi təqdim olunur. [Virtualization Basics](/virtualization/virtualization-basics) və [Hypervisors](/virtualization/hypervisor) nəzəriyyəni, [VMware Virtualization](/virtualization/vmware-virtualization) bazar liderini əhatə edirdisə, bu dərs Windows-mərkəzli təşkilatların onsuz da sahib olduğu hypervisor haqqındadır — licensing-ə daxildir, qalan hər şey kimi eyni Group Policy və identiklik stack-i ilə idarə olunur və Azure Stack HCI, Windows Admin Center vasitəsilə getdikcə daha aktualdır.

## Hyper-V bazarda harda dayanır

| Aspekt         | Hyper-V                                                                    | VMware (ESXi/vSphere)                                      | Proxmox VE                             |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| Licensing      | Windows Server-ə daxildir; hypervisor üçün VM-başına ödəniş yoxdur         | Per-core abunəlik (Broadcom sonrası qiymət dəyişiklikləri) | Açıq mənbə pulsuz; isteğe bağlı dəstək |
| İdarəetmə      | Hyper-V Manager, Windows Admin Center, SCVMM (böyük mağazalar), PowerShell | vCenter — yetkin benchmark                                 | Daxili web UI                          |
| Ekosistem gücü | Windows/Azure inteqrasiyası, AD, Group Policy                              | Üçüncü-tərəf alətlər, enterprise feature-lər               | İcma, KVM çevikliyi                    |
| Tipik ev       | Microsoft-ilk mağazalar, Azure ilə hibrid estate-lər                       | Qarışıq fleetləri olan böyük müəssisələr                   | Homelab, maya-həssas KMBlər            |

Düz izah: Hyper-V yetkin vCenter deployment-larına qarşı feature-checklist-də nadir qalib gəlir, amma hər yerdə Windows Server işlədən təşkilatlar üçün tam vendor münasibətini silir — və Azure uyğunluğu (Shielded VM-lər, Azure Site Recovery, ardıcıl image formatları) real fərqləndiricidir.

## Başlanğıc: harda işləyir

İki çeşid var və fərq nə host edə biləcəyinizə təsir edir:

- **Windows Server, Hyper-V rolu ilə** — tam server virtualizasiyası. Server Core və ya Datacenter bölgüşdürmələri; Windows Admin Center və ya PowerShell ilə GUI lazım deyil.
- **Windows 10/11 Client Hyper-V** — developer feature-ı ("Windows features aç" → Hyper-V), test VM-ləri üçün yaxşıdır amma _hosting platforması deyil_. VirtualBox/köhnə VMware versiyaları ilə uyğunsuzluğu var (hər ikisi CPU-nun virtualizasiya genişlənmələrini fərqli istifadə edir) və Windows Sandbox, WSL2 backend-lərini aktivləşdirir.

```powershell
# Server: rolun quraşdırılması
Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart

# Client: feature-ın aktivləşdirilməsi
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

## Generation 1 vs Generation 2: yaratmazdan əvvəl qərar ver

Hər VM iki generation-dan biri kimi yaradılır və **sonra çevrilə bilməz**:

- **Gen 1** — legacy BIOS boot, IDE boot diskləri, emulasiya olunmuş legacy hardware. Köhnə əməliyyat sistemləri (2012-cu il və daha köhnə guest-lər) və qəribə quraşdırıcılar üçün var. Nadir seçin.
- **Gen 2** — UEFI, Secure Boot, SCSI boot, PXE v4/v6. Müasir hər şey burada işləyir; konkret səbəbiniz olmayana qədər Gen 2 defoltdur.

Təhlükəsizlik-relevant Gen 2 feature-ları: Linux guest-ləri üçün də **Secure Boot** (VM settings-də Microsoft UEFC şablonunu seçin) və vTPM (virtuallaşdırılmış TPM 2.0) — Windows 11 guest-ləri üçün lazımdır və aşağıdakı shielded-VM hekayəsinin əsasıdır.

## Şəbəkə: üç switch tipi

Virtual switch-lər VM-ləri dünyaya qoşur və yanlış seçim klassik "VM-ım heç nəyə çata bilmir" ticket-ini yaradır:

| Tip          | Davranış                                              | Tipik istifadə                                          |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------- |
| **External** | Fizik NIC-ə bağlıdır; VM-lər real LAN vətəndaşlarıdır | LAN/internet lazım olan production VM-lər               |
| **Internal** | Host↔VM private şəbəkə, fizik sim yoxdur              | Lab şəbəkələri, host-only servisler                     |
| **Private**  | Yalnız VM↔VM, host xaricdir                           | İzolyasiya olunmuş test qatları, malware analiz labları |

Saatlara qənaət edən operativ qeydlər: fizik NIC-başına bir external switch; sürətli client VM-ləri üçün defolt switch-i (NAT) istifadə edin amma onun subnet-inin dəyişəcəyini gözləyin; VLAN tag-ləri per-VM NIC təyin edilir (`Set-VMNetworkAdapterVlan`) — səhv-tag-li VM başqa hosta migrate olanda "şəbəkəni itirir".

## Checkpoint vs backup — hər kəsin iki dəfə öyrəndiyi dərs

Checkpoint-lər (Hyper-V-nin snapshot-ları) VM-in disk və yaddaş vəziyyətini bir anda yaxalayır. _Bəli-yox_ işinə görə əladır — test VM-ini patch et, upgrade əriyərsə geri qaytar — və backup kimi dəhşətdir:

- Checkpoint **nüsxə deyil**: differencing zənciridir, aktiv olduğu müddətdə böyüyür, disk performansını pisləşdirir və VM ilə eyni saxlamada yaşayır. Volumu itirsinizsə, VM-i _və_ checkpoint-lərini itirirsiniz.
- **Production Checkpoints** (2016-dan defolt) qonaq applikasiyası üçün Volume Snapshot Service istifadə edir — qısaömürlü dəyişiklik-öncəsi vəziyyətlər üçün yaxşıdır; yenə backup deyil.
- Real qoruma Hyper-V API-ləri vasitəsilə VM disklərini oxuyan backup məhsuludur (Windows Server Backup, Veeam, Azure Backup) və [Backup and Storage](/servers/backup) qaydalarına uyğun — offline/immutable nüsxələr daxil olmaqla — fərqli saxlamaya yazır.

Komandalar üçün qayda: checkpoint-lər saatlarla, həftələrlə deyil mövcud ola bilər; production VM-də izahsız ikiaylıq checkpoint gigiyena tapıntısıdır.

## Gündəlik idarəetmə

```powershell
# İnventar
Get-VM | Format-Table Name, State, CPUUsage, MemoryAssigned, Uptime

# Lifecycle
New-VM -Name "app01" -Generation 2 -MemoryStartupBytes 4GB `
  -NewVHDPath "D:\VMs\app01.vhdx" -NewVHDSizeBytes 80GB -SwitchName "ProdSwitch"
Checkpoint-VM -Name "app01" -SnapshotName "pre-patch"
Restore-VMCheckpoint -Name "pre-patch" -VMName "app01"
Move-VM -Name "app01" -DestinationHost "hv02"        # hostlar arası canlı migration

# Guest servisleri
Get-VMIntegrationService -VMName "app01"             # time sync, heartbeat, guest services
```

İntegration service-lər təhlükəsizlik qeydini layiqdir: **time sync Kerberos-u canlı saxlayır** (sürüşən guest AD domain-lərində authentifikasiya incident generatorudur), tam "Guest Services" kopya kanalı isə təhlükəsizlik-həssas VM-lərdə bağlı qalmalıdır — nadirə ehtiyac duyulan host-to-guest fayl yoludur.

## Host-un hardening

Hypervisor rəfdəki ən yüksək dəyərli hədəfdir — üstündə root, hər şeydə root deməkdir. Baseline:

- **Host-u öz təqvimində patch edin** və host reboot-larını failover ilə planlı maintenance kimi keçirin (cluster-lər buna görə var).
- **Host-u minimize edin**: Server Core və ya minimal rol seçimi; host VM-lər işlədir, browser və file share deyil.
- **Management-i kilidləyin**: Hyper-V Manager/Admin Center girişi admin subnet-lərlə məhdud, HTTPS üzərindən PowerShell Remoting, dedicated admin hesabları (hypervisor hüquqlu gündəlik-sürücü hesab yoxdur).
- **Saxlama və management şəbəkələrini izolyasiya edin** — management trafiki (defolt olaraq wire-üzərində yaddaş daşıyan canlı migration daxil) öz VLAN-ında; `Set-VMHost -UseAnyNetworkForMigration $false` aktivləşdirin və canlı migration trafikini şifrələyin.
- **Host-u və VM data volume-lərini BitLocker ilə şifrələyin**; yüksək-zəmanətli iş yükü üçün **Host Guardian Service ilə Shielded VM-lərə** baxın — bu, qonaq vəziyyətini şifrələyir və hansı hostun hansı VM-i işlədə biləcəyini kriptoqrafik qərar verir — Windows ekosistemindəki ən güclü dəyişdirmə-əleyhinə hekayədir, real operativ maya ilə.
- **Deleanqasiyanı məhdudlaşdırın**: hostlar AD-yə domain controller kimi eyni qayğı ilə qoşulur — hypervisor faktiki olaraq biridir.

## Hypervisor seçimi, səmimi

Estate Windows-mərkəzli, komanda PowerShell danışır və DR planınız Azure-da bitirsə, Hyper-V düzgün defoltdur. VMware enterprise feature benchmark-ı olaraq qalır — bir çox təşkilatın yenidən qiymətləndirdiyi maya ilə. Proxmox homelab-ləri və maya-həssas Linux mağazalarını udur. Mühəndislik cavabı nadirən "hansı yaxşıdır"dir və adətən "hansı uğursuzluq modları, licensing modeli və komanda bacarıqları növbəti beş ilə bizə uyğundur"dur — müqayisənin dayandığı nəzəriyyə üçün [Hypervisors](/virtualization/hypervisor)-a qayıdın.

## Növbəti addım

- [Virtualization Basics](/virtualization/virtualization-basics) və [Hypervisors](/virtualization/hypervisor) — buradakı hər məhsulun altındakı konseptlər.
- [VMware Virtualization](/virtualization/vmware-virtualization) — digər enterprise incumbent.
- [Windows Server Planning](/servers/windows-server-planning) — Windows estate-də host ölçüsü.
- [Backup and Storage](/servers/backup) — bu dərsin yaratdığı VM-ləri əslində qoruyan şey.
