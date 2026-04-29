---
id: pki
title: Public Key Infrastructure (PKI)
description: How PKI binds public keys to identities — certificate authorities, root and intermediate CAs, X.509 certificates, registration and trust models, certificate lifecycle (issue, renew, revoke), CRL/OCSP, key escrow, and the practical TLS / S/MIME / code-signing use cases.
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

[Cryptography basics](./cryptography-basics.md) tells you that asymmetric cryptography needs a public key and a private key. It does not tell you how the recipient is supposed to know that a given public key actually belongs to the entity claiming it. Without that binding, an attacker can stand in the middle of every TLS handshake, every signed installer and every encrypted email and substitute their own public key. **Public Key Infrastructure (PKI) is the answer to that question.** It is the set of hardware, software, policies, processes and people that mint, distribute, validate and eventually revoke certificates that bind public keys to real-world identities.

PKI is what makes the padlock in the browser mean something, what lets a Windows endpoint refuse an unsigned driver, what makes an `EXAMPLE\` smartcard a proof of identity at the door of a domain controller, and what stops a phishing site from impersonating `bank.example.local`. When PKI is set up well it is invisible. When it is set up badly it is the reason a company spends a sleepless weekend rotating every certificate in production after a root key compromise.

## Why this matters

Almost every "secure" technology you touch sits on top of a PKI:

- **TLS / HTTPS.** Every `https://` URL is a CA-signed certificate vouching for a server's public key. Browsers reject any chain that does not end at a root in their trust store.
- **S/MIME.** Encrypted and signed corporate email between `EXAMPLE\` users. The signature only means something because a CA bound the sender's address to a key.
- **Code signing.** Windows Authenticode, Apple notarisation, Android APK signing, signed PowerShell modules, container images signed with cosign — all of it is a code-signing certificate chained to a trusted publisher root.
- **Smartcards and AD logon.** PIV, CAC and `EXAMPLE\` smartcards present a client certificate to the domain controller. Kerberos PKINIT does the rest.
- **VPN, Wi-Fi (EAP-TLS), 802.1X.** Mutual-auth tunnels where both sides present a certificate.
- **Document signing.** PDF signatures, Adobe trusted lists, eIDAS qualified signatures, blockchain custody.

When PKI fails, phishing sites get the green padlock, malware gets a publisher signature, a stolen private key reads three years of recorded TLS traffic, and a typo in a certificate chain breaks every mobile client at 02:00 on a Sunday. The technology is mature; the operational mistakes are everywhere.

## The trust problem PKI solves

If Diane wants to send John an encrypted message, she needs **John's public key** — and she needs to be sure it is really his. If she just downloads a key from a website labelled "John," an attacker who controls that page can hand her **their own** key and read everything she sends. Repeating that scenario at internet scale is exactly how a person-in-the-middle attack works.

PKI fixes this with a **third-party trust model**. A Certificate Authority (CA) verifies John's identity once, then issues a digital certificate that binds his name to his public key. The CA digitally signs that certificate with the CA's own private key. Anyone who already trusts the CA — by having the CA's public key in their trust store — can verify the signature and conclude: *the public key in this certificate really does belong to John, because the CA I trust said so.*

Diane never has to trust John directly. She only has to trust the CA. That is the entire game.

## X.509 certificate structure

Every modern certificate is an **X.509 v3** structure defined by RFC 5280. Stripped to essentials, an X.509 certificate carries:

| Field | What it holds | Example |
|---|---|---|
| **Version** | X.509 version. v3 is current. | `v3` |
| **Serial Number** | Unique number assigned by the issuing CA. | `0x4B:8A:11:...` |
| **Signature Algorithm** | Algorithm the CA used to sign the cert. | `sha256WithRSAEncryption` |
| **Issuer** (DN) | Distinguished Name of the CA that signed it. | `CN=EXAMPLE Issuing CA 1, O=example.local` |
| **Validity** | `notBefore` and `notAfter` dates. | 2026-04-01 to 2026-06-30 |
| **Subject** (DN) | Distinguished Name of the certificate holder. | `CN=www.example.local, O=Example Corp, C=AZ` |
| **Subject Public Key Info** | The public key + algorithm. | `RSA 2048` or `ECDSA P-256` |
| **Extensions** | Key usage, extended key usage, SAN, basic constraints, CRL/OCSP URLs, name constraints, CT SCT, etc. | `subjectAltName=DNS:www.example.local, DNS:example.local` |
| **CA Signature** | Signature over all of the above using the CA's private key. | binary blob |

The **Subject** and **Issuer** are themselves Distinguished Names — comma-separated `CN=`, `O=`, `OU=`, `L=`, `S=`, `C=` attributes. The **Common Name (CN)** historically held the FQDN, but modern browsers ignore CN for hostname matching and only honour the **Subject Alternative Name (SAN)** extension. A certificate without a SAN is functionally broken in Chrome and Firefox.

Other extensions you will meet daily: **Basic Constraints** (`CA:TRUE` or `CA:FALSE`), **Key Usage** (digital signature, key encipherment, cert sign, CRL sign), **Extended Key Usage** (TLS Web Server Auth, Client Auth, Code Signing, Email Protection, Smartcard Logon), **Authority Information Access** (URLs for the CA cert and OCSP responder), and **CRL Distribution Points** (URL of the revocation list).

## Certificate Authorities — root vs intermediate

A CA is more than a service that signs certificates. It is the **software, hardware, procedures, policies and people** that vouch for identities. The CA's private key is the most precious key in the system; if it leaks, every certificate ever issued from it loses its meaning.

To contain that risk, real PKIs are tiered:

- **Root CA.** The top of the trust chain. Self-signed. Its public key is what trust stores actually contain. Best practice: keep it **offline**, in a Hardware Security Module (HSM), powered on only for the few hours per year needed to sign new intermediate CAs or to publish a fresh CRL. The keys never touch the network.
- **Intermediate (issuing / subordinate) CA.** Online CAs that handle day-to-day issuance. Their certificates are signed by the root. If an intermediate is compromised, you revoke that one intermediate and reissue from the still-safe root — without nuking the entire trust hierarchy.
- **End-entity certificates.** The leaves. Web servers, code-signing certs, S/MIME identities, smartcards, machine certificates.

The **offline root** pattern is the single highest-leverage decision in PKI design. A root that lives in a safe behind two-person control, in a tamper-evident HSM, with a documented key ceremony for every signing, is the reason a serious CA can survive incidents that would destroy a flat one-tier PKI.

## Registration Authority (RA)

A **Registration Authority** is the front desk of the PKI. It accepts certificate requests, verifies the requester's identity according to a written **Certification Practices Statement (CPS)**, and only then asks the CA to mint the certificate. Conceptually the RA is separate from the CA: the RA decides *who you are*, the CA decides *here is your sealed key binding*.

In small PKIs the RA function is folded into the CA software. In big ones the RA is a distinct system, often staffed by humans who check passports, employment records and HR-system entries before approving a Class 3 certificate. The cleaner the RA's procedure, the higher the assurance of the certificates that come out of the CA.

Many CAs publish "classes" of certificates with stepped identity requirements:

- **Class 1.** Email control only. Free. Used for personal S/MIME.
- **Class 2.** Government ID + employer verification. Used for organisational S/MIME, basic code signing.
- **Class 3.** In-person or video-call identity proofing. Used for high-value code signing, EV TLS, qualified signatures.

## Trust models

Different organisations stitch CAs together in different shapes.

- **Hierarchical (tree).** The most common model. A single root, intermediates beneath it, end-entities at the leaves. Trust flows down from the root. Easy to administer, clear accountability, perfect fit for a single company.
- **Mesh / web-of-trust (PGP).** No central authority. Every user signs other users' keys, and trust is calculated from the graph of signatures. Used historically by PGP and email-encryption tribes. Resists central failure but requires every user to make trust judgements — does not scale to "I want to talk to bank.example.com."
- **Cross-certification.** Two independent hierarchical CAs sign each other's roots so users in one hierarchy can validate certificates from the other. Used between government agencies, between merging companies, between supplier and customer organisations.
- **Bridge CA.** A neutral CA that issues cross-certificates to many participating CAs. Each participating PKI only has to trust the bridge; the bridge transitively links them. The US Federal Bridge CA is the canonical example.
- **Hybrid.** Real organisations are usually a hierarchical PKI internally with cross-certificates or bridge memberships externally.

Trust models are not abstract architecture astronautics. They show up in practical questions like "should our `EXAMPLE\` PKI cross-sign the supplier's PKI so their engineers can authenticate to our extranet?"

## Certificate lifecycle

Every certificate moves through the same stages, whether it lives 90 days (Let's Encrypt) or 20 years (an offline root):

1. **Key generation.** The subject (or the CA on their behalf) generates a key pair. The private key never leaves its owner — ideally born inside an HSM.
2. **CSR (Certificate Signing Request).** A PKCS#10 blob containing the public key and the requested Subject DN, signed by the matching private key to prove possession.
3. **Identity verification (RA).** The RA validates the requester against the CPS — DV, OV, EV checks as appropriate.
4. **Issuance.** The CA constructs the X.509 cert, populates extensions, signs with its private key, and returns the cert to the requester.
5. **Distribution.** The cert is published — to a web server, an LDAP directory, an Active Directory `userCertificate` attribute, a smartcard chip, a code-signing build agent.
6. **Use.** Clients fetch the cert, validate the chain, optionally check revocation, and use the public key.
7. **Renewal.** Before `notAfter` is reached, the subject generates (usually) a new key pair, submits a new CSR, gets a new cert. ACME automates this entirely.
8. **Revocation.** If the private key is suspected compromised, the employee leaves, or the cert is no longer needed, the CA marks the serial number as revoked and publishes that fact via CRL or OCSP.
9. **Archival.** Old certs and (sometimes) escrowed keys are kept for non-repudiation and for decrypting old data.

The most common failure is step 7 — somebody forgets a renewal, the cert expires, and at 03:00 every browser throws `NET::ERR_CERT_DATE_INVALID`. Automated renewal (ACME, AD CS auto-enrollment) is not optional in 2026.

## CRL vs OCSP — and OCSP stapling

How does a client know whether a still-valid-looking certificate has been revoked?

**Certificate Revocation List (CRL).** The CA publishes a signed list of revoked serial numbers, with revocation reasons and dates. Clients download the list (URL is in the cert's `CRL Distribution Points` extension) and check the serial. CRLs are simple and offline-cacheable but grow unbounded — a busy CA's CRL can reach tens of megabytes, and every client downloads it.

**Online Certificate Status Protocol (OCSP).** Defined in RFC 6960. The client sends the cert's serial to an OCSP responder URL (in the cert's `Authority Information Access` extension) and gets back a signed response: **good**, **revoked** or **unknown**. Smaller per-check, but creates an availability dependency on the responder and leaks browsing patterns to the CA.

**OCSP stapling.** The server periodically fetches its own OCSP response from the CA and "staples" it to the TLS handshake. The client gets the freshness signal without ever talking to the CA. Stapling fixes both the performance cost and the privacy leak of plain OCSP. **Use it.** Most browsers also support `must-staple` — a cert extension that tells the client to refuse a handshake without a stapled response, defending against responders that quietly go dark.

Many modern browsers (Chrome especially) have effectively given up on per-connection revocation checks because they were too slow and too unreliable, and instead push aggregated revocation information to the browser via `CRLSets` / `CRLite`. The lesson is that revocation is the **hardest** part of PKI to operate, and the part most companies do worst.

## Key escrow and key recovery

**Key escrow** is a system where a third party also holds a copy of your private key. Two scenarios drive it:

- **Government / lawful access.** A regulator demands the ability to decrypt traffic with a court order. The Clipper chip in the 1990s was the headline attempt; nobody trusted it and it died. Modern legislation (UK Investigatory Powers Act, etc.) keeps the question alive.
- **Corporate continuity.** When `e.mammadov@example.local` leaves and HR needs to read encrypted email in their inbox, or when a developer's S/MIME key is lost on a wiped laptop, the company needs to recover the key — not from the user, but from a controlled archive.

**Key recovery** is the operational counterpart: the procedure, often requiring multiple approvers (M-of-N), to release an escrowed key. AD CS supports this directly via the **Key Recovery Agent (KRA)** role.

The controversy is real. Escrow weakens the "only the user has the key" guarantee. The compromise is to escrow **encryption** keys (so data can be recovered) but **never** to escrow **signing** keys (so non-repudiation is preserved). A signing key copied to a third party is no longer a basis for non-repudiation — see [AAA and non-repudiation](../aaa-non-repudiation.md).

## Certificate types — DV, OV, EV and friends

The marketing buckets you will see from public CAs:

- **Domain Validation (DV).** Cheapest and fastest. The CA proves that the requester controls the DNS name, typically by serving a challenge file at `http://example.local/.well-known/acme-challenge/...` or by writing a DNS TXT record. Almost everything Let's Encrypt issues is DV.
- **Organisation Validation (OV).** The CA also verifies the requester is a real legal entity at the claimed address. Slower, costs money, used by enterprises that want their company name in the cert.
- **Extended Validation (EV).** Stricter still — legal documents, in-person verification, callbacks. Used to drive the "green address bar" UX in older browsers. Modern browsers no longer show the green bar; EV is now mostly a compliance tickbox and has stopped phishing approximately not at all.

