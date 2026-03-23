---
id: about
title: About
description: Learn who InfoSec Lessons is for, how the content is maintained, and how to contribute without adding noise.
slug: /about
---

# About This Site

InfoSec Lessons is a bilingual documentation site for cybersecurity and IT foundations. The goal is simple: explain practical topics clearly enough that someone can use them in real work, not just memorize terms.

## Who This Site Is For

- People moving from general IT into security.
- Junior helpdesk and system administrators building stronger fundamentals.
- Blue team and red team learners who need concise reference material.
- Anyone comparing certification paths before investing time and money.

## What You Can Expect

- Short lessons with direct explanations, not inflated copy.
- Practical orientation toward Windows, networking, servers, and operational security.
- English and Azerbaijani content kept as closely aligned as possible.
- A structure designed for incremental growth rather than one-off blog posts.

## Editorial Principles

- Accuracy over hype.
- Practical sequence over theory dumping.
- Clear scope: if a page is only an introduction, it should say so.
- Revisions should make pages easier to use, not just longer.

## How Content Is Maintained

- Core docs live under `docs/`.
- Azerbaijani translations mirror the English structure under `i18n/az/docusaurus-plugin-content-docs/current/`.
- Slugs are kept consistent so equivalent EN and AZ pages stay easy to map.
- Time-sensitive guides should include concrete dates and be revised when vendor changes matter.

## Contribution Flow

If you want to improve the site:

1. Open an issue or start from an existing page on GitHub.
2. Keep changes specific: fix accuracy, improve structure, add a missing practical detail, or expand a clearly incomplete topic.
3. Preserve the existing directory structure and bilingual mirroring when adding new lessons.

To run the site locally:

```bash
git clone https://github.com/farzaliyevemil/infoseclessons.git
cd infoseclessons
npm install
npm start
```

## Author

InfoSec Lessons is maintained by Emil Farzaliyev (`farzaliyevemil`).
