# InfoSec Lessons

InfoSec Lessons is a bilingual Docusaurus site for cybersecurity tutorials, practical references, and IT foundations.

## Scope

The site currently covers:

- Red Team
- Blue Team
- GRC
- General Security
- Certifications
- Networking
- Operating Systems
- Servers
- Helpdesk Basics
- Virtualization

## Stack

- Docusaurus v3
- Node.js `>=20`
- npm
- Locales: `en` and `az`

## Local Development

```bash
npm install
npm start
```

Default dev URL:

```text
http://localhost:3000/infoseclessons/
```

## Common Commands

```bash
npm start
npm run build
npm run serve
npm run deploy
npm run generate-search-index
npm run check-docs-parity
npm run write-translations
node add-slugs.js
```

`npm start`, `npm run build`, and `npm run serve` automatically refresh the lesson search index and verify EN/AZ parity before they run.

## Content Structure

- English docs: `docs/`
- Azerbaijani docs: `i18n/az/docusaurus-plugin-content-docs/current/`
- Category landing pages: root-level `*-overview.md` docs
- Sidebar config: `sidebars.js`
- Site config: `docusaurus.config.js`
- Search dataset generator: `scripts/generate-lesson-index.js`
- Search dataset output: `src/generated/lessonIndex.js`
- EN/AZ parity checker: `scripts/check-docs-parity.js`

## Contributing

If you want to contribute, see [CONTRIBUTING.md](./CONTRIBUTING.md).
