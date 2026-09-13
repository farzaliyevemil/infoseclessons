---
id: account-and-password-procedures
title: Hesab və Şifrə Prosedurları
description: Identikliyi qoruyan helpdesk prosedurları — heç nəyə toxunmazdan əvvəl telefonun o tayındakını yoxlamaq, şifrə reset-ləri, hesab kilitləmələri, MFA yenidən qeydiyyatı və məhz helpdesk-i hədəfləyən sosial mühəndislik hücumları.
slug: /helpdesk-basics/account-and-password-procedures
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: helpdesk-basics
keywords:
  - helpdesk
  - şifrə reset
  - hesab kilitləmə
  - mfa
  - identiklik verification
  - sosial mühəndislik
  - vishing
difficulty: foundation
---

# Hesab və Şifrə Prosedurları

Helpdesk hər şeyin açarını saxlayır: şifrə reset etmək, MFA yenidən qeydiyyatdan keçirmək və ya hesabı açmaq bacarığı — o adam olmaq bacarığıdır. Buna görə hücumçular illər əvvəl login-ləri brute-force etməyi dayandırdılar və **helpdesk-i zəng etməyə başladılar**. Səmimi səs, inandırıcı hekayə, məşğul analit — və $0-lıq hücum təhlükəsizlik komandasının qurduğu hər kontrolu keçir. Bu dərs helpdesk-i personala köməkçi, başqalarına düşmən saxlayan prosedur qatıdır.

## Qızıl qayda: hekayəni yox, insanı yoxla

**Identiklik ilə bağlı heç nə, danışanın kim olduğunu yoxlamadan edilmir.** Direktorlar üçün də, "CEO gözləyir" üçün də, hamının adını bilən mehriban insan üçün də yox. Verification bütün kontrolun özüdür.

Standart verification nərdivanı (hərəkətin həssaslığına dərinlik uyğunlaşdırılır):

1. **Şəxsən** — personal ID kartı. Sadə və güclü.
2. **Qeydiyyatdakı nömrəyə callback** — heç vaxt zəng edənin təklif etdiyi nömrəyə yox. Zəng edənin siyahıdaki daxilini yox, şəxsi rəsmi nömrəyə geri zəng etməsini istəyin.
3. **Menecer təsdiqi** — zəng edənin xətt meneceri öz yoxlanılmış kanalından təsdiqləyir, _yuxarıdakılardan biri ilə əlavə olaraq_.
4. **Identiklik platforması dəlili** — aşağı-riskli özünəxidmet hərəkətləri üçün qeydiyyatlı cihaza MFA push.

Nə **heç vaxt** təkbaşına kifayət etmir: işçi adı, işçi nömrəsi, departament, vəzifə, menecerinin adı, son ticket nömrələri, zəng edənin gərginlik səviyyəsi. Bunların hamısı LinkedIn-dədir, phishing emaillərindədir və təxmin edilə bilər. _Yoxlanıldıqda aqressivləşən_ zəng edən dərsin tam işlədiyi yerdir — qırmızı bayraq deyil. Nəzakətli qalın, möhkəm qalın, rəsmi callback yolunu təklif edin.

Daxililəşdirmək lazım olan məşhur pattern: hücumçu junior analitə C-səviyyəli rəhbərə bənzəyərək "iclasdayam, şifrəm müddəti bitdi, İNDİ reset et" deyir. Doğru cavab heç nəyə başa gəlmir — _"Əlbəttə, kömək edərəm. Sizin üçün qeydiyyatdakı nömrənizə geri zəng edim."_ Takalcı asılır; real rəhbər buna hörmət edir.

## Şifrə reset-ləri

Təhlükəsizlik məntiqi əlavə olunmuş rutin prosedur:

1. **Identikliyi yoxlayın** — yuxarıdakı nərdivana görə.
2. **Reset edin, heç vaxt bildirməyin.** Yeni müvəqqəti şifrə verin; mövcud şifrəni heç vaxt oxumayın, ipucu verməyin və ya "təsdiqləməyin". Zəng edən "indi olanı de" deyərsə, cavab həmişə xeyirdir — onsuz da bilməzsiniz (yalnız hash-lar var) və bildirmək plaintext idarə etdiyinizi sübut edərdi.
3. **İlk logonda dəyişməyə məcbur edin.** Bir həftə yaşayan müvəqqəti şifrə daimi olanıdır.
4. **Aktiv sessiyaları ləğv edin** — platforma imkan verirsə; əks halda reset-dən əvvəl oğurlanan token reset-dən uzun yaşayır.
5. **Sənədləşdirin**: kim istədi, necə yoxlanıldı, nə dəyişdi, nə vaxt.

Şifrə siyasəti konteksti identiklik komandasına aiddir (mürəkkəblikdən çox uzunluq, kompromis şübhəsi yoxdursa məcburi rotasiya yoxdur — [IAM Account Management](/general-security/iam-account-management)-a baxın), amma helpdesk onun insan kənarını icra edir: **istisna yoxdur, "müvəqqəti paylaşılan" şifrə yoxdur, ticket-ə düz mətn kimi yazmaq yoxdur.**

## Hesab kilitləmələri