Other dimensions cut across DV/OV/EV:

- **Single-name certs.** Match exactly one FQDN.
- **Wildcard certs.** `*.example.local` matches any single label — `www.example.local`, `mail.example.local` — but not `a.b.example.local`. Convenient; one private-key compromise blows up every host.
- **SAN (multi-domain) certs.** List explicit FQDNs in the SAN extension. Better blast-radius control than wildcards.
- **Client certificates.** End user or device certs presented to a server during mutual TLS. Used for VPN, EAP-TLS Wi-Fi, mTLS APIs.
- **Code-signing certs.** EKU `Code Signing`. Used by Authenticode, Java Jarsigner, etc.
- **S/MIME certs.** EKU `Email Protection`. Tied to an email address in the SAN.
- **Smartcard logon certs.** EKU `Smart Card Logon`. Used by Windows PKINIT.
- **Machine / computer certs.** Issued to a host, identified by FQDN. Used for IPsec, RDP server auth, AD CS auto-enrollment.

## HSMs and CA private-key protection

The CA's private key is the keys-to-the-kingdom secret. A **Hardware Security Module (HSM)** is a tamper-resistant device — a PCIe card, a USB token, a network appliance like Thales Luna or AWS CloudHSM — that generates the key inside its tamper boundary, performs all signing operations inside the boundary, and **never exports the key in cleartext**. If somebody steals the HSM they get a brick.

