# Gatsby → Astro migration: post-deploy follow-ups

The code-level parity work is complete and verified against live prod
(f1report.net): all 1,313 indexed URLs are reproduced, slugs are byte-identical,
SEO meta matches, and URLs are non-trailing-slash like prod. See
`src/layouts/Layout.astro`, `astro.config.mjs`, and `public/robots.txt`.

These two items **cannot be done in the codebase** — they depend on external
systems and must be handled around the cutover.

## 1. Re-submit the sitemap in Google Search Console

- **Prod (Gatsby)** serves its sitemap at **`/sitemap.xml`**.
- **Astro** serves it at **`/sitemap-index.xml`** (→ `/sitemap-0.xml`). After
  cutover, the old `/sitemap.xml` will **404**.
- The new `public/robots.txt` already points crawlers at
  `https://f1report.net/sitemap-index.xml`, but Search Console keeps using the
  URL that was originally submitted.

**Action:** After deploy, open Google Search Console → Sitemaps and submit
`https://f1report.net/sitemap-index.xml`. Optionally remove the old
`/sitemap.xml` entry.

## 2. Confirm the host does not force a trailing slash

- The Astro build uses `trailingSlash: "never"` + `build.format: "file"`, so
  pages are emitted as `dist/races/2009-australian-grand-prix.html` and served at
  **`/races/2009-australian-grand-prix`** (no trailing slash) — matching prod's
  indexed canonical URLs.
- If the new host is configured to **redirect non-trailing → trailing**
  (e.g. an "always add trailing slash" rule), it will fight the canonical tags
  and cause redirect churn / duplicate-URL signals.

**Action:** On the target host (Netlify / Cloudflare Pages / Vercel / nginx,
etc.), verify the "pretty URLs" / trailing-slash setting serves
`/races/<slug>` directly with a **200** and does **not** 301 to a trailing-slash
variant. Most static hosts serve `file`-format output non-trailing by default;
just confirm it for the chosen platform. If needed, add the platform's redirect
config to enforce non-trailing (e.g. Netlify `trailingSlash = false`).
