# kai-bin.wong — personal site

Static portfolio. HTML and CSS, no build step, for GitHub Pages.

## Structure

```
index.html
style.css
mock.js
case-studies/ledger.html
case-studies/dental-catalog.html
case-studies/hq.html
case-studies/dashboard.html
case-studies/dailies-importer.html
case-studies/second-brain.html
```

## Pages

- Home — credits, selected work, method
- Ledger — shared household budget (Next.js, Supabase, Vercel), in active use
- Dental Catalog — local folder catalog: tags, filters, and a wipe compare in one HTML file
- HQ — local one-click control panel for a markdown vault
- Household Dashboard — parked. Stock, wants, and spend on one screen. Not a featured case.
- Dailies Importer — Resolve script that appends overnight renders, in active use
- Second Brain — markdown vault read by people and by agents

## Local preview

```bash
python3 -m http.server 8080
```

## Deploy

GitHub Pages serves this repo from the default branch at `https://kaibinw.github.io/`. `.nojekyll` is already in the root.

## Sharing

Each page sets `og:title` and `og:description`. `og:image` is omitted until a 1200×630 `og.png` is added at the site root.

## Content notes

- Featured case studies: Ledger, Dental Catalog, HQ, Dailies Importer, and Second Brain. Household Dashboard is parked and listed only on the minor list.
- Figures are labeled sample data. Merchant names, people, and amounts in the mocks are invented. The Dental Catalog grid uses folder names such as SAMPLE A and SET 01.
- Ledger names concrete controls: manual entry, no stored bank login, and row-level security on every table.
- Contact links: LinkedIn and email, in `index.html`.
