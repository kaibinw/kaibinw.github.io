# kaibinw.github.io

Personal portfolio for Kai-Bin Wong, VFX Editor. Static HTML and CSS, no build step, served by GitHub Pages at <https://kaibinw.github.io/>.

## Structure

```
index.html                       home: credits, selected work, method
style.css
mock.js                          small helpers for the mock screenshots
og.png                           1200x630 link preview image
favicon.ico, favicon.svg, apple-touch-icon.png
case-studies/dailies-importer.html
case-studies/ledger.html
case-studies/dental-catalog.html
case-studies/hq.html
case-studies/second-brain.html
case-studies/dashboard.html      parked, listed on the minor list only
```

## Content rules

- Featured, in order: Dailies Importer, Ledger, Dental Catalog, HQ, Second Brain. Household Dashboard, ICC reports and Editorial pipeline tooling sit on the minor list.
- Studio pipeline work is shown as methodology only. No studio material.
- No patient data, photos or practice names. Dental Catalog mocks use sample folder names such as SAMPLE A and SET 01.
- Figures in the mocks are sample data: merchant names, people and amounts are invented.
- No unverifiable metrics (line counts, user counts) and no absolute privacy claims.
- Contact links are LinkedIn and email, in `index.html`.

## Every page carries

`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `twitter:card=summary_large_image`, a canonical link, and the favicon set. Keep these in step when adding a page. There is one `h1` per page; the sidebar name is not a heading.

## Local preview

```bash
python3 -m http.server 8080
```

## Deploy

GitHub Pages serves the default branch. `.nojekyll` is already in the root. Nothing here is merged by automation; Kai merges.
