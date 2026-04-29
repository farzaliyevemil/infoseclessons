---
id: pki
title: Public Key Infrastructure (PKI)
description: PKI publik açarları şəxsiyyətlərə necə bağlayır — sertifikat hakimiyyətləri, kök və aralıq CA-lar, X.509 sertifikatları, qeydiyyat və etibar modelləri, sertifikatın həyat dövrü (verilmə, yenilənmə, ləğv), CRL/OCSP, açar deposi və praktik TLS / S/MIME / kod imzalama istifadə halları.
slug: /general-security/cryptography/pki
sidebar_position: 3
status: reference
last_reviewed: 2026-04-26
keywords:
  - pki
  - public key infrastructure
  - certificate authority
  - root ca
  - intermediate ca
  - x.509
  - csr
  - crl
  - ocsp
  - certificate revocation
  - key escrow
  - hsm
  - acme
  - lets encrypt
  - tls
difficulty: advanced
---

# Public Key Infrastructure (PKI)

[Kriptoqrafiya əsasları](./cryptography-basics.md) sizə deyir ki, asimmetrik kriptoqrafiyada publik və xüsusi açar lazımdır. Lakin alıcının hansı publik açarın həqiqətən onu iddia edən şəxsə aid olduğunu necə bilməli olduğunu izah etmir. Bu bağlama olmadan, hücumçu hər TLS əl sıxışmasının, hər imzalanmış quraşdırıcının və hər şifrələnmiş emailin ortasında dura və öz publik açarını yerinə qoya bilər. **Public Key Infrastructure (PKI) bu suala cavabdır.** O, publik açarları real dünya şəxsiyyətlərinə bağlayan sertifikatları yaradan, paylayan, doğrulayan və nəticədə ləğv edən aparat, proqram təminatı, siyasətlər, proseslər və insanlar toplusudur.

