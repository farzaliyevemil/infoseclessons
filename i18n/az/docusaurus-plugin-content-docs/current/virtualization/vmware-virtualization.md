---
id: vmware-virtualization
title: VMware Virtualizasiya Əsasları
description: VMware məhsulları, ESXi vs vSphere vs Workstation, VM yaratma axını və lab network modellərinin vSphere şəbəkəsindən fərqi üçün praktik bələdçi.
slug: /virtualization/vmware-virtualization
sidebar_position: 2
status: reference
last_reviewed: 2026-03-23
keywords:
  - vmware
  - vsphere
  - esxi
  - workstation
  - bridged
  - nat
---

# VMware Virtualizasiya Əsasları

VMware həm lab, həm də production mühitlərində geniş istifadə olunan virtualizasiya ekosistemidir. Amma başlanğıcda məhsul adları və şəbəkə modelləri tez-tez qarışdırılır.

Bu bələdçi onları ayrı və aydın şəkildə izah edir.

## Əsas VMware məhsulları

| Məhsul | Nədir | Tipik istifadə |
| --- | --- | --- |
| VMware ESXi | Bare-metal hypervisor | Production host-lar |
| VMware vCenter Server | ESXi host-lar üçün mərkəzləşdirilmiş idarəetmə | Böyük mühitlər |
| VMware vSphere | ESXi və vCenter ətrafındakı geniş platform adı | Enterprise virtualizasiya stack-i |
| VMware Workstation | Desktop hypervisor | Şəxsi lab və test mühiti |

## İki fərqli şəbəkə dünyası

Başlayanların ən çox qarışdırdığı hissə budur.

### Workstation / desktop lab şəbəkəsi

VMware Workstation-da adətən bu network mode-lar görünür:

- **Bridged**
- **NAT**
- **Host-Only**
- **Custom / vmnet**

Bunlar desktop hypervisor üçün rahat lab yönümlü şəbəkə modelləridir.

### ESXi / vSphere şəbəkəsi

ESXi və vSphere mühitində isə adətən bunlarla işləyirsiniz:

- virtual switch-lər
- port group-lar
- VLAN-backed şəbəkələr
- fiziki NIC-lərə bağlı uplink-lər

Yəni “vSphere Client içində NAT və ya Host-Only seç” düşüncə modeli ESXi üçün normal model deyil; bu daha çox Workstation lab-larına uyğundur.

## Workstation üçün yayğın network mode-lar

### Bridged

VM fiziki şəbəkədə birbaşa görünür və adətən həmin şəbəkənin DHCP yolundan IP alır.

VM-in LAN üzərində real cihaz kimi davranması lazımdırsa istifadə edilir.

### NAT

VM host-un arxasında private şəbəkədə olur. Xarici şəbəkə əsasən host-u görür, VM-i birbaşa görmür.

VM internetə çıxmalı, amma daha az görünən qalmalıdırsa rahat seçimdir.

### Host-Only

VM yalnız host və bəlkə digər host-only VM-lərlə danışır; xarici şəbəkəyə birbaşa çıxmır.

İzolyasiya olunmuş test və təhlükəsiz lab üçün uyğundur.

### Custom

Custom network-lər VM-i seçilmiş virtual seqmentə qoşmağa imkan verir. Daha mürəkkəb lab dizaynında faydalıdır.

## vSphere və ya ESXi-də VM yaratmaq

Yüksək səviyyəli axın adətən belədir:

1. ESXi və ya vCenter-ə qoşul
2. Yeni virtual maşın yarat
3. Guest OS family və versiyanı seç
4. CPU, RAM və disk təyin et
5. Düzgün port group və ya şəbəkəyə qoş
6. ISO və ya deployment source əlavə et
7. Əməliyyat sistemini quraşdır

## Praktik planlama qeydləri

- production yönümlü mühitlər üçün ESXi/vSphere seçin
- sürətli şəxsi lab üçün Workstation seçin
- snapshot-u backup kimi yox, qısa geri dönüş nöqtəsi kimi görün
- yalnız CPU/RAM yox, storage performansını da planlayın
- lab qurmazdan əvvəl VM-in bridged, NAT, isolated və ya VLAN-a bağlı olacağını müəyyən edin

## VMware nə vaxt uyğundur?

VMware bunlar üçün faydalıdır:

- homelab
- server consolidation
- çoxlu VM ilə tətbiq testi
- admin və security lab-ları
- artıq platforma mövcuddursa production virtualizasiya

## Faydalı linklər

- vSphere documentation: [https://docs.vmware.com/en/VMware-vSphere/index.html](https://docs.vmware.com/en/VMware-vSphere/index.html)
- VMware Workstation documentation: [https://docs.vmware.com/en/VMware-Workstation-Pro/index.html](https://docs.vmware.com/en/VMware-Workstation-Pro/index.html)
