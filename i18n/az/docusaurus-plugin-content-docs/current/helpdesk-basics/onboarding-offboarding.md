---
id: onboarding-offboarding
title: İT Onboarding və Offboarding
description: Düzgün joiner-mover-leaver — birinci gündən ən az imtiyaz verən onboarding checklist-ləri, giriş keçidləri və kiminsə getdiyi günə girişi həqiqətən kəsən offboarding.
slug: /helpdesk-basics/onboarding-offboarding
sidebar_position: 3
status: reference
last_reviewed: 2026-09-13
category_key: helpdesk-basics
keywords:
  - onboarding
  - offboarding
  - joiner mover leaver
  - giriş ləğvi
  - ən az imtiyaz
  - identiklik lifecycle
  - uyğunluq
difficulty: foundation
---

# İT Onboarding və Offboarding

Təşkilatınızın yaratdığı hər hesab, biri onu silənə kimi mövcuddur — və hesablar, insanlardan fərqli olaraq, icazələrini heç vaxt unutmur. Identiklik lifecycle-ı (**joiner → mover → leaver**, audit dilində JML) təhlükəsizlik nəzəriyyəsinin helpdesk reallığı ilə kəsişdiyi yerdədir: yaxşı edildikdə heç kim fərq qoymur; pis edildikdə VPN girişi aktiv olan keçmiş işçilər, həftələrlə laptop gözləyən yeni işçilər və özlüyündə yazılan audit tapıntıları yaradır. Bu dərs üç keçid üçün praktik playbook-dur, hər addıma təhlükəsizlik məntiqi əlavə olunmuş.

## Hər şeyin altındakı prinsip

**Giriş rollara görə verilir, təqvimə görə ləğv edilir və davamlı review olunur — heç vaxt təsadüfi verilmir və xeyirxahlıq kimi saxlanılmır.** İki qayda bütün dərsi daşıyır:

- **Birinci gündən ən az imtiyaz.** Yeni işçi rolunun _lazım_ olduğu girişi alır, həvəsli komanda yoldaşlarının paylaştığını yox. Hər bir "bir də ona da admin ver, müvəqqəti" gələcək incidentin köməkçi üzüdür.
- **Ləğv deadline-dır, təklif deyil.** Dünən istefa verən adamın girişi canlı credential-dır. Narazı-getmə incidentləri sənədləşdirilən, təkrarlanan pattern-dir — offboarding təhlükəsizlik kontroludur, HR nəzakəti deyil.

## Onboarding (joiner): həftə iki yox, gün sıfır

Yeni işçinin ilk günü tonu təyin edir — həm məhsuldarlıq üçün, həm təhlükəsizlik vərdişləri üçün. İşləyən checklist, sahibə görə bölünmüş:

**Birinci gündən əvvəl (HR İT-ni ideal olaraq 3–5 iş günü əvvəl trigger edir):**

- [ ] Identiklik platformasında hesab yaradıldı — **rol-əsaslı qrup üzvlüyü ilə**, əl ilə qurulmuş per-sistem grant yığını ilə yox
- [ ] Hardware təmin edildi və device management-a pre-enroll edildi (disk şifrələmə açık, ekran kilidi siyasəti tətbiq olunub)
- [ ] MFA qeydiyyatı _birinci günə_ planlaşdırılıb — "gecələr bir həftə" deyil, ilk email-dən əvvəl
- [ ] Rolun standart giriş profilindən mailbox, paylaşılan disklər və alətlər
- [ ] Müvəqqəti credential-lər təhlükəsiz kanalla verildi, ilk logonda dəyişmə məcburi

**Birinci gün (İT köməyi ilə):**

- [ ] İlk logon + **MFA qeydiyyatı yoxlanıldı** (fərz edilmədi)
- [ ] Password manager verildi və şifrə təkrarı bir cümlədə müzakirə olundu — bu söhbət indi ucuzdur, sonra mümkün deyil
- [ ] İlk həftədə təhlükəsizlik əsasları: phishing hesabat düyməsi, kimə zəng etməli, sadə dillə qəbul edilə bilən istifadə ([Social Engineering](/red-teaming/social-engineering)-ə baxın — nə ilə üzləşəcəklər üçün)
- [ ] Avadanlıq təhvilı sənədləşdirildi (seriya nömrələri asset reyestrinə)

Yavaş onboarding-in gizli mayası shadow İT-dir: repo girişi üçün dörd gün gözləyən developer beş dəqiqəyə şəxsi hesab yaradacaq — və o idarəolunmayan credential nailiyyətdən uzun yaşayacaq. Burada sürət və təhlükəsizlik eyni hədəfdir.

## Mover: hər kəsin unutduğu keçid

Rol dəyişiklikləri imtiyaz sürüşməsi yaradır — yeni məsuliyyətlər köhnələrin üstünə yığılır. İşçi support-dan engineering-ə keçəndə, həmin gün support növbələrini _itirməlidir_; əksər təşkilatlar yalnız əlavə edir. Mover checklist-i:

