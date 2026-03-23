---
id: open-source-network-security-tools
title: Açıq Mənbə Şəbəkə Təhlükəsizliyi Alətləri
description: Firewall, IDS/IPS, trafik analizi, NAC və WAF ssenariləri üçün praktik açıq mənbə alətlərinə fokuslanan bələdçi.
slug: /general-security/open-source-network-security-tools
sidebar_position: 2
---

# Açıq Mənbə Şəbəkə Təhlükəsizliyi Alətləri

Bu bələdçi şəbəkə yönümlü təhlükəsizlik nəzarətlərinə və praktik open-source alətlərə fokuslanır.

---

## 🧱 Firewall və kənar nəzarət

### OPNsense / pfSense

Daha uyğundur:

- perimeter firewall
- VPN access
- kiçik və orta şəbəkələr
- lab və homelab

Seçilmə səbəbləri:

- geniş feature set
- web-based idarəetmə
- güclü community istifadəsi

Tradeoff:

- policy və tuning yenə də ciddi admin diqqəti tələb edir

---

## 🚨 IDS / IPS

### Suricata

Daha uyğundur:

- signature-based detection
- IDS/IPS ssenariləri
- firewall appliance və monitorinq stack-lərinə inteqrasiya

### Snort

Daha uyğundur:

- klassik IDS/IPS mühitləri
- artıq Snort qaydalarına alışmış komandalar

---

## 🔍 Şəbəkə trafik analizi

### Zeek

Daha uyğundur:

- protocol-aware görünürlük
- forensik trafik analizi
- SOC və tədqiqat mühitləri

Zeek firewall deyil. Ən güclü tərəfi investigation üçün zəngin network telemetry verməsidir.

---

## 🛂 Network Access Control

### PacketFence

Daha uyğundur:

- guest access control
- device onboarding
- NAC lab və kampus tipli mühitlər

---

## 🛡️ Web Application Firewall

### ModSecurity

Daha uyğundur:

- klassik WAF deployment-lər
- reverse proxy inspect ssenariləri
- public web app qarşısında rule-based qoruma

### SafeLine

Daha uyğundur:

- modern self-hosted WAF yanaşması istəyən komandalar

Tradeoff:

- WAF secure development və patching-in əvəzi deyil

---

## ✅ Başlanğıc üçün tövsiyə

Praktik open-source network stack qurursansa:

1. edge control üçün **OPNsense/pfSense**
2. IDS/IPS görünürlüyü üçün **Suricata**
3. daha dərin investigation üçün **Zeek**
4. public web tətbiqlərin varsa **ModSecurity** və ya oxşar WAF

---

## 📌 Yekun fikir

Ən yaxşı open-source network security stack çox alətli olan yox, komandanın davamlı quraşdırıb, anlayıb, tune edib monitor edə bildiyi stack-dir.
