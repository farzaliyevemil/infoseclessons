---
id: glossary
title: Kibertəhlükəsizlik Qısaltma Lüğəti
description: AAA-dan ZTNA-ya qədər 150-dən çox kibertəhlükəsizlik qısaltmasının istinad lüğəti — qısa təriflər və hər birini dərindən izah edən dərslərə keçidlərlə.
slug: /glossary
sidebar_position: 2
status: reference
last_reviewed: 2026-04-28
keywords:
  - glossary
  - acronyms
  - cybersecurity terms
  - reference
---

Bu lüğət kibertəhlükəsizliyin qısaltma şorbasını sürətlə axtarmaq üçün cədvəldir. Hər sətir qısaltmanı, onun açılışını və bir cümləlik tərifi verir. Bu saytdakı dərs mövzunu dərindən əhatə edirsə, tərif birbaşa həmin dərsə keçid verir.

Onu dərslərə yoldaş kimi istifadə edin: paraqraf ortasında bir TLA (üç hərfli qısaltma) görünəndə bura sıçrayın, sonra geri qayıdın. Siyahı birinci hərfə görə qruplaşdırılıb (A-dan Z-yə), sonda kiçik rəqəmli və xüsusi yazılar var.

## Rəqəmli və xüsusi

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `0-day` | Zero-day vulnerability | Hələ vendor yamağı olmadan istismar edilən zəiflik. Bax [Vulnerability Management](/general-security/vulnerability-management). |
| `3-2-1` | 3-2-1 backup rule | Verilənlərin 3 nüsxəsini 2 mühitdə, 1-ni isə kənar yerdə saxlayın. Bax [Backup](/servers/backup). |
| `802.1X` | IEEE 802.1X | EAP istifadə edən port əsaslı şəbəkə girişi nəzarəti. Bax [Wireless Security](/networking/wireless-security). |
| `802.11` | IEEE 802.11 | Wi-Fi simsiz LAN standartlarının ailəsi. Bax [Wireless Security](/networking/wireless-security). |

## A

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `AAA` | Authentication, Authorization, Accounting | Girişi vermək və izləmək üçün çərçivə. Bax [AAA and Non-Repudiation](/general-security/aaa-non-repudiation). |
| `ABAC` | Attribute-Based Access Control | İstifadəçi, resurs və kontekst atributlarına görə qərar verilən icazə modeli. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `ACL` | Access Control List | Trafiki və ya fayl girişini icazə verən və ya rədd edən sıralanmış qaydalar. Bax [Security Controls](/grc/security-controls). |
| `AD` | Active Directory | İstifadəçilər, kompüterlər və siyasət üçün Microsoft kataloq xidməti. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `ADCS` | Active Directory Certificate Services | X.509 sertifikatlarını verən və idarə edən Microsoft rolu. Bax [PKI](/general-security/cryptography/pki). |
| `ADDS` | Active Directory Domain Services | Şəxsiyyət və siyasət məlumatını saxlayan əsas kataloq rolu. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `AES` | Advanced Encryption Standard | Bütün dünyada istifadə olunan simmetrik blok şifri. Bax [Cryptography Basics](/general-security/cryptography-basics). |
| `AH` | Authentication Header | Tamlığı təmin edən, lakin məxfiliyi təmin etməyən IPsec protokolu. Bax [VPN](/networking/vpn). |
| `AICPA` | American Institute of CPAs | SOC audit standartlarını saxlayan qurum. Bax [Security Governance](/grc/security-governance). |
| `AP` | Access Point | Wi-Fi müştəriləri ilə kabelli LAN arasında körpü olan simsiz cihaz. Bax [Wireless Security](/networking/wireless-security). |
| `APN` | Access Point Name | Cihaz ilə operator şəbəkəsi arasında mobil şlüz identifikatoru. Bax [Mobile Security](/general-security/mobile-security). |
| `APT` | Advanced Persistent Threat | Gizli, uzunmüddətli, çox vaxt dövlət tərəfindən maliyyələşdirilən rəqib. Bax [Threat Actors and Intel](/red-teaming/threat-actors-and-intel). |
| `AppLocker` | Application Locker | İcra olunan faylları ağ siyahıya alan və ya bloklayan Windows xüsusiyyəti. Bax [AppLocker](/operating-systems/windows/applocker). |
| `ARP` | Address Resolution Protocol | LAN-da IPv4 ünvanlarını MAC ünvanlarına bağlayır. Bax [Ethernet and ARP](/networking/ethernet-and-arp). |
| `ASLR` | Address Space Layout Randomization | Proses ünvan sahəsini təsadüfiləşdirən yaddaş mühafizəsi. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `ASA` | Adaptive Security Appliance | Cisco firewall və VPN platforması. Bax [Network Devices](/networking/network-devices). |
| `ATT&CK` | Adversarial Tactics, Techniques, and Common Knowledge | Hücumçu davranışına dair MITRE bilik bazası. Bax [Attack Indicators](/red-teaming/attack-indicators). |
| `AUP` | Acceptable Use Policy | Təşkilat resurslarının məqbul istifadəsini müəyyən edən sənəd. Bax [Policies](/grc/policies). |
| `AV` | Antivirus | Zərərli proqramları aşkarlayan və silən proqram təminatı. Bax [Endpoint Security](/blue-teaming/endpoint-security). |

## B

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `BCP` | Business Continuity Plan | Pozulma zamanı kritik funksiyaları işlək saxlayan plan. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `BEC` | Business Email Compromise | Biznes e-poçtu hesablarını ələ keçirən və ya təqlid edən saxtakarlıq. Bax [Social Engineering](/red-teaming/social-engineering). |
| `BGP` | Border Gateway Protocol | Avtonom sistemlər arasında yolları mübadilə edən yönləndirmə protokolu. Bax [Network Devices](/networking/network-devices). |
| `BIA` | Business Impact Analysis | Hansı funksiyaların ən vacib olduğunu və dözümlü dayanma müddətini qiymətləndirir. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `BIOS` | Basic Input/Output System | OS-dən əvvəl avadanlığı işə salan köhnə firmware. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |
| `BSI` | Bundesamt fur Sicherheit in der Informationstechnik | Almaniyanın federal kibertəhlükəsizlik orqanı və standart qurumu. |
| `BYOD` | Bring Your Own Device | Şəxsi cihazlara korporativ şəbəkədə icazə verən siyasət. Bax [Mobile Security](/general-security/mobile-security). |