PKI brauzerdəki kilid simvolunun mənalı olmasını, Windows uçqonun imzasız sürücünü rədd etməsini, `EXAMPLE\` smartkartın domen kontrollerinin qapısında şəxsiyyət sübutu olmasını və phishing saytının `bank.example.local` saytını təqlid edə bilməməsini təmin edir. PKI yaxşı qurulanda görünməzdir. Pis qurulanda isə kök açar kompromisindən sonra şirkətin istehsaldakı hər sertifikatı növbə ilə dəyişdirməklə yuxusuz həftəsonu keçirməsinin səbəbi olur.

## Bu niyə vacibdir

Toxunduğunuz demək olar ki, hər "təhlükəsiz" texnologiya bir PKI üzərində oturur:

- **TLS / HTTPS.** Hər `https://` URL serverin publik açarını təsdiqləyən CA-imzalı sertifikatdır. Brauzerlər etibar siyahısındakı kökə yetişməyən hər zənciri rədd edir.
- **S/MIME.** `EXAMPLE\` istifadəçiləri arasında şifrələnmiş və imzalanmış korporativ poçt. İmza yalnız ona görə mənalıdır ki, CA göndərənin ünvanını açara bağlamışdır.
- **Kod imzalama.** Windows Authenticode, Apple notarisation, Android APK imzalama, imzalanmış PowerShell modulları, cosign ilə imzalanmış konteyner şəkilləri — hamısı etibarlı yayımçı kökünə bağlanmış kod imzalama sertifikatıdır.
- **Smartkartlar və AD girişi.** PIV, CAC və `EXAMPLE\` smartkartları domen kontrolerinə müştəri sertifikatı təqdim edir. Kerberos PKINIT qalanını edir.
- **VPN, Wi-Fi (EAP-TLS), 802.1X.** Hər iki tərəfin sertifikat təqdim etdiyi qarşılıqlı autentifikasiya tunelləri.
- **Sənəd imzalama.** PDF imzaları, Adobe etibarlı siyahıları, eIDAS kvalifikasiyalı imzalar, blockchain saxlanc.

PKI uğursuz olduqda phishing saytları yaşıl kilidi alır, zərərli proqram yayımçı imzasını alır, oğurlanmış xüsusi açar üç illik qeydə alınmış TLS trafikini oxuyur və sertifikat zəncirindəki yazı səhvi bazar günü saat 02:00-da hər mobil müştərini sındırır. Texnologiya yetkindir; əməliyyat səhvləri hər yerdədir.

## PKI-nın həll etdiyi etibar problemi

Diane Conun ona şifrələnmiş mesaj göndərmək istəyirsə, ona **Conun publik açarı** lazımdır — və bunun həqiqətən onun olduğuna əmin olmalıdır. Əgər o, sadəcə "Con" etiketli vebsaytdan açar yükləyirsə, həmin səhifəni idarə edən hücumçu ona **öz** açarını verə və göndərdiyi hər şeyi oxuya bilər. Bu ssenarini internet miqyasında təkrarlamaq tam olaraq orta-adam (MitM) hücumunun necə işlədiyidir.

PKI bunu **üçüncü tərəf etibar modeli** ilə həll edir. Sertifikat Hakimiyyəti (CA) Conun şəxsiyyətini bir dəfə yoxlayır, sonra onun adını publik açarına bağlayan rəqəmsal sertifikat verir. CA həmin sertifikatı öz xüsusi açarı ilə imzalayır. CA-nın publik açarını etibar siyahısında saxlayan, beləliklə CA-ya artıq etibar edən hər kəs imzanı yoxlaya və belə nəticə çıxara bilər: *bu sertifikatdakı publik açar həqiqətən Conundur, çünki etibar etdiyim CA belə dedi.*

Diane heç vaxt birbaşa Cona etibar etməli deyil. O yalnız CA-ya etibar etməlidir. Bütün oyun budur.

## X.509 sertifikat strukturu

Hər müasir sertifikat RFC 5280 ilə müəyyən edilmiş **X.509 v3** strukturudur. Əsaslara qədər soyulanda, X.509 sertifikat aşağıdakıları daşıyır:

| Sahə | Nə saxlayır | Nümunə |
|---|---|---|
| **Version** | X.509 versiyası. v3 cari versiyadır. | `v3` |
| **Serial Number** | Verən CA tərəfindən təyin olunan unikal nömrə. | `0x4B:8A:11:...` |
| **Signature Algorithm** | CA-nın sertifikatı imzalamaq üçün istifadə etdiyi alqoritm. | `sha256WithRSAEncryption` |
| **Issuer** (DN) | İmzalayan CA-nın Distinguished Name-i. | `CN=EXAMPLE Issuing CA 1, O=example.local` |
| **Validity** | `notBefore` və `notAfter` tarixləri. | 2026-04-01 — 2026-06-30 |
| **Subject** (DN) | Sertifikat sahibinin Distinguished Name-i. | `CN=www.example.local, O=Example Corp, C=AZ` |
| **Subject Public Key Info** | Publik açar + alqoritm. | `RSA 2048` və ya `ECDSA P-256` |
| **Extensions** | Key usage, extended key usage, SAN, basic constraints, CRL/OCSP URL-ləri, name constraints, CT SCT və s. | `subjectAltName=DNS:www.example.local, DNS:example.local` |
| **CA Signature** | CA-nın xüsusi açarı ilə yuxarıdakıların hamısı üzərində imza. | binar blob |

**Subject** və **Issuer** öz növbəsində Distinguished Name-lərdir — vergüllə ayrılmış `CN=`, `O=`, `OU=`, `L=`, `S=`, `C=` atributları. **Common Name (CN)** tarixən FQDN saxlamışdır, lakin müasir brauzerlər host adı uyğunluğunda CN-ni nəzərə almır və yalnız **Subject Alternative Name (SAN)** uzantısını qəbul edir. SAN-sız sertifikat Chrome və Firefox-da funksional olaraq sınıqdır.

Hər gün rastlaşacağınız digər uzantılar: **Basic Constraints** (`CA:TRUE` və ya `CA:FALSE`), **Key Usage** (digital signature, key encipherment, cert sign, CRL sign), **Extended Key Usage** (TLS Web Server Auth, Client Auth, Code Signing, Email Protection, Smartcard Logon), **Authority Information Access** (CA sertifikatı və OCSP responderi üçün URL-lər) və **CRL Distribution Points** (ləğv siyahısının URL-i).

## Sertifikat Hakimiyyətləri — kök vs aralıq

CA sadəcə sertifikatları imzalayan xidmət deyil. O, şəxsiyyətlərə zəmanət verən **proqram təminatı, aparat, prosedurlar, siyasətlər və insanlar** məcmusudur. CA-nın xüsusi açarı sistemdəki ən qiymətli sirrdir; əgər o sızırsa, ondan verilmiş hər sertifikat öz mənasını itirir.

Bu riski məhdudlaşdırmaq üçün real PKI-lar pillə-pillə qurulur:

- **Kök CA.** Etibar zəncirinin başı. Özü-imzalı. Onun publik açarı etibar siyahılarında saxlanılan açardır. Ən yaxşı təcrübə: onu **oflayn** saxlamaq, Hardware Security Module (HSM) içində, ildə yalnız bir neçə saat — yeni aralıq CA-ları və ya təzə CRL-ni imzalamaq üçün — işə salmaq. Açarlar şəbəkəyə heç vaxt toxunmur.
- **Aralıq (issuing / subordinate) CA.** Gündəlik verilməni idarə edən onlayn CA-lar. Onların sertifikatları kök tərəfindən imzalanır. Aralıq CA kompromisə uğrayırsa, həmin bir aralığı ləğv edib hələ təhlükəsiz olan kökdən təkrar verirsiniz — bütün etibar ierarxiyasını məhv etmədən.
- **End-entity sertifikatları.** Yarpaqlar. Web serverlər, kod imzalama sertifikatları, S/MIME şəxsiyyətləri, smartkartlar, maşın sertifikatları.

**Oflayn kök** modeli PKI dizaynındakı ən böyük leverajlı qərardır. İki nəfərlik nəzarət altında, tamper-evident HSM-də saxlanılan, hər imzalama üçün sənədləşdirilmiş açar mərasimi olan kök, ciddi CA-nın bir səviyyəli düz PKI-ı məhv edəcək hadisələrdən sağ çıxa bilməsinin səbəbidir.

## Registration Authority (RA)

**Registration Authority** PKI-nin qəbul masasıdır. O, sertifikat sorğularını qəbul edir, müraciətçinin şəxsiyyətini yazılı **Certification Practices Statement (CPS)** üzrə yoxlayır və yalnız bundan sonra CA-dan sertifikatı yaratmasını xahiş edir. Konseptual olaraq RA CA-dan ayrıdır: RA *sizin kim olduğunuzu* qərarlaşdırır, CA isə *budur möhürlənmiş açar bağlanmanız* deyir.

Kiçik PKI-larda RA funksiyası CA proqram təminatına qatlanır. Böyüklərində RA ayrı sistemdir, çox vaxt Class 3 sertifikat təsdiq etməzdən əvvəl pasportları, məşğulluq qeydlərini və HR sistemi yazılarını yoxlayan insanlar tərəfindən idarə olunur. RA-nın proseduru nə qədər təmiz olarsa, CA-dan çıxan sertifikatların etibarı bir o qədər yüksək olar.

Çoxlu CA-lar pilləli şəxsiyyət tələbləri ilə "siniflər" sertifikat dərc edir:

- **Class 1.** Yalnız email idarəsi. Pulsuz. Şəxsi S/MIME üçün istifadə olunur.
- **Class 2.** Hökumət vəsiqəsi + işəgötürən təsdiqi. Təşkilati S/MIME, əsas kod imzalama üçün istifadə olunur.
- **Class 3.** Şəxsən və ya video zəng vasitəsilə şəxsiyyət sübutu. Yüksək dəyərli kod imzalama, EV TLS, kvalifikasiyalı imzalar üçün istifadə olunur.

## Etibar modelləri

Müxtəlif təşkilatlar CA-ları müxtəlif formalarda birləşdirir.

- **Hierarxik (ağac).** Ən geniş yayılmış model. Bir kök, altında aralıqlar, yarpaqlarda end-entity-lər. Etibar kökdən aşağıya axır. İdarə etmək asan, məsuliyyət aydın, tək şirkət üçün mükəmməl uyğunluq.
- **Mesh / etibar şəbəkəsi (PGP).** Mərkəzi hakimiyyət yoxdur. Hər istifadəçi başqa istifadəçilərin açarlarını imzalayır və etibar imzalar qrafından hesablanır. Tarixən PGP və email şifrələmə qrupları tərəfindən istifadə olunmuşdur. Mərkəzi xətaya qarşı dayanıqlıdır lakin hər istifadəçinin etibar mühakimələri etməsini tələb edir — "bank.example.com ilə danışmaq istəyirəm" üçün miqyaslanmır.
- **Cross-certification.** İki müstəqil hierarxik CA bir-birinin köklərini imzalayır ki, bir hierarxiyadakı istifadəçilər digərindən gələn sertifikatları doğrulaya bilsin. Hökumət agentlikləri arasında, birləşən şirkətlər arasında, təchizatçı və müştəri təşkilatları arasında istifadə olunur.
- **Bridge CA.** Bir çox iştirakçı CA-ya cross-certificate verən neytral CA. Hər iştirakçı PKI yalnız körpüyə etibar etməli olur; körpü onları transitiv əlaqələndirir. ABŞ Federal Bridge CA klassik nümunədir.
- **Hibrid.** Real təşkilatlar adətən daxilən hierarxik PKI-dir, xaricdə isə cross-certificate və ya körpü üzvlüyü ilə.

Etibar modelləri abstrakt arxitektura astronavtikası deyil. Onlar "`EXAMPLE\` PKI-mız təchizatçının PKI-sını cross-imzalamalıdır ki, onların mühəndisləri bizim ekstranetə autentifikasiya edə bilsin?" kimi praktik suallarda görünür.

## Sertifikatın həyat dövrü

Hər sertifikat eyni mərhələlərdən keçir, istər 90 gün yaşasın (Let's Encrypt) istərsə də 20 il (oflayn kök):

1. **Açar yaradılması.** Subyekt (və ya CA onun adından) açar cütü yaradır. Xüsusi açar heç vaxt sahibini tərk etmir — ideal olaraq HSM içində doğulur.
2. **CSR (Certificate Signing Request).** Publik açar və tələb olunan Subject DN-ni saxlayan, sahiblik sübutu üçün uyğun xüsusi açarla imzalanmış PKCS#10 blobu.
3. **Şəxsiyyət yoxlanışı (RA).** RA müraciətçini CPS-ə uyğun yoxlayır — DV, OV, EV yoxlamaları lazım gəldikcə.
4. **Verilmə.** CA X.509 sertifikatını qurur, uzantıları doldurur, xüsusi açarı ilə imzalayır və sertifikatı müraciətçiyə qaytarır.
5. **Paylama.** Sertifikat dərc olunur — web serverə, LDAP qovluğuna, Active Directory `userCertificate` atributuna, smartkart çipinə, kod imzalama build agentinə.
6. **İstifadə.** Müştərilər sertifikatı götürür, zənciri doğrulayır, isteğe bağlı olaraq ləğvi yoxlayır və publik açardan istifadə edir.
7. **Yenilənmə.** `notAfter` çatmazdan əvvəl, subyekt (adətən) yeni açar cütü yaradır, yeni CSR təqdim edir, yeni sertifikat alır. ACME bunu tam avtomatlaşdırır.
8. **Ləğv.** Xüsusi açar kompromis şübhəsindədirsə, işçi gedirsə, və ya sertifikat artıq lazım deyilsə, CA serial nömrəsini ləğv edilmiş kimi qeyd edir və bu faktı CRL və ya OCSP vasitəsilə dərc edir.
9. **Arxivləşdirmə.** Köhnə sertifikatlar və (bəzən) eskrov edilmiş açarlar inkar etməmə və köhnə məlumatların deşifrəsi üçün saxlanılır.

Ən geniş yayılmış uğursuzluq 7-ci addımdadır — kimsə yenilənməni unudur, sertifikatın müddəti bitir və 03:00-da hər brauzer `NET::ERR_CERT_DATE_INVALID` atır. Avtomatlaşdırılmış yenilənmə (ACME, AD CS auto-enrollment) 2026-da seçim deyil.

## CRL vs OCSP — və OCSP stapling

Müştəri hələ də etibarlı görünən sertifikatın ləğv edilib-edilmədiyini necə bilir?

**Certificate Revocation List (CRL).** CA ləğv səbəbləri və tarixləri ilə birlikdə ləğv edilmiş serial nömrələrinin imzalanmış siyahısını dərc edir. Müştərilər siyahını yükləyir (URL sertifikatın `CRL Distribution Points` uzantısındadır) və serialı yoxlayır. CRL-lər sadə və oflayn keş edilə biləndir lakin sərhədsiz böyüyür — məşğul CA-nın CRL-i onlarla meqabayta çata bilər və hər müştəri onu yükləyir.

**Online Certificate Status Protocol (OCSP).** RFC 6960-da müəyyən edilmişdir. Müştəri sertifikatın serialını OCSP responder URL-inə (sertifikatın `Authority Information Access` uzantısında) göndərir və imzalanmış cavab alır: **good**, **revoked** və ya **unknown**. Hər yoxlama üçün daha kiçikdir, lakin responderə əlçatanlıq asılılığı yaradır və brauzer naxışlarını CA-ya sızdırır.

**OCSP stapling.** Server vaxtaşırı öz OCSP cavabını CA-dan götürür və TLS əl sıxışmasına "ştapelləyir". Müştəri CA ilə heç vaxt danışmadan təzəlik siqnalını alır. Stapling adi OCSP-nin həm performans dəyərini, həm də gizlilik sızıntısını həll edir. **İstifadə edin.** Əksər brauzerlər həmçinin `must-staple` dəstəkləyir — müştəriyə ştaplənmiş cavabı olmayan əl sıxışmasını rədd etməyi deyən sertifikat uzantısı, sakitcə dayanan responderlərə qarşı müdafiə edir.

Bir çox müasir brauzer (xüsusilə Chrome) əslində bağlantı üzrə ləğv yoxlamalarından imtina etmişdir, çünki onlar çox yavaş və çox etibarsız idi, və əvəzində aqreqasiya edilmiş ləğv məlumatını brauzerə `CRLSets` / `CRLite` vasitəsilə itələyir. Dərs odur ki, ləğv PKI-nin idarə edilməsi üçün ən **çətin** hissəsidir və əksər şirkətlərin ən pis etdiyi hissədir.

## Açar deposi və açar bərpası

**Açar deposi (key escrow)** üçüncü tərəfin də sizin xüsusi açarınızın surətini saxladığı sistemdir. İki ssenari onu idarə edir:

- **Hökumət / qanuni giriş.** Tənzimləyici məhkəmə qərarı ilə trafiki deşifrə etmək imkanını tələb edir. 1990-cı illərdə Clipper çipi əsas cəhd idi; heç kim ona inanmadı və ölmüşdür. Müasir qanunvericilik (UK Investigatory Powers Act və s.) sualı canlı saxlayır.
- **Korporativ davamlılıq.** `e.mammadov@example.local` ayrıldıqda və HR-ın gələn qutusundakı şifrələnmiş poçtu oxumalı olduğunda, və ya geliştiricinin S/MIME açarı silinmiş laptopda itdikdə, şirkətin açarı bərpa etməsi lazımdır — istifadəçidən deyil, idarə olunan arxivdən.

**Açar bərpası** əməliyyat müqabilidir: deposdakı açarı buraxmaq üçün çox vaxt çoxlu təsdiqləyici (M-of-N) tələb edən prosedur. AD CS bunu birbaşa **Key Recovery Agent (KRA)** rolu vasitəsilə dəstəkləyir.

Mübahisə realdır. Eskrov "yalnız istifadəçinin açarı var" zəmanətini zəiflədir. Kompromis şifrələmə açarlarını eskrov etməkdir (məlumat bərpa oluna bilsin) lakin imzalama açarlarını **heç vaxt** eskrov etməməkdir (inkar etməmə qorunsun). Üçüncü tərəfə kopyalanan imzalama açarı artıq inkar etməmə əsası deyil — bax [AAA və inkar etməmə](../aaa-non-repudiation.md).

## Sertifikat növləri — DV, OV, EV və dostları

Publik CA-lardan görəcəyiniz marketinq qrupları:

- **Domain Validation (DV).** Ən ucuz və ən sürətli. CA müraciətçinin DNS adına nəzarət etdiyini sübut edir, adətən `http://example.local/.well-known/acme-challenge/...` ünvanında çağırış faylı təqdim etməklə və ya DNS TXT yazısı yazmaqla. Let's Encrypt-in verdiyi demək olar ki, hər şey DV-dir.
- **Organisation Validation (OV).** CA həmçinin müraciətçinin iddia edilən ünvanda real hüquqi qurum olduğunu yoxlayır. Daha yavaş, pul tələb edir, sertifikatda şirkət adını istəyən müəssisələr tərəfindən istifadə olunur.
- **Extended Validation (EV).** Daha sərt — hüquqi sənədlər, şəxsən doğrulama, geri zənglər. Köhnə brauzerlərdə "yaşıl ünvan paneli" UX-ni idarə etmək üçün istifadə olunurdu. Müasir brauzerlər artıq yaşıl paneli göstərmir; EV indi əsasən uyğunluq qutucuğudur və phishing-i təxminən heç dayandırmamışdır.

