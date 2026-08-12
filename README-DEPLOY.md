# Erthdot — "No More Emulations" Update

## What changed

1. **Homepage tracker is now live, not demo data**
   `index.html` now connects to the same Firebase project as the Creator
   Dashboard. The project slider and "Find Your Project" lookup both read
   real, published projects from the `previews` Firestore collection —
   nothing hardcoded anymore. If no projects are published yet, the slider
   shows an honest empty state instead of fake demo cards.

2. **Real, installable per-client shortcuts**
   `client-preview.html` now points to a manifest generated on the fly for
   whichever project ID is in the link (`?id=...`). When a client opens
   their link and taps **Add to Home Screen** (iPhone) or accepts the
   **Install** prompt (Android/Chrome), the icon that lands on their phone
   opens straight into *their* project — never the ID-entry screen.
   This is handled by the new `_worker.js` (a small Cloudflare Worker) at
   the route `/client-manifest.json?id=...`.

3. **Designer's mobile admin app**
   The Creator Dashboard (`creator-dashboard.html`) and login page are now
   installable PWAs — `dashboard-manifest.json` + `sw.js`. On the designer's
   phone: open the dashboard in Chrome/Safari → **Install app** / **Add to
   Home Screen** → it behaves like a native app icon that opens straight
   into the admin panel. A new **"Install This App"** item appears in the
   sidebar automatically on Android/Chrome once it's installable.

4. **Share flow now teaches clients how to install**
   The existing "Share Preview" modal in the dashboard now explains the
   install step, and the WhatsApp message it generates includes the
   install instruction automatically.

## Deploy steps (Cloudflare Workers, per your `wrangler.jsonc`)

1. Replace these files in your repo with the versions in this folder:
   `index.html`, `client-preview.html`, `creator-dashboard.html`,
   `creator-login.html`, `wrangler.jsonc`
2. Add these **new** files to the repo root (same level as `index.html`):
   `_worker.js`, `sw.js`, `dashboard-manifest.json`
3. Deploy as usual: `wrangler deploy`

## One thing only you can do: Firestore security rules

Your homepage now reads Firestore **without logging in** (visitors aren't
authenticated). Your Firestore rules need to allow public *read* access to
published previews, but keep *writes* locked to the dashboard's auth. In the
Firebase console → Firestore → Rules, something like:

```
match /previews/{id} {
  allow read: if resource.data.published == true;
  allow write: if request.auth != null; // or your existing admin check
}
```

If your rules currently block all unauthenticated reads, the homepage
tracker will silently show "No active projects yet" even when you have
published projects — that's the first thing to check if it looks empty
after deploying.

## Getting a real, installable .apk for the Designer Admin app

The dashboard PWA (steps above) already installs like an app. If you also
want an actual `.apk` file people can download and side-load — e.g. to
hand your phone a real file instead of "Add to Home Screen" — two new
files handle that:

- `twa-manifest.json` — config for a "Trusted Web Activity" (a real Android
  app that's just a native wrapper around your PWA)
- `.github/workflows/build-admin-apk.yml` — a GitHub Action that builds the
  APK automatically

**Why a GitHub Action and not a file I generate directly:** building an
Android package needs Google's Android SDK / build tools, which my sandbox
here can't reach (network is locked to a small allowlist). GitHub's own
servers have normal internet access, so the workflow does the actual
building there — for free, automatically, every time you push.

### One-time setup
1. Push this whole folder (including the new `.github/workflows/` folder
   and `twa-manifest.json`) to your GitHub repo.
2. In your repo settings, go to **Settings → Actions → General →
   Workflow permissions**, and set it to **"Read and write permissions"**
   (the workflow commits the finished APK back into the repo, so it needs
   write access).
3. Go to the **Actions** tab in GitHub, find "Build Erthdot Studio Admin
   APK", and click **Run workflow** the first time.
4. After ~2–3 minutes it commits `erthdot-admin.apk` to your repo root.
   Deploy as usual — it'll now be live at `erthdot.com/erthdot-admin.apk`.
5. From then on, it rebuilds automatically any time you change
   `twa-manifest.json` or `dashboard-manifest.json`.

The dashboard sidebar now has a **"Download Admin APK"** link pointing at
that file, so you (or anyone you trust with admin access) can grab it
straight from the admin page on any Android phone.

**One nuance:** this APK is *debug-signed*, not signed with a Play Store
release key. That means it installs and runs perfectly on any Android
phone once you allow "install from unknown sources," but it can't be
published to the Play Store as-is — that needs a proper release keystore
and Play Console setup, which is a separate step if you ever want it
listed there. For your own device / handing it to yourself, debug-signed
is completely normal and works exactly the same.

There's no iPhone equivalent of an `.apk` — Apple doesn't allow sideloaded
app files at all, so "Add to Home Screen" (already set up) is the real
mechanism there, not a workaround.

## Known gap (not fixed in this pass)

Booking phone-number lookups (`sendOTP()` on the homepage) still don't have
a shared backend — bookings are only saved to the dashboard's own
`localStorage`, not Firestore. I changed that flow to open WhatsApp with a
pre-filled message instead of faking a "found/not found" result, since a
fake match would be worse than an honest handoff. Say the word if you want
bookings moved into Firestore too — same collection pattern as `previews`.
