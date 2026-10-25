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
case-studies/hq.html             parked: unlinked, noindex
case-studies/second-brain.html
case-studies/dashboard.html      parked: unlinked, noindex
kits/index.html                  dormant (shop branch only): noindex, not linked, checkout links are placeholders
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

## Blog

Posts are markdown files in `blog/posts/`. A zero-dependency script turns them into static pages, so every post gets its own URL and link preview.

1. Copy `blog/posts/_template.md` to `blog/posts/<slug>.md` (the filename becomes the URL: `/blog/<slug>.html`).
2. Fill in the frontmatter (`title`, `date: YYYY-MM-DD`, `summary`, optional `tags: [a, b]`, optional `draft: true`) and write the post. Images go in `blog/img/` and are referenced as `![alt](img/name.png)`.
3. Run `node build-blog.mjs` (Node 18+). Add `--drafts` to preview drafts locally.
4. Commit the markdown **and** the generated `blog/*.html` + `blog/feed.xml`, then push or open a PR.

The build also refreshes the homepage's "Latest writing" section (the 3 newest posts, between the `blog:latest` markers in `index.html`), so commit `index.html` too.

Files starting with `_` and posts with `draft: true` are skipped. Generated HTML is never edited by hand; deleting a post's `.md` and rebuilding removes its page.

## Shop (dormant)

`kits/index.html` is the page for three kits: Baseline AIOS ($0), Starter Blueprint ($29, $20 early bird) and Operator Kit ($59, waitlist). It lives on the `shop` branch only (the page lives at `kits/`, nav label "Get the kits"), is `noindex`, and is linked from no other page. Nothing here is merged by automation; Kai decides when it goes live.

- Currency, prices and the early-bird cap are Kai's to set. The page says "AUD" and "$20 then $29" as drafted.
- Tier 0 links `kits/downloads/baseline-aios.zip` (the Tier 0 zip, built from the vault kit; rebuild and replace it when the kit changes). Tier 1's button is a placeholder for a Stripe Payment Link. Tier 2's button is a `mailto:` waitlist, with no form or backend.
- Click counts go to GoatCounter through `data-goatcounter-click` attributes (`shop-tier0-download`, `shop-tier1-buy`, `shop-tier2-waitlist`).
- To go live: merge `main` into `shop` first (the branch predates the GoatCounter merge), add the Shop link to every sidebar, remove `noindex`, add the og/twitter/canonical tags every page carries, and replace the Tier 1 placeholder link.
- The page states what has and has not been tested. Keep that list true: update it when the cold test or the seven-day unattended run finishes.
