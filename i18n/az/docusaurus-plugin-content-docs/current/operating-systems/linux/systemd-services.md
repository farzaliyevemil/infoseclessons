---
id: linux-systemd-services
title: Linux Xidmətləri və systemd
description: Müasir Linux-da xidmətləri işlətmək və təhlükəsizləşdirmək — systemctl, unit faylları, journalctl, timer-lər, drop-in-lər və servis kompromitə olunanda zərbə radiusunu məhdudlaşdıran sandbox direktivləri.
slug: /operating-systems/linux/systemd-services
sidebar_position: 4
status: reference
last_reviewed: 2026-09-13
category_key: operating-systems
keywords:
  - systemd
  - systemctl
  - journalctl
  - xidmətlər
  - units
  - timers
  - hardening
difficulty: foundation

tags:
  - linux
  - beginner
---

# Linux Xidmətləri və systemd

Hər əsas bölgüşdürmədə `systemd` PID 1-dir: sistemi başladır, hər xidməti nəzarətdə saxlayır, çökmüşləri restart edir, jurnalı yazır, planlaşdırılmış işləri icra edir. İT və ya təhlükəsizlik mühəndisi üçün bu bir mənanı verir — **"bu servis necə təyin olunub, sağlamdırmı və nəyə toxuna bilər?" sualına cavab verə bilmirsinizsə, Linux-u nə işlədə, nə də müdafiə edə bilərsiniz.** Bu dərs işlək alt-setdir: gündəlik `systemctl`, unit anatomiyası, jurnal, timer-lər və kompromitə olunmuş servisiContained-a çevirən sandbox seçimləri.

## Gündəlik fe'llər

```bash
systemctl status nginx        # vəziyyət + unit-in son jurnal sətirləri
systemctl start|stop|restart nginx
systemctl reload nginx        # bağlantıları atmadan config-i yenidən oxu (dəstəklənirsə)
systemctl enable nginx        # boot-da başlat (symlink yaradır)
systemctl enable --now nginx  # enable VƏ start bir hərəkətdə
systemctl disable --now nginx
systemctl list-units --type=service --state=running
systemctl list-units --failed           # xəstə hostda ilk triaj məkanı
systemctl cat nginx                     # əsl unit faylı, drop-in-lər daxil olmaqla
```

`--failed` hər health check-də olmalıdır: server monitorinq probe-unu keçə bilər amma üç unit failed vəziyyətdə otura bilər — onlardan biri backup işiniz ola bilər.

## Unit faylının anatomiyası

Unit-lər `/usr/lib/systemd/system/`-də (paket defoltları — redaktə etməyin) və `/etc/systemd/system/`-də (sizinlər — ad toqquşmasında qalib gəlir) yaşayır. Tipik servis unit-i:

```ini
[Unit]
Description=Internal reporting API
After=network-online.target postgresql.service
Wants=network-online.target

[Service]
Type=simple
User=reportapi
Group=reportapi
ExecStart=/usr/local/bin/reportapi --config /etc/reportapi/config.yml
Restart=on-failure
RestartSec=5
Environment="LOG_LEVEL=info"

[Install]
WantedBy=multi-user.target
```

Operativ vacib olanlar:

- **`Type=simple`** (defolt) — prosesin özü servisdır. `Type=forking` — köhnə daemon-lar; `Type=notify` — hazırlığı signal edən müasir applər.
- **`After=` / `Wants=`** — sıralama və zəif asılılıqlar. `After` yalnız sıradır; `Requires` isə həvəsli adminlərin əlavə edib sonra hər şeyin niyə restart olunduğuna təəccübləndiyi güclü "birlikdə öl" bağlantısıdır.
- **`User=`** — defolt olaraq `root` kimi işləyən servisler Linux serverlərində ən çox rast gəlinən hardening tapıntısıdır.
- **`Restart=on-failure`** — qısa fasilə ilə saat 3-dəki page arasındakı fərqdir.
- **`[Install] WantedBy=`** — `enable` nəyə qoşulur.

Hər hansı unit-i redaktə etdikdən sonra: `systemctl daemon-reload` (tərifləri yenidən oxu), sonra servisi restart et. `daemon-reload`-ı unutmaq klassik "faylı dəyişdim, heç nə olmadı" ssenarisidir.

## Drop-in-lər: sahib olmadan dəyiş

Paket unit-ini `/etc`-yə tam köçürməyin — upgrade-lər sonra sizin dəyişikliklərinizi susduraraq keçir. Cərrahi override edin:

```bash
systemctl edit nginx
# /etc/systemd/system/nginx.service.d/override.conf yaradır
```

```ini
[Service]
# boş Assignment= paket dəyərini silir — list-tipi açarlar üçün vacibdir
ExecStart=
ExecStart=/usr/sbin/nginx -c /etc/nginx/nginx-special.conf
```

