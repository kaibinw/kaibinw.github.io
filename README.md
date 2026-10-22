# kai-bin.wong — personal site

Static portfolio. HTML and CSS, no build step, for GitHub Pages.

## Structure

```
index.html
style.css
mock.js
case-studies/ledger.html
case-studies/hq.html
case-studies/dashboard.html
case-studies/dailies-importer.html
case-studies/second-brain.html
```

## Pages

- Home — credits, selected work, method
- Ledger — shared household budget (Next.js, Supabase, Vercel)
- HQ — local one-click control panel for a markdown vault
- Household Dashboard — stock, wants, and spend on one screen
- Dailies Importer — Resolve script that appends overnight renders
- Second Brain — markdown vault read by people and by agents

## Local preview

```bash
python3 -m http.server 8080
```

## Deploy

GitHub Pages serves this repo from the default branch at `https://kaibinw.github.io/`. `.nojekyll` is already in the root.

## Sharing

Each page sets `og:title`, `og:description`, and `og:image`. The image URL is `https://kaibinw.github.io/og.png`. Add a 1200×630 `og.png` at the site root before posting to LinkedIn.

## Content notes

- The five case studies are personal projects: Ledger, HQ, Household Dashboard, Dailies Importer, and Second Brain.
- Figures are labeled sample data. Merchant names, people, and amounts in the mocks are invented.
- Ledger names concrete controls: manual entry, no stored bank login, and row-level security on every table.
- Contact links: LinkedIn and email, in `index.html`.
