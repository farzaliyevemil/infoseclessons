---
id: ports-and-protocols
title: Portlar və Protokollar
description: TCP/UDP portları necə işləyir, üç port diapazonu, hər infosec mütəxəssisinin bilməli olduğu 30 port, təhlükəsiz və açıq mətn alternativləri, host-larınızda gözlənilməz dinləyiciləri necə tapmaq.
slug: /networking/ports-and-protocols
sidebar_position: 5
status: reference
last_reviewed: 2026-04-25
keywords:
  - ports
  - protocols
  - well-known ports
  - tcp ports
  - udp ports
  - listening ports
  - networking fundamentals
  - port scanning
difficulty: foundation
---

# Portlar və Protokollar

## Bu niyə vacibdir

İşləyən hər xidmət özünü bir port vasitəsilə təqdim edir. Veb server TCP 443-də dinləyir. Domain controller TCP 88, 389, 445, 636 və daha bir neçə portda dinləyir. Keçən sprintdən qalan unudulmuş test konteyneri TCP 8080-də dinləyir. Demək olar ki, hər insident cavabında ilk sual — "kim kimlə danışırdı?" — portlar və protokollar dilində cavablanır.

Gözlənilməz dinləyicini tanımaq müdafiəçinin sahib olduğu ən ucuz, ən sürətli aşkarlamadır. "445 SMB-dir, 3389 RDP-dir, 4444 Metasploit-in standartıdır" deyə bilən SOC analitiki netstat çıxışının ikinci sütununda anomaliyanı görür. `nmap` hesabatını şərh edə bilməyən penetrasiya testçisi kor-koranə skan edib səs-küy raport edəcək. MSSQL-i 1433-də İnternetə sızdıran sistem inzibatçısı isə bunu aylar ərzində hadisə cavab komandasına izah edəcək. Portlar öz mülklərinizin şəbəkə xəritəsini necə oxuduğunuzdur — və hücum edənlərin onu sizin üçün necə oxuduğudur.

Bu dərs istinaddır: üç port diapazonu, fikirləşmədən bilməli olduğunuz otuz port, köhnə → təhlükəsiz uyğunluğu və "bu host nəyi ifşa edir?" sualını bir sətirlik cavaba çevirən ƏS əmrləri. Portların arxasındakı nəqliyyat mexanikası — 5 elementli kortej, TCP üçtərəfli əl sıxma, UDP minimalizmi — [TCP və UDP](./tcp-and-udp.md) dərsində yaşayır. Səviyyə modeli kontekstı [OSI modelində](./osi-model.md) və [TCP/IP modelində](./tcp-ip-model.md) verilir. Köhnədən müasirə protokol yeniləmələrinin necə dizayn edildiyi və tətbiq olunduğu üçün [təhlükəsiz protokollara](../secure-design/secure-protocols.md) baxın.

## Port əslində nədir

Port TCP və ya UDP başlığında **16 bitlik işarəsiz tam ədəddir** — `0`-dan `65535`-ə qədər dəyərlər. O fiziki bir deşik və ya soket deyil; əməliyyat sisteminin hansı prosesin verilmiş seqmenti almalı olduğunu qərarlaşdırmaq üçün istifadə etdiyi bir etiketdir. Paket hosta gəldikdə, kernel hədəf portuna baxır, həmin portu bağlamış prosesi tapır və yükü yuxarı ötürür.

Axının hər tərəfinin öz portu var. Qoşulmanın tam kimliyi **5 elementli kortej**dir:

```text
(protokol, mənbə IP, mənbə portu, hədəf IP, hədəf portu)
```

**Hədəf port** məşhur olandır — HTTPS üçün `443`, SSH üçün `22` — çünki müştəri əvvəlcədən hansı qapını döyəcəyini bilməlidir. **Mənbə port** demək olar ki, həmişə müvəqqətidir, müştəri kerneli tərəfindən dinamik diapazondan təsadüfi seçilir. Eyni sayta açılmış iki brauzer tabı `(server-IP, 443)` hədəf cütünü paylaşır və yalnız mənbə portları fərqli olduğu üçün ayrı qalır — `51000` vs `51001`. 5 elementli kortej intizamını itirsəniz, hər paket izi qarmaqarışıq olur.