DV/OV/EV-yə kəsən digər ölçülər:

- **Tək adlı sertifikatlar.** Tam olaraq bir FQDN ilə uyğunlaşır.
- **Wildcard sertifikatlar.** `*.example.local` istənilən tək etiketə uyğunlaşır — `www.example.local`, `mail.example.local` — lakin `a.b.example.local` ilə deyil. Rahat; bir xüsusi açar kompromisi hər hostu partladır.
- **SAN (multi-domain) sertifikatlar.** SAN uzantısında açıq FQDN-ləri sadalayır. Wildcard-lardan daha yaxşı partlayış-radius nəzarəti.
- **Müştəri sertifikatları.** Qarşılıqlı TLS zamanı serverə təqdim edilən son istifadəçi və ya cihaz sertifikatları. VPN, EAP-TLS Wi-Fi, mTLS API üçün istifadə olunur.
- **Kod imzalama sertifikatları.** EKU `Code Signing`. Authenticode, Java Jarsigner və s. tərəfindən istifadə olunur.
- **S/MIME sertifikatları.** EKU `Email Protection`. SAN-da email ünvanına bağlıdır.
- **Smartkart girişi sertifikatları.** EKU `Smart Card Logon`. Windows PKINIT tərəfindən istifadə olunur.
- **Maşın / kompüter sertifikatları.** FQDN ilə tanınan hosta verilir. IPsec, RDP server autentifikasiyası, AD CS auto-enrollment üçün istifadə olunur.

