# WORKLOG — shared agent journal

Every AI agent appends ONE line after finishing a work session, newest at the bottom:
`YYYY-MM-DD | agent | what was done | areas touched`

Read the last ~10 lines (plus `git log --oneline -10`) BEFORE starting work, so agents
don't collide or redo each other's work. Keep entries to one line; details belong in
commit messages. Never rewrite or delete existing entries.

---

2026-04-28 | claude | Converted full PPTX deck collection into ~113 gold-standard EN/AZ lesson pairs; restructured categories into subfolders; difficulty badges; glossary | docs/, i18n/, src/
2026-04-29 | claude | Extracted 553 PPTX images into static/img/lessons/, wired 33 lessons with Reference-images galleries, image optimization pass | static/img/, docs/, i18n/
2026-09 (est.) | copilot/codex | 10+ new lessons (GRC frameworks, Cisco/ISC2 certs, wireless & cloud pentest, OSINT, HTTP foundations), tags system, redirects, PWA manifest, slug hotfixes | docs/, i18n/, static/
2026-09-20 | claude | Rewrote AGENTS.md as canonical multi-agent guide (was 6 months stale); added CLAUDE.md + .github/copilot-instructions.md pointers; created this WORKLOG | AGENTS.md, CLAUDE.md, .github/, WORKLOG.md
