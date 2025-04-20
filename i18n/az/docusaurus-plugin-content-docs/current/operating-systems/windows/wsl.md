---
id: wsl
title: WSL Nədir? (Windows Subsystem for Linux)
description: >-
  WSL-in Linux-u Windows-da necə işə salmağa imkan verdiyini və niyə kiber
  təhlükəsizlik və inkişaf üçün güclü bir alət olduğunu öyrənin.
slug: /az/wsl
---

# 🧩 WSL Nədir?

**WSL (Windows Subsystem for Linux)** — Windows-da tam Linux mühitini birbaşa işə salmağa imkan verən bir xüsusiyyətdir. Bunun üçün virtual maşın (VM) və ya dual-boot istifadə etməyə ehtiyac yoxdur.

İlk dəfə Windows 10-da təqdim edilən WSL, Linux alətlərinə ehtiyacı olan inkişafçılar, kiber təhlükəsizlik mütəxəssisləri və sistem administratorları üçün əvəzolunmaz bir vasitə halına gəlib.

---

# ❓ Niyə WSL istifadə etməli?

Ən çox yayılmış səbəblər bunlardır:

- 🔧 **Linux alətlərindən (bash, apt, git, ssh)** birbaşa Windows-da istifadə etmək.
- 💻 Dual-boot və ya resurs tələb edən virtual maşınlardan qaçmaq.
- 📂 Windows və Linux mühitləri arasında problemsiz fayl paylaşımı.
- ⚡ Windows-da terminal əsaslı pentest alətlərinə (məsələn, Nmap, Nikto və s.) çıxış.

---

# ✅ WSL-in Üstünlükləri

| Xüsusiyyət            | WSL2         | Virtual Maşın (VM) |
|-----------------------|--------------|---------------------|
| Sürət                 | ✅ Sürətli    | ❌ Yavaş            |
| Resurs İstifadəsi     | ✅ Aşağı      | ❌ Yüksək           |
| Fayl Əlçatanlığı      | ✅ Asan       | ⚠️ Çətin            |
| Windows ilə İnteqrasiya | ✅ Dərin    | ❌ Məhdud           |
| GUI Dəstəyi (WSLg)    | ✅ Mövcuddur  | ⚠️ Quraşdırma tələb edir |

---

# 🛠️ WSL Necə Quraşdırılır? (Tövsiyə olunur: WSL2)

### 📌 Windows 10/11 Əmri (Administrator olaraq PowerShell):

```powershell
wsl --install
```

Bu əmrlə:

- WSL əsas komponentləri quraşdırılacaq.
- Ubuntu standart Linux distributivi kimi quraşdırılacaq.
- WSL2 avtomatik aktiv ediləcək (Windows 11-də).

Quraşdırmadan sonra sisteminizi yenidən başlatmağınız lazım ola bilər.

---

# 🔍 Ən Çox İstifadə Edilən WSL Əmrləri

| Əmr                              | Təsviri                                           |
|----------------------------------|---------------------------------------------------|
| `wsl`                            | Standart Linux shell-i işə salır                 |
| `wsl --list --verbose`           | Quraşdırılmış Linux distributivlərini göstərir    |
| `wsl --install <distro>`         | Xüsusi bir distributiv quraşdırır (məsələn, Kali, Debian) |
| `wsl --set-version Ubuntu 2`     | WSL2-yə keçid edir                               |
| `wsl --shutdown`                 | Bütün işləyən WSL instanslarını dayandırır        |
| `wsl --update`                   | WSL kernelini yeniləyir                          |
| `explorer.exe .`                 | Cari Linux qovluğunu Windows Explorer-də açır    |

---

# 🔐 Kiber Təhlükəsizlik üçün WSL

WSL InfoSec tapşırıqları üçün çox dəyərlidir, məsələn:

- Yalnız Linux-da işləyən pentest alətlərini işə salmaq.
- Shell skriptləri ilə işləmək.
- Şəbəkə alətləri ilə qarşılıqlı əlaqə (məsələn, `nmap`, `netcat`).
- Loq fayllarını və zərərli proqramları təhlükəsiz sandbox mühitində analiz etmək.

---

# 💡 Nümunə: WSL-də Nmap Quraşdırılması və İstifadəsi

WSL-də Nmap quraşdırmaq və istifadə etmək üçün aşağıdakı əmrləri icra edin:

```bash
sudo apt update && sudo apt install nmap
nmap -sV localhost
```

---

# ✅ Xülasə

WSL sizə Linux-un gücündən və çevikliyindən istifadə etməyə imkan verir, Windows-u tərk etmədən.  
Bu, yüngül, sürətli və yüksək inteqrasiya olunmuş bir vasitədir və hər bir kiber təhlükəsizlik öyrənəninin və ya mütəxəssisinin alət dəstində olmalıdır.
