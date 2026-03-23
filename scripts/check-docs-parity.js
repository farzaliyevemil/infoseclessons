#!/usr/bin/env node

const {collectDocs, normalizeSlug} = require('./lib/docs-utils');

function run() {
  const enDocs = collectDocs('en');
  const azDocs = collectDocs('az');
  const azByPath = new Map(azDocs.map((doc) => [doc.relativePath, doc]));
  const issues = [];

  for (const enDoc of enDocs) {
    const azDoc = azByPath.get(enDoc.relativePath);
    if (!azDoc) {
      issues.push(`Missing AZ translation for ${enDoc.relativePath}`);
      continue;
    }

    for (const [localeLabel, doc] of [
      ['EN', enDoc],
      ['AZ', azDoc],
    ]) {
      if (!doc.title) issues.push(`${localeLabel} title is missing in ${doc.relativePath}`);
      if (!doc.description) issues.push(`${localeLabel} description is missing in ${doc.relativePath}`);
      if (!doc.slug) issues.push(`${localeLabel} slug is missing in ${doc.relativePath}`);
    }

    if (
      enDoc.slug &&
      azDoc.slug &&
      normalizeSlug(enDoc.slug, 'en') !== normalizeSlug(azDoc.slug, 'az')
    ) {
      issues.push(
        `Slug mismatch for ${enDoc.relativePath}: EN=${enDoc.slug} AZ=${azDoc.slug}`,
      );
    }
  }

  const enPaths = new Set(enDocs.map((doc) => doc.relativePath));
  for (const azDoc of azDocs) {
    if (!enPaths.has(azDoc.relativePath)) {
      issues.push(`AZ doc has no EN counterpart: ${azDoc.relativePath}`);
    }
  }

  if (issues.length > 0) {
    console.error('Docs parity check failed:\n');
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log(`Docs parity check passed for ${enDocs.length} EN docs and ${azDocs.length} AZ docs.`);
}

run();