## C

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `C2` | Command and Control | Hücumçunun ələ keçirilmiş hostları idarə etmək üçün kanalı. Bax [Attack Indicators](/red-teaming/attack-indicators). |
| `CA` | Certificate Authority | X.509 rəqəmsal sertifikatlarının etibarlı verici. Bax [PKI](/general-security/cryptography/pki). |
| `CAB` | Change Advisory Board | IT dəyişikliklərini nəzərdən keçirən və təsdiqləyən qrup. Bax [Security Governance](/grc/security-governance). |
| `CASB` | Cloud Access Security Broker | İstifadəçilər ilə bulud xidmətləri arasında siyasət icra nöqtəsi. Bax [Cloud Security Solutions](/general-security/cloud-security-solutions). |
| `CCM` | Cloud Controls Matrix | Bulud təhlükəsizliyi nəzarətlərinin CSA çərçivəsi. Bax [Cloud Computing Security](/general-security/cloud-computing-security). |
| `CCPA` | California Consumer Privacy Act | İstehlakçıya verilən məlumat hüquqlarını verən Kaliforniya qanunu. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `CDN` | Content Delivery Network | Veb məzmunu kənar qovşaqlardan paylayan paylanmış keş. Bax [Network Types and Topology](/networking/network-types-and-topology). |
| `CEH` | Certified Ethical Hacker | Hücum təhlükəsizliyi üçün EC-Council sertifikatı. Bax [CompTIA Certifications](/certifications/comptia-certifications). |
| `CER` | Crossover Error Rate | FAR-ın FRR-ə bərabər olduğu biometrik dəqiqlik nöqtəsi. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `CIA` | Confidentiality, Integrity, Availability | Klassik təhlükəsizlik üçbucağı. Bax [CIA Triad](/general-security/cia-triad). |
| `CIS` | Center for Internet Security | CIS Controls və Benchmarks-ı dərc edən qeyri-kommersiya qurumu. Bax [Security Controls](/grc/security-controls). |
| `CISA` | Cybersecurity and Infrastructure Security Agency | ABŞ-ın mülki kiber müdafiəyə rəhbərlik edən agentliyi; həmçinin ISACA audit sertifikatı. |
| `CISO` | Chief Information Security Officer | Təhlükəsizlik proqramına cavabdeh icraçı rəhbər. Bax [Security Governance](/grc/security-governance). |
| `CISM` | Certified Information Security Manager | Təhlükəsizlik idarəçiliyi üçün ISACA sertifikatı. |
| `CISSP` | Certified Information Systems Security Professional | (ISC)^2 yüksək səviyyəli təhlükəsizlik sertifikatı. Bax [CompTIA Certifications](/certifications/comptia-certifications). |
| `CMDB` | Configuration Management Database | IT aktivlərinin və əlaqələrinin inventarı. Bax [Security Governance](/grc/security-governance). |
| `CMMC` | Cybersecurity Maturity Model Certification | ABŞ DoD təchizat zənciri kibertəhlükəsizlik qiymətləndirməsi. |
| `COBIT` | Control Objectives for Information and Related Technologies | ISACA IT idarəetmə çərçivəsi. Bax [Security Governance](/grc/security-governance). |
| `COPE` | Corporate-Owned, Personally Enabled | Şirkətin sahib olduğu cihazları kadrların həm də şəxsi məqsədlə istifadə etdiyi mobil model. Bax [Mobile Security](/general-security/mobile-security). |
| `CRC` | Cyclic Redundancy Check | Təsadüfi məlumat dəyişikliklərini aşkarlayan yoxlama məbləği. |
| `CRL` | Certificate Revocation List | Vaxtından əvvəl ləğv edilmiş sertifikatların imzalanmış siyahısı. Bax [PKI](/general-security/cryptography/pki). |
| `CRS` | Core Rule Set | Ümumi WAF aşkarlama qaydalarının OWASP dəsti. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `CSF` | Cybersecurity Framework | NIST risk əsaslı çərçivəsi (Identify, Protect, Detect, Respond, Recover). Bax [Security Governance](/grc/security-governance). |
| `CSO` | Chief Security Officer | Fiziki və informasiya təhlükəsizliyinə cavabdeh icraçı rəhbər. |
| `CSPM` | Cloud Security Posture Management | Bulud hesablarındakı yanlış konfiqurasiyaları tapan vasitələr. Bax [Cloud Security Solutions](/general-security/cloud-security-solutions). |
| `CTF` | Capture The Flag | Praktiki təhlükəsizlik çağırışı və ya yarış formatı. Bax [Penetration Testing](/red-teaming/penetration-testing). |
| `CVE` | Common Vulnerabilities and Exposures | İctimaiyyətə açıqlanan zəifliklərin kataloqu. Bax [Vulnerability Management](/general-security/vulnerability-management). |
| `CVSS` | Common Vulnerability Scoring System | Zəifliklər üçün 0-10 ciddilik qiyməti. Bax [Vulnerability Management](/general-security/vulnerability-management). |
| `CWE` | Common Weakness Enumeration | Proqram və avadanlıq zəiflik növlərinin kataloqu. Bax [Secure App Development](/general-security/secure-app-development). |
| `CYOD` | Choose Your Own Device | Kadrların təsdiqlənmiş şirkət siyahısından seçdiyi mobil model. Bax [Mobile Security](/general-security/mobile-security). |