Tək bir host eyni IP-də, eyni anda minlərlə TCP və UDP portu açıq saxlaya bilər, çünki hər biri ayrı kernel məlumat strukturudur. TCP və UDP-nin həmçinin **müstəqil** port məkanları var — TCP/53 və UDP/53 nömrəni paylaşan fərqli portlardır və DNS hər ikisini istifadə edir.

## Üç port diapazonu

IANA 65,536 nömrəni üç zonaya bölür. Bölgü qismən əməliyyat sistemləri tərəfindən, qismən də konvensiya ilə tətbiq olunur.

| Diapazon | Ad | Kim seçir | Qeydlər |
|---|---|---|---|
| `0 – 1023` | Məşhur / sistem | IANA | Linux-da bağlama root tələb edir, Windows-da Administrator. Kanonik xidmətlər üçün ayrılıb (HTTP, SSH, DNS və s.). |
| `1024 – 49151` | Qeydiyyatdan keçmiş / istifadəçi | Tətbiqin müraciəti ilə IANA | Vendorlar burada qeydiyyatdan keçirlər (3306 MySQL, 5432 PostgreSQL, 3389 RDP). Bağlamaq üçün xüsusi imtiyaz yoxdur. |
| `49152 – 65535` | Dinamik / müvəqqəti | Yerli kernel | Çıxan müştəri qoşulmaları üçün mənbə portları. Avtomatik ayrılır və yenidən istifadə olunur. |

1024-dən aşağı imtiyazlı port qaydası Unix ənənəsidir: yalnız root orada `bind()` edə bilər. Niyyət "etibarlı" xidmətlərin root kimi işləməsi və beləliklə də adi istifadəçinin port 25-də saxta daemon başladıb onların yerini ala bilməməsi idi. Müasir sistemlər bunu bir az zəiflədir — `setcap CAP_NET_BIND_SERVICE` root olmayan binarın aşağı port bağlamasına imkan verir, və Windows-un standart olaraq ekvivalent məhdudiyyəti yoxdur — amma konvensiya hələ də standartların hansı portlarda yaşadığını formalaşdırır.

**Müvəqqəti diapazon** — kernelinizin çıxan qoşulma açdığınızda verdiyidir. Linux standart olaraq `32768–60999` istifadə edir (`/proc/sys/net/ipv4/ip_local_port_range`-də konfiqurasiya olunur); Windows standart olaraq `49152–65535` istifadə edir. Minlərlə daxili müştərini tərcümə edən NAT şlüzü də bu hovuzdan seçir, ona görə də tükənə bilərsiniz — problemləri həll etmə bölməsinə baxın.

## Hər analitikın bilməli olduğu 30 port

Bunları əzbərləyin. "Lazım olduqda axtarın" deyil — *əzbərləyin*. Karyeranızın qalan hissəsində oxuyacağınız hər PCAP, hər firewall qaydası, hər `nmap` hesabatı və hər pozulma hesabatı bu nömrələri fon lüğəti kimi istifadə edir.

