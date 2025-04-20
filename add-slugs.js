const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directories to process
const docsDirs = [
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'i18n/az/docusaurus-plugin-content-docs/current'),
];

// Recursively process files
function processFiles(dir, slugPrefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath, slugPrefix); // Recurse into subdirectories
    } else if (file.endsWith('.md')) {
      processMarkdownFile(fullPath, slugPrefix);
    }
  });
}

// Process a single markdown file
function processMarkdownFile(filePath, slugPrefix) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);

  // Check if "slug" already exists
  if (!parsed.data.slug) {
    const filename = path.basename(filePath, '.md');
    const slug = `${slugPrefix}/${filename}`;
    parsed.data.slug = slug;

    // Rebuild the file with the updated frontmatter
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Added slug to: ${filePath}`);
  }
}

// Start processing
docsDirs.forEach((dir) => {
  const slugPrefix = dir.includes('i18n/az') ? '/az' : '';
  processFiles(dir, slugPrefix);
});

console.log('Slug addition completed.');