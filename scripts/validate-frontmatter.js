#!/usr/bin/env node

const {collectDocs} = require('./lib/docs-utils');

const REQUIRED_FIELDS = ['id', 'title', 'description', 'slug'];

function validateDoc(doc) {
  const errors = [];
  REQUIRED_FIELDS.forEach((field) => {
    const value = doc.frontMatter[field];
    if (value == null || String(value).trim() === '') {
      errors.push(`missing "${field}"`);
    }
  });

  if (doc.frontMatter.slug && !String(doc.frontMatter.slug).startsWith('/')) {
    errors.push(`slug must start with "/" (got "${doc.frontMatter.slug}")`);
  }

  if (doc.frontMatter.last_reviewed && !doc.lastReviewed) {
    errors.push(`invalid last_reviewed date: "${doc.frontMatter.last_reviewed}"`);
  }

  return errors;
}

function main() {
  const docs = [...collectDocs('en'), ...collectDocs('az')];
  const failures = [];

  docs.forEach((doc) => {
    const errors = validateDoc(doc);
    if (errors.length > 0) {
      failures.push({doc, errors});
    }
  });

  if (failures.length > 0) {
    console.error(`Frontmatter validation failed for ${failures.length} file(s):`);
    failures.forEach(({doc, errors}) => {
      console.error(`\n  ${doc.locale}: ${doc.relativePath}`);
      errors.forEach((err) => console.error(`    - ${err}`));
    });
    process.exit(1);
  }

  console.log(`Frontmatter OK for ${docs.length} doc(s).`);
}

main();