Modern PKI standards effectively require HSMs for any CA that signs certificates trusted by browsers. The CAB Forum baseline requirements mandate FIPS 140-2 Level 3 (or Common Criteria EAL 4+) for issuing CAs. Internal corporate PKIs do not always need that, but the offline root **should** live in an HSM regardless.

## Public CA vs private CA

- **Public CA** — Let's Encrypt, DigiCert, Sectigo, GlobalSign. Their roots are pre-installed in browsers and operating systems. Use them for any certificate that public clients need to trust: your marketing site, your customer-facing API, anything reachable from the wider internet. **ACME** (RFC 8555) is the protocol that makes this fully automated; **certbot**, **acme.sh** and **Caddy** all speak it.
- **Private CA** — your own AD CS, HashiCorp Vault PKI, smallstep CA, an OpenSSL-driven offline PKI. Roots are distributed only to your own endpoints (via group policy, MDM, or a config-management tool). Use them for internal hostnames (`intranet.example.local`), `EXAMPLE\` machine certificates, smartcard logon, internal service mesh mTLS — anywhere a public CA cannot or should not issue.

The right answer for most enterprises is **both**: a private CA for internal `EXAMPLE\` infrastructure, and Let's Encrypt or a public CA for anything the public reaches. Some teams now run private ACME servers (smallstep, Vault) so internal certs are automated to the same standard as public ones — see [secrets and PAM tooling](../open-source-tools/secrets-and-pam.md) for adjacent automation patterns.

## Pinning and Certificate Transparency

**Pinning** is the practice of remembering a specific certificate or public key for a host and refusing anything else, even if a "valid" cert is presented. Mobile apps that talk to `api.example.local` often pin the expected leaf or intermediate to defend against rogue CAs. Pinning is powerful and dangerous — when the cert legitimately rotates, every pinned client breaks until they ship an update. Browser HPKP (HTTP Public Key Pinning) was deprecated in 2018 because too many sites bricked themselves with bad pins.

**Certificate Transparency (CT).** RFC 6962. Every publicly-trusted certificate must be logged in append-only public logs run by Google, Cloudflare and others. Browsers refuse to trust certs that are not in CT logs. The benefit: domain owners can monitor logs (`crt.sh`) and instantly notice if some other CA mis-issued a cert for `example.local`. Several major CA fraud incidents — Symantec, WoSign — were detected this way. CT is one of PKI's biggest wins of the last decade.

## PKI architecture diagram

```mermaid
flowchart TB
    subgraph Offline["Offline trust anchor (HSM, air-gapped)"]
        Root[Root CA<br/>self-signed<br/>20 year validity]
    end

    subgraph Online["Online issuing tier"]
        IntServer[Intermediate CA<br/>Servers and devices]
        IntUser[Intermediate CA<br/>Users and email]
        HSM1[(HSM)]
        HSM2[(HSM)]
    end

    RA[Registration Authority<br/>identity proofing]

    subgraph EE["End-entity certificates"]
        Web[Web server<br/>www.example.local]
        Code[Code signing<br/>build agents]
        SMIME[S/MIME<br/>e.mammadov@example.local]
        Client[Client cert<br/>smartcard]
    end

    CRL[CRL Distribution Point]
    OCSP[OCSP Responder]

    Root -- signs --> IntServer
    Root -- signs --> IntUser
    HSM1 -. protects key .- IntServer
    HSM2 -. protects key .- IntUser

    RA -- approved CSR --> IntServer
    RA -- approved CSR --> IntUser

    IntServer -- issues --> Web
    IntServer -- issues --> Code
    IntUser -- issues --> SMIME
    IntUser -- issues --> Client

    IntServer -- publishes revocations --> CRL
    IntUser -- publishes revocations --> CRL
    IntServer -- responder --> OCSP
    IntUser -- responder --> OCSP
