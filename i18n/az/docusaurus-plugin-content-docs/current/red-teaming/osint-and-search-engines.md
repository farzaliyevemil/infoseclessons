---
id: osint-and-search-engines
title: OSINT və kibertəhlükəsizlik axtarış sistemləri
description: Səlahiyyətli kəşfiyyat üçün passiv OSINT mənbələrini və kibertəhlükəsizlik axtarış sistemlərini izah edən praktik, imtahan yönümlü dərs.
slug: /red-teaming/osint-and-search-engines
sidebar_position: 14
status: reference
last_reviewed: 2026-09-20
keywords:
  - osint
  - reconnaissance
  - shodan
  - censys
  - google dorks
  - cybersecurity search engines
difficulty: foundation

tags:
  - red-team
  - beginner
---

# OSINT və kibertəhlükəsizlik axtarış sistemləri

**Açıq mənbəli kəşfiyyat (OSINT)** ictimaiyyətə açıq məlumatların sistemli şəkildə toplanması və təhlilidir. Səlahiyyətli təhlükəsizlik işində OSINT hədəfin sistemlərinə dərhal toxunmadan xarici hücum səthini anlamağa kömək edir.

Bu dərs qanuni, passiv kəşfiyyata aiddir. İctimai nəticənin görünməsi həmin məlumatı istismar etməyə, sistemi skan etməyə, aqressiv scrape etməyə və ya hesaba daxil olmağa avtomatik icazə vermir. Aktiv test üçün açıq scope və icazə lazımdır.

## OSINT hansı suallara cavab verir?

İşə alətlə deyil, sualla başlayın:

- Təşkilata hansı domen və subdomenlər aiddir?
- Hansı internet xidmətləri açıq görünür?
- Veb-saytlar və vakansiyalar hansı texnologiyaları açıqlayır?
- Korporativ e-poçt ünvanları məlum sızma bildirişlərində görünürmü?
- Hücumçu inandırıcı phishing mesajı hazırlamaq üçün hansı məlumatı tapa bilər?

Nəticə mənbə URL-i, toplama vaxtı, etimad səviyyəsi və tövsiyə olunan tədbirlə birlikdə aktiv siyahısı və ya kəşfiyyat qeydi olmalıdır. Ekran görüntüləri qovluğu, tapıntılar əlaqələndirilib izah edilməyənə qədər kəşfiyyat deyil.

## Passiv və aktiv kəşfiyyat

| Növ | Mənası | Nümunələr | İcazə |
|---|---|---|---|
| **Passiv** | Hədəfin sistemlərinə birbaşa sorğu göndərmədən ictimai və üçüncü tərəf mənbələrindən istifadə | Axtarış sistemləri, sertifikat şəffaflığı, ictimai DNS tarixçəsi, ictimai kod, şirkət səhifələri | Şəxsi məlumat üçün yenə də qanuni məqsəd tələb olunur |
| **Aktiv** | Hədəfin sistemlərinə sorğu və ya probe göndərmək | Port skanı, qovluq brute-force-u, banner toplama, DNS zone-transfer cəhdləri | Yazılı scope və rules of engagement tələb edir |

Xidməti indeksləyən axtarış sistemi faydalı məlumat göstərə bilər, lakin nəticədən istifadə edib giriş etmək, istismar aparmaq və ya giriş nəzarətini keçmək ayrıca fəaliyyətdir.

## Faydalı axtarış və kəşfiyyat mənbələri

| Mənbə | Əsas istifadə | Vacib xəbərdarlıq |
|---|---|---|
| **Axtarış sistemləri və Google Dorks** | İndekslənmiş sənədləri, giriş səhifələrini, açıq qovluqları və texnologiya izlərini tapmaq | Yalnız səlahiyyətli hədəflər üçün istifadə edin; həssas məlumatı lazımsız yükləməyin |
| **Shodan** | İnternetə açıq cihazları banner, port, təşkilat və netblock üzrə axtarmaq | İndeks xidmətin indi əlçatan olduğunu sübut etmir |
| **Censys** | Sertifikat, host, xidmət və internet infrastrukturu kəşfi | Hesabatdan əvvəl sahiblik və cari vəziyyəti təsdiqləyin |
| **SecurityTrails tipli DNS alətləri** | Cari və tarixi DNS qeydləri, subdomenlər və hostinq dəyişiklikləri | Tarixi məlumat köhnəlmiş ola bilər |
| **crt.sh** | Certificate Transparency qeydləri və unudulmuş subdomenlər | Sertifikat hostun hələ aktiv olduğunu sübut etmir |
| **Hunter.io** | İctimai e-poçt nümunəsi və domen məlumatları | Məxfilik və məlumatların qorunması tələblərinə əməl edin |
| **Have I Been Pwned** | E-poçtun məlum sızma bildirişlərində olub-olmadığını yoxlamaq | Sızmış parolları əldə etməyə və yoxlamağa çalışmayın |
| **GitHub/GitLab və grep.app** | İctimai kodu, konfiqurasiyanı və səhvən açılmış sirləri tapmaq | Sirləri məsuliyyətlə bildirin; onlardan giriş üçün istifadə etməyin |
| **WiGLE** | İctimai simsiz şəbəkə müşahidələri | Məkan və şəxsi məlumatlara diqqətlə yanaşın |
| **GreyNoise və oxşar xidmətlər** | İnternet skanları və fon səs-küyü üçün kontekst | Kəşfiyyat konteksti skan icazəsi deyil |

