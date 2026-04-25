---
id: linux-fundamentals
title: Linux Fundamentals
description: Arxitektura, bölüşdürmələr, fayl sistemi iyerarxiyası, shell, istifadəçilər və icazələr, paket menecerləri, xidmətlər, proseslər, şəbəkə və loglar — SOC/IT mühəndisi üçün baza Linux savadı.
slug: /operating-systems/linux/fundamentals
sidebar_position: 1
status: reference
last_reviewed: 2026-04-23
keywords:
  - linux
  - fundamentals
  - bash
  - filesystem hierarchy
  - permissions
  - systemd
  - package manager
  - processes
  - syslog
difficulty: foundation
---

# Linux Fundamentals

Hər bir infosec mühəndisi Linux-u sərbəst oxuya bilməlidir — ona görə yox ki, Linux dəbdədir, ona görə ki, müdafiə etdiyiniz, hücum etdiyiniz və araşdırdığınız hər şey onun üzərində işləyir. Veb serverlər, verilənlər bazaları, mail relay-lər, DNS resolverlər, firewall-lar, VPN gateway-lər, load balancer-lər, Kubernetes node-ları, konteyner image-ləri, əksər SIEM log kollektorları, hər ciddi pentest bölüşdürməsi və bulud iş yüklərinin böyük hissəsi Linux-dur. Windows korporativ desktopu udur; Linux qalan hər şeyi udur. Əgər shell-də gəzə bilmirsinizsə, `/var/log/auth.log` faylını oxuya bilmirsinizsə və ya bir xidmətin `systemd` ilə, yoxsa SysV ilə idarə olunduğunu deyə bilmirsinizsə, hadisələrin əksəriyyətinin baş verdiyi infrastrukturun yarısında kor olacaqsınız.

Bu dərs baza savaddır. Komanda arayışı deyil — onun üçün [Linux Basic Commands](/operating-systems/linux/basic-commands) səhifəsinə baxın — və dərin nüvə daxili kursu da deyil. Bu, mental modeldir: Linux nədən ibarətdir, parçalar bir-biri ilə necə uyğunlaşır, konfiqurasiya və loglar harada yaşayır, icazələr necə işləyir və bir SOC analitiki, sysadmin və ya pentester olaraq hər gün yazacağınız bir neçə komanda. Bundan sonra Kali, konteynerdəki Alpine, kilidlənmiş RHEL serveri və Proxmox host-u sizə müxtəlif köynəklər geymiş eyni əməliyyat sistemi kimi görünəcək.

## Arxitektura iki dəqiqədə

Linux sistemi aparat üzərində qurulmuş dörd təbəqədir. Bu yığını başa düşmək sizə hansı təbəqənin probleminə baxmaq lazım olduğunu deyir.

```mermaid
flowchart TB
    HW[Aparat<br/>CPU, RAM, disklər, NIC-lər]
    K[Nüvə (Kernel)<br/>proses planlayıcısı, yaddaş meneceri,<br/>VFS, şəbəkə yığını, sürücülər]
    LIB[Sistem kitabxanaları<br/>glibc, libssl, libsystemd, ...]
    US[Userspace<br/>shell-lər, daemon-lar, CLI alətləri, tətbiqlər]
    SH[Shell / TTY / SSH<br/>əslində daxil olduğunuz interfeys]

    HW --> K
    K --> LIB
    LIB --> US
    US --> SH
```

- **Nüvə (Kernel).** Bir binar (`/boot/vmlinuz-*`). Prosesləri planlayır, yaddaşı idarə edir, aparata girişi tənzimləyir, icazələri tətbiq edir, TCP/IP yığınını həyata keçirir. Yalnız o, CPU-nun imtiyazlı rejimində işləyir.
- **Sistem kitabxanaları.** Paylaşılan kod (`/lib`, `/usr/lib`). `glibc` proqramlara C standart kitabxanası verir; `libssl` TLS-i; `libsystemd` jurnalı. Bir kitabxana yenilənərsə və işləyən daemon hələ də köhnə versiyanı yaddaşa yükləyibsə, daemon-u yenidən başlatmaq lazımdır — Debian-da `needrestart` məhz bunun üçün mövcuddur.
- **Userspace.** Nüvə olmayan hər şey. Daemon-lar (`sshd`, `nginx`), CLI alətləri (`ls`, `grep`), dil mühitləri (`python`, `node`), öz prosesləriniz. İmtiyazsız rejimdə işləyir və nüvə ilə **sistem çağırışları** vasitəsilə (`open`, `read`, `socket` və s.) əlaqə qurur.
- **Shell.** `bash`/`zsh`/`sh` — hər hansı digər proqram kimi bir proqram, lakin həyatınızı içində keçirdiyiniz proqram. Komandaları parse edir, glob-ları açır, pipeline-ları idarə edir və skriptləri icra edir.

"Linux" ciddi mənada nüvəni bildirir. Quraşdırdığınız şey **bölüşdürmə** (distribution) adlanır — nüvə üstəgəl GNU alətləri, paket meneceri, init sistemi və onu istifadə oluna bilən hala gətirən defolt parametrlər.

## Bölüşdürmələr (distrolar arasında əslində nə dəyişir)

Minlərlə distro var. Hamısını yadda saxlamağa ehtiyac yoxdur — verilmiş bir maşının hansı **ailəyə** aid olduğunu tanımağı bacarmalısınız, çünki ailə hansı komandaların işləyəcəyini müəyyən edir.

