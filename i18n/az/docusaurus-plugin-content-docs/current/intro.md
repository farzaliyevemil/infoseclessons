---
id: intro
title: Başlanğıc
description: "Aydın öyrənmə yolları, praktik dərslər və blue team, red team, sistemlər, sertifikatlar üzrə əsas biliklər."
slug: /
---

# InfoSec Dərslərinə Xoş Gəlmisiniz

Real IT və təhlükəsizlik işinə uyğun qısa, praktik dərslərlə öyrənin.

---

## Bir Yol Seçin

<div className="landing-grid">
  <a className="landing-card" href="networking/network-types-and-topology">
    <span className="landing-card__eyebrow">Əsaslar</span>
    <strong>Şəbəkə ilə başlayın</strong>
    <p>Əvvəl əsas modeli qurun: IP ünvanlama, routing, VLAN, DNS, portlar və diaqnostika.</p>
  </a>
  <a className="landing-card" href="blue-teaming/log-analysis">
    <span className="landing-card__eyebrow">Blue Team</span>
    <strong>Loq analizi öyrənin</strong>
    <p>Hansı loqları toplamaq, onları necə oxumaq və araşdırma zamanı necə düşünmək lazım olduğunu görün.</p>
  </a>
  <a className="landing-card" href="red-teaming/initial-access">
    <span className="landing-card__eyebrow">Red Team</span>
    <strong>Initial access mövzusunu öyrənin</strong>
    <p>Ən çox istifadə olunan foothold vektorlarını və real simulyasiya üçün vacib qəbul edilən şərtləri nəzərdən keçirin.</p>
  </a>
  <a className="landing-card" href="certifications/microsoft-certifications">
    <span className="landing-card__eyebrow">Karyera Planı</span>
    <strong>Sertifikat yolunu seçin</strong>
    <p>Microsoft, AWS və CompTIA yollarını müqayisə edin və rolunuza uyğun başlanğıc nöqtəni seçin.</p>
  </a>
</div>

## Öyrənmə Yolları

İşlədiyiniz rolu seçin və dərsləri sıra ilə izləyin. Hər yolda foundation, intermediate və advanced material qarışıqdır — yaşıl/sarı/qırmızı badge-lərlə dərinliyi həmişə görəcəksiniz.

### 🟢 Başlanğıc IT / Helpdesk
[Şəbəkə Növləri və Topologiya](/networking/network-types-and-topology) → [IP Ünvanlama](/networking/ip-addressing) → [DHCP](/networking/dhcp) → [DNS](/networking/dns) → [Yayğın Helpdesk Ticket-ləri](/helpdesk-basics/common-helpdesk-tickets) → [Windows Run Əmrləri](/operating-systems/windows/run-commands).

### 🛠️ Windows / Sysadmin
[Windows Server Planlaşdırma](/servers/windows-server-planning) → [Active Directory DS](/servers/active-directory-domain-services) → [FSMO Rolları](/servers/fsmo) → [Group Policy](/servers/group-policy) → [Microsoft LAPS](/servers/laps) → [BitLocker](/operating-systems/windows/bitlocker) → [Backup](/servers/backup) → [Resilience və HA](/servers/resilience-and-availability).

### 🔵 Blue Team / SOC Analitik
[CIA Triada](/general-security/cia-triad) → [Loq Analizi](/blue-teaming/log-analysis) → [Endpoint Təhlükəsizliyi](/blue-teaming/endpoint-security) → [Mitigation Texnikaları](/blue-teaming/mitigation-techniques) → [Hadisə İzlənməsi və Mitigation](/blue-teaming/investigation-and-mitigation) → [Açıq Mənbə SIEM](/general-security/open-source-tools/siem-and-monitoring) → [Threat Intel və Malware](/general-security/open-source-tools/threat-intel-and-malware) → [Digital Forensics](/blue-teaming/digital-forensics).

### 🔴 Red Team / Pentester
[Şəbəkə Foundation](/networking/network-types-and-topology) → [Linux Əsas Komandaları](/operating-systems/linux/basic-commands) → [WSL](/operating-systems/windows/wsl) → [Initial Access](/red-teaming/initial-access) → [Hücum Vektorları və Səthləri](/red-teaming/threat-vectors-and-attack-surfaces) → [Sosial Mühəndislik](/red-teaming/social-engineering) → [OWASP Top 10](/red-teaming/owasp-top-10) → [Şəbəkə Hücumları](/red-teaming/network-attacks) → [Malware Növləri](/red-teaming/malware-types) → [Hücum İndikatorları](/red-teaming/attack-indicators) → [Penetration Testing](/red-teaming/penetration-testing) → [Threat Actors və Intel](/red-teaming/threat-actors-and-intel) → [Red-Team Alətləri (Açıq Mənbə)](/general-security/open-source-tools/red-team-tools).

