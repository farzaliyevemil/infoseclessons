---
id: linux-hardening
title: Linux Hardening
description: Defolt Linux quraşdırmasını müdafiə olunana çevirmək — hücum səthini kiçiltmək, update-lər, SSH hardening, firewall-lar, auditd, kernel parametrləri və CIS təfəkkürü ilə xəritələnən verification checklist-i.
slug: /operating-systems/linux/hardening
sidebar_position: 5
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - hardening
  - ssh
  - firewall
  - ufw
  - auditd
  - fail2ban
  - cis benchmark
  - sysctl
difficulty: intermediate

tags:
  - linux
  - intermediate
---

# Linux Hardening

Defolt Linux quraşdırması rahatdır, şəbəkələşib və bununla fəxr edir: root üçün şifrələri qəbul edən SSH daemon işlədir, heç kim istəmədiyi servisleri gətirir, debug üçün kifayət qədər loq yazır və desktop dövrünün kernel defoltlarına güvənir. Hardening qəsdən əksinə çevirməkdir — **çatanı azalt, işləyəni məhdudlaşdır, baş verəni qeyd et** — və server internetlə tanış olmazdan əvvəl, build vaxtı checklist kimi tətbiq olunduqda ən təsirlidir. Bu dərs həmin checklist-dir, məntiqi əlavə olunmuş halda, hücumçunun sistemi yaşadığı qaydada düzülmüş.

## 1. Hər şeydən əvvəl səthi kiçilt

Ən ucuz kontrol mövcud olmayan şeydir:

```bash
systemctl list-units --type=service --state=running   # əslində nə var?
ss -tulpn                                             # nə çatandır?
```

Hər dinləyən socket əbədi patch öhdəliyi və potensial giriş nöqtəsidir. Serverin elan olunmuş rolu lazım bilməyəni silin və ya deaktiv edin — database serverində mail agentin, build runner-da isə cups-un yeri yoxdur. Paket meneceri nəyin çəkdiyini bilir (`apt depends`, `dnf repoquery --whatrequires`), deməli "bəlkə bir gün lazım olar" cavabı "bir gün dörd dəqiqəyə quraşdırarıq"-dır.

Stack-i build vaxtında minimal saxlayın: minimal imagelər (cloud-init `packages:` siyahıları, `*-minimal` base-lərdən Dockerfile-lər) sonrakı intizam yox, konstruksiya ilə hardening edir.

## 2. Patching: avtomatik və yoxlanılmış

Linux serverlərində exploit olunmuş vulnerability-lərin əksəriyyəti kompromisdən aylar əvvəl patch olunmuşdu. Darıxdırıcı qatı avtomatlaşdırın:

```bash
sudo apt install unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades
```

Nənin avtomatik olduğunu açıq qərar verin: təhlükəsizlik update-ləri — bəli, nəzarətsiz; kernel böyük keçidləri və database mühərrikləri — adətən maintenance pəncərəsi arxasında. Sonra **patch vəziyyətini data kimi yoxlayın**, əhval-ruhiyyə yox: monitorinqdə həftəlik `apt list --upgradable` / `dnf updateinfo summary` diff-i, və ya fleet üzrə median patch yaşı siyasətinizi keçəndə alert verən inventory aləti (kritiklər üçün əksər komandalar 14–30 günə razılaşır). Reboot siyasəti eyni cümləyə düşür: update olunmuş-amma-reboot-olunmamış kernel heç kimi qorumur — `needs-restarting -r` (RHEL) və ya `/var/run/reboot-required` (Debian) ilə yoxlayın.

## 3. SSH: ön qapı

SSH az qala hər Linux serverin açdığı tək servisdır, ona görə hardening yükünü o daşıyır. `/etc/ssh/sshd_config` üçün müzakirə olunmazlar (müasir bölgüşdürmələrdə drop-in-lər `/etc/ssh/sshd_config.d/` altında):

```text
PermitRootLogin no                  # root heç vaxt birbaşa login olmur
PasswordAuthentication no           # yalnız açarlar, çata bildiyiniz hər yerdə
PubkeyAuthentication yes
KbdInteractiveAuthentication no
AllowGroups ssh-users               # açıq allowlist, binanın hamısı yox
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
X11Forwarding no
AllowTcpForwarding no               # əslində tunnel etmirsinizsə
```