## D

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `DAC` | Discretionary Access Control | Klassik fayl sistemləri tərəfindən istifadə olunan sahib idarəli giriş modeli. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `DAST` | Dynamic Application Security Testing | İşləyən tətbiqi xaricdən zəifliklər üçün test etmək. Bax [Secure App Development](/general-security/secure-app-development). |
| `DC` | Domain Controller | Active Directory domenində istifadəçiləri autentifikasiya edən server. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `DDoS` | Distributed Denial-of-Service | Çoxlu paylanmış mənbədən gələn DoS hücumu. Bax [Network Attacks](/red-teaming/network-attacks). |
| `DEP` | Data Execution Prevention | Kodun məlumat səhifələrində icra olunmasını bloklayan OS xüsusiyyəti. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `DFIR` | Digital Forensics and Incident Response | Hadisələri araşdıran və lokallaşdıran intizam. Bax [Digital Forensics](/blue-teaming/digital-forensics). |
| `DH` | Diffie-Hellman | Paylaşılan sirr çıxaran açar mübadiləsi alqoritmi. Bax [Cryptography Basics](/general-security/cryptography-basics). |
| `DKIM` | DomainKeys Identified Mail | E-poçtu autentifikasiya edən DNS-də dərc olunan imza. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `DLP` | Data Loss Prevention | Həssas məlumatın çıxarılmasını aşkarlayan və dayandıran nəzarətlər. Bax [Mitigation Techniques](/blue-teaming/mitigation-techniques). |
| `DMARC` | Domain-based Message Authentication, Reporting and Conformance | Saxta poçtu rədd etmək üçün SPF və DKIM-i birləşdirən siyasət. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `DMZ` | Demilitarized Zone | İnternetə baxan xidmətləri təcrid edən şəbəkə seqmenti. Bax [Secure Network Design](/networking/secure-network-design). |
| `DNS` | Domain Name System | İerarxik ad-IP axtarış xidməti. Bax [DNS](/networking/dns). |
| `DNSSEC` | DNS Security Extensions | DNS-ə mənbə autentifikasiyası və tamlıq əlavə edir. Bax [DNS](/networking/dns). |
| `DoH` | DNS over HTTPS | HTTPS daxilində daşınan şifrələnmiş DNS sorğuları. Bax [Secure Protocols](/networking/secure-protocols). |
| `DoT` | DNS over TLS | TLS üzərindən daşınan şifrələnmiş DNS sorğuları. Bax [Secure Protocols](/networking/secure-protocols). |
| `DR` | Disaster Recovery | Böyük pozulmadan sonra IT-nin bərpası. Bax [Resilience and Availability](/servers/resilience-and-availability). |
| `DRP` | Disaster Recovery Plan | Bərpa prosedurlarını və rolları təsvir edən sənəd. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `DV` | Domain Validation | Yalnız domen sahibliyini təsdiqləyən ən aşağı TLS sertifikat səviyyəsi. Bax [PKI](/general-security/cryptography/pki). |

## E

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `EAP` | Extensible Authentication Protocol | 802.1X və PPP üzərindən istifadə olunan autentifikasiya çərçivəsi. Bax [Wireless Security](/networking/wireless-security). |
| `ECC` | Elliptic Curve Cryptography | Eyni güclə RSA-dan daha kiçik açarlara malik açıq açar kriptosu. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `ECDH` | Elliptic Curve Diffie-Hellman | Elliptik əyrilərdən istifadə edən açar razılaşması. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `ECDSA` | Elliptic Curve Digital Signature Algorithm | Elliptik əyriləri istifadə edən imza sxemi. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `EDR` | Endpoint Detection and Response | Təhdidləri qeyd edən, aşkarlayan və cavablandıran endpoint agenti. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `EOL` | End of Life | Məhsulun yenilənmələri qəbul etməyi dayandırdığı tarix. Bax [Upgrade and Migration](/servers/upgrade-migration). |
| `EOSL` | End of Service Life | Məhsulun heç bir vendor dəstəyi almadığı tarix. Bax [Vulnerability Management](/general-security/vulnerability-management). |
| `ESP` | Encapsulating Security Payload | Məxfilik və tamlıq təmin edən IPsec protokolu. Bax [VPN](/networking/vpn). |
| `EV` | Extended Validation | Yoxlanılmış təşkilat şəxsiyyətinə malik ən yüksək TLS sertifikat səviyyəsi. Bax [PKI](/general-security/cryptography/pki). |

## F

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `FAR` | False Acceptance Rate | Saxtakarı qəbul edən biometrik səhv dərəcəsi. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `FRR` | False Rejection Rate | Etibarlı istifadəçini rədd edən biometrik səhv dərəcəsi. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `FCoE` | Fibre Channel over Ethernet | Fibre Channel saxlama çərçivələrini Ethernet üzərindən daşıyır. Bax [Storage, Filesystems and Servers](/servers/storage-filesystems-servers). |
| `FDE` | Full Disk Encryption | Diskdəki hər sektoru şifrələyir. Bax [BitLocker](/operating-systems/windows/bitlocker). |
| `FIDO` | Fast Identity Online | Parolsuz və ikinci amil standartlarını müəyyən edən alyans. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `FIPS` | Federal Information Processing Standards | ABŞ hökumətinin kriptoqrafiya və təhlükəsizlik standartları. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `FIM` | File Integrity Monitoring | Faylların və konfiqurasiyaların icazəsiz dəyişikliklərini aşkarlayır. Bax [Mitigation Techniques](/blue-teaming/mitigation-techniques). |
| `FW` | Firewall | Şəbəkə trafikini qaydalara görə süzgəcdən keçirən cihaz və ya proqram. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |

## G

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `GCM` | Galois/Counter Mode | AES-GCM tərəfindən istifadə olunan AEAD blok şifri rejimi. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `GDPR` | General Data Protection Regulation | Şəxsi məlumatın qorunmasına dair AB tənzimləməsi. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `GFS` | Grandfather-Father-Son | Aylıq, həftəlik və günlük dəstlərin yedəkləmə fırlanma sxemi. Bax [Backup](/servers/backup). |
| `GPO` | Group Policy Object | AD vasitəsilə tətbiq olunan Windows siyasət parametrlərinin konteyneri. Bax [Group Policy](/servers/group-policy). |
| `GUID` | Globally Unique Identifier | Praktikada unikal olduğuna zəmanət verilən 128-bitlik identifikator. |

## H

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `HIDS` | Host-based Intrusion Detection System | Endpoint loglarından və davranışından müdaxiləni aşkarlayır. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `HIPAA` | Health Insurance Portability and Accountability Act | Sağlamlıq məlumatını qoruyan ABŞ qanunu. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `HIPS` | Host-based Intrusion Prevention System | Aşkarlanmış müdaxilələri bloklayan endpoint agenti. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `HMAC` | Hash-based Message Authentication Code | Mesajı autentifikasiya edən açarlı heş. Bax [Cryptography Basics](/general-security/cryptography-basics). |
| `HSM` | Hardware Security Module | Açarları saxlayan və imzalayan dağıdılmaya qarşı dayanıqlı cihaz. Bax [PKI](/general-security/cryptography/pki). |
| `HSTS` | HTTP Strict Transport Security | Brauzerləri HTTPS istifadə etməyə məcbur edən başlıq. Bax [Secure Protocols](/networking/secure-protocols). |
| `HTTPS` | HTTP over TLS | Məxfilik və tamlıq üçün TLS-ə bükülmüş HTTP. Bax [Secure Protocols](/networking/secure-protocols). |

