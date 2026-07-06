# kai-bin.wong — personal brand site

One-page personal brand site + case studies. Pure static HTML/CSS, no build step, designed for GitHub Pages.

## Structure

```
index.html                      # the one-pager
style.css                       # shared design system (OKLCH tokens)
case-studies/ledger.html        # case study: Ledger
case-studies/dental-catalog.html# case study: Dental Catalog
```

## Deploy to GitHub Pages

From this folder:

```bash
git init
git add index.html style.css case-studies README.md
git commit -m "Personal brand site"
```

**Option A — user site (recommended):** create a repo named `<username>.github.io`, then:

```bash
git remote add origin git@github.com:<username>/<username>.github.io.git
git push -u origin main
```

Site goes live at `https://<username>.github.io/` within a minute or two.

**Option B — project repo:** push to any repo, then Settings → Pages → Deploy from branch → `main` / root. Site lives at `https://<username>.github.io/<repo>/`.

No Jekyll processing is needed; if anything misbehaves, add an empty `.nojekyll` file.

## Content notes

- Case studies are personal projects only (Ledger, Dental Catalog). Studio pipeline work is methodology-only by design — keep it that way.
- Contact CTA points at LinkedIn. Swap in an email `mailto:` in `index.html` if preferred.

## Local preview

```bash
python3 -m http.server 8080
```
