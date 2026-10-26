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

## Kits page, launch state (Post 04)

This pull request is the commercial switch on top of the three-card page: Starter Blueprint's "Notify me at launch" becomes the Stripe Buy button ("Buy for $20", Managed Payments), `kits/access/` (the post-purchase page, `noindex`) is added, and `noindex` comes off `/kits/`. Merge Sunday evening 8 Nov, after the Fri 6 Nov go/no-go.

- After payment Stripe redirects to `https://kaibinw.github.io/kits/access/`, which links `starter-blueprint-4cd1c5cbc1.zip`. **That zip is deliberately not in the repo** (public). Copy it into `kits/access/` before merging; GitHub Pages cannot gate a file, so anyone who finds the URL can download it.
- GoatCounter events added: `shop-tier1-buy` (the Buy click) and `shop-tier1-download` (the download button on the access page).
- Domain: every working URL uses `kaibinw.github.io`; the footer reads kaibinw.io. Change the Stripe redirect only if the domain moves.