## I

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `IaaS` | Infrastructure as a Service | Virtual hesablama, saxlama və şəbəkə təmin edən bulud modeli. Bax [Cloud Computing Security](/general-security/cloud-computing-security). |
| `IAC` | Infrastructure as Code | İnfrastrukturu versiya idarə olunan şablonlarla təyin etmək. Bax [Cloud Security Solutions](/general-security/cloud-security-solutions). |
| `IAM` | Identity and Access Management | Kimin nəyə və necə girə bildiyinə dair intizam. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `IDP` | Identity Provider | İstifadəçiləri autentifikasiya edən və tokenlər verən xidmət. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `IDS` | Intrusion Detection System | Şübhəli trafikə xəbərdarlıq edən sensor. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `IKE` | Internet Key Exchange | IPsec təhlükəsizlik assosiasiyalarını razılaşdırır. Bax [VPN](/networking/vpn). |
| `IOC` | Indicator of Compromise | Müdaxiləyə işarə edən kriminalistik artefakt. Bax [Attack Indicators](/red-teaming/attack-indicators). |
| `IOA` | Indicator of Attack | Hücumun gedişatını göstərən davranış siqnalı. Bax [Attack Indicators](/red-teaming/attack-indicators). |
| `IPS` | Intrusion Prevention System | Zərərli trafiki bloklayan inline sensor. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `ISAC` | Information Sharing and Analysis Center | Təhdid kəşfiyyatını paylaşmaq üçün sektor üzrə icma. Bax [Threat Actors and Intel](/red-teaming/threat-actors-and-intel). |
| `ISMS` | Information Security Management System | Sənədləşdirilmiş siyasət və nəzarət sistemi (ISO 27001-ə görə). Bax [Security Governance](/grc/security-governance). |
| `ISO` | International Organization for Standardization | ISO 27001 və 27002 kimi standartları nəşr edən qurum. Bax [Security Governance](/grc/security-governance). |
| `ITIL` | Information Technology Infrastructure Library | IT xidmət idarəetməsi üçün ən yaxşı təcrübə çərçivəsi. Bax [Security Governance](/grc/security-governance). |
| `IV` | Initialization Vector | Eyni açıq mətnlərin eyni şəkildə şifrələnməsinin qarşısını alan təsadüfi giriş. Bax [Cryptography Basics](/general-security/cryptography-basics). |

## J

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `JEA` | Just Enough Administration | Yalnız rolun ehtiyacı olan cmdlet-ləri verən PowerShell qabiliyyəti. Bax [Secrets and PAM](/general-security/open-source-tools/secrets-and-pam). |
| `JIT` | Just-In-Time | Yalnız lazım olduğu anda verilən imtiyazlı giriş. Bax [Secrets and PAM](/general-security/open-source-tools/secrets-and-pam). |
| `JSON` | JavaScript Object Notation | Strukturlaşdırılmış məlumat üçün yüngül mətn formatı. |
| `JWT` | JSON Web Token | Veb autentifikasiya axınlarında geniş yayılmış imzalı token formatı. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |

## K

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `KEK` | Key Encryption Key | Saxlama və ya nəql üçün başqa açarları şifrələyən açar. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `KMS` | Key Management Service | Kriptoqrafik açarları təmin edən və qoruyan xidmət; həmçinin Microsoft kütləvi aktivləşdirmə. Bax [KMS](/servers/kms). |
| `KPI` | Key Performance Indicator | Proqramın performansının ölçülə bilən siqnalı. Bax [Security Governance](/grc/security-governance). |
| `KRACK` | Key Reinstallation Attack | WPA2 dörd yollu əl sıxmasında 2017 zəifliyi. Bax [Wireless Security](/networking/wireless-security). |

## L

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `LACP` | Link Aggregation Control Protocol | Bağlanmış Ethernet bağlantılarını razılaşdırmaq üçün standart. Bax [Network Devices](/networking/network-devices). |
| `LAN` | Local Area Network | Bina və ya kampusla məhdudlaşan şəbəkə. Bax [Network Types and Topology](/networking/network-types-and-topology). |
| `LDAP` | Lightweight Directory Access Protocol | AD kimi kataloq xidmətlərini sorğulamaq üçün protokol. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `LDAPS` | LDAP over SSL/TLS | Məxfilik üçün TLS-ə bükülmüş LDAP. Bax [Secure Protocols](/networking/secure-protocols). |
| `LM` | LAN Manager | Köhnə zəif Windows heşi; söndürülməlidir. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |
| `LSA` | Local Security Authority | Autentifikasiya və tokenləri idarə edən Windows alt sistemi. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |

## M

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `MAC` | Media Access Control / Mandatory Access Control | Layer-2 avadanlıq ünvanı; həmçinin etiket idarəli giriş modeli. Bax [Ethernet and ARP](/networking/ethernet-and-arp). |
| `MAM` | Mobile Application Management | Cihazlardakı korporativ tətbiqləri və məlumatları idarə edir. Bax [Mobile Security](/general-security/mobile-security). |
| `MDM` | Mobile Device Management | Cihaz konfiqurasiyasını, siyasəti və silməni idarə edir. Bax [Mobile Security](/general-security/mobile-security). |
| `MDR` | Managed Detection and Response | Outsource edilmiş 24x7 aşkarlama və cavab xidməti. Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `MFA` | Multi-Factor Authentication | İki və ya daha çox autentifikasiya amili tələb edir. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `MITM` | Man-in-the-Middle | Hücumçunun tərəflər arasında trafiki gizlicə ötürdüyü və dəyişdirə bildiyi hücum. Bax [Network Attacks](/red-teaming/network-attacks). |
| `MITRE` | MITRE Corporation | CVE, CWE və ATT&CK-ı işlədən ABŞ qeyri-kommersiya təşkilatı. Bax [Attack Indicators](/red-teaming/attack-indicators). |
| `MOU` | Memorandum of Understanding | Tərəflər arasında niyyət bildirən məcburi olmayan razılaşma. Bax [Policies](/grc/policies). |
| `MPIO` | Multipath I/O | Saxlama cihazlarına ehtiyat yollar təmin edir. Bax [Resilience and Availability](/servers/resilience-and-availability). |
| `MPLS` | Multiprotocol Label Switching | IP axtarışları əvəzinə etiketlərə görə yönləndirən operator texnikası. Bax [Network Types and Topology](/networking/network-types-and-topology). |
| `MSA` | Managed Service Account | Windows-un parolu avtomatik fırladığı AD hesabı. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `MSP` | Managed Service Provider | Davamlı IT əməliyyatları təmin edən vendor. |
| `MSSP` | Managed Security Service Provider | Davamlı təhlükəsizlik əməliyyatları təmin edən vendor. Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `MTA` | Mail Transfer Agent | Domenlər arasında e-poçt yönləndirən server. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `MTU` | Maximum Transmission Unit | İnterfeysin fraqmentləşdirmədən ötürdüyü ən böyük yükləmə. Bax [TCP/IP Model](/networking/tcp-ip-model). |

