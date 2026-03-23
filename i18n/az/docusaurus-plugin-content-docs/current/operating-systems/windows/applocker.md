---
id: applocker
title: AppLocker Nədir?
description: AppLocker-in necə işlədiyini, audit mode istifadəsini və publisher, path, hash qaydalarının fərqini öyrənin.
slug: /operating-systems/windows/applocker
---

# 🧱 AppLocker Nədir?

**AppLocker** — Windows-da administratorlara **hansı proqramların işləyə biləcəyini** müəyyən etməyə imkan verən application control funksiyasıdır. Praktik baxımdan o, Windows mühitlərində daha əlçatan allowlisting həllərindən biridir.

---

## 🎯 Nə üçün istifadə olunur?

- İcazəsiz proqramların qarşısını almaq
- Riskli qovluqlardan işə salınan alətləri bloklamaq
- Script əsaslı hücum səthini azaltmaq
- Endpoint-lərdə proqram nəzarətini gücləndirmək

Xüsusilə bunlar üçün uyğundur:

- Workstation-lar
- Kiosk və lab cihazları
- İdarəetmə workstation-ları
- Daha güclü app control istəyən, amma hələ WDAC səviyyəsinə keçməyən mühitlər

---

## 🔑 Nələri idarə edə bilir?

AppLocker bu rule collection-lar üzrə işləyə bilir:

- **Executable** fayllar
- **Windows Installer** faylları
- **Script** faylları
- **Packaged app** və packaged app installer-lər
- İstəyinə görə **DLL** qaydaları

> DLL qaydaları daha çox nəzarət verir, amma hər DLL load üçün yoxlama getdiyi üçün complexity və operational yükü artırır.

---

## 🧭 Audit Mode ilə başlamaq lazımdır

AppLocker deployment-də ən vacib qaydalardan biri əvvəlcə **Audit only** ilə başlamaqdır.

Səbəb:

- Hansı tətbiqlərin bloklanacağını əvvəlcədən görürsən
- Unudulmuş business-critical app-ləri aşkar edirsən
- Policy-ni real istifadə əsasında tənzimləyirsən

Bu yanaşma Microsoft-un AppLocker planlama tövsiyələri ilə də üst-üstə düşür.

---

## 🧩 Rule Condition növləri

AppLocker-də üç əsas condition type var:

| Rule type | Nə üçün uyğundur | Tradeoff |
| --- | --- | --- |
| **Publisher** | Signed vendor software üçün | Əksər mühitlərdə daha rahat idarə olunur |
| **Path** | `Program Files`, `Windows` kimi güvənilən qovluqlar üçün | İdarəsi asandır, amma writable qovluqlarda risklidir |
| **File Hash** | Unsigned və ya xüsusi istisna halları üçün | Dəqiqdir, amma update olduqca tez köhnəlir |

Praktik qayda:

- Əsas strategiya kimi **Publisher**
- Ehtiyatla **Path**
- İstisna hallarda **File Hash**

---

## 🛠️ Əsas workflow

1. Default allow rule-ları yarat
2. **Audit only** ilə başla
3. AppLocker event-lərinə bax
4. Legit app-lər üçün çatışmayan allow rule-ları əlavə et
5. Sonra **Enforce rules**-a keç

Path:

`gpedit.msc` -> `Computer Configuration` -> `Windows Settings` -> `Security Settings` -> `Application Control Policies` -> `AppLocker`

---

## 🧰 PowerShell nümunələri

```powershell
# Effective policy-yə bax
Get-AppLockerPolicy -Effective | Select-Object -ExpandProperty RuleCollections

# Reference path əsasında başlanğıc policy yarat
New-AppLockerPolicy -Path "C:\Program Files" -RuleType Publisher,Hash,Path -User Everyone

# Policy-ni XML kimi export et
Get-AppLockerPolicy -Local | Set-Content .\AppLockerPolicy.xml
```

---

## ⚖️ AppLocker və WDAC fərqi

AppLocker faydalıdır, amma Windows ekosistemində ən güclü application control həlli deyil.

Sadə desək:

- **AppLocker** tətbiqi daha asan olan variantdır
- **WDAC / App Control for Business** daha güclü və dərin nəzarət verir

Yəni real başlanğıc nöqtəsi kimi AppLocker çox rahatdır. Daha sərt enterprise control üçün isə uzunmüddətli istiqamət WDAC olur.

---

## ⚠️ Yayğın səhvlər

- Audit mərhələsi olmadan birbaşa enforce etmək
- Writable qovluqlarda həddən artıq path rule istifadə etmək
- Script nəzarətini unutmaq
- DLL rule-ları operational təsiri anlamadan aktivləşdirmək
- AppLocker-i EDR, patching və privilege management-in əvəzi kimi görmək

---

## ✅ AppLocker harada daha uyğundur?

Ən yaxşı nəticə layered yanaşmada olur:

- Standart user modeli
- Local admin məhdudiyyəti
- AppLocker və ya WDAC
- EDR / Defender
- Logging və alerting

---

## 📌 Nəticə

AppLocker Windows üçün güclü **defense-in-depth** control-dur. Əgər onu düzgün qursan, əvvəlcə **Audit only** ilə başlasan və maintainable rule-lar seçsən, icazəsiz proqramların işləməsini ciddi şəkildə azalda bilərsən.
