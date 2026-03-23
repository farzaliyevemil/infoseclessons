---
id: virtualization-basics
title: Virtualizasiya Əsasları
description: Hypervisor-lar, virtual maşınlar, snapshot, storage, şəbəkə və əsas istifadə ssenariləri üçün praktik giriş.
slug: /virtualization/virtualization-basics
---

# Virtualizasiya Əsasları

Virtualizasiya bir fiziki hardware üzərində birdən çox izolyasiya olunmuş sistem işə salmağa imkan verir. Müasir lab, server, cloud və enterprise infrastrukturunun əsas tikinti bloklarından biridir.

---

## 🧠 Niyə vacibdir?

Virtualizasiya bunlara kömək edir:

- hardware konsolidasiyası
- xərcin azalması
- lab mühitinin sürətli qurulması
- workload izolyasiyası
- template və snapshot ilə daha çevik bərpa
- infrastrukturun daha səmərəli böyüdülməsi

---

## 🧱 Hypervisor növləri

İki əsas model var:

| Növ | Mənası | Nümunələr |
| --- | --- | --- |
| **Type 1** | Birbaşa hardware üzərində işləyir | Hyper-V, VMware ESXi, Proxmox VE |
| **Type 2** | Host əməliyyat sisteminin üzərində işləyir | VirtualBox, VMware Workstation |

### Praktik fərq

- **Type 1** daha çox production və data center mühitlərində istifadə olunur
- **Type 2** daha çox lab, test və öyrənmə üçün workstation-larda istifadə olunur

---

## 💻 Virtual maşın nədir?

**Virtual machine (VM)** proqram səviyyəsində yaradılmış kompüterdir və aşağıdakılara malik olur:

- virtual CPU
- virtual RAM
- virtual disk
- virtual şəbəkə adapteri

Bir host üzərində çox sayda VM işləyə bilər, amma hər biri ayrıca sistem kimi davranır.

---

## 📸 Snapshot və Backup fərqi

Bu anlayışlar çox qarışdırılır, amma eyni deyil:

| Funksiya | Snapshot | Backup |
| --- | --- | --- |
| Məqsəd | Qısamüddətli rollback | Uzunmüddətli recovery |
| İstifadə | Riskli dəyişiklikdən əvvəl | Disaster recovery |
| Risk | Uzun qalsa böyüyür və performansa təsir edir | Storage və recovery planı tələb edir |

Yaxşı qayda:

- riskli dəyişiklikdən əvvəl **snapshot**
- real bərpa strategiyası üçün **backup**

Snapshot-u backup-un əvəzi kimi görmək düzgün deyil.

---

## 💾 Storage əsasları

Virtual mühitlərdə adətən bunlar istifadə olunur:

- **local disk**
- **shared storage**
- **datastore**
- **thin** və **thick provisioning**

Vacib məqamlar:

- Thin provisioning diskə qənaət edir, amma mütləq izlənməlidir
- Shared storage migration və high availability üçün faydalıdır
- Yavaş storage çox sayda VM-ə eyni anda təsir edə bilər

---

## 🌐 Virtual şəbəkə əsasları

Hypervisor adətən şəbəkəni bunlarla idarə edir:

- virtual switch
- port group / bridge interface
- VLAN tagging
- lab mühitində NAT, bridged və host-only modellər

Bunun sayəsində VM-lər:

- bir-biri ilə
- host ilə
- fiziki şəbəkə ilə
- internet ilə

ünsiyyət qurur.

---

## 🛠️ Yayğın istifadə ssenariləri

Virtualizasiya bunlar üçün geniş istifadə olunur:

- homelab və training
- proqramların təhlükəsiz test edilməsi
- server konsolidasiyası
- VDI və remote desktop workload-ları
- disaster recovery və failover planlaması
- multi-tier tətbiq mühitlərinin qurulması

---

## ⚠️ Yayğın səhvlər

- CPU və RAM-ı həddən artıq overcommit etmək
- snapshot-ları çox uzun saxlamaq
- storage performansını nəzərə almamaq
- VM backup-larını unutmaq
- hər workload-u eyni rahatlıqla virtualizasiya etmək mümkün zənn etmək

---

## 📌 Yekun fikir

Virtualizasiya sadəcə lab aləti deyil. Bu, əsas infrastruktur bacarığıdır. Hypervisor, VM resursları, snapshot, storage və virtual şəbəkəni başa düşmək server, cloud və platform engineering üçün güclü təməl yaradır.
