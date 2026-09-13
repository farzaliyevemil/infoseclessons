---
id: linux-basic-commands
title: Linux Əsas Komandaları — İş Azərbaycanı
description: İT və təhlükəsizlik mühəndisinin hər gün istifadə etdiyi Linux komandaları — naviqasiya, fayl idarəetməsi, mətn yoxlaması, icazələr, proseslər və arxivlər — hər birinə təhlükəsizlik qeydləri ilə.
slug: /operating-systems/linux/basic-commands
sidebar_position: 2
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - linux
  - komandalar
  - bash
  - naviqasiya
  - grep
  - icazələr
  - proseslər
  - tar
difficulty: foundation
---

# Linux Əsas Komandaları

[Linux Fundamentals](/operating-systems/linux/fundamentals) sistemin necə qurulduğunu izah edir; bu dərs isə onun içində işlədiyiniz iş lüğətidir. Buradakı hər komanda istənilən əsas bölgüşdürmədə işləyir və hadisə taym-layn-larında, runbook-larda və müsahibələrdə daim rast gəlinir. Məqsəd əzbərlik deyil — sistemdə _gəzə bilən və ona suallar verə bilən_ olmaqdır, axtarış motoruna əl uzatmadan.

## Naviqasiya və yoxlama

```bash
pwd                     # hardayam — cari qovluq
ls -lah                 # siyahı: oxunaqlı ölçü + gizli fayllar
cd /var/log             # qovluq dəyiş (cd - əvvəlki qovluğa qaytarır)
tree -L 2               # iki səviyyəli kataloq ağacı (paket menecerindən quraşdırılır)
file report.bin         # bu fayl əslində nədir?
stat file.txt           # vaxt damğaları, sahiblik, icazələr — bir baxışda
df -h                   # fayl sistemləri üzrə disk yeri
du -sh /var/log         # qovluğun ölçüsü
free -h                 # yaddaş; load üçün uptime
```

`ls -lah` dəstək işində ən çox yazılan komandadır. `-h` ölçüləri oxunaqlı saxlayır, `-a` isə `.bash_history` kimi nöqtəli faylları göstərir — hansı ki, təhqiqatçının kompromitə olunmuş hesabda ilk oxuduğu fayllardan biridir.

## Tapmaq

```bash
find /etc -name "*.conf"              # adla, /etc altında
find / -mtime -1 -type f 2>/dev/null  # son 24 saatda dəyişən fayllar
find / -size +100M -type f 2>/dev/null
locate nginx.conf                     # sürətli, amma indeksi qədər təzə
which python3                         # bu komanda haradan resolve olunur?
history | tail -50                    # bu shell son zamanlarda nə işlədib?
```

`find` təhqiqatçının skalpeli: "alert atəşlənəndən bəri dəyişən hər şey" və "web root-da 100 MB-dan böyük hər fayl" hər ikisi bir sətirdir. `2>/dev/null` adi istifadəçi ilə skan edərkən vacib olmayan icazə xətalarını susdurur.

## Fayl oxumaq

```bash
cat config.yml                # kiçik fayllar, tam məzmun
less +F /var/log/syslog       # tail -f kimi, amma scroll ilə (dayandırmaq: Ctrl+C)
head -20 app.log
tail -100 app.log
tail -f /var/log/auth.log     # logu canlı izlə — SOC refleksi
grep -i "failed password" /var/log/auth.log
grep -rn "TODO" ./project/    # rekursiv, sətir nömrələri ilə
grep -c "error" app.log       # uyğunluqların sayı
diff old.conf new.conf        # iki fayl arasında nə dəyişdi
```

`grep`-ə məqsədli təcrübə lazımdır — hər log-analiz seansının yarısı odur (digər yarısı [Log Analysis](/blue-teaming/log-analysis)-dır). Əsaslarını keçən faydalı bayraqlar: `-v` (əks uyğunluq), `-E` (genişlənmiş regex), `-A 3 -B 1` (uyğunluğun ətrafında kontekst sətirləri).

## Fayl redaktəsi

Server işi terminal redaktorlarında keçir, GUI-də yox:

- **nano** — bir sətri dəyişməlisən deyəndə. `Ctrl+O` yadda saxlayır, `Ctrl+X` çıxır.
- **vim** — hər serverdə tapılan. Minimal sağ-qalma dəsti: `i` — yazmaq, `Esc`, `:wq` — saxla-çıx, `:q!` — saxlamadan çıx, `/text` — axtarış, `dd` — sətir silmək.

`sudo vim` əvəzinə `sudoedit /etc/ssh/sshd_config` üstünlük verin — o, kopyanı redaktə edib atomik geri yazır, beləcə korlanmış redaktə root-owned fayl yarada bilmir.

## İcazələr və sahiblik

Tam modelin öz dərsi var ([Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions)); gündəlik fe'llər bunlardır:

```bash
chmod 600 id_rsa            # yalnız sahib: oxu/yaz — SSH açar gigiyenası
chmod +x deploy.sh          # icra ediləbilən et
chown www-data:www-data /var/www/uploads -R
sudo -l                     # hansı komandaları root kimi işlədə bilərəm?
```

## Proseslər və xidmətlər

```bash
ps aux | grep nginx         # işləyirmi?
top                         # canlı görünüş (çıxmaq: q)
kill 12345                  # nəzakətlə dayandır (SIGTERM)
kill -9 12345               # son vasitə (SIGKILL) — təmizliksizdir, nadir istifadə edin
systemctl status nginx      # xidmətin vəziyyəti + son log sətirləri
sudo systemctl restart sshd
```

systemd-nin öz dərsi var ([Linux Services and systemd](/operating-systems/linux/systemd-services)); şimdilik `systemctl status` "korlanıbmı, niyə korlanıb" sualının ən sürətli cavabıdır — çünki ilk sətirlərində unit-in son jurnal qeydləri var.

## Arxivlər və transfer

```bash
tar -czf logs.tar.gz /var/log/app/    # gzip arxiv yarat
tar -xzf logs.tar.gz                  # aç
tar -tzf logs.tar.gz                  # açmadan məzmunu siyahıla
scp evidence.tar.gz analyst@10.0.0.5:/tmp/
rsync -avz /data/ backup@host:/backup/data/   # səmərəli inkremental sync
```

Sistemə toxunmazdan əvvəl sübutları `tar` ilə toplayın: `tar -czf /tmp/$(hostname)-$(date +%F).tar.gz /var/log /etc` — hər hadisə review-un soruşduğu iki kataloqu yığır.

## Minimal sahə dəsti

Başqa heç nə xatırlamasanız, bu altılıq "bu maşında nə baş verir" suallarının əksəriyyətini cavablandırır:

```bash
uptime && free -h && df -h        # load, yaddaş, disk
ps aux --sort=-%cpu | head        # ən çox CPU yeyənlər
ss -tulpn                         # dinləyən portlar və sahib proseslər
tail -100 /var/log/syslog         # son sistem hadisələri
last -20                          # son girişlər
```

`ss -tulpn`-ə xüsusi söz: tanımadığınız hər sistemdə "nə dinləyir və sahibi kimdir" sualını cavablandırır — ilk triajın və kompromis qiymətləndirmələrinin arxasında duran sual budur.

## Növbəti addım

- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) — `chmod` və `chown`-un arxasındakı model.
- [Linux Services and systemd](/operating-systems/linux/systemd-services) — `systemctl restart`-dan irəli.
- [Linux Hardening](/operating-systems/linux/hardening) — defolt quraşdırmanı müdafiə olunana çevirmək.
