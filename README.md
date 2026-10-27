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
kits/index.html                  kits page: noindex, linked from every sidebar and footer
kits/access/index.html           post-purchase download page: noindex, unlisted; download button is disabled until the Starter Blueprint zip is published
terms/index.html                 Terms of Sale, licence and Australian Consumer Law notice
privacy/index.html               Privacy Policy and Spam Act statement
unsubscribe/index.html           unsubscribe page: noindex, no analytics; calls the Apps Script with ?action=unsub&e=<email>&t=<token>
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
   - **Link previews:** each post gets a card at `blog/og/<slug>.png` (the `.tc` timecode kicker + title + summary, drawn with `style.css` by headless Chrome/Chromium; `CHROME=/path` if it isn't on PATH), and `/blog/` gets `blog/og/index.png` ("Notes from the cut."). Cards re-render when the title/summary changes; `--og` forces all. Without a browser the build still runs and keeps the existing cards.
   - To use your own image instead, add `image:` (or `og_image:`) to the frontmatter: a full URL, a root-relative `/assets/og/post.png`, or a path relative to `blog/`. Order: frontmatter image → generated card → `/og.png`. Feeds `og:image`, `twitter:image` and `twitter:card=summary_large_image`.
4. Commit the markdown **and** the generated `blog/*.html` + `blog/feed.xml`, then push or open a PR.

The build also refreshes the homepage's "Latest writing" section (the 3 newest posts, between the `blog:latest` markers in `index.html`), so commit `index.html` too.

Files starting with `_` and posts with `draft: true` are skipped. Generated HTML is never edited by hand; deleting a post's `.md` and rebuilding removes its page.

## Kits page (all three tiers visible; selling starts with Post 04)

`kits/index.html` shows Baseline Core (free download), Starter Blueprint and Operator Kit, so nothing about the paid tiers is a surprise. The page is `noindex` and linked from every sidebar as "Kits".

- All three cards use the same email capture. Each form sends `{email, source}` to a Google Apps Script web app (`APPS_SCRIPT_URL` at the bottom of `kits/index.html`) with `sendBeacon`. Sources: `tier0` (also starts the download of `kits/downloads/baseline-core.zip`), `tier1-notify` ("Notify me at launch") and `tier2-waitlist`. The sheet has the columns Timestamp, Email, Status, Source.
- GoatCounter events: `shop-tier0-download`, `shop-tier1-notify`, `shop-tier2-waitlist`. The download never waits on the sheet; a repeat of the same email and source is ignored by the sheet script, not by the browser. The email is never put in a URL.
- Canonical and social tags use `https://kaibinw.github.io` until a custom domain is live. The footer reads kaibinw.github.io for now; switch it to the trading domain once that is live.
- Before this merges: deploy the hardened Apps Script handler (`leads_apps_script.gs` in the vault).
- Starter Blueprint and Operator Kit show a button that opens the email field in place. The free card keeps its field open. With JavaScript off, all three forms stay open.
- The ACL sales notice sits under the Starter Blueprint button and again on `kits/access/`. Keep the wording identical in both places and in `terms/`.
- Starter Blueprint's "Notify me" becomes the Stripe Buy button in the second pull request, which publishes the zip and enables the button on `kits/access/`.
- Unsubscribe links in emails are built by the Apps Script (`unsubLink_`, handler in `leads_apps_script.gs` in the vault) and point at `/unsubscribe/`. The page removes the link's query string from the address bar as soon as it loads.
- Every footer links to `/terms/` and `/privacy/`; Kits is in the sidebar only until selling starts. Those two URLs are the ones for Stripe's support settings. When the footer is edited, change it in every page, including `terms/`, `privacy/` and `kits/access/`; blog pages copy it from `case-studies/ledger.html` at build time.