| Port | Proto | Xidmət | Niyə vacibdir | Təhlükəsizlik qeydi |
|---|---|---|---|---|
| 20 / 21 | TCP | FTP məlumat / nəzarət | Köhnə fayl ötürmə | Açıq mətn etimadnamələri və məlumatlar. SFTP və ya FTPS ilə dəyişdirin. |
| 22 | TCP | SSH / SCP / SFTP | Hər yerdə uzaqdan inzibatçılıq | Brute-force hədəfi — açar, fail2ban, səs azaltmaq üçün standart olmayan port istifadə edin. |
| 23 | TCP | Telnet | Açıq mətn uzaq qabıq | Heç vaxt ifşa etməyin. Açıq tapmaq özlüyündə bir hadisədir. |
| 25 | TCP | SMTP | Server-server poçt | Açıq autentifikasiya olduqda spam reley üçün tez-tez sui-istifadə olunur. |
| 53 | TCP/UDP | DNS | Ad həlli | Sorğular üçün UDP, böyük/AXFR üçün TCP. Tunelləmə və exfiltrasiya favoritidir. |
| 67 / 68 | UDP | DHCP server / müştəri | DORA ünvan təyini | Saxta DHCP server klassik LAN hücumudur. |
| 69 | UDP | TFTP | Şəbəkə yükləmə, konfiq ehtiyat | Autentifikasiya yox, şifrələmə yox. Yalnız şəbəkə daxili. |
| 80 | TCP | HTTP | Sadə veb | 443-ə yönləndirilməlidir. Açıq mətn sessiyaları və kukilər. |
| 88 | TCP/UDP | Kerberos | Windows / AD autentifikasiyası | Kerberoasting, AS-REP roasting hücumları burada işləyir. |
| 110 | TCP | POP3 | Poçt alma, köhnə | Açıq mətn. POP3S 995 istifadə edin. |
| 123 | UDP | NTP | Vaxt sinxronizasiyası | Kerberos, qeydlər, sertifikat etibarlılığı üçün kritikdir. NTP gücləndirmə DDoS. |
| 137 / 138 / 139 | UDP/TCP | NetBIOS ad / dataqram / sessiya | Köhnə Windows fayl/ad xidməti | Müasir şəbəkələrdə deaktiv edin. NBT-NS zəhərlənməsi (Responder). |
| 143 | TCP | IMAP | Poçt alma, müasir | Açıq mətn. IMAPS 993 istifadə edin. |
| 161 / 162 | UDP | SNMP / SNMP trap | Şəbəkə cihaz monitorinqi | v1/v2 açıq mətn icma sətirlərini istifadə edir — v3-ə keçin. |
| 389 | TCP/UDP | LDAP | Kataloq axtarışları | Açıq mətn bağlamalar parolları sızdırır. LDAPS və ya StartTLS istifadə edin. |
| 443 | TCP | HTTPS | TLS üzərində veb | Standart. C2 favoriti — qarışıq olur. |
| 445 | TCP | SMB / CIFS | Windows fayl paylaşımı | Ransomware magistral yolu (EternalBlue, lateral hərəkət). Heç vaxt İnternetə ifşa etməyin. |
| 465 / 587 | TCP | SMTPS / submission | Autentifikasiyalı poçt göndərmə | STARTTLS ilə 587 müasirdir; 465 implisit-TLS-in yenidən canlanmasıdır. |
| 500 | UDP | IKE | IPsec VPN açar mübadiləsi | Plus NAT-T üçün UDP 4500. |
| 514 | UDP | Syslog | Qeyd göndərmə | Açıq mətn, autentifikasiya yox — həssas qeydlər üçün TLS-syslog (TCP 6514) istifadə edin. |
| 636 | TCP | LDAPS | TLS üzərində LDAP | Parol bağlamaları üçün 389-u əvəz edir. |
| 993 | TCP | IMAPS | Təhlükəsiz IMAP | İmplisit TLS. |
| 995 | TCP | POP3S | Təhlükəsiz POP3 | İmplisit TLS. |
| 1433 | TCP | MSSQL | Microsoft SQL Server | İnternetə açıq MSSQL pozulma yaxındır deməkdir. |
| 1521 | TCP | Oracle DB | Oracle TNS dinləyicisi | Eyni — heç vaxt xaricdən ifşa etməyin. |
| 3306 | TCP | MySQL / MariaDB | Açıq mənbə SQL | Autentifikasiya bypass və zəif etimadnamə ifşaları yaygındır. |
| 3389 | TCP | RDP | Windows Remote Desktop | İnternetdə ən çox hücum edilən tək port. Yalnız NLA + MFA + VPN. |
| 5432 | TCP | PostgreSQL | Açıq mənbə SQL | `pg_hba.conf` və firewall vasitəsilə məhdudlaşdırın. |
| 5985 / 5986 | TCP | WinRM / WinRM-HTTPS | PowerShell remoting | Lateral hərəkət vektoru — yalnız Kerberos, mənbəni məhdudlaşdırın. |
| 8080 / 8443 | TCP | HTTP-alt / HTTPS-alt | Proksilər, admin UI-lər, dev serverləri | "Unudulmuş test instansiyası" namizədi — öz mülklərinizi bunlar üçün skan edin. |

Faydalı bir neçə vərdiş:

- **Sizin qoymadığınız 1024-dən yuxarı** hər şeyi şübhəli hesab edin — bir çox arxa qapılar diqqətsiz görünmək üçün xüsusilə yüksək portlarda otururlar.
- **Tanımadığınız** nömrə birinci araşdırılmalı olandır. Tanış portlar nadir hallarda təəccübləndirir; sürprizlər bilinməyənlərdə yaşayır.
- Eyni nömrə TCP-də və UDP-də fərqli mənalar daşıya bilər. Həmişə protokolu ucadan deyin.

