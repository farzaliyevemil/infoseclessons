const lessons = [
  {
    slug: '/blue-teaming/log-analysis',
    category: 'blue-teaming',
    title: { en: 'Log Analysis', az: 'Loq Analizi' },
    description: {
      en: 'Introductory notes for blue team log analysis workflows.',
      az: 'Blue team loq analizi iş axınları üçün giriş qeydləri.',
    },
    keywords: ['siem', 'logs', 'investigation', 'windows event', 'linux logs'],
  },
  {
    slug: '/certifications/aws-certifications',
    category: 'certifications',
    title: { en: 'AWS Certifications (2026 Guide)', az: 'AWS Sertifikatları (2026 Bələdçisi)' },
    description: {
      en: 'Current AWS certification levels, paths, and notable updates.',
      az: 'Cari AWS sertifikat səviyyələri, yolları və əsas yeniliklər.',
    },
    keywords: ['aws', 'cloud', 'exam', 'learning path', 'career'],
  },
  {
    slug: '/certifications/comptia-certifications',
    category: 'certifications',
    title: { en: 'CompTIA Certifications (2026 Guide)', az: 'CompTIA Sertifikatları (2026 Bələdçisi)' },
    description: {
      en: 'Major CompTIA certifications, career paths, and renewal rules.',
      az: 'Əsas CompTIA sertifikatları, karyera yolları və renewal qaydaları.',
    },
    keywords: ['comptia', 'a+', 'network+', 'security+', 'certification'],
  },
  {
    slug: '/certifications/microsoft-certifications',
    category: 'certifications',
    title: {
      en: 'Microsoft Certifications (2026 Guide)',
      az: 'Microsoft Sertifikatları (2026 Bələdçisi)',
    },
    description: {
      en: 'Active Microsoft certifications, renewal rules, and suggested paths.',
      az: 'Aktual Microsoft sertifikatları, renewal qaydaları və tövsiyə edilən yollar.',
    },
    keywords: ['microsoft', 'azure', 'm365', 'sc-900', 'az-900', 'certification'],
  },
  {
    slug: '/open-source',
    category: 'general-security',
    title: {
      en: 'Open-Source Security Solutions (Overview)',
      az: 'Açıq Mənbə Təhlükəsizlik Həlləri (Ümumi Baxış)',
    },
    description: {
      en: 'Open-source tools grouped by practical security use case.',
      az: 'Praktik təhlükəsizlik ehtiyaclarına görə qruplaşdırılmış açıq mənbə alətlər.',
    },
    keywords: ['tools', 'open source', 'security stack', 'monitoring', 'hardening'],
  },
  {
    slug: '/raid',
    category: 'general-security',
    title: { en: 'What is RAID? (Simple Explanation)', az: 'RAID nədir? (Sadə izah)' },
    description: {
      en: 'A plain-language explanation of RAID purpose and common levels.',
      az: 'RAID məqsədi və yayğın səviyyələri üçün sadə izah.',
    },
    keywords: ['storage', 'disks', 'redundancy', 'raid 1', 'raid 5'],
  },
  {
    slug: '/grc/policies',
    category: 'grc',
    title: { en: 'Security Policies', az: 'Təhlükəsizlik Siyasətləri' },
    description: {
      en: 'Introductory notes on security policy structure and governance.',
      az: 'Təhlükəsizlik siyasətlərinin strukturu və governance üçün giriş qeydləri.',
    },
    keywords: ['policy', 'governance', 'risk', 'compliance', 'grc'],
  },
  {
    slug: '/helpdesk-basics/common-helpdesk-tickets',
    category: 'helpdesk-basics',
    title: { en: 'Common Helpdesk Tickets', az: 'Yayğın Helpdesk Ticket-ləri' },
    description: {
      en: 'A practical starter guide to common helpdesk requests and triage.',
      az: 'Yayğın helpdesk sorğuları və triage üçün praktik başlanğıc bələdçi.',
    },
    keywords: ['support', 'triage', 'tickets', 'it support', 'troubleshooting'],
  },
  {
    slug: '/network-types',
    category: 'networking',
    title: { en: 'Networking Basics', az: 'Şəbəkə Əsasları' },
    description: {
      en: 'Core networking concepts, protocols, addressing, and troubleshooting.',
      az: 'Əsas şəbəkə anlayışları, protokollar, ünvanlama və diaqnostika.',
    },
    keywords: ['networking', 'vlan', 'subnetting', 'dns', 'dhcp', 'tcp/ip'],
  },
  {
    slug: '/operating-systems/linux/basic-commands',
    category: 'operating-systems',
    title: { en: 'Linux Basic Commands', az: 'Linux Əsas Komandaları' },
    description: {
      en: 'Starter reference for common Linux commands and navigation.',
      az: 'Ən çox istifadə olunan Linux komandaları və naviqasiya üçün giriş.',
    },
    keywords: ['linux', 'terminal', 'bash', 'commands', 'navigation'],
  },
  {
    slug: '/applocker',
    category: 'operating-systems',
    title: { en: 'What is AppLocker?', az: 'AppLocker Nədir?' },
    description: {
      en: 'How AppLocker works and how to start safely with audit mode.',
      az: 'AppLocker-in necə işlədiyi və audit mode ilə təhlükəsiz başlanğıc.',
    },
    keywords: ['windows', 'application control', 'allowlisting', 'audit mode'],
  },
  {
    slug: '/bitlocker',
    category: 'operating-systems',
    title: { en: 'What is BitLocker?', az: 'BitLocker Nədir?' },
    description: {
      en: 'BitLocker fundamentals, TPM plus PIN, and device encryption differences.',
      az: 'BitLocker əsasları, TPM plus PIN və device encryption fərqləri.',
    },
    keywords: ['windows', 'encryption', 'tpm', 'disk security', 'bitlocker'],
  },
  {
    slug: '/powertoys',
    category: 'operating-systems',
    title: {
      en: 'Mastering Productivity with Microsoft PowerToys',
      az: 'Microsoft PowerToys ilə Produktivliyi Artırmaq',
    },
    description: {
      en: 'Windows productivity utilities and workflow improvements.',
      az: 'Windows məhsuldarlıq alətləri və workflow yaxşılaşdırmaları.',
    },
    keywords: ['windows', 'powertoys', 'productivity', 'workflows'],
  },
  {
    slug: '/run-commands',
    category: 'operating-systems',
    title: { en: 'Run Commands in Windows', az: 'Windows-da Run Əmrləri' },
    description: {
      en: 'Practical Windows Run commands for admins and security practitioners.',
      az: 'Admin və təhlükəsizlik işləri üçün praktik Windows Run əmrləri.',
    },
    keywords: ['windows', 'run', 'mmc', 'admin tools', 'shortcuts'],
  },
  {
    slug: '/services',
    category: 'operating-systems',
    title: {
      en: 'Windows Services Hardening Guide',
      az: 'Windows Services Hardening Bələdçisi',
    },
    description: {
      en: 'A safer approach to reviewing Windows services without breaking systems.',
      az: 'Windows xidmətlərini sistemi sındırmadan review etmək üçün daha təhlükəsiz yanaşma.',
    },
    keywords: ['windows', 'services', 'hardening', 'review', 'enterprise'],
  },
  {
    slug: '/sysprep',
    category: 'operating-systems',
    title: {
      en: 'Sysprep – Windows System Preparation Tool',
      az: 'Sysprep – Windows Sistem Hazırlıq Aləti',
    },
    description: {
      en: 'What Sysprep is and how it supports deployment and imaging.',
      az: 'Sysprep-in nə olduğu və deployment ilə imaging üçün necə istifadə olunduğu.',
    },
    keywords: ['windows', 'deployment', 'imaging', 'sysprep'],
  },
  {
    slug: '/wsl',
    category: 'operating-systems',
    title: { en: 'What is WSL? (Windows Subsystem for Linux)', az: 'WSL Nədir? (Windows Subsystem for Linux)' },
    description: {
      en: 'Run Linux on Windows without a full VM or dual boot.',
      az: 'Tam VM və ya dual boot olmadan Linux-u Windows-da işə salın.',
    },
    keywords: ['windows', 'linux', 'wsl', 'developer tools', 'security lab'],
  },
  {
    slug: '/red-teaming/initial-access',
    category: 'red-teaming',
    title: { en: 'Initial Access', az: 'Initial Access' },
    description: {
      en: 'Common foothold vectors in authorized red team work.',
      az: 'İcazəli red team işində istifadə olunan yayğın foothold vektorları.',
    },
    keywords: ['red team', 'phishing', 'foothold', 'initial access', 'simulation'],
  },
  {
    slug: '/fsmo',
    category: 'servers',
    title: { en: 'FSMO Roles in Active Directory', az: 'Active Directory-də FSMO Rolları' },
    description: {
      en: 'The five FSMO roles, how to check them, and when to transfer or seize.',
      az: 'Beş FSMO rolu, necə yoxlanması və nə vaxt transfer və ya seize edilməsi.',
    },
    keywords: ['active directory', 'fsmo', 'domain controller', 'ad'],
  },
  {
    slug: '/jump-server',
    category: 'servers',
    title: { en: 'What is a Jump Server?', az: 'Jump Server Nədir?' },
    description: {
      en: 'Purpose, placement, and security value of a bastion host.',
      az: 'Bastion host-un məqsədi, yerləşimi və təhlükəsizlik dəyəri.',
    },
    keywords: ['bastion', 'jump host', 'server', 'access control'],
  },
  {
    slug: '/laps',
    category: 'servers',
    title: { en: 'Microsoft LAPS Explained', az: 'Microsoft LAPS İzahı' },
    description: {
      en: 'Password rotation, backup options, and operational practices for LAPS.',
      az: 'LAPS üçün password rotation, backup seçimləri və əməliyyat qaydaları.',
    },
    keywords: ['laps', 'local admin', 'password rotation', 'windows'],
  },
  {
    slug: '/servers/windows-server-planning',
    category: 'servers',
    title: {
      en: 'Windows Server Planning Before Installation',
      az: 'Windows Server Quraşdırmadan Əvvəl Planlaşdırma',
    },
    description: {
      en: 'Choose the right edition, roles, and deployment model before install.',
      az: 'Quraşdırmadan əvvəl düzgün edition, rol və deployment modelini seçin.',
    },
    keywords: ['windows server', 'planning', 'roles', 'edition', 'deployment'],
  },
  {
    slug: '/virtualization',
    category: 'virtualization',
    title: { en: 'Virtualization Basics', az: 'Virtualizasiya Əsasları' },
    description: {
      en: 'Hypervisors, VMs, snapshots, storage, and networking fundamentals.',
      az: 'Hypervisor, VM, snapshot, storage və şəbəkə əsasları.',
    },
    keywords: ['virtualization', 'hypervisor', 'vm', 'snapshot', 'lab'],
  },
];

export default lessons;