## N

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `NAC` | Network Access Control | Endpoint-ləri şəbəkəyə buraxmazdan əvvəl mövqe yoxlayır. Bax [Secure Network Design](/networking/secure-network-design). |
| `NAS` | Network Attached Storage | Şəbəkədə paylaşılan fayl səviyyəli saxlama cihazı. Bax [Storage, Filesystems and Servers](/servers/storage-filesystems-servers). |
| `NAT` | Network Address Translation | Paketlər sərhəd keçərkən IP ünvanlarını yenidən yazır. Bax [IP Addressing](/networking/ip-addressing). |
| `NDA` | Non-Disclosure Agreement | Paylaşılan məxfi məlumatı qoruyan müqavilə. Bax [Policies](/grc/policies). |
| `NetBIOS` | Network Basic Input/Output System | Köhnə Windows adlandırma və sessiya API-si. |
| `NGFW` | Next-Generation Firewall | Tətbiq agahlığı, IPS və TLS yoxlaması əlavə edən firewall. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `NIDS` | Network Intrusion Detection System | Şübhəli trafikə xəbərdarlıq edən şəbəkə sensoru. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `NIPS` | Network Intrusion Prevention System | Zərərli trafiki bloklayan inline şəbəkə sensoru. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `NIST` | National Institute of Standards and Technology | 800 seriyalı və CSF təhlükəsizlik təlimatlarını dərc edən ABŞ agentliyi. Bax [Security Governance](/grc/security-governance). |
| `NOC` | Network Operations Center | Şəbəkənin sağlamlığını və işləkliyini izləyən komanda. |
| `NTDS.DIT` | NT Directory Services Database | Domain controller-də AD verilənlər bazasını saxlayan fayl. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `NTP` | Network Time Protocol | Şəbəkə cihazları arasında saatları sinxronlaşdırır. Bax [Ports and Protocols](/networking/ports-and-protocols). |

## O

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `OCSP` | Online Certificate Status Protocol | Sertifikat ləğv statusunun real vaxt yoxlaması. Bax [PKI](/general-security/cryptography/pki). |
| `OIDC` | OpenID Connect | OAuth 2.0 üzərində şəxsiyyət təbəqəsi. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `OOB` | Out-of-Band | Ayrı kanalda kommunikasiya və ya idarəetmə. Bax [Secure Network Design](/networking/secure-network-design). |
| `OS` | Operating System | Avadanlığı, prosesləri və girişi idarə edən proqram. Bax [Operating Systems Overview](/operating-systems). |
| `OSINT` | Open Source Intelligence | İctimai mənbələrdən toplanan kəşfiyyat. Bax [Threat Actors and Intel](/red-teaming/threat-actors-and-intel). |
| `OSI` | Open Systems Interconnection | Şəbəkə üçün yeddi təbəqəli istinad modeli. Bax [OSI Model](/networking/osi-model). |
| `OSPF` | Open Shortest Path First | Link-state daxili yönləndirmə protokolu. Bax [Network Devices](/networking/network-devices). |
| `OT` | Operational Technology | ICS, SCADA və digər sənaye nəzarət sistemləri. Bax [Embedded and IoT Security](/general-security/embedded-and-iot-security). |
| `OU` | Organizational Unit | Active Directory-də obyektləri qruplaşdırmaq üçün konteyner. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `OUI` | Organizationally Unique Identifier | MAC ünvanının vendor müəyyən edən ilk 24 biti. Bax [Ethernet and ARP](/networking/ethernet-and-arp). |
| `OWASP` | Open Worldwide Application Security Project | Top 10 və digər AppSec resurslarını dərc edən qeyri-kommersiya. Bax [OWASP Top 10](/red-teaming/owasp-top-10). |

## P

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `PAC` | Proxy Auto-Config | Brauzerə hər URL üçün hansı proksini istifadə edəcəyini deyən skript. |
| `PaaS` | Platform as a Service | Tətbiqlər üçün idarə olunan icra mühitini təmin edən bulud modeli. Bax [Cloud Computing Security](/general-security/cloud-computing-security). |
| `PAgP` | Port Aggregation Protocol | Cisco-nun mülkiyyət hüquqlu link aqreqasiya razılaşması. Bax [Network Devices](/networking/network-devices). |
| `PAM` | Privileged Access Management | Admin etimadnamələri və sessiyalar üzərində seyf əsaslı nəzarət. Bax [Secrets and PAM](/general-security/open-source-tools/secrets-and-pam). |
| `PAT` | Port Address Translation | Port xəritəsi ilə bir ümumi IP-ni paylaşan NAT variantı. Bax [IP Addressing](/networking/ip-addressing). |
| `PCAP` | Packet Capture | Təhlil üçün qeydə alınmış xam şəbəkə paketləri faylı. Bax [Log Analysis](/blue-teaming/log-analysis). |
| `PCI DSS` | Payment Card Industry Data Security Standard | Kart sahibi məlumatını qoruyan standart. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `PDU` | Protocol Data Unit | Təbəqəyə xas paket adı (frame, packet, segment və s.). Bax [OSI Model](/networking/osi-model). |
| `PEAP` | Protected Extensible Authentication Protocol | TLS tunelinə bükülmüş EAP. Bax [Wireless Security](/networking/wireless-security). |
| `PII` | Personally Identifiable Information | Konkret bir şəxsi müəyyən edə bilən məlumat. Bax [Risk and Privacy](/grc/risk-and-privacy). |
| `PKI` | Public Key Infrastructure | Sertifikatları verən, paylayan və ləğv edən sistem. Bax [PKI](/general-security/cryptography/pki). |
| `PoC` | Proof of Concept | Zəifliyin və ya xüsusiyyətin işlədiyini göstərən minimal demo. Bax [Penetration Testing](/red-teaming/penetration-testing). |
| `PoP` | Point of Presence | Xidmətin şəbəkəyə qoşulduğu fiziki yer. |
| `PoS` | Point of Sale | Tez-tez hücum hədəfi olan pərakəndə kassa sistemi. Bax [Threat Vectors and Attack Surfaces](/red-teaming/threat-vectors-and-attack-surfaces). |
| `PSK` | Pre-Shared Key | Hər iki tərəfin əvvəlcədən bildiyi sirr. Bax [Wireless Security](/networking/wireless-security). |
| `PTES` | Penetration Testing Execution Standard | Pentest mərhələlərini və nəticələrini əhatə edən metodologiya. Bax [Penetration Testing](/red-teaming/penetration-testing). |