Adətən darıxdırıcı, bəzən pərdə arxasında:

| Səbəb                                                | İmza                                                    | İlk cavab                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| İstifadəçi şifrəni dəyişdi; köhnəsi cache-də qalıb   | Reset-dən dərhal sonra, _bir_ cihazdan uğursuzluqlar    | Cache-lənmiş credential-ları təmizlə (Windows Credential Manager, keychain), telefonlardakı kilidli applər |
| Köhnə şifrəli scheduled task / mapped drive / servis | Bir mənbədən hər N dəqiqə, gecə 3-də də                 | Task-ı və ya servis hesabını tap, yenilə                                                                   |
| Əsl typo fırtınası                                   | Partlayış, sonra sükut                                  | Aç, gözlə                                                                                                  |
| **Biri təxmin edir**                                 | Bir çox hesabda və ya xarici IP-lərdən çoxlu uğursuzluq | Sadəcə açma — mənbə IP-ləri yoxla, siyasətə görə yüksəlt, kiliddən əvəzinə deaktivi düşün                  |

Açma refleksi tələdir: bir şey kənarda təxmin etməyə davam edərkən hesabı dəfələrlə açmaq helpdesk-köməkli brute force-dur. Kilidi açmazdan əvvəl _pattern-ə_ baxın — üç ölkədən uğursuzluqlarla kilitlənmə ticket deyil, gedişində olan incidentdir.

## MFA yenidən qeydiyyatı: ən yüksək-riskli rutin sorğu

MFA-nı yenidən qeydiyyatdan keçirmək **hesab üçün yeni etimad faktoru zərb edir** — verification-ı danışıqla keçən hücumçu üçün o, ana açardır. Prosedur:

1. Identikliyi **ən yüksək** pillədə yoxlayın — MFA üçün callback + menecer təsdiqi məqsədli minimumdur, çünki MFA məhz hücumçunun əvəz etmək istədiyi şeydir.
2. Əvvəlcə bütün mövcud faktorları və aktiv sessiyaları ləğv edin — hücumçunun qeydiyyatlı cihazı yenisi ilə yanaşı sağ qalmamalıdır.
3. Yenidən qeydiyyatı istifadəçi **kamera qarşısında və ya yoxlanılmış callback üzərində** edin — üçüncü şəxs "quraşdırmağa kömək edən" kimi yox.
4. Kompromis artıq baş verməyibmi diye hesabın son fəaliyyətini yoxlayın (mümkünsüz giriş-lər, yeni inbox qaydaları — inbox qaydaları MFA əl keçirməsindən sonra klassik davamdır).
5. Kim yoxladı, hansı kanal vasitəsilə, nə vaxt — sənədləşdirin.

## Paylaşılan hesablar və "xeyir" sözü

Paylaşılan login-lər hesab-veriləbilmənin öldüyü yerdədir: hər hərəkət atribut-sız olur, offboarding sındırır və bir şifrə dəyişikliyi hamının işini sındırır. Helpdesk cavabı _ehtiyacı_ yönləndirməkdir, workaround-u deyil: "bu mailbox-a paylaşılan giriş lazımdır" — qanuni sorğudur; paylaşılan mailbox, qrup icazələri və ya identifikasiya oluna bilən komandaya məxsus düzgün servis hesabı ilə həll olunur ([IAM Account Management](/general-security/iam-account-management)). Paylaşılan _şəxsi_ hesablara "bəli" demək bu gün köməkli hiss etdirir, sabah audit tapıntısı yaradır.

## Sosial mühəndislik linzası

Bunları gözləyin və cavabları məşq edin:

- **Vishing** ("İT-yik, hesabınızı düzəldirik, ekrandakı kodu mənə oxuyun") — İT heç vaxt şifrənizi və ya MFA kodunuzu istəmir. Kod istəyən — hücumun özüdür.
- **İşçi kimi görünmək** saytdan, LinkedIn-dən və ya email imzasından detallarla. Hekayə ilə verification həmişə uğursuz olur; callback ilə verification həmişə işləyir.
- **Tələsiklik və avtoritet təzyiqi.** İkisi də hücumçunun saat idarəetməsidir. Callback doxsan saniyə çəkir və hər ikisini məğlub edir.
- **Pretext ticket-lər** — konkret hesabı reset etmək üçün analiti yönləndirən real-görünüşlü ticket. Ticket növbələri hücumçu-kəşf ərazisidir; buna görə prosedurlar _hekayəni_ yox, _hərəkəti_ bağlayır.

Prosedura uyğun hər rədd bir xilasdır. Sakit yoxlayan və hər şeyi sənədləşdirən helpdesk funksional olaraq təşkilatın ikinci MFA faktorudur.

## Növbəti addım

- [Common Helpdesk Tickets](/helpdesk-basics/common-helpdesk-tickets) — geniş ticket mənzərəsi.
- [Onboarding and Offboarding](/helpdesk-basics/onboarding-offboarding) — gündəlik sorğulardan kənar identiklik lifecycle-ı.
- [Social Engineering](/red-teaming/social-engineering) — bu telefon zənginin hücumçu tərəfi.
- [IAM Account Management](/general-security/iam-account-management) — bu prosedurların altındakı platforma qatı.
