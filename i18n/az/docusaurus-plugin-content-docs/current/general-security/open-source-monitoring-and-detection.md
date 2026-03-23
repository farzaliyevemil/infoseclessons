---
id: open-source-monitoring-and-detection
title: Açıq Mənbə Monitorinq və Detection Alətləri
description: Open-source SIEM, monitorinq, alerting və trafik görünürlüğü alətləri üçün fokuslanmış bələdçi.
slug: /general-security/open-source-monitoring-and-detection
sidebar_position: 3
---

# Açıq Mənbə Monitorinq və Detection Alətləri

Detection tək məhsul deyil. Log, alerting, endpoint visibility və network telemetry qatlarının birləşməsidir.

---

## 📊 SIEM və loq idarəetməsi

### ELK Stack

Daha uyğundur:

- mərkəzləşdirilmiş log
- axtarış və dashboard
- çevik custom pipeline

Tradeoff:

- güclüdür, amma əməliyyat yükü ağırdır

### Wazuh

Daha uyğundur:

- endpoint visibility ilə SIEM tipli alerting-i birləşdirmək
- az heyətlə daha tez nəticə almaq

Tradeoff:

- false positive-ləri azaltmaq üçün tuning lazımdır

---

## 🖥️ Endpoint detection və integrity

### Wazuh

Faydalıdır:

- file integrity monitoring
- agent əsaslı telemetry
- baseline compliance görünürlüğü

### OSSEC

Faydalıdır:

- daha sadə host-based monitorinq
- daha az resurslu mühitlər

Tradeoff:

- daha müasir platformalar qədər zəngin deyil

---

## 📈 Monitorinq və alerting

### Zabbix

Daha uyğundur:

- infrastruktur monitorinqi
- server, cihaz və service alert-ləri

### Prometheus + Grafana

Daha uyğundur:

- metric-heavy mühitlər
- modern infrastruktur və platform monitorinqi

### Uptime Kuma

Daha uyğundur:

- yüngül uptime yoxlamaları
- kiçik mühitlər üçün sadə görünürlük

---

## 🔎 Trafik və təhlükəsizlik konteksti

### Zeek

Ən faydalıdır:

- protocol səviyyəsində network telemetry
- investigation dəstəyi
- şübhəli trafik üçün daha zəngin analiz konteksti

### Suricata

Ən faydalıdır:

- IDS/IPS tipli detection
- rule-based network alert-ləri

---

## ✅ Yetkinlik səviyyəsinə görə stack

### Kiçik komanda

- Uptime Kuma
- Wazuh
- bir mərkəzi log hədəfi

### Böyüyən komanda

- Zabbix və ya Prometheus + Grafana
- Wazuh və ya ELK əsaslı workflow
- network context üçün Suricata və/və ya Zeek

---

## 📌 Yekun fikir

Ən yaxşı detection stack çox alət yığmaq deyil; komandanın tune edib investigation və response apara bildiyi stack-dir.
