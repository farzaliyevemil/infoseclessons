---
id: bitlocker
title: BitLocker Nədir?
description: >-
  BitLocker-in necə işlədiyini, TPM + PIN-in niyə vacib olduğunu və device
  encryption ilə fərqini öyrənin.
slug: /bitlocker
---

# 🔐 BitLocker Nədir?

**BitLocker** — Windows-un daxili disk şifrələmə funksiyasıdır. Əsas məqsədi cihaz itəndə, oğurlananda və ya offline şəkildə ələ keçiriləndə məlumatları qorumaqdır.

Yəni kimsə diski çıxarıb başqa sistemdə oxumağa və ya cihazı normal Windows axınından kənar boot etməyə çalışsa, BitLocker riski azaldır.

---

## 🎯 Hansı problemi həll edir?

- Oğurlanmış və ya itirilmiş noutbuklar
- Powered-off cihaz üzərində offline hücumlar
- Diskin başqa sistemdə oxunması cəhdləri
- Bəzi preboot tampering ssenariləri

---

## ⚙️ İş Prinsipi

BitLocker diski şifrələyir və açarlara çıxışı müxtəlif protector-larla qoruyur.

Ən yayğın protector-lar:

- **TPM only**
- **TPM + PIN**
- **Startup key**
- **Recovery key**

Microsoft-un cari sənədlərində də TPM əsaslı BitLocker standart başlanğıc nöqtəsi kimi qalır. Daha güclü preboot müdafiə üçün isə **TPM + PIN** daha yaxşı seçimdir.

---

## 🔐 TPM və TPM + PIN fərqi

| Rejim | Təhlükəsizlik səviyyəsi | Qeyd |
| --- | --- | --- |
| **TPM only** | Yaxşı baseline | İstifadəçi üçün daha şəffafdır |
| **TPM + PIN** | Daha güclü | Boot vaxtı əlavə autentikasiya verir |
| **Startup key** | Müəyyən hallarda | Removable media idarəsi tələb edir |
| **TPM-siz password** | Daha zəif | Ümumiyyətlə TPM əsaslı model qədər güclü deyil |

TPM + PIN niyə vacibdir:

- Preboot səviyyəsində əlavə qoruma verir
- Oğurlanmış cihazın açılması çətinləşir
- Privileged admin cihazları və yüksək riskli istifadəçilər üçün daha uyğundur

---

## 💻 BitLocker və Device Encryption fərqi

Bu iki anlayış eyni deyil:

| Funksiya | Mənası |
| --- | --- |
| **BitLocker** | Disk şifrələməsinin əsas Windows texnologiyası |
| **Device encryption** | BitLocker-in uyğun cihazlarda daha avtomatik aktivləşən forması |

Uyğun hardware-də **device encryption** BitLocker-i avtomatik aktivləşdirə və recovery məlumatını Microsoft account, Active Directory və ya Microsoft Entra ID-yə backup edə bilər.

---

## ✅ Üstünlükləri

- Windows daxilində built-in gəlir
- Offline data theft riskini ciddi azaldır
- TPM ilə hardware-backed protection verir
- **BitLocker To Go** ilə removable drive-ları da qoruyur
- Enterprise recovery və idarəetmə modelinə uyğundur

---

## ⚠️ Vacib məhdudiyyətlər

- BitLocker unlock olunmuş sessiyanı qoruyan həll deyil
- Recovery key prosesləri zəifdirsə, ümumi təhlükəsizlik də zəifləyir
- TPM-only rahatdır, amma ən güclü variant deyil
- BIOS/firmware dəyişiklikləri, boot dəyişiklikləri və bəzi support işləri recovery-yə səbəb ola bilər

---

## 🧾 Recovery Key idarəsi

Recovery planı BitLocker-in ayrılmaz hissəsidir.

Recovery key bu yerlərdə saxlanıla bilər:

- **Microsoft account**
- **Active Directory**
- **Microsoft Entra ID**
- **Offline təhlükəsiz saxlanma**

Yaxşı praktika:

- Geniş rollout-dan əvvəl backup modelini müəyyən et
- Kimin key-i retrieve edə bildiyini dəqiq bil
- Real incident olmadan əvvəl support prosesini sınaqdan keçir

---

## 🛠️ Aktivləşdirmə nümunəsi

### GUI ilə:
1. **"Manage BitLocker"** axtarın.
2. İstədiyiniz diski seçin və aktiv edin.
3. **Recovery Key** saxlamaq üsulunu seçin (Microsoft hesabı, USB və ya çap).
4. Şifrələmə tipini seçin və prosesi başladın.

### PowerShell ilə:
```powershell
Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -TpmProtector
```

---

Əgər daha güclü startup assurance lazımdırsa, təkcə TPM yox, **TPM + PIN** də planlaşdırılmalıdır.

## 🧨 Yayğın səhvlər

- Recovery key retrieval prosesi olmadan BitLocker aktiv etmək
- Şifrələmə unlock olunmuş cihazı da qoruyur zənn etmək
- Firmware və boot dəyişikliklərinin recovery yarada biləcəyini unutmaq
- Recovery məlumatını yalnız lokal saxlayıb mərkəzi prosesi olmamaq
- Device encryption ilə tam enterprise-managed BitLocker modelini eyni hesab etmək

---

## 🧠 Qısa Nəticə

BitLocker Windows üçün ən dəyərli built-in təhlükəsizlik nəzarətlərindən biridir. Əksər təşkilatlar üçün düzgün baseline belə görünür:

- mümkün olan hər yerdə TPM əsaslı BitLocker
- mərkəzi recovery key backup
- yüksək riskli cihazlar və privileged user-lər üçün TPM + PIN

Düzgün qurulanda BitLocker endpoint məlumat təhlükəsizliyini az əməliyyat xərci ilə ciddi şəkildə gücləndirir.