## Q

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `QoS` | Quality of Service | Şəbəkə trafik siniflərinin prioritetləşdirilməsi və formalaşdırılması. Bax [Network Devices](/networking/network-devices). |
| `QUIC` | Quick UDP Internet Connections | HTTP/3-ün əsasında dayanan UDP üzərində müasir nəqliyyat. Bax [TCP and UDP](/networking/tcp-and-udp). |

## R

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `RA` | Registration Authority | Sertifikat verilməzdən əvvəl sorğuları yoxlayan PKI rolu. Bax [PKI](/general-security/cryptography/pki). |
| `RADIUS` | Remote Authentication Dial-In User Service | Wi-Fi və VPN üçün geniş yayılmış AAA protokolu. Bax [Wireless Security](/networking/wireless-security). |
| `RAID` | Redundant Array of Independent Disks | Diskləri ehtiyat və ya sürət üçün birləşdirir. Bax [RAID](/general-security/raid). |
| `RAT` | Remote Access Trojan | Hücumçuya hostun uzaqdan idarəsini verən zərərli proqram. Bax [Malware Types](/red-teaming/malware-types). |
| `RBAC` | Role-Based Access Control | İcazələrin iş rolları vasitəsilə təyin edildiyi model. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `RBL` | Realtime Blackhole List | Spam göndərən IP-lərin DNS əsaslı siyahısı. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `RCE` | Remote Code Execution | Hücumçuya hədəfdə kod icra etməyə imkan verən zəiflik. Bax [OWASP Top 10](/red-teaming/owasp-top-10). |
| `RDP` | Remote Desktop Protocol | Qrafik uzaq sessiyalar üçün Microsoft protokolu. Bax [RDS](/servers/rds). |
| `ReBAC` | Relationship-Based Access Control | Varlıqlar arasındakı əlaqələrə görə qərar verilən giriş. Bax [IAM and Account Management](/general-security/iam-account-management). |
| `RFC` | Request for Comments | IETF tərəfindən nəşr olunan internet standart sənədləri. |
| `RoE` | Rules of Engagement | Pentest-i sahə və hüdudlarla müəyyən edən sənəd. Bax [Penetration Testing](/red-teaming/penetration-testing). |
| `RPC` | Remote Procedure Call | Uzaq sistemdə funksiyaları çağıran protokol. |
| `RPKI` | Resource Public Key Infrastructure | BGP yol mənşəyinin kripto təsdiqlənməsi. Bax [Network Devices](/networking/network-devices). |
| `RPO` | Recovery Point Objective | Vaxt ilə ölçülən maksimum dözümlü məlumat itkisi. Bax [Backup](/servers/backup). |
| `RTO` | Recovery Time Objective | Pozulmadan sonra maksimum dözümlü dayanma müddəti. Bax [Resilience and Availability](/servers/resilience-and-availability). |
| `RTP` | Real-time Transport Protocol | Real vaxt tətbiqləri üçün audio və video daşıyır. |