## Təhlükəsiz vs açıq mətn alternativləri

Köhnə protokolların əksəriyyətinin TLS-qorumalı qardaşı var. Miqrasiya nadir hallarda pulsuzdur — sertifikat, konfiq dəyişikliyi, çox vaxt müştəri kitabxana yeniləməsi tələb edir — amma müasir şəbəkədə açıq mətn versiyası işləməməlidir.

| Köhnə / açıq mətn | Port | Təhlükəsiz əvəz | Port | Qeydlər |
|---|---|---|---|---|
| Telnet | 23 | SSH | 22 | Telnet heç bir istehsal şəbəkəsində mövcud olmamalıdır. |
| FTP | 21 | SFTP (SSH üzərindən) | 22 | Və ya FTPS — 990-da implisit TLS, `AUTH TLS` ilə 21-də explisit. |
| HTTP | 80 | HTTPS | 443 | 80 yalnız 443-ə 301 yönləndirməlidir. |
| SMTP (açıq mətn) | 25 | SMTP submission + STARTTLS | 587 | Plus 465-də implisit-TLS SMTPS. |
| POP3 | 110 | POP3S | 995 | İmplisit TLS. |
| IMAP | 143 | IMAPS | 993 | İmplisit TLS. |
| LDAP | 389 | LDAPS | 636 | Və ya 389-da LDAP+StartTLS. AD kanal bağlamasını tətbiq edir. |
| SNMP v1 / v2c | 161 | SNMPv3 | 161 | Eyni port, lakin auth + priv ilə. v1/v2c icma sətirləri açıq mətn parollardır. |
| Syslog (UDP) | 514 | TLS üzərində Syslog | 6514 | TCP + TLS qeydləri ötürülmə zamanı saxlayır və qoruyur. |
| HTTP əsaslı WinRM | 5985 | WinRM-HTTPS | 5986 | Domen mühitlərində həmişə TLS variantını üstün tutun. |
| RDP (RDP Security Layer) | 3389 | NLA + TLS ilə RDP | 3389 | Eyni port; Network Level Authentication tələb edin. |
| TFTP | 69 | SFTP / SCP | 22 | TFTP yalnız etibarlı boot/idarəetmə VLAN-larında. |

Nümunə ardıcıldır: şübhə olduqda, təhlükəsiz variant ya fərqli məşhur portda işləyir (POP3S 995, IMAPS 993), ya da TLS bərkidilmiş eyni portda (STARTTLS, LDAP+StartTLS). Hər iki nömrəni bilmək işin bir hissəsidir.

Dizayn konteksti üçün — mülk açıq mətn sütunundan müştəriləri sındırmadan təhlükəsiz sütuna *necə* keçir — [təhlükəsiz protokollara](../secure-design/secure-protocols.md) baxın.

## İzləməli yüksək riskli portlar

Bəzi portlar protokol pozulduğu üçün deyil, onları yanlış şəbəkəyə ifşa etmək karyeraları bitirdiyi üçün təhlükəlidir. Bunların hər birinə "yalnız VPN, heç vaxt İnternetdə deyil, hər xarici zond üçün xəbərdarlıq" kimi yanaşın:

- **TCP 445 — SMB.** EternalBlue, ransomware lateral hərəkəti, NTLM relay. Windows mağazasının sızdıra biləcəyi ən yüksək təsirli açıq port.
- **TCP 3389 — RDP.** İnternetdə ən çox brute-force edilən port. NLA ilə belə, 3389 ifşa etmək 24/7 etimadnamə doldurmasını dəvət edir. VPN və ya MFA-lı jump host arxasına qoyun.
- **TCP 1433 — MSSQL.** Açıq MSSQL pozulma yaxındır deməkdir. Standart `sa` hesabı, zəif parollar və `xp_cmdshell` onu ƏS-ə bir addımlıq pivot edir.
- **TCP 5985 — WinRM (HTTP).** Lateral hərəkət vektoru; hücum edənin etibarlı etimadnaməsi varsa, WinRM çox vaxt onun necə yayıldığıdır.
- **TCP 23 — Telnet.** Açıq mətn etimadnamələri. 2005-dən sonra qurulmuş hər hansı cihazda açıq tapmaq bir hadisədir.
- **TCP 21 — FTP.** Açıq mətn etimadnamələri və məlumatlar. Anonim FTP serverləri 2026-da hələ də bütün məlumat dəstlərini sızdırır.
- **UDP 161 — SNMPv1/v2c.** Standart icma sətirləri (`public`, `private`) hələ də İnternetə açıq cihazlarda tapılır və bir sətirlik konfiq dump-a çevrilir.
- **TCP 4444, 5555, 6666, 31337.** Qanuni xidmətlər deyil — bunlar yaygın arxa qapı / Metasploit standartlarıdır. Bunlardan birinin host-da dinlədiyini görmək güclü hadisə siqnalıdır.

