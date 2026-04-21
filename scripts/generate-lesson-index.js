#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {collectDocs} = require('./lib/docs-utils');

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'generated', 'lessonIndex.js');

function shouldIndex(doc) {
  if (!doc.slug || !doc.title || !doc.description) {
    return false;
  }

  if (!doc.categoryKey) {
    return false;
  }

  return !doc.frontMatter.search_exclude;
}

function buildIndex() {
  const enAll = collectDocs('en');
  const azAll = collectDocs('az');

  const enDocs = enAll.filter(shouldIndex);
  const azDocsByPath = new Map(
    azAll.filter(shouldIndex).map((doc) => [doc.relativePath, doc]),
  );

  const enIndexedPaths = new Set(enDocs.map((doc) => doc.relativePath));
  const missingAz = [];
  enIndexedPaths.forEach((relPath) => {
    const azRaw = azAll.find((doc) => doc.relativePath === relPath);
    if (!azRaw) {
      missingAz.push(`${relPath} (no AZ file)`);
    } else if (!shouldIndex(azRaw)) {
      const reason = !azRaw.slug
        ? 'slug'
        : !azRaw.title
          ? 'title'
          : !azRaw.description
            ? 'description'
            : !azRaw.categoryKey
              ? 'categoryKey'
              : 'search_exclude';
      missingAz.push(`${relPath} (AZ skipped: missing ${reason})`);
    }
  });
  if (missingAz.length > 0) {
    console.warn(`Warning: ${missingAz.length} AZ doc(s) missing from lesson index:`);
    missingAz.forEach((entry) => console.warn(`  - ${entry}`));
  }

  const records = enDocs.map((enDoc) => {
    const azDoc = azDocsByPath.get(enDoc.relativePath);
    return {
      slug: enDoc.slug,
      category: enDoc.categoryKey,
      title: {
        en: enDoc.title,
        az: azDoc?.title || enDoc.title,
      },
      description: {
        en: enDoc.description,
        az: azDoc?.description || enDoc.description,
      },
      keywords: [...new Set([...enDoc.keywords, ...(azDoc?.keywords || [])])],
      status: enDoc.status,
      lastReviewed: enDoc.lastReviewed || azDoc?.lastReviewed || null,
      sourcePaths: {
        en: enDoc.relativePath,
        az: azDoc?.relativePath || null,
      },
    };
  });

  records.sort((a, b) => a.category.localeCompare(b.category) || a.title.en.localeCompare(b.title.en));
  return records;
}

function writeModule(records) {
  const body =
    `const lessons = ${JSON.stringify(records, null, 2)};\n\n` +
    `export default lessons;\n`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), {recursive: true});
  fs.writeFileSync(OUTPUT_FILE, body, 'utf8');
  console.log(`Wrote ${OUTPUT_FILE}`);
}

writeModule(buildIndex());
