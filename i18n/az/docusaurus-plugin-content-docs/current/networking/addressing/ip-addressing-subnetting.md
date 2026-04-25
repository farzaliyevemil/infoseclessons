---
id: ip-addressing-subnetting
title: IP Ünvanlama və Subnetting
description: "IPv4 ünvanlama üçün praktik bələdçi: classlar, public vs private, NAT, DMZ, CIDR və subnet hesablamaları."
slug: /networking/ip-addressing-subnetting
sidebar_position: 4
status: reference
last_reviewed: 2026-04-22
keywords:
  - ip
  - subnet
  - cidr
  - nat
  - dmz
  - private ip
difficulty: foundation
---

# IP Ünvanlama və Subnetting

**IP ünvanı** — cihazın şəbəkədə tanınması üçün məntiqi ünvanıdır. Cihazların bir-biri ilə IP şəbəkəsi üzərindən əlaqə qurması üçün statik və ya dinamik IP-yə sahib olmaları lazımdır.

IPv4 32 bitdir, nöqtə ilə ayrılmış dörd onluq oktet (0–255) kimi yazılır:

```
192  .  168  .   1  .  10
 8bit    8bit    8bit   8bit
         ümumi 32 bit
```

## IPv4 classları

Klassik IPv4 ünvan classları birinci oktetə əsaslanır:

| Class | Birinci oktet aralığı | Default mask | Tipik istifadə |
| --- | --- | --- | --- |
| A | 1 – 126 | 255.0.0.0 (/8) | Çox böyük şəbəkələr |
| B | 128 – 191 | 255.255.0.0 (/16) | Orta şəbəkələr |
| C | 192 – 223 | 255.255.255.0 (/24) | Kiçik şəbəkələr |

`127.0.0.0/8` loopback üçün ayrılıb (`127.0.0.1` → öz host-un). `224.0.0.0/4` D class-dır (multicast), `240.0.0.0/4` isə E class-dır (reserved).

Müasir şəbəkələr ciddi class sərhədlərindən yox, classless routing (CIDR) istifadə edir. Amma yuxarıdakı aralıqlar hələ də təcrübədə görəcəyiniz default mask-ları təsvir edir.

## Private IP aralıqları

Private aralıqlar (RFC 1918) public internetdə routable deyil. Ev, ofis və data center-lərin daxilində istifadə olunur, internetə çıxmaq üçün NAT-a söykənir.

| Class | Private aralıq |
| --- | --- |
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

Təcrübədə daxili şəbəkədə ən çox 10.x və 192.168.x aralıqları istifadə olunur, 172.16–31.x isə adətən DMZ və management şəbəkələri üçün seçilir.

## Public vs private IP

| | Public IP | Private IP |
| --- | --- | --- |
| Digər adları | WAN IP, global IP | LAN IP, daxili IP |
| İnternet əlçatanlığı | Birbaşa routable | Yalnız NAT ilə |
| Kim verir | ISP / cloud provider | Router / DHCP |
| Nümunə | 173.222.14.238 | 192.168.1.10 |

Ev nümunəsi: notebook `192.168.1.2`, PC `192.168.1.3`, telefon `192.168.1.4` — hamısı private. `google.com` kimi xidmətlər (məs. `173.x.x.x`) public-dir.

## NAT (Network Address Translation)

NAT private ünvanları tək (və ya kiçik pool) public ünvanına çevirir ki, private host-lar internetə çıxa bilsin. LAN-ın kənarındakı router NAT-ı icra edir və adətən **default gateway** rolunu oynayır.

```
Daxili client (192.168.1.x)
        ↓
Default gateway / router (192.168.1.1)
        ↓ NAT
Public IP (203.0.113.10)
        ↓
İnternet
```

Host-un IP-si və default gateway-i birbaşa forwarding üçün eyni subnetdə olmalıdır.

## DMZ (demilitarized zone)

**DMZ** — firewall-lar vasitəsilə public internet ilə daxili şəbəkə arasında izolyasiya olunmuş şəbəkə seqmentidir. Public-facing xidmətlər (web, mail, reverse proxy) burada yerləşir ki, onların kompromisi daxili şəbəkəyə birbaşa çıxış vermsin.

```
İnternet → [Edge firewall] → DMZ (web, mail, reverse proxy)
                         → [Inner firewall] → Daxili (AD, DB)
```

Konvensiya olaraq DMZ şəbəkələrində 172.16–31.x private aralığı tez-tez istifadə olunur, amma istənilən private aralıq uyğundur.

## Loopback

`127.0.0.1` loopback ünvanı həmişə host-un özünə işarə edir. Lokal xidmət testi (`curl http://127.0.0.1:8080`) və fiziki NIC-ə toxunmadan stack yoxlaması üçün istifadə olunur.