| Ailə | Nümunələr | Init | Defolt paket meneceri | Defolt firewall | Təhlükəsizlik əlavələri |
|---|---|---|---|---|---|
| Debian | Debian, Ubuntu, Kali, Mint | systemd | `apt` / `dpkg` (`.deb`) | `ufw` və ya `nftables` | Defolt olaraq AppArmor |
| RHEL | RHEL, Rocky, AlmaLinux, CentOS Stream, Fedora | systemd | `dnf` (əvvəllər `yum`) / `rpm` (`.rpm`) | `firewalld` / `nftables` | Defolt olaraq SELinux |
| Arch | Arch, Manjaro, BlackArch | systemd | `pacman` | `iptables`/`nftables` (özün gətir) | AUR, çox güncəl paketlər |
| Alpine | Alpine, əksər konteyner baza image-ləri | OpenRC (systemd deyil) | `apk` | `iptables`/`nftables` | `musl` libc, çox kiçik ölçü |
| SUSE | openSUSE, SLES | systemd | `zypper` / `rpm` | `firewalld` | SELinux/AppArmor |

Praktik nəticələr:

- Debian/Ubuntu maşınında `apt install nginx` yazırsınız. Rocky maşınında `dnf install nginx`. Alpine-da `apk add nginx`. Eyni daemon — fərqli sarğı.
- AppArmor (Debian ailəsi) yol əsaslı profillərdən istifadə edir; SELinux (RHEL ailəsi) etiketlərdən. Hər ikisi daemon-un "gözlənilməz" bir şey etməsini səssizcə bloklaya bilər və hər ikisi bunu etdikdə loglarda görünür.
- Konteyner baza image-ləri əsasən Alpine və ya Debian-slim-dir. Konteynerləşdirilmiş alətiniz başlamırsa, ilk sual hansı ailə olmasıdır — Alpine image-i içində `apt` komandası klassik birinci gün səhvidir.

Əlli distronu yadda saxlamaq mənasızdır. On saniyədə Debian-ailəsi vs RHEL-ailəsi vs Alpine-ı tanımaq əsas bacarıqdır.

## Fayl sistemi iyerarxiyası

Linux-da bütün ağac `/` ilə kökündən başlayır. Hər şey — disklər, qurğular, şəbəkə paylaşımları, virtual fayl sistemləri — onun içində bir yerə mount olunur. `C:\` yoxdur və ayrı `D:\` yoxdur; başqa bir disk `/mnt/data` və ya hara mount etdiyinizsə oraya çıxır. Standart `man 7 hier` və Filesystem Hierarchy Standard (FHS) sənədlərində təsvir olunub.

| Yol | Təyinatı | Nümunə |
|---|---|---|
| `/bin`, `/sbin` | Əsas binarlar (əsas komandalar, admin alətləri). Müasir distrolarda bunlar `/usr/bin`, `/usr/sbin` üçün symlink-dir. | `/bin/bash`, `/sbin/ip` |
| `/boot` | Nüvə, initramfs, bootloader konfiqurasiyası. | `/boot/vmlinuz-6.8.0`, `/boot/grub/grub.cfg` |
| `/etc` | Sistem miqyaslı konfiqurasiya. **Hamısı mətn**, binar yoxdur. Serveri başa düşmək üçün baxmalı olduğunuz ilk yer. | `/etc/ssh/sshd_config`, `/etc/nginx/nginx.conf` |
| `/home` | İstifadəçi ev qovluqları. Şəxsi fayllar, dotfile-lar, hər istifadəçi üçün konfiqurasiya. | `/home/alice`, `/home/alice/.ssh/` |
| `/root` | `root` istifadəçisinin ev qovluğu. `/home` altında deyil. | `/root/.bash_history` |
| `/var` | Dəyişən verilənlər — loglar, spool növbələri, keş, verilənlər bazaları. Vaxt ötdükcə böyüyür. | `/var/log/auth.log`, `/var/lib/mysql/` |
| `/tmp` | Hamı tərəfindən yazıla bilən müvəqqəti sahə. Əksər distrolarda yenidən başladıqda silinir. | `/tmp/unzipped-archive/` |
| `/opt` | FHS paketləməsinə uyğun olmayan üçüncü tərəf proqram təminatı. | `/opt/splunkforwarder/`, `/opt/nessus/` |
| `/usr` | İstifadəçi səviyyəli proqramlar və yalnız oxunan verilənlər. Ən böyük qovluq. | `/usr/bin/python3`, `/usr/share/man/` |
| `/usr/local` | Admin tərəfindən kompilyasiya/quraşdırılmış proqramlar — distro tərəfindən yox. | `/usr/local/bin/custom-script` |
| `/proc` | Nüvə və proses vəziyyətini göstərən virtual fayl sistemi. Real fayllar deyil. | `/proc/cpuinfo`, `/proc/1234/status` |
| `/sys` | Qurğuları, sürücüləri və nüvə parametrlərini göstərən virtual fayl sistemi. | `/sys/class/net/eth0/`, `/sys/kernel/` |
| `/dev` | Qurğu faylları. Hər şey fayldır — disklər (`/dev/sda`) və terminallar (`/dev/pts/0`) daxil. | `/dev/null`, `/dev/random`, `/dev/sda1` |
| `/run` | Son boot-dan bəri çalışma vəziyyəti (PID-lər, soketlər). Tmpfs — yenidən başladıqda silinir. | `/run/sshd.pid`, `/run/systemd/` |
| `/mnt`, `/media` | Manual mount-lar (`/mnt`) və çıxarılan media (`/media`) üçün mount nöqtələri. | `/mnt/backup/`, `/media/usb0/` |

**Vaxt qazandıran iki qayda.** Birinci: konfiqurasiya `/etc`-də, dəyişən verilənlər `/var`-da yaşayır, qalanı isə əslində yalnız oxunan kimi qəbul edilir. İkinci: `/proc` və `/sys` disk deyil — onlar nüvəyə açılan pəncərələrdir. `/proc/net/tcp` faylını oxumaq sizə heç bir alət olmadan maşındakı hər açıq TCP bağlantısını göstərir.

## İstifadəçilər, qruplar, icazələr

Linux dizaynına görə çox istifadəçilidir. Hər proses hansısa istifadəçi və hansısa qruplar dəsti ilə işləyir və hər fayl bir istifadəçi və bir qrup tərəfindən sahib olunur.

### Hesablar

Üç fayl hesab verilənlərini saxlayır:

- **`/etc/passwd`** — hər istifadəçi üçün bir sətir. Sahələr: ad, x (yer tutucu), UID, GID, GECOS, ev, shell. Hamı üçün oxuna bilən.
- **`/etc/shadow`** — parol hash-ləri və yaşlanma. Yalnız root üçün oxuna bilən.
- **`/etc/group`** — qruplar və onların üzvləri.

```text
# /etc/passwd
alice:x:1001:1001:Alice,,,:/home/alice:/bin/bash

