---
id: windows-server-planning
title: Windows Server Quraşdırmadan Əvvəl Planlaşdırma
description: Windows Server quraşdırmazdan əvvəl edition, rol, deployment modeli və quraşdırma variantını düzgün planlayın.
sidebar_position: 3
slug: /servers/windows-server-planning
---

# Windows Server Quraşdırmadan Əvvəl Planlaşdırma

Windows Server quraşdırmazdan əvvəl bu dörd praktiki suala cavab vermək lazımdır:

1. Hansı edition mühitə uyğundur?
2. Hansı roles və features həqiqətən lazımdır?
3. Server fiziki olacaq, yoxsa virtual maşın?
4. Server Core seçilməlidir, yoxsa Desktop Experience?

---

## 1. Düzgün Edition Seçimi

Windows Server 2025 planlaşdırılarkən əsasən bu edition-lar nəzərə alınır:

| Edition | Tipik istifadə ssenarisi |
| --- | --- |
| **Standard** | Fiziki serverlər və az virtualizasiyalı mühitlər |
| **Datacenter** | Güclü virtualizasiya və daha böyük server mühitləri |
| **Datacenter: Azure Edition** | Azure yönümlü deployment-lər və Azure-a xas imkanlar |

Bir çox komanda üçün sadə planlaşdırma qaydası belədir:

- virtualizasiya azdırsa **Standard**
- eyni host üzərində çox VM planlanırsa **Datacenter**

Lisenziyalaşdırma detalları sadə cədvəldən daha mürəkkəb ola bilər. Sadələşdirilmiş şəkildə:

- **Standard** tam lisenziyalanmış server üçün **2 OSE/VM** hüququ verir
- **Datacenter** tam lisenziyalanmış server üçün **limitsiz OSE/VM** hüququ verir
- Standard üzərində 2-dən çox VM planlanırsa əlavə lisenziyalaşdırma lazım ola bilər

> Son qərar üçün həmişə cari Microsoft lisenziyalaşdırma qaydalarını yoxlayın.

---

## 2. Roles və Features Planı

Windows Server-in dəyəri onun rolları və xüsusiyyətləri ilə yaranır. Yəni quraşdırmadan əvvəl serverin konkret nə iş görəcəyini müəyyən etmək lazımdır.

Ən çox rast gəlinən rollar:

| Rol | Nə edir |
| --- | --- |
| **Active Directory Domain Services (AD DS)** | İstifadəçi, kompüter və domen idarəetməsi |
| **DNS Server** | Adları IP ünvanlara çevirir |
| **DHCP Server** | Avtomatik IP konfiqurasiyası verir |
| **File and Storage Services** | Fayl paylaşımları və storage workload-ları |
| **Hyper-V** | Virtualizasiya platforması |
| **Web Server (IIS)** | Veb sayt və tətbiqləri host edir |
| **Remote Desktop Services** | Uzaqdan desktop və tətbiq girişi verir |
| **Windows Server Update Services (WSUS)** | Mərkəzləşdirilmiş update paylanması |

Praktiki tövsiyələr:

- lab mühiti deyilsə, bütün rolları bir serverdə toplamayın
- mümkün olduqda identity, file, web və virtualization workload-larını ayırın
- backup, monitoring və patching planını rol planından ayırmayın

---

## 3. Fiziki Server, yoxsa Virtual Maşın?

### Fiziki Server

Üstünlüklər:

- hardware resurslarına birbaşa çıxış
- bəzi xüsusi və performans həssas workload-lar üçün uyğundur

Çatışmazlıqlar:

- adətən daha az çevikdir
- hardware lifecycle və disaster recovery daha çətin idarə olunur
- scale etmək çox vaxt yeni hardware almaq deməkdir

### Virtual Maşın

Üstünlüklər:

- provision və migration daha rahatdır
- bir host üzərində birdən çox server konsolidasiyası mümkündür
- backup, recovery və platform idarəçiliyi adətən daha rahat olur

Çatışmazlıqlar:

- virtualizasiya platformasının sağlamlığından asılıdır
- host səviyyəli problem bir neçə VM-ə təsir edə bilər
- resurs planlaması yenə vacibdir; overcommit qeyri-sabitlik yarada bilər

> Müasir mühitlərdə Windows Server çox vaxt Hyper-V, VMware və ya cloud platformasında VM kimi işləyir. Bir detal da vacibdir: snapshot faydalıdır, amma tam backup strategiyasını əvəz etmir.

---

## 4. Quraşdırma Variantı Seçimi

Microsoft iki əsas quraşdırma variantını təsvir edir:

### Server Core

- ənənəvi GUI shell yoxdur
- daha az resurs istifadə edir
- attack surface daha kiçikdir
- idarə olunan production workload-ları üçün daha uyğundur
- adətən PowerShell, RSAT və ya Windows Admin Center ilə idarə olunur

### Server with Desktop Experience

- qrafik interfeys daxildir
- öyrənmə, troubleshooting və bəzi admin ssenariləri üçün daha rahatdır
- Server Core-dan daha çox resurs istifadə edir

Praktiki qayda:

- komanda bunu idarə edə bilirsə, **Server Core** daha yaxşı seçimdir
- workload, alətlər və ya admin rahatlığı tələb edirsə, **Desktop Experience** seçilə bilər

---

## 5. Minimum Hardware Tələbləri

Microsoft Learn-də göstərilən cari minimum tələblər:

| Komponent | Minimum |
| --- | --- |
| **Prosessor** | 1.4 GHz 64-bit CPU |
| **RAM** | 2 GB |
| **Disk** | 32 GB |
| **Şəbəkə** | 1 Gigabit Ethernet adapter |
| **Firmware** | UEFI 2.3.1c və Secure Boot dəstəyi |
| **TPM** | TPM 2.0 |

Real planlaşdırmada minimumdan yuxarı düşünmək lazımdır:

- **4 GB+ RAM** Server Core üçün daha praktik başlanğıcdır
- **8 GB+ RAM** Desktop Experience və ya multi-role test mühitləri üçün daha məntiqlidir
- update, log, page file, monitoring agent və backup alətləri üçün əlavə disk planlayın

> Minimum tələblər sadəcə sistemin açılmasını göstərir. Onlar production rahatlığını göstərmir.

---

## Quraşdırmadan Əvvəl Yoxlama Siyahısı

- Hansı rollar lazımdır?
- Server fiziki olacaq, yoxsa virtual?
- Edition gözlənilən virtualizasiya səviyyəsinə uyğundurmu?
- Server Core seçiləcək, yoxsa Desktop Experience?
- Hardware yalnız minimumu deyil, real workload-u da qarşılayırmı?
- Lisenziya hazırdır?
- Backup, monitoring və patching planı əvvəlcədən məlumdursa?

---

## Faydalı Linklər

- Hardware requirements: [https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements](https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements)
- Windows Server edition comparison: [https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison](https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison)
- Server Core vs Desktop Experience: [https://learn.microsoft.com/en-us/windows-server/get-started/install-options-server-core-desktop-experience](https://learn.microsoft.com/en-us/windows-server/get-started/install-options-server-core-desktop-experience)
- Evaluation Center: [https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025)
- Windows Admin Center: [https://aka.ms/windowsadmincenter](https://aka.ms/windowsadmincenter)