## HSM-lər və CA xüsusi açarın qorunması

CA-nın xüsusi açarı krallıq açarıdır. **Hardware Security Module (HSM)** tamper-müqavimətli cihazdır — PCIe kartı, USB token, Thales Luna və ya AWS CloudHSM kimi şəbəkə cihazı — açarı tamper sərhədi içində yaradır, bütün imzalama əməliyyatlarını sərhəd içində icra edir və **açarı heç vaxt açıq mətndə eksport etmir**. Kimsə HSM-i oğurlayırsa, kərpic alır.

Müasir PKI standartları əslində brauzerlər tərəfindən etibar edilən sertifikatları imzalayan istənilən CA üçün HSM tələb edir. CAB Forum baseline tələbləri verən CA-lar üçün FIPS 140-2 Level 3 (və ya Common Criteria EAL 4+) məcburi edir. Daxili korporativ PKI-lar həmişə buna ehtiyac duymur, lakin oflayn kök hər halda HSM-də **olmalıdır**.

## Publik CA vs özəl CA

- **Publik CA** — Let's Encrypt, DigiCert, Sectigo, GlobalSign. Onların kökləri brauzerlərdə və əməliyyat sistemlərində öncədən quraşdırılıbdır. Publik müştərilərin etibar etməli olduğu hər sertifikat üçün onlardan istifadə edin: marketinq saytınız, müştəri-üzlü API-niz, geniş internetdən əlçatan istənilən şey. **ACME** (RFC 8555) bunu tam avtomatlaşdıran protokoldur; **certbot**, **acme.sh** və **Caddy** hamısı onu danışır.
- **Özəl CA** — öz AD CS-niz, HashiCorp Vault PKI, smallstep CA, OpenSSL ilə idarə olunan oflayn PKI. Köklər yalnız öz uçqonlarınıza paylanır (group policy, MDM və ya konfiqurasiya idarəetmə aləti vasitəsilə). Daxili host adları (`intranet.example.local`), `EXAMPLE\` maşın sertifikatları, smartkart girişi, daxili xidmət şəbəkəsi mTLS — publik CA-nın verə bilməyəcəyi və ya verməməli olduğu hər yer üçün istifadə edin.

Əksər müəssisələr üçün doğru cavab **hər ikisidir**: daxili `EXAMPLE\` infrastrukturu üçün özəl CA və publikin çatdığı hər şey üçün Let's Encrypt və ya publik CA. Bəzi komandalar indi özəl ACME serverləri (smallstep, Vault) işlədir ki, daxili sertifikatlar publik olanlarla eyni standartda avtomatlaşdırılsın — bənzər avtomatlaşdırma naxışları üçün [secrets və PAM aləti](../open-source-tools/secrets-and-pam.md)-nə baxın.

## Pinning və Certificate Transparency

**Pinning** host üçün xüsusi sertifikatı və ya publik açarı yadda saxlamaq və "etibarlı" sertifikat təqdim olunsa belə başqasını rədd etmək təcrübəsidir. `api.example.local` ilə danışan mobil applikasiyalar tez-tez gözlənilən yarpağı və ya aralığı pinləyir ki, sahtekar CA-lara qarşı müdafiə olunsun. Pinning güclü və təhlükəlidir — sertifikat qanuni şəkildə dövr etdikdə hər pinlənmiş müştəri yeniləmə göndərənə qədər sınır. Brauzer HPKP (HTTP Public Key Pinning) 2018-də ləğv edildi, çünki çox sayt pis pinlərlə özünü kərpicləşdirdi.

**Certificate Transparency (CT).** RFC 6962. Hər publik etibarlı sertifikat Google, Cloudflare və başqaları tərəfindən idarə olunan append-only publik loglarda qeydə alınmalıdır. Brauzerlər CT loglarında olmayan sertifikatlara etibar etməyi rədd edir. Fayda: domen sahibləri logları izləyə bilər (`crt.sh`) və hansısa başqa CA `example.local` üçün sertifikatı səhv verdiyi halda dərhal görə bilər. Bir neçə əsas CA fırıldaq insidenti — Symantec, WoSign — bu üsulla aşkar edildi. CT son onillikdə PKI-nin ən böyük qələbələrindən biridir.

## PKI arxitektura diaqramı

```mermaid
flowchart TB
    subgraph Offline["Oflayn etibar lövbəri (HSM, hava-boşluqlu)"]
        Root[Root CA<br/>özü-imzalı<br/>20 il etibar müddəti]
    end

    subgraph Online["Onlayn verən səviyyə"]
        IntServer[Aralıq CA<br/>Serverlər və cihazlar]
        IntUser[Aralıq CA<br/>İstifadəçilər və email]
        HSM1[(HSM)]
        HSM2[(HSM)]
    end

    RA[Registration Authority<br/>şəxsiyyət sübutu]

    subgraph EE["End-entity sertifikatları"]
        Web[Web server<br/>www.example.local]
        Code[Kod imzalama<br/>build agentləri]
        SMIME[S/MIME<br/>e.mammadov@example.local]
        Client[Müştəri sertifikatı<br/>smartkart]
    end

    CRL[CRL Distribution Point]
    OCSP[OCSP Responder]

    Root -- imzalayır --> IntServer
    Root -- imzalayır --> IntUser
    HSM1 -. açarı qoruyur .- IntServer
    HSM2 -. açarı qoruyur .- IntUser

    RA -- təsdiqlənmiş CSR --> IntServer
    RA -- təsdiqlənmiş CSR --> IntUser

    IntServer -- verir --> Web
    IntServer -- verir --> Code
    IntUser -- verir --> SMIME
    IntUser -- verir --> Client

    IntServer -- ləğvləri dərc edir --> CRL
    IntUser -- ləğvləri dərc edir --> CRL
    IntServer -- responder --> OCSP
    IntUser -- responder --> OCSP