# /etc/shadow (qısaldılmış)
alice:$y$j9T$...:20100:0:99999:7:::
```

- **UID 0** həmişə `root`-dur. Başqa heç nə.
- UID 1–999 sistem hesablarıdır (`sshd`, `www-data`, `postgres`, ...). Çoxunun shell-i `/usr/sbin/nologin`-dir ki, heç kim onlar kimi giriş edə bilməsin.
- UID 1000+ insan hesablarıdır.

### `sudo` ilə imtiyaz artırılması

Root kimi giriş etmək məsləhət görülmür. Bunun əvəzinə insanlar öz hesablarına sahibdirlər və ayrı-ayrı komandaları root kimi icra etmək üçün `sudo` istifadə edirlər. Siyasət `/etc/sudoers` faylındadır (yalnız `visudo` ilə redaktə edin, heç vaxt sadə mətn redaktoru ilə yox — `visudo` sintaksisi yoxlayır, qırıq sudoers faylı sizi çölə qıfıllaya bilər):

```text
# 'sudo' qrupunun üzvlərinə hər şeyi parolla icra etməyə icazə ver
%sudo   ALL=(ALL:ALL) ALL

# backup istifadəçisinə rsync-i parolsuz root kimi icra etməyə icazə ver
backup  ALL=(root) NOPASSWD: /usr/bin/rsync
```

### Fayl icazələri

Hər fayl üç icazə dəstinə malikdir: sahib, qrup, digər. Hər dəstdə oxuma (`r`), yazma (`w`), icra (`x`) var. `ls -l` onları göstərir:

```text
$ ls -l /etc/shadow /bin/ls /home/alice/
-rw-r----- 1 root    shadow  1534 Apr 10 12:01 /etc/shadow
-rwxr-xr-x 1 root    root  142144 Mar 15 09:22 /bin/ls
drwx------ 3 alice   alice    4096 Apr 22 18:03 /home/alice/
```

Belə oxuyun: növ (`-` fayl, `d` qovluq, `l` symlink), sonra sahib/qrup/digər üçlüklər.

| Oktal | Mənası | Nə vaxt istifadə edilir |
|---|---|---|
| `755` (`rwxr-xr-x`) | Sahib tam, digərləri oxuma+icra | Binarlar, skriptlər, qovluqlar |
| `644` (`rw-r--r--`) | Sahib oxuma+yazma, digərləri oxuma | Adi fayllar (konfiq, sənədlər) |
| `600` (`rw-------`) | Yalnız sahib | Sirlər, SSH özəl açarlar |
| `700` (`rwx------`) | Yalnız sahib, icra ediləbilən | Şəxsi skriptlər, `~/.ssh/` |
| `777` (`rwxrwxrwx`) | Hamı üçün yazıla bilən | **Demək olar ki, heç vaxt düzgün deyil** |

`chmod` ilə dəyişin:

```bash
chmod 755 deploy.sh          # ədədi
chmod u+x deploy.sh          # simvolik: istifadəçi üçün icra əlavə et
chmod -R g+w /srv/shared     # rekursiv
chown alice:devops file.txt  # sahibi və qrupu dəyiş
```

### Xüsusi bitlər: SUID, SGID, sticky

rwx-in üstündə üç bit davranışı dəyişir:

- **SUID** (`rwsr-xr-x`, oktal `4xxx`) — fayl icra edildikdə **çağıran kimi yox, sahibi kimi** işləyir. `/usr/bin/passwd` SUID root-dur ki, normal istifadəçilər `/etc/shadow` faylındakı öz hash-lərini yeniləyə bilsinlər.
- **SGID** (`rwxr-sr-x`, oktal `2xxx`) — qrup üçün eyni ideya. Qovluqda yeni fayllar qovluğun qrupunu miras alır.
- **Sticky bit** (`rwxrwxrwt`, oktal `1xxx`) — qovluqda istifadəçilər yalnız özlərinə məxsus faylları silə bilər. Buna görə `/tmp` `drwxrwxrwt`-dir.

SUID binarlar həm də klassik **imtiyaz artırılması** yoludur. Hücumçu SUID-root shell ata bilərsə və ya yanlış konfiqurasiya olunmuş `find` və ya `vim.basic` kimi qüsurlu SUID binarından sui-istifadə edə bilərsə, `www-data`-dan root-a keçir. Pentester-in yeni maşında ilk işlərindən biri hər SUID binarı siyahıya almaq və GTFOBins ilə müqayisə etmək üçün `find / -perm -4000 -type f 2>/dev/null` icra etməkdir. Pentest dərslərində buna daha dərindən baxacağıq — hələlik bilməlisiniz ki, "root-a məxsus SUID binar" sadəcə dekorasiya deyil, hücum səthidir.

## Buraxa bilməyəcəyiniz shell əsasları

Shell yazdığınızı parse edən, açan və icra edən proqramdır. Üç məşhur shell:

- **`bash`** — GNU Bourne Again Shell. Debian, Ubuntu, RHEL üzərində defolt. Hər ciddi Linux mühəndisi `bash` bilir.
- **`zsh`** — Z shell. macOS və bir çox developer noutbukunda defolt. Daha yaxşı tamamlama, prompt mövzuları (Oh My Zsh).
- **`fish`** — dost, müəyyən fikirli, POSIX-uyğun deyil. Gündəlik interaktiv iş üçün əla, daşına bilən skriptlər üçün uyğun deyil.

Hər yerdə işləməli olan skriptlər üçün `#!/bin/sh` (POSIX) yazın. İnteraktiv istifadə üçün — sevdiyinizi seçin.

