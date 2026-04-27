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
    "slug": "/general-security/aaa-non-repudiation",
    "category": "general-security",
    "title": {
      "en": "AAA — Authentication, Authorization, Accounting and Non-Repudiation",
      "az": "AAA — Autentifikasiya, Avtorizasiya, Uçot və Non-Repudiasiya"
    },
    "description": {
      "en": "The AAA framework that complements CIA — authentication factors and methods, biometrics with FAR/FRR/CER, authorization models, accounting/audit trails, and non-repudiation as the proof-against-denial property.",
      "az": "CIA-nı tamamlayan AAA çərçivəsi — autentifikasiya faktorları və metodları, FAR/FRR/CER ilə biometriya, avtorizasiya modelləri, uçot/audit izləri və inkar etməyə qarşı sübut xassəsi olaraq non-repudiasiya."
    },
    "keywords": [
      "aaa",
      "authentication",
      "authorization",
      "accounting",
      "non-repudiation",
      "mfa",
      "multi-factor authentication",
      "biometrics",
      "far",
      "frr",
      "crossover error rate",
      "radius",
      "tacacs",
      "general-security",
      "aaa-non-repudiation",
      "autentifikasiya",
      "avtorizasiya",
      "uçot",
      "non-repudiasiya",
      "çoxfaktorlu autentifikasiya",
      "biometriya",
      "keçid xəta dərəcəsi"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-26",
    "sourcePaths": {
      "en": "general-security\\aaa-non-repudiation.md",
      "az": "general-security\\aaa-non-repudiation.md"
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
    "slug": "/general-security/iam-account-management",
    "category": "general-security",
    "title": {
      "en": "Identity and Account Management",
      "az": "Şəxsiyyət və Hesab İdarəetməsi"
    },
    "description": {
      "en": "Identity lifecycle from provisioning to deprovisioning, account types (user, service, admin, shared, guest), access policies (RBAC, ABAC, JIT, time-of-day), SSO and federation, IAM solutions across enterprise, cloud and hybrid environments.",
      "az": "Provizioniadan deprovizioniyaya qədər şəxsiyyət həyat dövrü, hesab tipləri (istifadəçi, xidmət, admin, paylaşılan, qonaq), giriş siyasətləri (RBAC, ABAC, JIT, vaxt-əsaslı), SSO və federasiya, korporativ, bulud və hibrid mühitlərdə IAM həlləri."
    },
    "keywords": [
      "iam",
      "identity management",
      "account management",
      "rbac",
      "abac",
      "sso",
      "federation",
      "saml",
      "oidc",
      "jit access",
      "service accounts",
      "admin accounts",
      "identity proofing",
      "account lifecycle",
      "general-security",
      "iam-account-management"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-26",
    "sourcePaths": {
      "en": "general-security\\iam-account-management.md",
      "az": "general-security\\iam-account-management.md"
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
    "slug": "/general-security/open-source-tools/backup-and-storage",
    "category": "general-security",
    "title": {
      "en": "Open-Source Backup and File Sharing",
      "az": "Açıq Mənbə Backup və Fayl Paylaşımı"
    },
    "description": {
      "en": "Open-source backup and storage stack — BorgBackup and Restic for deduplicated backups, UrBackup for image-based, plus Nextcloud, Seafile and OnionShare for file sharing and self-hosted cloud.",
      "az": "Açıq mənbə backup və saxlama stack-ı — dedup edilmiş backup-lar üçün BorgBackup və Restic, image-əsaslı üçün UrBackup, plus fayl paylaşımı və self-hosted cloud üçün Nextcloud, Seafile və OnionShare."
    },
    "keywords": [
      "borgbackup",
      "restic",
      "urbackup",
      "nextcloud",
      "seafile",
      "onionshare",
      "backup",
      "3-2-1 rule",
      "file sharing",
      "open source",
      "general-security",
      "open-source-tools",
      "backup-and-storage",
      "3-2-1 qaydası",
      "fayl paylaşımı",
      "açıq mənbə"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\backup-and-storage.md",
      "az": "general-security\\open-source-tools\\backup-and-storage.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/email-security",
    "category": "general-security",
    "title": {
      "en": "Open-Source Email Security",
      "az": "Açıq Mənbə Email Təhlükəsizliyi"
    },
    "description": {
      "en": "Open-source mail security stack — Rspamd and SpamAssassin for filtering, Proxmox Mail Gateway for scanning, and Mailcow / Mail-in-a-Box / iRedMail as full self-hosted mail server bundles.",
      "az": "Açıq mənbə poçt təhlükəsizliyi stack-ı — filtrasiya üçün Rspamd və SpamAssassin, skanlama üçün Proxmox Mail Gateway və tam self-hosted poçt server bundle-ları kimi Mailcow / Mail-in-a-Box / iRedMail."
    },
    "keywords": [
      "rspamd",
      "spamassassin",
      "mailcow",
      "mail-in-a-box",
      "iredmail",
      "proxmox mail gateway",
      "email security",
      "dmarc",
      "dkim",
      "spf",
      "open source",
      "general-security",
      "open-source-tools",
      "email-security"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\email-security.md",
      "az": "general-security\\open-source-tools\\email-security.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/firewall-ids-waf",
    "category": "general-security",
    "title": {
      "en": "Open-Source Firewall, IDS/IPS, WAF and NAC",
      "az": "Açıq Mənbə Firewall, IDS/IPS, WAF və NAC"
    },
    "description": {
      "en": "Open-source perimeter and inline defense — OPNsense and pfSense (firewalls), Suricata, Zeek and Snort (IDS/IPS), ModSecurity and BunkerWeb (WAF), and PacketFence (NAC).",
      "az": "Açıq mənbə perimetr və inline müdafiə — OPNsense və pfSense (firewall-lar), Suricata, Zeek və Snort (IDS/IPS), ModSecurity və BunkerWeb (WAF) və PacketFence (NAC)."
    },
    "keywords": [
      "opnsense",
      "pfsense",
      "suricata",
      "zeek",
      "snort",
      "modsecurity",
      "bunkerweb",
      "packetfence",
      "waf",
      "ids",
      "nac",
      "open source",
      "general-security",
      "open-source-tools",
      "firewall-ids-waf"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\firewall-ids-waf.md",
      "az": "general-security\\open-source-tools\\firewall-ids-waf.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/grc-tools",
    "category": "general-security",
    "title": {
      "en": "Open-Source GRC Tools",
      "az": "Açıq Mənbə GRC Vasitələri"
    },
    "description": {
      "en": "Open-source governance, risk and compliance tooling — CISO Assistant CE, Eramba CE, OpenGRC and Gapps for risk register, control mapping, audit evidence, and policy lifecycle management.",
      "az": "Açıq mənbə governance, risk və compliance tooling — risk register, control mapping, audit evidence və policy lifecycle management üçün CISO Assistant CE, Eramba CE, OpenGRC və Gapps."
    },
    "keywords": [
      "ciso assistant",
      "eramba",
      "opengrc",
      "opencontrol",
      "gapps",
      "grc",
      "risk register",
      "audit",
      "compliance",
      "iso 27001",
      "soc 2",
      "open source",
      "general-security",
      "open-source-tools",
      "grc-tools"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\grc-tools.md",
      "az": "general-security\\open-source-tools\\grc-tools.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/iam-and-mfa",
    "category": "general-security",
    "title": {
      "en": "Open-Source IAM and MFA",
      "az": "Açıq Mənbə IAM və MFA"
    },
    "description": {
      "en": "Open-source identity and access management — Keycloak as the de-facto enterprise SSO, Authentik as the modern UI-first alternative, the Ory stack for headless IAM, plus Authelia and PrivacyIDEA for MFA front-ends.",
      "az": "Açıq mənbə identity və access management — Keycloak de-facto enterprise SSO kimi, Authentik müasir UI-first alternativ kimi, headless IAM üçün Ory stack, üstəgəl MFA front-end-ləri olan Authelia və PrivacyIDEA."
    },
    "keywords": [
      "keycloak",
      "authentik",
      "ory",
      "kratos",
      "hydra",
      "keto",
      "authelia",
      "privacyidea",
      "iam",
      "sso",
      "mfa",
      "oidc",
      "saml",
      "open source",
      "general-security",
      "open-source-tools",
      "iam-and-mfa"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\iam-and-mfa.md",
      "az": "general-security\\open-source-tools\\iam-and-mfa.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/red-team-tools",
    "category": "general-security",
    "title": {
      "en": "Open-Source Red Team and Adversary Emulation",
      "az": "Açıq Mənbə Red Team və Düşmən Emulyasiyası"
    },
    "description": {
      "en": "Open-source tools for offensive security testing — GoPhish for phishing simulation, MITRE Caldera and Atomic Red Team for adversary emulation, Sliver as a modern C2, plus APTSimulator and RTA for technique simulation.",
      "az": "Hücum təhlükəsizliyi testləri üçün açıq mənbə alətləri — fişinq simulyasiyası üçün GoPhish, düşmən emulyasiyası üçün MITRE Caldera və Atomic Red Team, müasir C2 kimi Sliver, üstəlik texnika simulyasiyası üçün APTSimulator və RTA."
    },
    "keywords": [
      "gophish",
      "king phisher",
      "lucy",
      "atomic red team",
      "caldera",
      "sliver",
      "aptsimulator",
      "rta",
      "adversary emulation",
      "red team",
      "c2",
      "phishing simulation",
      "mitre attack",
      "open source",
      "general-security",
      "open-source-tools",
      "red-team-tools"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\red-team-tools.md",
      "az": "general-security\\open-source-tools\\red-team-tools.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/secrets-and-pam",
    "category": "general-security",
    "title": {
      "en": "Open-Source Secrets Management and Privileged Access",
      "az": "Açıq Mənbə Secrets Management və Privileged Access"
    },
    "description": {
      "en": "Open-source secrets management (HashiCorp Vault, Infisical, Conjur), privileged access (Teleport, JumpServer, Pritunl Zero) and password vaults (Vaultwarden, Passbolt, Psono) — the three layers of secret-handling for humans, machines, and admins.",
      "az": "Açıq mənbə secrets management (HashiCorp Vault, Infisical, Conjur), privileged access (Teleport, JumpServer, Pritunl Zero) və password vault-lar (Vaultwarden, Passbolt, Psono) — insanlar, maşınlar və admin-lər üçün secret-handling-in üç təbəqəsi."
    },
    "keywords": [
      "hashicorp vault",
      "infisical",
      "cyberark conjur",
      "teleport",
      "jumpserver",
      "pritunl zero",
      "vaultwarden",
      "bitwarden",
      "passbolt",
      "psono",
      "secrets management",
      "pam",
      "password manager",
      "open source",
      "general-security",
      "open-source-tools",
      "secrets-and-pam"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\secrets-and-pam.md",
      "az": "general-security\\open-source-tools\\secrets-and-pam.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/overview",
    "category": "general-security",
    "title": {
      "en": "Open-Source Security Stack — Overview",
      "az": "Açıq mənbəli təhlükəsizlik stack-i — İcmal"
    },
    "description": {
      "en": "Roadmap for building a budget-friendly open-source security stack across firewall/IDS, SIEM, vulnerability scanning, IAM, secrets, email, backup, threat intel, red team and GRC — plus IT asset management as the foundation.",
      "az": "Firewall/IDS, SIEM, zəiflik skanı, IAM, sirlər, e-poçt, ehtiyat nüsxə, təhdid kəşfiyyatı, red team və GRC üzrə büdcəyə qənaət edən açıq mənbəli təhlükəsizlik stack-i qurmaq üçün yol xəritəsi — və təməl olaraq IT aktiv idarəetməsi."
    },
    "keywords": [
      "open source security",
      "open source tools",
      "it asset management",
      "glpi",
      "snipe-it",
      "netbox",
      "security stack",
      "general-security",
      "open-source-tools",
      "overview"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\overview.md",
      "az": "general-security\\open-source-tools\\overview.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/siem-and-monitoring",
    "category": "general-security",
    "title": {
      "en": "Open-Source SIEM, Logging and Monitoring",
      "az": "Açıq Mənbə SIEM, Loglama və Monitorinq"
    },
    "description": {
      "en": "Open-source detection and observability stack — Wazuh and OSSEC for HIDS, the ELK / OpenSearch stack for log aggregation, and Zabbix / Prometheus / Uptime Kuma for infrastructure monitoring.",
      "az": "Açıq mənbə aşkarlama və müşahidə qabiliyyəti stack-ı — HIDS üçün Wazuh və OSSEC, log aqreqasiyası üçün ELK / OpenSearch stack və infrastruktur monitorinqi üçün Zabbix / Prometheus / Uptime Kuma."
    },
    "keywords": [
      "wazuh",
      "ossec",
      "elk stack",
      "elasticsearch",
      "kibana",
      "logstash",
      "opensearch",
      "zabbix",
      "prometheus",
      "grafana",
      "uptime kuma",
      "siem",
      "monitoring",
      "open source",
      "general-security",
      "open-source-tools",
      "siem-and-monitoring"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\siem-and-monitoring.md",
      "az": "general-security\\open-source-tools\\siem-and-monitoring.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/threat-intel-and-malware",
    "category": "general-security",
    "title": {
      "en": "Open-Source Threat Intelligence and Malware Analysis",
      "az": "Açıq Mənbə Təhdid Kəşfiyyatı və Zərərli Proqram Analizi"
    },
    "description": {
      "en": "Open-source threat intel platforms (OpenCTI, MISP, YETI) and malware analysis sandboxes (Cuckoo, CAPEv2, IntelOwl) — the tools that turn raw indicators into operational intelligence.",
      "az": "Açıq mənbə təhdid kəşfiyyatı platformaları (OpenCTI, MISP, YETI) və zərərli proqram analiz sandbox-ları (Cuckoo, CAPEv2, IntelOwl) — xam göstəriciləri operativ kəşfiyyata çevirən alətlər."
    },
    "keywords": [
      "opencti",
      "misp",
      "yeti",
      "cuckoo sandbox",
      "capev2",
      "intelowl",
      "maltrail",
      "threat intelligence",
      "malware analysis",
      "stix",
      "taxii",
      "open source",
      "general-security",
      "open-source-tools",
      "threat-intel-and-malware"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\threat-intel-and-malware.md",
      "az": "general-security\\open-source-tools\\threat-intel-and-malware.md"
    }
  },
  {
    "slug": "/general-security/open-source-tools/vulnerability-and-appsec",
    "category": "general-security",
    "title": {
      "en": "Open-Source Vulnerability Scanning and Application Security",
      "az": "Açıq Mənbə Zəiflik Skanlaması və Tətbiq Təhlükəsizliyi"
    },
    "description": {
      "en": "Open-source vulnerability assessment and application security tooling — OpenVAS for infrastructure scanning, OWASP ZAP and Nuclei for DAST, Semgrep and Bandit for SAST, Trivy and Syft for SBOM and container scanning.",
      "az": "Açıq mənbə zəiflik qiymətləndirmə və tətbiq təhlükəsizliyi alətləri — infrastruktur skanlaması üçün OpenVAS, DAST üçün OWASP ZAP və Nuclei, SAST üçün Semgrep və Bandit, SBOM və konteyner skanlaması üçün Trivy və Syft."
    },
    "keywords": [
      "openvas",
      "greenbone",
      "nessus",
      "owasp zap",
      "nuclei",
      "nikto",
      "amass",
      "semgrep",
      "sonarqube",
      "bandit",
      "trivy",
      "syft",
      "sbom",
      "sast",
      "dast",
      "open source",
      "general-security",
      "open-source-tools",
      "vulnerability-and-appsec"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "general-security\\open-source-tools\\vulnerability-and-appsec.md",
      "az": "general-security\\open-source-tools\\vulnerability-and-appsec.md"
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
    "slug": "/general-security/cryptography/pki",
    "category": "general-security",
    "title": {
      "en": "Public Key Infrastructure (PKI)",
      "az": "Public Key Infrastructure (PKI)"
    },
    "description": {
      "en": "How PKI binds public keys to identities — certificate authorities, root and intermediate CAs, X.509 certificates, registration and trust models, certificate lifecycle (issue, renew, revoke), CRL/OCSP, key escrow, and the practical TLS / S/MIME / code-signing use cases.",
      "az": "PKI publik açarları şəxsiyyətlərə necə bağlayır — sertifikat hakimiyyətləri, kök və aralıq CA-lar, X.509 sertifikatları, qeydiyyat və etibar modelləri, sertifikatın həyat dövrü (verilmə, yenilənmə, ləğv), CRL/OCSP, açar deposi və praktik TLS / S/MIME / kod imzalama istifadə halları."
    },
    "keywords": [
      "pki",
      "public key infrastructure",
      "certificate authority",
      "root ca",
      "intermediate ca",
      "x.509",
      "csr",
      "crl",
      "ocsp",
      "certificate revocation",
      "key escrow",
      "hsm",
      "acme",
      "lets encrypt",
      "tls",
      "general-security",
      "cryptography"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-26",
    "sourcePaths": {
      "en": "general-security\\cryptography\\pki.md",
      "az": "general-security\\cryptography\\pki.md"
    }
  },
  {
    "slug": "/general-security/secure-app-development",
    "category": "general-security",
    "title": {
      "en": "Secure Application Development",
      "az": "Təhlükəsiz Tətbiq İnkişafı"
    },
    "description": {
      "en": "Secure SDLC — environments (dev/test/staging/prod), secure coding techniques (validation, normalization, stored procedures, memory management), OWASP awareness, software diversity, CI/CD pipelines, version control and continuous monitoring.",
      "az": "Təhlükəsiz SDLC — mühitlər (dev/test/staging/prod), təhlükəsiz kodlama texnikaları (validasiya, normalizasiya, stored prosedurlar, yaddaş idarəçiliyi), OWASP məlumatlılığı, proqram müxtəlifliyi, CI/CD pipeline-lar, versiya nəzarəti və davamlı monitorinq."
    },
    "keywords": [
      "secure sdlc",
      "secure coding",
      "input validation",
      "owasp",
      "ci/cd",
      "continuous integration",
      "continuous deployment",
      "version control",
      "software supply chain",
      "third-party libraries",
      "sast",
      "dast",
      "general-security",
      "secure-app-development",
      "təhlükəsiz sdlc",
      "təhlükəsiz kodlama",
      "input validasiyası",
      "davamlı inteqrasiya",
      "davamlı yerləşdirmə",
      "versiya nəzarəti",
      "proqram təminatı təchizat zənciri",
      "üçüncü tərəf kitabxanaları"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-26",
    "sourcePaths": {
      "en": "general-security\\secure-app-development.md",
      "az": "general-security\\secure-app-development.md"
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
    "slug": "/grc/security-governance",
    "category": "grc",
    "title": {
      "en": "Security Governance, Policies and People",
      "az": "Təhlükəsizlik İdarəetməsi, Siyasətlər və İnsanlar"
    },
    "description": {
      "en": "Organisational policies (AUP, NDA, SoD, least privilege), training programs, third-party risk management (SLA/MOU/MSA/BPA), data lifecycle (classification, retention, EOL), credential policies, change management and asset management — the \"people and process\" half of a security program.",
      "az": "Təşkilati siyasətlər (AUP, NDA, SoD, ən az imtiyaz), təlim proqramları, üçüncü tərəf risk idarəetməsi (SLA/MOU/MSA/BPA), məlumat həyat dövrü (təsnifat, saxlama, EOL), kredensial siyasətləri, dəyişiklik idarəetməsi və aktiv idarəetməsi — təhlükəsizlik proqramının \"insanlar və proseslər\" yarısı."
    },
    "keywords": [
      "security governance",
      "acceptable use policy",
      "aup",
      "separation of duties",
      "least privilege",
      "background checks",
      "nda",
      "onboarding",
      "offboarding",
      "user training",
      "phishing simulation",
      "third-party risk",
      "sla",
      "mou",
      "msa",
      "bpa",
      "data classification",
      "data retention",
      "change management",
      "asset management",
      "grc",
      "security-governance",
      "təhlükəsizlik idarəetməsi",
      "məqbul istifadə siyasəti",
      "vəzifələrin ayrılması",
      "ən az imtiyaz",
      "keçmiş yoxlamaları",
      "işə qəbul",
      "işdən azad etmə",
      "istifadəçi təlimi",
      "fişinq simulyasiyası",
      "üçüncü tərəf riski",
      "məlumat təsnifatı",
      "məlumat saxlanması",
      "dəyişiklik idarəetməsi",
      "aktiv idarəetməsi"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-26",
    "sourcePaths": {
      "en": "grc\\security-governance.md",
      "az": "grc\\security-governance.md"
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
      "foundation"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-23",
    "sourcePaths": {
      "en": "networking\\foundation\\dhcp.md",
      "az": "networking\\foundation\\dhcp.md"
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
      "foundation",
      "name resolution",
      "caching"
    ],
    "status": "reference",
    "lastReviewed": "2026-03-23",
    "sourcePaths": {
      "en": "networking\\foundation\\dns.md",
      "az": "networking\\foundation\\dns.md"
    }
  },
  {
    "slug": "/networking/ethernet-and-arp",
    "category": "networking",
    "title": {
      "en": "Ethernet and ARP",
      "az": "Ethernet ve ARP"
    },
    "description": {
      "en": "How Layer 2 actually works — MAC addresses, Ethernet frames, switches vs hubs, broadcast domains, VLANs, and ARP as the bridge from IP back down to MAC.",
      "az": "Layer 2 aslinda nece islayir — MAC unvanlari, Ethernet cervileri, switch-ler hub-lara qarsi, broadcast domenleri, VLAN-lar ve IP-den yene MAC-a korpu kimi ARP."
    },
    "keywords": [
      "ethernet",
      "arp",
      "mac address",
      "layer 2",
      "data link",
      "switch",
      "vlan",
      "broadcast domain",
      "arp spoofing",
      "networking",
      "foundation",
      "ethernet-and-arp",
      "mac unvani",
      "broadcast domeni",
      "arp spoofinq"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\ethernet-and-arp.md",
      "az": "networking\\foundation\\ethernet-and-arp.md"
    }
  },
  {
    "slug": "/networking/ip-addressing",
    "category": "networking",
    "title": {
      "en": "IP Addressing — IPv4 and IPv6",
      "az": "IP Ünvanlama — IPv4 və IPv6"
    },
    "description": {
      "en": "How IP addresses work — IPv4's 32-bit dotted-quad, IPv6's 128-bit hex, classes, private vs public ranges, special-purpose ranges, NAT, DMZ, loopback, and link-local.",
      "az": "IP ünvanlarının necə işlədiyi — IPv4-ün 32-bitlik nöqtəli kvarteti, IPv6-nın 128-bitlik hex formatı, sinifləri, özəl və ictimai diapazonları, xüsusi təyinatlı diapazonları, NAT, DMZ, loopback və link-local."
    },
    "keywords": [
      "ip addressing",
      "ipv4",
      "ipv6",
      "private ip",
      "public ip",
      "rfc 1918",
      "nat",
      "dmz",
      "loopback",
      "apipa",
      "networking fundamentals",
      "networking",
      "foundation",
      "ip-addressing",
      "ip ünvanlama",
      "özəl ip",
      "ictimai ip",
      "şəbəkə əsasları"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\ip-addressing.md",
      "az": "networking\\foundation\\ip-addressing.md"
    }
  },
  {
    "slug": "/networking/network-devices",
    "category": "networking",
    "title": {
      "en": "Network Devices",
      "az": "Şəbəkə Cihazları"
    },
    "description": {
      "en": "Hubs, switches, routers, firewalls, load balancers, proxies, IDS/IPS, WAF, NAT gateways, VPN concentrators — what each does, which OSI layer it sits at, and how to choose the right one.",
      "az": "Hub-lar, switch-lər, router-lər, firewall-lar, yük balanslayıcıları, proxy-lər, IDS/IPS, WAF, NAT şlüzləri, VPN konsentratorları — hər birinin nə etdiyi, hansı OSI səviyyəsində dayandığı və düzgün cihazı necə seçmək."
    },
    "keywords": [
      "network devices",
      "switch",
      "router",
      "firewall",
      "load balancer",
      "proxy",
      "ids",
      "ips",
      "waf",
      "nat",
      "vpn",
      "networking fundamentals",
      "networking",
      "foundation",
      "network-devices"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\network-devices.md",
      "az": "networking\\foundation\\network-devices.md"
    }
  },
  {
    "slug": "/networking/network-types-and-topology",
    "category": "networking",
    "title": {
      "en": "Network Types and Topology",
      "az": "Sebeke Novleri ve Topologiya"
    },
    "description": {
      "en": "LAN, WAN, MAN, PAN, CAN, SAN, WLAN, VPN — and the physical/logical topologies (star, bus, ring, mesh) plus communication patterns (unicast, multicast, broadcast, anycast).",
      "az": "LAN, WAN, MAN, PAN, CAN, SAN, WLAN, VPN — ve fiziki/mentiqi topologiyalar (ulduz, sin, halqa, mesh) ile elaqe modelleri (unicast, multicast, broadcast, anycast)."
    },
    "keywords": [
      "network types",
      "lan",
      "wan",
      "man",
      "pan",
      "can",
      "san",
      "wlan",
      "topology",
      "star topology",
      "mesh topology",
      "unicast",
      "multicast",
      "broadcast",
      "anycast",
      "networking fundamentals",
      "networking",
      "foundation",
      "network-types-and-topology",
      "sebeke novleri",
      "topologiya",
      "ulduz topologiyasi",
      "mesh topologiyasi",
      "sebeke esaslari"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\network-types-and-topology.md",
      "az": "networking\\foundation\\network-types-and-topology.md"
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
    "slug": "/networking/ports-and-protocols",
    "category": "networking",
    "title": {
      "en": "Ports and Protocols",
      "az": "Portlar və Protokollar"
    },
    "description": {
      "en": "How TCP/UDP ports work, the three port ranges, the 30 ports every infosec professional must know, secure-vs-cleartext alternatives, and how to find unexpected listeners on your hosts.",
      "az": "TCP/UDP portları necə işləyir, üç port diapazonu, hər infosec mütəxəssisinin bilməli olduğu 30 port, təhlükəsiz və açıq mətn alternativləri, host-larınızda gözlənilməz dinləyiciləri necə tapmaq."
    },
    "keywords": [
      "ports",
      "protocols",
      "well-known ports",
      "tcp ports",
      "udp ports",
      "listening ports",
      "networking fundamentals",
      "port scanning",
      "networking",
      "foundation",
      "ports-and-protocols"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\ports-and-protocols.md",
      "az": "networking\\foundation\\ports-and-protocols.md"
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
    "slug": "/networking/subnetting",
    "category": "networking",
    "title": {
      "en": "Subnetting and CIDR",
      "az": "Subnetlərə bölmə və CIDR"
    },
    "description": {
      "en": "The math of dividing networks — binary refresher, subnet masks, CIDR notation, subnet calculation, VLSM (Variable-Length Subnet Masking), and IPv6 prefix notation.",
      "az": "Şəbəkələri bölmənin riyaziyyatı — ikilik təkrarlama, subnet maskaları, CIDR notasiyası, subnet hesablanması, VLSM (Dəyişən Uzunluqlu Subnet Maskası) və IPv6 prefiks notasiyası."
    },
    "keywords": [
      "subnetting",
      "cidr",
      "subnet mask",
      "vlsm",
      "binary",
      "ipv6 prefix",
      "subnet math",
      "networking fundamentals",
      "networking",
      "foundation"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\subnetting.md",
      "az": "networking\\foundation\\subnetting.md"
    }
  },
  {
    "slug": "/networking/tcp-and-udp",
    "category": "networking",
    "title": {
      "en": "TCP and UDP — The Transport Layer",
      "az": "TCP və UDP — Nəqliyyat Səviyyəsi"
    },
    "description": {
      "en": "How Layer 4 actually works — TCP three-way handshake, sliding window flow control, connection states, TCP flags, UDP minimalism, and when to pick which (plus QUIC).",
      "az": "4-cü səviyyə əslində necə işləyir — TCP üçtərəfli əl sıxma, sürüşən pəncərə ilə axın idarəsi, qoşulma vəziyyətləri, TCP bayraqları, UDP minimalizmi və hansını seçmək (artı QUIC)."
    },
    "keywords": [
      "tcp",
      "udp",
      "transport layer",
      "three-way handshake",
      "tcp flags",
      "sliding window",
      "quic",
      "http/3",
      "networking fundamentals",
      "networking",
      "foundation",
      "tcp-and-udp"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\tcp-and-udp.md",
      "az": "networking\\foundation\\tcp-and-udp.md"
    }
  },
  {
    "slug": "/networking/osi-model",
    "category": "networking",
    "title": {
      "en": "The OSI Model",
      "az": "OSI Modeli"
    },
    "description": {
      "en": "The seven-layer OSI reference model explained layer by layer with concrete protocol examples and the troubleshooting mindset of \"which layer is broken?\"",
      "az": "Yeddi qatlı OSI istinad modeli — qatma-qat, konkret protokol nümunələri ilə və \"hansı qat sınıb?\" diaqnostika düşüncəsi ilə izah edilir."
    },
    "keywords": [
      "osi model",
      "seven layers",
      "networking model",
      "layer 1",
      "layer 7",
      "encapsulation",
      "networking fundamentals",
      "networking",
      "foundation",
      "osi-model",
      "osi modeli",
      "yeddi qat",
      "şəbəkə modeli",
      "qat 1",
      "qat 7",
      "inkapsulyasiya",
      "şəbəkə əsasları"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\osi-model.md",
      "az": "networking\\foundation\\osi-model.md"
    }
  },
  {
    "slug": "/networking/tcp-ip-model",
    "category": "networking",
    "title": {
      "en": "The TCP/IP Model",
      "az": "TCP/IP Modeli"
    },
    "description": {
      "en": "The four-layer TCP/IP model — Network Access, Internet, Transport, Application — and how it maps to the seven OSI layers, with the full end-to-end walkthrough of an HTTPS request.",
      "az": "Dord layli TCP/IP modeli — Sebeke Erisi, Internet, Transport, Tetbiq — yeddi OSI lay ile uyusmasi ve HTTPS sorgusunun ucdan-uca tam izahi."
    },
    "keywords": [
      "tcp/ip model",
      "dod model",
      "internet protocol suite",
      "networking model",
      "encapsulation",
      "networking fundamentals",
      "networking",
      "foundation",
      "tcp-ip-model",
      "tcp/ip modeli",
      "dod modeli",
      "internet protokol destesi",
      "sebeke modeli",
      "inkapsulyasiya",
      "sebekenin esaslari"
    ],
    "status": "reference",
    "lastReviewed": "2026-04-25",
    "sourcePaths": {
      "en": "networking\\foundation\\tcp-ip-model.md",
      "az": "networking\\foundation\\tcp-ip-model.md"
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