Konfiq qədər vacib olan iş təcrübələri:

- **Açarları credential kimi idarə edin**: `authorized_keys` audit (`awk '{print $NF}' ~/.ssh/authorized_keys` — açarın kimə aid olduğunu göstərir), gedənlərdə rotasiya, paylaşılan şəxsi açarlar yoxdur. Fleets üçün sertifikat-bazlı SSH (CA tərəfindən imzalanmış qısaömürlü sert, Vault SSH və ya Teleport kimi) açar-çirkabı sinfini tamamilə silir.
- **Portu dəyişmək** kütləvi skaner səsini dayandırır, hədəfli hücumları yox — gigiyena kimi yaxşıdır, kontrol kimi heç vaxt.
- **fail2ban** (və ya `sshd`-nin öz `MaxStartups` + firewall qaydaları) brute-force səsinə qarşı: Debian-familiyada `sudo apt install fail2ban` qutudan çıxan halda qəbul edilir.
- Hər dəyişikliyi `sshd -t` ilə test edin və ikinci sessiya açıq saxlayın — bu, klassik özünüzü-kilitləmə ssenarisidir.

## 4. Firewall: default-deny mövqedir, setting deyil

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.0.0/24 to any port 22 proto tcp   # yalnız management subnet
sudo ufw allow 80,443/tcp
sudo ufw enable && sudo ufw status verbose
```

Firewall-u bəzəkdən ayıran prinsip: **management plane-lər (SSH, database-lər, cache-lər, admin UI-lər) mənbə məhdudiyyəti alır; yalnız servisin public portları world qaydası alır.** Güclü şifrə ilə `0.0.0.0/0`-a açıq Postgres portu — uğurlu günlərini istehlak edən incidentdir. Çoxhostlu sistemlərdə nftables/iptables-i configuration management ilə idarə edin, və ya eyni default-deny məntiqi ilə cloud security groups — alət o qədər vacib deyil, invariant vacibdir: _sənədləşdirilmişdən başqa heç nə çatan deyil._

## 5. İstifadəçilər, sudo və identiklik gigiyenası

Dərin təhlili [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions)-dadır; hardening one-liner-ləri:

```bash
awk -F: '$3 == 0 {print $1}' /etc/passwd              # dəqiq bir UID-0 hesabı
sudo awk -F: '$2 !~ /^[!*]/ {print $1}' /etc/shadow   # ümumiyyətlə şifrəsi olan kimdir
grep -rE "NOPASSWD" /etc/sudoers /etc/sudoers.d/       # şifrəsiz sudo inventarı
find / -perm -4000 -type f 2>/dev/null                # SUID baseline
```

Servis hesabları `nologin` shell və şifrəsiz alır; insanlar paylaşılan root əvəzinə sudo (loqlanan, komanda-başına) alır; gedənlər silinmir, deaktiv olunur.

## 6. Kernel və şəbəkə parametrləri

Kiçik sysctl dəsti klassik şəbəkə-qat boşluqlarını bağlayır — `/etc/sysctl.d/99-hardening.conf`:

```text
net.ipv4.ip_forward = 0                # router-lər yönləndirir; serverlər yox
net.ipv4.conf.all.rp_filter = 1        # mənbə doğrulaması
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.tcp_syncookies = 1            # SYN flood müqaviməti
kernel.kptr_restrict = 2               # kernel göstəricilərini imtiyazsız istifadəçilərdən gizlət
kernel.dmesg_restrict = 1
fs.protected_symlinks = 1
fs.protected_hardlinks = 1
```

`sysctl --system` ilə tətbiq edin. Konteynerlərdə və ya VM-lərdə bəzi açarlar namespace-scoped-dur — host-başına yoxlayın, bare-metal ilə Kubernetes node arasında copy-paste etməyin.

## 7. Məcburi giriş nəzarəti

SELinux (RHEL-familiya) və AppArmor (Ubuntu/SUSE) kompromitə olunmuş servisin fayl icazələrindən kənara çıxa bilməyəcəyini məhdudlaşdırır. Onları enforcing rejimdə işlətmək əksər bölgüşdürmələrin artıq verdiyi ən yüksək-təsirli defoltdur — günah bir şey sındıqda onu deaktiv etmək deyil, label-i düzəltməkdir:

```bash
getenforce                                 # Enforcing hədəf vəziyyətidir (RHEL)
aa-status | head                           # AppArmor profilləri yüklənib (Ubuntu)
audit2why < /var/log/audit/audit.log       # SELinux: bu niyə rədd edildi
```

Confined servisler + [Linux Services and systemd](/operating-systems/linux/systemd-services)-dən systemd sandbox (`ProtectSystem=strict`, `PrivateTmp`, `CapabilityBoundingSet=`) müdafiə olunur: bir yanlış konfiqurasiyanın arxasında ikinci qat var.

## 8. Loglama və audit

Qeyd etmədiyinizi araşdıra bilməzsiniz ([Log Analysis](/blue-teaming/log-analysis))-a baxın. Minimumlar:

- **journald persistensi** (`/var/log/journal` mövcuddur) və uzaq shipping — hücumçunun olduğu diskin üstündəki loglar təklifdir, dəlil deyil. Hostun yaza bilmədiyi mərkəzi mağazaya göndərin.
- **auditd** yüksək dəyərli qaydalar üçün — "kim auth-a və identikliyə toxundu" sualına cavab verən watch keyləri:

```bash
sudo auditctl -w /etc/passwd -p wa -k identity
sudo auditctl -w /etc/sudoers -p wa -k identity
sudo auditctl -w /etc/ssh/sshd_config -p wa -k sshd_config
sudo ausearch -k identity | aureport -f   # oxunaqlı hesabat
```

- **login hesabatçılığı** toxunulmaz saxlanır: `last`, `lastb` və xam auth loglar, rotasiya olunmuş və göndərilmiş.
- `/etc`, `/usr/bin`, `/usr/sbin` üzrə bütönlük monitorinqi (AIDE/Wazuh/FIM) — drift alerti aylıq auditdən üstündür.

## 9. Hücumçu kimi yoxla

Verification-sız hardening sənəddir. Dövrü bağlayın:

```bash
systemd-analyze security                 # servis-başına exposure balları
sudo lynis audit system                  # CIS-xəritəli review, hardening indeksi ilə
nmap -sV -p- <host>                      # xaricdən: səth sənədləşdirdiyiniz kimidirmi?
```

Sonra codify edin: bölgüşdürməniz üçün CIS benchmark sənaye baseline checklist-idir və alətlər (OpenSCAP, Lynis, Wazuh SCA) onu illik PDF əvəzinə davamlı uyğunluğa çevirir. Realist komanda standartı: **yeni serverlər hardened image-dən qurulur, drift alert edilir, image-in özü rüblik review olunur.**

## Checklist, sıxılmış

| Qat          | Kontrol                                               | Yoxla                                  |
| ------------ | ----------------------------------------------------- | -------------------------------------- |
| Səth         | Yalnız rol-lazımı servisler dinləyir                  | sənədləşdirilmiş portlarla `ss -tulpn` |
| Patching     | Nəzarətsiz təhlükəsizlik update-ləri, reboot siyasəti | patch-yaşı alerting                    |
| SSH          | Yalnız açarlar, root yox, allowlist istifadəçilər     | `sshd -T`, uğursuz-auth trendləri      |
| Şəbəkə       | Default-deny inbound, mənbə-məhdud management         | xarici `nmap`                          |
| Identiklik   | Bir UID-0, şifrəli servis hesabı yox, auditli sudo    | yuxarıdakı üç one-liner                |
| Kernel       | sysctl hardening dəsti tətbiq olunub                  | `sysctl --system` çıxışı               |
| MAC          | SELinux/AppArmor enforcing                            | `getenforce` / `aa-status`             |
| Loglama      | Davamlı, göndərilən, dəyişdirilməyə-davamlı           | log boşluğu monitorinqi                |
| Verification | Təqvimsel CIS-xəritəli skan                           | Lynis/OpenSCAP hesabatları             |

## Növbəti addım

- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) və [Linux Services and systemd](/operating-systems/linux/systemd-services) — bu checklist-in yığıdığı primitivlər.
- [Log Analysis](/blue-teaming/log-analysis) — indi konfiqurasiya etdiyiniz loglama nə üçündür.
- [Vulnerability Management](/general-security/vulnerability-management) — patching-in geniş lifecycle-da yeri.
