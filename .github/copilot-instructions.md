# Copilot Instructions

Read **/AGENTS.md** at the repo root FIRST — it is the single canonical guide for all AI agents
working in this repository: project map, hard invariants, lesson template, validation workflow,
and multi-agent coordination rules. Do not re-discover the repo; trust that map.

Absolute minimum (full detail and rationale in AGENTS.md):

1. **EN/AZ parity** — every change under `docs/` needs the identical-structure mirror under
   `i18n/az/docusaurus-plugin-content-docs/current/`. CI fails otherwise.
2. **Never change `slug:` frontmatter** when moving or renaming files — slugs are permanent URLs.
3. **MDX safety** — no `<https://...>` autolinks, no `<` before digit/letter outside code fences
   (use `&lt;`), no `<details>`/`<summary>`.
4. **Azerbaijani files use real Azerbaijani orthography** (ə ı ö ü ç ş ğ) — never ASCII
   transliteration.
5. **Never hand-edit `src/generated/lessonIndex.js`** — run
   `node scripts/generate-lesson-index.js`.
6. **Validate before committing:** `node scripts/check-docs-parity.js && npm run build`
   (build gates frontmatter, search index, parity, and broken links).
7. **Append one line to `WORKLOG.md`** after finishing:
   `YYYY-MM-DD | copilot | what you did | areas touched`.
8. Before starting, read the last 10 lines of `WORKLOG.md` and `git log --oneline -10`
   so you don't collide with another agent's in-flight work.
