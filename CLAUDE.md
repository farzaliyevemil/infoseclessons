# CLAUDE.md

Read **AGENTS.md** in this directory — it is the single canonical guide for all AI agents
(map, hard invariants, workflow, multi-agent coordination). Do not duplicate rules here.

Non-negotiables (full detail in AGENTS.md):
- EN/AZ parity: never touch `docs/` without the matching
  `i18n/az/docusaurus-plugin-content-docs/current/` mirror.
- Never change a lesson's `slug:` when moving files.
- Validate before commit: `node scripts/check-docs-parity.js && npm run build`.
- Append a line to `WORKLOG.md` after each work session.
