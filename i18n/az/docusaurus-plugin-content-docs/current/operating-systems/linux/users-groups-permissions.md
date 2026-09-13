---
id: linux-users-groups-permissions
title: Linux İstifadəçilər, Qruplar və İcazələr
description: Linux-da identiklik və giriş əslində necə işləyir — /etc/passwd və shadow, sudo və sudoers, icazə bitlərinin modeli, SUID/SGID/sticky, umask və ACL-lər — hücumçuların axtardığı yanlış konfiqurasiyalarla birlikdə.
slug: /operating-systems/linux/users-groups-permissions
sidebar_position: 3
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - icazələr
  - istifadəçilər
  - qruplar
  - sudo
  - chmod
  - suid
  - umask
  - acl
difficulty: foundation

tags:
  - linux
  - beginner
---

# Linux İstifadəçilər, Qruplar və İcazələr

Təhlükəsizlik mühəndisinin Linux box haqqında qoyduğu hər sual sonunda bir suala enir: **"burada hansı identiklik nə edə bilər?"** Bu dərs o modelin başdan-ayağa izahıdır: identikliklər harda yaşayır, imtiyaz yüksəlişi necə deleanqasiya olunur, icazə bitləri necə işləyir və hansı yanlış konfiqurasiyalar darıxdırıcı serveri asan hədəfə çevirir.

## Identikliklər harda yaşayır

Üç fayl lokal identikliyi müəyyən edir. Diqqətlə oxuyun — hər biri yaxşı səbəbdən world-readable-dır və hər biri dəqiq bir sirri gizlədir:

| Fayl          | saxlayır                                            | İcazələr                                |
| ------------- | --------------------------------------------------- | --------------------------------------- |
| `/etc/passwd` | İstifadəçi adı, UID, GID, home, shell — sirr yoxdur | `644`, world-readable                   |
| `/etc/group`  | Qrup adı, GID, üzvlər                               | `644`                                   |
| `/etc/shadow` | Şifrə hash-ləri və aging siyasəti                   | `000` və ya `640` (root + shadow qrupu) |

Passwd sətrinin anatomiyası: `elvin:x:1001:1001:Elvin Farzaliyev:/home/elvin:/bin/bash`. `x` hash-in shadow-da olduğunu bildirir. **Shadow-da hash sahəsindəki `!` və ya `*` şifrə girişinin deaktiv olduğunu göstərir** — sağlam servis hesabı məhz belə görünür. `UID 0` tərifə görə root-dur: UID 0 olan _ikinci_ hesab alert verməyə dəyər qırmızı bayraqdır.

Faydalı audit one-liner-ləri:

```bash
awk -F: '$3 == 0 {print $1}' /etc/passwd        # hər UID-0 hesabı
awk -F: '$7 !~ /(nologin|false)$/' /etc/passwd  # faktiki login edə bilən hesablar
sudo awk -F: '$2 !~ /^[!*]/ {print $1}' /etc/shadow  # şifrəsi qoyulmuş hesablar
```

## İstifadəçi yaratmaq və idarə etmək

```bash
sudo useradd -m -s /bin/bash aysel     # aşağı-səviyyə: home yarat, shell təyin et
sudo adduser aysel                     # Debian-ın rahat interaktiv wrapper-i
sudo usermod -aG docker aysel          # qrupa əlavə et (-a vacibdir: onsuz QRUPLARI ƏVƏZ EDİRSİNİZ)
sudo passwd aysel                      # şifrə təyin/rotasiya et
sudo usermod -L aysel                  # şifrəni kilidlə (hash başına ! əlavə olunur)
sudo usermod -s /usr/sbin/nologin oldsvc   # gedəni nologin hesabına çevir
usermod -u 0 backdoor                  # hücumçu hərəkəti: UID 0 klonu — təsbit et, təqlid etmə
```

`usermod -aG` səhvi klassik outagedir: `-a`-nı unutsanız, istifadəçi `sudo` da daxil olmaqla bütün qruplardan çıxarılır.

## sudo: düzgün deleanqasiya olunmuş imtiyaz

Birbaşa root login-ləri bağlı olmalıdır; imtiyaz `sudo` vasitəsilə axmalıdır — o, autentifikasiya edir, avtorizasiya edir və **loqlayır**. Siyasət `/etc/sudoers` və `/etc/sudoers.d/`-də yaşayır — yalnız `visudo` ilə redaktə edin (saxlamazdan əvvəl sintaksisi yoxlayır; korlanmış sudoers faylı sizi root-dan tam kənara ata bilər).

```sudoers
aysel   ALL=(ALL:ALL) ALL              # tam sudo, öz şifrəsini soruşur
%devops ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx   # dar, şifrəsiz
backupsvc ALL=(root) NOPASSWD: /usr/local/bin/backup.sh        # servis hesabı pattern-i
```

Sudoers üçün təhlükəsizlik review checklist-i:

- Wildcard-lı `NOPASSWD:` qeydləri (`/usr/bin/systemctl *`) faktiki tam root-dur — editor-lər, find, tar, less shell escape-ləri ilə çıxırlar.
- `sudo -l` hər istifadəçi kimi onun grant-larını çap edir; assessment-də foothold-dan sonrakı ilk komanda, hardening audit-də isə ilk siyasət sızması budur.
- `Defaults logfile="/var/log/sudo.log"` + `iolog_dir` sizə komanda-başına audit izləri verir.