- [ ] Köhnə rolun giriş qrupları silindi (identiklik platformasının qrup modeli bunu demək olar avtomatik edir — rol-əsaslı giriş-in per-sorğu grant-lardan üstün olmasının bir səbəbi daha)
- [ ] Yeni rolun girişi standart profildən verildi
- [ ] Saxladıqları paylaşılan/yüksək credential-lər rotasiya olundu (admin şifrələri, paylaşılan mailbox-lar, break-glass kodları)
- [ ] Sahib olduqları report, dashboard, vendor hesablarının data sahibliyi yenidən təyin olundu

Mover-lər hücumçular üçün də vacibdir: support-səviyyəli keçmişi və engineering bugünü olan hesab məhz insider incident-in qurulduğu daimi imtiyazdır. Rüblük giriş review-ləri (menecer təsdiqləyir "bu adamın hər birinə hələ də ehtiyacı var") prosesin buraxdığı drift-i yaxalayan şəbəkədir.

## Offboarding (leaver): vacib olan deadline

İş bitən anda hər credential öhdəlikdir. Ardıcıllıq qəsdəndir — **əvvəl deaktiv et, sonra təmizlə**:

**Bitmə anında (eyni gün, ideal olaraq HR sistemindən avtomatik):**

- [ ] **Hesabı deaktiv et — silmə.** Silmə mailbox-a hüquqi/uyğunluq girişini məhv edir və license-transfer iş axınlarını sındırır; deaktiv etmə authentifikasiyanı dərhal bitirir.
- [ ] **Sessiyaları və token-ləri ləğv et** (identiklik platforması "revoke sessions", VPN sertifikatları, mobil cihaz wipe/app-pin) — deaktiv hesabda canlı session token açıq qapı olaraq qalır, token bitənə kimi; token-lər saatlardan günlərə qədər yaşaya bilər.
- [ ] **Adamın bildiyi hər paylaşılan üçün şifrələri reset et**: admin servis hesabları, onlara deleanqə olunmuş paylaşılan mailbox-lar, vendor portalları, uyğun gəlirsə Wi-Fi PSK, custodian idisə break-glass credential-ləri.
- [ ] **MFA cihaz qeydiyyatlarını və API token-lərini/şəxsi giriş token-lərini sil** — token-lər offboarding checklist-lərində nadir görünən və özlüyündə demək olar heç vaxt bitməyən credential-lardır.
- [ ] Mailbox-u yönləndir (menecer və ya adlı xələf), out-of-office qoy, deleanqasiyanı sənədləşdir.

**İlk günlərdə:**

- [ ] Qruplardan və license təyinatlarından sil (maya + gigiyena)
- [ ] Avadanlıq geri qaytarılması: laptop, telefon, token, açar, giriş kartları — yaddaşa yox, asset reyestrinə qarşı yoxlanır
- [ ] Data sahibliyini transfer et; komandanın lazım olanı _hesab mövcud olan halda_ export edin, silindikdən sonra yox
- [ ] Vendor/üçüncü-tərəf sistemlərdən silin — öz istifadəçi siyahıları olan SaaS appləri (SSO xaricindəkilər) klassik offboarding sızmasıdır

**Audit izi:** hər addım vaxt damğalı və HR bitmə tarixinə bağlıdır. Auditor leaver-ləri sample edir və "HR bitmə tarixi"ni "son authentifikasiya" və "qrup silinməsi" ilə müqayisə edir — o tarixlər arasındakı boşluqlar tapıntılardır, daha pisi, real pəncərələrdir. Offboarding-i HR sistemindən avtomatlaşdırmaq (identiklik lifecycle alətləri, minimum gündəlik rekonseyliyasiya) bu dərsdəki ən yüksək-təsirli tək düzəlişdir: əl-checklist-ləri məhz təşkilatın məşğul olduğu vaxt uğursuz olur, dismissallar isə heç vaxt rahat vaxtlara planlaşdırılmır.

## Bilməyə dəyər kənar hallar

- **Dərhal-dismissal / düşmən leaver.** Görüşdən _sonra_ yox, _əvvəl_ deaktiv edin — səbəbli-bitirmə üçün standart playbook girişin HR qapını açanda artıq kəsilmiş olmasını fərz edir.
- **Garden leave və podratçılar.** Müəyyən-müddətli giriş grant vaxtında avtomatik bitmə tarixinə ehtiyac duyur, bir insanın silməyi xatırlamasına yox.
- **Ölüm və ya uzun xəstəlik.** Eyni ləğv mexanikası, HR ilə və ləyaqətlə idarə olunur — hesab yenə kilidlənməlidir.
- **Hər şeyi bilən admin.** Gedən administratorlar break-glass credential-ləri və infrastruktur sirlərini saxlayır. Bilə biləcəkləri hər credential-i rotasiya edin, son imtiyazlı fəaliyyəti review edin və gedənlərin domain-admin şifrəsini departure-da kompromitə olunmuş kimi qəbul edin — operativ olaraq, elədir.

## Növbəti addım

- [Account and Password Procedures](/helpdesk-basics/account-and-password-procedures) — bu lifecycle-ın qidalandırdığı gündəlik identiklik əməliyyatları.
- [IAM Account Management](/general-security/iam-account-management) — rol-əsaslı giriş arxasındakı platforma arxitekturası.
- [Security Governance](/grc/security-governance) — JML-nin siyasətlərdə və auditlərdəki yeri.
- [Common Helpdesk Tickets](/helpdesk-basics/common-helpdesk-tickets) — bu proseslərin ətrafındakı gündəlik ticket axını.
