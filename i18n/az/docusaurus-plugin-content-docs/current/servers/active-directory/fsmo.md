---
id: fsmo
title: Active Directory-də FSMO Rolları
description: Beş FSMO rolunun funksiyasını, necə yoxlanıldığını, transfer və seize fərqini öyrənin.
sidebar_position: 1
slug: /servers/fsmo
difficulty: advanced
---

# Active Directory-də FSMO Rolları

Flexible Single Master Operations (FSMO) — Active Directory (AD) mühitində xüsusi domen nəzarətçisi (domain controller) vəzifələridir. AD çoxmasterli sistem olsa da (istənilən domen nəzarətçisi dəyişiklik edə bilər), bəzi əməliyyatlar yalnız bir domen nəzarətçisi tərəfindən idarə olunmalıdır ki, konfliktlər yaranmasın — bu vəzifələr FSMO rolları adlanır.

---

## 🔹 FSMO Rollarının Növləri

Cəmi **beş** FSMO rolu var və onlar iki kateqoriyaya bölünür:

### 🔸 Meşə səviyyəli rollar (Forest-wide) (Hər meşədə yalnız bir dənə):

1. **Schema Master**
   - AD sxeması (obyektlərin strukturu) üzərində dəyişiklikləri idarə edir.
   - Yeni atribut/class əlavə edəndə (məsələn, Exchange və ya Lync quraşdıranda) tələb olunur.

2. **Domain Naming Master**
   - Meşənin ad məkanında (namespace) dəyişiklikləri idarə edir (məsələn, domen əlavə/silmək).
   - Domen adlarının unikal olmasını təmin edir.

### 🔸 Domen səviyyəli rollar (Domain-wide) (Hər domendə bir dənə):

3. **RID Master** (Relative Identifier Master)
   - Domen nəzarətçilərinə RID hovuzları ayırır.
   - Hər obyektin (istifadəçi, kompüter və s.) unikal SID-ə sahib olmasını təmin edir.

4. **PDC Emulator** (Primary Domain Controller Emulator)
   - NT4 ilə geriyə uyğunluğu təmin edir.
   - Parol dəyişiklikləri, hesab bloklanmaları, Group Policy yeniləmələri ilə məşğul olur.
   - Domen nəzarətçiləri üçün vaxt mənbəyidir.

5. **Infrastructure Master**
   - Fərqli domenlərdəki obyektlər arasında istinadları yeniləyir (məsələn, A domenindən istifadəçi B domenində qrupa əlavə olunanda).

---

## 📌 FSMO Rollarının Sahiblərini Necə Yoxlamaq Olar

PowerShell və ya Command Prompt-da aşağıdakı əmrdən istifadə edin:
```bash
netdom query fsmo
```

---

## 🔄 Transfer və Seize fərqi

Bu iki anlayış eyni deyil:

| Əməliyyat | Nə vaxt istifadə olunur | Risk |
| --- | --- | --- |
| **Transfer** | Mövcud role holder online və sağlamdırsa | Daha az |
| **Seize** | Köhnə role holder itib, bərpa olunmayacaq və ya geri qayıtmamalıdırsa | Daha yüksək |

Microsoft-un cari yanaşmasına görə mümkün olduqca **transfer** üstün tutulmalıdır, çünki graceful handoff zamanı rol məlumatı sinxronlaşdırılır. **Seize** isə qəza və bərpa ssenarisidir.

> Əgər bir DC-dən rol seize edilibsə, həmin server sonradan sanki heç nə olmayıb kimi geri qaytarılmamalıdır.

---

## ⚙️ Ən Yaxşı Təcrübələr

- **Schema Master** və **Domain Naming Master** rollarını ayrı domen nəzarətçilərində saxlayın (adətən kök domendə).
- **PDC Emulator** rolunu ən yaxşı performanslı DC-də (ən az gecikmə, ən yaxşı avadanlıq) yerləşdirin.
- **RID Master** və **Infrastructure Master** eyni və ya ayrı DC-lərdə ola bilər.
- **Infrastructure Master** rolunu Global Catalog serverində yerləşdirməyin, əgər bütün DC-lər GC deyilsə.

---

## 🧠 FSMO Rollarının Düzgün Yerləşdirilməsinin Əhəmiyyəti

Düzgün yerləşdirilməsə, aşağıdakı problemlər yarana bilər:
- Doğrulama (authentication) gecikmələri
- Parol replikasiyasında uyğunsuzluq
- SID təkrarı və ya qrup istinadlarında səhvlər

---

## 🚨 Ən tez hiss olunan rol hansıdır?

Praktik mühitlərdə ən tez hiss olunan problem çox vaxt **PDC Emulator** ilə bağlı olur, çünki o:

- Parol dəyişikliklərində
- Account lockout davranışında
- Vaxt sinxronizasiyasında
- Group Policy ilə bağlı fəaliyyətlərdə

əhəmiyyətli rol oynayır.

---

## 🛠️ FSMO Rollarının Daşınması

FSMO rollarını köçürmək üçün:
- **Qrafik interfeys** (AD Users & Computers, Schema Console və s.)
- **Əmr sətri** ilə `ntdsutil`
- **PowerShell**:
```powershell
Move-ADDirectoryServerOperationMasterRole -Identity "DCName" -OperationMasterRole SchemaMaster,RIDMaster,PDCEmulator,InfrastructureMaster,DomainNamingMaster
```

---

## ✅ Praktik Qayda

- Planlı maintenance və migrasiya zamanı **transfer** et
- Köhnə DC faktiki olaraq ölüdürsə və qayıtmayacaqsa **seize** et
- Dəyişiklikdən əvvəl və sonra role owner-ləri sənədləşdir
- Əməliyyatdan sonra replication sağlamlığını yoxla

---

FSMO rolları Active Directory infrastrukturunun dayanıqlığı üçün əsasdır. Həm rolların funksiyasını, həm də nə vaxt **transfer**, nə vaxt **seize** edilməli olduğunu bilmək vacibdir.
