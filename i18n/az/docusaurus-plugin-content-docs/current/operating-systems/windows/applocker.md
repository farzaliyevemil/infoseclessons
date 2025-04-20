---
id: applocker
title: AppLocker Nədir?
description: Windows AppLocker ilə tətbiqlərin işləməsinə nəzarət etmə qaydası.
slug: /applocker
---

# 🧱 AppLocker Nədir?

**AppLocker** — Windows sistemində administratorlara istifadəçilərin hansı tətbiqləri işə sala biləcəyini müəyyən etməyə imkan verən bir **application whitelisting** (tətbiq ağ siyahı) sistemidir.

---

## 🎯 Məqsədi

- Malware və naməlum proqramların qarşısını almaq.
- İstifadəçilərin yalnız icazə verilmiş proqramlardan istifadə etməsini təmin etmək.
- Endpoint təhlükəsizliyini artırmaq.

---

## 🔑 Necə işləyir?

AppLocker aşağıdakı əsas qruplara uyğun qaydalar yaradır:

- **EXE və DLL** faylları.
- **MSI və MSP** (install packages).
- **Scripts** (.ps1, .bat, .cmd, .vbs, .js).
- **AppX** (Windows Store tətbiqləri).

---

## 🛠️ AppLocker Konfiqurasiyası

### GUI ilə:
1. `gpedit.msc` → *Computer Configuration* → *Windows Settings* → *Security Settings* → *Application Control Policies* → *AppLocker*.
2. Hər bir növ üçün qaydalar yarada və ya redaktə edə bilərsiniz (EXE, script və s.).
3. Qaydanı "Publisher", "Path" və ya "File Hash" əsaslı yarada bilərsiniz.

### PowerShell ilə:
```powershell
# Mövcud qaydaları əldə etmək
Get-AppLockerPolicy -Effective | ConvertFrom-XML

# Yeni qayda yaratmaq
New-AppLockerPolicy -Path "C:\example" -RuleType Path -User Everyone -RuleName "ExampleRule"
```

---

## ✅ Üstünlükləri

- Sürətli və lokal whitelist sistemi.
- Group Policy ilə mərkəzi idarəetmə.
- Endpoint təhlükəsizliyinin artırılması.
- PowerShell skriptlərin bloklanması.

---

## ⚠️ Məhdudiyyətlər

- Yalnız **Enterprise** və **Education** versiyalarında mövcuddur.
- Bəzi proqramlar hash və ya path dəyişdikdə qaydaları poza bilər.
- Geniş və kompleks mühitlərdə qaydaların idarəsi çətinləşə bilər.

---

## 📌 Nəticə

**AppLocker**, sistemdəki təhlükəsizlik səviyyəsini artırmaq və endpoint nəzarətini təmin etmək üçün əla bir vasitədir. GRC (Governance, Risk, Compliance) və Blue Team proseslərində vacib rol oynayır.