```

The offline root signs only the two intermediates and a periodic CRL. Day-to-day issuance happens at the intermediate tier, where HSMs guard the keys and the RA gates every CSR. Revocation flows out of the intermediates via CRL and OCSP responders that the end-clients fetch from.

## Hands-on / practice

### 1. Build a 2-tier PKI with OpenSSL

Set up an offline root and an online intermediate in a lab. The full procedure is verbose but every PKI engineer should do it once.

```bash
# Root CA
mkdir -p /lab/pki/root/{certs,crl,newcerts,private}
cd /lab/pki/root
openssl genrsa -aes256 -out private/root.key.pem 4096
openssl req -config openssl.cnf -key private/root.key.pem \
    -new -x509 -days 7300 -sha256 -extensions v3_ca \
    -subj "/C=AZ/O=example.local/CN=EXAMPLE Root CA" \
    -out certs/root.cert.pem

# Intermediate CA
mkdir -p /lab/pki/intermediate/{certs,crl,csr,newcerts,private}
cd /lab/pki/intermediate
openssl genrsa -aes256 -out private/intermediate.key.pem 4096
openssl req -config openssl.cnf -new -sha256 \
    -key private/intermediate.key.pem \
    -subj "/C=AZ/O=example.local/CN=EXAMPLE Issuing CA 1" \
    -out csr/intermediate.csr.pem

