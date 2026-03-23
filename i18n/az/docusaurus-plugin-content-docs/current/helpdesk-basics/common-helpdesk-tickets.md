---
id: common-helpdesk-tickets
title: Yayğın Helpdesk Ticket-ləri
description: Ən çox rast gəlinən helpdesk sorğuları, triage addımları, eskalasiya və düzgün ticket qeydləri üçün praktik bələdçi.
slug: /helpdesk-basics/common-helpdesk-tickets
---

# Yayğın Helpdesk Ticket-ləri

IT support işində sürət qazanmağın ən yaxşı yollarından biri ən çox gələn ticket növlərini tanımaq və onları standart workflow ilə idarə etməkdir.

Bu səhifə junior helpdesk əməkdaşlarının hər gün qarşılaşdığı əsas ticket növlərinə fokuslanır.

---

## 🎫 Ən yayğın ticket kateqoriyaları

Adətən bu mövzular gəlir:

- Parol reset və account unlock
- Outlook və email problemləri
- Printer problemləri
- Yavaş işləyən kompüter şikayətləri
- VPN və remote access problemləri
- Software install sorğuları
- Shared folder və permission problemləri
- Yeni user onboarding
- MFA enrollment problemləri

---

## 🧭 Yaxşı triage workflow-u

Demək olar hər ticket üçün:

1. İstifadəçinin kimliyini təsdiqlə
2. Dəqiq nə işləmədiyini öyrən
3. Scope-u yoxla: bir user, bir komanda, yoxsa hamı?
4. Impact-i təyin et: işi tam dayandırır, zəiflədir, yoxsa aşağı prioritetdir?
5. Sübut topla: screenshot, error text, hostname, username, problem vaxtı
6. Resolve, escalate və ya monitor qərarı ver

---

## 🔑 Nümunə: Password Reset / Account Lockout

Yoxla:

- User parolu unudub, yoxsa account lock olub?
- MFA da problem yaradır?
- Köhnə parol telefon, Outlook və ya VPN client-də cached qalıb?

Yaxşı sənədləşdirmə:

- user identity verify edildi
- reset və ya unlock edildi
- digər cihazlarda cached credential-ların yenilənməsi tapşırıldı

---

## 📧 Nümunə: Email Problemləri

Yayğın səbəblər:

- Outlook profile problemi
- mailbox dolması
- Exchange / Microsoft 365 outage
- authentication problemi
- autodiscover və ya profile cache problemi

İlk yoxlamalar:

- Problem yalnız Outlook-dadır, yoxsa webmail-də də var?
- Tək mailbox-dır, yoxsa birdən çox user?
- User send edə bilir, receive edə bilir, yoxsa heç biri?

---

## 🖨️ Nümunə: Printer Problemləri

Yoxla:

- local printer-dir, yoxsa network printer?
- driver problemidir, yoxsa queue problemidir?
- eyni printerə başqaları print edə bilir?
- print spooler normal işləyir?

"Printer xarabdır" şikayəti həmişə hardware nasazlığı demək deyil. Çox vaxt səbəb driver, queue, mapping və ya permission olur.

---

## 🌐 Nümunə: VPN / Remote Access Problemləri

Yoxla:

- User-in ümumiyyətlə interneti var?
- MFA uğurla keçib?
- Son günlərdə parol dəyişilib?
- VPN client update-dir?
- Bu, daha geniş outage ola bilər?

Remote access ticket-ləri tez triage olunmalıdır, çünki çox vaxt user-in bütün işini bloklayır.

---

## 🧾 Yaxşı ticket note necə görünür?

Pis qeyd:

`User had issue. Fixed.`

Daha yaxşı qeyd:

`User could not sign in to VPN after password reset. Verified account status, re-synced MFA prompt, and asked user to update cached credentials in VPN client. User confirmed successful connection afterward.`

Yaxşı qeyd bunları saxlamalıdır:

- user nə dedi
- sən nə yoxladın
- nə dəyişdin
- yekun nəticə nə oldu

---

## 🚨 Nə vaxt escalate etmək lazımdır?

Bu hallarda eskalasiya et:

- problem birdən çox user-ə təsir edirsə
- server, network və ya security involvement şübhəsi varsa
- səndə olmayan admin hüququ tələb olunursa
- eyni problem dəfələrlə qayıdırsa və root cause tapılmırsa

---

## 📌 Son tövsiyə

Yaxşı helpdesk işi sadəcə nəyisə düzəltmək deyil. Əsas olan:

- sürətli triage
- aydın kommunikasiya
- təhlükəsiz troubleshooting
- faydalı sənədləşdirmə

Bu vərdişlər gələcəkdə system administration, blue team və infrastructure rolları üçün də güclü baza yaradır.