## S

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `SaaS` | Software as a Service | Hazır tətbiqləri çatdıran bulud modeli. Bax [Cloud Computing Security](/general-security/cloud-computing-security). |
| `SAML` | Security Assertion Markup Language | Brauzerlər üçün XML əsaslı SSO standartı. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `SAN` | Storage Area Network / Subject Alternative Name | Blok səviyyəli saxlama şəbəkəsi; həmçinin əlavə hostlar üçün TLS sert sahəsi. Bax [Storage, Filesystems and Servers](/servers/storage-filesystems-servers). |
| `SAST` | Static Application Security Testing | Zəifliklər üçün mənbə kodu təhlili. Bax [Secure App Development](/general-security/secure-app-development). |
| `SBOM` | Software Bill of Materials | Proqram təminatına daxil olan hər komponentin inventarı. Bax [Vulnerability and AppSec](/general-security/open-source-tools/vulnerability-and-appsec). |
| `SCADA` | Supervisory Control and Data Acquisition | Zavodları izləmək üçün sənaye nəzarət sistemi. Bax [Embedded and IoT Security](/general-security/embedded-and-iot-security). |
| `SCAP` | Security Content Automation Protocol | Konfiqurasiya və zəiflik yoxlamalarını avtomatlaşdıran NIST dəsti. Bax [Vulnerability Management](/general-security/vulnerability-management). |
| `SCCM` | System Center Configuration Manager | Microsoft endpoint idarəetmə platforması (indi MECM/Intune). Bax [Windows Server Tools](/servers/windows-server-tools). |
| `SCIM` | System for Cross-domain Identity Management | Sistemlər arasında istifadəçi təminatı üçün API. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `SDLC` | Software Development Life Cycle | Proqram təminatının qurulması və işlədilməsinin uzunsonu mərhələləri. Bax [Secure App Development](/general-security/secure-app-development). |
| `SDN` | Software-Defined Networking | İdarəetmə və məlumat müstəviləri ayrılmış proqramlaşdırıla bilən şəbəkə. Bax [Network Types and Topology](/networking/network-types-and-topology). |
| `SE` | Social Engineering | İnsanları təhlükəsiz olmayan hərəkətlərə yönəltmək. Bax [Social Engineering](/red-teaming/social-engineering). |
| `SEAndroid` | Security-Enhanced Android | Android üçün SELinux əsaslı MAC. Bax [Mobile Security](/general-security/mobile-security). |
| `SED` | Self-Encrypting Drive | Şifrələməni avadanlıqda yerinə yetirən disk. Bax [BitLocker](/operating-systems/windows/bitlocker). |
| `SELinux` | Security-Enhanced Linux | Linux nüvəsi üçün MAC tətbiqi. Bax [Linux Fundamentals](/operating-systems/linux/fundamentals). |
| `SFTP` | SSH File Transfer Protocol | SSH üzərindən təhlükəsiz fayl ötürülməsi. Bax [Secure Protocols](/networking/secure-protocols). |
| `SHA` | Secure Hash Algorithm | NIST kriptoqrafik heş funksiyaları ailəsi. Bax [Cryptography Basics](/general-security/cryptography-basics). |
| `SID` | Security Identifier | Windows əsas obyektini müəyyən edən unikal qiymət. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |
| `SIEM` | Security Information and Event Management | Log toplanmasını, korrelyasiyasını və xəbərdarlıqlarını mərkəzləşdirir. Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `SLA` | Service Level Agreement | Ölçülə bilən xidmət səviyyələrini öhdəyə götürən müqavilə. Bax [Policies](/grc/policies). |
| `SMTP` | Simple Mail Transfer Protocol | Serverlər arasında e-poçt çatdıran protokol. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `SNI` | Server Name Indication | Əl sıxmasından əvvəl istənilən hostun adını verən TLS uzantısı. Bax [Secure Protocols](/networking/secure-protocols). |
| `SNMP` | Simple Network Management Protocol | Şəbəkə cihazlarını idarə etmək üçün sorğu və tələlər. Bax [Ports and Protocols](/networking/ports-and-protocols). |
| `SOAR` | Security Orchestration, Automation and Response | SOC playbook-larını alətlər üzrə avtomatlaşdırır. Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `SOC` | Security Operations Center / Service Organization Control | 24x7 aşkarlama-cavab komandası; həmçinin AICPA audit hesabatları (SOC 1/2/3). Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `SOP` | Standard Operating Procedure | Adi tapşırıq üçün yazılı, təkrarlana bilən addımlar. Bax [Policies](/grc/policies). |
| `SPN` | Service Principal Name | Kerberos tərəfindən istifadə olunan unikal xidmət identifikatoru. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `SP` | Service Provider | Federasiya olunmuş şəxsiyyət təsdiqlərini istehlak edən tətbiq. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `SPF` | Sender Policy Framework | Domen üçün göndərməyə icazəsi olan serverləri sadalayan DNS qeydi. Bax [Email Security](/general-security/open-source-tools/email-security). |
| `SQL` | Structured Query Language | Reasiyalı verilənlər bazaları üçün sorğu dili. Bax [SQL Basics](/general-security/sql-basics). |
| `SRE` | Site Reliability Engineering | Mühəndisliyi əməliyyatlara və etibarlılığa tətbiq edən intizam. |
| `SSH` | Secure Shell | Şifrələnmiş uzaq qabıq və tunelləmə protokolu. Bax [Secure Protocols](/networking/secure-protocols). |
| `SSL` | Secure Sockets Layer | TLS-in sələfi; ad hələ də məhsul adlarında qalmaqdadır. Bax [Secure Protocols](/networking/secure-protocols). |
| `SSO` | Single Sign-On | Bir giriş çoxlu tətbiqə icazə verir. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `SSTP` | Secure Socket Tunneling Protocol | TLS üzərindən daşınan Microsoft VPN tuneli. Bax [VPN](/networking/vpn). |
| `STIG` | Security Technical Implementation Guide | Sistemlər üçün DISA sərtləşdirmə yoxlama siyahısı. Bax [Security Controls](/grc/security-controls). |
| `STIX` | Structured Threat Information eXpression | Təhdid kəşfiyyatı obyektləri üçün standart sxem. Bax [Threat Intel and Malware](/general-security/open-source-tools/threat-intel-and-malware). |
| `STP` | Spanning Tree Protocol | Ethernet halqalarının qarşısını alan Layer-2 protokolu. Bax [Network Devices](/networking/network-devices). |
| `SWG` | Secure Web Gateway | Veb trafikini süzgəcdən keçirən və siyasət tətbiq edən proksi. Bax [Cloud Security Solutions](/general-security/cloud-security-solutions). |

## T

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `TACACS+` | Terminal Access Controller Access-Control System Plus | Authn/authz/acct ayıran Cisco AAA protokolu. Bax [AAA and Non-Repudiation](/general-security/aaa-non-repudiation). |
| `TAXII` | Trusted Automated eXchange of Indicator Information | STIX təhdid kəşfiyyatını paylaşmaq üçün nəqliyyat. Bax [Threat Intel and Malware](/general-security/open-source-tools/threat-intel-and-malware). |
| `TCP` | Transmission Control Protocol | Etibarlı, bağlantı yönümlü nəqliyyat. Bax [TCP and UDP](/networking/tcp-and-udp). |
| `TGS` | Ticket Granting Service | Xidmət biletləri verən Kerberos xidməti. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `TGT` | Ticket Granting Ticket | Xidmət biletləri istəmək üçün ilkin Kerberos bileti. Bax [Active Directory Domain Services](/servers/active-directory-domain-services). |
| `TLD` | Top-Level Domain | .com və ya .az kimi son DNS etiketi. Bax [DNS](/networking/dns). |
| `TLS` | Transport Layer Security | Kanallar üçün şifrələmə və autentifikasiya təmin edən protokol. Bax [Secure Protocols](/networking/secure-protocols). |
| `TOTP` | Time-based One-Time Password | Hər 30 saniyədə fırlanan 6 rəqəmli kod. Bax [IAM and MFA](/general-security/open-source-tools/iam-and-mfa). |
| `TPM` | Trusted Platform Module | Açarları saxlayan və yükləmə tamlığını ölçən çip. Bax [BitLocker](/operating-systems/windows/bitlocker). |
| `TTL` | Time To Live | Paket sıçrayışlarını və ya DNS keş ömrünü hüdudlandıran sayğac. Bax [DNS](/networking/dns). |
| `TTP` | Tactics, Techniques, and Procedures | Rəqibin əslində necə davrandığı. Bax [Threat Actors and Intel](/red-teaming/threat-actors-and-intel). |

