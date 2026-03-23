const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const REPO_ROOT = path.join(__dirname, '..', '..');
const EN_DOCS_DIR = path.join(REPO_ROOT, 'docs');
const AZ_DOCS_DIR = path.join(
  REPO_ROOT,
  'i18n',
  'az',
  'docusaurus-plugin-content-docs',
  'current',
);

function listMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listMarkdownFiles(fullPath);
    }
    return entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeSlug(slug = '', locale = 'en') {
  if (locale === 'az' && slug.startsWith('/az/')) {
    return slug.slice(3);
  }
  if (locale === 'az' && slug === '/az') {
    return '/';
  }
  return slug;
}

function inferStatus(frontMatter = {}, description = '') {
  if (typeof frontMatter.status === 'string' && frontMatter.status.trim()) {
    return frontMatter.status.trim().toLowerCase();
  }

  if (/coming soon|tezliklə|hazırlanır|starter reference|giriş qeydləri/i.test(description)) {
    return 'starter';
  }

  if (frontMatter.category_key) {
    return 'overview';
  }

  return 'reference';
}

function normalizeDateValue(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return text || null;
}

function deriveCategoryKey(relativePath, frontMatter = {}) {
  if (typeof frontMatter.category_key === 'string' && frontMatter.category_key.trim()) {
    return frontMatter.category_key.trim();
  }

  const parts = relativePath.split(path.sep);
  if (parts.length < 2) {
    return null;
  }

  if (parts[0] === 'operating-systems') {
    return 'operating-systems';
  }

  return parts[0];
}

function extractKeywords(frontMatter = {}, relativePath = '') {
  const keywords = [
    ...toArray(frontMatter.keywords),
    ...toArray(frontMatter.tags)
      .map((tag) => (typeof tag === 'string' ? tag : tag?.label))
      .filter(Boolean),
    ...relativePath.replace(/\.md$/, '').split(path.sep),
  ];

  return [...new Set(keywords.map((item) => String(item).trim()).filter(Boolean))];
}

function readDoc(filePath, locale) {
  const source = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(source);
  const baseDir = locale === 'az' ? AZ_DOCS_DIR : EN_DOCS_DIR;
  const relativePath = path.relative(baseDir, filePath);
  const frontMatter = parsed.data || {};
  const slug = normalizeSlug(String(frontMatter.slug || ''), locale);
  const description = String(frontMatter.description || '').trim();

  return {
    locale,
    filePath,
    relativePath,
    frontMatter,
    title: String(frontMatter.title || '').trim(),
    description,
    slug,
    categoryKey: deriveCategoryKey(relativePath, frontMatter),
    keywords: extractKeywords(frontMatter, relativePath),
    status: inferStatus(frontMatter, description),
    lastReviewed: normalizeDateValue(frontMatter.last_reviewed),
  };
}

function collectDocs(locale) {
  const baseDir = locale === 'az' ? AZ_DOCS_DIR : EN_DOCS_DIR;
  return listMarkdownFiles(baseDir).map((filePath) => readDoc(filePath, locale));
}

module.exports = {
  AZ_DOCS_DIR,
  EN_DOCS_DIR,
  REPO_ROOT,
  collectDocs,
  normalizeSlug,
};
