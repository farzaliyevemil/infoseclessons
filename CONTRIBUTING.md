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

4. If you want to run the validation steps separately:

```bash
npm run generate-search-index
npm run check-docs-parity
```

5. If a page is missing frontmatter `slug`, run:

```bash
node add-slugs.js
```

## Content Rules

- Prefer short, practical explanations over long generic text.
- If a guide is time-sensitive, include a concrete date.
- Keep EN and AZ paths aligned.
- Use `status` and `last_reviewed` when a page should expose maturity or review state.
- Do not edit generated folders such as `build/`, `.docusaurus/`, or `node_modules/`.

## Useful Files

- `AGENTS.md`
- `README.md`
- `docusaurus.config.js`
- `sidebars.js`
- `package.json`
- `scripts/generate-lesson-index.js`
- `scripts/check-docs-parity.js`

## Deployment

Pushes to `main` trigger the deploy workflow, and pull requests are checked by the validation workflow.