```

Oflayn kök yalnız iki aralığı və dövri CRL-i imzalayır. Gündəlik verilmə aralıq səviyyədə baş verir, burada HSM-lər açarları qoruyur və RA hər CSR-ni süzgəcdən keçirir. Ləğv aralıqlardan son müştərilərin götürdüyü CRL və OCSP responderləri vasitəsilə axır.

## Praktiki məşqlər

### 1. OpenSSL ilə 2 səviyyəli PKI qurun

Laboratoriyada oflayn kök və onlayn aralıq quraşdırın. Tam prosedur təfsilatlıdır lakin hər PKI mühəndisi onu bir dəfə etməlidir.

```bash
# Root CA
mkdir -p /lab/pki/root/{certs,crl,newcerts,private}
cd /lab/pki/root
openssl genrsa -aes256 -out private/root.key.pem 4096
openssl req -config openssl.cnf -key private/root.key.pem \
    -new -x509 -days 7300 -sha256 -extensions v3_ca \
    -subj "/C=AZ/O=example.local/CN=EXAMPLE Root CA" \
    -out certs/root.cert.pem

# Aralıq CA
mkdir -p /lab/pki/intermediate/{certs,crl,csr,newcerts,private}
cd /lab/pki/intermediate
openssl genrsa -aes256 -out private/intermediate.key.pem 4096
openssl req -config openssl.cnf -new -sha256 \
    -key private/intermediate.key.pem \
    -subj "/C=AZ/O=example.local/CN=EXAMPLE Issuing CA 1" \
    -out csr/intermediate.csr.pem