Müdafiə vərdişi: bu siyahıdakı port İnternetdən əlçatandırsa, cavab "möhkəmləndirin" deyil, "əvvəlcə ifşanı silin, sonra möhkəmləndirin" olmalıdır.

## Dinləyən portları tapmaq

Bu dərsin yarısının dəyəri "bu host indi nəyi ifşa edir?" sualına bir əmrlə cavab verə bilməkdir. Bunu sahib olduğunuz hər qutuda işlədin. Hər yerləşdirmədən sonra işlədin. Kompromis şübhəsi olduqda işlədin.

### Linux

```bash
# Müasir: ss netstat üçün iproute2 əvəzidir
sudo ss -tulpn

# -t TCP, -u UDP, -l yalnız dinləyən, -p sahib prosesi göstər, -n rəqəmsal (DNS yox)
```

```bash
# Köhnə: net-tools-dan netstat, eyni bayraqlar
sudo netstat -tulpn
```

```bash
# lsof: soket başına daha çox detal, istifadəçi daxil olmaqla
sudo lsof -i -P -n | grep LISTEN
```

Hər sətir sizə protokolu, yerli IP və portu, proses adını və PID-i verir. Daha səliqəli çıxış üçün `awk` və ya `column` vasitəsilə ötürün, və port üzrə qruplaşdırmaq üçün `sort -k5`-ə ötürün. Yaygın bir nümunə:

```bash
sudo ss -tulpn | awk 'NR>1 {print $1, $5, $7}' | column -t
```

### Windows

```powershell
# Müasir PowerShell — yalnız dinləyən TCP
Get-NetTCPConnection -State Listen |
    Sort-Object LocalPort |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

```powershell
# PID-i bir əməliyyatda proses adına xəritələ
Get-NetTCPConnection -State Listen |
    ForEach-Object {
        $proc = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
        [PSCustomObject]@{
            Port    = $_.LocalPort
            Address = $_.LocalAddress
            PID     = $_.OwningProcess
            Process = $proc.ProcessName
        }
    } | Sort-Object Port | Format-Table -AutoSize
