---
id: dns
title: DNS (Domain Name System)
description: DNS-in necə işlədiyi, zone tipləri, query növləri, caching, TTL və record-lar haqqında praktik izah.
slug: /networking/dns
sidebar_position: 2
status: reference
last_reviewed: 2026-03-23
keywords:
  - dns
  - name resolution
  - caching
  - ttl
  - records
difficulty: foundation
---

# DNS (Domain Name System)

DNS domen adlarını IP ünvanlara çevirən əsas xidmət qatıdır. Brauzerdə `google.com` yazanda sistem əvvəlcə onun hansı IP-yə getməli olduğunu öyrənir; bunu edən mexanizm DNS-dir.

![DNS Resolution Flow](/img/networking/dns-resolution-flow.svg)

## DNS nə üçün vacibdir?

DNS yalnız addan IP-yə keçid üçün deyil, həm də aşağıdakılar üçün vacibdir:

- name server-lərin tapılması
- e-mail marşrutunun müəyyənləşdirilməsi
- servis kəşfi və infrastruktur asılılıqları
- lokal troubleshooting və cache davranışının izahı

Başqa sözlə, şəbəkədə çox problem əslində "IP deyil, resolution" problemidir.

## Resolution axını necə gedir?

İstifadəçi `google.com` açmaq istəyəndə sistem adətən bu ardıcıllıqla hərəkət edir:

1. Öz host adı və lokal uyğunluqları yoxlayır
2. DNS resolver cache-ə baxır
3. `hosts` faylında statik qeyd olub-olmadığını yoxlayır
4. Konfiqurasiya olunmuş DNS server-ə sorğu göndərir
5. Lazım olsa, həmin DNS server digər serverlərə iterativ sorğu verir

Windows-da lokal cache-ə baxmaq üçün:

```cmd
ipconfig /displaydns
```

Cache-i təmizləmək üçün:

```cmd
ipconfig /flushdns
```

## Naming hierarchy

DNS adları iyerarxik quruluşa malikdir:

```text
root (.)
  -> top-level domain (.com, .az, .org)
    -> second-level domain (google, microsoft)
      -> subdomain (mail, support, www)
```

Məsələn `support.google.com` üçün:

- `.` root-dur
- `com` top-level domain-dir
- `google` əsas domen hissəsidir
- `support` subdomain-dir

Tam yazılmış ünvan **FQDN** adlanır.

## Query növləri

DNS-də üç əsas sorğu tipi var:

### Recursive query

Client DNS server-dən tam cavab gözləyir: ya IP ünvanı, ya da error.

### Iterative query

Bir DNS server başqa DNS server-dən istiqamət alır və cavaba doğru addım-addım gedir.

### Reverse query

IP ünvanından domain adına keçmək üçündür. Burada əsas record tipi `PTR` olur.

## TTL və caching

**TTL (Time To Live)** cavabın cache-də nə qədər qalacağını göstərir. TTL müddəti bitənə qədər sistem eyni sorğunu yenidən serverə göndərməyə bilər.

Bu performansı yaxşılaşdırır, amma IP dəyişəndə köhnə cavabın cache-də qalması problem yarada bilər. Ona görə troubleshooting zamanı `flushdns` əmri praktik olaraq vacibdir.

## DNS hansı portda işləyir?

DNS həm **UDP 53**, həm də **TCP 53** istifadə edir.

- **UDP** standart, sürətli sorğular üçün
- **TCP** isə daha böyük cavablar və zone transfer kimi hallarda

## Zone tipləri

| Zone tipi | İzah |
| --- | --- |
| Primary Zone | Yazıla bilən əsas kopyadır |
| Secondary Zone | Primary zone-un read-only kopyasıdır |
| Active Directory Integrated Zone | AD ilə inteqrasiya olunmuş daha güclü modeldir |
| Stub Zone | Yalnız müəyyən əsas record-ları saxlayır |
| Forward Lookup Zone | Domain adını IP-yə çevirir |
| Reverse Lookup Zone | IP-ni ada çevirir |

### Primary və Secondary

Primary zone əsas idarəetmə nöqtəsidir. Secondary isə read-only kopya kimi fault tolerance və yük paylaşımı üçün faydalıdır.

### AD Integrated Zone

Bu model Active Directory ilə replikasiya və təhlükəsizlik imkanlarını daha səliqəli birləşdirir. Praktik enterprise mühitlərdə çox vaxt ən uyğun seçim olur.

### Stub Zone

Stub zone bütün record-ları saxlamır; əsasən digər zone-a necə çatacağını bilmək üçün minimum məlumat saxlayır.

## Dynamic DNS

Dynamic DNS olduqda client və ya DHCP server DNS qeydlərini avtomatik yeniləyə bilir. Bu, böyük Windows mühitlərində əl ilə record yazmaq ehtiyacını azaldır.

Ən təhlükəsiz praktik seçim adətən `Secure Only` yanaşmasıdır; yalnız tanınan Active Directory account-ları qeydiyyat edə bilir.

## Əsas record tipləri

| Record | Mənası |
| --- | --- |
| A | IPv4 ünvanı |
| AAAA | IPv6 ünvanı |
| CNAME | Başqa ada yönləndirən alias |
| MX | Mail server qeydi |
| NS | Name server |
| PTR | Reverse lookup |
| SOA | Zone haqqında əsas səlahiyyət məlumatı |
| TXT | SPF, DKIM və s. üçün mətn qeydləri |
| SRV | Xidmət kəşfi, xüsusən AD üçün vacibdir |

## Praktik qayda

- Əvvəlcə cache və `hosts` faylını düşünün
- Sonra hansı DNS serverdən cavab gəldiyini yoxlayın
- Ardınca zone, TTL və record tipinə baxın

DNS problemi çox vaxt "internet yoxdur" kimi görünür, amma kök səbəb ad resolution axınındakı konkret bir mərhələ olur.
