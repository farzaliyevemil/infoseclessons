---
id: network-basics
title: Şəbəkə Əsasları
description: Şəbəkəyə praktiki giriş — növlər, topologiyalar, ünvanlama, NAT, DNS, portlar və OSI/TCP‑IP modelləri.
slug: /network-types
---

# 🧠 Şəbəkə Əsasları

Məzmun “Computer networking.pptx” təqdimatından konsolidasiya edilib və qısa izahlarla genişləndirilib.

---

## ❓ Şəbəkə nədir?

- Tərif: qurğuların bir‑biri ilə məlumat mübadiləsi və resurs paylaşması üçün birləşdirilməsi.
- Baza elementləri: ötürmə mühiti (mis/şüşə/simsiz), ünvanlar (MAC/IP), yönləndirmə (switch/router) və protokollar (TCP/IP, DNS, DHCP).
- Qeyd: kiçik şəbəkələr sadədir; miqyas artdıqca seqmentləşdirmə, NAT və marşrut qaydaları tələb olunur.

---

## 🗺️ Sahə Şəbəkələrinin Növləri

- LAN: kiçik ərazilər (ev/ofis/kampus). Yüksək sürət, aşağı gecikmə; adətən Ethernet və Wi‑Fi.
- MAN: şəhər səviyyəsində. Çox vaxt fiber halqalar; İSP və ya böyük təşkilat idarə edir.
- WAN: uzaq ofislərin birləşdirilməsi; MPLS/VPN/İnternetdən istifadə.
- Qeyd: Buluda çıxış (Direct Connect/ExpressRoute) WAN‑ın uzantısı kimi baxıla bilər.

---

## 🔗 LAN Topologiyaları

- Bus: bütün qurğular eyni xəttə qoşulur; sadə/ucuz, lakin toqquşma və tək xətt nasazlığı riski.
- Ulduz (Star): hər qurğu mərkəzi switch‑ə; ən yaygın, idarəsi asan, mərkəzdə tək nasazlıq nöqtəsi.
- Halqa (Ring): trafik halqa boyunca dövr edir; halqa qırılarsa əlaqə dayanır (ikiqat halqa istisna).
- Mesh: qurğular arasında çoxsaylı yol; yüksək dayanıqlılıq, daha baha; bel/skelet şəbəkələrdə.
- Qeyd: müasir LAN fiziki ulduz, lakin ehtiyat linklərlə məntiqi mesh qura bilər (LACP, STP).

Şəkillər (slaydlardan):

![Şəkil](/img/networking/computer-networking/image1.png)
![Şəkil](/img/networking/computer-networking/image2.png)
![Şəkil](/img/networking/computer-networking/image3.png)
![Şəkil](/img/networking/computer-networking/image4.png)

---

## 📡 Əlaqə Tipləri

- Unicast: bir‑birinə çatdırılma. Qeyd: veb/applikasiya trafiki əsasən unicastdır.
- Multicast: abunəçilərə bir‑çox. Qeyd: yayım/axın üçün səmərəlidir; multicast yönləndirmə tələb edir.
- Broadcast: alt şəbəkədə hamıya. Qeyd: L2 ilə məhdud; həddən artıq broadcast “storm” yarada bilər.

---

## 🌐 IP Ünvanlama (IPv4/IPv6)

- Məxfi vs İctimai:
  - Məxfi (RFC1918): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; internetdə marşrutlaşdırılmır.
  - İctimai: qlobal marşrutlana bilən.
- Dinamik vs Statik:
  - Dinamik: DHCP ilə verilir; zamanla dəyişir.
  - Statik: sabit; serverlər/DNS üçün stabil seçim.
- IPv6: 128‑bit; nəhəng ünvan sahəsi, sadələşmiş başlıq, NAT tələb etmir. Qeyd: keçiddə dual‑stack geniş yayılıb.

---

## ➗ Subnetləşdirmə və CIDR

- CIDR: `192.168.1.0/24` — 24 şəbəkə biti, 256 ünvan (254 istifadə oluna bilən).
- P2P xətləri: `/30` (IPv4) 2 istifadə oluna bilən IP; `/31` P2P üçün (RFC 3021).
- Siniflər (A/B/C) tarixi anlayışdır; praktikada VLSM/CIDR istifadə olunur.
- Qeyd: alt şəbəkələri funksiyaya görə planlamaq firewall qaydalarını sadələşdirir.

---

## 🔁 NAT (Network Address Translation)