### Yönləndirmə və pipe-lar

```bash
cmd > file            # stdout-u fayla (üzərinə yaz)
cmd >> file           # stdout-u fayla (sonuna əlavə et)
cmd 2> errors.log     # stderr-i fayla
cmd > out.log 2>&1    # stdout və stderr birlikdə
cmd < input.txt       # stdin-i fayldan
cmd1 | cmd2           # cmd1-in stdout-u cmd2-nin stdin-i olur
cmd &                 # arxa planda işlət
```

`2>&1` hamının unutduğu olandır: "fayl deskriptoru 2-ni (stderr) hazırda fd 1-in (stdout) getdiyi yerə yönləndir." Sıra önəmlidir: `> out.log 2>&1` onları birləşdirir; `2>&1 > out.log` etmir.

### Globbing

```bash
ls *.log            # .log ilə bitən hər fayl
ls access-202?.log  # bir simvollu joker
ls file[12].txt     # file1.txt və ya file2.txt
ls **/*.conf        # rekursiv (bash >= 4 + shopt -s globstar)
```

### Mühit dəyişənləri

```bash
echo $PATH       # komandalar üçün axtarılan qovluqların iki nöqtə ilə ayrılmış siyahısı
echo $HOME       # ev qovluğunuz
echo $USER       # istifadəçi adınız
export API_KEY=secret   # uşaq proseslərə ötür
env              # bütün mühiti göstər
```

`$PATH` xüsusi hörmətə layiqdir. `nginx` yazdıqda shell hər `$PATH` qovluğuna sırasıyla baxır və ilk uyğun gələni icra edir. `/usr/bin`-dən əvvəl `$PATH`-də yazıla bilən qovluq imtiyaz artırılması fəndidir.

### Dotfile-lar

Ev qovluğunuzdakı başlanğıc skriptləri:

- `~/.bashrc` — hər interaktiv shell üçün işləyir. Alias-lar və prompt burada yaşayır.
- `~/.bash_profile` / `~/.profile` — giriş zamanı bir dəfə işləyir. Mühit dəyişənləri buraya gedir.
- `~/.ssh/config` — istifadəçi başına SSH klient konfiqurasiyası.
- `~/.bash_history` — komanda tarixi. Araşdırmalarda dəyərlidir.

## Paket menecerləri

Hər distro ailəsinin özünəməxsusudur. Eyni iş — quraşdır, sil, yenilə, axtar — fərqli sintaksis.

| Tapşırıq | Debian / Ubuntu (`apt`) | RHEL / Rocky (`dnf`) | Arch (`pacman`) | Alpine (`apk`) |
|---|---|---|---|---|
| İndeksi yenilə | `apt update` | `dnf check-update` | `pacman -Sy` | `apk update` |
| Quraşdır | `apt install nginx` | `dnf install nginx` | `pacman -S nginx` | `apk add nginx` |
| Sil | `apt remove nginx` | `dnf remove nginx` | `pacman -R nginx` | `apk del nginx` |
| Hamısını yenilə | `apt upgrade` | `dnf upgrade` | `pacman -Syu` | `apk upgrade` |
| Axtar | `apt search nginx` | `dnf search nginx` | `pacman -Ss nginx` | `apk search nginx` |
| Məlumat göstər | `apt show nginx` | `dnf info nginx` | `pacman -Si nginx` | `apk info nginx` |
| Paketdəki faylları göstər | `dpkg -L nginx` | `rpm -ql nginx` | `pacman -Ql nginx` | `apk info -L nginx` |
| Faylın hansı paketə aid olduğu | `dpkg -S /path` | `rpm -qf /path` | `pacman -Qo /path` | `apk info --who-owns /path` |

### Universal paketləmə

Yerli menecerlərin üzərində üç distro-arası format var:

- **Snap** (Canonical, `snapd`) — konteynerləşdirilmiş paketlər. Ubuntu desktop üzərində çox istifadə olunur. `snap install code`.
- **Flatpak** — oxşar ideya, Fedora/KDE ekosistemində daha məşhur. `flatpak install flathub org.videolan.VLC`.
- **AppImage** — hər şeyi bağlayan tək icra olunan fayl. Quraşdırıcı tələb olunmur. `chmod +x foo.AppImage && ./foo.AppImage`.

İnfosec kontekstlərində demək olar ki, həmişə distro deposundan və ya rəsmi vendor deposundan yerli paket istəyirsiniz — təhlükəsizlik yeniləmələrinin hədəfi məhz odur. Flatpak/Snap rahatdır, lakin təhlükəsizlik məsləhətlərində geri qalır.

## systemd: xidmətlər, unit-lər, jurnal

Demək olar ki, hər müasir Linux-da (Debian/Ubuntu/RHEL/Arch/SUSE/Fedora 2015-dən bəri) **systemd** PID 1-dir. O, sistemi başladır, xidmətləri nəzarətdə saxlayır, taymerlər icra edir (systemd sistemlərində cron-un müasir əvəzi), loglaşdırmanı idarə edir, istifadəçi sessiyalarını idarə edir və daha çox. Alpine və bir neçə xüsusi distro hələ də köhnə init sistemlərindən istifadə edir (OpenRC, runit, SysV); onlardan kənarda systemd-ni qəbul edə bilərsiniz.

### Unit-lər

systemd-nin idarə etdiyi hər şey **unit**-dir: xidmət, soket, taymer, mount, target. Unit faylları iki yerdə yaşayır:

