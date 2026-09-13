#!/usr/bin/env node
/**
 * One-off migration: adds a `tags:` block to every lesson's frontmatter
 * (EN + AZ), derived from the lesson's category path and difficulty field.
 * Idempotent — files that already carry tags are skipped, so the script can
 * be re-run safely after new lessons land.
 *
 * Tag scheme:
 *   - one category tag (red-team, blue-team, grc, security-basics,
 *     networking, linux, windows, servers, virtualization, helpdesk,
 *     certifications)
 *   - one difficulty tag (beginner | intermediate | advanced) when the
 *     frontmatter declares a difficulty.
 */
const fs = require('fs');
const path = require('path');

const CATEGORY_TAGS = {
  'red-teaming': 'red-team',
  'blue-teaming': 'blue-team',
  grc: 'grc',
  'general-security': 'security-basics',
  networking: 'networking',
  'operating-systems': null, // resolved per-subfolder (linux/windows)
  servers: 'servers',
  virtualization: 'virtualization',
  'helpdesk-basics': 'helpdesk',
  certifications: 'certifications',
};

const DIFFICULTY_TAGS = {
  foundation: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
};

function resolveCategoryTags(relPath) {
  const segs = relPath.split(path.sep).filter(Boolean);
  const out = [];
  for (const seg of segs) {
    const mapped = CATEGORY_TAGS[seg];
    if (mapped === null) continue; // operating-systems resolved by child dir
    if (mapped) out.push(mapped);
  }
  if (relPath.includes(path.join('operating-systems', 'linux'))) out.push('linux');
  if (relPath.includes(path.join('operating-systems', 'windows'))) out.push('windows');
  return out;
}

function buildTags(relPath, fmBody) {
  const tags = resolveCategoryTags(relPath);
  const diff = (fmBody.match(/^difficulty:\s*(\S+)/m) || [])[1];
  if (diff && DIFFICULTY_TAGS[diff]) tags.push(DIFFICULTY_TAGS[diff]);
  return [...new Set(tags)];
}

function injectTags(file) {
  const content = fs.readFileSync(file, 'utf8');
  // Windows checkouts produce CRLF; detect the file's line ending so the
  // frontmatter delimiters match either way.
  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const open = `---${eol}`;
  if (!content.startsWith(open)) return false; // no frontmatter block
  const close = `${eol}---${eol}`;
  const end = content.indexOf(close, open.length);
  if (end === -1) return false;
  const fmBody = content.slice(open.length, end);
  if (/^tags:/m.test(fmBody)) return false; // already tagged

  const relPath = path.relative(process.cwd(), file);
  const tags = buildTags(relPath, fmBody);
  if (!tags.length) return false;

  const block = `${eol}tags:${eol}${tags.map((t) => `  - ${t}`).join(eol)}`;
  const next = content.slice(0, end) + block + content.slice(end); // end still starts with the closing --- line
  fs.writeFileSync(file, next);
  return true;
}

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

const roots = [
  path.join(__dirname, '..', 'docs'),
  path.join(__dirname, '..', 'i18n', 'az', 'docusaurus-plugin-content-docs', 'current'),
];

let tagged = 0;
let skipped = 0;
for (const root of roots) {
  for (const file of walk(root, [])) {
    if (injectTags(file)) tagged++;
    else skipped++;
  }
}
console.log(`tags added: ${tagged}, already tagged / skipped: ${skipped}`);