- Nədir: daxili ünvanların kənarda ictimai ünvanlara (və portlara) çevrilməsi.
- Növlər: Statik (1:1), Dinamik (hovuz), PAT/NAPT (çox‑bir porta görə).
- İstifadə: IPv4 qorunması, daxili ünvanların gizlədilməsi, sadə çıxış siyasəti.
- Qeyd: NAT ucdan‑uca əlaqəni pozur; daxil olan trafik üçün port yönləndirmə və ya reverse proxy istifadə edin.

---

## 🆔 MAC və ARP

- MAC: L2 cihaz ünvanı (məs., `00:aa:bb:cc:dd:ee`).
- ARP: eyni yayım sahəsində IPv4‑ü MAC‑a xəritələyir.
- Qeyd: gratuitous ARP qonşuları yeniləyir; ARP zəhərlənməsi tipik L2 hücumudur.

---

## 🤝 DHCP (DORA)

- Discover → Offer → Request → Ack: IP icarəsi və parametrlərin (gateway, DNS, icarə vaxtı) alınması.
- Qeyd: rezervasiya MAC→IP təyin edir; relay (IP Helper) yayımı digər şəbəkələrə ötürür.

---

## 🔤 DNS Əsasları

- Məqsəd: adların IP‑lərə (A/AAAA), poçt (MX), ləqəb (CNAME), mətn (TXT) yazılarına xəritələnməsi.
- Komponentlər: keş, rezolver, avt. ad serverləri, ad məkanı (root, TLD, domenlər).
- Qeyd: TTL keşləmə müddətini tənzimləyir; split‑horizon daxili və xarici üçün fərqli cavab verir.

---

## 🔢 Yayğın Port və Protokollar

- 20/21 FTP — fayl ötürmə (data/control); köhnə, internetdə tövsiyə edilmir.
- 22 SSH — təhlükəsiz uzaq shell və tunellər.
- 23 Telnet — şifrəsiz; istifadə etməyin.
- 25/465/587 SMTP — poçt ötürülməsi və göndərişi.
- 53 DNS — adların həlli (UDP/TCP).
- 67/68 DHCP — IPv4 ünvan icarəsi.
- 80/443 HTTP/HTTPS — veb.
- 110 POP3, 143 IMAP — poçt qəbulu.
- 123 NTP — vaxt sinxronizəsi.
- 137‑139 NetBIOS, 445 SMB — Windows fayl/xidmətləri.
- 161/162 SNMP — şəbəkə monitorinqi və traplar.
- 389 LDAP — kataloq xidməti.
- 1433 MSSQL, 1521 Oracle, 3306 MySQL, 5432 PostgreSQL — verilənlər bazaları.
- 3389 RDP — Windows uzaq masaüstü.

---

## 🧭 Modellər: TCP/IP və OSI

- TCP/IP (5 qat): Application • Transport • Network • Data Link • Physical.
- OSI (7 qat):
  - 7 Application — istifadəçi protokolları (HTTP, DNS, SMTP). Data.
  - 6 Presentation — format/şifrə/sıxılma (TLS/SSL). Data.
  - 5 Session — sesiyalar/nəzarət nöqtələri (RPC). Data.
  - 4 Transport — TCP/UDP, portlar, etibarlılıq, ardıcıllıq. Segment/Datagram.
  - 3 Network — IP marşrutlama, ünvanlama, TTL. Paket.
  - 2 Data Link — çərçivə, MAC, VLAN, ARP. Çərçivə. Cihazlar: switch/bric.
  - 1 Physical — bitlər, siqnal, media, konnektorlar. Bit.
- Qeyd: kapsullaşma məlumatı aşağı qatlardan keçirdikcə başlıq əlavə edir; hopda uyğun qat decapsulation edir.

OSI şəkilləri (slaydlardan):

![Şəkil](/img/networking/computer-networking/image33.png)
![Şəkil](/img/networking/computer-networking/image40.png)

---

## 📎 Slayd Şəkil Qalereyası

Aşağıda təqdimatdan çıxarılmış əlavə şəkillər var.

![Şəkil](/img/networking/computer-networking/image5.png)
![Şəkil](/img/networking/computer-networking/image6.png)
![Şəkil](/img/networking/computer-networking/image7.png)
![Şəkil](/img/networking/computer-networking/image8.png)
![Şəkil](/img/networking/computer-networking/image9.png)
![Şəkil](/img/networking/computer-networking/image10.png)