# Sign the intermediate with the root
cd /lab/pki/root
openssl ca -config openssl.cnf -extensions v3_intermediate_ca \
    -days 3650 -notext -md sha256 \
    -in /lab/pki/intermediate/csr/intermediate.csr.pem \
    -out /lab/pki/intermediate/certs/intermediate.cert.pem
```

After this, store the root key offline (USB token in a safe) and use only the intermediate going forward.

### 2. Issue and verify a server certificate

```bash
# Generate the server key + CSR
openssl genrsa -out www.example.local.key 2048
openssl req -new -key www.example.local.key \
    -subj "/C=AZ/O=example.local/CN=www.example.local" \
    -addext "subjectAltName=DNS:www.example.local,DNS:example.local" \
    -out www.example.local.csr

# Sign with the intermediate
openssl ca -config /lab/pki/intermediate/openssl.cnf \
    -extensions server_cert -days 90 -notext -md sha256 \
    -in www.example.local.csr -out www.example.local.crt

# Verify the chain
openssl verify -CAfile <(cat /lab/pki/intermediate/certs/intermediate.cert.pem \
                           /lab/pki/root/certs/root.cert.pem) \
    www.example.local.crt
# www.example.local.crt: OK
```

### 3. Revoke a certificate and publish a CRL

```bash
cd /lab/pki/intermediate
openssl ca -config openssl.cnf -revoke certs/www.example.local.crt
openssl ca -config openssl.cnf -gencrl -out crl/intermediate.crl.pem
openssl crl -in crl/intermediate.crl.pem -text -noout
```

Publish `intermediate.crl.pem` at the URL listed in the cert's `crlDistributionPoints` extension. Clients will pick up the revocation on their next CRL refresh.

### 4. Issue a real public certificate with certbot and Let's Encrypt

On a server with a public DNS name pointing at it:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.example.com -d example.com \
    -m admin@example.com --agree-tos --no-eff-email
```

