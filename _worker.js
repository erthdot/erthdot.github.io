// ═══════════════════════════════════════════════════════════
// Erthdot site Worker
// Serves the static site as-is, EXCEPT for one dynamic route:
// /client-manifest.json?id=XXXX — returns a Web App Manifest
// scoped to a single client project, so that when that client
// taps "Add to Home Screen" / installs the app, the shortcut on
// their phone opens their project directly (no ID entry screen).
// ═══════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/client-manifest.json") {
      return handleClientManifest(url);
    }

    // Everything else — serve the static site unchanged.
    return env.ASSETS.fetch(request);
  }
};

function handleClientManifest(url) {
  const id = (url.searchParams.get("id") || "").trim();

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing project id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const startUrl = `/client-preview.html?id=${encodeURIComponent(id)}`;

  const manifest = {
    name: `${id} — Erthdot Project`,
    short_name: id,
    description: "Live project tracker from Erthdot Design Studio.",
    start_url: startUrl,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#090909",
    theme_color: "#090909",
    icons: [
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any maskable" }
    ]
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-store" // always fresh — a project's id shouldn't ever be cached against another
    }
  });
}