## U

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `UAC` | User Account Control | Yalnız lazım olduqda yüksəltməni təklif edən Windows tələbi. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |
| `UDP` | User Datagram Protocol | Bağlantısız, az xərcli nəqliyyat. Bax [TCP and UDP](/networking/tcp-and-udp). |
| `UEBA` | User and Entity Behavior Analytics | İstifadəçi və varlıq fəaliyyətini bazalaşdıraraq anomaliyaları aşkarlayır. Bax [SIEM and Monitoring](/general-security/open-source-tools/siem-and-monitoring). |
| `UEFI` | Unified Extensible Firmware Interface | BIOS-u əvəzləyən müasir firmware standartı. Bax [Windows Fundamentals](/operating-systems/windows/fundamentals). |
| `UEM` | Unified Endpoint Management | PC, mobil və IoT-ı idarə edən tək konsol. Bax [Mobile Security](/general-security/mobile-security). |
| `URL` | Uniform Resource Locator | Resursa istinad edən veb ünvanı. |
| `USB` | Universal Serial Bus | Geniş yayılmış periferiya interfeysi və tez-tez hücum vektoru. Bax [Threat Vectors and Attack Surfaces](/red-teaming/threat-vectors-and-attack-surfaces). |
| `UTM` | Unified Threat Management | Firewall, IPS, AV və filtrasiyanı birləşdirən cihaz. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |

## V

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `VLAN` | Virtual LAN | Yayım sahələrini ayıran məntiqi Layer-2 seqmenti. Bax [Secure Network Design](/networking/secure-network-design). |
| `VM` | Virtual Machine | Hipervizorda işləyən proqramla emulyasiya edilmiş kompüter. Bax [Virtualization Basics](/virtualization/virtualization-basics). |
| `VPC` | Virtual Private Cloud | Bulud hesabının daxilində məntiqi olaraq təcrid edilmiş şəbəkə. Bax [Cloud Computing Security](/general-security/cloud-computing-security). |
| `VPN` | Virtual Private Network | Saytlar və ya uzaq istifadəçilər arasında şifrələnmiş tunel. Bax [VPN](/networking/vpn). |

## W

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `WAF` | Web Application Firewall | Tətbiq qatı hücumları üçün HTTP trafikini süzgəcdən keçirir. Bax [Firewall, IDS and WAF](/general-security/open-source-tools/firewall-ids-waf). |
| `WAN` | Wide Area Network | Şəhərlər, ölkələr və ya qitələri əhatə edən şəbəkə. Bax [Network Types and Topology](/networking/network-types-and-topology). |
| `WAP` | Wireless Access Point | AP ilə eynidir; Wi-Fi-ı kabelliyə körpü kimi bağlayır. Bax [Wireless Security](/networking/wireless-security). |
| `WEP` | Wired Equivalent Privacy | Sıradan çıxmış köhnə Wi-Fi şifrələməsi; heç vaxt istifadə etməyin. Bax [Wireless Security](/networking/wireless-security). |
| `WiFi` | Wireless Fidelity | IEEE 802.11 simsiz LAN-lar üçün brendləşmə. Bax [Wireless Security](/networking/wireless-security). |
| `WMI` | Windows Management Instrumentation | Windows hostları üçün idarəetmə API-si. Bax [Windows Server Tools](/servers/windows-server-tools). |
| `WORM` | Write Once, Read Many | Yazılışdan sonra dəyişdirilə bilməyən saxlama. Bax [Backup](/servers/backup). |
| `WPA` | Wi-Fi Protected Access | Wi-Fi şifrələmə ailəsi (WPA/WPA2/WPA3). Bax [Wireless Security](/networking/wireless-security). |
| `WPS` | Wi-Fi Protected Setup | PIN əsaslı qurulum; zəifdir və söndürülməlidir. Bax [Wireless Security](/networking/wireless-security). |
| `WSUS` | Windows Server Update Services | Microsoft yeniləmələrinin yerli paylanması. Bax [WSUS](/servers/wsus). |

## X

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `X.509` | X.509 | Açıq açar sertifikatları üçün standart struktur. Bax [PKI](/general-security/cryptography/pki). |
| `XDR` | Extended Detection and Response | Endpoint, şəbəkə və bulud üzrə çarpaz mənbə aşkarlaması. Bax [Endpoint Security](/blue-teaming/endpoint-security). |
| `XML` | Extensible Markup Language | Strukturlaşdırılmış məlumat üçün etiket əsaslı mətn formatı. |
| `XSS` | Cross-Site Scripting | Hücumçu skriptini qurbanın brauzerinə yeridən veb zəifliyi. Bax [OWASP Top 10](/red-teaming/owasp-top-10). |

## Y

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `YARA` | Yet Another Recursive Acronym | Zərərli proqram ailələrini müəyyən etmək üçün qayda dili. Bax [Threat Intel and Malware](/general-security/open-source-tools/threat-intel-and-malware). |

## Z

| Qısaltma | Tam forma | Tərif |
|----------|-----------|-------|
| `ZTA` | Zero Trust Architecture | Şəbəkə yerinə heç vaxt gizli etibar göstərməyən dizayn. Bax [Secure Network Design](/networking/secure-network-design). |
| `ZTNA` | Zero Trust Network Access | Düz VPN-i əvəzləyən tətbiqə görə şəxsiyyət agahlı giriş. Bax [VPN](/networking/vpn). |
| `zk-SNARK` | Zero-Knowledge Succinct Non-Interactive Argument of Knowledge | Bir şeyin doğru olduğunu açıqlamadan sübut edən kompakt sübut. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |
| `zk-STARK` | Zero-Knowledge Scalable Transparent Argument of Knowledge | Etibarlı qurulum tələb etməyən zk-SNARK alternativi. Bax [Cryptography Advanced](/general-security/cryptography/cryptography-advanced). |

Lazım olan qısaltma hələ burada deyilsə, məsələ açın və əlavə olunacaq. Məqsəd tanımadığınız qısaltma şorbasına rast gələndə eyni yerdə dayanmaqdır, sonra dərslər sizi qalan yola çıxarır.
