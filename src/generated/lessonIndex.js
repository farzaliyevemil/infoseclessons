const lessons = [
  {
    "slug": "/blue-teaming",
    "category": "blue-teaming",
    "title": {
      "en": "Blue Team Guide",
      "az": "Blue Team Bələdçisi"
    },
    "description": {
      "en": "Start here for monitoring, investigation, and defensive Windows and infrastructure topics.",
      "az": "Monitorinq, araşdırma və müdafiə yönümlü Windows və infrastruktur mövzuları üçün başlanğıc səhifə."
    },
    "keywords": [
      "blue-teaming-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "blue-teaming-overview.md",
      "az": "blue-teaming-overview.md"
    }
  },
  {
    "slug": "/blue-teaming/endpoint-security",
    "category": "blue-teaming",
    "title": {
      "en": "Endpoint Security",
      "az": "Endpoint Təhlükəsizliyi"
    },
    "description": {
      "en": "Antivirus, EDR, DLP, host firewalls, HIDS/HIPS, secure boot, TPM, disk encryption, OS hardening, and patch management for desktops, laptops, and servers.",
      "az": "Antivirus, EDR, DLP, host firewall, HIDS/HIPS, təhlükəsiz yükləmə, TPM, disk şifrələməsi, ƏS sərtləşdirmə və yamaq idarəçiliyi — stolüstü, noutbuk və serverlər üçün."
    },
    "keywords": [
      "endpoint",
      "EDR",
      "antivirus",
      "DLP",
      "HIDS",
      "HIPS",
      "TPM",
      "secure boot",
      "hardening",
      "patch management",
      "blue-teaming",
      "endpoint-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "blue-teaming\\endpoint-security.md",
      "az": "blue-teaming\\endpoint-security.md"
    }
  },
  {
    "slug": "/blue-teaming/log-analysis",
    "category": "blue-teaming",
    "title": {
      "en": "Log Analysis",
      "az": "Loq Analizi"
    },
    "description": {
      "en": "Introductory notes for blue team log analysis workflows. Full lesson coming soon.",
      "az": "Blue team loq analizi iş axınları üçün giriş qeydləri. Tam dərs tezliklə əlavə olunacaq."
    },
    "keywords": [
      "blue-teaming",
      "log-analysis"
    ],
    "status": "starter",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "blue-teaming\\log-analysis.md",
      "az": "blue-teaming\\log-analysis.md"
    }
  },
  {
    "slug": "/certifications/aws-certifications",
    "category": "certifications",
    "title": {
      "en": "AWS Certifications (2026 Guide)",
      "az": "AWS Sertifikatları (2026 Bələdçisi)"
    },
    "description": {
      "en": "A practical overview of current AWS Certification levels, major role-based paths, and notable 2025-2026 updates as of March 23, 2026.",
      "az": "23 mart 2026 tarixinə cari AWS Certification səviyyələri, əsas rol əsaslı yollar və 2025-2026 yenilikləri üçün praktik baxış."
    },
    "keywords": [
      "certifications",
      "aws-certifications"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "certifications\\aws-certifications.md",
      "az": "certifications\\aws-certifications.md"
    }
  },
  {
    "slug": "/certifications",
    "category": "certifications",
    "title": {
      "en": "Certifications Guide",
      "az": "Sertifikatlar Bələdçisi"
    },
    "description": {
      "en": "Compare certification tracks and choose a starting path based on role, not hype.",
      "az": "Sertifikat yollarını müqayisə edin və hype-a yox, rolunuza uyğun başlanğıc seçin."
    },
    "keywords": [
      "certifications-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "certifications-overview.md",
      "az": "certifications-overview.md"
    }
  },
  {
    "slug": "/certifications/comptia-certifications",
    "category": "certifications",
    "title": {
      "en": "CompTIA Certifications (2026 Guide)",
      "az": "CompTIA Sertifikatları (2026 Bələdçisi)"
    },
    "description": {
      "en": "A practical overview of major CompTIA certifications, career paths, renewals, and stackable progression as of March 23, 2026.",
      "az": "23 mart 2026 tarixinə əsas CompTIA sertifikatları, karyera yolları, renewal məntiqi və stackable progression üçün praktik baxış."
    },
    "keywords": [
      "certifications",
      "comptia-certifications"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "certifications\\comptia-certifications.md",
      "az": "certifications\\comptia-certifications.md"
    }
  },
  {
    "slug": "/certifications/microsoft-certifications",
    "category": "certifications",
    "title": {
      "en": "Microsoft Certifications (2026 Guide)",
      "az": "Microsoft Sertifikatları (2026 Bələdçisi)"
    },
    "description": {
      "en": "A practical overview of active Microsoft certifications, renewal rules, and suggested learning paths as of March 23, 2026.",
      "az": "23 mart 2026 tarixinə aktual Microsoft sertifikatları, renewal qaydaları və tövsiyə olunan öyrənmə yolları."
    },
    "keywords": [
      "certifications",
      "microsoft-certifications"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "certifications\\microsoft-certifications.md",
      "az": "certifications\\microsoft-certifications.md"
    }
  },
  {
    "slug": "/general-security/cia-triad",
    "category": "general-security",
    "title": {
      "en": "CIA Triad — Confidentiality, Integrity, Availability",
      "az": "CIA Triadası — Məxfilik, Bütövlük, Əlçatanlıq"
    },
    "description": {
      "en": "Foundational infosec model explained with DAD, security control categories and types, data states, encryption, DLP, and hands-on examples.",
      "az": "İnfosek üçün təməl model — DAD, təhlükəsizlik nəzarəti kateqoriyaları və tipləri, data vəziyyətləri, şifrələmə, DLP və praktik misallar."
    },
    "keywords": [
      "cia triad",
      "dad triad",
      "confidentiality",
      "integrity",
      "availability",
      "security controls",
      "dlp",
      "data encryption",
      "data minimization",
      "general-security",
      "cia-triad"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\cia-triad.md",
      "az": "general-security\\cia-triad.md"
    }
  },
  {
    "slug": "/general-security/cloud-computing-security",
    "category": "general-security",
    "title": {
      "en": "Cloud Computing Security",
      "az": "Bulud Hesablama Təhlükəsizliyi"
    },
    "description": {
      "en": "Service and deployment models, shared responsibility, containers, serverless, virtualization, SDN, and VM escape protection for cloud-hosted workloads.",
      "az": "Xidmət və yerləşdirmə modelləri, paylaşılan məsuliyyət, konteynerlər, serverless, virtuallaşdırma, SDN və buludda yerləşən yüklər üçün VM Escape mühafizəsi."
    },
    "keywords": [
      "cloud security",
      "IaaS",
      "PaaS",
      "SaaS",
      "shared responsibility",
      "containers",
      "serverless",
      "virtualization",
      "SDN",
      "general-security",
      "cloud",
      "cloud-computing-security",
      "bulud təhlükəsizliyi",
      "paylaşılan məsuliyyət",
      "konteynerlər",
      "virtuallaşdırma"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\cloud\\cloud-computing-security.md",
      "az": "general-security\\cloud\\cloud-computing-security.md"
    }
  },
  {
    "slug": "/general-security/cloud-security-solutions",
    "category": "general-security",
    "title": {
      "en": "Cloud Security Controls and Solutions",
      "az": "Bulud Təhlükəsizlik Nəzarətləri və Həlləri"
    },
    "description": {
      "en": "Operational cloud security controls — resilience, identity, secrets, storage, network, compute, and cloud-specific products such as CASB and SWG.",
      "az": "Əməliyyat səviyyəli bulud təhlükəsizlik nəzarətləri — dayanıqlılıq, identifikasiya, sirrlər, yaddaş, şəbəkə, hesablama və CASB, SWG kimi buluda xas məhsullar."
    },
    "keywords": [
      "cloud security",
      "CASB",
      "SWG",
      "VPC",
      "security groups",
      "secrets management",
      "high availability",
      "resource policies",
      "container security",
      "general-security",
      "cloud",
      "cloud-security-solutions"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\cloud\\cloud-security-solutions.md",
      "az": "general-security\\cloud\\cloud-security-solutions.md"
    }
  },
  {
    "slug": "/general-security/cryptography-basics",
    "category": "general-security",
    "title": {
      "en": "Cryptography Basics — Symmetric, Asymmetric, Hashing",
      "az": "Kriptoqrafiyanın əsasları — Simmetrik, Asimmetrik, Heşləmə"
    },
    "description": {
      "en": "Foundational cryptography for engineers — symmetric vs asymmetric ciphers, hashing, digital signatures, key exchange, and where each is used in practice.",
      "az": "Mühəndislər üçün kriptoqrafiya təməli — simmetrik və asimmetrik şifrələr, heşləmə, rəqəmsal imzalar, açar mübadiləsi və onların praktikada harada işlədildiyi."
    },
    "keywords": [
      "cryptography",
      "symmetric encryption",
      "asymmetric encryption",
      "aes",
      "rsa",
      "ecc",
      "sha-256",
      "hashing",
      "digital signatures",
      "diffie-hellman",
      "general-security",
      "cryptography-basics"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\cryptography\\cryptography-basics.md",
      "az": "general-security\\cryptography\\cryptography-basics.md"
    }
  },
  {
    "slug": "/general-security/embedded-and-iot-security",
    "category": "general-security",
    "title": {
      "en": "Embedded Systems, IoT, and ICS Security",
      "az": "Quraşdırılmış sistemlər, IoT və ICS təhlükəsizliyi"
    },
    "description": {
      "en": "Securing embedded systems, IoT devices, and industrial control systems — from Raspberry Pi and FPGAs to SCADA networks, smart meters, and design constraints.",
      "az": "Quraşdırılmış sistemlərin, IoT cihazlarının və sənaye nəzarət sistemlərinin qorunması — Raspberry Pi və FPGA-dan tutmuş SCADA şəbəkələrinə, ağıllı sayğaclara və dizayn məhdudiyyətlərinə qədər."
    },
    "keywords": [
      "embedded systems",
      "IoT",
      "SCADA",
      "ICS",
      "Raspberry Pi",
      "FPGA",
      "smart devices",
      "RTOS",
      "general-security",
      "mobile-and-iot",
      "embedded-and-iot-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\mobile-and-iot\\embedded-and-iot-security.md",
      "az": "general-security\\mobile-and-iot\\embedded-and-iot-security.md"
    }
  },
  {
    "slug": "/general-security/enterprise-security-architecture",
    "category": "general-security",
    "title": {
      "en": "Enterprise Security Architecture",
      "az": "Müəssisə Təhlükəsizlik Arxitekturası"
    },
    "description": {
      "en": "Designing a resilient enterprise — configuration baselines, data protection, site resiliency, cryptographic boundaries, and deception technology for a modern organisation.",
      "az": "Davamlı müəssisənin dizaynı — konfiqurasiya bazaları, məlumat qorunması, sayt davamlılığı, kriptoqrafik sərhədlər və müasir təşkilat üçün aldatma texnologiyası."
    },
    "keywords": [
      "enterprise security",
      "configuration management",
      "data protection",
      "DLP",
      "encryption",
      "honeypot",
      "site resiliency",
      "deception",
      "general-security",
      "architecture",
      "enterprise-security-architecture"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\architecture\\enterprise-security-architecture.md",
      "az": "general-security\\architecture\\enterprise-security-architecture.md"
    }
  },
  {
    "slug": "/general-security",
    "category": "general-security",
    "title": {
      "en": "General Security Guide",
      "az": "Ümumi Təhlükəsizlik Bələdçisi"
    },
    "description": {
      "en": "Cross-cutting security concepts, tooling references, and infrastructure basics that support the rest of the site.",
      "az": "Saytın qalan hissəsini dəstəkləyən ümumi təhlükəsizlik anlayışları, alət istinadları və infrastruktur əsasları."
    },
    "keywords": [
      "general-security-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "general-security-overview.md",
      "az": "general-security-overview.md"
    }
  },
  {
    "slug": "/general-security/mobile-security",
    "category": "general-security",
    "title": {
      "en": "Mobile Device Security",
      "az": "Mobil Cihaz Təhlükəsizliyi"
    },
    "description": {
      "en": "Radio attack surface, MDM/UEM/MAM controls, on-device data protection, tampering threats, and enterprise deployment models for iOS and Android fleets.",
      "az": "Radio hücum səthi, MDM/UEM/MAM nəzarətləri, cihaz üzərində məlumat qorunması, manipulyasiya təhdidləri və iOS/Android parkı üçün korporativ deployment modelləri."
    },
    "keywords": [
      "mobile security",
      "MDM",
      "UEM",
      "MAM",
      "BYOD",
      "COPE",
      "jailbreak",
      "rooting",
      "Bluetooth",
      "NFC",
      "RFID",
      "containerization",
      "general-security",
      "mobile-and-iot",
      "mobile-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\mobile-and-iot\\mobile-security.md",
      "az": "general-security\\mobile-and-iot\\mobile-security.md"
    }
  },
  {
    "slug": "/general-security/open-source",
    "category": "general-security",
    "title": {
      "en": "Open-Source Security Solutions (Overview)",
      "az": "Açıq Mənbə Təhlükəsizlik Həlləri (Ümumi Baxış)"
    },
    "description": {
      "en": "Collapsible list of essential open-source tools categorized by solution type.",
      "az": "Həll növünə görə kateqoriyalaşdırılmış əsas açıq mənbə alətlərin siyahısı (gizlənə bilən bölmələrlə)."
    },
    "keywords": [
      "general-security",
      "open-source"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "general-security\\open-source.md",
      "az": "general-security\\open-source.md"
    }
  },
  {
    "slug": "/general-security/security-assessment",
    "category": "general-security",
    "title": {
      "en": "Organizational Security Assessment",
      "az": "Təşkilatın Təhlükəsizlik Qiymətləndirməsi"
    },
    "description": {
      "en": "End-to-end organizational security assessment — scoping, discovery, testing, reporting, risk-rating, and remediation tracking for SMB and enterprise.",
      "az": "Təşkilatın təhlükəsizliyinin tam qiymətləndirilməsi — miqyaslama, kəşf, sınaq, hesabat, risk reytinqi və düzəliş izləmə (SMB və enterprise üçün)."
    },
    "keywords": [
      "security assessment",
      "gap analysis",
      "vulnerability assessment",
      "penetration testing",
      "compliance audit",
      "risk rating",
      "remediation plan",
      "general-security",
      "assessment",
      "security-assessment"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\assessment\\security-assessment.md",
      "az": "general-security\\assessment\\security-assessment.md"
    }
  },
  {
    "slug": "/general-security/physical-security",
    "category": "general-security",
    "title": {
      "en": "Physical Security Controls",
      "az": "Fiziki Təhlükəsizlik Nəzarətləri"
    },
    "description": {
      "en": "Defense-in-depth physical controls — perimeter, entry, surveillance, environmental, and secure data destruction — for protecting facilities and the data inside them.",
      "az": "Dərinlikli müdafiə prinsipi ilə fiziki nəzarətlər — perimetr, giriş, müşahidə, ətraf mühit və məlumatın təhlükəsiz məhv edilməsi — obyektləri və içərisindəki məlumatları qorumaq üçün."
    },
    "keywords": [
      "physical security",
      "access control",
      "CCTV",
      "fire suppression",
      "data destruction",
      "mantrap",
      "Faraday cage",
      "general-security",
      "mobile-and-iot",
      "physical-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\mobile-and-iot\\physical-security.md",
      "az": "general-security\\mobile-and-iot\\physical-security.md"
    }
  },
  {
    "slug": "/general-security/security-tools",
    "category": "general-security",
    "title": {
      "en": "Security Tools — The Working Toolkit",
      "az": "Təhlükəsizlik Alətləri — İş Alət Dəsti"
    },
    "description": {
      "en": "Network-discovery, vulnerability scanners, packet analyzers, exploitation frameworks, data-sanitization tools, and forensic utilities every SOC/IT engineer needs to know.",
      "az": "Şəbəkə kəşfiyyatı, zəiflik skanerləri, paket analizatorları, istismar freymvorkları, məlumatın silinməsi alətləri və hər SOC/IT mühəndisinin bilməli olduğu ekspert utilitləri."
    },
    "keywords": [
      "security tools",
      "nmap",
      "nessus",
      "wireshark",
      "metasploit",
      "burp suite",
      "tcpdump",
      "kali linux",
      "osint tools",
      "general-security",
      "assessment",
      "security-tools"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\assessment\\security-tools.md",
      "az": "general-security\\assessment\\security-tools.md"
    }
  },
  {
    "slug": "/general-security/sql-basics",
    "category": "general-security",
    "title": {
      "en": "SQL Basics for Security Engineers",
      "az": "Təhlükəsizlik mühəndisləri üçün SQL əsasları"
    },
    "description": {
      "en": "SELECT/INSERT/UPDATE/DELETE, JOINs, WHERE, aggregate functions, indexes, transactions, and stored procedures — the SQL literacy you need to understand SQLi and read audit data.",
      "az": "SELECT/INSERT/UPDATE/DELETE, JOIN-lar, WHERE, aqreqat funksiyalar, indekslər, tranzaksiyalar və stored procedure-lər — SQLi-ni anlamaq və audit datasını oxumaq üçün lazım olan SQL savadı."
    },
    "keywords": [
      "sql",
      "relational database",
      "select",
      "join",
      "where",
      "index",
      "transaction",
      "stored procedure",
      "general-security",
      "sql-basics"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\sql-basics.md",
      "az": "general-security\\sql-basics.md"
    }
  },
  {
    "slug": "/general-security/vulnerability-management",
    "category": "general-security",
    "title": {
      "en": "Vulnerability Management — Scanning, Scoring, and Remediation",
      "az": "Zəifliklərin İdarə Edilməsi — Skanlama, Qiymətləndirmə və Aradan Qaldırma"
    },
    "description": {
      "en": "End-to-end vulnerability lifecycle — asset inventory, scanning, CVE/CVSS scoring, prioritization, patching, and validation.",
      "az": "Zəifliklərin tam həyat dövrü — aktivlərin inventarı, skanlama, CVE/CVSS qiymətləndirməsi, prioritetləşdirmə, yamaqlama və yoxlama."
    },
    "keywords": [
      "vulnerability management",
      "cve",
      "cvss",
      "patch management",
      "vulnerability scanning",
      "nessus",
      "openvas",
      "qualys",
      "security assessment",
      "general-security",
      "assessment",
      "vulnerability-management"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "general-security\\assessment\\vulnerability-management.md",
      "az": "general-security\\assessment\\vulnerability-management.md"
    }
  },
  {
    "slug": "/general-security/raid",
    "category": "general-security",
    "title": {
      "en": "What is RAID? (Simple Explanation)",
      "az": "RAID nədir? (Sadə izah)"
    },
    "description": {
      "en": "What is RAID, why is it used, and what purposes does it serve? A complete explanation in simple language.",
      "az": "RAID nədir, nə üçün istifadə olunur və hansı məqsədlərə xidmət edir? Sadə dildə tam izah."
    },
    "keywords": [
      "general-security",
      "raid"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "general-security\\raid.md",
      "az": "general-security\\raid.md"
    }
  },
  {
    "slug": "/grc",
    "category": "grc",
    "title": {
      "en": "GRC Guide",
      "az": "GRC Bələdçisi"
    },
    "description": {
      "en": "Overview of governance, risk, compliance, and policy-writing material in InfoSec Lessons.",
      "az": "InfoSec Lessons daxilində governance, risk, compliance və policy yazımı materiallarının icmalı."
    },
    "keywords": [
      "grc-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "grc-overview.md",
      "az": "grc-overview.md"
    }
  },
  {
    "slug": "/grc/risk-and-privacy",
    "category": "grc",
    "title": {
      "en": "Risk Management and Privacy",
      "az": "Risk Management and Privacy"
    },
    "description": {
      "en": "Risk-management fundamentals — identify, assess, treat, monitor — plus core privacy principles, GDPR / data subject rights, and hands-on risk-register templates.",
      "az": "Risk-management fundamentals — identify, assess, treat, monitor — plus core privacy principles, GDPR / data subject rights, and hands-on risk-register templates."
    },
    "keywords": [
      "risk management",
      "risk assessment",
      "qualitative risk",
      "quantitative risk",
      "privacy",
      "gdpr",
      "data subject rights",
      "dpia",
      "risk register",
      "nist rmf",
      "grc",
      "risk-and-privacy"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "grc\\risk-and-privacy.md",
      "az": "grc\\risk-and-privacy.md"
    }
  },
  {
    "slug": "/grc/security-controls",
    "category": "grc",
    "title": {
      "en": "Security Controls and Frameworks",
      "az": "Təhlükəsizlik Nəzarətləri və Çərçivələr"
    },
    "description": {
      "en": "Control categories and types, key regulations (GDPR, PCI DSS), and the main control frameworks (NIST CSF/RMF, CIS, ISO 27000-series, SOC 2, CSA CCM) and benchmarks that govern modern enterprise security programs.",
      "az": "Nəzarət kateqoriyaları və tipləri, əsas tənzimləmələr (GDPR, PCI DSS) və müasir korporativ təhlükəsizlik proqramlarını idarə edən əsas nəzarət çərçivələri (NIST CSF/RMF, CIS, ISO 27000-seriyası, SOC 2, CSA CCM) və benchmarklar."
    },
    "keywords": [
      "security controls",
      "control types",
      "GDPR",
      "PCI DSS",
      "NIST CSF",
      "NIST RMF",
      "ISO 27001",
      "SOC 2",
      "CIS Controls",
      "CCM",
      "benchmarks",
      "grc",
      "security-controls"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "grc\\security-controls.md",
      "az": "grc\\security-controls.md"
    }
  },
  {
    "slug": "/grc/policies",
    "category": "grc",
    "title": {
      "en": "Security Policies",
      "az": "Təhlükəsizlik Siyasətləri"
    },
    "description": {
      "en": "Introductory notes on security policy structure and governance. Full lesson coming soon.",
      "az": "Təhlükəsizlik siyasətlərinin strukturu və governance mövzuları üçün giriş qeydləri. Tam dərs tezliklə əlavə olunacaq."
    },
    "keywords": [
      "grc",
      "policies"
    ],
    "status": "starter",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "grc\\policies.md",
      "az": "grc\\policies.md"
    }
  },
  {
    "slug": "/helpdesk-basics/common-helpdesk-tickets",
    "category": "helpdesk-basics",
    "title": {
      "en": "Common Helpdesk Tickets",
      "az": "Yayğın Helpdesk Ticket-ləri"
    },
    "description": {
      "en": "A practical starter guide to the most common helpdesk requests, triage steps, escalation, and documentation habits.",
      "az": "Ən çox rast gəlinən helpdesk sorğuları, triage addımları, eskalasiya və düzgün ticket qeydləri üçün praktik bələdçi."
    },
    "keywords": [
      "helpdesk-basics",
      "common-helpdesk-tickets"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "helpdesk-basics\\common-helpdesk-tickets.md",
      "az": "helpdesk-basics\\common-helpdesk-tickets.md"
    }
  },
  {
    "slug": "/helpdesk-basics",
    "category": "helpdesk-basics",
    "title": {
      "en": "Helpdesk Basics Guide",
      "az": "Helpdesk Əsasları Bələdçisi"
    },
    "description": {
      "en": "Entry-level support workflows, recurring ticket patterns, and the habits that make triage cleaner.",
      "az": "Giriş səviyyəli support iş axınları, təkrarlanan ticket nümunələri və triage-i daha səliqəli edən vərdişlər."
    },
    "keywords": [
      "helpdesk-basics-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "helpdesk-basics-overview.md",
      "az": "helpdesk-basics-overview.md"
    }
  },
  {
    "slug": "/networking/dhcp",
    "category": "networking",
    "title": {
      "en": "DHCP (Dynamic Host Configuration Protocol)",
      "az": "DHCP (Dynamic Host Configuration Protocol)"
    },
    "description": {
      "en": "Hands-on DHCP guide — DORA, leases, scopes, reservations, options, filtering, failover, backup/restore, DNS integration and troubleshooting.",
      "az": "DHCP üzrə praktik dərslik — DORA, lease, scope, reservation, option-lar, filtering, failover, backup/restore, DNS inteqrasiyası və troubleshooting."
    },
    "keywords": [
      "dhcp",
      "dora",
      "scope",
      "reservation",
      "lease",
      "failover",
      "apipa",
      "dhcp options",
      "networking",
      "addressing"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\addressing\\dhcp.md",
      "az": "networking\\addressing\\dhcp.md"
    }
  },
  {
    "slug": "/networking/dns",
    "category": "networking",
    "title": {
      "en": "DNS (Domain Name System)",
      "az": "DNS (Domain Name System)"
    },
    "description": {
      "en": "A practical DNS guide covering resolution flow, query types, zones, caching, TTL, records, and reverse lookup.",
      "az": "DNS-in necə işlədiyi, zone tipləri, query növləri, caching, TTL və record-lar haqqında praktik izah."
    },
    "keywords": [
      "dns",
      "ttl",
      "records",
      "recursive query",
      "reverse lookup",
      "networking",
      "addressing",
      "name resolution",
      "caching"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "networking\\addressing\\dns.md",
      "az": "networking\\addressing\\dns.md"
    }
  },
  {
    "slug": "/networking/ip-addressing-subnetting",
    "category": "networking",
    "title": {
      "en": "IP Addressing and Subnetting",
      "az": "IP Ünvanlama və Subnetting"
    },
    "description": {
      "en": "Practical guide to IPv4 addressing, classes, public vs private, NAT, DMZ, CIDR, and subnet math.",
      "az": "IPv4 ünvanlama üçün praktik bələdçi: classlar, public vs private, NAT, DMZ, CIDR və subnet hesablamaları."
    },
    "keywords": [
      "ip",
      "subnet",
      "cidr",
      "nat",
      "dmz",
      "private ip",
      "networking",
      "addressing",
      "ip-addressing-subnetting"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "networking\\addressing\\ip-addressing-subnetting.md",
      "az": "networking\\addressing\\ip-addressing-subnetting.md"
    }
  },
  {
    "slug": "/networking/network-types",
    "category": "networking",
    "title": {
      "en": "Networking Basics",
      "az": "Şəbəkə Əsasları"
    },
    "description": {
      "en": "Thorough networking guide — types, topologies, switching vs routing, VLANs, IP/IPv6, subnetting, NAT, DHCP/DNS, ports, OSI/TCP-IP, Wi‑Fi, and troubleshooting.",
      "az": "Geniş şəbəkə bələdçisi — növlər, topologiyalar, switch vs router, VLAN, IP/IPv6, subnetləşdirmə, NAT, DHCP/DNS, portlar, OSI/TCP‑IP, Wi‑Fi və diaqnostika."
    },
    "keywords": [
      "networking",
      "network-types"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "networking\\network-types.md",
      "az": "networking\\network-types.md"
    }
  },
  {
    "slug": "/networking/networking-fundamentals",
    "category": "networking",
    "title": {
      "en": "Networking Fundamentals",
      "az": "Şəbəkə əsasları"
    },
    "description": {
      "en": "OSI and TCP/IP models, Ethernet and IP, ARP, routing, ports and protocols, DNS/DHCP overview, common devices (switch, router, firewall), and how a single HTTP request actually gets from your browser to a web server.",
      "az": "OSI və TCP/IP modelləri, Ethernet və IP, ARP, marşrutlaşdırma, portlar və protokollar, DNS/DHCP icmal, geniş yayılmış cihazlar (kommutator, marşrutlaşdırıcı, təhlükəsizlik divarı) və tək bir HTTP sorğusunun brauzerinizdən web server-ə əslində necə çatması."
    },
    "keywords": [
      "networking",
      "osi model",
      "tcp/ip",
      "ethernet",
      "arp",
      "routing",
      "ports",
      "protocols",
      "switch",
      "router",
      "firewall",
      "networking-fundamentals"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\networking-fundamentals.md",
      "az": "networking\\networking-fundamentals.md"
    }
  },
  {
    "slug": "/networking",
    "category": "networking",
    "title": {
      "en": "Networking Guide",
      "az": "Şəbəkə Bələdçisi"
    },
    "description": {
      "en": "Networking fundamentals, DNS, addressing, routing, and the concepts other sections depend on.",
      "az": "Şəbəkə əsasları, DNS, ünvanlama, routing və saytın qalan hissəsinin dayandığı anlayışlar."
    },
    "keywords": [
      "networking-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "networking-overview.md",
      "az": "networking-overview.md"
    }
  },
  {
    "slug": "/networking/secure-network-design",
    "category": "networking",
    "title": {
      "en": "Secure Network Design",
      "az": "Təhlükəsiz Şəbəkə Dizaynı"
    },
    "description": {
      "en": "Segmentation, zero trust, VPN, NAC, switch hardening, perimeter inspection, routing and monitoring controls for an enterprise network.",
      "az": "Seqmentasiya, sıfır etibar, VPN, NAC, kommutator sərtləşdirmə, perimetr yoxlama, marşrutlaşdırma və monitorinq nəzarətləri korporativ şəbəkə üçün."
    },
    "keywords": [
      "network segmentation",
      "VLAN",
      "zero trust",
      "VPN",
      "NAC",
      "port security",
      "NIDS",
      "NGFW",
      "WAF",
      "proxy",
      "networking",
      "secure-design",
      "secure-network-design"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\secure-design\\secure-network-design.md",
      "az": "networking\\secure-design\\secure-network-design.md"
    }
  },
  {
    "slug": "/networking/secure-protocols",
    "category": "networking",
    "title": {
      "en": "Secure Network Protocols",
      "az": "Təhlükəsiz Şəbəkə Protokolları"
    },
    "description": {
      "en": "Secure alternatives to plaintext network protocols — DNSSEC, SSH, S/MIME, SRTP, LDAPS, SFTP, SNMPv3, HTTPS, IPSec — and how to choose the right one per use case.",
      "az": "Açıq mətnli şəbəkə protokollarının təhlükəsiz alternativləri — DNSSEC, SSH, S/MIME, SRTP, LDAPS, SFTP, SNMPv3, HTTPS, IPSec — və hər istifadə halı üçün düzgün seçim."
    },
    "keywords": [
      "DNSSEC",
      "SSH",
      "S/MIME",
      "SRTP",
      "LDAPS",
      "SFTP",
      "SNMPv3",
      "HTTPS",
      "IPSec",
      "secure protocols",
      "networking",
      "secure-design",
      "secure-protocols"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\secure-design\\secure-protocols.md",
      "az": "networking\\secure-design\\secure-protocols.md"
    }
  },
  {
    "slug": "/networking/wireless-security",
    "category": "networking",
    "title": {
      "en": "Wireless Network Security",
      "az": "Simsiz Şəbəkə Təhlükəsizliyi"
    },
    "description": {
      "en": "Wireless protocol generations, authentication frameworks, 802.1X with RADIUS, EAP variants, and RF design practices for defensible Wi-Fi networks.",
      "az": "Simsiz protokol nəsilləri, autentifikasiya çərçivələri, RADIUS ilə 802.1X, EAP variantları və müdafiə oluna bilən Wi-Fi şəbəkələri üçün RF dizayn təcrübələri."
    },
    "keywords": [
      "WPA3",
      "WPA2",
      "WEP",
      "EAP",
      "802.1X",
      "RADIUS",
      "SAE",
      "4-way handshake",
      "captive portal",
      "wireless",
      "Wi-Fi",
      "networking",
      "secure-design",
      "wireless-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\secure-design\\wireless-security.md",
      "az": "networking\\secure-design\\wireless-security.md"
    }
  },
  {
    "slug": "/operating-systems/linux/basic-commands",
    "category": "operating-systems",
    "title": {
      "en": "Linux Basic Commands",
      "az": "Linux Əsas Komandaları"
    },
    "description": {
      "en": "Starter reference for common Linux commands and navigation. Full lesson coming soon.",
      "az": "Ən çox istifadə olunan Linux komandaları və naviqasiya üçün başlanğıc bələdçi. Tam dərs tezliklə əlavə olunacaq."
    },
    "keywords": [
      "operating-systems",
      "linux",
      "basic-commands"
    ],
    "status": "starter",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\linux\\basic-commands.md",
      "az": "operating-systems\\linux\\basic-commands.md"
    }
  },
  {
    "slug": "/operating-systems/linux/fundamentals",
    "category": "operating-systems",
    "title": {
      "en": "Linux Fundamentals",
      "az": "Linux Fundamentals"
    },
    "description": {
      "en": "Architecture, distributions, filesystem hierarchy, shell, users and permissions, package managers, services, processes, networking, and logs — everything a SOC/IT engineer needs as baseline Linux literacy.",
      "az": "Arxitektura, bölüşdürmələr, fayl sistemi iyerarxiyası, shell, istifadəçilər və icazələr, paket menecerləri, xidmətlər, proseslər, şəbəkə və loglar — SOC/IT mühəndisi üçün baza Linux savadı."
    },
    "keywords": [
      "linux",
      "fundamentals",
      "bash",
      "filesystem hierarchy",
      "permissions",
      "systemd",
      "package manager",
      "processes",
      "syslog",
      "operating-systems"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "operating-systems\\linux\\fundamentals.md",
      "az": "operating-systems\\linux\\fundamentals.md"
    }
  },
  {
    "slug": "/operating-systems/linux",
    "category": "operating-systems",
    "title": {
      "en": "Linux Guide",
      "az": "Linux Bələdçisi"
    },
    "description": {
      "en": "Overview of Linux command-line fundamentals and the role Linux plays across the rest of the site.",
      "az": "Linux komanda sətri əsaslarının və Linux-un saytın qalan hissəsində oynadığı rolun icmalı."
    },
    "keywords": [
      "linux-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "linux-overview.md",
      "az": "linux-overview.md"
    }
  },
  {
    "slug": "/operating-systems/windows/powertoys",
    "category": "operating-systems",
    "title": {
      "en": "Mastering Productivity with Microsoft PowerToys",
      "az": "Microsoft PowerToys ilə Produktivliyi Artırmaq"
    },
    "description": {
      "en": "Discover how Microsoft PowerToys can boost your productivity with a suite of advanced utilities for Windows users.",
      "az": "Microsoft PowerToys alətlər dəsti ilə Windows istifadəçiləri üçün məhsuldarlığı necə artırmaq olar, öyrənin."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "powertoys"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\powertoys.md",
      "az": "operating-systems\\windows\\powertoys.md"
    }
  },
  {
    "slug": "/operating-systems",
    "category": "operating-systems",
    "title": {
      "en": "Operating Systems — Overview and Foundations",
      "az": "Əməliyyat Sistemləri — Ümumi Baxış və Əsaslar"
    },
    "description": {
      "en": "What an operating system actually does — kernel, processes, memory, file systems, boot, multi-user security — and why infosec engineers need fluency in both Windows and Linux.",
      "az": "Əməliyyat sisteminin əslində nə etdiyi — nüvə, proseslər, yaddaş, fayl sistemləri, yükləmə, çoxistifadəçi təhlükəsizliyi — və infosec mühəndislərinin nə üçün həm Windows, həm də Linux-da səlislik tələb etdiyi."
    },
    "keywords": [
      "operating system",
      "kernel",
      "userspace",
      "process",
      "virtual memory",
      "file system",
      "system call",
      "boot process",
      "bios",
      "uefi",
      "systemd",
      "windows",
      "linux",
      "selinux",
      "apparmor",
      "operating-systems-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "operating-systems-overview.md",
      "az": "operating-systems-overview.md"
    }
  },
  {
    "slug": "/operating-systems/windows/run-commands",
    "category": "operating-systems",
    "title": {
      "en": "Run Commands in Windows",
      "az": "Windows-da Run Əmrləri"
    },
    "description": {
      "en": "Useful and practical Windows Run commands for IT and InfoSec professionals.",
      "az": "IT və InfoSec mütəxəssisləri üçün faydalı və praktik Windows Run əmrləri."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "run-commands"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\run-commands.md",
      "az": "operating-systems\\windows\\run-commands.md"
    }
  },
  {
    "slug": "/operating-systems/windows/sysprep",
    "category": "operating-systems",
    "title": {
      "en": "Sysprep – Windows System Preparation Tool",
      "az": "Sysprep – Windows Sistem Hazırlıq Aləti"
    },
    "description": {
      "en": "Learn what Sysprep is, why it's used for imaging and deployment, and how to generalize Windows installations.",
      "az": "Sysprep nədir, niyə imaging və deployment üçün istifadə olunur, və Windows quraşdırmalarını necə ümumiləşdirmək olar."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "sysprep"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\sysprep.md",
      "az": "operating-systems\\windows\\sysprep.md"
    }
  },
  {
    "slug": "/operating-systems/windows/applocker",
    "category": "operating-systems",
    "title": {
      "en": "What is AppLocker?",
      "az": "AppLocker Nədir?"
    },
    "description": {
      "en": "Learn how AppLocker works, when to use audit mode, and how publisher, path, and hash rules differ.",
      "az": "AppLocker-in necə işlədiyini, audit mode istifadəsini və publisher, path, hash qaydalarının fərqini öyrənin."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "applocker"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\applocker.md",
      "az": "operating-systems\\windows\\applocker.md"
    }
  },
  {
    "slug": "/operating-systems/windows/bitlocker",
    "category": "operating-systems",
    "title": {
      "en": "What is BitLocker?",
      "az": "BitLocker Nədir?"
    },
    "description": {
      "en": "Learn how BitLocker works, why TPM plus PIN matters, and how BitLocker differs from automatic device encryption.",
      "az": "BitLocker-in necə işlədiyini, TPM + PIN-in niyə vacib olduğunu və device encryption ilə fərqini öyrənin."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "bitlocker"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\bitlocker.md",
      "az": "operating-systems\\windows\\bitlocker.md"
    }
  },
  {
    "slug": "/operating-systems/windows/wsl",
    "category": "operating-systems",
    "title": {
      "en": "What is WSL? (Windows Subsystem for Linux)",
      "az": "WSL Nədir? (Windows Subsystem for Linux)"
    },
    "description": {
      "en": "Learn how WSL enables you to run Linux on Windows and why it's a powerful tool for cybersecurity and development.",
      "az": "WSL-in Linux-u Windows-da necə işə salmağa imkan verdiyini və niyə kiber təhlükəsizlik və inkişaf üçün güclü bir alət olduğunu öyrənin."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "wsl"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\wsl.md",
      "az": "operating-systems\\windows\\wsl.md"
    }
  },
  {
    "slug": "/operating-systems/windows/fundamentals",
    "category": "operating-systems",
    "title": {
      "en": "Windows Fundamentals",
      "az": "Windows əsasları"
    },
    "description": {
      "en": "Architecture, processes and services, the registry, event logs, users and SIDs, UAC and tokens, PowerShell, and built-in security features — foundational Windows literacy for SOC and IT engineers.",
      "az": "Arxitektura, proseslər və xidmətlər, qeydiyyat (registry), hadisələr jurnalı, istifadəçilər və SID-lər, UAC və token-lər, PowerShell və daxili qoruma vasitələri — SOC və IT mühəndisləri üçün Windows üzrə təməl bilik."
    },
    "keywords": [
      "windows",
      "fundamentals",
      "ntfs",
      "registry",
      "event log",
      "powershell",
      "uac",
      "sids",
      "defender",
      "operating-systems"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "operating-systems\\windows\\fundamentals.md",
      "az": "operating-systems\\windows\\fundamentals.md"
    }
  },
  {
    "slug": "/operating-systems/windows",
    "category": "operating-systems",
    "title": {
      "en": "Windows Guide",
      "az": "Windows Bələdçisi"
    },
    "description": {
      "en": "Overview of the current Windows content set: security controls, deployment, services, encryption, and productivity tooling.",
      "az": "Mövcud Windows kontent dəstinin icmalı: təhlükəsizlik nəzarətləri, deployment, services, şifrələmə və məhsuldarlıq alətləri."
    },
    "keywords": [
      "windows-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "windows-overview.md",
      "az": "windows-overview.md"
    }
  },
  {
    "slug": "/operating-systems/windows/services",
    "category": "operating-systems",
    "title": {
      "en": "Windows Services Hardening Guide",
      "az": "Windows Services Hardening Bələdçisi"
    },
    "description": {
      "en": "A safer guide to reviewing Windows services without breaking enterprise systems or disabling required functionality.",
      "az": "Windows xidmətlərini kor-koranə disable etmədən, daha təhlükəsiz və düzgün şəkildə necə review etmək lazım olduğunu öyrənin."
    },
    "keywords": [
      "operating-systems",
      "windows",
      "services"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "operating-systems\\windows\\services.md",
      "az": "operating-systems\\windows\\services.md"
    }
  },
  {
    "slug": "/red-teaming/initial-access",
    "category": "red-teaming",
    "title": {
      "en": "Initial Access",
      "az": "Initial Access"
    },
    "description": {
      "en": "A practical overview of common initial access vectors in authorized red team and adversary simulation work.",
      "az": "Authorized red team və adversary simulation işində istifadə olunan əsas initial access vektorlarına praktik baxış."
    },
    "keywords": [
      "red-teaming",
      "initial-access"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "red-teaming\\initial-access.md",
      "az": "red-teaming\\initial-access.md"
    }
  },
  {
    "slug": "/red-teaming/owasp-top-10",
    "category": "red-teaming",
    "title": {
      "en": "OWASP Top 10 (2021) — Web App Security Walkthrough",
      "az": "OWASP Top 10 (2021) — Veb Tətbiqləri Təhlükəsizliyi Dərsi"
    },
    "description": {
      "en": "Every category of the OWASP Top 10 2021 with vulnerable-code examples, exploitation walkthroughs, and concrete defenses.",
      "az": "OWASP Top 10 2021-in hər kateqoriyası — zəif kod nümunələri, istismar ssenariləri və konkret müdafiə tədbirləri."
    },
    "keywords": [
      "owasp",
      "owasp top 10",
      "web application security",
      "sqli",
      "xss",
      "broken access control",
      "ssrf",
      "insecure deserialization",
      "red-teaming",
      "owasp-top-10"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "red-teaming\\owasp-top-10.md",
      "az": "red-teaming\\owasp-top-10.md"
    }
  },
  {
    "slug": "/red-teaming",
    "category": "red-teaming",
    "title": {
      "en": "Red Team Guide",
      "az": "Red Team Bələdçisi"
    },
    "description": {
      "en": "Start here for authorized adversary simulation topics, learning order, and the current red team lesson set.",
      "az": "Səlahiyyətli adversary simulation mövzuları, öyrənmə ardıcıllığı və hazırkı red team dərs dəsti üçün başlanğıc nöqtəsi."
    },
    "keywords": [
      "red-teaming-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "red-teaming-overview.md",
      "az": "red-teaming-overview.md"
    }
  },
  {
    "slug": "/red-teaming/social-engineering",
    "category": "red-teaming",
    "title": {
      "en": "Social Engineering — Human-Layer Attacks and Defenses",
      "az": "Sosial Mühəndislik — İnsan Qatında Hücumlar və Müdafiə"
    },
    "description": {
      "en": "Phishing, vishing, smishing, pretexting, tailgating and every major social-engineering vector — with real 2024/2025 examples, psychological levers, and defenses that actually work.",
      "az": "Fişinq, vişinq, smişinq, bəhanə (pretexting), tailgatinq və bütün əsas sosial mühəndislik vektorları — 2024/2025 real nümunələri, psixoloji rıçaqlar və həqiqətən işləyən müdafiə ilə."
    },
    "keywords": [
      "social engineering",
      "phishing",
      "vishing",
      "smishing",
      "pretexting",
      "tailgating",
      "mfa bombing",
      "bec",
      "red-teaming",
      "social-engineering"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "red-teaming\\social-engineering.md",
      "az": "red-teaming\\social-engineering.md"
    }
  },
  {
    "slug": "/servers/active-directory-domain-services",
    "category": "servers",
    "title": {
      "en": "Active Directory Domain Services (AD DS)",
      "az": "Active Directory Domain Services (AD DS)"
    },
    "description": {
      "en": "Practical overview of AD DS structure, forests, domains, OUs, domain controllers, trusts, global catalog, and replication.",
      "az": "AD DS strukturu, forest, domain, OU, domain controller, trust, global catalog və replication üçün praktik icmal."
    },
    "keywords": [
      "active directory",
      "ad ds",
      "domain controller",
      "forest",
      "organizational unit",
      "trust",
      "servers",
      "active-directory",
      "active-directory-domain-services"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "servers\\active-directory\\active-directory-domain-services.md",
      "az": "servers\\active-directory\\active-directory-domain-services.md"
    }
  },
  {
    "slug": "/servers/file-server-ntfs",
    "category": "servers",
    "title": {
      "en": "File Server and NTFS Permissions",
      "az": "File Server və NTFS Permissions"
    },
    "description": {
      "en": "Hands-on File Server guide — SMB shares, share vs NTFS permissions, inheritance, ownership, Access-Based Enumeration, and FSRM quotas and file screens.",
      "az": "File Server üzrə praktik dərslik — SMB share-lar, share vs NTFS permissions, inheritance, ownership, Access-Based Enumeration və FSRM quota və file screen."
    },
    "keywords": [
      "file server",
      "smb",
      "ntfs permissions",
      "share permissions",
      "access-based enumeration",
      "fsrm",
      "quota",
      "file screening",
      "servers",
      "storage",
      "file-server-ntfs"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\storage\\file-server-ntfs.md",
      "az": "servers\\storage\\file-server-ntfs.md"
    }
  },
  {
    "slug": "/servers/fsmo",
    "category": "servers",
    "title": {
      "en": "FSMO Roles in Active Directory",
      "az": "Active Directory-də FSMO Rolları"
    },
    "description": {
      "en": "Learn what the five FSMO roles do, how to check them, and when to transfer or seize them safely.",
      "az": "Beş FSMO rolunun funksiyasını, necə yoxlanıldığını, transfer və seize fərqini öyrənin."
    },
    "keywords": [
      "servers",
      "active-directory",
      "fsmo"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "servers\\active-directory\\fsmo.md",
      "az": "servers\\active-directory\\fsmo.md"
    }
  },
  {
    "slug": "/servers/group-policy",
    "category": "servers",
    "title": {
      "en": "Group Policy (GPO)",
      "az": "Group Policy (GPO)"
    },
    "description": {
      "en": "Hands-on Group Policy guide — structure, LSDOU, inheritance, enforcement, Policies vs Preferences, common templates, security/WMI filtering, troubleshooting, backup/restore and a full lab scenario.",
      "az": "Group Policy üzrə praktik dərslik — struktur, LSDOU, inheritance, enforcement, Policies vs Preferences, tipik şablonlar, security/WMI filtering, troubleshooting, backup/restore və tam lab ssenarisi."
    },
    "keywords": [
      "group policy",
      "gpo",
      "lsdou",
      "sysvol",
      "fgpp",
      "gpmc",
      "gpresult",
      "security filtering",
      "wmi filter",
      "loopback processing",
      "servers",
      "active-directory",
      "group-policy"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\active-directory\\group-policy.md",
      "az": "servers\\active-directory\\group-policy.md"
    }
  },
  {
    "slug": "/servers/iis",
    "category": "servers",
    "title": {
      "en": "IIS (Internet Information Services)",
      "az": "IIS (Internet Information Services)"
    },
    "description": {
      "en": "Hands-on IIS guide — role installation, sites and bindings, host headers, application pools, HTTPS with certificates, authentication, logging, and troubleshooting.",
      "az": "IIS üzrə praktik dərslik — rol quraşdırma, site və binding-lər, host header, application pool, sertifikatla HTTPS, authentication, logging və troubleshooting."
    },
    "keywords": [
      "iis",
      "web server",
      "application pool",
      "ssl",
      "https",
      "windows authentication",
      "host header",
      "binding",
      "servers",
      "services"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\services\\iis.md",
      "az": "servers\\services\\iis.md"
    }
  },
  {
    "slug": "/servers/windows-server-2025-installation",
    "category": "servers",
    "title": {
      "en": "Install Windows Server 2025 from Scratch",
      "az": "Windows Server 2025-i Sıfırdan Quraşdırmaq"
    },
    "description": {
      "en": "Step-by-step Windows Server 2025 installation guide covering media prep, setup flow, first boot tasks, and safe initial configuration.",
      "az": "Windows Server 2025 üçün addım-addım quraşdırma bələdçisi: media hazırlığı, setup axını, ilk girişdən sonrakı əsas ayarlar və təhlükəsiz başlanğıc yoxlamaları."
    },
    "keywords": [
      "windows server 2025",
      "installation",
      "server setup",
      "evaluation center",
      "initial configuration",
      "servers",
      "windows-server",
      "windows-server-2025-installation",
      "quraşdırma",
      "ilkin konfiqurasiya"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "servers\\windows-server\\windows-server-2025-installation.md",
      "az": "servers\\windows-server\\windows-server-2025-installation.md"
    }
  },
  {
    "slug": "/servers/jump-server",
    "category": "servers",
    "title": {
      "en": "Jump Server (Bastion Host)",
      "az": "Jump Server (Bastion Host)"
    },
    "description": {
      "en": "Jump Server concept, where it sits in the network, key advantages, SSH ProxyJump and RDP configuration, and Windows setup checklist.",
      "az": "Jump Server konsepti, şəbəkədəki yeri, əsas üstünlüklər, SSH ProxyJump və RDP konfiqurasiyası, Windows quraşdırma check-list-i."
    },
    "keywords": [
      "jump server",
      "bastion host",
      "ssh proxyjump",
      "rdp",
      "dmz",
      "privileged access",
      "servers",
      "services",
      "jump-server"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "servers\\services\\jump-server.md",
      "az": "servers\\services\\jump-server.md"
    }
  },
  {
    "slug": "/servers/kms",
    "category": "servers",
    "title": {
      "en": "KMS (Key Management Service)",
      "az": "KMS (Key Management Service)"
    },
    "description": {
      "en": "Centralized Windows and Office activation — KMS thresholds, renewal intervals, configuration, and ADBA alternative.",
      "az": "Windows və Office üçün mərkəzləşdirilmiş aktivasiya: KMS həddləri, renewal interval-ları, konfiqurasiya və ADBA alternativi."
    },
    "keywords": [
      "kms",
      "activation",
      "adba",
      "volume licensing",
      "servers",
      "services",
      "aktivasiya"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "servers\\services\\kms.md",
      "az": "servers\\services\\kms.md"
    }
  },
  {
    "slug": "/servers/laps",
    "category": "servers",
    "title": {
      "en": "Microsoft LAPS Explained",
      "az": "Microsoft LAPS İzahı"
    },
    "description": {
      "en": "Understand Windows LAPS, legacy Microsoft LAPS, password backup options, rotation, and operational best practices.",
      "az": "Windows LAPS, legacy Microsoft LAPS, password backup seçimləri, rotation və əməliyyat best practice-ləri haqqında praktik izah."
    },
    "keywords": [
      "servers",
      "active-directory",
      "laps"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "servers\\active-directory\\laps.md",
      "az": "servers\\active-directory\\laps.md"
    }
  },
  {
    "slug": "/servers/rds",
    "category": "servers",
    "title": {
      "en": "Remote Desktop Services (RDS)",
      "az": "Remote Desktop Services (RDS)"
    },
    "description": {
      "en": "Hands-on RDS guide — components, Quick Start deployment, session collections, RemoteApp, RD Gateway, RD Licensing, GPO tuning, monitoring and troubleshooting.",
      "az": "RDS üzrə praktik dərslik — komponentlər, Quick Start quraşdırma, session collection-lar, RemoteApp, RD Gateway, RD Licensing, GPO tənzimləmələri, monitorinq və troubleshooting."
    },
    "keywords": [
      "rds",
      "remote desktop services",
      "session host",
      "remoteapp",
      "rd gateway",
      "rd licensing",
      "connection broker",
      "rdp",
      "servers",
      "services"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\services\\rds.md",
      "az": "servers\\services\\rds.md"
    }
  },
  {
    "slug": "/servers",
    "category": "servers",
    "title": {
      "en": "Servers Guide",
      "az": "Serverlər Bələdçisi"
    },
    "description": {
      "en": "Practical Windows and Active Directory server topics, planning guidance, and identity-related operations.",
      "az": "Praktik Windows və Active Directory server mövzuları, planlama rəhbərliyi və identity yönümlü əməliyyatlar."
    },
    "keywords": [
      "servers-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "servers-overview.md",
      "az": "servers-overview.md"
    }
  },
  {
    "slug": "/servers/storage-filesystems-servers",
    "category": "servers",
    "title": {
      "en": "Storage, File Systems, and Server Form Factors",
      "az": "Storage, Fayl Sistemləri və Server Form Factorları"
    },
    "description": {
      "en": "DAS, NAS, SAN, NTFS vs ReFS, MBR vs GPT, VHD types, tower/rack/blade servers, and vSphere datastore protocols.",
      "az": "DAS, NAS, SAN, NTFS vs ReFS, MBR vs GPT, VHD növləri, tower/rack/blade serverlər və vSphere datastore protokolları."
    },
    "keywords": [
      "storage",
      "das",
      "nas",
      "san",
      "ntfs",
      "refs",
      "gpt",
      "vhd",
      "rack server",
      "servers",
      "storage-filesystems-servers"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "servers\\storage\\storage-filesystems-servers.md",
      "az": "servers\\storage\\storage-filesystems-servers.md"
    }
  },
  {
    "slug": "/servers/upgrade-migration",
    "category": "servers",
    "title": {
      "en": "Upgrade, Update, and Migration",
      "az": "Upgrade, Update və Migration"
    },
    "description": {
      "en": "Differences between Windows Server upgrade, update, and migration — supported paths, ADBA activation, and decision guidance.",
      "az": "Windows Server-də upgrade, update və migration fərqləri: dəstəklənən yollar, ADBA aktivasiyası və qərar bələdçisi."
    },
    "keywords": [
      "upgrade",
      "update",
      "migration",
      "in-place upgrade",
      "adba",
      "servers",
      "windows-server",
      "upgrade-migration"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "servers\\windows-server\\upgrade-migration.md",
      "az": "servers\\windows-server\\upgrade-migration.md"
    }
  },
  {
    "slug": "/servers/windows-server-tools",
    "category": "servers",
    "title": {
      "en": "Windows Server Administration Tools",
      "az": "Windows Server İdarəetmə Alətləri"
    },
    "description": {
      "en": "Practical guide to Server Manager, Event Viewer, Performance Monitor, Resource Monitor, Services, Server Core tools, and related admin workflows.",
      "az": "Server Manager, Event Viewer, Performance Monitor, Resource Monitor, Services, Server Core alətləri və əlaqəli admin iş axını üçün praktik bələdçi."
    },
    "keywords": [
      "windows server",
      "server manager",
      "event viewer",
      "perfmon",
      "resmon",
      "services",
      "servers",
      "windows-server",
      "windows-server-tools"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "servers\\windows-server\\windows-server-tools.md",
      "az": "servers\\windows-server\\windows-server-tools.md"
    }
  },
  {
    "slug": "/servers/backup",
    "category": "servers",
    "title": {
      "en": "Windows Server Backup",
      "az": "Windows Server Backup"
    },
    "description": {
      "en": "Hands-on Windows Server Backup guide — backup types, installation, scheduled and on-demand backup, file/System State/bare-metal recovery, and AD Recycle Bin.",
      "az": "Windows Server Backup üzrə praktik dərslik — backup növləri, quraşdırma, scheduled və on-demand backup, fayl/System State/bare metal bərpa və AD Recycle Bin."
    },
    "keywords": [
      "backup",
      "windows server backup",
      "wbadmin",
      "system state",
      "bare metal recovery",
      "ad recycle bin",
      "authoritative restore",
      "servers",
      "storage"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\storage\\backup.md",
      "az": "servers\\storage\\backup.md"
    }
  },
  {
    "slug": "/servers/windows-server-planning",
    "category": "servers",
    "title": {
      "en": "Windows Server Planning Before Installation",
      "az": "Windows Server Quraşdırmadan Əvvəl Planlaşdırma"
    },
    "description": {
      "en": "Plan your Windows Server deployment by choosing the right edition, roles, deployment model, and installation option.",
      "az": "Windows Server quraşdırmazdan əvvəl edition, rol, deployment modeli və quraşdırma variantını düzgün planlayın."
    },
    "keywords": [
      "servers",
      "windows-server",
      "windows-server-planning"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "servers\\windows-server\\windows-server-planning.md",
      "az": "servers\\windows-server\\windows-server-planning.md"
    }
  },
  {
    "slug": "/servers/wsus",
    "category": "servers",
    "title": {
      "en": "WSUS (Windows Server Update Services)",
      "az": "WSUS (Windows Server Update Services)"
    },
    "description": {
      "en": "Hands-on WSUS guide — architecture, role installation, products/classifications, computer groups, approvals, client GPO, reporting, cleanup, and troubleshooting.",
      "az": "WSUS üzrə praktik dərslik — arxitektura, rol quraşdırma, product/classification seçimi, computer groups, approval, client GPO, reporting, cleanup və troubleshooting."
    },
    "keywords": [
      "wsus",
      "windows update",
      "patch management",
      "gpo",
      "wsusutil",
      "auto-approval",
      "servers",
      "services"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "servers\\services\\wsus.md",
      "az": "servers\\services\\wsus.md"
    }
  },
  {
    "slug": "/virtualization/hypervisor",
    "category": "virtualization",
    "title": {
      "en": "Hypervisors and Virtualization",
      "az": "Hypervisor və Virtualizasiya"
    },
    "description": {
      "en": "Hypervisor types explained — Type 1 vs Type 2, microkernel vs monolithic, vSphere/ESXi, Hyper-V, and common virtualization categories.",
      "az": "Hypervisor növləri: Type 1 vs Type 2, microkernel vs monolithic, vSphere/ESXi, Hyper-V və virtualizasiya kateqoriyaları."
    },
    "keywords": [
      "hypervisor",
      "type 1",
      "type 2",
      "esxi",
      "hyper-v",
      "virtualization",
      "virtualizasiya"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-22",
    "sourcePaths": {
      "en": "virtualization\\hypervisor.md",
      "az": "virtualization\\hypervisor.md"
    }
  },
  {
    "slug": "/virtualization/virtualization-basics",
    "category": "virtualization",
    "title": {
      "en": "Virtualization Basics",
      "az": "Virtualizasiya Əsasları"
    },
    "description": {
      "en": "A practical introduction to hypervisors, virtual machines, snapshots, storage, networking, and common use cases.",
      "az": "Hypervisor-lar, virtual maşınlar, snapshot, storage, şəbəkə və əsas istifadə ssenariləri üçün praktik giriş."
    },
    "keywords": [
      "virtualization",
      "virtualization-basics"
    ],
    "status": "reference",
    "lastReviewed": null,
    "sourcePaths": {
      "en": "virtualization\\virtualization-basics.md",
      "az": "virtualization\\virtualization-basics.md"
    }
  },
  {
    "slug": "/virtualization",
    "category": "virtualization",
    "title": {
      "en": "Virtualization Guide",
      "az": "Virtualizasiya Bələdçisi"
    },
    "description": {
      "en": "Overview of virtualization basics, lab building, and the platform concepts behind safer testing environments.",
      "az": "Virtualizasiya əsasları, lab qurulması və daha təhlükəsiz test mühitlərinin arxasındakı platform anlayışlarının icmalı."
    },
    "keywords": [
      "virtualization-overview"
    ],
    "status": "overview",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "virtualization-overview.md",
      "az": "virtualization-overview.md"
    }
  },
  {
    "slug": "/virtualization/vmware-virtualization",
    "category": "virtualization",
    "title": {
      "en": "VMware Virtualization Basics",
      "az": "VMware Virtualizasiya Əsasları"
    },
    "description": {
      "en": "Practical guide to VMware products, ESXi vs vSphere vs Workstation, VM creation flow, and how lab network modes differ from vSphere networking.",
      "az": "VMware məhsulları, ESXi vs vSphere vs Workstation, VM yaratma axını və lab network modellərinin vSphere şəbəkəsindən fərqi üçün praktik bələdçi."
    },
    "keywords": [
      "vmware",
      "vsphere",
      "esxi",
      "workstation",
      "bridged",
      "nat",
      "virtualization",
      "vmware-virtualization"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "virtualization\\vmware-virtualization.md",
      "az": "virtualization\\vmware-virtualization.md"
    }
  }
];

export default lessons;
