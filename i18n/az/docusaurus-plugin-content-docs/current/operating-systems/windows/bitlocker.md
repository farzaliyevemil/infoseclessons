---
id: bitlocker
title: BitLocker Nədir?
description: >-
  Windows sistemlərində disk şifrələməsi üçün istifadə edilən BitLocker
  texnologiyasına giriş.
slug: /bitlocker
---

# 🔐 BitLocker Nədir?

**BitLocker** — Windows tərəfindən təqdim edilən disk şifrələmə texnologiyasıdır. Məqsədi məlumatların qorunmasını təmin etməkdir. Hətta sistem açılmamış olsa belə, məlumatlar qorunur.

---

## 🎯 Əsas Məqsədi

- Fiziki oğurluq və ya cihaz itkisi zamanı diskin oxunmasının qarşısını almaq.
- Offline hücumlara qarşı qoruma.

---

## ⚙️ İş Prinsipi

- **Tam Disk Şifrələməsi (Full Disk Encryption)**: Diskdəki bütün məlumatları şifrələyir.
- **TPM (Trusted Platform Module) ilə İnteqrasiya**: Şifrələmə açarlarını təhlükəsiz saxlamaq üçün TPM istifadə olunur.
- **Recovery Key ilə Bərpa**: Şifrələnmiş diskləri bərpa etmək üçün Recovery Key istifadə olunur.

---

## ✅ Üstünlükləri

- Sadə idarəetmə (GUI və PowerShell ilə).
- Tam disk şifrələməsi.
- **BitLocker To Go**: USB cihazlar üçün şifrələmə dəstəyi.
- TPM dəstəyi ilə daha yüksək təhlükəsizlik.

---

## ⚠️ Məhdudiyyətlər

- **Home Edition** versiyasında mövcud deyil.
- TPM olmayan sistemlərdə konfiqurasiya çətin ola bilər.
- Az da olsa performans itkisi müşahidə edilə bilər.

---

## 🛠️ Aktivləşdirmə

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

## 🧾 Recovery Key Harada Saxlanır?

- **Microsoft Hesabı**: Recovery Key avtomatik olaraq hesabınıza yüklənir.
- **Active Directory**: Şəbəkə mühitlərində saxlanıla bilər.
- **Azure AD**: Bulud əsaslı idarəetmə üçün.
- **USB və ya Çap**: Fiziki olaraq saxlamaq üçün.

---

## 🧠 Qısa Nəticə

**BitLocker**, şəxsi və korporativ istifadəçilər üçün effektiv təhlükəsizlik vasitəsidir. Diskin offline şifrələnməsi hücumlara qarşı ilkin qoruma səviyyəsini təmin edir. Doğru qurulduqda, məlumatların təhlükəsizliyini artırmaq üçün əvəzolunmaz bir vasitədir.
