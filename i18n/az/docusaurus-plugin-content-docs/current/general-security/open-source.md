---
id: open-source
title: Açıq Mənbə Təhlükəsizlik Həlləri (Ümumi Baxış)
description: Həll növünə görə kateqoriyalaşdırılmış əsas açıq mənbə alətlərin siyahısı (gizlənə bilən bölmələrlə).
slug: /general-security/open-source
difficulty: foundation
---

## 🧩 Açıq Mənbə Təhlükəsizlik Həlləri

Bu sənəd aşağı büdcə ilə güclü və etibarlı İT infrastrukturu qurmaq istəyənlər üçün praktik və sınaqdan keçmiş açıq mənbə alətləri təqdim edir. 
Hər həll kateqoriyası alətlərin siyahısını, üstünlüklərini, çatışmazlıqlarını və rəsmi linkləri ehtiva edir.


---

<details>
<summary>📦 İT Aktivlərinin İdarə Edilməsi</summary>

Avadanlıq, proqram təminatı, lisenziyalar və infrastruktur aktivlərini izləmək üçün alətlər.

### 🥇 1. **GLPI**
> Əhatəli İT aktiv və xidmət idarəetmə platforması.

- ✅ **Üstünlüklər**:
  - Tam ITIL dəstəyi (İnsident, Dəyişiklik, Problem idarəetməsi)
  - Pluginlərlə genişlənə bilir (LDAP, monitorinq, inventar agentləri)
  - Daxili tiket sistemi və CMDB mövcuddur
- ❌ **Çatışmazlıqlar**:
  - İstifadəçi interfeysi bir qədər köhnə görünə bilər
  - İlkin quraşdırma çətin ola bilər
