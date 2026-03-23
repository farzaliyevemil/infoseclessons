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
npm run write-translations
node add-slugs.js
```

## Content Structure

- English docs: `docs/`
- Azerbaijani docs: `i18n/az/docusaurus-plugin-content-docs/current/`
- Sidebar config: `sidebars.js`
- Site config: `docusaurus.config.js`

## Contributing

If you want to contribute, see [CONTRIBUTING.md](./CONTRIBUTING.md).