Drop-in pattern upgrade-ləri işlək saxlayır və lokal dəyişiklikləri diff-ələbilən edir — `systemctl cat` baza + override-u birlikdə göstərir.

## journalctl: jurnal logun özüdür

systemd sistemlərində jurnal əsas log mağazasıdır, düz-mətn faylları (`/var/log/auth.log` və s.) uyğunluq üçün shim-dir. Bir çox bölgüşdürmədə persistens açıq şəkildə aktivləşdirilməlidir — `mkdir /var/log/journal && systemctl restart systemd-journald` — əks halda loglar reboot-da ölür, məhz onlara lazım olduğunuzda.

```bash
journalctl -u nginx -f                     # bir unit-i izlə
journalctl -u sshd --since "2 hours ago"
journalctl -p err..alert -b                # bu boot, xətalar və daha pis
journalctl --since "2026-09-13 09:00" --until "2026-09-13 11:00"
journalctl --disk-usage                    # jurnal nə qədər yeyir
```

Təhlükəsizlik-relevant vərdiş: servis jurnallarını authentifikasiya logları ilə **korrelyasiya edin** ([Log Analysis](/blue-teaming/log-analysis))-a baxın — `journalctl -u sshd` "kim girdi" sualını cavablandırır, `auth.log` isə "sudo ilə nə etdi"ni.

## Timer-lər: cron, amma görünən

systemd timer-ləri əksər cron işlərini yoxlamaq, loglamaq və asılılıq sırası qoyula bilən unit-lərlə əvəz edir:

```ini
# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=*-*-* 02:30:00
Persistent=true          # downtime slotu keçilsəydi, sonra icra et

[Install]
WantedBy=timers.target
```

```bash
systemctl list-timers --all     # hər biri nə vaxt atəşlənir, son dəfə nə vaxt işlədi
```

`Persistent=true` təkbaşına migration-a dəyər — backup vaxtı düşmüş server yenə də backupını alır. Cron bir-sətirlik istifadəçi işləri üçün qanunidir; gecə 3-də debug etmək lazım gələ biləcək hər şey üçün timer üstünlük verin.

## Sandboxing: servisin kompromitə olunacağını fərz edin

systemd-nin özünü burada doğruladığı yerdir. Servis unit-i ilk paket gəlməzdən əvvəl capability-ləri və filesystem çatma radiusunu atır — hər direktiv bir sətirdir və birlikdə bu servisdəki web-shell-in private keylərinizi oxumaması deməkdir:

```ini
[Service]
NoNewPrivileges=true
ProtectSystem=strict          # /usr, /boot, /etc read-only
ProtectHome=true              # /home, /root gizlət
PrivateTmp=true               # servis-başına private /tmp
PrivateDevices=true           # raw device node-lar yoxdur
ProtectKernelTunables=true
ProtectKernelModules=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
CapabilityBoundingSet=        # heç bir capability yoxdur
ReadWritePaths=/var/lib/reportapi   # yazıla bilən tək istisna
```

```bash
systemd-analyze security nginx        # unit-başına 0–10 exposure balı, əksik direktivlər siyahısı ilə
```

`systemd-analyze security` Linux-da mövcud ən sürətli hardening review-dir: hər işləyən unit-i ballandırır və hansı sətirləri əlavə etməli olduğunuzu dəqiq deyir. Yeni servisi ~4-dən aşağı bal ilə ship etməmək məqsədli komanda standartıdır.

## Troubleshooting playbook

| Simptom                     | İlk hərəkətlər                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Servis başlamır             | `systemctl status unit` → jurnal hissəsini oxu; `journalctl -u unit -n 50`                                                                |
| Başlayır, sonra ölür        | `Restart=` loop-larına bax; `journalctl -u unit -p err`; ExecStart komandasını servis istifadəçisi kimi test et (`sudo -u reportapi ...`) |
| Config dəyişikliyi təsirsiz | `systemctl daemon-reload`, sonra restart; `systemctl cat` ilə drop-in-i yoxla                                                             |
| Port artıq istifadədə       | `ss -tulpn \| grep :8080` — öldürməzdən əvvəl əsl sahibi tap                                                                              |
| Boot unit-də asılır         | `systemd-analyze blame`; offender-i disable et, oflayn debug et                                                                           |

## Növbəti addım

- [Linux Hardening](/operating-systems/linux/hardening) — sandboxing-in geniş kontekstdə yeri.
- [Linux Users, Groups and Permissions](/operating-systems/linux/users-groups-permissions) — bu unit-lərin işlədiyi identiklik modeli.
- [Log Analysis](/blue-teaming/log-analysis) — jurnalı təhqiqatçı kimi oxumaq.