# Aralığı kök ilə imzalayın
cd /lab/pki/root
openssl ca -config openssl.cnf -extensions v3_intermediate_ca \
    -days 3650 -notext -md sha256 \
    -in /lab/pki/intermediate/csr/intermediate.csr.pem \
    -out /lab/pki/intermediate/certs/intermediate.cert.pem
```

Bundan sonra kök açarı oflayn saxlayın (seyfdə USB token) və yalnız aralıqdan istifadə edin.

### 2. Server sertifikatı verin və doğrulayın

```bash
# Server açarı + CSR yaradın
openssl genrsa -out www.example.local.key 2048
openssl req -new -key www.example.local.key \
    -subj "/C=AZ/O=example.local/CN=www.example.local" \
    -addext "subjectAltName=DNS:www.example.local,DNS:example.local" \
    -out www.example.local.csr

# Aralıq ilə imzalayın
openssl ca -config /lab/pki/intermediate/openssl.cnf \
    -extensions server_cert -days 90 -notext -md sha256 \
    -in www.example.local.csr -out www.example.local.crt

# Zənciri doğrulayın
openssl verify -CAfile <(cat /lab/pki/intermediate/certs/intermediate.cert.pem \
                           /lab/pki/root/certs/root.cert.pem) \
    www.example.local.crt
# www.example.local.crt: OK
```

### 3. Sertifikatı ləğv edin və CRL dərc edin

```bash
cd /lab/pki/intermediate
openssl ca -config openssl.cnf -revoke certs/www.example.local.crt
openssl ca -config openssl.cnf -gencrl -out crl/intermediate.crl.pem
openssl crl -in crl/intermediate.crl.pem -text -noout
```

`intermediate.crl.pem`-i sertifikatın `crlDistributionPoints` uzantısında qeyd edilmiş URL-də dərc edin. Müştərilər ləğvi növbəti CRL təzələnməsində götürəcək.

### 4. Certbot və Let's Encrypt ilə real publik sertifikat verin

Ona göstərən publik DNS adı olan serverdə:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.example.com -d example.com \
    -m admin@example.com --agree-tos --no-eff-email
```

Certbot ACME danışır, domen nəzarətini sübut edir, sertifikatı götürür, nginx-ə quraşdırır və 90 günlük ömrün 60-cı günündə yenilənmə üçün systemd taymeri əlavə edir.

### 5. Nginx-də OCSP stapling-i konfiqurasiya edin

```nginx
server {
    listen 443 ssl http2;
    server_name www.example.local;

    ssl_certificate     /etc/ssl/www.example.local-fullchain.pem;
    ssl_certificate_key /etc/ssl/www.example.local.key;

    ssl_stapling        on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/ssl/intermediate-and-root.pem;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;
}
```

`openssl s_client -connect www.example.local:443 -status` ilə yoxlayın — `OCSP Response Status: successful` axtarın.

## İşlənmiş nümunə — example.local daxili PKI qurur

Example Corp (`example.local`, Windows + Linux qarışıq mağaza, ~2,500 işçi, tənzimlənən maliyyə) daxili PKI-yə ehtiyac duyur. Dizayn budur.

**Oflayn kök.** Tək Windows Server 2022 Standalone Root CA, heç vaxt domenə qoşulmamış, seyfdə söndürülmüş saxlanılır. CA-nın xüsusi açarı iki nəfərlik M-of-N autentifikasiyası ilə Thales Luna Network HSM-də yaşayır. Etibar müddəti 20 il, SHA-384, RSA-4096. İldə iki dəfə istifadə olunur: təzə CRL imzalamaq və (tələb olunduqda) yeni aralıqları imzalamaq üçün.

**İki aralıq CA.** Hər ikisi `EXAMPLE\` domeninə qoşulmuş və **Active Directory Certificate Services (AD CS)** ilə inteqrasiya olunmuş Enterprise CA-lardır:

- `EXAMPLE-CA-SRV` — maşın sertifikatları, web server sertifikatları, RDP host sertifikatları, IPsec sertifikatları verir. Hər domenə-qoşulmuş Windows hostu üçün group policy vasitəsilə auto-enrollment. SHA-256, RSA-2048 və ya ECDSA P-256 yarpaqlar, 1 illik etibar müddəti, aylıq CRL təzələnməsi.
- `EXAMPLE-CA-USR` — istifadəçi sertifikatları, S/MIME, smartkart-girişi sertifikatları, mühəndis komandası üçün kod imzalama sertifikatları verir. Yüksək etibarlı şablonlar üçün menecer təsdiqi ilə AD CS şablonları vasitəsilə verilir.

Hər iki aralıq CA xüsusi açarı şəbəkəyə qoşulmuş HSM-lərdə yaşayır.

**Daxili host adları üçün ACME.** Daxili işləyən `smallstep` CA `https://acme.example.local`-da ACME təqdim edir. O, `EXAMPLE-CA-SRV` tərəfindən cross-imzalanmışdır. Daxili Linux xidmətləri (`nginx`, `traefik`, daxili Kubernetes ingress-lər) öz 90 günlük sertifikatlarını avtomatik yeniləyir — heç bir insan iştirakı, heç bir müddət bitmə insidenti. `EXAMPLE-CA-SRV` kökü konfiqurasiya idarəetməsi vasitəsilə Linux etibar siyahılarına itələnir.

**Smartkart pilotu.** YubiKey 5 seriyalı tokenlər mühəndis komandasına verilir. Hər biri EKU `Smart Card Logon` və `Client Authentication` ilə `EXAMPLE-CA-USR`-tərəfindən verilmiş sertifikat saxlayır. Mühəndislər tokeni daxil edib PIN daxil etməklə Windows iş stansiyalarına və imtiyazlı-giriş iş stansiyaları gateway-inə daxil olur — heç bir domen parolu yazılmır. Break-glass yolları üçün [secrets və PAM](../open-source-tools/secrets-and-pam.md) ilə birləşdirilmişdir.

**Ləğv.** Hər iki aralıq CRL-ləri `http://crl.example.local/EXAMPLE-CA-SRV.crl` və `http://crl.example.local/EXAMPLE-CA-USR.crl`-ə dərc edir. OCSP responder `http://ocsp.example.local`-da işləyir. Web serverlər standart olaraq OCSP cavablarını ştapelləyir. HR ayrılma iş axını gedənin istifadəçi sertifikatlarının dərhal ləğvini tetikleyen bir qutucuğu işarələyir.

