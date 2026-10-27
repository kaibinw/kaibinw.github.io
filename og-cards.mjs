// Link-preview cards: 1200×630 PNGs for og:image / twitter:image. Shared by build-blog.mjs and build-og.mjs.
// Rendered by headless Chromium from a page that links the site's own style.css, so the `.tc` timecode kicker,
// colours and fonts are the same system as the pages, not a copy of it. No npm packages.

import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';

const ROOT = dirname(fileURLToPath(import.meta.url));
const FONTS = 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;700&family=Fragment+Mono&display=swap';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardHtml({ title, summary, kicker, foot }) {
  const size = title.length > 90 ? 58 : title.length > 44 ? 70 : title.length > 24 ? 84 : 104;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${pathToFileURL(join(ROOT, 'style.css')).href}">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: var(--bg); }
  .card { box-sizing: border-box; width: 1200px; height: 630px; padding: 64px 72px 52px 88px; display: flex; flex-direction: column;
          font-family: var(--font-body); color: var(--ink); border-left: 14px solid var(--accent); }
  .card .tc { font-size: 22px; margin-bottom: 0; }
  .card .tc::before { width: 18px; height: 18px; }
  .card h1 { font-size: ${size}px; font-weight: 700; line-height: 1.04; letter-spacing: -0.03em; margin: 40px 0 0; max-width: 1020px; text-wrap: balance; }
  .card .sub { font-size: 30px; line-height: 1.4; color: var(--muted); margin: 28px 0 0; max-width: 960px;
               display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .card .foot { margin-top: auto; font-family: var(--font-mono); font-size: 22px; color: var(--accent); opacity: .75; white-space: nowrap; }
</style></head><body>
<div class="card">
  <p class="tc">${esc(kicker)}</p>
  <h1>${esc(title)}</h1>
  ${summary ? `<p class="sub">${esc(summary)}</p>` : ''}
  <p class="foot">${esc(foot)}</p>
</div>
</body></html>`;
}

function findChrome() {
  const cands = [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
  for (const c of cands) if (spawnSync(c, ['--version'], { stdio: 'ignore' }).status === 0) return c;
  return null;
}

// items: [{ name, title, summary, kicker?, foot? }] → <dir>/<name>.png. Only cards whose content changed (or whose PNG is
// missing) are rendered; --og / force redoes all. <dir>/hashes.json remembers what each PNG was drawn from, and PNGs for
// names that are no longer in `items` are deleted. `kicker` / `foot` on the call are defaults for items that lack them.
export function renderCards(items, { dir, kicker, foot, force = false }) {
  const hashFile = join(dir, 'hashes.json');
  const known = existsSync(hashFile) ? JSON.parse(readFileSync(hashFile, 'utf8')) : {};
  const cards = items.map((c) => ({ kicker, foot, ...c }));
  const todo = cards.filter((c) => {
    c.hash = createHash('sha1').update(cardHtml(c)).digest('hex').slice(0, 12);
    return force || known[c.name] !== c.hash || !existsSync(join(dir, `${c.name}.png`));
  });
  const live = new Set(cards.map((c) => c.name));
  const stale = Object.keys(known).filter((k) => !live.has(k));
  if (!todo.length && !stale.length) return;

  mkdirSync(dir, { recursive: true });
  if (todo.length) {
    const chrome = findChrome();
    if (!chrome) {
      const msg = `${todo.length} link-preview card(s) out of date but no Chrome/Chromium found (set CHROME=/path)`;
      if (process.env.CI) throw new Error(msg);
      console.log(`og: ${msg}; keeping what exists`);
    } else {
      const tmp = mkdtempSync(join(tmpdir(), 'og-'));
      try {
        for (const c of todo) {
          const html = join(tmp, `${c.name}.html`), png = join(dir, `${c.name}.png`);
          writeFileSync(html, cardHtml(c));
          const r = spawnSync(chrome, ['--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
            '--window-size=1200,630', '--virtual-time-budget=8000', `--screenshot=${png}`, pathToFileURL(html).href], { stdio: 'pipe' });
          if (r.status !== 0 || !existsSync(png)) { console.log(`og: ${c.name}: render failed (${(r.stderr || '').toString().split('\n')[0]})`); continue; }
          known[c.name] = c.hash;
          console.log(`og: card → ${png.replace(ROOT + '/', '')}`);
        }
      } finally { rmSync(tmp, { recursive: true, force: true }); }
    }
  }
  for (const k of stale) { delete known[k]; rmSync(join(dir, `${k}.png`), { force: true }); }
  writeFileSync(hashFile, JSON.stringify(known, null, 2) + '\n');
}
