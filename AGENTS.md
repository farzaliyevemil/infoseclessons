# AGENTS.md — Canonical Guide for AI Agents

**Every AI agent (Copilot, Claude, Codex, Cursor, …) working in this repo MUST read this file first.**
It replaces repo re-discovery: trust this map, only inspect files relevant to your task.
`CLAUDE.md` and `.github/copilot-instructions.md` are pointers to this file — edit THIS file only.

## What this repo is

Bilingual (EN + AZ) infosec learning site — Docusaurus v3, ~139 lessons per locale, deployed to
GitHub Pages at https://farzaliyevemil.github.io/infoseclessons/. Docs are served at the site
root (`routeBasePath: '/'`). Content quality bar: course-grade lessons, not blog notes.

---

## 🔴 HARD INVARIANTS — breaking any of these breaks CI or the live site

1. **EN/AZ parity is mandatory.** Every `docs/**/*.md` must have a mirror at
   `i18n/az/docusaurus-plugin-content-docs/current/` with the **same relative path**, same
   heading structure, same images, same links. `scripts/check-docs-parity.js` gates CI.
   **Never commit an EN file without its AZ mirror (or vice versa).**
2. **Slugs are permanent URLs.** Every lesson has explicit `slug:` frontmatter. Moving a file to
   another folder is fine — **never change its `slug:`** unless explicitly asked. (History: 4
   separate hotfix commits exist because an agent changed slugs during moves and broke links.)
3. **Cross-links are file-relative and break on moves.** `../foo.md` stops resolving when either
   file moves. After ANY file move, grep for links to/from it. CI now has `onBrokenLinks: throw`
   — a broken link fails the build.
4. **MDX safety.** These patterns break the MDX compiler or render wrong:
   - `<https://example.com>` autolinks → use `[text](url)` or a bare URL
   - `<` directly before a digit/letter outside code fences (e.g. `(<500`) → use `&lt;500`
   - `<details>` / `<summary>` HTML → don't use them
5. **AZ is real Azerbaijani.** Proper orthography with `ə ı ö ü ç ş ğ` — never ASCII
   transliteration ("Niyə bu vacibdir", NOT "Niye bu vacibdir"). Natural translation, not calque.
   Keep international technical terms in English (SIEM, firewall, EDR, …).
6. **Generated files are never hand-edited.** `src/generated/lessonIndex.js` is rebuilt by
   `node scripts/generate-lesson-index.js` (also runs inside `npm run build`).
7. **Branding.** Fictional org is always `example.local` / `EXAMPLE\` domain. Never real
   companies as the worked-example subject. Public product/vendor names are fine neutrally.
8. **Images.** Lesson images live in `static/img/lessons/<lesson-slug>/`, referenced as
   `/img/lessons/<slug>/file.ext`. Reference the EXACT filename incl. extension (`.jpg` ≠
   `.jpeg` ≠ `.png`). Compress anything over ~2 MB before committing (past bug: 8 MB slides).
   EN and AZ reference identical image paths.
9. **New subfolders need `_category_.json` in BOTH locales** (label + position + generated-index
   description; AZ file has the translated label/description).
10. **Config freeze.** Don't touch `url`, `baseUrl`, `organizationName`, `projectName` in
    `docusaurus.config.js` without an explicit request.

## Lesson frontmatter contract

```yaml
---
id: kebab-case-id            # unique across the whole site
title: Human Title           # AZ file: translated
description: One-sentence SEO summary   # AZ: translated
slug: /category/lesson-slug  # IDENTICAL in EN and AZ (no /az prefix; Docusaurus adds it)
sidebar_position: N          # keep unique within its folder
status: reference
last_reviewed: YYYY-MM-DD
keywords: [list, of, terms]  # same list in both locales
difficulty: foundation | intermediate | advanced   # renders the colored badge
tags: [see existing lessons for tag vocabulary]     # optional, keep EN/AZ identical
---
```

## Gold-standard lesson template (used by ~all recent lessons)

`Why this matters` → `Core concepts` (H3 subsections) → Mermaid diagram → `Hands-on / practice`
(4-5 exercises) → `Worked example` on `example.local` → `Troubleshooting & pitfalls` (12+ bullets)
→ `Key takeaways` → `References`. Target 300-450 lines. Look at
`docs/general-security/cloud/cloud-computing-security.md` for a reference specimen.

## Repo map

```
docs/                          EN lessons (139 files). Category folders:
  red-teaming/  blue-teaming/  grc/  certifications/  helpdesk-basics/  virtualization/
  general-security/{cryptography,cloud,architecture,mobile-and-iot,assessment,open-source-tools}/
  networking/{foundation,secure-design}/
  operating-systems/{windows,linux}/
  servers/{windows-server,active-directory,services,storage}/
  *-overview.md at root per category + intro.md, about.md, glossary.md