### ☁️ Bulud Təhlükəsizlik Mühəndisi
[Şəbəkə Foundation](/networking/network-types-and-topology) → [Təhlükəsiz Şəbəkə Dizaynı](/networking/secure-network-design) → [Bulud Hesablama Təhlükəsizliyi](/general-security/cloud-computing-security) → [Bulud Təhlükəsizlik Həlləri](/general-security/cloud-security-solutions) → [Müəssisə Memarlığı](/general-security/enterprise-security-architecture) → [Açıq Mənbə Bulud Alətləri](/general-security/open-source-tools/overview) → [Secrets və PAM](/general-security/open-source-tools/secrets-and-pam).

### 🔍 DFIR / Forensics Analitik
[Endpoint Təhlükəsizliyi](/blue-teaming/endpoint-security) → [Hadisə İzlənməsi](/blue-teaming/investigation-and-mitigation) → [Digital Forensics](/blue-teaming/digital-forensics) → [Malware Növləri](/red-teaming/malware-types) → [Hücum İndikatorları](/red-teaming/attack-indicators) → [Threat Actors](/red-teaming/threat-actors-and-intel) → [Açıq Mənbə Threat Intel](/general-security/open-source-tools/threat-intel-and-malware).

### 🛡️ GRC / Uyğunluq Məsulu
[CIA Triada](/general-security/cia-triad) → [Risk və Məxfilik](/grc/risk-and-privacy) → [Təhlükəsizlik Siyasətləri](/grc/policies) → [Təhlükəsizlik Nəzarətləri](/grc/security-controls) → [Təhlükəsizlik İdarəetməsi](/grc/security-governance) → [Açıq Mənbə GRC Alətləri](/general-security/open-source-tools/grc-tools) → [IAM və Hesab İdarəetməsi](/general-security/iam-account-management).

### 🧠 Threat Intelligence Analitik
[Threat Actors və Intel](/red-teaming/threat-actors-and-intel) → [Hücum İndikatorları](/red-teaming/attack-indicators) → [Malware Növləri](/red-teaming/malware-types) → [Hücum Vektorları](/red-teaming/threat-vectors-and-attack-surfaces) → [Şəbəkə Hücumları](/red-teaming/network-attacks) → [Açıq Mənbə Threat Intel](/general-security/open-source-tools/threat-intel-and-malware).

### 🧑‍💻 AppSec / DevSecOps Mühəndisi
[Təhlükəsiz Tətbiq İnkişafı](/general-security/secure-app-development) → [OWASP Top 10](/red-teaming/owasp-top-10) → [Zəiflik İdarəetməsi](/general-security/vulnerability-management) → [Kriptoqrafiya Əsasları](/general-security/cryptography-basics) → [Kriptoqrafiya İrəliləyiş](/general-security/cryptography/cryptography-advanced) → [PKI](/general-security/cryptography/pki) → [Zəiflik və AppSec Alətləri](/general-security/open-source-tools/vulnerability-and-appsec) → [Penetration Testing](/red-teaming/penetration-testing).

### 🔐 Identity / IAM Mühəndisi
[AAA və İnkar Etməmə](/general-security/aaa-non-repudiation) → [IAM və Hesab İdarəetməsi](/general-security/iam-account-management) → [Active Directory DS](/servers/active-directory-domain-services) → [Group Policy](/servers/group-policy) → [LAPS](/servers/laps) → [PKI](/general-security/cryptography/pki) → [IAM və MFA Alətləri (Açıq Mənbə)](/general-security/open-source-tools/iam-and-mfa).

### 🎓 Sertifikatlar
İstədiyiniz rola görə [CompTIA](/certifications/comptia-certifications), [Microsoft](/certifications/microsoft-certifications) və [AWS](/certifications/aws-certifications) yollarını müqayisə edin.

## Dərsləri Daha Tez Tapın

- Bütün dərsləri yan menyudan gəzə bilərsiniz.
- [Axtarış səhifəsi](/search) ilə rol, kateqoriya və açar sözə görə filtr edin.
- Naməlum terminə rast gəldikdə [Qısaltma Lüğəti](/glossary) açın — 288 yazı, hər biri izah edən dərsə bağlıdır.
- Saytın məqsədi, yenilənmə qaydası və töhfə prosesi üçün [Haqqında](/about) səhifəsinə baxın.
