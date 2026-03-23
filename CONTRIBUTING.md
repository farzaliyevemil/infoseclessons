# Contributing

## Before You Edit

- Use Node.js `20+`
- Keep English docs in `docs/`
- Keep Azerbaijani docs in `i18n/az/docusaurus-plugin-content-docs/current/`
- Preserve lowercase, hyphenated file and directory names

## Typical Flow

1. Update or add the English page.
2. Add or update the matching Azerbaijani page if relevant.
3. Run:

```bash
npm run build
```

4. If a page is missing frontmatter `slug`, run:

```bash
node add-slugs.js
```

## Content Rules

- Prefer short, practical explanations over long generic text.
- If a guide is time-sensitive, include a concrete date.
- Keep EN and AZ paths aligned.
- Do not edit generated folders such as `build/`, `.docusaurus/`, or `node_modules/`.

## Useful Files

- `AGENTS.md`
- `README.md`
- `docusaurus.config.js`
- `sidebars.js`
- `package.json`

## Deployment

Pushes to `main` trigger the GitHub Actions deploy workflow.