Certbot speaks ACME, proves domain control, fetches the cert, installs it in nginx and adds a systemd timer for renewal at day 60 of the 90-day life.

### 5. Configure OCSP stapling on nginx

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

Verify with `openssl s_client -connect www.example.local:443 -status` — look for `OCSP Response Status: successful`.

## Worked example — example.local builds an internal PKI

Example Corp (`example.local`, Windows + Linux mixed shop, ~2,500 staff, regulated finance) needs an internal PKI. Here is the design.

**Offline root.** A single Windows Server 2022 Standalone Root CA, never joined to the domain, kept powered off in a safe. The CA's private key lives in a Thales Luna Network HSM with two-person M-of-N authentication. Validity 20 years, SHA-384, RSA-4096. Used twice a year: to sign a fresh CRL and (on demand) to sign new intermediates.

**Two intermediate CAs.** Both Enterprise CAs joined to `EXAMPLE\` and integrated with **Active Directory Certificate Services (AD CS)**:

- `EXAMPLE-CA-SRV` — issues machine certificates, web server certs, RDP host certs, IPsec certs. Auto-enrollment via group policy for every domain-joined Windows host. SHA-256, RSA-2048 or ECDSA P-256 leaves, 1-year validity, monthly CRL refresh.
- `EXAMPLE-CA-USR` — issues user certs, S/MIME, smartcard-logon certs, code-signing certs for engineering team. Issued via AD CS templates with manager approval for high-trust templates.

Both intermediate CA private keys live in network-attached HSMs.

**ACME for internal hostnames.** A `smallstep` CA running internally exposes ACME at `https://acme.example.local`. It is cross-signed by `EXAMPLE-CA-SRV`. Internal Linux services (`nginx`, `traefik`, internal Kubernetes ingresses) renew their 90-day certs automatically — no human in the loop, no expiry incidents. The `EXAMPLE-CA-SRV` root is pushed to Linux trust stores via configuration management.

**Smartcard pilot.** YubiKey 5 series tokens are issued to the engineering team. Each holds an `EXAMPLE-CA-USR`-issued certificate with EKU `Smart Card Logon` and `Client Authentication`. Engineers log into Windows workstations and into the privileged-access workstations gateway by inserting the token and entering a PIN — no domain password typed. Combined with [secrets and PAM](../open-source-tools/secrets-and-pam.md) for break-glass paths.

**Revocation.** Both intermediates publish CRLs to `http://crl.example.local/EXAMPLE-CA-SRV.crl` and `http://crl.example.local/EXAMPLE-CA-USR.crl`. An OCSP responder runs at `http://ocsp.example.local`. Web servers staple OCSP responses by default. The HR offboarding workflow ticks a box that triggers immediate revocation of the leaver's user certs.

**Governance.** A written Certification Practices Statement (CPS) is part of the [security governance](../../grc/security-governance.md) corpus. Every certificate template is tied to a business owner and reviewed annually. Certificate counts, expiry lead times and revocation rates are reported on the security dashboard alongside other [security controls](../../grc/security-controls.md).

