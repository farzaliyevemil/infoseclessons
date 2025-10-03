#!/usr/bin/env node
/**
 * Convert a PowerPoint .pptx file into a Markdown doc for Docusaurus.
 * - Extracts text from each slide (grouped by paragraphs)
 * - The first paragraph per slide becomes a section heading
 * - Writes to docs/networking/computer-networking.md by default
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  return execSync(cmd, {encoding: 'utf8'});
}

function listSlides(pptxPath) {
  const out = run(`unzip -l ${JSON.stringify(pptxPath)}`);
  const lines = out.split(/\r?\n/);
  const slides = [];
  for (const line of lines) {
    const m = line.match(/ppt\/slides\/slide(\d+)\.xml/);
    if (m) slides.push(Number(m[1]));
  }
  slides.sort((a,b) => a-b);
  return slides;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\u00a0/g, ' ');
}

function extractSlideParagraphs(pptxPath, slideNum) {
  let xml;
  try {
    xml = run(`unzip -p ${JSON.stringify(pptxPath)} ppt/slides/slide${slideNum}.xml`);
  } catch (e) {
    return [];
  }
  const paras = [];
  // Split by paragraph end
  const parts = xml.split(/<\/a:p>/g);
  for (const part of parts) {
    let line = '';
    const regex = /<a:t>([^<]*)<\/a:t>/g;
    let m;
    while ((m = regex.exec(part)) !== null) {
      const text = decodeEntities(m[1].replace(/\r/g, ' '));
      if (text.trim().length > 0) {
        line += (line ? ' ' : '') + text;
      }
    }
    if (line.trim().length > 0) paras.push(line.trim());
  }
  return paras;
}

function buildMarkdown(pptxPath) {
  const slides = listSlides(pptxPath);
  const lines = [];
  // Front matter
  lines.push('---');
  lines.push('id: computer-networking');
  lines.push('title: Computer Networking');
  lines.push('description: Lecture notes converted from presentation slides');
  lines.push('slug: /computer-networking');
  lines.push('sidebar_position: 1');
  lines.push('---');
  lines.push('');
  lines.push('# Computer Networking');
  lines.push('');
  lines.push('Converted from the presentation "Computer networking.pptx".');
  lines.push('');
  for (const s of slides) {
    const paras = extractSlideParagraphs(pptxPath, s);
    if (paras.length === 0) continue;
    const title = paras[0];
    lines.push('');
    lines.push(`## ${title}`);
    for (let i = 1; i < paras.length; i++) {
      const p = paras[i];
      lines.push('');
      lines.push(p);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function main() {
  const pptx = process.argv[2] || path.join(process.cwd(), 'Computer networking.pptx');
  const outFile = process.argv[3] || path.join(process.cwd(), 'docs', 'networking', 'computer-networking.md');
  if (!fs.existsSync(pptx)) {
    console.error(`PPTX not found: ${pptx}`);
    process.exit(1);
  }
  const md = buildMarkdown(pptx);
  const outDir = path.dirname(outFile);
  fs.mkdirSync(outDir, {recursive: true});
  fs.writeFileSync(outFile, md, 'utf8');
  console.log(`Wrote ${outFile}`);
}

if (require.main === module) {
  main();
}