- `/lib/systemd/system/` (və ya `/usr/lib/systemd/system/`) — paketlər tərəfindən göndərilir. Bunları birbaşa redaktə etməyin.
- `/etc/systemd/system/` — sizin override-larınız və öz unit-lərinizdir. Bu, vendor surətindən üstündür.

Minimal xidmət unit-i:

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Python app
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=myapp
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/python3 /opt/myapp/app.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Unit faylı yaratdıqdan və ya redaktə etdikdən sonra `start` və ya `restart`-dan əvvəl həmişə `systemctl daemon-reload` icra edin — systemd unit-ləri keş-də saxlayır.

### Gündəlik komandalar

```bash
systemctl status sshd          # işləyirmi? son çıxış kodu? son log sətirləri?
systemctl start  sshd          # indi başlat
systemctl stop   sshd          # indi dayandır
systemctl restart sshd         # dayandır + başlat
systemctl reload sshd          # daemon-dan konfiqurasiyanı yenidən oxumağı xahiş et
systemctl enable sshd          # boot-da başlat
systemctl disable sshd         # boot-da başlatma
systemctl enable --now sshd    # bir dəfəyə həm enable, həm start
systemctl list-units --failed  # indi nə qırılıb
systemctl list-timers          # planlaşdırılmış işlər
```

### journalctl

systemd **bütün** logları (nüvədən, hər xidmətdən) strukturlaşdırılmış binar jurnala toplayır. `journalctl` ilə sorğu edirsiniz:

```bash
journalctl -u sshd              # sshd-dən bütün loglar
journalctl -u sshd -f           # izlə (tail -f)
journalctl -u sshd --since "1 hour ago"
journalctl -u sshd -p err       # yalnız xətalar və daha pisi
journalctl -k                   # nüvə ring buffer
journalctl _UID=1001            # UID 1001-dən bütün loglar
journalctl --since today --grep "Failed password"
```

Defolt olaraq jurnal volatil-dir (RAM, yenidən başladıqda silinir). Onu davamlı etmək üçün `/var/log/journal/` qovluğunu yaradın və `systemd-journald`-ni yenidən başladın.

### Köhnə: SysV və `service`

Köhnə maşınlar (və bəzi minimal konteyner image-ləri) `/etc/init.d/` daxilində SysV init skriptləri və `service` komandasından istifadə edir (`service ssh status`). systemd `service` üçün uyğunluq qatı göndərir, ona görə komanda adətən hələ də işləyir — lakin müasir hər şeydə əvvəlcə `systemctl`-yə müraciət edin. `systemctl` uğursuz olarsa, sistemin systemd əsaslı olmadığını bilirsiniz.

## Proseslər, siqnallar və əsas yoxlama

**Proses** işləyən proqramdır. Linux hər birinə PID, valideyn (PPID), istifadəçi və qrup, açıq fayllar, yaddaş xəritələri və vəziyyət verir. `ps`, `top`, `htop` ilə yoxlayın.

```text
$ ps aux | head
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 167456 11892 ?        Ss   Apr22   0:12 /sbin/init
root       823  0.0  0.2  15664  8932 ?        Ss   Apr22   0:03 /usr/sbin/sshd -D
www-data  1402  0.1  1.4 215340 58120 ?        S    Apr22   2:41 nginx: worker process
postgres  1501  0.0  2.2 418220 89240 ?        Ss   Apr22   0:55 postgres: main
alice    20411  0.0  0.1  13876  3520 pts/0    R+   10:14   0:00 ps aux
```

Önəmli sütunlar: USER (kim sahibdir), PID, %CPU, %MEM, TTY (`?` terminal yoxdur — daemon deməkdir), STAT (`S` yatır, `R` işləyir, `Z` zombi, `D` kəsilməz disk gözləməsi), COMMAND.

```bash
ps aux                      # hər proses, BSD-tipli çıxış
ps -ef                      # hər proses, System V çıxışı
ps -eo pid,user,pcpu,comm   # sütunları seç
top                         # interaktiv, canlı yenilənir
htop                        # daha gözəl top (quraşdırılmaq lazım ola bilər)
pgrep -a nginx              # "nginx" ilə uyğun gələn PID-lər və komanda sətirləri
pidof sshd                  # adlandırılmış prosesin PID-i
```

### Siqnallar

Prosesləri **siqnallar** göndərərək dayandırırsınız və ya yenidən konfiqurasiya edirsiniz:

| Siqnal | Nömrə | Nə edir |
|---|---|---|
| `SIGHUP` | 1 | Konfiqurasiyanı yenidən yüklə (konvensiya, məcburi deyil) |
| `SIGINT` | 2 | Ctrl-C — nəzakətli kəsmə |
| `SIGTERM` | 15 | "Zəhmət olmasa təmiz şəkildə bağlan." `kill`-in defoltu. |
| `SIGKILL` | 9 | Məcburi öldürmə. Nüvə səviyyəsində. Proses tələ qura və ya ignor edə bilməz. |
| `SIGSTOP` / `SIGCONT` | 19 / 18 | Pauza / davam et |

```bash
kill 1234          # PID 1234-ə SIGTERM göndər
kill -HUP 823      # sshd-yə SIGHUP (konfiqurasiyanı yenidən yüklə)
kill -9 4567       # SIGKILL — yalnız SIGTERM uğursuz olduqda
pkill nginx        # adı uyğun gələn hər prosesə siqnal göndər
killall -HUP nginx # eyni ideya
```

`SIGKILL` çəkicdir. Əvvəlcə `SIGTERM` istifadə edin, daemon-a bir neçə saniyə verin və yalnız sonra `-9`-a müraciət edin. Siqnalları tuta bilməyən daemon-lar (zombi, `D` kəsilməz gözləmə) hətta `SIGKILL`-ə də cavab verməyəcək — bu adətən ölən diskdə və ya qırılmış NFS mount-da ilişib qalmış I/O deməkdir.