Hər subnetdə iki ünvan reserve olunur:

- **Network ID** — birinci ünvan, subnetin özünü identifikasiya edir
- **Broadcast** — sonuncu ünvan, subnetdəki bütün host-lara çatmaq üçün istifadə olunur

Heç biri fərdi host-a təyin olunmur.

## Subnet mask

Subnet mask IP ünvanının network hissəsini host hissəsindən ayırır. 1-ə qoyulan bitlər network hissəsinə aiddir; 0-a qoyulan bitlər host hissəsinə aiddir.

| Class | Default mask | Prefix |
| --- | --- | --- |
| A | 255.0.0.0 | /8 |
| B | 255.255.0.0 | /16 |
| C | 255.255.255.0 | /24 |

## CIDR notation

**CIDR (Classless Inter-Domain Routing)** network prefix-ini `address/n` kimi yazır, burada `n` — mask-dakı 1-bitlərin sayıdır.

```
192.168.1.100/24  →  mask 255.255.255.0
192.168.1.210/26  →  mask 255.255.255.192
```

CIDR müasir şəbəkələrin subnet-ləri ifadə etdiyi üsuldur — classful `/8`, `/16`, `/24` sərhədlərinə bağlı deyilsən.

## Subnet hesablaması

Mask-ın dəyişən oktetini işləmək üçün iki əsas düstur:

```
2^x = subnet sayı
      (x = dəyişən oktetdəki 1-bitlərin sayı)

2^n = hər subnetdəki ünvan sayı
      (n = dəyişən oktetdəki 0-bitlərin sayı)
```

Hər subnetdə birinci və sonuncu ünvan reserve olunur (network ID və broadcast), ona görə istifadə edilə bilən host sayı `(2^n) - 2`-dir.

### İşlənmiş nümunə — mask 255.255.255.224 (/27)

`224 = 11100000` binary-də → 3 bir-bit, 5 sıfır-bit.

```
1-bitlər = 3  →  2^3 = 8 subnet
0-bitlər = 5  →  2^5 = 32 ünvan/subnet (30 istifadə edilə bilən)
```

Alternativ qısa yol:

```
256 − 224 = 32   (blok həcmi)
256 ÷ 32  = 8    (subnet sayı)
```

### 192.168.1.0/27 üçün subnet bölgüsü

Səkkiz subnet, hər birində 32 ünvan:

| # | Aralıq |
| --- | --- |
| 1 | 192.168.1.0 – 192.168.1.31 |
| 2 | 192.168.1.32 – 192.168.1.63 |
| 3 | 192.168.1.64 – 192.168.1.95 |
| 4 | 192.168.1.96 – 192.168.1.127 |
| 5 | 192.168.1.128 – 192.168.1.159 |
| 6 | 192.168.1.160 – 192.168.1.191 |
| 7 | 192.168.1.192 – 192.168.1.223 |
| 8 | 192.168.1.224 – 192.168.1.255 |

Hər aralığın birinci ünvanı network ID, sonuncusu broadcast-dır.

### Eyni subnet yoxlaması

İki host yalnız verilən mask altında eyni network ID-ni bölüşürsə, eyni subnetdədir.

```
192.168.1.10/27   →  subnet 1 (192.168.1.0/27)
192.168.1.111/27  →  subnet 4 (192.168.1.96/27)
```

Bu nümunədə onlar bir-birinə birbaşa çata bilməzlər — trafik router-dən keçməlidir (Layer 3 forwarding).

## Binary təkrar

Hər oktet 8 bitdir. Mövqe dəyərləri:

```
128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
```

Beləliklə `192 = 128 + 64 = 11000000`, `224 = 128 + 64 + 32 = 11100000` və s. Bütün subnet hesablaması dəyişən oktetdəki 1-bitlərin və 0-bitlərin sayılmasına gəlib çıxır.

## Praktik nəticələr

- İstənilən subnetin network ID və broadcast-ını dərhal tanımağı öyrənin
- CIDR istifadə edin; köhnə avadanlıq xaricində classful sərhədlər güman etməyin
- NAT təhlükəsizlik sərhədi deyil — onun üçün firewall istifadə edin
- Public-facing xidmətləri DMZ-yə qoyun; onları daxili şəbəkəyə NAT etməyin
- Subnetləri və onların məqsədini deployment-dən əvvəl sənədləşdirin

## Faydalı linklər

- Subnet kalkulyator: [https://www.subnet-calculator.com/](https://www.subnet-calculator.com/)
- CIDR izahı: [https://cidr.xyz](https://cidr.xyz)
- RFC 1918 (private aralıqlar): [https://datatracker.ietf.org/doc/html/rfc1918](https://datatracker.ietf.org/doc/html/rfc1918)