## Troubleshooting & pitfalls

- **Expired root certificate.** Roots issued 15 years ago are reaching `notAfter` now. The famous AddTrust expiry of 2020 broke clients worldwide. Plan a 5-year rolling-replacement cycle for every root you depend on.
- **CRL too big to fetch.** A busy CA's CRL can exceed several megabytes. Mobile clients on slow networks will refuse to download or time out. Use OCSP plus stapling, or partition the CRL by issuer.
- **OCSP responder is a single point of failure.** If the responder is down and `must-staple` is set, the site is effectively offline. Make the responder highly available, monitor its uptime, and alert before certificates expire on it.
- **Broken trust chain on mobile clients.** Older Android devices ship a frozen root store that does not include newer CAs. Always serve the **full chain** (leaf + intermediates) and test on iOS, Android, Windows, macOS and Linux before pushing to production.
- **Time skew breaks validation.** A client whose clock is wrong by more than the cert's `notBefore` / `notAfter` window will reject perfectly valid certificates. Always run NTP. Embedded devices that ship without a real-time clock are perpetual sources of "TLS just stopped working" tickets.
- **Weak signature algorithms.** SHA-1 is broken. MD5 was broken in 2008. Any certificate signed with SHA-1 fails in modern browsers. Audit your chain — the leaf can be SHA-256 while an intermediate is still SHA-1. The whole chain must be modern.
- **Private keys outside the HSM.** A "temporary" copy of the CA private key on an admin's laptop is not temporary. Generate keys *inside* the HSM, mark them non-exportable, and audit any code path that touches them.
- **No revocation discipline.** Certificates issued for departed employees that nobody revoked. Write the offboarding integration on day one. Audit `EXAMPLE\` user-cert holders against the active-employee list quarterly.
- **No name constraints on intermediates.** A subordinate CA without a `nameConstraints` extension can issue certificates for **any** domain. Constrain internal CAs to `*.example.local` so they cannot accidentally (or maliciously) mint a cert for `google.com`.
- **Forgetting Certificate Transparency.** A new public CA issuing certs that are not logged to CT will be silently distrusted by Chrome. Use CAs that log automatically and set up `crt.sh` monitoring for your own domains.
- **EV certificates do not stop phishing.** Modern browsers no longer prominently display EV badges. Users do not look. Spend the budget on email defences and DNS hygiene, not EV.
- **Certificate pinning bricks apps on rotation.** A mobile app pinning a leaf cert dies on day 90 when Let's Encrypt rotates. Pin the **intermediate** or the **public key**, not the leaf, and ship a backup pin so you can rotate.
- **Wildcard cert one-and-done thinking.** A `*.example.local` wildcard private key on every web server is a single key compromise that affects every subdomain. Prefer SAN certs scoped to actual hostnames.
- **Auto-enrollment loops.** Misconfigured AD CS templates can issue thousands of duplicate certs per machine. Watch CA event logs for spikes.
- **Treating internal certs as throwaway.** "It is just internal" is how mTLS breaks at 22:00 on a Friday. Internal certs deserve the same monitoring and rotation rigour as public ones.
- **No incident plan for CA compromise.** If the issuing CA is breached, what do you do? Revoke the intermediate, sign a fresh one offline, reissue every leaf, redistribute the chain. Practice it. The night you discover it is not the night to learn.
- **Mixed cert formats causing config nightmares.** PEM vs DER vs PFX vs P7B confuse half the engineers who touch certs. Standardise on PEM internally and document the conversions.
- **Skipping `must-staple`.** Without it, a client that cannot reach the OCSP responder either silently accepts the cert (fail-open, bad) or fails (fail-closed, bad UX). Stapling plus `must-staple` is the only honest combination — but then you must keep the responder healthy.
- **Treating PKI as a one-off project.** PKI is a programme. Roots roll, intermediates roll, algorithms deprecate, post-quantum is coming. Staff it.

## Key takeaways

- PKI binds public keys to identities through CA-signed X.509 certificates; without that binding, asymmetric cryptography solves nothing for strangers.
- The two-tier (offline root + online intermediate) hierarchy is the baseline. HSMs protect every CA private key.
- Registration is separate from issuance: the RA decides who you are, the CA produces the cert.
- Certificates have a lifecycle — generation, CSR, issuance, distribution, use, renewal, revocation, archival. Automate renewal or expect outages.
- Revocation is the hardest part. CRLs are simple but big; OCSP is light but a SPOF; stapling is the modern answer.
- Trust models scale from a single hierarchy to bridge-CA federations; pick the simplest one that fits.
- Public CAs (Let's Encrypt, ACME) for internet-facing certs; private CAs (AD CS, smallstep, Vault PKI) for internal `EXAMPLE\` infrastructure. Most companies run both.
- Pinning and Certificate Transparency are powerful tools — and powerful footguns. Pin keys, not leaves; monitor CT logs for your domains.
- Key escrow is acceptable for encryption keys (corporate continuity), unacceptable for signing keys (preserves non-repudiation).
- PKI is a programme, not a project. Roots roll, algorithms deprecate, post-quantum is approaching. Staff it forever.


## Reference images

These illustrations are from the original training deck and complement the lesson content above.

<div className="lesson-image-grid">
  <figure><img src="/img/lessons/pki/slide01_image1.jpeg" alt="Slide 1" loading="lazy" /><figcaption>Slide 1</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide04_image2.png" alt="Slide 4" loading="lazy" /><figcaption>Slide 4</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide06_image3.png" alt="Slide 6" loading="lazy" /><figcaption>Slide 6</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide15_image4.png" alt="Slide 15" loading="lazy" /><figcaption>Slide 15</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide22_image5.png" alt="Slide 22" loading="lazy" /><figcaption>Slide 22</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide33_image6.png" alt="Slide 33" loading="lazy" /><figcaption>Slide 33</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide48_image7.png" alt="Slide 48" loading="lazy" /><figcaption>Slide 48</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide50_image8.png" alt="Slide 50" loading="lazy" /><figcaption>Slide 50</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide52_image9.png" alt="Slide 52" loading="lazy" /><figcaption>Slide 52</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide54_image10.png" alt="Slide 54" loading="lazy" /><figcaption>Slide 54</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide55_image11.png" alt="Slide 55" loading="lazy" /><figcaption>Slide 55</figcaption></figure>
  <figure><img src="/img/lessons/pki/slide57_image12.png" alt="Slide 57" loading="lazy" /><figcaption>Slide 57</figcaption></figure>
</div>
## References

- RFC 5280 — *Internet X.509 Public Key Infrastructure Certificate and CRL Profile.* [https://www.rfc-editor.org/rfc/rfc5280](https://www.rfc-editor.org/rfc/rfc5280)
- RFC 6960 — *X.509 Internet PKI Online Certificate Status Protocol — OCSP.* [https://www.rfc-editor.org/rfc/rfc6960](https://www.rfc-editor.org/rfc/rfc6960)
- RFC 6962 — *Certificate Transparency.* [https://www.rfc-editor.org/rfc/rfc6962](https://www.rfc-editor.org/rfc/rfc6962)
- RFC 8555 — *Automatic Certificate Management Environment (ACME).* [https://www.rfc-editor.org/rfc/rfc8555](https://www.rfc-editor.org/rfc/rfc8555)
- CA/Browser Forum — *Baseline Requirements for the Issuance and Management of Publicly-Trusted Certificates.* [https://cabforum.org/baseline-requirements-documents/](https://cabforum.org/baseline-requirements-documents/)
- NIST SP 800-57 Part 1 Rev. 5 — *Recommendation for Key Management.* [https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)
- NIST SP 800-32 — *Introduction to Public Key Technology and the Federal PKI Infrastructure.* [https://csrc.nist.gov/publications/detail/sp/800-32/archive/2001-02-26](https://csrc.nist.gov/publications/detail/sp/800-32/archive/2001-02-26)
- Mozilla — *CA Certificate Policy.* [https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/](https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/)
- See also: [cryptography basics](./cryptography-basics.md), [security controls](../../grc/security-controls.md), [security governance](../../grc/security-governance.md), [AAA and non-repudiation](../aaa-non-repudiation.md), [secure protocols](../../networking/secure-design/secure-protocols.md).