### Yük ortalaması və `uptime`

```text
$ uptime
 10:14:02 up 3 days,  2:17,  2 users,  load average: 0.42, 0.58, 0.63
```

Load average son 1, 5 və 15 dəqiqə ərzində icra olunan və ya I/O gözləyən proseslərin orta sayıdır. 8 nüvəli maşında 8 yükü tam istifadə deməkdir; 16 hər nüvənin nəsə etdiyi və əlavə bir nüvəlik işin növbədə olduğu deməkdir. Yükü mütləq rəqəmlə yox, nüvə sayı ilə müqayisə edin.

## Şəbəkə üçün cheat-sheet

`ifconfig` və `route` köhnəlmişdir. Müasir alətlər `ip` (interfeyslər, marşrutlar) və `ss` (soketlər).

```bash
ip a                  # bütün interfeyslər və IP-lərini göstər
ip -br a              # interfeys başına bir sətirlik qısa görünüş
ip r                  # marşrut cədvəli
ip r get 1.1.1.1      # hansı interfeys + gateway o IP-yə çatardı?
ip neigh              # ARP / neighbour cədvəli

ss -tulpn             # PID ilə dinləyən TCP + UDP soketləri
ss -tanp              # hər TCP bağlantısı
ss -s                 # ümumi sayım

ping -c 4 example.local
traceroute example.local
mtr example.local     # traceroute + ping, davamlı
dig example.local
dig @8.8.8.8 example.local any
```

### DNS konfiqurasiyası

- `/etc/hosts` — statik girişlər. DNS-dən əvvəl yoxlanılır.
- `/etc/resolv.conf` — resolver-in istifadə etdiyi DNS serverləri. systemd-resolved sistemlərində bu, stub-a symlink-dir; əsl konfiqurasiya `/etc/systemd/resolved.conf`-dadır.
- `/etc/nsswitch.conf` — axtarış mənbələrinin sırası (`files dns` /etc/hosts əvvəlcə, sonra DNS deməkdir).

### İnterfeys konfiqurasiyası

- **NetworkManager** (`nmcli`, `nmtui`) — RHEL ailəsi desktop və serverlərində, Fedora-da, Ubuntu desktop-da defolt.
- **netplan** — `/etc/netplan/*.yaml` daxilində YAML konfiqurasiyası NetworkManager və ya systemd-networkd-yə render olunur. Ubuntu Server defoltu.
- **systemd-networkd** — `/etc/systemd/network/` altında birbaşa konfiqurasiya. Minimal / bulud image-lərində adi.
- **`/etc/network/interfaces`** — köhnə Debian `ifupdown`.

```bash
nmcli device status
nmcli con show
nmcli con modify "Wired connection 1" ipv4.addresses 10.0.0.50/24 ipv4.gateway 10.0.0.1 ipv4.method manual
nmcli con up "Wired connection 1"
```

### Firewall-lar

Hamısı son nəticədə nüvənin `netfilter` alt sistemi ilə əlaqə quran üç təbəqə:

- **`ufw`** (Ubuntu): dost ön panel. `ufw allow 22/tcp`, `ufw enable`.
- **`firewalld`** (RHEL): zona əsaslı. `firewall-cmd --add-service=ssh --permanent && firewall-cmd --reload`.
- **`nftables`** / **`iptables`** (hamı): xam qayda dili. `ufw` və `firewalld` bu qaydaları yaradır.

Yeni serverdə bir firewall alətinə qərar verin və heç vaxt qarışdırmayın. `ufw` və `firewalld`-nin bir-birini tapdalaması müəmmalı kəsilmələrin adi mənbəyidir.

## Loglar əslində harada yaşayır

Loglar distrodan asılı olaraq iki əsas yerdə bitir: `/var/log/` altında düz mətn və `journalctl` ilə sorğu olunan systemd jurnalı. Əksər müasir Linux-da hər ikisi mövcuddur — mətn faylları jurnaldan oxuyan `rsyslog` tərəfindən yazılır.

| Fayl / hədəf | Nə var | Distro |
|---|---|---|
| `/var/log/syslog` | Ümumi sistem mesajları | Debian/Ubuntu |
| `/var/log/messages` | Ümumi sistem mesajları | RHEL ailəsi |
| `/var/log/auth.log` | Autentifikasiya (SSH, sudo, PAM, login) | Debian/Ubuntu |
| `/var/log/secure` | Autentifikasiya | RHEL ailəsi |
| `/var/log/kern.log` | Nüvə ring buffer | Debian/Ubuntu |
| `/var/log/dmesg` | Nüvə boot mesajları | Hamı |
| `/var/log/apt/` | Paket quraşdırma tarixçəsi | Debian/Ubuntu |
| `/var/log/dnf.log` | Paket quraşdırma tarixçəsi | RHEL ailəsi |
| `/var/log/nginx/access.log`, `error.log` | Veb server | nginx quraşdırılıbsa |
| `/var/log/audit/audit.log` | SELinux / Linux audit framework | RHEL ailəsi |
| `journalctl` (systemd jurnalı) | systemd xidmətlərinin yazdığı hər şey | Bütün systemd sistemləri |

### Hadisə triajı nümunəsi — SSH brute-force

İlk iş günü adi tapşırığı: server ləng işləyib, brute-force-dan şübhələnirsiniz. `/var/log/auth.log` (Debian/Ubuntu) və ya `/var/log/secure` (RHEL) faylını açıb grep edin:

```text
$ sudo grep "Failed password" /var/log/auth.log | tail
Apr 22 10:11:02 web01 sshd[20411]: Failed password for root from 203.0.113.42 port 51884 ssh2
Apr 22 10:11:04 web01 sshd[20411]: Failed password for root from 203.0.113.42 port 51884 ssh2
Apr 22 10:11:06 web01 sshd[20413]: Failed password for invalid user admin from 203.0.113.42 port 52022 ssh2
Apr 22 10:11:08 web01 sshd[20413]: Failed password for invalid user oracle from 203.0.113.42 port 52022 ssh2
Apr 22 10:11:10 web01 sshd[20413]: Failed password for invalid user ubuntu from 203.0.113.42 port 52022 ssh2
```