## İcazə bitləri

Hər fayl üç triplet daşıyır — sahib, qrup, başqaları — read/write/execute:

```text
-rwxr-x--- 1 aysel devops 4096 app.sh
 │└─┤└─┤└──┘
 │ │  │  └── başqaları: giriş yoxdur
 │ │  └───── qrup (devops): oxu + icra
 │ └──────── sahib (aysel): oxu + yaz + icra
 └────────── fayl tipi: - fayl, d kataloq, l symlink
```

Kataloqlar üçün bitlər fərqli məna daşıyır: `r` adları siyahılayır, `w` daxil yaradır/silir, `x` kataloqa _keçir_. `--x` kataloq yalnız-keçiddir — daxildeki fayllara tam adla çata bilərsiniz amma siyahılaya bilməzsiniz.

Oktal arifmetika iş şorthand-idir: `r=4, w=2, x=1`.

```bash
chmod 644 report.md      # rw-r--r--  — sənədlər üçün defolt
chmod 600 id_rsa         # rw-------  — private key üçün yeganə düzgün rejim
chmod 755 deploy.sh      # rwxr-xr-x  — başqalarının icra edə bildiyi executable
chown aysel:devops app/  # sahib və qrup birlikdə
```

`umask` yeni fayl rejimlərindən çıxır (adətən `022` → `644`/`755`). Qrup-yazısı lazım olan paylaşilmış staging serveri shell profilində `umask 002` qoyur — təsadüfi yox, qəsdən.

## Xüsusi bitlər: əlavə üç bayraq

| Bit                     | Fayllarda                                             | Kataloqlarda                                       | Nümunə                                                          |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| **SUID** (`u+s`, 4xxx)  | _Fayl sahibinin_ identikliyi ilə işləyir, adətən root | —                                                  | `/usr/bin/passwd` shadow-u redaktə etmək üçün buna ehtiyacı var |
| **SGID** (`g+s`, 2xxx)  | _Qrupun_ identikliyi ilə işləyir                      | Yeni fayllar kataloqun qrupunu miras alır          | paylaşılan komanda kataloqları                                  |
| **Sticky** (`+t`, 1xxx) | —                                                     | Yalnız faylın sahibi (və ya root) daxil silə bilər | `/tmp` (`drwxrwxrwt`)                                           |

Polis etməli olan SUID-dir. Hər SUID-root binary siyahıdaki imtiyaz yüksəlişi primitividir (müəllifözlü `vim`, `find`, `less` və dostları üçün `GTFOBins` escape yollarını sənədləşdirir). İki daimi yoxlama:

```bash
find / -perm -4000 -type f 2>/dev/null     # SUID binary-ləri siyahıla — baseline ilə diff et
find / -perm -2000 -type f 2>/dev/null     # SGID binary-ləri siyahıla
mount | grep nosuid                        # SUID harda hörmət edilir (və edilmir)
```

Administratorlar set-i kiçik saxlamalı, reviewer-lər isə hər _yeni_ qeydi — xüsusən `/tmp` və ya web root kimi yazıla bilən yollarda — incident siqnalı kimi qiymətləndirməlidir.

## Bitlərdən kənar: ACL-lər və atributlar

POSIX ACL-ləri "bir əlavə istifadəçiyə giriş lazımdır" problemi qrup ixtira etmədən həll edir:

```bash
getfacl /srv/shared
setfacl -m u:backup:r /srv/shared/dump.sql   # backup istifadəçisinə oxu ver
setfacl -m d:g:devops:rwX /srv/shared        # defolt ACL — yeni fayllara miras qalır
```

`chattr` normal `chmod`-un override edə bilmədiyi filesystem-səviyyəli bayraqlar əlavə edir: `chattr +a logfile` (yalnız-əlavə — log shipping-də sevilir) və `+i` (immutable, root belə bayrağı götürmədən redaktə edə bilmir). Hücumçular da implant olunmuş fayllarda `+i` istifadə edir; `lsattr` göstərir və sizin qoymadığınız immutable bayraq tapıntıdır.

## Əslində dişləyən yanlış konfiqurasiyalar

1. **Dəstək vasitəsi kimi `chmod 777`.** Simptomu düzəldir, kataloqu dərc edir. Əvəzində əsl identiklik problemini diaqnoz edin.
2. **`NOPASSWD` çirkabı.** Hər auditdən kənar wildcard grant əlavə addımlarla root-dur; adlı, versiyalı, minimal saxlayın.
3. **Shell-li servis hesabları.** `nologin` + şifrəsiz + ən çox scoped sudo.
4. **Sistem yollarında world-writable fayllar.** `find /etc /usr -perm -002 -type f` sağlam hostda heç nə qaytarmalıdır.
5. **Polissiz SUID.** Yeni SUID binary-lər laqeyd `chmod` və ya hücumçu implantasiyası ilə görünür — set-i baseline edin, drift-də alert verin.

## Növbəti addım

- [Linux Services and systemd](/operating-systems/linux/systemd-services) — servis kompromitə olunanda nə edə biləcəyini məhdudlaşdırmaq.
- [Linux Hardening](/operating-systems/linux/hardening) — bütün bunu checklist-ə çevirmək.
- [Linux Basic Commands](/operating-systems/linux/basic-commands) — buradakı isimlər tez keçirsə, fe'llər.