Digər məşhur alətlərə **Recon-ng**, **theHarvester**, **Maltego**, **SpiderFoot**, **Amass**, **ExifTool**, **Metagoofil** və **FOCA** daxildir. Alətdən daha vacib olan iş axınıdır: sual → topla → qeyd et → əlaqələndir → hesabat ver.

## Sadə OSINT iş axını

1. **Scope-u müəyyən edin.** Təşkilatı, domenləri, IP aralıqlarını, şəxsləri və brendləri, həmçinin qadağan edilmiş hərəkətləri yazın.
2. **Passiv toplayın.** Rəsmi saytlar, axtarış sistemləri, sertifikat logları, DNS məlumatları, ictimai kod və etibarlı kəşfiyyat xidmətlərindən başlayın.
3. **Mənbəni qeyd edin.** Dəqiq URL, vaxt, sorğu, ekran görüntüsü və ya cavab xülasəsi, etimad səviyyəsi yazılmalıdır.
4. **Tapıntıları əlaqələndirin.** Sertifikat subdomenini DNS-lə, DNS hostunu xidmət indeksi ilə, vakansiyadakı texnologiya ipucunu aktivlə bağlayın.
5. **Sahibliyi təsdiqləyin.** Shared hosting, CDN ünvanları, köhnə qeydlər və üçüncü tərəf xidmətləri yalnış pozitiv yarada bilər.
6. **Sadəcə məlumatı yox, riski bildirin.** Açıq admin panelinin, sızmış sirrin və ya unudulmuş subdomenin niyə təhlükəli olduğunu və nə edilməli olduğunu yazın.
7. **Suala cavab aldıqda dayanın.** Daha çox məlumat avtomatik olaraq daha yaxşı kəşfiyyat deyil.

## İmtahan üçün əsas məqamlar

- **OSINT sadəcə məlumat toplamaq deyil.** Təhlil, kontekst, etimad və tədbirə yönəlmiş nəticə tələb olunur.
- **Passiv recon** hədəflə birbaşa əlaqədən qaçır; **aktiv recon** hədəfi yoxlayır və icazə tələb edir.
- **Shodan və Censys** internet miqyaslı indekslərdir, özləri avtomatik zəiflik skaneri deyil.
- **Certificate Transparency** subdomenləri göstərə bilər, lakin sertifikat hostun hazırda işlədiyini sübut etmir.
- **Google Dorking** `site:`, `filetype:` və `inurl:` kimi operatorlarla axtarışı daraldır.
- **Tapıntı təsdiqlənməlidir.** Üçüncü tərəf hostu və köhnə DNS qeydi sübut olmadan təsdiqlənmiş aktiv sayılmamalıdır.

## Təhlükəsiz məşq

Sahibi olduğunuz və ya məşq üçün açıq şəkildə verilmiş domenlə işləyin:

1. `crt.sh`-də onun ictimai sertifikat qeydlərini tapın.
2. Tapılan adları təşkilatın aktiv inventarı ilə müqayisə edin.
3. İctimai səhifələrin texnologiya versiyası və ya həssas əməliyyat məlumatı açıqlayıb-açıqlamadığını yoxlayın.
4. Hər nəticəni vaxt və etimad səviyyəsi ilə qeyd edin.
5. Köhnə DNS-i silmək, açıq xidməti məhdudlaşdırmaq və ya ictimai koddan sirri çıxarmaq kimi düzəliş yazın.

Yazılı icazə olmadan passiv kəşfi skan və ya istismara çevirməyin.

## Əsas nəticə

OSINT müdafiəçilərə və səlahiyyətli testçilərə ictimai hücum səthini hücumçu baxışı ilə görməyə imkan verir. Axtarış sistemləri, sertifikat məlumatları, DNS tarixçəsi, kod axtarışı və sızma bildirişləri aydın sual, diqqətli təsdiq, qanuni scope və məsuliyyətli hesabatla istifadə edildikdə dəyərlidir.