İndi günahkar IP-ləri sayın:

```bash
sudo grep "Failed password" /var/log/auth.log \
    | awk '{print $(NF-3)}' \
    | sort | uniq -c | sort -rn | head
```

Və ya jurnalla:

```bash
sudo journalctl -u ssh --since "24 hours ago" --grep "Failed password" \
    | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head
```

Çıxış sizə hansı IP-lərin SSH-ı döydüyünü deyir — onları `fail2ban`-a, firewall blokuna və ya SIEM aşkarlama qaydasına ötürün.

## Hands-on

Hər Ubuntu 24.04 VM-də edə biləcəyiniz beş tapşırıq. İstehsalat maşınına toxunmazdan əvvəl bir-birinə atılan VM (və ya konteyner) yaradın.

### 1. İstifadəçi və ikinci dərəcəli qrup yarat

```bash
sudo groupadd devops
sudo useradd -m -s /bin/bash -G devops alice
sudo passwd alice           # parolu təyin et
id alice                    # uid, gid, qruplar
groups alice
getent passwd alice         # /etc/passwd-dan sətir
```

`-m` ev qovluğunu yaradır, `-s` giriş shell-ini təyin edir, `-G` ikinci dərəcəli qrupları əlavə edir.

### 2. Bütün SUID binarları tap

```bash
find / -perm -4000 -type f 2>/dev/null
```