i18n/az/docusaurus-plugin-content-docs/current/   AZ mirror, identical tree
static/img/lessons/<slug>/     extracted PPTX images per lesson
static/img/{networking,servers}/  hand-made SVG diagrams
src/generated/lessonIndex.js   GENERATED search dataset — do not edit
src/components/DocState/       difficulty/status badge component
src/theme/DocItem/Layout/      swizzled layout injecting the badge
src/pages/search.js            client-side search page
src/css/custom.css             all styling (badges, image grid, cards)
scripts/                       check-docs-parity.js, validate-frontmatter.js,
                               generate-lesson-index.js, convert-pptx-to-md.js
sidebars.js                    categories, autogenerated per dirName
.github/workflows/ci.yml       build (parity+links+frontmatter) + lint + audit
.github/workflows/deploy.yml   GitHub Pages deploy on main
WORKLOG.md                     shared agent journal — append after every work session
```

## Workflow — adding or editing a lesson

1. `git pull` and read the last ~10 lines of `WORKLOG.md` + `git log --oneline -10` — know what
   other agents just did before you touch anything.
2. Write/edit the EN file AND its AZ mirror together, keeping structure identical.
3. Validate locally (all are included in `npm run build`, but they run faster standalone):
   ```bash
   node scripts/check-docs-parity.js
   node scripts/validate-frontmatter.js
   node scripts/generate-lesson-index.js
   npm run build        # must end with zero broken-link errors, both locales
   ```
4. Commit with a descriptive message (see git log for house style). Include the regenerated
   `src/generated/lessonIndex.js` when content changed.
5. Append one line to `WORKLOG.md`: `YYYY-MM-DD | <agent> | <what> | <areas touched>`.
6. Prefer a feature branch + PR for anything beyond a small fix; never force-push `main`.
7. After deploy, spot-check the live URL for at least one changed page (CDN lags ~1-2 min).

## Multi-agent coordination rules

- **Before starting work:** step 1 above is not optional. If `WORKLOG.md` or `git log` shows
  another agent mid-stream in the same area, don't overlap — pick different files or wait.
- **Never rewrite someone's fresh work without being asked.** If a file changed in the last few
  commits and looks wrong to you, flag it in your PR/commit message instead of silently redoing it.
- **Keep changes scoped.** One concern per branch/PR. Mass renames/moves need an explicit request.
- **If you change structure** (folders, scripts, config, conventions), update AGENTS.md's map and
  snapshot in the same commit, so the next agent inherits the truth.

## Known past failure modes (do not repeat)

- Changed `slug:` while moving files → dead links site-wide (fixed in 4 hotfix commits).
- EN-only commit → parity check failed CI; AZ mirror forgotten.
- `<https://...>` autolinks and `(<500` in prose → MDX build errors.
- Relative cross-links left pointing at old paths after subfolder restructure (16 broken links).
- AZ text written in ASCII transliteration without ə/ş/ç — reads as broken Azerbaijani.
- Hand-edited `lessonIndex.js` → overwritten by the next generate run.
- `sidebar_position` collisions → nondeterministic sidebar order.
- Referenced `.png` while the actual file was `.jpeg` → 404 image.
- 8 MB slide images committed raw → slow pages; compress first.
- New subfolder without `_category_.json` in the AZ tree → unlabeled AZ sidebar category.

## Snapshot (refresh when structure changes — last: 2026-09-20)

- 139 EN / 139 AZ markdown files, full parity, all slugs explicit.
- Tags system live (124 files tagged); redirects + PWA manifest present (`static/manifest.json`).
- CI: Node 22, `npm run build` gates frontmatter/search-index/parity/links, then lint + audit.
- Weakest sections by lesson count: virtualization, certifications, helpdesk-basics (growth areas).
- Glossary at `/glossary` (288 acronyms); role-based learning paths in `intro.md`.