**İdarəetmə.** Yazılı Certification Practices Statement (CPS) [security governance](../../grc/security-governance.md) korpusunun bir hissəsidir. Hər sertifikat şablonu biznes sahibinə bağlıdır və hər il nəzərdən keçirilir. Sertifikat sayları, müddət bitmə vaxtları və ləğv dərəcələri digər [security controls](../../grc/security-controls.md) ilə birlikdə təhlükəsizlik dashboardunda hesabat verilir.

## Problem həlli və tələlər

- **Müddəti bitmiş kök sertifikat.** 15 il əvvəl verilmiş köklər indi `notAfter`-ə çatır. 2020-ci ildə məşhur AddTrust müddət bitməsi dünya boyu müştəriləri sındırdı. Asılı olduğunuz hər kök üçün 5 illik dövri-əvəzetmə dövrü planlaşdırın.
- **CRL yükləmək üçün çox böyükdür.** Məşğul CA-nın CRL-i bir neçə meqabaytdan çox ola bilər. Yavaş şəbəkələrdəki mobil müştərilər yükləməyi rədd edəcək və ya vaxtı keçəcək. OCSP plus stapling istifadə edin və ya CRL-ni issuer ilə bölün.
- **OCSP responderi tək uğursuzluq nöqtəsidir.** Responder işləmirsə və `must-staple` təyin edilibsə, sayt əslində oflayndır. Responderi yüksək əlçatan edin, onun işləmə müddətini izləyin və sertifikatlar onda müddəti bitməzdən əvvəl xəbərdarlıq edin.
- **Mobil müştəridə sınıq etibar zənciri.** Köhnə Android cihazları yeni CA-ları daxil etməyən dondurulmuş kök siyahısı ilə gəlir. Həmişə **tam zəncir**-i (yarpaq + aralıqlar) təqdim edin və istehsala itələmədən əvvəl iOS, Android, Windows, macOS və Linux-da test edin.
- **Vaxt sürüşməsi doğrulanmanı sındırır.** Saatı sertifikatın `notBefore` / `notAfter` pəncərəsindən çox səhv olan müştəri tamamilə etibarlı sertifikatları rədd edəcək. Həmişə NTP işlədin. Real-vaxt saatı olmadan göndərilən embedded cihazlar daimi "TLS sadəcə işləməyi dayandırdı" biletlərinin mənbəyidir.
- **Zəif imza alqoritmləri.** SHA-1 sınıqdır. MD5 2008-də sındırılmışdır. SHA-1 ilə imzalanmış istənilən sertifikat müasir brauzerlərdə uğursuz olur. Zəncirinizi audit edin — yarpaq SHA-256 ola bilər, aralıq isə hələ də SHA-1-də ola bilər. Bütün zəncir müasir olmalıdır.
- **HSM xaricində xüsusi açarlar.** Admin laptopundakı CA xüsusi açarın "müvəqqəti" surəti müvəqqəti deyil. Açarları HSM *içində* yaradın, eksport edilməz olaraq qeyd edin və onlara toxunan istənilən kod yolunu audit edin.
- **Ləğv intizamı yoxdur.** Heç kimin ləğv etmədiyi gedən işçilər üçün verilmiş sertifikatlar. Ayrılma inteqrasiyasını birinci gündən yazın. `EXAMPLE\` istifadəçi-sertifikat sahiblərini aktiv işçi siyahısına qarşı rüblük audit edin.
- **Aralıqlarda name constraints yoxdur.** `nameConstraints` uzantısı olmayan subordinate CA **istənilən** domen üçün sertifikat verə bilər. Daxili CA-ları `*.example.local` ilə məhdudlaşdırın ki, təsadüfən (və ya bədniyyətlə) `google.com` üçün sertifikat hazırlamasınlar.
- **Certificate Transparency-ni unutmaq.** CT-yə qeyd olunmayan sertifikatlar verən yeni publik CA Chrome tərəfindən sakitcə etibarsızlaşdırılacaq. Avtomatik qeyd edən CA-lar istifadə edin və öz domenləriniz üçün `crt.sh` izlənməsini quraşdırın.
- **EV sertifikatları phishing-i dayandırmır.** Müasir brauzerlər artıq EV nişanlarını qabarıq şəkildə göstərmir. İstifadəçilər baxmır. Büdcəni EV-yə deyil, email müdafiəsinə və DNS gigiyenasına xərcləyin.
- **Sertifikat pinləməsi dövriyyədə applikasiyaları kərpicləşdirir.** Yarpaq sertifikatı pinləyən mobil applikasiya Let's Encrypt dövr etdikdə 90-cı gündə ölür. Yarpağı deyil, **aralığı** və ya **publik açarı** pinləyin və ehtiyat pin göndərin ki, dövr edə biləsiniz.
- **Wildcard sertifikat bir dəfəlik düşüncəsi.** Hər web serverdə `*.example.local` wildcard xüsusi açarı hər subdomenə təsir edən tək açar kompromisidir. Faktiki host adlarına həsr edilmiş SAN sertifikatlarına üstünlük verin.
- **Auto-enrollment dövrələri.** Səhv konfiqurasiya edilmiş AD CS şablonları maşın başına minlərlə dublikat sertifikat verə bilər. CA hadisə loglarında sıçrayışlara baxın.
- **Daxili sertifikatları atıla bilən kimi qəbul etmək.** "Sadəcə daxilidir" mTLS-in cümə günü 22:00-da sınmasının yoludur. Daxili sertifikatlar publik olanlarla eyni izləmə və dövriyyə ciddiyyətinə layiqdir.
- **CA kompromisi üçün insident planı yoxdur.** Verən CA pozulursa, nə edirsiniz? Aralığı ləğv edin, oflayn təzə imzalayın, hər yarpağı yenidən verin, zənciri yenidən paylayın. Onu məşq edin. Onu kəşf etdiyiniz gecə öyrənmək üçün gecə deyil.
- **Konfiqurasiya kabuslarına səbəb olan qarışıq sertifikat formatları.** PEM vs DER vs PFX vs P7B sertifikatlara toxunan mühəndislərin yarısını çaşdırır. Daxilən PEM-də standartlaşdırın və çevrilmələri sənədləşdirin.
- **`must-staple`-dən imtina etmək.** Onsuz, OCSP responderinə çata bilməyən müştəri ya sertifikatı sakitcə qəbul edir (uğursuz-açıq, pis), ya da uğursuz olur (uğursuz-bağlı, pis UX). Stapling plus `must-staple` yeganə düzgün kombinasiyadır — lakin sonra responderi sağlam saxlamalısınız.
- **PKI-ı bir dəfəlik layihə kimi qəbul etmək.** PKI proqramdır. Köklər dövr edir, aralıqlar dövr edir, alqoritmlər ləğv olur, post-kvant gəlir. Onu kadrlaşdırın.

## Əsas qənaətlər

- PKI publik açarları CA-imzalı X.509 sertifikatları vasitəsilə şəxsiyyətlərə bağlayır; bu bağlama olmadan, asimmetrik kriptoqrafiya yad insanlar üçün heç nə həll etmir.
- İki səviyyəli (oflayn kök + onlayn aralıq) ierarxiya əsasdır. HSM-lər hər CA xüsusi açarı qoruyur.
- Qeydiyyat verilmədən ayrıdır: RA sizin kim olduğunuza qərar verir, CA sertifikatı istehsal edir.
- Sertifikatların həyat dövrü var — yaradılma, CSR, verilmə, paylama, istifadə, yenilənmə, ləğv, arxivləşdirmə. Yenilənməni avtomatlaşdırın və ya kəsintilər gözləyin.
- Ləğv ən çətin hissədir. CRL-lər sadədir lakin böyükdür; OCSP yüngüldür lakin SPOF-dur; stapling müasir cavabdır.
- Etibar modelləri tək hierarxiyadan bridge-CA federasiyalarına qədər miqyaslanır; uyğun olan ən sadəsini seçin.
- İnternetə üzlü sertifikatlar üçün publik CA-lar (Let's Encrypt, ACME); daxili `EXAMPLE\` infrastrukturu üçün özəl CA-lar (AD CS, smallstep, Vault PKI). Əksər şirkətlər hər ikisini işlədir.
- Pinning və Certificate Transparency güclü alətlərdir — və güclü ayaq silahları. Yarpaqları deyil, açarları pinləyin; öz domenləriniz üçün CT loglarını izləyin.
- Açar deposu şifrələmə açarları üçün məqbuldur (korporativ davamlılıq), imzalama açarları üçün qəbuledilməzdir (inkar etməməni qoruyur).
- PKI proqramdır, layihə deyil. Köklər dövr edir, alqoritmlər ləğv olur, post-kvant yaxınlaşır. Onu əbədi kadrlaşdırın.


## İstinad şəkilləri

Bu illüstrasiyalar orijinal təlim slaydından götürülüb və yuxarıdakı dərs məzmununu tamamlayır.

<div className="lesson-image-grid">
  <figure><img src="/img/lessons/pki/slide01_image1.jpeg" alt="Slayd 1" loading="lazy" /><figcaption>Slayd 1</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide04_image2.png" alt="Slayd 4" loading="lazy" /><figcaption>Slayd 4</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide06_image3.png" alt="Slayd 6" loading="lazy" /><figcaption>Slayd 6</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide15_image4.png" alt="Slayd 15" loading="lazy" /><figcaption>Slayd 15</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide22_image5.png" alt="Slayd 22" loading="lazy" /><figcaption>Slayd 22</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide33_image6.png" alt="Slayd 33" loading="lazy" /><figcaption>Slayd 33</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide48_image7.png" alt="Slayd 48" loading="lazy" /><figcaption>Slayd 48</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide50_image8.png" alt="Slayd 50" loading="lazy" /><figcaption>Slayd 50</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide52_image9.png" alt="Slayd 52" loading="lazy" /><figcaption>Slayd 52</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide54_image10.png" alt="Slayd 54" loading="lazy" /><figcaption>Slayd 54</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide55_image11.png" alt="Slayd 55" loading="lazy" /><figcaption>Slayd 55</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide57_image12.png" alt="Slayd 57" loading="lazy" /><figcaption>Slayd 57</figcaption></figure>
</div>
## İstinadlar

- RFC 5280 — *Internet X.509 Public Key Infrastructure Certificate and CRL Profile.* [https://www.rfc-editor.org/rfc/rfc5280](https://www.rfc-editor.org/rfc/rfc5280)
- RFC 6960 — *X.509 Internet PKI Online Certificate Status Protocol — OCSP.* [https://www.rfc-editor.org/rfc/rfc6960](https://www.rfc-editor.org/rfc/rfc6960)
- RFC 6962 — *Certificate Transparency.* [https://www.rfc-editor.org/rfc/rfc6962](https://www.rfc-editor.org/rfc/rfc6962)
- RFC 8555 — *Automatic Certificate Management Environment (ACME).* [https://www.rfc-editor.org/rfc/rfc8555](https://www.rfc-editor.org/rfc/rfc8555)
- CA/Browser Forum — *Baseline Requirements for the Issuance and Management of Publicly-Trusted Certificates.* [https://cabforum.org/baseline-requirements-documents/](https://cabforum.org/baseline-requirements-documents/)
- NIST SP 800-57 Part 1 Rev. 5 — *Recommendation for Key Management.* [https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)
- NIST SP 800-32 — *Introduction to Public Key Technology and the Federal PKI Infrastructure.* [https://csrc.nist.gov/publications/detail/sp/800-32/archive/2001-02-26](https://csrc.nist.gov/publications/detail/sp/800-32/archive/2001-02-26)
- Mozilla — *CA Certificate Policy.* [https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/](https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/)
- Həmçinin baxın: [kriptoqrafiya əsasları](./cryptography-basics.md), [security controls](../../grc/security-controls.md), [security governance](../../grc/security-governance.md), [AAA və inkar etməmə](../aaa-non-repudiation.md), [secure protocols](../../networking/secure-design/secure-protocols.md).