Ubuntu-da gözlənilən: `/usr/bin/passwd`, `/usr/bin/su`, `/usr/bin/sudo`, `/usr/bin/mount`, `/usr/bin/umount`, `/usr/bin/chsh`, `/usr/bin/chfn`, `/usr/bin/newgrp`, `/usr/bin/gpasswd`. Yenicə quraşdırılmış sistemdə bu siyahıdan kənarda hər şey araşdırmağa dəyər. [GTFOBins](https://gtfobins.github.io/) ilə yoxlayın — `find` və ya `vim` çıxan "adi görünüşlü" SUID binar deməkdir ki, kimsə onu məqsədli şəkildə qoyub.

### 3. `sshd`-ni enable et, jurnalını izlə, brute-force-a bax

```bash
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
sudo systemctl status ssh
sudo journalctl -u ssh -f
```

Başqa host-dan (və ya konteynerdən) bir neçə pis giriş cəhd edin:

```bash
for u in root admin test; do
  sshpass -p wrong ssh -o StrictHostKeyChecking=no "$u@<vm-ip>" true 2>/dev/null
done
```

VM-də `Failed password` sətirlərinin sürüşməsinə baxın. Məhz bunu `fail2ban` oxuyur.

### 4. Toy systemd unit yaz və yenidən başlatdan sağ çıx

```bash
sudo tee /opt/hello.py >/dev/null <<'EOF'
#!/usr/bin/env python3
import time
while True:
    print("hello from systemd")
    time.sleep(5)
EOF
sudo chmod +x /opt/hello.py

sudo tee /etc/systemd/system/hello.service >/dev/null <<'EOF'
[Unit]
Description=Hello from systemd
After=network-online.target

[Service]
ExecStart=/opt/hello.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now hello
journalctl -u hello -f
sudo reboot
# qayıtdıqdan sonra:
systemctl status hello
```

### 5. Son 24 saatda uğursuz SSH girişlərini say

```bash
sudo journalctl -u ssh --since "24 hours ago" --grep "Failed password" \
    | awk '{print $(NF-3)}' \
    | sort | uniq -c | sort -rn
```

Cavab: birinci sütun cəhdlərdir, ikinci sütun mənbə IP-dir. Yuxarı IP-də minlərlə vurğu varsa — bu botdur; bloklayın.

## Worked example — yeni example.local veb VM-ni hardening etmək

Sizə `web01.example.local` adlı vanilla Ubuntu 24.04 server verildi və o ictimai veb saytı host edəcək. Bu, sıra ilə tam birinci gün hardening-idir.

```bash
# 0. Cari ol və cari qal
sudo apt update
sudo apt -y full-upgrade
sudo apt -y install unattended-upgrades fail2ban ufw

# 1. Root olmayan admin istifadəçisi yarat, sudo-ya əlavə et, açarını köçür
sudo adduser --gecos "Ops" ops
sudo usermod -aG sudo ops
sudo mkdir -p /home/ops/.ssh
sudo cp ~/.ssh/authorized_keys /home/ops/.ssh/authorized_keys
sudo chown -R ops:ops /home/ops/.ssh
sudo chmod 700 /home/ops/.ssh
sudo chmod 600 /home/ops/.ssh/authorized_keys

# 2. Root SSH və parol autentifikasiyasını söndür — yalnız açar, yalnız root olmayan
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/'         /etc/ssh/sshd_config
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# 3. Firewall: yalnız 22, 80, 443
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose

# 4. Avtomatik təhlükəsizlik yeniləmələri
sudo dpkg-reconfigure --priority=low unattended-upgrades
# yoxla
systemctl status unattended-upgrades
cat /etc/apt/apt.conf.d/20auto-upgrades

# 5. SSH üçün fail2ban
sudo tee /etc/fail2ban/jail.local >/dev/null <<'EOF'
[sshd]
enabled  = true
port     = ssh
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd

# 6. Logları logs.example.local:514 mərkəzi kollektorуna ötür (rsyslog)
echo '*.* @@logs.example.local:514' | sudo tee /etc/rsyslog.d/50-remote.conf
sudo systemctl restart rsyslog
```

Bundan sonra `ops` kimi SSH edə biləcəyinizi, `root` girişinin rədd edildiyini, `ufw status`-un yalnız 22/80/443 göstərdiyini, `fail2ban-client status`-un `sshd` jail-ini siyahıladığını və log kollektorunun mesajları aldığını təsdiqləyin.

## Tez-tez rast gəlinən tələlər və səhvlər

- **Hər şeyi root kimi icra etmək.** Hətta admin olaraq da, normal istifadəçi kimi giriş edin və `sudo` ilə ayrı-ayrı komandalar işlədin. Root kimi yazılan tipo sistemi məhv edə bilər; istifadəçi kimi ən pisi öz fayllarınızı.
- **`/etc/sudoers`-i `nano` ilə redaktə etmək.** `sudo visudo` istifadə edin. O, faylı qıfıllayır, sintaksisi yoxlayır və sizi sudo-dan çölə qıfıllayan qırıq faylı saxlamaqdan imtina edir.
- **`apt upgrade`-i atlamaq.** `apt update` mövcud paketlərin *siyahısını* təzələyir; heç nə quraşdırmır. `apt upgrade` əslində yeniləmələri tətbiq edən komandadır. İnsanlar bunları həftəlik qarışdırır.
- **`systemctl daemon-reload`-u unutmaq.** Unit faylı redaktə edirsiniz, `systemctl restart myapp` icra edirsiniz, heç nə baş vermir — çünki systemd hələ də keş-dəki köhnə unit-i istifadə edir. Unit-ləri redaktə etdikdən sonra həmişə `daemon-reload` edin.
- **`hostnamectl` vs `/etc/hostname`.** Hostname-i `sudo hostnamectl set-hostname web01.example.local` ilə təyin edin. systemd sistemlərində `/etc/hostname`-i əl ilə redaktə etmək işin yalnız yarısıdır və `/etc/machine-info` və nüvə vəziyyəti ilə sinxrondan çıxacaq.
- **`service`-in həmişə işlədiyini güman etmək.** Adətən uyğunluq qatına görə systemd maşınlarında işləyir, lakin minimal konteynerlərdə (Alpine, distroless) `service` komandası ümumiyyətlə yoxdur. systemd-də `systemctl`, OpenRC-də `rc-service` istifadə edin və hansında olduğunuzu bilin.
- **Defolt firewall qaydalarını toxunulmadan buraxmaq.** Yeni Ubuntu bulud image-ində `ufw` quraşdırılıb, lakin enable edilməyib. Yeni RHEL-də `firewalld` enable edilib, lakin icazə verici `public` zonası ilə. Həmişə işləyən qaydaları audit edin (`ufw status verbose`, `firewall-cmd --list-all`, `nft list ruleset`).
- **Eyni host-da paket menecerlərini qarışdırmaq.** `apt` paketləri pinləmək, sonra Snap-dan da quraşdırmaq, sonra `pip install --system` etmək — indi yeniləmələr üç yerdən gəlir və heç biri razılaşmır. Hər kateqoriya üçün bir həqiqət mənbəyi seçin.

## Əsas nəticələr

- Linux nüvə + kitabxanalar + userspace + shell-dir. Hansı təbəqənin probleminə baxmaq lazım olduğunu bilmək sizə harada axtarmalı olduğunuzu deyir.
- Xüsusi distro adı yox, distribusiya ailəsi (Debian / RHEL / Arch / Alpine) hansı paket meneceri və firewall istifadə edəcəyinizi müəyyən edir.
- Hər şey fayldır və hər şey `/` altında yaşayır. Konfiqurasiya `/etc`-də, dəyişən verilənlər `/var`-da, nüvə görünüşləri `/proc` və `/sys`-də.
- İcazələr sahib/qrup/digər × rwx, plus SUID/SGID/sticky-dir. İcra edilənlər üçün `chmod 755`, sirlər üçün `600`, `777` demək olar ki, heç vaxt.
- Müasir Linux-u `systemd` idarə edir. `systemctl` xidmətləri sürür, `journalctl` logları oxuyur, `/etc/systemd/system/` daxilindəki unit faylları öz işinizin yaşadığı yerdir.
- Proseslər `ps`/`top`/`ss` ilə yoxlanılır; əvvəlcə `SIGTERM` ilə dayandırılır və yalnız ehtiyac olduqda `SIGKILL` ilə.
- Hadisələr üçün `/var/log/auth.log` (və ya `secure`) plus `journalctl -u <service>` ilk sorğu turunun əksər suallarına cavab verir.
- Hardening əhval-ruhiyyə deyil, yoxlama siyahısıdır: root olmayan SSH, yalnız açar autentifikasiyası, firewall, gözlənilməz yeniləmələr, fail2ban, mərkəzləşdirilmiş loglar. Bunu birinci gün edin.

## References

- The Linux Foundation — pulsuz "Introduction to Linux" (LFS101): https://training.linuxfoundation.org/training/introduction-to-linux/
- `man 7 hier` — Linux Filesystem Hierarchy man səhifəsi (hər Linux maşınında `man 7 hier` yazın).
- Filesystem Hierarchy Standard: https://refspecs.linuxfoundation.org/fhs.shtml
- Arch Wiki (distrodan asılı olmayan, arayış keyfiyyəti): https://wiki.archlinux.org/
- Red Hat Enterprise Linux sənədləri: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/
- Ubuntu Server Guide: https://documentation.ubuntu.com/server/
- Debian Administrator's Handbook (pulsuz onlayn): https://debian-handbook.info/
- systemd sənədləri: https://systemd.io/
- `journalctl` man səhifəsi: https://www.freedesktop.org/software/systemd/man/journalctl.html
- GTFOBins (SUID/sudo abuse arayışı): https://gtfobins.github.io/
- [Linux Basic Commands](/operating-systems/linux/basic-commands) — bu saytda müşayiət edən tez-arayış dərsi.