```

```powershell
# Klassik netstat — XP-dən bəri hər Windows-da işləyir
netstat -ano | findstr LISTENING
```

Son sütundakı PID `tasklist /FI "PID eq 4567"` və ya `Get-Process -Id 4567` vasitəsilə prosesə xəritələnir. PID-i prosesə **həmişə** xəritələyin — "port 4444, PID 8732" deyən sətir bunun `chrome.exe` və ya `nc.exe` olduğunu bilməyincə sizə heç nə demir.

Windows-da UDP dinləyiciləri üçün `Get-NetUDPEndpoint` istifadə edin. Qeyd edin ki, UDP-nin "vəziyyəti" yoxdur — UDP soketi ya bağlıdır, ya da yox — beləliklə, TCP-nin istifadə etdiyi LISTEN və ESTABLISHED arasındakı fərq tətbiq edilmir.

## Port skanlama əsasları

Shell girişiniz olmadıqda — uzaq host-u test etdikdə, kənardan kəşfiyyat etdikdə, firewall qaydasını yoxladıqda — şəbəkədən `nmap` ilə skan edirsiniz. Üç rejim işin 90%-ni əhatə edir:

| Bayraq | Ad | Nə edir | Nə vaxt istifadə etmək |
|---|---|---|---|
| `-sS` | SYN skan ("yarım açıq") | SYN göndərir, SYN/ACK və ya RST oxuyur, əl sıxmanı heç vaxt tamamlamır | İcazəli TCP kəşfiyyatı üçün standart. Root tələb edir. |
| `-sT` | TCP qoşulma skanı | ƏS soket API-si vasitəsilə tam üçtərəfli əl sıxma | Root ala bilmədikdə. Hədəf tərəfindən qeyd olunur. |
| `-sU` | UDP skan | Boş UDP göndərir, ICMP unreachable və ya tətbiq cavabından vəziyyəti çıxarır | UDP xidmətləri. Təbiətcə yavaş və səs-küylüdür. |

Hər port üçün çıxış üç vəziyyətdən biridir:

- **open** — hədəf təsdiqlə cavab verdi (TCP-də SYN/ACK, UDP-də tətbiq cavabı). Bir xidmət dinləyir.
- **closed** — hədəf "burada heç nə yoxdur" cavabını verdi (TCP-də RST, UDP-də ICMP port-unreachable). Host işləyir; port yox.
- **filtered** — heç bir faydalı cavab yoxdur. Firewall zondu səssizcə düşür. Açıqı qapalıdan ayırd edə bilməzsiniz.

Tək host-un tipik icazəli skanı:

```bash
sudo nmap -sS -sV -p- --reason -oA scan example.local
```

`-sV` xidmət / versiya aşkarlanması (banner toplama) edir, `-p-` bütün 65,535 TCP portu əhatə edir, `--reason` nmap-ın hər portu niyə o cür etiketlədiyini göstərir, və `-oA` sonradan analiz üçün nmap, gnmap və XML çıxışı yazır.

**Qanunilik və icazə.** Sahib olmadığınız və test etmək üçün icazə verilməmiş host-u port skanlamaq əksər yurisdiksiyalarda qanunsuzdur — Birləşmiş Krallıq Kompüter Sui-istifadə Aktı, ABŞ CFAA, Azərbaycan Cinayət Məcəlləsinin 271-273-cü maddələri və AB NIS2 çərçivələri skanlamaya çatır. "Sadəcə baxırdım" müdafiə deyil. Sizinki olmayan heç bir şeyi skanlamadan əvvəl yazılı icazə alın. Lab şəbəkələri, CTF poliqonları və açıq pen-test əhatə dairələri yeganə təhlükəsiz oyun meydançalarıdır.

## Praktiki məşğələlər

Beş məşğələ. Onları sırada edin; hər biri əvvəlkinin üzərində qurulur.

### 1. Maşınınızda dinləyən portları sadalayın

Linux-da: `sudo ss -tulpn`. Windows-da: yuxarıdakı bölmədən PowerShell parçası. Hər dinləyicini yazın — port, protokol, proses. Hər biri üçün cavablandırın: "burada nə üçün olduğunu bilirəmmi?" Bir cümlə ilə izah edə bilmədiyiniz hər şey araşdırma vəzifəsidir.

### 2. Lab host-unu nmap ilə skan edin

İzolyasiya edilmiş şəbəkədə qəsdən zəif VM (Metasploitable, DVWA, CTF qutusu) qaldırın. Onu skan edin: `sudo nmap -sS -sV -p- 10.0.0.99`. Çıxışı oxuyun. Üç açıq portu müəyyən edin və işləyən xidmət versiyasını axtarın. Birini `searchsploit` ilə müqayisə edin və açıq istismarın olub-olmadığını görün.

### 3. Gözlənilməz dinləyiciləri müəyyən edin

1-ci məşğələdən host-da terminala qəsdən `python3 -m http.server 8765` işlədin, sonra `ss -tulpn`-i yenidən işlədin. Yeni dinləyicini tapın. Portu prosesə xəritələyin. İndi həmin dinləyicini Python veb serverini işlətməyəcəyini gözləmədiyiniz host-da tapdığınızı təsəvvür edin — hadisə biletinə qoyacağınız üç cümləni yazın.

### 4. Naməlum portu axtarın

Tanımadığınız üç portu seçin: `tcp/2375`, `tcp/2483`, `udp/5353`. Hər biri üçün `/etc/services` (Linux) və ya onlayn IANA Service Name and Transport Protocol Port Number Registry-yə müraciət edin. Xidməti qeyd edin və nə etdiyi və ifşa olunmasını istəyəcəyiniz bir şey olub-olmadığı haqqında bir cümlə yazın.

### 5. Təhlükəsiz alternativləri qərar verin

Bu səkkiz köhnə xidmətin hər biri üçün müasir təhlükəsiz əvəzi və işlədiyi portu yazın: Telnet, FTP, HTTP, POP3, IMAP, LDAP, SNMPv2c, syslog. Cavablarınızı yuxarıdakı **təhlükəsiz vs açıq mətn alternativləri** cədvəli ilə yoxlayın.

## İşlənmiş nümunə — `example.local` SOC analitiki TCP 4444-də dinləyici görür

`example.local`-da rutin son nöqtə vəziyyət araşdırması. `web03.example.local`-da hər saatlıq `ss -tulpn` cron işi yeni dinləyici raport edir:

```text
tcp   LISTEN  0  128  0.0.0.0:4444  0.0.0.0:*  users:(("svchost",pid=8421,fd=3))
```

Port 4444 — Metasploit-in standart reverse-shell handler portu. Proses adı `svchost`-dur (kiçik hərflə, Linux-da — bu artıq qəribədir; `svchost.exe` Windows şeyidir). Növbətçi SOC analitiki bileti açır və yığını gəzir.

**Addım 1 — dinləyicini təsdiq edin.** `web03`-ə SSH edin, `sudo ss -tulpn | grep 4444`-i yenidən işlədin. Eyni sətir. Dinləyici realdır, köhnə hesabat deyil.

**Addım 2 — prosesi müəyyən edin.** `sudo lsof -i :4444` PID-i, binar yolunu və işlədiyi istifadəçini verir. Yol `/tmp/.X11-unix/svchost`-dur. Windows xidmət adı kimi maskalanan `/tmp`-də binar *qanuni* dev serveri deyil.

**Addım 3 — binarı yoxlayın.** `file /tmp/.X11-unix/svchost` `ELF 64-bit LSB executable, x86-64, statically linked` göstərir. Onu `sha256sum` edin, heşi təhlükə-kəşfiyyatı axtarışına göndərin. Tapıldı: tanınan Meterpreter yükü.

**Addım 4 — valideyni tapın.** `ps -ef | grep 8421` valideyn PID-ini göstərir; ağacı yuxarı izləyin. Valideyn `apache2` işçisi olur — yəni veb server implantı yaratdı. Bu kod icrası əldə edən veb tətbiq zəifliyinə işarə edir; implant ikinci mərhələdir.

**Addım 5 — tutun.** `web03`-ü yük balanslayıcısından çəkin, məhkəmə ekspertizası üçün diski snapshot edin, dinləyicini öldürün (`kill -9 8421`), araşdırma gözlərkən host-dan çıxan qoşulmaları bloklayın. P1 hadisəsi açın — bu səhv konfiqurasiya edilmiş dev serveri deyil; bu canlı dayağdır.

**Əksinə hal.** Binar `/usr/bin/python3` olsaydı, geliştiricinin istifadəçisi kimi işləsəydi və valideyn screen sessiyası olsaydı, bu dərsliyi sınayan junior dev olardı. Düzəliş "prod host-larında Metasploit işlətməyin"-dir, P1 deyil.

Ayırıcı yalnız port nömrəsi deyildi — 4444 göstərici, lakin qəti deyil. **Port plus proses plus valideyn plus binar yolu** idi. Portlar çəkdiyiniz iplikdir; araşdırmanın qalanı digər ucundadır.

## Problemləri həll etmə və tələlər

**Port toqquşmaları — iki xidmət eyni portu istəyir.** Verilmiş IP-də bir anda yalnız bir proses TCP portunu bağlaya bilər. İkincisi `EADDRINUSE` ("Address already in use") ilə uğursuz olur. Tutucunu `ss -tulpn | grep :8080` ilə tapın və ya dayandırın, portunu dəyişin və ya fərqli IP-yə bağlayın. Fərqli IP-lərdə eyni port nömrəsi (`127.0.0.1:8080` vs `0.0.0.0:8080`) bəzən icazə verilir, bəzən yox — ƏS və `SO_REUSEADDR`-dən asılıdır.

**NAT şlüzündə müvəqqəti port tükənməsi.** Minlərlə müştərini tərcümə edən NAT cihazı hər çıxan qoşulma üçün müvəqqəti hovuzdan mənbə portu seçir. Linux-un standart hər ictimai IP üçün `~28,000` portu ilə, məşğul şlüz tükənə bilər — müştərilər təsadüfi qoşulma uğursuzluqları görür, şlüz isə `nf_conntrack: table full` və ya `bind: cannot assign requested address` qeyd edir. Düzəlişlər: ictimai IP-lər əlavə edin (hər biri yeni müvəqqəti hovuz əlavə edir), `ip_local_port_range`-i genişləndirin, portların daha sürətli yenidən istifadə olunması üçün `tcp_fin_timeout`-u azaldın və ya hədəf üzrə NAT-a keçin.

**Privilegiya düşürməsi olmayan məşhur port.** Daemon port 80-i root kimi bağlayır, sonra privilegiyaları düşürməyi unudur. İndi bütün veb server root kimi işləyir və hər kod-icra səhvi root kod icrasına çevrilir. Unix idiomu "aşağı bağla, sonra xidmət hesabına `setuid()`"-dur. systemd-də `AmbientCapabilities=CAP_NET_BIND_SERVICE`-i üstün tutun və xidməti əvvəldən root olmayan istifadəçi kimi işlədin.

**IPv4 yoxlamalarından gizli IPv6-yalnız dinləyicilər.** `::1`-ə bağlı xidmət `ss -tlnp`-də yalnız hər iki ailə üçün soruşduqda (`-6`) və ya düzgün baxışı istifadə etdikdə görünür. `netstat -an4` onu göstərməyəcək. Həmişə hər iki yığını yoxlayın: `ss -tulpn` (standart hər ikisini göstərir) və ya açıq şəkildə `ss -tulpn -4` və `ss -tulpn -6`. Əməliyyat komandanızın yalnız v4-ü yoxladığını görmüş hücum edən arxa qapısını üstünlüklə v6-ya qoyacaq.

**Firewall vs port vəziyyəti qarışıqlığı.** Nmap-dan `filtered` nəticəsi portun bağlı olması demək deyil — firewall zondu yedi deməkdir. Host üzərində etimadnaməli dinləyici yoxlaması da işlədin; orta-qutular olduqda şəbəkənin gördüyü və host-un əslində ifşa etdiyi fərqli ola bilər.

**TCP və UDP müstəqildir.** TCP/53-ü bağlamaq UDP/53-ü bağlamır. Hər ikisini audit edin, xüsusilə DNS, NTP, SNMP və Kerberos üçün — onlar normal trafik üçün bir nəqliyyat və kənar hallar üçün digərini istifadə edir.

## Əsas nəticələr

- Port ƏS-in seqmentləri düzgün prosesə çatdırmaq üçün istifadə etdiyi 16 bitlik etiketdir. 5 elementli kortej axını unikal şəkildə müəyyən edir.
- Üç diapazon: məşhur `0–1023`, qeydiyyatdan keçmiş `1024–49151`, müvəqqəti `49152–65535`. Mənbə portları demək olar ki, həmişə müvəqqətidir.
- Yuxarıdakı cədvəldə otuz port lüğətdir — onları əzbərləyin, axtarmayın.
- Hər açıq mətn köhnə protokolun TLS-qorumalı qardaşı var. Müasir şəbəkədə açıq mətn olanı işləməməlidir.
- Yüksək riskli portlar (445, 3389, 1433, 5985, 23, 21, SNMPv1, 4444) "heç vaxt İnternetdə deyil" siyahısına aiddir.
- `ss -tulpn` və `Get-NetTCPConnection -State Listen` yaşamalı olduğunuz iki əmrdir. Onları tez-tez işlədin.
- `nmap -sS / -sT / -sU` icazəli kəşfiyyatın çoxunu əhatə edir. Həmişə open / closed / filtered düzgün şərh edin. Həmişə yazılı icazəniz olsun.
- Tək nömrə göstəricidir, hökm deyil — hadisə və ya günahsızlıq elan etmədən əvvəl prosesi, valideyni, binar yolunu və istifadəçini araşdırın.

## İstinadlar

- IANA Service Name and Transport Protocol Port Number Registry: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
- RFC 6335 — IANA Procedures for Port and Service Name Assignment: https://www.rfc-editor.org/rfc/rfc6335
- RFC 9293 — Transmission Control Protocol: https://www.rfc-editor.org/rfc/rfc9293
- RFC 768 — User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768
- Nmap Reference Guide: https://nmap.org/book/man.html
- Nmap port-scanning techniques: https://nmap.org/book/man-port-scanning-techniques.html
- Microsoft — Service overview and network port requirements for Windows: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/service-overview-and-network-port-requirements
- Linux `ss(8)` manual: https://man7.org/linux/man-pages/man8/ss.8.html
- SANS — Top ports list and common service mappings: https://www.sans.org/blog/