- 🔗 [https://glpi-project.org](https://glpi-project.org)

---

### 🥈 2. **Snipe-IT**
> Yüngül və istifadəçi dostu inventar idarəetmə aləti.

- ✅ **Üstünlüklər**:
  - Müasir və intuitiv interfeys
  - Aktivlərin, lisenziyaların, təhvil-təslimin izlənməsi
  - Kiçik İT komandaları üçün idealdır
- ❌ **Çatışmazlıqlar**:
  - Daxili CMDB funksionallığı yoxdur
  - GLPI ilə müqayisədə məhdud inteqrasiyalar
- 🔗 [https://snipeitapp.com](https://snipeitapp.com)  
  [GitHub Repo](https://github.com/snipe/snipe-it)

---

### 🥉 3. **NetBox**
> Şəbəkələr, rack-lar və IP sahəsinin idarə olunması üçün DCIM vasitəsi.

- ✅ **Üstünlüklər**:
  - Data mərkəzi və şəbəkə infrastrukturunun xəritələndirilməsi üçün idealdır
  - Avtomatlaşdırma üçün güclü REST API
  - IP-lər, VLAN-lar, rack-lar və kabellərin izlənməsi
- ❌ **Çatışmazlıqlar**:
  - Noutbuklar kimi son istifadəçi cihazlarının izlənməsi üçün nəzərdə tutulmayıb
  - Ənənəvi İT-dən çox DevOps/NOC komandalarına uyğundur
- 🔗 [https://netbox.dev](https://netbox.dev)  
  [GitHub Repo](https://github.com/netbox-community/netbox)

</details>

---

<details>
<summary>📡 Şəbəkə Təhlükəsizliyi</summary>

Şəbəkə infrastrukturunu izləmək, filtrləmək və qorumaq üçün alətlər.

### 🥇 1. **OPNsense / pfSense**
> Korporativ səviyyəli funksiyalara malik açıq mənbə firewall və marşrutlaşdırıcı platformaları.

- ✅ **Üstünlüklər**:
  - Tam funksional firewall, IDS/IPS (Suricata), VPN, DHCP, DNS
  - Veb əsaslı idarəetmə paneli, istifadəsi asandır
  - Plugin ekosistemi (ntopng, HAProxy, Sensei və s.)
- ❌ **Çatışmazlıqlar**:
  - Ayrı hardware və ya VM tələb edir
  - Çox kiçik mühitlər üçün artıq ola bilər
- 🔗 [https://opnsense.org](https://opnsense.org)  
  [https://www.pfsense.org](https://www.pfsense.org)

---

### 🥈 2. **Suricata**
> Dərin paket yoxlaması ilə güclü və sürətli IDS/IPS mühərriki.

- ✅ **Üstünlüklər**:
  - Real vaxtda hücum aşkarlanması və qarşısının alınması
  - İmza və anomaliya əsaslı analiz
  - Müstəqil işləyə və ya digər platformalara inteqrasiya oluna bilər (məsələn, OPNsense)
- ❌ **Çatışmazlıqlar**:
  - Əsasən CLI ilə idarə olunur, konfiqurasiya tələb edir
  - Çox sayda loq yaradır – əlavə loq menecmenti tələb edir
- 🔗 [https://suricata.io](https://suricata.io)

---

### 🥉 3. **Zeek (əvvəllər Bro)**
> Qabaqcıl şəbəkə trafik analiz çərçivəsi.

- ✅ **Üstünlüklər**:
  - Protokol səviyyəsində loqlaşdırma və forensik təhlil üçün əladır
  - Akademik və SOC mühitlərində geniş istifadə olunur
  - Ssenari əsaslı genişləndirmə imkanı
- ❌ **Çatışmazlıqlar**:
  - Öyrənməsi çətindir
  - Tam funksional firewall və ya IPS deyil
- 🔗 [https://zeek.org](https://zeek.org)

---

### 🏅 4. **Snort**
> Ən köhnə və populyar şəbəkə əsaslı IDS/IPS sistemlərindən biri.

- ✅ **Üstünlüklər**:
  - Cisco Talos tərəfindən dəstəklənən geniş qayda bazası
  - IDS və ya inline IPS rejimində işləyə bilər
  - Geniş icma dəstəyi və inteqrasiya imkanları
- ❌ **Çatışmazlıqlar**:
  - Multithreading baxımından Suricata qədər güclü deyil
  - Konfiqurasiya və qayda idarəetməsi üçün əlavə səy tələb olunur
- 🔗 [https://www.snort.org](https://www.snort.org)

</details>

---

<details>
<summary>🔐 Son Nöqtə Təhlükəsizliyi (EDR / Antivirus)</summary>

Windows və Linux sistemlərində son nöqtə təhdidlərini izləmək, aşkarlamaq və cavablandırmaq üçün vasitələr.

### 🥇 1. **Wazuh**
> Son nöqtə təhlükəsizliyi və uyğunluq üçün açıq mənbə XDR və SIEM agenti.

- ✅ **Üstünlüklər**:
  - Real vaxtda loq toplanması və anomaliya aşkarlanması
  - Fayl bütövlüyünün izlənməsi (FIM), rootkit aşkarlanması və zəiflik analizi
  - Windows, Linux və macOS sistemləri ilə işləyir
- ❌ **Çatışmazlıqlar**:
  - Tam yığın quraşdırması çətindir (ELK backend istifadə edir)
  - Səs-küyü azaltmaq üçün incə tənzimləmə lazımdır
- 🔗 [https://wazuh.com](https://wazuh.com)

---

### 🥈 2. **OSSEC+**
> Maşın öyrənməsi və threat intelligence ilə təkmilləşdirilmiş OSSEC versiyası.

- ✅ **Üstünlüklər**:
  - ML mühərriki, PKI şifrələmə, ELK inteqrasiyası
  - Real vaxtlı təhdid paylaşımı
  - FIM, zərərli proqram aşkarlanması, aktiv cavab və uyğunluq auditi
- ❌ **Çatışmazlıqlar**:
  - Xüsusiyyətlərə giriş üçün qeydiyyat tələb olunur
  - Wazuh qədər geniş icma dəstəyi yoxdur
- 🔗 [https://www.atomicorp.com/products/ossec/](https://www.atomicorp.com/products/ossec/)

---

### 🥉 3. **OSSEC**
> Yüngül, host əsaslı hücum aşkarlama sistemi (HIDS).

- ✅ **Üstünlüklər**:
  - Fayl bütövlüyünün yoxlanması, loq analizi, rootkit aşkarlanması
  - Linux, Windows, BSD sistemlərində işləyir
  - Çox yüngül və sabitdir
- ❌ **Çatışmazlıqlar**:
  - Quraşdırılmış veb interfeysi yoxdur
  - Təhdid paylaşımı və ML funksiyaları yoxdur
- 🔗 [https://www.ossec.net](https://www.ossec.net)

</details>


---


<details>
<summary>📊 SIEM və Loq İdarəetməsi</summary>

Loqların toplanması, analizi və təhlükəsizlik/uyğunluq məqsədilə cavablandırılması üçün həllər.

### 🥇 1. **ELK Yığını (Elasticsearch, Logstash, Kibana)**
> Mərkəzləşdirilmiş loq idarəetməsi və SIEM üçün sənaye standartı olan açıq mənbə yığım.

- ✅ **Üstünlüklər**:
  - Güclü axtarış, filtr və vizuallaşdırma imkanları (Kibana)
  - Logstash və Beats ilə çevik loq toplama və emal
  - Təhlükəsizlik əməliyyat mərkəzlərində (SOC) geniş istifadə olunur
- ❌ **Çatışmazlıqlar**:
  - Resurs tələbkardır (rahat işləməsi üçün 8GB+ RAM lazımdır)
  - Böyük loq həcmləri üçün tənzimləmə və miqyaslama tələb edir
- 🔗 [https://www.elastic.co/what-is/elk-stack](https://www.elastic.co/what-is/elk-stack)

---

### 🥈 2. **Wazuh**
> ELK yığını əsasında qurulmuş açıq mənbə XDR və SIEM platforması.

- ✅ **Üstünlüklər**:
  - Mərkəzləşdirilmiş loq toplanması, analizi və xəbərdarlıqlar
  - Hazır tablolardan, qaydalardan və təhlükə aşkarlanmasından ibarətdir
  - Endpoint monitorinqi ilə SIEM funksionallığını birləşdirir
- ❌ **Çatışmazlıqlar**:
  - Elasticsearch backend tələb edir (resurs baxımından ağır)
  - Qayda tənzimləməsi və yalnış pozitivlərlə işləmə tələb edir
- 🔗 [https://wazuh.com](https://wazuh.com)

---

### 🥉 3. **OSSEC+**
> ELK, maşın öyrənməsi və təhdid paylaşımı ilə təkmilləşdirilmiş OSSEC versiyası.

- ✅ **Üstünlüklər**:
  - Anomaliya aşkarlanması üçün ML (maşın öyrənməsi)
  - Real vaxtlı təhlükə paylaşımı
  - ELK yığını, PKI şifrələmə və FIM daxildir
- ❌ **Çatışmazlıqlar**:
  - OSSEC+ xüsusiyyətlərinə çıxış üçün qeydiyyat tələb olunur
  - Wazuh və ya ELK qədər geniş icması yoxdur
- 🔗 [https://www.atomicorp.com/products/ossec/](https://www.atomicorp.com/products/ossec/)

</details>


---
<details>
<summary>📩 E-poçt Təhlükəsizliyi Gateway</summary>

Spam, phishing və zərərli proqramlara qarşı daxil olan/çıxan e-poçt trafikini qorumaq üçün həllər.

### 🥇 1. **Rspamd**
> Yüksək performanslı spam filtrləmə sistemi, e-poçt gateway kimi istifadə oluna bilər.

- ✅ **Üstünlüklər**:
  - Sürətli və yüngül (C dili ilə yazılıb, asinxron işləyir)
  - DNSBL, SPF, DKIM, DMARC, fuzzy uyğunluq dəstəyi
  - Veb interfeysi və Redis dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Xarici MTA inteqrasiyası tələb edir (məsələn, Postfix)
  - Genişləndirilmiş konfiqurasiya mürəkkəb ola bilər
- 🔗 [https://rspamd.com](https://rspamd.com)

---

### 🥈 2. **Mailcow**
> Spam və virus əleyhinə funksiyalarla tam e-poçt server paketi. Postfix, Dovecot, Rspamd və ClamAV dəstəyi mövcuddur.

- ✅ **Üstünlüklər**:
  - Hər şey daxil mail server + təhlükəsizlik yığını
  - Docker əsaslı, asan yerləşdirmə
  - Veb interfeys, Let's Encrypt, 2FA dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Sadəcə gateway deyil, tam mail serverdir
  - Ayrı alətlərə nisbətən daha ağırdır
- 🔗 [https://mailcow.email](https://mailcow.email)

---

### 🥉 3. **Proxmox Mail Gateway**
> Korporativ səviyyəli e-poçt təhlükəsizliyi cihazı (açıq mənbə versiyası mövcuddur).

- ✅ **Üstünlüklər**:
  - Güclü veb interfeys (GUI)
  - SpamAssassin və ClamAV inteqrasiyası
  - Qayda əsaslı filtrləmə və karantin funksiyası
- ❌ **Çatışmazlıqlar**:
  - Açıq mənbə versiyası bəzi kommersiya funksiyalarını əhatə etmir
  - Ayrı SMTP infrastrukturuna ehtiyac var
- 🔗 [https://www.proxmox.com/en/proxmox-mail-gateway](https://www.proxmox.com/en/proxmox-mail-gateway)

</details>

---

<details>
<summary>📈 Monitorinq və Xəbərdarlıq</summary>

İnfrastrukturun monitorinqi, sistem sağlamlığının təhlili və real vaxt xəbərdarlıqları üçün ən yaxşı açıq mənbə vasitələr.

### 🥇 1. **Zabbix**
> Korporativ səviyyəli tam monitorinq platforması.

- ✅ **Üstünlüklər**:
  - Serverlər, şəbəkə cihazları, VM-lər və xidmətlərin monitorinqi
  - SNMP, traps, agent və agentsiz monitorinq dəstəyi
  - Qarmaşıq xəbərdarlıq qaydaları və eskalasiya funksiyaları
- ❌ **Çatışmazlıqlar**:
  - İlkin quraşdırma və konfiqurasiya mürəkkəbdir
  - UI daha müasir alətlərlə müqayisədə köhnəlmiş görünə bilər
- 🔗 [https://www.zabbix.com](https://www.zabbix.com)

---

### 🥈 2. **Prometheus + Grafana**
> Bulud-native metrik əsaslı monitorinq, zəngin dashboard və xəbərdarlıqlar.

- ✅ **Üstünlüklər**:
  - Güclü PromQL sorğu dili
  - Grafana ilə fərdi dashboardlar yaratmaq
  - Alertmanager ilə çevik bildirişlər
- ❌ **Çatışmazlıqlar**:
  - Yalnız zaman seriyalı metriklərə fokuslanıb (loq yoxdur)
  - Prometheus arxitekturasını başa düşmək tələb olunur
- 🔗 [https://prometheus.io](https://prometheus.io)  
  [https://grafana.com](https://grafana.com)

---

### 🥉 3. **Uptime Kuma**
> Sadə, öz host edilə bilən uptime monitorinq aləti və xəbərdarlıqlar.

- ✅ **Üstünlüklər**:
  - Asan quraşdırma (Docker və ya standalone)
  - Telegram, Slack, Discord, Email və s. bildirişlər
  - HTTP(s), TCP, DNS, Ping (ICMP) dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Yalnız əlçatanlığı yoxlayır, sistem metrikləri yoxdur
  - Zabbix/Prometheus ilə müqayisədə məhdud inteqrasiyalar
- 🔗 [https://github.com/louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)

</details>


---


<details>
<summary>🔐 Şifrə İdarəetməsi</summary>

Şifrələrin, API açarlarının və gizli məlumatların təhlükəsiz saxlanması və idarə olunması üçün açıq mənbə vasitələr — fərdi və təşkilati istifadə üçün host edilə bilən həllər.

### 🥇 1. **Vaultwarden** (Bitwarden ilə uyğun)
> Rəsmi Bitwarden müştəriləri ilə uyğun olan yüngül, öz host edilə bilən şifrə serveri.

- ✅ **Üstünlüklər**:
  - Brauzer/mobil tətbiqləri, təşkilatlar, vault-ları dəstəkləyir
  - Minimum resurs istifadəsi, Docker ilə quraşdırılır
  - 2FA, TOTP, admin paneli, istifadəçi/qrup dəstəyi
- ❌ **Çatışmazlıqlar**:
  - İcma tərəfindən idarə olunur, rəsmi dəstək yoxdur
  - Bitwarden-in bəzi premium funksiyaları yoxdur
- 🔗 [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

---

### 🥈 2. **Passbolt**
> Əməkdaşlıq və paylaşım üçün qurulmuş GPG əsaslı komandalar üçün şifrə meneceri.

- ✅ **Üstünlüklər**:
  - Komanda əsaslı istifadə üçün nəzərdə tutulub
  - Təhlükəsiz GPG şifrələmə
  - Brauzer uzantısı, istifadəçi/qrup rolları, audit jurnalları
- ❌ **Çatışmazlıqlar**:
  - Quraşdırma mürəkkəbdir (PHP + GPG + MySQL)
  - Mobil və offline giriş hələ məhduddur
- 🔗 [https://www.passbolt.com](https://www.passbolt.com)

---

### 🥉 3. **Psono**
> Güclü API dəstəyi və şifrələmə ilə korporativ səviyyəli şifrə meneceri.

- ✅ **Üstünlüklər**:
  - Çoxistifadəçi, çoxtenantlı, şifrəli paylaşım
  - LDAP, REST API, Docker əsaslı yerləşdirmə
  - Fayl sirrləri və giriş nəzarəti dəstəyi
- ❌ **Çatışmazlıqlar**:
  - İstifadəçi interfeysi digər alətlərlə müqayisədə daha az intuitivdir
  - Korporativ funksiyalar üçün lisenziya tələb oluna bilər
- 🔗 [https://psono.com](https://psono.com)

</details>

---

<details>
<summary>🛡️ Zəifliklərin İdarə Olunması və Skanlanması</summary>

İnfrastruktur, son nöqtələr və veb tətbiqlərdəki zəiflikləri aşkarlamaq, qiymətləndirmək və idarə etmək üçün vasitələr.

---

### 🥇 1. **OpenVAS / Greenbone Community Edition**
> Greenbone tərəfindən dəstəklənən ən tam açıq mənbə zəiflik skanerlərindən biri.

- ✅ **Üstünlüklər**:
  - 100K+ zəiflik testlərini ehtiva edən böyük test bazası
  - Tam infrastruktur skanlaması (serverlər, routerlər, şəbəkə cihazları)
  - Veb əsaslı dashboard (GVM), rol əsaslı giriş nəzarəti
  - Mütəmadi yenilənmələr və skan siyasətlərinin fərdiləşdirilməsi
- ❌ **Çatışmazlıqlar**:
  - Quraşdırması mürəkkəbdir, xüsusilə Debian olmayan sistemlərdə
  - Yaxşı hardware resursları tələb edir
  - Veb tətbiq skanlaması məhduddur
- 🔗 [https://www.greenbone.net/en/community-edition](https://www.greenbone.net/en/community-edition)

---

### 🥈 2. **Nessus Essentials**
> Tenable tərəfindən hazırlanmış populyar zəiflik skaneri — 16 IP-yə qədər pulsuz.

- ✅ **Üstünlüklər**:
  - İntuitiv GUI və istifadəsi asandır
  - Plugin yenilənmələri (CVE, CVSS, risk balları)
  - Çoxsaylı skan şablonları (xarici, veb, uyğunluq və s.)
  - Kiçik mühitlər və təlim laboratoriyaları üçün idealdır
- ❌ **Çatışmazlıqlar**:
  - Tam açıq mənbə deyil (qapalı kodlu pulsuz versiyadır)
  - Essentials versiyasından istifadə üçün qeydiyyat tələb olunur
- 🔗 [https://www.tenable.com/products/nessus/nessus-essentials](https://www.tenable.com/products/nessus/nessus-essentials)

---

### 🥉 3. **Faraday Community Edition**
> Çoxsaylı skanerlərin nəticələrini toplayan zəiflik idarəetmə platforması.

- ✅ **Üstünlüklər**:
  - OpenVAS, Nmap, Burp, Nikto və s. nəticələri mərkəzləşdirir
  - Risk əsaslı dashboard-lar və tagging sistemi
  - Tapıntıların izlənməsi və düzəldilməsi üçün komandalar üçün uyğundur
- ❌ **Çatışmazlıqlar**:
  - Community versiyasında hesabat və avtomatlaşdırma yoxdur
  - Sadə skanerlərlə müqayisədə daha ağırdır
- 🔗 [https://github.com/infobyte/faraday](https://github.com/infobyte/faraday)

---

### 🌐 4. **OWASP ZAP (Zed Attack Proxy)**
> Veb tətbiqlər üçün tam funksiyalı dinamik təhlükəsizlik test aləti (DAST).

- ✅ **Üstünlüklər**:
  - Proxy əsaslı veb tətbiq skanlaması
  - XSS, SQLi, CSRF, təhlükəli başlıqlar və s. aşkarlanması
  - Aktiv/passiv skan rejimi, fuzzing və spidering funksiyası
- ❌ **Çatışmazlıqlar**:
  - Yalnız veb hədəflər üçün uyğundur (infrastruktur deyil)
  - Ən yaxşı nəticə üçün əllə konfiqurasiya tələb oluna bilər
- 🔗 [https://www.zaproxy.org](https://www.zaproxy.org)

---

### ⚡ 5. **Nuclei**
> YAML şablonları ilə ildırım sürətli veb skanlama çərçivəsi.

- ✅ **Üstünlüklər**:
  - Bug bounty və avtomatlaşdırma (CI/CD) üçün idealdır
  - CVE, səhv konfiqurasiya, takeover və s. üçün böyük şablon kitabxanası
  - Asanlıqla fərdiləşdirilə və CLI ilə skriptləşdirilə bilər
- ❌ **Çatışmazlıqlar**:
  - GUI yoxdur
  - İnfrastruktur və OS zəifliklərini skan etmir
- 🔗 [https://github.com/projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)

---

### 🧪 6. **Nikto**
> Tanınmış problemlər və səhv konfiqurasiyalar üçün yüngül veb server skaneri.

- ✅ **Üstünlüklər**:
  - Hər Linux sistemində asanlıqla işləyir
  - Köhnəlmiş server proqram təminatı, təhlükəli fayllar, zəif başlıqlar aşkarlanır
- ❌ **Çatışmazlıqlar**:
  - Köhnə interfeys, dashboard yoxdur
  - Yeni alətlərlə müqayisədə daha çox yanlış pozitiv verir
- 🔗 [https://github.com/sullo/nikto](https://github.com/sullo/nikto)

---

### 🧠 7. **OWASP Amass**
> Aktivlərin aşkar edilməsi və xarici hücum səthinin xəritələndirilməsi vasitəsi.

- ✅ **Üstünlüklər**:
  - Subdomain tapılması, DNS bruteforce, passiv rekonstruksiya
  - Qrafik çıxış və inteqrasiyalarla uyğunluq
- ❌ **Çatışmazlıqlar**:
  - Zəiflikləri skanlamır — yalnız aktivləri aşkarlayır
  - Yalnız CLI əsaslıdır
- 🔗 [https://owasp.org/www-project-amass](https://owasp.org/www-project-amass)

</details>


---


<details>
<summary>🔐 Kimlik və Giriş İdarəetməsi (IAM)</summary>

Doğrulama (authentication), SSO və təhlükəsiz identifikasiya prosesləri üçün istifadə olunan açıq mənbə kimlik təminatçıları və giriş idarəetmə alətləri.

### 🥇 1. **Keycloak**
> Red Hat tərəfindən hazırlanmış korporativ səviyyəli IAM platforması.

- ✅ **Üstünlüklər**:
  - SSO, OAuth2, OpenID Connect, LDAP, SCIM, MFA tam dəstəyi
  - RBAC, müştəri tətbiq idarəetməsi, identifikasiya ötürməsi (brokering)
  - Admin interfeysi və CLI alətləri mövcuddur
- ❌ **Çatışmazlıqlar**:
  - Ağır sistemdir (Java əsaslı), quraşdırması mürəkkəbdir
  - Kiçik miqyaslı istifadə üçün həddən artıq ola bilər
- 🔗 [https://www.keycloak.org](https://www.keycloak.org)

---

### 🥈 2. **Authentik**
> Python ilə yazılmış yüngül və müasir IAM platforması.

- ✅ **Üstünlüklər**:
  - OAuth2, SAML, LDAP, SCIM, WebAuthn dəstəyi
  - Təmiz admin interfeysi, Docker ilə asan quraşdırma
  - Öz host edilən mühitlər və komandalar üçün əladır
- ❌ **Çatışmazlıqlar**:
  - Keycloak ilə müqayisədə daha kiçik ekosistemə malikdir
  - İrəli səviyyəli istifadələrdə daha az detallı nəzarət
- 🔗 [https://goauthentik.io](https://goauthentik.io)

---

### 🥉 3. **Ory Stack** (Kratos, Hydra, Keto)
> API-yönümlü modulyar IAM çərçivəsi.

- ✅ **Üstünlüklər**:
  - Ayrı-ayrı komponentlər: Identity (Kratos), OAuth2 (Hydra), RBAC (Keto)
  - Ölçülə biləndir, mikroxidmətlər və UI-siz (headless) tətbiqlər üçün uyğundur
  - Go ilə yazılıb, müasir REST API-ləri ilə təmin olunub
- ❌ **Çatışmazlıqlar**:
  - Öyrənmək çətindir
  - Daxili UI yoxdur (yalnız headless rejim)
- 🔗 [https://www.ory.sh](https://www.ory.sh)

</details>

---

<details>
<summary>🧭 GRC və Siyasət İdarəetməsi</summary>

Təşkilatların idarəetmə, risk qiymətləndirmələri, uyğunluq tələbləri və təhlükəsizlik siyasətlərini idarə etməsinə kömək edən açıq mənbə vasitələr.

### 🥇 1. **CISO Assistant (Community Edition)**
> 80-dən çox çərçivəni dəstəkləyən əhatəli GRC platforması.

- ✅ **Üstünlüklər**:
  - Risk, AppSec, Uyğunluq/Audit İdarəetməsi və Məxfilik sahələrini əhatə edir
  - NIST CSF, ISO 27001, SOC2, CIS, PCI DSS, GDPR, HIPAA və s. çərçivələri dəstəkləyir
  - Avtomatik xəritələmə, çoxdilli dəstək, müasir UI
  - Django və SvelteKit ilə qurulub; Docker ilə yerləşdirmə
- ❌ **Çatışmazlıqlar**:
  - Bəzi təkmil funksiyalar yalnız kommersiya versiyalarında mövcuddur
  - Yeni başlayanlar üçün öyrənməsi çətin ola bilər
- 🔗 [https://github.com/intuitem/ciso-assistant-community](https://github.com/intuitem/ciso-assistant-community)

---

### 🥈 2. **Eramba (Community Edition)**
> Pulsuz community versiyası olan korporativ səviyyəli GRC platforması.

- ✅ **Üstünlüklər**:
  - Risk qiymətləndirməsi, siyasət nəzərdən keçirmə, uyğunluq xəritələndirməsi
  - Audit prosesləri, maarifləndirmə proqramları
  - Fərdi nəzarətlər və hesabatlar
- ❌ **Çatışmazlıqlar**:
  - Community versiyada bəzi avtomatlaşdırma funksiyaları yoxdur
  - İstifadəçi interfeysi bir qədər köhnədir
- 🔗 [https://www.eramba.org](https://www.eramba.org)

---

### 🥉 3. **OpenGRC / OpenControl**
> Nəzarətlərin və uyğunluğun sənədləşdirilməsi üçün yüngül çərçivə.

- ✅ **Üstünlüklər**:
  - Markdown/YAML əsaslı sənədləşdirmə
  - Versiya nəzarəti (Git) ilə yaxşı inteqrasiya olunur
  - Müasir DevSecOps proseslərində istifadə olunur
- ❌ **Çatışmazlıqlar**:
  - Tam platforma və ya dashboard deyil
  - UI yoxdur — əsasən mühəndis və uyğunluq komandaları üçün nəzərdə tutulub
- 🔗 [https://open-control.org](https://open-control.org)

---

### 🏅 4. **Gapps**
> Müxtəlif çərçivələrə qarşı uyğunluq üzrə irəliləyişin izlənməsinə fokuslanan təhlükəsizlik platforması.

- ✅ **Üstünlüklər**:
  - SOC2, NIST CSF, ISO27001, HIPAA və s. çərçivələrini dəstəkləyir
  - Nəzarət izləmə, siyasət idarəetməsi və vendor sorğuları funksiyaları
  - Docker əsaslı yerləşdirmə, istifadəçi dostu interfeys
- ❌ **Çatışmazlıqlar**:
  - Hal-hazırda Alpha mərhələsindədir — istehsalatda istifadə üçün tövsiyə olunmur
  - Digər vasitələrlə müqayisədə icma dəstəyi azdır
- 🔗 [https://github.com/bmarsh9/gapps](https://github.com/bmarsh9/gapps)

</details>

---

<details>
<summary>🔐 Sirrlərin İdarə Olunması</summary>

İnfrastruktur, DevOps və istehsal mühitlərində şifrə, API açarı, sertifikat kimi gizli məlumatların təhlükəsiz saxlanması, idarə olunması və əldə edilməsi üçün vasitələr.

### 🥇 1. **HashiCorp Vault**
> Ətraflı giriş nəzarəti ilə sirrlərin saxlanması və əldə olunması üçün sənaye standartı vasitə.

- ✅ **Üstünlüklər**:
  - Dinamik sirrlər, icarələr, geri çağırma funksiyaları
  - Kimlik əsaslı giriş, audit jurnalları
  - K/V, AWS, verilənlər bazaları, SSH sirrləri dəstəklənir
  - CLI, API və UI mövcuddur
- ❌ **Çatışmazlıqlar**:
  - İlkin quraşdırma mürəkkəbdir
  - Yaxşı infrastruktur planlaşdırması tələb olunur
- 🔗 [https://www.vaultproject.io](https://www.vaultproject.io)

---

### 🥈 2. **Infisical**
> Müasir interfeysli və developer dostu açıq mənbə sirr idarəetmə platforması.

- ✅ **Üstünlüklər**:
  - Sirrlərin versiyalaşdırılması, rotasiyası və zaman nöqtəsi üzrə bərpası
  - GitHub, Vercel, AWS, Terraform, Ansible ilə inteqrasiya
  - Kubernetes operatoru və CLI dəstəyi
  - Daxili PKI və SSH sertifikat idarəetməsi
  - Öz host edilə bilən, MIT lisenziyası ilə
- ❌ **Çatışmazlıqlar**:
  - Bəzi enterprise funksiyalar ödənişlidir
- 🔗 [https://infisical.com](https://infisical.com)

---

### 🥉 3. **CyberArk Conjur (Open Source)**
> DevOps və konteyner mühitləri üçün nəzərdə tutulmuş korporativ səviyyəli sirr meneceri.

- ✅ **Üstünlüklər**:
  - Ətraflı RBAC və siyasət nəzarəti
  - Güclü Kubernetes və CI/CD inteqrasiyası
  - REST API-lər və təhlükəsiz auditi dəstəkləyir
- ❌ **Çatışmazlıqlar**:
  - Sənədləşdirməsi həcmli və qarışıq ola bilər
  - Aktiv icması var, lakin Vault qədər deyil
- 🔗 [https://www.conjur.org](https://www.conjur.org)

</details>


---


<details>
<summary>🛡️ Privileged Access Management (PAM)</summary>

Privileged Access Management (PAM) tools are designed to control, monitor, and audit the access of users with elevated (admin/root) privileges. These tools help reduce attack surface, enforce access control, and meet compliance requirements.

---

### 🥇 1. **Teleport**
> Modern, open-source Zero Trust PAM for SSH, Kubernetes, RDP, and databases.

- ✅ **Pros**:
  - Role-based access (RBAC), session recording, audit logs
  - Supports certificate-based short-lived access tokens
  - Works with Kubernetes, DBs, apps, SSH/RDP
  - SSO integration (OIDC, SAML, GitHub, Okta, etc.)
- ❌ **Cons**:
  - Some enterprise features are paid
  - Requires infrastructure planning
- 🔗 [https://goteleport.com](https://goteleport.com)

---

### 🥈 2. **JumpServer**
> Fully open-source PAM platform built for enterprise environments.

- ✅ **Pros**:
  - Supports SSH, RDP, K8s, DB, WebApps
  - Web UI for access requests, session recording, and auditing
  - LDAP/AD integration, RBAC, MFA, and asset management
- ❌ **Cons**:
  - UI is mostly in Chinese by default (can be translated)
  - Heavier setup compared to lightweight solutions
- 🔗 [https://www.jumpserver.org](https://www.jumpserver.org)

---

### 🥉 3. **Pritunl Zero**
> Zero Trust Access Gateway with focus on SSH and web apps.

- ✅ **Pros**:
  - Simple reverse proxy model with strong authentication
  - Certificate-based SSH access with web login approval
  - LDAP and SSO integration support
- ❌ **Cons**:
  - Less feature-rich compared to full PAM platforms
  - Mainly focused on HTTP and SSH, lacks full vault or session granularity
- 🔗 [https://pritunl.com/zero](https://pritunl.com/zero)

</details>


---


<details>
<summary>💾 Backup & Disaster Recovery</summary>

Open-source tools to back up data, systems, and virtual environments securely with options for incremental backups, deduplication, and remote/offsite recovery.

---

### 🥇 1. **UrBackup**
> Client/Server-based easy-to-use backup system for images and files.

- ✅ **Pros**:
  - Supports both **image-level** and **file-level** backups
  - Web interface for managing clients and scheduling
  - Works on Windows, Linux, macOS
  - Incremental backups, deduplication, compression
- ❌ **Cons**:
  - Not designed for enterprise multi-tenant environments
- 🔗 [https://www.urbackup.org](https://www.urbackup.org)

---

### 🥈 2. **BorgBackup (Borg)**
> Deduplicating, encrypted backup program for Linux/Unix systems.

- ✅ **Pros**:
  - Secure backups with built-in encryption
  - Excellent deduplication and compression
  - CLI-driven, great for scripting and automation
- ❌ **Cons**:
  - No native web UI (community-built frontends available)
  - Focused mainly on advanced users (DevOps, sysadmins)
- 🔗 [https://www.borgbackup.org](https://www.borgbackup.org)

---

### 🥉 3. **Restic**
> Fast, secure, and efficient backup tool written in Go.

- ✅ **Pros**:
  - Cross-platform support (Linux, macOS, Windows)
  - Snapshot-based, versioned backups
  - Encrypted, deduplicated, simple CLI
- ❌ **Cons**:
  - Does not support image/system-level backups (file-level only)
- 🔗 [https://restic.net](https://restic.net)

</details>


---


<details>
<summary>🧠 Threat Intelligence</summary>

Open-source threat intelligence platforms help collect, analyze, and share indicators of compromise (IOCs), threat actor data, and TTPs (Tactics, Techniques, and Procedures). These tools improve situational awareness and enable proactive defense.

---

### 🥇 1. **OpenCTI**
> Cyber threat intelligence platform with structured data, ATT&CK support, and API-driven automation.

- ✅ **Pros**:
  - Full support for **MITRE ATT&CK** framework
  - Advanced data modeling and relationship mapping
  - REST API and connector-based architecture for automation
  - Supports STIX 2.1 and TAXII protocols
- ❌ **Cons**:
  - Complex deployment (requires Elasticsearch, Redis, RabbitMQ)
  - Can be resource-intensive
- 🔗 [https://www.opencti.io](https://www.opencti.io)

---

### 🥈 2. **MISP (Malware Information Sharing Platform)**
> Open-source platform to share, store, and correlate IOCs and threat information.

- ✅ **Pros**:
  - Built-in support for **IOC correlation and enrichment**
  - Extensive sharing capabilities (MISP-to-MISP sync)
  - Community-driven with many integrations (OSINT feeds, etc.)
- ❌ **Cons**:
  - UI is less modern compared to newer platforms
  - Configuration may be time-consuming for advanced use cases
- 🔗 [https://www.misp-project.org](https://www.misp-project.org)

---

### 🥉 3. **YETI (Your Everyday Threat Intelligence)**
> Lightweight threat intelligence platform to track indicators, actors, and malware.

- ✅ **Pros**:
  - Easy to deploy and manage
  - Includes integrations for enrichment (e.g., VirusTotal, MISP)
  - Visualizes relationships between observables and threats
- ❌ **Cons**:
  - Smaller community and slower development
  - Fewer enterprise features compared to OpenCTI or MISP
- 🔗 [https://github.com/yeti-platform/yeti](https://github.com/yeti-platform/yeti)

</details>


---


<details>
<summary>🔐 İki Mərhələli Giriş (2FA / MFA / OTP) Həlləri</summary>

Çoxmərhələli identifikasiya (MFA) alətləri giriş təhlükəsizliyini artırmaq üçün əlavə təsdiqləmə mərhələləri tələb edir (vaxta əsaslanan OTP-lər, push bildirişlər və ya biometrik yoxlamalar). Bu açıq mənbə vasitələr tətbiqləriniz və infrastrukturunuz üçün təhlükəsiz MFA imkanları təqdim edir.

---

### 🥇 1. **Authelia**
> 2FA, SSO və təhlükəsiz giriş nəzarəti təqdim edən açıq mənbə autentifikasiya və avtorizasiya serveri.

- ✅ **Üstünlüklər**:
  - Tam funksional MFA dəstəyi (TOTP, Duo, WebAuthn)
  - NGINX, Traefik kimi reverse proxy-lərlə uyğundur
  - LDAP, SAML və OpenID Connect (OIDC) inteqrasiyası
  - İstifadəçi portalı vasitəsilə 2FA qeydiyyatı və bərpa
- ❌ **Çatışmazlıqlar**:
  - YAML əsaslı ilkin konfiqurasiya və reverse proxy tələbi
  - Daha çox DevOps və adminlər üçün uyğundur
- 🔗 [https://www.authelia.com](https://www.authelia.com)

---

### 🥈 2. **PrivacyIDEA**
> OTP tokenləri, push əsaslı MFA və müxtəlif inteqrasiyaları dəstəkləyən çevik autentifikasiya sistemi.

- ✅ **Üstünlüklər**:
  - TOTP, HOTP, U2F, Push və digər token növləri dəstəklənir
  - FreeRADIUS, SAML, LDAP və s. ilə inteqrasiya
  - Admin və istifadəçi üçün veb interfeyslər
  - Korporativ mühitlər üçün uyğundur
- ❌ **Çatışmazlıqlar**:
  - Python mühiti və əlavə komponentlər (məs. RADIUS server) tələb edir
- 🔗 [https://www.privacyidea.org](https://www.privacyidea.org)

---

### 🥉 3. **Keycloak**
> Daxili MFA dəstəyi olan identifikasiya və giriş idarəetmə həlli.

- ✅ **Üstünlüklər**:
  - TOTP əsaslı 2FA üçün daxili dəstək
  - SSO, Identity Brokering və RBAC imkanları
  - Xüsusi autentifikasiya axınları ilə genişləndirilə bilər
- ❌ **Çatışmazlıqlar**:
  - Java əsaslı, resurs tələb edən və kompleks interfeys
- 🔗 [https://www.keycloak.org](https://www.keycloak.org)

</details>

---

<details>
<summary>☁️ Təhlükəsiz Fayl Paylaşımı və Bulud Həlləri</summary>

Məxfilik, şifrələmə və təhlükəsiz əməkdaşlıq prioriteti ilə hazırlanmış açıq mənbəli fayl paylaşımı və öz hostlu bulud saxlama vasitələri. Komandalar, müəssisələr və fərdi istifadəçilər üçün uyğundur.

---

### 🥇 1. **Nextcloud**
> Uçtan-uca şifrələmə ilə öz hostlu əməkdaşlıq və fayl paylaşımı platforması.

- ✅ **Üstünlüklər**:
  - E2EE (uçtan-uca şifrələmə) ilə təhlükəsiz fayl sinxronizasiya və paylaşım
  - Təqvim, kontaktlar, çat, video zəng və sənəd redaktəsi üçün daxili tətbiqlər
  - LDAP/SSO və MFA dəstəyi
  - Güclü icma və plugin ekosistemi
- ❌ **Çatışmazlıqlar**:
  - Ölçək artımı üçün performans tənzimləməsi tələb edir
  - Böyük sistemlərdə resurs tələbkarlığı
- 🔗 [https://nextcloud.com](https://nextcloud.com)

---

### 🥈 2. **Seafile**
> Yüksək performanslı, sürət və etibarlılığa fokuslanan fayl hostinq platforması.

- ✅ **Üstünlüklər**:
  - Böyük fayl və repozitoriyalar üçün sürətli sinxronizasiya
  - Kitabxana əsaslı seçimli E2EE
  - Masaüstü, mobil və veb müştəri dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Nextcloud ilə müqayisədə daha az daxili əməkdaşlıq aləti
  - Bəzi funksiyalar yalnız Pro versiyada mövcuddur
- 🔗 [https://www.seafile.com](https://www.seafile.com)

---

### 🥉 3. **OnionShare**
> Tor şəbəkəsi üzərindən anonim və təhlükəsiz fayl paylaşımı.

- ✅ **Üstünlüklər**:
  - Server tələb etmədən P2P fayl paylaşımı
  - Anonimlik üçün Tor gizli xidmətlərindən istifadə edir
  - Sadə GUI və CLI interfeysləri mövcuddur
- ❌ **Çatışmazlıqlar**:
  - Həm göndərici, həm də qəbul edən tərəf OnionShare və ya Tor istifadə etməlidir
  - Kütləvi və uzunmüddətli saxlama üçün nəzərdə tutulmayıb
- 🔗 [https://onionshare.org](https://onionshare.org)

</details>

---

<details>
<summary>🎯 Phishing Simulyasiyası</summary>

Təhlükəsizlik fərqindəliyi və phishing simulyasiyası vasitələri istifadəçiləri maarifləndirmək və real hücumlara qarşı reaksiya qabiliyyətini yoxlamaq üçün istifadə olunur. Bu açıq mənbə platformalar simulyasiya olunmuş e-poçt hücumları, hesabatlar və təlimlərlə təhlükəsizlik mədəniyyətini gücləndirir.

---

### 🥇 1. **GoPhish**
> İzləmə və hesabat imkanları ilə güclü phishing simulyasiya platforması.

- ✅ **Üstünlüklər**:
  - Realistik phishing kampaniyalarının yaradılması və göndərilməsi
  - E-poçtun açılması, kliklənməsi və məlumat daxil edilməsinin izlənməsi
  - Kampaniya idarəetməsi üçün veb interfeys
  - REST API vasitəsilə avtomatlaşdırma
- ❌ **Çatışmazlıqlar**:
  - Daxili maarifləndirmə modulları yoxdur
  - E-poçt serveri və domen konfiqurasiyası tələb edir
- 🔗 [https://getgophish.com](https://getgophish.com)

---

### 🥈 2. **King Phisher**
> Sosial mühəndislik testləri və metrik toplanması ilə phishing kampaniya aləti.

- ✅ **Üstünlüklər**:
  - Şablon e-poçtlar və veb səhifələr üçün dəstək
  - Giriş məlumatları, yer və brauzer məlumatlarının izlənməsi
  - SPF/DKIM/DMARC konfiqurasiyaları ilə inteqrasiya
- ❌ **Çatışmazlıqlar**:
  - Müştəri və server komponentləri tələb edir (Python əsaslıdır)
  - GoPhish ilə müqayisədə bir qədər mürəkkəb quraşdırma
- 🔗 [https://github.com/securestate/king-phisher](https://github.com/securestate/king-phisher)

---

### 🥉 3. **Lucy Community Edition**
> Maarifləndirmə təlimləri və phishing simulyasiyası üçün LMS xüsusiyyətlərinə malik platforma (məhdud versiyada).

- ✅ **Üstünlüklər**:
  - Phishing testlərini istifadəçi təlim modulları ilə birləşdirir
  - Şablonlar, videolar, testlər və hesabatlar
  - Təlim idarəetmə sistemi (LMS) daxilində təqdim olunur
- ❌ **Çatışmazlıqlar**:
  - Pulsuz versiyada məhdud funksiyalar (tam avtomatlaşdırma yoxdur)
  - İnterfeysi bir qədər köhnəlmişdir
- 🔗 [https://lucysecurity.com](https://lucysecurity.com)

</details>


---


<details>
<summary>🎮 Hücum Simulyasiyası və Təhdid Emulyasiyası</summary>

Bu platformalar real hücum davranışlarını simulyasiya edərək aşkar etmə, cavab və dayanıqlılığı yoxlamağa imkan verir. Red team, purple team və EDR/SIEM sistemlərinin test edilməsi üçün idealdır.

---

### 🥇 1. **Atomic Red Team**
> MITRE ATT&CK texnikalarına uyğun sadə və açıq mənbə testlər toplusu.

- ✅ **Üstünlüklər**:
  - MITRE ATT&CK texnikalarına əsaslanır
  - Agent tələb etmir – PowerShell, Bash və s. ilə icra olunur
  - YAML əsaslı – avtomatlaşdırma və fərdiləşdirmə asandır
- ❌ **Çatışmazlıqlar**:
  - Vizuallaşdırma interfeysi yoxdur (CLI və ya üçüncü tərəf inteqrasiyası tələb edir)
  - Test nəticələrini izləmək üçün əlavə loq/SIEM tələb olunur
- 🔗 [https://github.com/redcanaryco/atomic-red-team](https://github.com/redcanaryco/atomic-red-team)

---

### 🥈 2. **Caldera (MITRE tərəfindən)**
> Avtomatlaşdırılmış təhdid emulyasiya sistemi; plagin və əməliyyat dəstəyi ilə.

- ✅ **Üstünlüklər**:
  - Windows, Linux, macOS üçün agent əsaslı simulyasiya
  - Real hücum zəncirləri üçün daxili adversary profilləri
  - İstifadəçi dostu veb interfeys və REST API
- ❌ **Çatışmazlıqlar**:
  - Əməliyyat mühiti və red team bilikləri tələb edir
  - Agentlər AV/EDR sistemləri tərəfindən aşkar oluna bilər
- 🔗 [https://github.com/mitre/caldera](https://github.com/mitre/caldera)

---

### 🥉 3. **Sliver (C2 Framework)**
> Təhdid simulyasiyası üçün müasir, çoxplatformalı Command & Control çərçivəsi.

- ✅ **Üstünlüklər**:
  - HTTP/S, DNS və mTLS rabitə dəstəyi
  - Operator dostu shell, staging və payload fərdiləşdirmə
  - Red team əməkdaşlığı üçün uyğundur
- ❌ **Çatışmazlıqlar**:
  - Təhlükəsiz test üçün yüksək OpSec təcrübəsi tələb olunur
  - Düzgün evasionsuz EDR-lər tərəfindən aşkar oluna bilər
- 🔗 [https://github.com/BishopFox/sliver](https://github.com/BishopFox/sliver)

---

### 🔢 4. **APTSimulator**
> Windows üçün APT hücum davranışlarını simulyasiya edən batch skript.

- ✅ **Üstünlüklər**:
  - İcra asandır, yüngüldür, kompilyasiya tələb etmir
  - Qeydiyyat, xidmətlər və digər artefaktları simulyasiya edir
  - AV/EDR və qayda yoxlamaları üçün yararlıdır
- ❌ **Çatışmazlıqlar**:
  - Yalnız Windows dəstəyi
  - Real exploit yerinə sadəcə artefakt simulyasiyası
- 🔗 [https://github.com/NextronSystems/APTSimulator](https://github.com/NextronSystems/APTSimulator)

---

### 🔢 5. **Red Team Automation (RTA)**
> Windows əsaslı hücum simulyasiyası ilə təhlükəsizlik analitiklərinin test edilməsi çərçivəsi.

- ✅ **Üstünlüklər**:
  - Hazır skriptlərlə real hücum texnikalarını simulyasiya edir
  - Proses injection, LOLBins, perzistensiya və s. ssenarilər
  - SIEM qaydalarının (Elastic, Splunk və s.) test edilməsi üçün faydalıdır
- ❌ **Çatışmazlıqlar**:
  - Tam C2 deyil – yalnız simulyasiya üçün nəzərdə tutulub
  - Yalnız deteksiya məqsədli istifadə
- 🔗 [https://github.com/endgameinc/RTA](https://github.com/endgameinc/RTA)

---

### ⚔️ Bonus: **Digər Faydalılar**
- 🐒 **Infection Monkey** — Daxili şəbəkədə lateral hərəkət və dayanıqlılıq testi  
  🔗 [https://github.com/guardicore/monkey](https://github.com/guardicore/monkey)

- 🧪 **Prelude Operator** — Təhdid zəncirləri ilə yüngül təhdid emulyasiya aləti  
  🔗 [https://www.prelude.org](https://www.prelude.org)

</details>

---

<details>
<summary>📦 Konteyner, İmaj və Kubernetes Təhlükəsizliyi</summary>

Konteynerləşdirilmiş iş yüklərinin təhlükəsizliyi üçün bütün mərhələlərdə istifadə olunan açıq mənbə həllər: imaj hazırlığından istismar zamanı mühafizəyə və uyğunluq auditi mərhələsinə qədər.

---

#### 🔧 İstismardan Əvvəl (Pre-Deployment)
> Konteyner imajlarını yerləşdirilmədən əvvəl yoxlayın və sərtləşdirin.

- **🔍 Trivy** — Konteyner imajları, əməliyyat sistemi paketləri, IaC və mənbə kodunda zəiflikləri aşkarlayır.  
- **🛡️ Kyverno** — Təhlükəsizlik siyasətlərinin icrası (məsələn, privilegiyalı konteynerlərin bloklanması, label-lərin tələb edilməsi və s.).

---

#### 🧠 İstismar Zamanı Qorunma (Runtime Protection)
> Konteynerlər işlədiyi müddətdə təhdidləri aşkarlayın və cavab verin.

- **📉 Falco** — Kubernetes və konteyner davranışlarını real vaxtda izləyir, şübhəli sistem çağırışları əsasında xəbərdarlıq yaradır.  
- **🛑 KubeArmor** — Fayl girişi, şəbəkə əlaqələri və s. kimi icazəsiz davranışları bloklamaq üçün istismar vaxtı siyasətlərini tətbiq edir.

---

#### 📋 Uyğunluq və Postur Auditi (Compliance & Posture)
> Kubernetes mühitlərini təhlükəsizlik standartları və ən yaxşı təcrübələr baxımından yoxlayın.

- **✅ kube-bench** — CIS Kubernetes benchmark uyğunluğunu yoxlayır.  
- **🚀 Starboard** — Trivy və kube-bench kimi skanerləri Kubernetes CRD-lərinə inteqrasiya edir, davamlı görünürlük təmin edir.

</details>



---


<details>
<summary>🧪 SAST, DAST, IAST və SBOM (Tətbiq Təhlükəsizliyi Testi)</summary>

Tətbiq təhlükəsizliyini inkişaf müddəti boyunca test etmək üçün açıq mənbə alətlər — statik kod analizi, dinamik skan etmə və proqram tərkibi görünürlüğü üçün.

---

### 🔐 Statik Tətbiq Təhlükəsizlik Testi (SAST)

#### 🥇 1. **Semgrep**
> Yüngül, sürətli və developer-dostu statik kod analizatoru.

- ✅ **Üstünlüklər**:
  - YAML ilə yazılmış dilə həssas qaydalar
  - Sürətli skan və CI/CD inteqrasiyası
  - Geniş icma qayda dəsti və xüsusi qayda dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Dərin tətbiq məntiqi üçün xüsusi qaydalar yazmaq tələb olunur
  - Kommersiya alətlərindəki kimi dərin təhlil yoxdur
- 🔗 [https://semgrep.dev](https://semgrep.dev)

#### 🥈 2. **SonarQube Community Edition**
> Bir neçə proqramlaşdırma dili üzrə kod keyfiyyəti və zəiflik aşkarlanması.

- ✅ **Üstünlüklər**:
  - Java, Python, JavaScript, C# və digər dilləri dəstəkləyir
  - Kod problemləri, bug-lar və əsas təhlükəsizlik zəifliklərini aşkarlayır
  - Zəngin veb paneldə nəticələrin incələnməsi
- ❌ **Çatışmazlıqlar**:
  - Təkmil təhlükəsizlik qaydaları kommersiya versiyada var
  - Böyük layihələr üçün resurs tələbkarlığı
- 🔗 [https://www.sonarqube.org](https://www.sonarqube.org)

#### 🥉 3. **CodeQL**
> GitHub Security Lab tərəfindən hazırlanmış sorğu əsaslı semantik kod analizi.

- ✅ **Üstünlüklər**:
  - QL dili ilə xüsusi sorğular yazmaq imkanı
  - GitHub Actions ilə avtomatlaşdırma inteqrasiyası
  - Kompleks məntiq zəifliklərinin aşkarlanması üçün güclü
- ❌ **Çatışmazlıqlar**:
  - QL dilini və sorğu yazmağı öyrənmək çətindir
  - Böyük kod bazaları üçün resurs baxımından ağırdır
- 🔗 [https://codeql.github.com](https://codeql.github.com)

---

### 🌐 Dinamik Tətbiq Təhlükəsizlik Testi (DAST)

#### 🥇 1. **OWASP ZAP (Zed Attack Proxy)**
> Aktiv və passiv rejimli tam funksiyalı veb tətbiq skaneri.

- ✅ **Üstünlüklər**:
  - Spidering, fuzzing, autentifikasiya və sessiya dəstəyi
  - CLI və GUI rejimləri — həm avtomatlaşdırma, həm əl ilə test üçün
  - Geniş plugin ekosistemi və aktiv icma
- ❌ **Çatışmazlıqlar**:
  - Düzgün qurulmasa yalnış pozitivlər verə bilər
  - Kompleks tətbiqlər üçün əl ilə tənzimləmə tələb edir
- 🔗 [https://www.zaproxy.org](https://www.zaproxy.org)

#### 🥈 2. **Nikto**
> Komanda sətrindən istifadə olunan yüngül veb server skaneri.

- ✅ **Üstünlüklər**:
  - Köhnəlmiş server proqramları və konfiqurasiya səhvlərini aşkarlayır
  - Sadə CLI və sürətli icra
- ❌ **Çatışmazlıqlar**:
  - Tətbiq səviyyəli zəifliklər üçün əhatəli deyil
  - Çıxışın əl ilə təhlil edilməsinə ehtiyac var
- 🔗 [https://github.com/sullo/nikto](https://github.com/sullo/nikto)

#### 🥉 3. **Arachni** (arxivləşdirilib)
> Modulyar və yüksək performanslı veb tətbiq skaneri.

- ✅ **Üstünlüklər**:
  - Brauzer simulyasiyası, sessiya idarəsi və plugin arxitekturası
  - JavaScript-lə zəngin tətbiqləri dəstəkləyir
- ❌ **Çatışmazlıqlar**:
  - Aktiv şəkildə inkişaf etdirilmir
  - Yeni sistemlərlə uyğunluq problemləri ola bilər
- 🔗 [https://github.com/Arachni/arachni](https://github.com/Arachni/arachni)

---

### ⚙️ İnteraktiv Tətbiq Təhlükəsizlik Testi (IAST)

#### 🥇 1. **AppSensor (OWASP)**
> Tətbiq içi hücum aşkarlama və real vaxt cavab sistemi.

- ✅ **Üstünlüklər**:
  - XSS, SQLi, brute-force kimi hücumları tətbiqin içindən aşkar edir
  - API inteqrasiyası ilə dil-nəzərə almayan dəstək
  - Real vaxt qayda mühərriki və konfiqurasiya edilə bilən deteksiya nöqtələri
- ❌ **Çatışmazlıqlar**:
  - Kod səviyyəsində dəyişiklik tələb edir
  - İntegrasiya çətinliyi tətbiqdən asılıdır
- 🔗 [https://owasp.org/www-project-appsensor](https://owasp.org/www-project-appsensor)

---

### 🧾 Proqram Tərkib Siyahısı (SBOM)

#### 🥇 1. **Syft (Anchore tərəfindən)**
> Konteynerlər və fayl sistemlərindən ətraflı SBOM yaradır.

- ✅ **Üstünlüklər**:
  - SPDX, CycloneDX, JSON formatlarını dəstəkləyir
  - OCI imajlar, Dockerfile-lar, qovluqlarla işləyir
  - Grype ilə zəiflik skanı üçün uyğunlaşdırılır
- ❌ **Çatışmazlıqlar**:
  - Yalnız metadatalar üzərində işləyir, zəiflik skanı etməz
- 🔗 [https://github.com/anchore/syft](https://github.com/anchore/syft)

#### 🥈 2. **CycloneDX CLI**
> CycloneDX SBOM-lar yaratmaq və yoxlamaq üçün CLI aləti.

- ✅ **Üstünlüklər**:
  - Standartlara uyğun SBOM yaradılması və birləşdirilməsi
  - SBOM fayllarının bütövlüyünü yoxlayır
- ❌ **Çatışmazlıqlar**:
  - Tam əhatəlilik üçün digər skanerlərlə birlikdə istifadə olunmalıdır
- 🔗 [https://github.com/CycloneDX/cyclonedx-cli](https://github.com/CycloneDX/cyclonedx-cli)

#### 🥉 3. **Tern**
> Konteyner imajlarını təhlil edərək SBOM yaradır.

- ✅ **Üstünlüklər**:
  - Docker və OCI qatları üçün optimallaşdırılıb
  - SPDX və JSON formatlarında çıxış verir
- ❌ **Çatışmazlıqlar**:
  - Əsasən paket metadatalarını çıxarır, zəiflik aşkarlamır
- 🔗 [https://github.com/tern-tools/tern](https://github.com/tern-tools/tern)

</details>



---


<details>
<summary>🧪 Zərərli Proqramların Təhlili və Sandbox Mühitləri</summary>

Zərərli proqramları təhlükəsiz şəkildə işə salmaq, izləmək və təhlil etmək üçün açıq mənbə sandbox və analiz vasitələri. Bu alətlər tərs mühəndislik, təhdid araşdırması və çətin aşkarlanan zərərli proqramların analizində əhəmiyyətlidir.

---

### 🥇 1. **Cuckoo Sandbox**
> Ən populyar açıq mənbə avtomatlaşdırılmış zərərli proqram analiz sistemlərindən biri.

- ✅ **Üstünlüklər**:
  - PE faylları, Office sənədləri, PDF-lər, email-lər və URL-ləri təhlil edir
  - API çağırışları, düşən fayllar, şəbəkə aktivliyi kimi detallı hesabatlar təqdim edir
  - Windows, Linux və Android VM-ləri dəstəkləyir
  - Pluginlərlə genişləndirilə bilər (məsələn, YARA, Suricata)
- ❌ **Çatışmazlıqlar**:
  - Quraşdırılması çətindir (xüsusilə şəbəkə və virtualizasiya hissəsi)
  - Artıq aktiv inkişaf etdirilmir (lakin geniş istifadə olunur)
- 🔗 [https://github.com/cuckoosandbox/cuckoo](https://github.com/cuckoosandbox/cuckoo)

---

### 🥈 2. **CAPEv2 (Cuckoo fork)**
> Cuckoo-nun müasir fork-u — aktiv inkişaf etdirilir və təkmil xüsusiyyətlərə malikdir.

- ✅ **Üstünlüklər**:
  - Shellcode, skriptlər və proses inyeksiyası təhlilini dəstəkləyir
  - Davranış analizi və YARA qaydaları ilə təkmilləşdirilmiş skan
  - Aktiv icma tərəfindən dəstəklənir
- ❌ **Çatışmazlıqlar**:
  - Cuckoo kimi kompleks quraşdırma tələb edir (VM-lər, şəbəkə, agentlər)
  - Fiziki və ya nested virtualizasiya tələb edə bilər
- 🔗 [https://github.com/kevoreilly/CAPEv2](https://github.com/kevoreilly/CAPEv2)

---

### 🥉 3. **IntelOwl**
> Modulyar təhdid kəşfiyyatı və zərərli proqram analizini birləşdirən orchestrator.

- ✅ **Üstünlüklər**:
  - YARA, strings, VirusTotal, whois və digər alətlərdən nəticələri toplamaq imkanı
  - IOC təhlili və zənginləşdirmə üçün idealdır
  - SIEM/SOAR sistemləri ilə REST API vasitəsilə inteqrasiya
- ❌ **Çatışmazlıqlar**:
  - Sandbox deyil — əsasən passiv və statik analiz üçündür
  - Birdən çox konteyner və API-lərlə kompleks qurulum tələb edir
- 🔗 [https://github.com/intelowlproject/IntelOwl](https://github.com/intelowlproject/IntelOwl)

---

### 🔢 4. **Maltrail**
> Zərərli trafik və şübhəli domen istifadəsini şəbəkə səviyyəsində aşkarlayan sistem.

- ✅ **Üstünlüklər**:
  - Botnetlər, C2 trafik və DNS anomaliyaları aşkarlayır
  - Passiv rejimdə işləyir, yüngül və effektivdir
- ❌ **Çatışmazlıqlar**:
  - Tam sandbox deyil — yalnız şəbəkə davranışını izləyir
- 🔗 [https://github.com/stamparm/maltrail](https://github.com/stamparm/maltrail)

---

### 🔢 5. **ThreatPinch Lookup (Brauzer Əlavəsi)**
> Təhlilçilər üçün yüngül təhdid zənginləşdirmə vasitəsi.

- ✅ **Üstünlüklər**:
  - Brauzerdə hash, domen, IP-lərə sağ kliklə avtomatik axtarış imkanı
  - VirusTotal, AbuseIPDB kimi servislərlə inteqrasiya
- ❌ **Çatışmazlıqlar**:
  - Zərərli proqram analiz vasitəsi deyil — yalnız zənginləşdirmə köməkçisidir
- 🔗 [https://github.com/cloudtracer/ThreatPinchLookup](https://github.com/cloudtracer/ThreatPinchLookup)

</details>



---


<details>
<summary>🔒 Şəbəkə Girişinin Nəzarəti (NAC)</summary>

Şəbəkəyə qoşulan cihazları yoxlayan, autentifikasiyanı təmin edən və şəbəkə təhlukəsizliyini artıran açıq mənbəli NAC həlləri. 
Bu alətlər cihazların siyahıya alınması, qaydalara uygunluğun yoxlanması və girişin idarə olunması kimi imkanlar təklif edir.

---

### 🥇 1. **PacketFence**
> Geniş imkanlara malik açıq mənbə NAC platforması.

- ✅ **Üstünlüklər**:
  - VLAN idarəetmə, izolasiya, avtomatik karantina rejimi
  - 802.1X, SNMP, DHCP, ARP protokolları ilə inteqrasiya
  - İstifadəçi və cihaz autentifikasiyası, portal login dəstəyi
- ❌ **Çatışmazlıqlar**:
  - Əsas quraşdırma mürəkkəbdir
  - Çox komponentli memarlıq idarəetməni çətindirləşdirə bilir
- 🔗 [https://packetfence.org](https://packetfence.org)

---

### 🥈 2. **Freshradius**
> RADIUS server inteqrasiyası olan sadə NAC komponenti.

- ✅ **Üstünlüklər**:
  - RADIUS protokol dəstəyi, İstifadəçi idarəetməsi
  - Kiçik şəbəkələr üçün uyğundur
- ❌ **Çatışmazlıqlar**:
  - Tam funksional NAC sistemi deyil, sadələşdirilmiş həlldir
  - Paketfence kimi gülən qaydalarla inteqrasiya edilmir
- 🔗 [https://github.com/wichert/freshradius](https://github.com/wichert/freshradius)

---

### 🥉 3. **OpenNAC (arxivlənib)**
> Apache lisenziyası ilə buraxılmış idi, lakin artıq aktiv dəyil.

- ✅ **Üstünlüklər**:
  - Aktiv idarəetmə konsolu, host analiz sistemi
  - Cihaz identifikasiyası və qayda tətbiqi
- ❌ **Çatışmazlıqlar**:
  - Dəstək dayandırılıb, əsas əlavələr köhnəlib
- 🔗 [https://sourceforge.net/projects/opennac](https://sourceforge.net/projects/opennac)

</details>

---

<details>
<summary>🛡️ Veb Tətbiq Qoruma Sistemləri (WAF)</summary>

Veb tətbiqlərini müxtəlif hücumlardan qorumaq üçün istifadə edilən ən yaxşı açıq mənbə WAF (Web Application Firewall) həlləri.

### 🥇 1. **SafeLine**
> Zəkalı semantik analiz alqoritmləri ilə çalışan və tərs proksi (reverse proxy) kimi fəaliyyət göstərən açıq mənbə WAF.

- ✅ **Üstünlüklər**:
  - Reverse proxy olaraq işləyir
  - Zəkalı analizlə hücumları aşkarlayır
  - İstifadəsi sadədir və icma tərəfindən aktiv şəkildə istifadə olunur
- ❌ **Çatışmazlıqlar**:
  - Qabaqcıl konfiqurasiya bəzi istifadəçilər üçün çətin ola bilər
- 🔗 [https://github.com/chaitin/safeline](https://github.com/chaitin/safeline)

---

### 🥈 2. **ModSecurity**
> Ən məşhur açıq mənbə WAF-lardan biri. Tətbiq qoruma qaydaları (ruleset) ilə gəlir, lakin tam istifadə üçün konfiqurasiya tələb edir.

- ✅ **Üstünlüklər**:
  - OWASP qaydaları ilə genişləndirilə bilər
  - Apache, NGINX və IIS ilə uyğun gəlir
- ❌ **Çatışmazlıqlar**:
  - Quraşdırma və qayda tənzimləmələri texniki bilik tələb edir
- 🔗 [https://github.com/SpiderLabs/ModSecurity](https://github.com/SpiderLabs/ModSecurity)

---

### 🥉 3. **Awesome-WAF**
> Açıq və kommersiya məqsədli WAF-ların, həmçinin əlaqəli alətlərin toplandığı resurs siyahısı.

- ✅ **Üstünlüklər**:
  - WAF alətləri üçün geniş məlumat bazası
  - Müxtəlif senarilərdə istifadə üçün seçim imkanı
- ❌ **Çatışmazlıqlar**:
  - Əslində bir alət deyil, daha çox siyahı/araşdırma resursudur
- 🔗 [https://github.com/0xInfection/Awesome-WAF](https://github.com/0xInfection/Awesome-WAF)

---

### 🏅 4. **BunkerWeb**
> Web xidmətlərini təhlükəsiz hala gətirmək üçün hazırlanmış müasir WAF.

- ✅ **Üstünlüklər**:
  - Docker, Linux və Kubernetes mühitləri ilə uyğun
  - Default olaraq yüksək təhlükəsizlik təklif edir
- ❌ **Çatışmazlıqlar**:
  - Daha az tanınır və sənədləşmə kifayət qədər deyil
- 🔗 [https://github.com/bunkerity/bunkerweb](https://github.com/bunkerity/bunkerweb)

---

### 🔍 5. **wafw00f**
> Mövcud WAF-ları təyin və təhlil etmək üçün istifadə edilən alət — əsasən pentesting və qiymətləndirmə üçün.

- ✅ **Üstünlüklər**:
  - Müxtəlif WAF-ları aşkarlaya bilir
  - Penetrasiya testlərində geniş istifadə olunur
- ❌ **Çatışmazlıqlar**:
  - Hücumdan qorumaq üçün nəzərdə tutulmayıb, sadəcə təhlil məqsədi daşıyır
- 🔗 [https://github.com/EnableSecurity/wafw00f](https://github.com/EnableSecurity/wafw00f)

</details>



---


<details>
<summary>📂 Digər İT Həlləri (Self-Hosted & Açıq Mənbə)</summary>

Təşkilatlar üçün ümumi məqsədli istifadə edilə bilən açıq mənbəli, self-hosted İT həllərinin seçilmiş siyahısı. Bu alətlər daxili təhlükəsiz ünsiyyət, sənəd idarəetməsi, CRM, qeydlərin aparılması, uzaqdan idarəetmə və low-code əsaslı sistemlərə aiddir.

---

### 📢 Öz Serverində Quraşdırılan Ünsiyyət Platformaları

#### 🥇 1. **Mattermost**
> Slack-a alternativ, komanda mesajlaşması və əməkdaşlıq üçün açıq mənbə platforma.

- ✅ **Üstünlüklər**:
  - Kanallar, mövzular, inteqrasiya imkanları, mobil tətbiqlər
  - Təhlükəsiz və korporativ istifadəyə uyğundur
  - On-prem və ya özəl buludda quraşdırıla bilər
- 🔗 [https://mattermost.com](https://mattermost.com)

#### 🥈 2. **Rocket.Chat**
> Fərdiləşdirilə bilən komanda çat platforması, federasiya dəstəyi ilə.

- ✅ **Üstünlüklər**:
  - Səs/video zənglər, qonaq girişi, botlar
  - Matrix, Slack və s. ilə inteqrasiya
  - Ətraflı rol və icazə idarəetməsi
- 🔗 [https://rocket.chat](https://rocket.chat)

---

### 📄 Öz Serverində Sənəd/PDF İdarəetməsi

#### 🥇 3. **Stirling PDF**
> Müasir interfeysli veb əsaslı PDF alətləri toplusu.

- ✅ **Üstünlüklər**:
  - PDF fayllarını birləşdirmə, ayırma, sıxışdırma, fırlatma, çevirmə
  - Bütün əməliyyatlar lokal işlədiyi üçün məxfi məlumatlar qorunur
- 🔗 [https://github.com/Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)

---

### 📆 Öz Serverində CRM və Biznes Alətləri

#### 🥇 4. **TwentyCRM (by TwentyHQ)**
> Müasir və açıq mənbə CRM sistemi.

- ✅ **Üstünlüklər**:
  - Müştəri əlaqələri, satış mərhələləri, email inteqrasiyası
  - React frontend və Elixir backend ilə hazırlanmışdır
- 🔗 [https://github.com/twentyhq/twenty](https://github.com/twentyhq/twenty)

---

### 📋 Bilik və Əməkdaşlıq Platformaları

#### 🥇 5. **AFFiNE**
> Notion/Obsidian alternativi – sənədlər, vəzifələr və taxta əsaslı əməkdaşlıq üçün açıq mənbə platforma.

- ✅ **Üstünlüklər**:
  - Markdown dəstəyi, kanban lövhələri, whiteboard interfeysi
  - Lokal-first, offline istifadə və əməkdaşlıq
- 🔗 [https://github.com/toeverything/AFFiNE](https://github.com/toeverything/AFFiNE)

---

### 🚀 Uzaqdan Giriş və Ekran İdarəetməsi

#### 🥇 6. **RustDesk**
> TeamViewer və AnyDesk üçün açıq mənbə alternativ – uzaq masaüstü nəzarəti.

- ✅ **Üstünlüklər**:
  - Sonadək şifrələmə
  - NAT traversal və relay server dəstəyi
  - Çoxplatformalı dəstək (desktop və mobil)
- 🔗 [https://rustdesk.com](https://rustdesk.com)

---

### 📊 Daxili Tətbiq Qurucuları və Məlumat Platformaları

#### 🥇 7. **NocoBase**
> İstifadəçi interfeysi ilə daxili sistemlər və axınlar yaratmaq üçün low-code platforma.

- ✅ **Üstünlüklər**:
  - Vizual verilənlər bazası dizaynı, icazə nəzarəti, API yaratmaq
  - CRM, CMS və dashboardlar üçün uyğundur
  - Plugin əsaslı və genişləndirilə bilər
- 🔗 [https://github.com/nocobase/nocobase](https://github.com/nocobase/nocobase)

</details>

---



## 🔚 Nəticə
Açıq mənbə qısayol deyil — bu bir düşüncə tərzidir. Düzgün planlama ilə, sıfır büdcə ilə belə güclü müdafiə sistemi qurmaq mümkündür.
Hər bir alətin öz üstünlükləri və çatışmazlıqları var, buna görə də ehtiyaclarınıza uyğun olanları seçmək vacibdir.