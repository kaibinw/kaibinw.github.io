#!/usr/bin/env node
// Link-preview cards for the hand-written pages: case-studies/*.html and kits/index.html.
//
//   page title (<h1>) + og:description  →  assets/og/<name>.png  →  og:image / twitter:image in the page's <head>
//
// Idempotent: run it after editing those pages, commit the PNGs and the patched HTML (CI does this on push).
// A page whose og:image is already something else (a custom image you set by hand) is left alone.
// The blog's cards are made by build-blog.mjs. Flags: --og re-renders every card. Needs Chrome/Chromium; see og-cards.mjs.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderCards } from './og-cards.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://kaibinw.github.io';
const DIR = join(ROOT, 'assets', 'og');
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const plain = (s) => unesc(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const pages = [
  ...readdirSync(join(ROOT, 'case-studies')).filter((f) => f.endsWith('.html')).sort().map((f) => ({
    file: join('case-studies', f), name: `case-${f.replace(/\.html$/, '')}`,
    kicker: 'TC 01:04:20:00 — CASE STUDY', foot: 'kaibinw.github.io/case-studies',
  })),
  { file: join('kits', 'index.html'), name: 'kits', kicker: null, foot: 'kaibinw.github.io/kits' }, // kicker: the page's own
].map((p) => {
  const html = readFileSync(join(ROOT, p.file), 'utf8');
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const desc = html.match(/<meta property="og:description" content="([^"]*)"/);
  if (!h1) throw new Error(`${p.file}: no <h1>`);
  const tc = html.match(/<p class="tc">([^<]+)<\/p>/);
  return { ...p, html, title: plain(h1[1]), summary: desc ? unesc(desc[1]) : '', kicker: p.kicker ?? (tc ? plain(tc[1]) : 'TC 01:00:00:00') };
});

renderCards(pages.map(({ name, title, summary, kicker, foot }) => ({ name, title, summary, kicker, foot })),
  { dir: DIR, force: process.argv.includes('--og') });

let patched = 0;
for (const p of pages) {
  const url = `${SITE}/assets/og/${p.name}.png`;
  const cur = p.html.match(/<meta property="og:image" content="([^"]*)"/);
  if (!cur) { console.log(`og: ${p.file}: no og:image tag, skipped`); continue; }
  if (cur[1] !== `${SITE}/og.png` && !cur[1].startsWith(`${SITE}/assets/og/`)) { console.log(`og: ${p.file}: custom og:image kept`); continue; }
  if (!readFileSyncSafe(join(DIR, `${p.name}.png`))) continue; // no card rendered (no browser): keep the old image
  let next = p.html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${url}$2`);
  const tw = `<meta name="twitter:image" content="${url}">`;
  next = /<meta name="twitter:image"/.test(next)
    ? next.replace(/<meta name="twitter:image" content="[^"]*">/, tw)
    : next.replace(/(<meta name="twitter:card" content="summary_large_image">)/, `$1\n${tw}`);
  if (next !== p.html) { writeFileSync(join(ROOT, p.file), next); patched++; }
}
console.log(`og: ${pages.length} pages checked, ${patched} patched`);

function readFileSyncSafe(f) { try { return readFileSync(f); } catch { return null; } }
