# Erthdot SEO Deployment Guide
## Everything you need to do, step by step

---

## STEP 1 — Upload files to your GitHub repo

You have been given 4 files. Here's where each one goes in your repo:

| File | Where to put it |
|---|---|
| `sitemap.xml` | Root of repo (same level as index.html) |
| `robots.txt` | Root of repo (same level as index.html) |
| `seo-meta-tags.html` | Copy the contents into `index.html` inside `<head>` |
| `seo-meta-tags-tools.html` | Copy the contents into `erthdot-tools.html` inside `<head>` |

**How to upload on GitHub:**
1. Go to your repo on github.com
2. Click "Add file" → "Upload files"
3. Drop `sitemap.xml` and `robots.txt` in
4. Commit the changes

---

## STEP 2 — Add meta tags to your HTML files

Open `index.html` in your repo. Find the `<head>` section at the top.
It will look something like this:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" ...>
  <!-- PASTE the contents of seo-meta-tags.html HERE -->
</head>
```

Do the same for `erthdot-tools.html` using `seo-meta-tags-tools.html`.

---

## STEP 3 — Create an OG image (for social previews)

When your site is shared on WhatsApp or LinkedIn, it shows a preview image.
Create a simple image called `og-image.jpg` (1200 × 630 px) with:
- Your logo
- Tagline: "Logo & Branding Studio — Lusaka, Zambia"
- Dark or branded background

Upload it to the root of your repo.

---

## STEP 4 — Submit to Google Search Console

1. Go to: https://search.google.com/search-console
2. Click "Add Property" → choose "URL prefix"
3. Enter: `https://erthdot.com`
4. Choose "DNS record" verification method
5. Copy the TXT record Google gives you
6. Go to Namecheap → Domain → Advanced DNS → Add a new TXT record:
   - Host: `@`
   - Value: paste Google's TXT string
   - TTL: Automatic
7. Save, go back to Search Console, click "Verify"
8. Once verified, click "Sitemaps" in the left menu
9. Enter: `sitemap.xml` and click Submit

---

## STEP 5 — Fix the GitHub Pages canonical URL issue

Make sure GitHub Pages knows your custom domain:
1. In your repo, go to Settings → Pages
2. Under "Custom domain", enter: `erthdot.com`
3. Check "Enforce HTTPS"
4. Make sure a file called `CNAME` exists in your repo root containing just:
   ```
   erthdot.com
   ```

In Namecheap DNS, your records should include:
- A record: `@` → `185.199.108.153`
- A record: `@` → `185.199.109.153`
- A record: `@` → `185.199.110.153`
- A record: `@` → `185.199.111.153`
- CNAME: `www` → `erthdot.github.io`

---

## STEP 6 — List your business on Google (free)

Go to: https://business.google.com
Create a free Google Business Profile for Erthdot.
This is how you show up in "design studio near me" searches in Lusaka.

Fill in:
- Business name: Erthdot Design Studio
- Category: Graphic Designer
- Location: Lusaka, Zambia
- Phone: +260971009632
- Website: https://erthdot.com
- Hours

---

## STEP 7 — Get backlinks (ongoing)

Each of these is free and helps Google trust your site:

| Platform | What to do |
|---|---|
| LinkedIn | Create a company page, link to erthdot.com |
| Behance | Upload portfolio work, link to your site |
| Facebook Business | Create a page with your website linked |
| Instagram | Add website link to bio |
| Yellow Pages Zambia | List your business free |
| Zambia Business Directory | List your studio |

---

## Timeline Expectations

| Timeframe | What to expect |
|---|---|
| Week 1-2 | Google finds and indexes your sitemap |
| Month 1 | Site appears for your exact business name |
| Month 2-3 | Site starts showing for "logo design Lusaka" etc. |
| Month 4-6 | Consistent ranking for local design searches |

SEO takes time — but once these files are in place, you're doing everything right.

---

*Files prepared by Claude for Erthdot Design Studio — April 2026*
